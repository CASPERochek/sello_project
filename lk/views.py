# from django.shortcuts import get_object_or_404
# from rest_framework import viewsets, status, filters
# from rest_framework.decorators import action
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.views import APIView
# from django.db.models import Q
# from django.contrib.auth import get_user_model

# from .models import Brand, Product, Cart, CartItem, UserBrandConnection
# from .serializers import (
#     BrandSerializer, ProductSerializer, CartSerializer,
#     CartItemSerializer, CartItemCreateSerializer,
#     UserBrandConnectionSerializer, AvailableBrandsFilterSerializer
# )

# User = get_user_model()

# class BrandViewSet(viewsets.ModelViewSet):
#     """ViewSet для магазинов"""
#     queryset = Brand.objects.filter(is_active=True)
#     serializer_class = BrandSerializer
#     permission_classes = [IsAuthenticated]
#     filter_backends = [filters.SearchFilter, filters.OrderingFilter]
#     search_fields = ['name', 'category', 'creator__username']
#     ordering_fields = ['name', 'created_at']
    
#     @action(detail=False, methods=['get'])
#     def available(self, request):
#         """Получение доступных магазинов с фильтрацией"""
#         serializer = AvailableBrandsFilterSerializer(data=request.query_params)
#         serializer.is_valid(raise_exception=True)
        
#         filters_data = serializer.validated_data
#         queryset = Brand.objects.filter(is_active=True)
        
#         # Применяем фильтры
#         if filters_data.get('category'):
#             queryset = queryset.filter(category=filters_data['category'])
        
#         if filters_data.get('creator'):
#             queryset = queryset.filter(creator__username=filters_data['creator'])
        
#         # Исключаем уже подключенные магазины
#         user_connected_brands = UserBrandConnection.objects.filter(
#             user=request.user
#         ).values_list('brand_id', flat=True)
#         queryset = queryset.exclude(id__in=user_connected_brands)
        
#         # Получаем уникальные значения для фильтров
#         categories = Brand.objects.filter(
#             is_active=True
#         ).values_list('category', flat=True).distinct()
        
#         creators = Brand.objects.filter(
#             is_active=True
#         ).values_list('creator__username', flat=True).distinct()
        
#         page = self.paginate_queryset(queryset)
#         if page is not None:
#             serializer = self.get_serializer(page, many=True)
#             response = self.get_paginated_response(serializer.data)
#             response.data['filters'] = {
#                 'categories': list(categories),
#                 'creators': list(creators)
#             }
#             return response
        
#         serializer = self.get_serializer(queryset, many=True)
#         return Response({
#             'brands': serializer.data,
#             'filters': {
#                 'categories': list(categories),
#                 'creators': list(creators)
#             }
#         })

# class ProductViewSet(viewsets.ModelViewSet):
#     """ViewSet для товаров"""
#     queryset = Product.objects.filter(is_active=True)
#     serializer_class = ProductSerializer
#     permission_classes = [IsAuthenticated]
#     filter_backends = [filters.SearchFilter, filters.OrderingFilter]
#     search_fields = ['name', 'description', 'category']
#     ordering_fields = ['name', 'price', 'created_at']

# class CartViewSet(viewsets.ReadOnlyModelViewSet):
#     """ViewSet для корзины (только чтение)"""
#     serializer_class = CartSerializer
#     permission_classes = [IsAuthenticated]
    
#     def get_queryset(self):
#         return Cart.objects.filter(user=self.request.user)
    
#     def get_object(self):
#         """Получаем или создаем корзину пользователя"""
#         cart, created = Cart.objects.get_or_create(user=self.request.user)  # Исправлено
#         return cart
    
#     @action(detail=False, methods=['post'])
#     def add_item(self, request):
#         """Добавление товара в корзину"""
#         serializer = CartItemCreateSerializer(
#             data=request.data,
#             context={'request': request}
#         )
#         serializer.is_valid(raise_exception=True)
#         cart_item = serializer.save()
        
#         return Response(
#             CartItemSerializer(cart_item).data,
#             status=status.HTTP_201_CREATED
#         )
    
#     @action(detail=False, methods=['put'])
#     def update_item(self, request):
#         """Обновление количества товара в корзине"""
#         product_id = request.data.get('product_id')
#         quantity = request.data.get('quantity')
        
#         if not product_id or quantity is None:
#             return Response(
#                 {"error": "Необходимо указать product_id и quantity"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )
        
#         cart = self.get_object()
#         try:
#             cart_item = cart.lk_items.get(product_id=product_id)  # Исправлено
#             if quantity <= 0:
#                 cart_item.delete()
#                 return Response(status=status.HTTP_204_NO_CONTENT)
#             else:
#                 cart_item.quantity = quantity
#                 cart_item.save()
#                 return Response(CartItemSerializer(cart_item).data)
#         except CartItem.DoesNotExist:
#             return Response(
#                 {"error": "Товар не найден в корзине"},
#                 status=status.HTTP_404_NOT_FOUND
#             )
    
#     @action(detail=False, methods=['delete'])
#     def remove_item(self, request):
#         """Удаление товара из корзины"""
#         product_id = request.query_params.get('product_id')
        
#         if not product_id:
#             return Response(
#                 {"error": "Необходимо указать product_id"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )
        
#         cart = self.get_object()
#         deleted_count, _ = cart.lk_items.filter(product_id=product_id).delete()  # Исправлено
        
#         if deleted_count > 0:
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         else:
#             return Response(
#                 {"error": "Товар не найден в корзине"},
#                 status=status.HTTP_404_NOT_FOUND
#             )
    
#     @action(detail=False, methods=['delete'])
#     def clear(self, request):
#         """Очистка корзины"""
#         cart = self.get_object()
#         cart.lk_items.all().delete()  # Исправлено
#         return Response(status=status.HTTP_204_NO_CONTENT)
    
#     @action(detail=False, methods=['post'])
#     def checkout(self, request):
#         """Оформление заказа"""
#         cart = self.get_object()
        
#         if cart.items_count == 0:
#             return Response(
#                 {"error": "Корзина пуста"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )
        
#         # Здесь должна быть логика оформления заказа
#         # Пока просто очищаем корзину
#         cart.lk_items.all().delete()  # Исправлено
        
#         return Response({
#             "success": True,
#             "message": "Заказ успешно оформлен",
#             "total_amount": str(cart.total_amount)
#         })

# class UserBrandConnectionViewSet(viewsets.ModelViewSet):
#     """ViewSet для подключений к магазинам"""
#     serializer_class = UserBrandConnectionSerializer
#     permission_classes = [IsAuthenticated]
    
#     def get_queryset(self):
#         return UserBrandConnection.objects.filter(user=self.request.user)
    
#     def create(self, request):
#         """Подключение к магазину"""
#         brand_id = request.data.get('brand_id')
        
#         if not brand_id:
#             return Response(
#                 {"error": "Необходимо указать brand_id"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )
        
#         try:
#             brand = Brand.objects.get(id=brand_id, is_active=True)
#         except Brand.DoesNotExist:
#             return Response(
#                 {"error": "Магазин не найден"},
#                 status=status.HTTP_404_NOT_FOUND
#             )
        
#         # Проверяем, не подключен ли уже пользователь к этому магазину
#         if UserBrandConnection.objects.filter(user=request.user, brand=brand).exists():
#             return Response(
#                 {"error": "Вы уже подключены к этому магазину"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )
        
#         connection = UserBrandConnection.objects.create(
#             user=request.user,
#             brand=brand
#         )
        
#         return Response(
#             self.get_serializer(connection).data,
#             status=status.HTTP_201_CREATED
#         )

# class DashboardView(APIView):
#     """API для получения данных для дашборда пользователя"""
#     permission_classes = [IsAuthenticated]
    
#     def get(self, request):
#         """Получение данных для личного кабинета"""
#         user = request.user
        
#         # Подключенные магазины
#         connected_brands = UserBrandConnection.objects.filter(user=user)
#         connected_serializer = UserBrandConnectionSerializer(
#             connected_brands,
#             many=True
#         )
        
#         # Корзина
#         cart, _ = Cart.objects.get_or_create(user=user)
#         cart_serializer = CartSerializer(cart)
        
#         # Доступные магазины (первые 12 для примера)
#         available_brands = Brand.objects.filter(
#             is_active=True
#         ).exclude(
#             id__in=connected_brands.values_list('brand_id', flat=True)
#         )[:12]
        
#         brand_serializer = BrandSerializer(available_brands, many=True)
        
#         return Response({
#             'user': {
#                 'id': user.id,
#                 'username': user.username,
#                 'email': user.email,
#             },
#             'cart': cart_serializer.data,
#             'connected_brands': connected_serializer.data,
#             'available_brands': brand_serializer.data,
#         })









# from django.shortcuts import get_object_or_404
# from rest_framework import viewsets, status, filters
# from rest_framework.decorators import action
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.views import APIView
# from django.db.models import Q
# from django.contrib.auth import get_user_model

# from .models import Brand, Product, Cart, CartItem, UserBrandConnection, PublishedProject
# from .serializers import (
#     BrandSerializer, ProductSerializer, CartSerializer,
#     CartItemSerializer, CartItemCreateSerializer,
#     UserBrandConnectionSerializer, AvailableBrandsFilterSerializer,
#     PublishedProjectSerializer, AvailableProjectsFilterSerializer
# )

# User = get_user_model()

# class BrandViewSet(viewsets.ModelViewSet):
#     """ViewSet для магазинов"""
#     queryset = Brand.objects.filter(is_active=True)
#     serializer_class = BrandSerializer
#     permission_classes = [IsAuthenticated]
#     filter_backends = [filters.SearchFilter, filters.OrderingFilter]
#     search_fields = ['name', 'category', 'creator__username']
#     ordering_fields = ['name', 'created_at']
    
#     @action(detail=False, methods=['get'])
#     def available(self, request):
#         """Получение доступных магазинов с фильтрацией"""
#         serializer = AvailableBrandsFilterSerializer(data=request.query_params)
#         serializer.is_valid(raise_exception=True)
        
#         filters_data = serializer.validated_data
#         queryset = Brand.objects.filter(is_active=True)
        
#         # Применяем фильтры
#         if filters_data.get('category'):
#             queryset = queryset.filter(category=filters_data['category'])
        
#         if filters_data.get('creator'):
#             queryset = queryset.filter(creator__username=filters_data['creator'])
        
#         # Исключаем уже подключенные магазины
#         user_connected_brands = UserBrandConnection.objects.filter(
#             user=request.user
#         ).values_list('brand_id', flat=True)
#         queryset = queryset.exclude(id__in=user_connected_brands)
        
#         # Получаем уникальные значения для фильтров
#         categories = Brand.objects.filter(
#             is_active=True
#         ).values_list('category', flat=True).distinct()
        
#         creators = Brand.objects.filter(
#             is_active=True
#         ).values_list('creator__username', flat=True).distinct()
        
#         page = self.paginate_queryset(queryset)
#         if page is not None:
#             serializer = self.get_serializer(page, many=True)
#             response = self.get_paginated_response(serializer.data)
#             response.data['filters'] = {
#                 'categories': list(categories),
#                 'creators': list(creators)
#             }
#             return response
        
#         serializer = self.get_serializer(queryset, many=True)
#         return Response({
#             'brands': serializer.data,
#             'filters': {
#                 'categories': list(categories),
#                 'creators': list(creators)
#             }
#         })

# class ProductViewSet(viewsets.ModelViewSet):
#     """ViewSet для товаров"""
#     queryset = Product.objects.filter(is_active=True)
#     serializer_class = ProductSerializer
#     permission_classes = [IsAuthenticated]
#     filter_backends = [filters.SearchFilter, filters.OrderingFilter]
#     search_fields = ['name', 'description', 'category']
#     ordering_fields = ['name', 'price', 'created_at']

# class CartViewSet(viewsets.ReadOnlyModelViewSet):
#     """ViewSet для корзины (только чтение)"""
#     serializer_class = CartSerializer
#     permission_classes = [IsAuthenticated]
    
#     def get_queryset(self):
#         return Cart.objects.filter(user=self.request.user)
    
#     def get_object(self):
#         """Получаем или создаем корзину пользователя"""
#         cart, created = Cart.objects.get_or_create(user=self.request.user)
#         return cart
    
#     @action(detail=False, methods=['post'])
#     def add_item(self, request):
#         """Добавление товара в корзину"""
#         serializer = CartItemCreateSerializer(
#             data=request.data,
#             context={'request': request}
#         )
#         serializer.is_valid(raise_exception=True)
#         cart_item = serializer.save()
        
#         return Response(
#             CartItemSerializer(cart_item).data,
#             status=status.HTTP_201_CREATED
#         )
    
#     @action(detail=False, methods=['put'])
#     def update_item(self, request):
#         """Обновление количества товара в корзине"""
#         product_id = request.data.get('product_id')
#         quantity = request.data.get('quantity')
        
#         if not product_id or quantity is None:
#             return Response(
#                 {"error": "Необходимо указать product_id и quantity"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )
        
#         cart = self.get_object()
#         try:
#             cart_item = cart.lk_items.get(product_id=product_id)
#             if quantity <= 0:
#                 cart_item.delete()
#                 return Response(status=status.HTTP_204_NO_CONTENT)
#             else:
#                 cart_item.quantity = quantity
#                 cart_item.save()
#                 return Response(CartItemSerializer(cart_item).data)
#         except CartItem.DoesNotExist:
#             return Response(
#                 {"error": "Товар не найден в корзине"},
#                 status=status.HTTP_404_NOT_FOUND
#             )
    
#     @action(detail=False, methods=['delete'])
#     def remove_item(self, request):
#         """Удаление товара из корзины"""
#         product_id = request.query_params.get('product_id')
        
#         if not product_id:
#             return Response(
#                 {"error": "Необходимо указать product_id"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )
        
#         cart = self.get_object()
#         deleted_count, _ = cart.lk_items.filter(product_id=product_id).delete()
        
#         if deleted_count > 0:
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         else:
#             return Response(
#                 {"error": "Товар не найден в корзине"},
#                 status=status.HTTP_404_NOT_FOUND
#             )
    
#     @action(detail=False, methods=['delete'])
#     def clear(self, request):
#         """Очистка корзины"""
#         cart = self.get_object()
#         cart.lk_items.all().delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
    
#     @action(detail=False, methods=['post'])
#     def checkout(self, request):
#         """Оформление заказа"""
#         cart = self.get_object()
        
#         if cart.items_count == 0:
#             return Response(
#                 {"error": "Корзина пуста"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )
        
#         # Здесь должна быть логика оформления заказа
#         # Пока просто очищаем корзину
#         cart.lk_items.all().delete()
        
#         return Response({
#             "success": True,
#             "message": "Заказ успешно оформлен",
#             "total_amount": str(cart.total_amount)
#         })

# class UserBrandConnectionViewSet(viewsets.ModelViewSet):
#     """ViewSet для подключений к магазинам"""
#     serializer_class = UserBrandConnectionSerializer
#     permission_classes = [IsAuthenticated]
    
#     def get_queryset(self):
#         return UserBrandConnection.objects.filter(user=self.request.user)
    
#     def create(self, request):
#         """Подключение к магазину"""
#         brand_id = request.data.get('brand_id')
        
#         if not brand_id:
#             return Response(
#                 {"error": "Необходимо указать brand_id"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )
        
#         try:
#             brand = Brand.objects.get(id=brand_id, is_active=True)
#         except Brand.DoesNotExist:
#             return Response(
#                 {"error": "Магазин не найден"},
#                 status=status.HTTP_404_NOT_FOUND
#             )
        
#         # Проверяем, не подключен ли уже пользователь к этому магазину
#         if UserBrandConnection.objects.filter(user=request.user, brand=brand).exists():
#             return Response(
#                 {"error": "Вы уже подключены к этому магазину"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )
        
#         connection = UserBrandConnection.objects.create(
#             user=request.user,
#             brand=brand
#         )
        
#         return Response(
#             self.get_serializer(connection).data,
#             status=status.HTTP_201_CREATED
#         )

# class PublishedProjectViewSet(viewsets.ReadOnlyModelViewSet):
#     """ViewSet для опубликованных проектов"""
#     serializer_class = PublishedProjectSerializer
#     permission_classes = [IsAuthenticated]
    
#     def get_queryset(self):
#         """Получаем только активные проекты"""
#         queryset = PublishedProject.objects.filter(is_active=True)
        
#         # Фильтр по категории
#         category = self.request.query_params.get('category')
#         if category:
#             queryset = queryset.filter(category=category)
        
#         # Фильтр по типу (магазин/сайт)
#         is_shop = self.request.query_params.get('is_shop')
#         if is_shop is not None:
#             queryset = queryset.filter(is_shop=is_shop.lower() == 'true')
        
#         # Фильтр по владельцу
#         owner = self.request.query_params.get('owner')
#         if owner:
#             queryset = queryset.filter(owner__username=owner)
        
#         return queryset
    
#     @action(detail=False, methods=['get'])
#     def categories(self, request):
#         """Получение списка всех категорий"""
#         categories = PublishedProject.objects.filter(
#             is_active=True,
#             category__isnull=False
#         ).exclude(
#             category=''
#         ).values_list('category', flat=True).distinct()
        
#         return Response({
#             'categories': list(categories)
#         })
    
#     @action(detail=False, methods=['get'])
#     def creators(self, request):
#         """Получение списка всех создателей"""
#         creators = PublishedProject.objects.filter(
#             is_active=True
#         ).values_list('owner__username', flat=True).distinct()
        
#         return Response({
#             'creators': list(creators)
#         })

# class AvailableProjectsView(APIView):
#     """API для получения доступных проектов с фильтрацией"""
#     permission_classes = [IsAuthenticated]
    
#     def get(self, request):
#         """Получение доступных проектов с фильтрами"""
#         serializer = AvailableProjectsFilterSerializer(data=request.query_params)
#         serializer.is_valid(raise_exception=True)
        
#         filters_data = serializer.validated_data
#         queryset = PublishedProject.objects.filter(is_active=True)
        
#         # Применяем фильтры
#         if filters_data.get('category'):
#             queryset = queryset.filter(category=filters_data['category'])
        
#         if filters_data.get('creator'):
#             queryset = queryset.filter(owner__username=filters_data['creator'])
        
#         if filters_data.get('search'):
#             search_term = filters_data['search']
#             queryset = queryset.filter(
#                 Q(title__icontains=search_term) |
#                 Q(description__icontains=search_term) |
#                 Q(owner__username__icontains=search_term)
#             )
        
#         # Исключаем проекты, созданные текущим пользователем
#         queryset = queryset.exclude(owner=request.user)
        
#         # Получаем уникальные значения для фильтров
#         categories = PublishedProject.objects.filter(
#             is_active=True
#         ).exclude(
#             category__isnull=True
#         ).exclude(
#             category=''
#         ).values_list('category', flat=True).distinct()
        
#         creators = PublishedProject.objects.filter(
#             is_active=True
#         ).exclude(
#             owner=request.user
#         ).values_list('owner__username', flat=True).distinct()
        
#         # Сериализуем данные
#         project_serializer = PublishedProjectSerializer(
#             queryset,
#             many=True,
#             context={'request': request}
#         )
        
#         return Response({
#             'projects': project_serializer.data,
#             'filters': {
#                 'categories': list(categories),
#                 'creators': list(creators)
#             }
#         })

# class DashboardView(APIView):
#     """API для получения данных для дашборда пользователя"""
#     permission_classes = [IsAuthenticated]
    
#     def get(self, request):
#         """Получение данных для личного кабинета"""
#         user = request.user
        
#         # Подключенные магазины
#         connected_brands = UserBrandConnection.objects.filter(user=user)
#         connected_serializer = UserBrandConnectionSerializer(
#             connected_brands,
#             many=True
#         )
        
#         # Корзина
#         cart, _ = Cart.objects.get_or_create(user=user)
#         cart_serializer = CartSerializer(cart)
        
#         # Доступные магазины (первые 12 для примера)
#         available_brands = Brand.objects.filter(
#             is_active=True
#         ).exclude(
#             id__in=connected_brands.values_list('brand_id', flat=True)
#         )[:12]
        
#         brand_serializer = BrandSerializer(available_brands, many=True)
        
#         # Доступные проекты (первые 8 для примера)
#         available_projects = PublishedProject.objects.filter(
#             is_active=True
#         ).exclude(
#             owner=user
#         )[:8]
        
#         project_serializer = PublishedProjectSerializer(
#             available_projects,
#             many=True,
#             context={'request': request}
#         )
        
#         return Response({
#             'user': {
#                 'id': user.id,
#                 'username': user.username,
#                 'email': user.email,
#             },
#             'cart': cart_serializer.data,
#             'connected_brands': connected_serializer.data,
#             'available_brands': brand_serializer.data,
#             'available_projects': project_serializer.data,
#         })














# from django.shortcuts import get_object_or_404
# from rest_framework import viewsets, status, filters
# from rest_framework.decorators import action
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.views import APIView
# from django.db.models import Q
# from django.contrib.auth import get_user_model

# from .models import Brand, Product, Cart, CartItem, UserBrandConnection, PublishedProject
# from .serializers import (
#     BrandSerializer, ProductSerializer, CartSerializer,
#     CartItemSerializer, CartItemCreateSerializer,
#     UserBrandConnectionSerializer, AvailableBrandsFilterSerializer,
#     PublishedProjectSerializer, AvailableProjectsFilterSerializer
# )

# User = get_user_model()

# class BrandViewSet(viewsets.ModelViewSet):
#     """ViewSet для магазинов"""
#     queryset = Brand.objects.filter(is_active=True)
#     serializer_class = BrandSerializer
#     permission_classes = [IsAuthenticated]
#     filter_backends = [filters.SearchFilter, filters.OrderingFilter]
#     search_fields = ['name', 'category', 'creator__username']
#     ordering_fields = ['name', 'created_at']
    
#     @action(detail=False, methods=['get'])
#     def available(self, request):
#         """Получение доступных магазинов с фильтрацией"""
#         serializer = AvailableBrandsFilterSerializer(data=request.query_params)
#         serializer.is_valid(raise_exception=True)
        
#         filters_data = serializer.validated_data
#         queryset = Brand.objects.filter(is_active=True)
        
#         # Применяем фильтры
#         if filters_data.get('category'):
#             queryset = queryset.filter(category=filters_data['category'])
        
#         if filters_data.get('creator'):
#             queryset = queryset.filter(creator__username=filters_data['creator'])
        
#         # Исключаем уже подключенные магазины
#         user_connected_brands = UserBrandConnection.objects.filter(
#             user=request.user
#         ).values_list('brand_id', flat=True)
#         queryset = queryset.exclude(id__in=user_connected_brands)
        
#         # Получаем уникальные значения для фильтров
#         categories = Brand.objects.filter(
#             is_active=True
#         ).values_list('category', flat=True).distinct()
        
#         creators = Brand.objects.filter(
#             is_active=True
#         ).values_list('creator__username', flat=True).distinct()
        
#         page = self.paginate_queryset(queryset)
#         if page is not None:
#             serializer = self.get_serializer(page, many=True)
#             response = self.get_paginated_response(serializer.data)
#             response.data['filters'] = {
#                 'categories': list(categories),
#                 'creators': list(creators)
#             }
#             return response
        
#         serializer = self.get_serializer(queryset, many=True)
#         return Response({
#             'brands': serializer.data,
#             'filters': {
#                 'categories': list(categories),
#                 'creators': list(creators)
#             }
#         })


# class ProductViewSet(viewsets.ModelViewSet):
#     """ViewSet для товаров"""
#     queryset = Product.objects.filter(is_active=True)
#     serializer_class = ProductSerializer
#     permission_classes = [IsAuthenticated]
#     filter_backends = [filters.SearchFilter, filters.OrderingFilter]
#     search_fields = ['name', 'description', 'category']
#     ordering_fields = ['name', 'price', 'created_at']


# class CartViewSet(viewsets.ReadOnlyModelViewSet):
#     """ViewSet для корзины (только чтение)"""
#     serializer_class = CartSerializer
#     permission_classes = [IsAuthenticated]
    
#     def get_queryset(self):
#         return Cart.objects.filter(user=self.request.user)
    
#     def get_object(self):
#         """Получаем или создаем корзину пользователя"""
#         cart, created = Cart.objects.get_or_create(user=self.request.user)
#         return cart
    
#     @action(detail=False, methods=['post'])
#     def add_item(self, request):
#         """Добавление товара в корзину"""
#         serializer = CartItemCreateSerializer(
#             data=request.data,
#             context={'request': request}
#         )
#         serializer.is_valid(raise_exception=True)
#         cart_item = serializer.save()
        
#         return Response(
#             CartItemSerializer(cart_item).data,
#             status=status.HTTP_201_CREATED
#         )
    
#     @action(detail=False, methods=['put'])
#     def update_item(self, request):
#         """Обновление количества товара в корзине"""
#         product_id = request.data.get('product_id')
#         quantity = request.data.get('quantity')
        
#         if not product_id or quantity is None:
#             return Response(
#                 {"error": "Необходимо указать product_id и quantity"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )
        
#         cart = self.get_object()
#         try:
#             cart_item = cart.lk_items.get(product_id=product_id)
#             if quantity <= 0:
#                 cart_item.delete()
#                 return Response(status=status.HTTP_204_NO_CONTENT)
#             else:
#                 cart_item.quantity = quantity
#                 cart_item.save()
#                 return Response(CartItemSerializer(cart_item).data)
#         except CartItem.DoesNotExist:
#             return Response(
#                 {"error": "Товар не найден в корзине"},
#                 status=status.HTTP_404_NOT_FOUND
#             )
    
#     @action(detail=False, methods=['delete'])
#     def remove_item(self, request):
#         """Удаление товара из корзины"""
#         product_id = request.query_params.get('product_id')
        
#         if not product_id:
#             return Response(
#                 {"error": "Необходимо указать product_id"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )
        
#         cart = self.get_object()
#         deleted_count, _ = cart.lk_items.filter(product_id=product_id).delete()
        
#         if deleted_count > 0:
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         else:
#             return Response(
#                 {"error": "Товар не найден в корзине"},
#                 status=status.HTTP_404_NOT_FOUND
#             )
    
#     @action(detail=False, methods=['delete'])
#     def clear(self, request):
#         """Очистка корзины"""
#         cart = self.get_object()
#         cart.lk_items.all().delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
    
#     @action(detail=False, methods=['post'])
#     def checkout(self, request):
#         """Оформление заказа"""
#         cart = self.get_object()
        
#         if cart.items_count == 0:
#             return Response(
#                 {"error": "Корзина пуста"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )
        
#         # Здесь должна быть логика оформления заказа
#         # Пока просто очищаем корзину
#         cart.lk_items.all().delete()
        
#         return Response({
#             "success": True,
#             "message": "Заказ успешно оформлен",
#             "total_amount": str(cart.total_amount)
#         })


# class UserBrandConnectionViewSet(viewsets.ModelViewSet):
#     """ViewSet для подключений к магазинам"""
#     serializer_class = UserBrandConnectionSerializer
#     permission_classes = [IsAuthenticated]
    
#     def get_queryset(self):
#         return UserBrandConnection.objects.filter(user=self.request.user)
    
#     def create(self, request):
#         """Подключение к магазину"""
#         brand_id = request.data.get('brand_id')
        
#         if not brand_id:
#             return Response(
#                 {"error": "Необходимо указать brand_id"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )
        
#         try:
#             brand = Brand.objects.get(id=brand_id, is_active=True)
#         except Brand.DoesNotExist:
#             return Response(
#                 {"error": "Магазин не найден"},
#                 status=status.HTTP_404_NOT_FOUND
#             )
        
#         # Проверяем, не подключен ли уже пользователь к этому магазину
#         if UserBrandConnection.objects.filter(user=request.user, brand=brand).exists():
#             return Response(
#                 {"error": "Вы уже подключены к этому магазину"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )
        
#         connection = UserBrandConnection.objects.create(
#             user=request.user,
#             brand=brand
#         )
        
#         return Response(
#             self.get_serializer(connection).data,
#             status=status.HTTP_201_CREATED
#         )


# class PublishedProjectViewSet(viewsets.ReadOnlyModelViewSet):
#     """ViewSet для опубликованных проектов"""
#     serializer_class = PublishedProjectSerializer
#     permission_classes = [IsAuthenticated]
    
#     def get_queryset(self):
#         """Получаем только активные проекты"""
#         queryset = PublishedProject.objects.filter(is_active=True)
        
#         # Фильтр по категории
#         category = self.request.query_params.get('category')
#         if category:
#             queryset = queryset.filter(category=category)
        
#         # Фильтр по типу (магазин/сайт)
#         is_shop = self.request.query_params.get('is_shop')
#         if is_shop is not None:
#             queryset = queryset.filter(is_shop=is_shop.lower() == 'true')
        
#         # Фильтр по владельцу
#         owner = self.request.query_params.get('owner')
#         if owner:
#             queryset = queryset.filter(owner__username=owner)
        
#         return queryset
    
#     @action(detail=False, methods=['get'])
#     def categories(self, request):
#         """Получение списка всех категорий"""
#         categories = PublishedProject.objects.filter(
#             is_active=True,
#             category__isnull=False
#         ).exclude(
#             category=''
#         ).values_list('category', flat=True).distinct()
        
#         return Response({
#             'categories': list(categories)
#         })
    
#     @action(detail=False, methods=['get'])
#     def creators(self, request):
#         """Получение списка всех создателей"""
#         creators = PublishedProject.objects.filter(
#             is_active=True
#         ).values_list('owner__username', flat=True).distinct()
        
#         return Response({
#             'creators': list(creators)
#         })


# class AvailableProjectsView(APIView):
#     """API для получения доступных проектов с фильтрацией (аналог available для брендов)"""
#     permission_classes = [IsAuthenticated]
    
#     def get(self, request):
#         """Получение доступных проектов с фильтрами"""
#         serializer = AvailableProjectsFilterSerializer(data=request.query_params)
#         serializer.is_valid(raise_exception=True)
        
#         filters_data = serializer.validated_data
#         queryset = PublishedProject.objects.filter(is_active=True)
        
#         # Применяем фильтры
#         if filters_data.get('category'):
#             queryset = queryset.filter(category=filters_data['category'])
        
#         if filters_data.get('creator'):
#             queryset = queryset.filter(owner__username=filters_data['creator'])
        
#         if filters_data.get('search'):
#             search_term = filters_data['search']
#             queryset = queryset.filter(
#                 Q(title__icontains=search_term) |
#                 Q(description__icontains=search_term) |
#                 Q(owner__username__icontains=search_term)
#             )
        
#         # Исключаем проекты, созданные текущим пользователем
#         queryset = queryset.exclude(owner=request.user)
        
#         # Получаем уникальные значения для фильтров
#         categories = PublishedProject.objects.filter(
#             is_active=True
#         ).exclude(
#             category__isnull=True
#         ).exclude(
#             category=''
#         ).values_list('category', flat=True).distinct()
        
#         creators = PublishedProject.objects.filter(
#             is_active=True
#         ).exclude(
#             owner=request.user
#         ).values_list('owner__username', flat=True).distinct()
        
#         # Сериализуем данные
#         project_serializer = PublishedProjectSerializer(
#             queryset,
#             many=True,
#             context={'request': request}
#         )
        
#         # ВАЖНО: возвращаем в формате, совместимом с фронтендом
#         return Response({
#             'projects': project_serializer.data,  # ← ключ 'projects', как в UserDashboard.jsx
#             'filters': {
#                 'categories': list(categories),
#                 'creators': list(creators)
#             }
#         })


# class DashboardView(APIView):
#     """API для получения данных для дашборда пользователя"""
#     permission_classes = [IsAuthenticated]
    
#     def get(self, request):
#         """Получение данных для личного кабинета"""
#         user = request.user
        
#         # Подключенные магазины
#         connected_brands = UserBrandConnection.objects.filter(user=user)
#         connected_serializer = UserBrandConnectionSerializer(
#             connected_brands,
#             many=True
#         )
        
#         # Корзина
#         cart, _ = Cart.objects.get_or_create(user=user)
#         cart_serializer = CartSerializer(cart)
        
#         # Доступные магазины (первые 12 для примера)
#         available_brands = Brand.objects.filter(
#             is_active=True
#         ).exclude(
#             id__in=connected_brands.values_list('brand_id', flat=True)
#         )[:12]
        
#         brand_serializer = BrandSerializer(available_brands, many=True)
        
#         # Доступные проекты (первые 8 для примера)
#         available_projects = PublishedProject.objects.filter(
#             is_active=True
#         ).exclude(
#             owner=user
#         )[:8]
        
#         project_serializer = PublishedProjectSerializer(
#             available_projects,
#             many=True,
#             context={'request': request}
#         )
        
#         return Response({
#             'user': {
#                 'id': user.id,
#                 'username': user.username,
#                 'email': user.email,
#             },
#             'cart': cart_serializer.data,
#             'connected_brands': connected_serializer.data,
#             'available_brands': brand_serializer.data,
#             'available_projects': project_serializer.data,
#         })










# from django.shortcuts import get_object_or_404
# from rest_framework import viewsets, status, filters
# from rest_framework.decorators import action
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.views import APIView
# from django.db.models import Q
# from django.contrib.auth import get_user_model
# from .models import Brand, Product, Cart, CartItem, UserBrandConnection
# from .serializers import (
#     BrandSerializer, ProductSerializer, CartSerializer,
#     CartItemSerializer, CartItemCreateSerializer,
#     UserBrandConnectionSerializer, AvailableBrandsFilterSerializer,
#     AvailableProjectsFilterSerializer
# )

# # Импортируем модель и сериализатор из construct (без изменения самого приложения)
# from construct.models import PageDesign
# from construct.serializers import PageDesignSerializer

# User = get_user_model()


# class BrandViewSet(viewsets.ModelViewSet):
#     """ViewSet для магазинов"""
#     queryset = Brand.objects.filter(is_active=True)
#     serializer_class = BrandSerializer
#     permission_classes = [IsAuthenticated]
#     filter_backends = [filters.SearchFilter, filters.OrderingFilter]
#     search_fields = ['name', 'category', 'creator__username']
#     ordering_fields = ['name', 'created_at']
    
#     @action(detail=False, methods=['get'])
#     def available(self, request):
#         """Получение доступных магазинов с фильтрацией"""
#         serializer = AvailableBrandsFilterSerializer(data=request.query_params)
#         serializer.is_valid(raise_exception=True)
        
#         filters_data = serializer.validated_data
#         queryset = Brand.objects.filter(is_active=True)
        
#         if filters_data.get('category'):
#             queryset = queryset.filter(category=filters_data['category'])
#         if filters_data.get('creator'):
#             queryset = queryset.filter(creator__username=filters_data['creator'])
        
#         user_connected_brands = UserBrandConnection.objects.filter(
#             user=request.user
#         ).values_list('brand_id', flat=True)
#         queryset = queryset.exclude(id__in=user_connected_brands)
        
#         categories = Brand.objects.filter(is_active=True).values_list('category', flat=True).distinct()
#         creators = Brand.objects.filter(is_active=True).values_list('creator__username', flat=True).distinct()
        
#         page = self.paginate_queryset(queryset)
#         if page is not None:
#             serializer = self.get_serializer(page, many=True)
#             response = self.get_paginated_response(serializer.data)
#             response.data['filters'] = {
#                 'categories': list(categories),
#                 'creators': list(creators)
#             }
#             return response
        
#         serializer = self.get_serializer(queryset, many=True)
#         return Response({
#             'brands': serializer.data,
#             'filters': {
#                 'categories': list(categories),
#                 'creators': list(creators)
#             }
#         })


# class ProductViewSet(viewsets.ModelViewSet):
#     """ViewSet для товаров"""
#     queryset = Product.objects.filter(is_active=True)
#     serializer_class = ProductSerializer
#     permission_classes = [IsAuthenticated]
#     filter_backends = [filters.SearchFilter, filters.OrderingFilter]
#     search_fields = ['name', 'description', 'category']
#     ordering_fields = ['name', 'price', 'created_at']


# class CartViewSet(viewsets.ReadOnlyModelViewSet):
#     """ViewSet для корзины (только чтение)"""
#     serializer_class = CartSerializer
#     permission_classes = [IsAuthenticated]
    
#     def get_queryset(self):
#         return Cart.objects.filter(user=self.request.user)
    
#     def get_object(self):
#         cart, created = Cart.objects.get_or_create(user=self.request.user)
#         return cart
    
#     @action(detail=False, methods=['post'])
#     def add_item(self, request):
#         serializer = CartItemCreateSerializer(data=request.data, context={'request': request})
#         serializer.is_valid(raise_exception=True)
#         cart_item = serializer.save()
#         return Response(CartItemSerializer(cart_item).data, status=status.HTTP_201_CREATED)
    
#     @action(detail=False, methods=['put'])
#     def update_item(self, request):
#         product_id = request.data.get('product_id')
#         quantity = request.data.get('quantity')
#         if not product_id or quantity is None:
#             return Response({"error": "Необходимо указать product_id и quantity"}, status=status.HTTP_400_BAD_REQUEST)
#         cart = self.get_object()
#         try:
#             cart_item = cart.lk_items.get(product_id=product_id)
#             if quantity <= 0:
#                 cart_item.delete()
#                 return Response(status=status.HTTP_204_NO_CONTENT)
#             else:
#                 cart_item.quantity = quantity
#                 cart_item.save()
#                 return Response(CartItemSerializer(cart_item).data)
#         except CartItem.DoesNotExist:
#             return Response({"error": "Товар не найден в корзине"}, status=status.HTTP_404_NOT_FOUND)
    
#     @action(detail=False, methods=['delete'])
#     def remove_item(self, request):
#         product_id = request.query_params.get('product_id')
#         if not product_id:
#             return Response({"error": "Необходимо указать product_id"}, status=status.HTTP_400_BAD_REQUEST)
#         cart = self.get_object()
#         deleted_count, _ = cart.lk_items.filter(product_id=product_id).delete()
#         if deleted_count > 0:
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         else:
#             return Response({"error": "Товар не найден в корзине"}, status=status.HTTP_404_NOT_FOUND)
    
#     @action(detail=False, methods=['delete'])
#     def clear(self, request):
#         cart = self.get_object()
#         cart.lk_items.all().delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
    
#     @action(detail=False, methods=['post'])
#     def checkout(self, request):
#         cart = self.get_object()
#         if cart.items_count == 0:
#             return Response({"error": "Корзина пуста"}, status=status.HTTP_400_BAD_REQUEST)
#         cart.lk_items.all().delete()
#         return Response({
#             "success": True,
#             "message": "Заказ успешно оформлен",
#             "total_amount": str(cart.total_amount)
#         })


# class UserBrandConnectionViewSet(viewsets.ModelViewSet):
#     """ViewSet для подключений к магазинам"""
#     serializer_class = UserBrandConnectionSerializer
#     permission_classes = [IsAuthenticated]
    
#     def get_queryset(self):
#         return UserBrandConnection.objects.filter(user=self.request.user)
    
#     def create(self, request):
#         brand_id = request.data.get('brand_id')
#         if not brand_id:
#             return Response({"error": "Необходимо указать brand_id"}, status=status.HTTP_400_BAD_REQUEST)
#         try:
#             brand = Brand.objects.get(id=brand_id, is_active=True)
#         except Brand.DoesNotExist:
#             return Response({"error": "Магазин не найден"}, status=status.HTTP_404_NOT_FOUND)
#         if UserBrandConnection.objects.filter(user=request.user, brand=brand).exists():
#             return Response({"error": "Вы уже подключены к этому магазину"}, status=status.HTTP_400_BAD_REQUEST)
#         connection = UserBrandConnection.objects.create(user=request.user, brand=brand)
#         return Response(self.get_serializer(connection).data, status=status.HTTP_201_CREATED)


# class AvailableConstructDesignsView(APIView):
#     """API для получения доступных проектов из таблицы construct_pagedesign"""
#     permission_classes = [IsAuthenticated]
    
#     def get(self, request):
#         serializer = AvailableProjectsFilterSerializer(data=request.query_params)
#         serializer.is_valid(raise_exception=True)
#         filters_data = serializer.validated_data
        
#         queryset = PageDesign.objects.filter(is_active=True, is_public=True)
        
#         if filters_data.get('category'):
#             queryset = queryset.filter(metadata__contains={'category': filters_data['category']})
#         if filters_data.get('creator'):
#             queryset = queryset.filter(user__username=filters_data['creator'])
#         if filters_data.get('search'):
#             term = filters_data['search']
#             queryset = queryset.filter(
#                 Q(name__icontains=term) |
#                 Q(description__icontains=term) |
#                 Q(user__username__icontains=term)
#             )
        
#         queryset = queryset.exclude(user=request.user)
        
#         categories = PageDesign.objects.filter(
#             is_active=True, is_public=True
#         ).exclude(metadata__isnull=True).exclude(metadata__category='').values_list('metadata__category', flat=True).distinct()
        
#         creators = PageDesign.objects.filter(
#             is_active=True, is_public=True
#         ).exclude(user=request.user).values_list('user__username', flat=True).distinct()
        
#         project_serializer = PageDesignSerializer(queryset, many=True, context={'request': request})
        
#         return Response({
#             'projects': project_serializer.data,
#             'filters': {
#                 'categories': list(categories),
#                 'creators': list(creators)
#             }
#         })


# class DashboardView(APIView):
#     """API для получения данных для дашборда пользователя"""
#     permission_classes = [IsAuthenticated]
    
#     def get(self, request):
#         user = request.user
#         connected_brands = UserBrandConnection.objects.filter(user=user)
#         connected_serializer = UserBrandConnectionSerializer(connected_brands, many=True)
#         cart, _ = Cart.objects.get_or_create(user=user)
#         cart_serializer = CartSerializer(cart)
#         available_brands = Brand.objects.filter(is_active=True).exclude(id__in=connected_brands.values_list('brand_id', flat=True))[:12]
#         brand_serializer = BrandSerializer(available_brands, many=True)
#         available_projects = PageDesign.objects.filter(is_active=True, is_public=True).exclude(user=user)[:8]
#         project_serializer = PageDesignSerializer(available_projects, many=True, context={'request': request})
        
#         return Response({
#             'user': {
#                 'id': user.id,
#                 'username': user.username,
#                 'email': user.email,
#             },
#             'cart': cart_serializer.data,
#             'connected_brands': connected_serializer.data,
#             'available_brands': brand_serializer.data,
#             'available_projects': project_serializer.data,
#         })


# # === НОВЫЙ КЛАСС: Мои проекты ===
# class MyProjectsView(APIView):
#     """API для получения собственных проектов пользователя из construct_pagedesign"""
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         my_projects = PageDesign.objects.filter(user=request.user).order_by('-created_at')
#         serializer = PageDesignSerializer(my_projects, many=True, context={'request': request})
#         return Response({
#             'my_projects': serializer.data
#         })














# lk/views.py
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.db.models import Q
from django.contrib.auth import get_user_model

from .models import Brand, Product, Cart, CartItem, UserBrandConnection, PublishedProject
from .serializers import (
    BrandSerializer, ProductSerializer, CartSerializer,
    CartItemSerializer, CartItemCreateSerializer,
    UserBrandConnectionSerializer, AvailableBrandsFilterSerializer,
    PublishedProjectSerializer, AvailableProjectsFilterSerializer
)

User = get_user_model()


class BrandViewSet(viewsets.ModelViewSet):
    """ViewSet для магазинов"""
    queryset = Brand.objects.filter(is_active=True)
    serializer_class = BrandSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'category', 'creator__username']
    ordering_fields = ['name', 'created_at']
    
    @action(detail=False, methods=['get'])
    def available(self, request):
        """Получение доступных магазинов с фильтрацией"""
        serializer = AvailableBrandsFilterSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        
        filters_data = serializer.validated_data
        queryset = Brand.objects.filter(is_active=True)
        
        if filters_data.get('category'):
            queryset = queryset.filter(category=filters_data['category'])
        if filters_data.get('creator'):
            queryset = queryset.filter(creator__username=filters_data['creator'])
        
        user_connected_brands = UserBrandConnection.objects.filter(
            user=request.user
        ).values_list('brand_id', flat=True)
        queryset = queryset.exclude(id__in=user_connected_brands)
        
        categories = Brand.objects.filter(is_active=True).values_list('category', flat=True).distinct()
        creators = Brand.objects.filter(is_active=True).values_list('creator__username', flat=True).distinct()
        
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            response = self.get_paginated_response(serializer.data)
            response.data['filters'] = {
                'categories': list(categories),
                'creators': list(creators)
            }
            return response
        
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'brands': serializer.data,
            'filters': {
                'categories': list(categories),
                'creators': list(creators)
            }
        })


class ProductViewSet(viewsets.ModelViewSet):
    """ViewSet для товаров"""
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description', 'category']
    ordering_fields = ['name', 'price', 'created_at']


class CartViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet для корзины (только чтение)"""
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)
    
    def get_object(self):
        cart, created = Cart.objects.get_or_create(user=self.request.user)
        return cart
    
    @action(detail=False, methods=['post'])
    def add_item(self, request):
        serializer = CartItemCreateSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        cart_item = serializer.save()
        return Response(CartItemSerializer(cart_item).data, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['put'])
    def update_item(self, request):
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity')
        if not product_id or quantity is None:
            return Response({"error": "Необходимо указать product_id и quantity"}, status=status.HTTP_400_BAD_REQUEST)
        cart = self.get_object()
        try:
            cart_item = cart.lk_items.get(product_id=product_id)
            if quantity <= 0:
                cart_item.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                cart_item.quantity = quantity
                cart_item.save()
                return Response(CartItemSerializer(cart_item).data)
        except CartItem.DoesNotExist:
            return Response({"error": "Товар не найден в корзине"}, status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=False, methods=['delete'])
    def remove_item(self, request):
        product_id = request.query_params.get('product_id')
        if not product_id:
            return Response({"error": "Необходимо указать product_id"}, status=status.HTTP_400_BAD_REQUEST)
        cart = self.get_object()
        deleted_count, _ = cart.lk_items.filter(product_id=product_id).delete()
        if deleted_count > 0:
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"error": "Товар не найден в корзине"}, status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=False, methods=['delete'])
    def clear(self, request):
        cart = self.get_object()
        cart.lk_items.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    @action(detail=False, methods=['post'])
    def checkout(self, request):
        cart = self.get_object()
        if cart.items_count == 0:
            return Response({"error": "Корзина пуста"}, status=status.HTTP_400_BAD_REQUEST)
        cart.lk_items.all().delete()
        return Response({
            "success": True,
            "message": "Заказ успешно оформлен",
            "total_amount": str(cart.total_amount)
        })


class UserBrandConnectionViewSet(viewsets.ModelViewSet):
    """ViewSet для подключений к магазинам"""
    serializer_class = UserBrandConnectionSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return UserBrandConnection.objects.filter(user=self.request.user)
    
    def create(self, request):
        brand_id = request.data.get('brand_id')
        if not brand_id:
            return Response({"error": "Необходимо указать brand_id"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            brand = Brand.objects.get(id=brand_id, is_active=True)
        except Brand.DoesNotExist:
            return Response({"error": "Магазин не найден"}, status=status.HTTP_404_NOT_FOUND)
        if UserBrandConnection.objects.filter(user=request.user, brand=brand).exists():
            return Response({"error": "Вы уже подключены к этому магазину"}, status=status.HTTP_400_BAD_REQUEST)
        connection = UserBrandConnection.objects.create(user=request.user, brand=brand)
        return Response(self.get_serializer(connection).data, status=status.HTTP_201_CREATED)


class PublishedProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet для опубликованных проектов"""
    serializer_class = PublishedProjectSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        queryset = PublishedProject.objects.filter(is_active=True)
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category=category)
        is_shop = self.request.query_params.get('is_shop')
        if is_shop is not None:
            queryset = queryset.filter(is_shop=is_shop.lower() == 'true')
        owner = self.request.query_params.get('owner')
        if owner:
            queryset = queryset.filter(owner__username=owner)
        return queryset

    @action(detail=False, methods=['get'])
    def categories(self, request):
        categories = PublishedProject.objects.filter(
            is_active=True,
            category__isnull=False
        ).exclude(category='').values_list('category', flat=True).distinct()
        return Response({'categories': list(categories)})

    @action(detail=False, methods=['get'])
    def creators(self, request):
        creators = PublishedProject.objects.filter(is_active=True).values_list('owner__username', flat=True).distinct()
        return Response({'creators': list(creators)})


class AvailableProjectsView(APIView):
    """API для получения доступных проектов из PublishedProject (представление construct_pagedesign)"""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = AvailableProjectsFilterSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        filters_data = serializer.validated_data

        queryset = PublishedProject.objects.filter(is_active=True, is_shop=True)

        if filters_data.get('category'):
            queryset = queryset.filter(category=filters_data['category'])
        if filters_data.get('creator'):
            queryset = queryset.filter(owner__username=filters_data['creator'])
        if filters_data.get('search'):
            term = filters_data['search']
            queryset = queryset.filter(
                Q(title__icontains=term) |
                Q(description__icontains=term) |
                Q(owner__username__icontains=term)
            )

        # Исключаем проекты текущего пользователя
        queryset = queryset.exclude(owner=request.user)

        # Уникальные фильтры
        categories = PublishedProject.objects.filter(
            is_active=True, is_shop=True
        ).exclude(category__isnull=True).exclude(category='').values_list('category', flat=True).distinct()

        creators = PublishedProject.objects.filter(
            is_active=True, is_shop=True
        ).exclude(owner=request.user).values_list('owner__username', flat=True).distinct()

        # Сериализация
        project_serializer = PublishedProjectSerializer(queryset, many=True, context={'request': request})

        return Response({
            'projects': project_serializer.data,
            'filters': {
                'categories': list(categories),
                'creators': list(creators)
            }
        })


class DashboardView(APIView):
    """API для получения данных для дашборда пользователя"""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        connected_brands = UserBrandConnection.objects.filter(user=user)
        cart, _ = Cart.objects.get_or_create(user=user)
        available_brands = Brand.objects.filter(is_active=True).exclude(
            id__in=connected_brands.values_list('brand_id', flat=True)
        )[:12]
        available_projects = PublishedProject.objects.filter(
            is_active=True, is_shop=True
        ).exclude(owner=user)[:8]

        return Response({
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
            },
            'cart': CartSerializer(cart).data,
            'connected_brands': UserBrandConnectionSerializer(connected_brands, many=True).data,
            'available_brands': BrandSerializer(available_brands, many=True).data,
            'available_projects': PublishedProjectSerializer(available_projects, many=True, context={'request': request}).data,
        })