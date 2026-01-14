# from django.shortcuts import render, get_object_or_404
# from rest_framework import viewsets, status, filters
# from rest_framework.decorators import action, api_view, permission_classes
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
# from rest_framework.parsers import MultiPartParser, JSONParser, FormParser
# from rest_framework.views import APIView
# from django.http import HttpResponse, FileResponse, JsonResponse
# from django.db.models import Q
# import json
# import os

# from .models import PageDesign, PageDesignHistory, ContentItem
# from .serializers import (
#     PageDesignSerializer, 
#     PageDesignCreateSerializer,
#     PageDesignHistorySerializer,
#     ContentItemSerializer
# )

# # Импортируем модели из других приложений
# try:
#     from sello_tovar.models import Product as SelloProduct
#     from sello_news.models import News as SelloNews
#     from django.contrib.auth import get_user_model
#     User = get_user_model()
#     HAS_SELLO_MODELS = True
# except ImportError:
#     print("Предупреждение: Модели sello_tovar или sello_news не найдены")
#     HAS_SELLO_MODELS = False

# @api_view(['GET'])
# @permission_classes([AllowAny])
# def constructor_view(request):
#     """Главная страница конструктора"""
#     return render(request, 'constructor/index.html')

# class PageDesignViewSet(viewsets.ModelViewSet):
#     """API для работы с дизайнами страниц"""
#     queryset = PageDesign.objects.all()
#     serializer_class = PageDesignSerializer
#     filter_backends = [filters.SearchFilter, filters.OrderingFilter]
#     search_fields = ['name', 'metadata']
#     ordering_fields = ['created_at', 'updated_at', 'name', 'blocks_count']
#     ordering = ['-updated_at']
#     parser_classes = [MultiPartParser, JSONParser, FormParser]
    
#     def get_queryset(self):
#         """Фильтрация по правам доступа"""
#         queryset = super().get_queryset()
#         user = self.request.user
        
#         # Базовый фильтр
#         if user.is_authenticated:
#             # Аутентифицированные видят свои + публичные + анонимные
#             queryset = queryset.filter(
#                 Q(user=user) | Q(is_public=True) | Q(user__isnull=True)
#             )
#         else:
#             # Анонимы видят только публичные и анонимные
#             queryset = queryset.filter(
#                 Q(is_public=True) | Q(user__isnull=True)
#             )
        
#         # Дополнительные фильтры из параметров запроса
#         user_id = self.request.query_params.get('user_id')
#         if user_id:
#             queryset = queryset.filter(user_id=user_id)
        
#         is_public = self.request.query_params.get('is_public')
#         if is_public is not None:
#             queryset = queryset.filter(is_public=is_public.lower() == 'true')
        
#         return queryset.distinct()
    
#     def get_serializer_class(self):
#         if self.action in ['create', 'update', 'partial_update']:
#             return PageDesignCreateSerializer
#         elif self.action == 'history':
#             return PageDesignHistorySerializer
#         return PageDesignSerializer
    
#     def get_serializer_context(self):
#         context = super().get_serializer_context()
#         context['request'] = self.request
#         return context
    
#     def get_permissions(self):
#         if self.action in ['list', 'retrieve', 'preview', 'export', 'download_json']:
#             return [AllowAny()]
#         return [IsAuthenticatedOrReadOnly()]
    
#     @action(detail=False, methods=['get'])
#     def my_designs(self, request):
#         """Получить дизайны текущего пользователя"""
#         if not request.user.is_authenticated:
#             return Response({'error': 'Требуется авторизация'}, status=status.HTTP_401_UNAUTHORIZED)
        
#         designs = PageDesign.objects.filter(user=request.user)
#         serializer = self.get_serializer(designs, many=True)
#         return Response(serializer.data)
    
#     @action(detail=True, methods=['get'])
#     def preview(self, request, pk=None):
#         """Предпросмотр дизайна (только данные)"""
#         design = self.get_object()
        
#         # Проверяем доступ
#         if not design.can_view(request.user):
#             return Response({'error': 'Нет доступа'}, status=status.HTTP_403_FORBIDDEN)
        
#         preview_data = {
#             'name': design.name,
#             'blocks': design.blocks,
#             'text_color': design.text_color,
#             'bg_color': design.bg_color,
#             'version': design.version,
#             'metadata': design.metadata
#         }
        
#         return Response(preview_data)
    
#     @action(detail=True, methods=['get'])
#     def export(self, request, pk=None):
#         """Экспорт дизайна в JSON"""
#         design = self.get_object()
        
#         # Проверяем доступ
#         if not design.can_view(request.user):
#             return Response({'error': 'Нет доступа'}, status=status.HTTP_403_FORBIDDEN)
        
#         export_data = design.get_full_json()
        
#         # Если запросили файл для скачивания
#         if request.query_params.get('download') == 'true':
#             response = HttpResponse(
#                 json.dumps(export_data, ensure_ascii=False, indent=2),
#                 content_type='application/json'
#             )
#             response['Content-Disposition'] = f'attachment; filename="design_{design.id}_{design.name}.json"'
#             return response
        
#         return Response(export_data)
    
#     @action(detail=True, methods=['post'])
#     def generate_json_file(self, request, pk=None):
#         """Сгенерировать JSON файл для дизайна"""
#         design = self.get_object()
        
#         # Проверяем права
#         if not design.can_edit(request.user):
#             return Response({'error': 'Нет прав на редактирование'}, status=status.HTTP_403_FORBIDDEN)
        
#         try:
#             file_url = design.generate_json_file()
#             return Response({
#                 'success': True,
#                 'message': 'JSON файл сгенерирован',
#                 'file_url': file_url,
#                 'file_name': os.path.basename(design.json_file.name) if design.json_file else None
#             })
#         except Exception as e:
#             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
#     @action(detail=True, methods=['get'])
#     def download_json(self, request, pk=None):
#         """Скачать JSON файл дизайна"""
#         design = self.get_object()
        
#         # Проверяем доступ
#         if not design.can_view(request.user):
#             return Response({'error': 'Нет доступа'}, status=status.HTTP_403_FORBIDDEN)
        
#         if not design.json_file:
#             return Response({'error': 'JSON файл не найден'}, status=status.HTTP_404_NOT_FOUND)
        
#         try:
#             response = FileResponse(design.json_file.open('rb'))
#             response['Content-Type'] = 'application/json'
#             response['Content-Disposition'] = f'attachment; filename="{os.path.basename(design.json_file.name)}"'
#             return response
#         except Exception as e:
#             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
#     @action(detail=True, methods=['get'])
#     def history(self, request, pk=None):
#         """Получить историю изменений дизайна"""
#         design = self.get_object()
        
#         # Проверяем доступ
#         if not design.can_view(request.user):
#             return Response({'error': 'Нет доступа'}, status=status.HTTP_403_FORBIDDEN)
        
#         history = design.history.all()
#         serializer = PageDesignHistorySerializer(history, many=True)
#         return Response(serializer.data)
    
#     @action(detail=True, methods=['post'])
#     def duplicate(self, request, pk=None):
#         """Дублировать дизайн"""
#         original = self.get_object()
        
#         # Проверяем доступ к оригиналу
#         if not original.can_view(request.user):
#             return Response({'error': 'Нет доступа к оригиналу'}, status=status.HTTP_403_FORBIDDEN)
        
#         # Создаем копию
#         duplicate = PageDesign.objects.create(
#             user=request.user if request.user.is_authenticated else None,
#             name=f"{original.name} (копия)",
#             blocks=original.blocks,
#             text_color=original.text_color,
#             bg_color=original.bg_color,
#             version=original.version,
#             is_public=False,
#             metadata={**original.metadata, 'original_id': original.id}
#         )
        
#         # Генерируем JSON файл для копии
#         duplicate.generate_json_file()
        
#         serializer = PageDesignSerializer(duplicate, context={'request': request})
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
    
#     def create(self, request, *args, **kwargs):
#         """Создание дизайна с обработкой JSON"""
#         serializer = self.get_serializer(data=request.data)
#         if serializer.is_valid():
#             design = serializer.save()
            
#             response_data = {
#                 'id': design.id,
#                 'name': design.name,
#                 'message': 'Дизайн успешно сохранен',
#                 'json_file': design.json_file.url if design.json_file else None,
#                 'full_json': design.get_full_json()
#             }
            
#             return Response(response_data, status=status.HTTP_201_CREATED)
        
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#     def update(self, request, *args, **kwargs):
#         """Обновление дизайна"""
#         design = self.get_object()
        
#         # Проверяем права
#         if not design.can_edit(request.user):
#             return Response({'error': 'У вас нет прав на редактирование этого дизайна'}, 
#                           status=status.HTTP_403_FORBIDDEN)
        
#         serializer = self.get_serializer(design, data=request.data, partial=True)
#         if serializer.is_valid():
#             design = serializer.save()
            
#             response_data = {
#                 'id': design.id,
#                 'name': design.name,
#                 'message': 'Дизайн успешно обновлен',
#                 'json_file': design.json_file.url if design.json_file else None,
#                 'full_json': design.get_full_json()
#             }
            
#             return Response(response_data)
        
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#     def destroy(self, request, *args, **kwargs):
#         """Удаление дизайна"""
#         design = self.get_object()
        
#         # Проверяем права
#         if not design.can_edit(request.user):
#             return Response({'error': 'У вас нет прав на удаление этого дизайна'}, 
#                           status=status.HTTP_403_FORBIDDEN)
        
#         # Удаляем JSON файл если есть
#         if design.json_file:
#             try:
#                 design.json_file.delete(save=False)
#             except:
#                 pass
        
#         design.delete()
#         return Response({'message': 'Дизайн успешно удален'}, status=status.HTTP_204_NO_CONTENT)


# class ContentItemViewSet(viewsets.ModelViewSet):
#     """API для работы с контентными элементами"""
#     queryset = ContentItem.objects.filter(is_active=True)
#     serializer_class = ContentItemSerializer
#     permission_classes = [IsAuthenticatedOrReadOnly]
#     filter_backends = [filters.SearchFilter]
#     search_fields = ['title', 'description', 'text']
    
#     @action(detail=False, methods=['get'])
#     def news(self, request):
#         """Получить только новости"""
#         news = ContentItem.objects.filter(content_type='news', is_active=True)
#         serializer = self.get_serializer(news, many=True)
#         return Response(serializer.data)
    
#     @action(detail=False, methods=['get'])
#     def products(self, request):
#         """Получить только товары"""
#         products = ContentItem.objects.filter(content_type='product', is_active=True)
#         serializer = self.get_serializer(products, many=True)
#         return Response(serializer.data)


# # =============== НОВЫЕ API ДЛЯ ДАННЫХ ИЗ sello_tovar И sello_news ===============

# class SelloProductsAPI(APIView):
#     """API для получения товаров из sello_tovar"""
#     permission_classes = [IsAuthenticated]
    
#     def get(self, request):
#         # Проверяем, доступны ли модели
#         if not HAS_SELLO_MODELS:
#             return Response({
#                 'error': 'Модели sello_tovar не найдены',
#                 'products': []
#             }, status=status.HTTP_200_OK)
        
#         try:
#             # Получаем параметры фильтрации
#             search = request.query_params.get('search', '').strip()
#             category = request.query_params.get('category', '').strip()
#             limit = int(request.query_params.get('limit', 50))
            
#             # Базовый запрос
#             queryset = SelloProduct.objects.filter(quantity__gt=0)
            
#             # Применяем фильтры
#             if search:
#                 queryset = queryset.filter(
#                     Q(name__icontains=search) |
#                     Q(description__icontains=search) |
#                     Q(category__icontains=search)
#                 )
            
#             if category and category != 'all':
#                 queryset = queryset.filter(category=category)
            
#             # Ограничиваем количество
#             queryset = queryset[:limit]
            
#             # Преобразуем в нужный формат
#             products_data = []
#             for product in queryset:
#                 product_dict = {
#                     'id': product.id,
#                     'title': product.name or 'Без названия',
#                     'description': product.description or '',
#                     'price': str(product.price) if product.price else '0',
#                     'category': product.category or 'Без категории',
#                     'stock': product.quantity or 0,
#                     'type': 'product',
#                     'brand': None,
#                     'created_by': None
#                 }
                
#                 # Получаем бренд если есть
#                 if hasattr(product, 'brand') and product.brand:
#                     product_dict['brand'] = product.brand.name
                
#                 # Получаем создателя если есть
#                 if hasattr(product, 'created_by') and product.created_by:
#                     product_dict['created_by'] = product.created_by.username
                
#                 # Получаем изображение
#                 if product.image:
#                     try:
#                         product_dict['image'] = request.build_absolute_uri(product.image.url)
#                     except:
#                         product_dict['image'] = None
#                 else:
#                     product_dict['image'] = None
                
#                 products_data.append(product_dict)
            
#             # Получаем уникальные категории для фильтров
#             all_categories = SelloProduct.objects.filter(
#                 quantity__gt=0
#             ).exclude(
#                 category__isnull=True
#             ).exclude(
#                 category=''
#             ).values_list('category', flat=True).distinct()
            
#             return Response({
#                 'products': products_data,
#                 'count': len(products_data),
#                 'filters': {
#                     'categories': list(all_categories)
#                 }
#             })
            
#         except Exception as e:
#             print(f"Ошибка получения товаров: {e}")
#             return Response({
#                 'error': str(e),
#                 'products': []
#             }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# class SelloNewsAPI(APIView):
#     """API для получения новостей из sello_news"""
#     permission_classes = [IsAuthenticated]
    
#     def get(self, request):
#         # Проверяем, доступны ли модели
#         if not HAS_SELLO_MODELS:
#             return Response({
#                 'error': 'Модели sello_news не найдены',
#                 'news': []
#             }, status=status.HTTP_200_OK)
        
#         try:
#             # Получаем параметры фильтрации
#             search = request.query_params.get('search', '').strip()
#             category = request.query_params.get('category', '').strip()
#             limit = int(request.query_params.get('limit', 50))
            
#             # Базовый запрос - только опубликованные
#             queryset = SelloNews.objects.filter(is_published=True)
            
#             # Применяем фильтры
#             if search:
#                 queryset = queryset.filter(
#                     Q(title__icontains=search) |
#                     Q(content__icontains=search) |
#                     Q(category__icontains=search)
#                 )
            
#             if category and category != 'all':
#                 queryset = queryset.filter(category=category)
            
#             # Ограничиваем количество
#             queryset = queryset[:limit]
            
#             # Преобразуем в нужный формат
#             news_data = []
#             for news_item in queryset:
#                 news_dict = {
#                     'id': news_item.id,
#                     'title': news_item.title or 'Без названия',
#                     'content': news_item.content or '',
#                     'category': news_item.category or 'Без категории',
#                     'type': 'news',
#                     'author': None,
#                     'created_at': news_item.created_at.isoformat() if news_item.created_at else None,
#                     'is_published': news_item.is_published
#                 }
                
#                 # Получаем автора если есть
#                 if hasattr(news_item, 'author') and news_item.author:
#                     news_dict['author'] = news_item.author.username
                
#                 # Получаем изображение
#                 if news_item.image:
#                     try:
#                         news_dict['image'] = request.build_absolute_uri(news_item.image.url)
#                     except:
#                         news_dict['image'] = None
#                 else:
#                     news_dict['image'] = None
                
#                 news_data.append(news_dict)
            
#             # Получаем уникальные категории для фильтров
#             all_categories = SelloNews.objects.filter(
#                 is_published=True
#             ).exclude(
#                 category__isnull=True
#             ).exclude(
#                 category=''
#             ).values_list('category', flat=True).distinct()
            
#             return Response({
#                 'news': news_data,
#                 'count': len(news_data),
#                 'filters': {
#                     'categories': list(all_categories)
#                 }
#             })
            
#         except Exception as e:
#             print(f"Ошибка получения новостей: {e}")
#             return Response({
#                 'error': str(e),
#                 'news': []
#             }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# class SelloContentSearchAPI(APIView):
#     """API для поиска контента из обоих источников"""
#     permission_classes = [IsAuthenticated]
    
#     def get(self, request):
#         search = request.query_params.get('q', '').strip()
#         content_type = request.query_params.get('type', '').strip()  # 'all', 'products', 'news'
        
#         results = {
#             'products': [],
#             'news': []
#         }
        
#         if not HAS_SELLO_MODELS:
#             return Response(results)
        
#         try:
#             # Ищем товары
#             if content_type in ['all', 'products'] and search:
#                 products = SelloProduct.objects.filter(
#                     Q(name__icontains=search) |
#                     Q(description__icontains=search)
#                 ).filter(quantity__gt=0)[:20]
                
#                 for product in products:
#                     results['products'].append({
#                         'id': product.id,
#                         'title': product.name,
#                         'type': 'product',
#                         'image': request.build_absolute_uri(product.image.url) if product.image else None,
#                         'price': str(product.price) if product.price else '0'
#                     })
            
#             # Ищем новости
#             if content_type in ['all', 'news'] and search:
#                 news_items = SelloNews.objects.filter(
#                     Q(title__icontains=search) |
#                     Q(content__icontains=search)
#                 ).filter(is_published=True)[:20]
                
#                 for news_item in news_items:
#                     results['news'].append({
#                         'id': news_item.id,
#                         'title': news_item.title,
#                         'type': 'news',
#                         'image': request.build_absolute_uri(news_item.image.url) if news_item.image else None
#                     })
            
#             return Response(results)
            
#         except Exception as e:
#             print(f"Ошибка поиска: {e}")
#             return Response(results)



















from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, status, filters
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.parsers import MultiPartParser, JSONParser, FormParser
from rest_framework.views import APIView
from django.http import HttpResponse, FileResponse, JsonResponse
from django.db.models import Q, Count
import json
import os

from .models import PageDesign, PageDesignHistory, ContentItem
from .serializers import (
    PageDesignSerializer, 
    PageDesignCreateSerializer,
    PageDesignHistorySerializer,
    ContentItemSerializer
)

# Импортируем модели из других приложений
try:
    from sello_tovar.models import Product as SelloProduct
    from sello_tovar.models import Brand as SelloBrand
    from sello_news.models import News as SelloNews
    from django.contrib.auth import get_user_model
    User = get_user_model()
    HAS_SELLO_MODELS = True
except ImportError:
    print("Предупреждение: Модели sello_tovar или sello_news не найдены")
    HAS_SELLO_MODELS = False

@api_view(['GET'])
@permission_classes([AllowAny])
def constructor_view(request):
    """Главная страница конструктора"""
    return render(request, 'constructor/index.html')

class PageDesignViewSet(viewsets.ModelViewSet):
    """API для работы с дизайнами страниц"""
    queryset = PageDesign.objects.all()
    serializer_class = PageDesignSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'metadata']
    ordering_fields = ['created_at', 'updated_at', 'name', 'blocks_count']
    ordering = ['-updated_at']
    parser_classes = [MultiPartParser, JSONParser, FormParser]
    
    def get_queryset(self):
        """Фильтрация по правам доступа"""
        queryset = super().get_queryset()
        user = self.request.user
        
        # Базовый фильтр
        if user.is_authenticated:
            # Аутентифицированные видят свои + публичные + анонимные
            queryset = queryset.filter(
                Q(user=user) | Q(is_public=True) | Q(user__isnull=True)
            )
        else:
            # Анонимы видят только публичные и анонимные
            queryset = queryset.filter(
                Q(is_public=True) | Q(user__isnull=True)
            )
        
        # Дополнительные фильтры из параметров запроса
        user_id = self.request.query_params.get('user_id')
        if user_id:
            queryset = queryset.filter(user_id=user_id)
        
        is_public = self.request.query_params.get('is_public')
        if is_public is not None:
            queryset = queryset.filter(is_public=is_public.lower() == 'true')
        
        return queryset.distinct()
    
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return PageDesignCreateSerializer
        elif self.action == 'history':
            return PageDesignHistorySerializer
        return PageDesignSerializer
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'preview', 'export', 'download_json']:
            return [AllowAny()]
        return [IsAuthenticatedOrReadOnly()]
    
    @action(detail=False, methods=['get'])
    def my_designs(self, request):
        """Получить дизайны текущего пользователя"""
        if not request.user.is_authenticated:
            return Response({'error': 'Требуется авторизация'}, status=status.HTTP_401_UNAUTHORIZED)
        
        designs = PageDesign.objects.filter(user=request.user)
        serializer = self.get_serializer(designs, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def preview(self, request, pk=None):
        """Предпросмотр дизайна (только данные)"""
        design = self.get_object()
        
        # Проверяем доступ
        if not design.can_view(request.user):
            return Response({'error': 'Нет доступа'}, status=status.HTTP_403_FORBIDDEN)
        
        preview_data = {
            'name': design.name,
            'blocks': design.blocks,
            'text_color': design.text_color,
            'bg_color': design.bg_color,
            'version': design.version,
            'metadata': design.metadata
        }
        
        return Response(preview_data)
    
    @action(detail=True, methods=['get'])
    def export(self, request, pk=None):
        """Экспорт дизайна в JSON"""
        design = self.get_object()
        
        # Проверяем доступ
        if not design.can_view(request.user):
            return Response({'error': 'Нет доступа'}, status=status.HTTP_403_FORBIDDEN)
        
        export_data = design.get_full_json()
        
        # Если запросили файл для скачивания
        if request.query_params.get('download') == 'true':
            response = HttpResponse(
                json.dumps(export_data, ensure_ascii=False, indent=2),
                content_type='application/json'
            )
            response['Content-Disposition'] = f'attachment; filename="design_{design.id}_{design.name}.json"'
            return response
        
        return Response(export_data)
    
    @action(detail=True, methods=['post'])
    def generate_json_file(self, request, pk=None):
        """Сгенерировать JSON файл для дизайна"""
        design = self.get_object()
        
        # Проверяем права
        if not design.can_edit(request.user):
            return Response({'error': 'Нет прав на редактирование'}, status=status.HTTP_403_FORBIDDEN)
        
        try:
            file_url = design.generate_json_file()
            return Response({
                'success': True,
                'message': 'JSON файл сгенерирован',
                'file_url': file_url,
                'file_name': os.path.basename(design.json_file.name) if design.json_file else None
            })
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @action(detail=True, methods=['get'])
    def download_json(self, request, pk=None):
        """Скачать JSON файл дизайна"""
        design = self.get_object()
        
        # Проверяем доступ
        if not design.can_view(request.user):
            return Response({'error': 'Нет доступа'}, status=status.HTTP_403_FORBIDDEN)
        
        if not design.json_file:
            return Response({'error': 'JSON файл не найден'}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            response = FileResponse(design.json_file.open('rb'))
            response['Content-Type'] = 'application/json'
            response['Content-Disposition'] = f'attachment; filename="{os.path.basename(design.json_file.name)}"'
            return response
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @action(detail=True, methods=['get'])
    def history(self, request, pk=None):
        """Получить историю изменений дизайна"""
        design = self.get_object()
        
        # Проверяем доступ
        if not design.can_view(request.user):
            return Response({'error': 'Нет доступа'}, status=status.HTTP_403_FORBIDDEN)
        
        history = design.history.all()
        serializer = PageDesignHistorySerializer(history, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def duplicate(self, request, pk=None):
        """Дублировать дизайн"""
        original = self.get_object()
        
        # Проверяем доступ к оригиналу
        if not original.can_view(request.user):
            return Response({'error': 'Нет доступа к оригиналу'}, status=status.HTTP_403_FORBIDDEN)
        
        # Создаем копию
        duplicate = PageDesign.objects.create(
            user=request.user if request.user.is_authenticated else None,
            name=f"{original.name} (копия)",
            blocks=original.blocks,
            text_color=original.text_color,
            bg_color=original.bg_color,
            version=original.version,
            is_public=False,
            metadata={**original.metadata, 'original_id': original.id}
        )
        
        # Генерируем JSON файл для копии
        duplicate.generate_json_file()
        
        serializer = PageDesignSerializer(duplicate, context={'request': request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def create(self, request, *args, **kwargs):
        """Создание дизайна с обработкой JSON"""
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            design = serializer.save()
            
            response_data = {
                'id': design.id,
                'name': design.name,
                'message': 'Дизайн успешно сохранен',
                'json_file': design.json_file.url if design.json_file else None,
                'full_json': design.get_full_json()
            }
            
            return Response(response_data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, *args, **kwargs):
        """Обновление дизайна"""
        design = self.get_object()
        
        # Проверяем права
        if not design.can_edit(request.user):
            return Response({'error': 'У вас нет прав на редактирование этого дизайна'}, 
                          status=status.HTTP_403_FORBIDDEN)
        
        serializer = self.get_serializer(design, data=request.data, partial=True)
        if serializer.is_valid():
            design = serializer.save()
            
            response_data = {
                'id': design.id,
                'name': design.name,
                'message': 'Дизайн успешно обновлен',
                'json_file': design.json_file.url if design.json_file else None,
                'full_json': design.get_full_json()
            }
            
            return Response(response_data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, *args, **kwargs):
        """Удаление дизайна"""
        design = self.get_object()
        
        # Проверяем права
        if not design.can_edit(request.user):
            return Response({'error': 'У вас нет прав на удаление этого дизайна'}, 
                          status=status.HTTP_403_FORBIDDEN)
        
        # Удаляем JSON файл если есть
        if design.json_file:
            try:
                design.json_file.delete(save=False)
            except:
                pass
        
        design.delete()
        return Response({'message': 'Дизайн успешно удален'}, status=status.HTTP_204_NO_CONTENT)


class ContentItemViewSet(viewsets.ModelViewSet):
    """API для работы с контентными элементами"""
    queryset = ContentItem.objects.filter(is_active=True)
    serializer_class = ContentItemSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'description', 'text']
    
    @action(detail=False, methods=['get'])
    def news(self, request):
        """Получить только новости"""
        news = ContentItem.objects.filter(content_type='news', is_active=True)
        serializer = self.get_serializer(news, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def products(self, request):
        """Получить только товары"""
        products = ContentItem.objects.filter(content_type='product', is_active=True)
        serializer = self.get_serializer(products, many=True)
        return Response(serializer.data)


# =============== НОВЫЕ API ДЛЯ ДАННЫХ ИЗ sello ===============

class SelloProductsAPI(APIView):
    """API для получения товаров из sello_tovar"""
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        # Проверяем, доступны ли модели
        if not HAS_SELLO_MODELS:
            return Response({
                'error': 'Модели sello_tovar не найдены',
                'products': []
            }, status=status.HTTP_200_OK)
        
        try:
            # Получаем параметры фильтрации
            search = request.query_params.get('search', '').strip()
            category = request.query_params.get('category', '').strip()
            brand_id = request.query_params.get('brand_id', '').strip()
            limit = int(request.query_params.get('limit', 50))
            
            # Базовый запрос
            queryset = SelloProduct.objects.filter(quantity__gt=0).select_related('brand', 'created_by')
            
            # Применяем фильтры
            if search:
                queryset = queryset.filter(
                    Q(name__icontains=search) |
                    Q(description__icontains=search) |
                    Q(category__icontains=search)
                )
            
            if category and category != 'all':
                queryset = queryset.filter(category=category)
            
            if brand_id and brand_id != 'all':
                queryset = queryset.filter(brand_id=brand_id)
            
            # Ограничиваем количество
            queryset = queryset[:limit]
            
            # Преобразуем в нужный формат
            products_data = []
            for product in queryset:
                product_dict = {
                    'id': product.id,
                    'name': product.name or 'Без названия',
                    'description': product.description or '',
                    'price': str(product.price) if product.price else '0',
                    'category': product.category or 'Без категории',
                    'stock': product.quantity or 0,
                    'type': 'product',
                    'brand': None,
                    'created_by': None
                }
                
                # Получаем бренд если есть
                if product.brand:
                    product_dict['brand'] = {
                        'id': product.brand.id,
                        'name': product.brand.name,
                        'created_by': product.brand.created_by.username if product.brand.created_by else None
                    }
                
                # Получаем создателя если есть
                if product.created_by:
                    product_dict['created_by'] = product.created_by.username
                
                # Получаем изображение
                if product.image:
                    try:
                        product_dict['image'] = request.build_absolute_uri(product.image.url)
                    except:
                        product_dict['image'] = None
                else:
                    product_dict['image'] = None
                
                products_data.append(product_dict)
            
            # Получаем уникальные категории для фильтров
            all_categories = SelloProduct.objects.filter(
                quantity__gt=0
            ).exclude(
                category__isnull=True
            ).exclude(
                category=''
            ).values_list('category', flat=True).distinct()
            
            return Response({
                'products': products_data,
                'count': len(products_data),
                'filters': {
                    'categories': list(all_categories)
                }
            })
            
        except Exception as e:
            print(f"Ошибка получения товаров: {e}")
            return Response({
                'error': str(e),
                'products': []
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SelloNewsAPI(APIView):
    """API для получения новостей из sello_news"""
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        # Проверяем, доступны ли модели
        if not HAS_SELLO_MODELS:
            return Response({
                'error': 'Модели sello_news не найдены',
                'news': []
            }, status=status.HTTP_200_OK)
        
        try:
            # Получаем параметры фильтрации
            search = request.query_params.get('search', '').strip()
            category = request.query_params.get('category', '').strip()
            limit = int(request.query_params.get('limit', 50))
            
            # Базовый запрос - только опубликованные
            queryset = SelloNews.objects.filter(is_published=True).select_related('author')
            
            # Применяем фильтры
            if search:
                queryset = queryset.filter(
                    Q(title__icontains=search) |
                    Q(content__icontains=search) |
                    Q(category__icontains=search)
                )
            
            if category and category != 'all':
                queryset = queryset.filter(category=category)
            
            # Ограничиваем количество
            queryset = queryset[:limit]
            
            # Преобразуем в нужный формат
            news_data = []
            for news_item in queryset:
                news_dict = {
                    'id': news_item.id,
                    'title': news_item.title or 'Без названия',
                    'content': news_item.content or '',
                    'category': news_item.category or 'Без категории',
                    'type': 'news',
                    'author': None,
                    'created_at': news_item.created_at.isoformat() if news_item.created_at else None,
                    'is_published': news_item.is_published
                }
                
                # Получаем автора если есть
                if news_item.author:
                    news_dict['author'] = news_item.author.username
                
                # Получаем изображение
                if news_item.image:
                    try:
                        news_dict['image'] = request.build_absolute_uri(news_item.image.url)
                    except:
                        news_dict['image'] = None
                else:
                    news_dict['image'] = None
                
                news_data.append(news_dict)
            
            # Получаем уникальные категории для фильтров
            all_categories = SelloNews.objects.filter(
                is_published=True
            ).exclude(
                category__isnull=True
            ).exclude(
                category=''
            ).values_list('category', flat=True).distinct()
            
            return Response({
                'news': news_data,
                'count': len(news_data),
                'filters': {
                    'categories': list(all_categories)
                }
            })
            
        except Exception as e:
            print(f"Ошибка получения новостей: {e}")
            return Response({
                'error': str(e),
                'news': []
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SelloContentSearchAPI(APIView):
    """API для поиска контента из обоих источников"""
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        search = request.query_params.get('q', '').strip()
        content_type = request.query_params.get('type', '').strip()  # 'all', 'products', 'news'
        
        results = {
            'products': [],
            'news': []
        }
        
        if not HAS_SELLO_MODELS:
            return Response(results)
        
        try:
            # Ищем товары
            if content_type in ['all', 'products'] and search:
                products = SelloProduct.objects.filter(
                    Q(name__icontains=search) |
                    Q(description__icontains=search)
                ).filter(quantity__gt=0)[:20]
                
                for product in products:
                    results['products'].append({
                        'id': product.id,
                        'title': product.name,
                        'type': 'product',
                        'image': request.build_absolute_uri(product.image.url) if product.image else None,
                        'price': str(product.price) if product.price else '0',
                        'brand': product.brand.name if product.brand else None
                    })
            
            # Ищем новости
            if content_type in ['all', 'news'] and search:
                news_items = SelloNews.objects.filter(
                    Q(title__icontains=search) |
                    Q(content__icontains=search)
                ).filter(is_published=True)[:20]
                
                for news_item in news_items:
                    results['news'].append({
                        'id': news_item.id,
                        'title': news_item.title,
                        'type': 'news',
                        'image': request.build_absolute_uri(news_item.image.url) if news_item.image else None
                    })
            
            return Response(results)
            
        except Exception as e:
            print(f"Ошибка поиска: {e}")
            return Response(results)


class SelloBrandsAPI(APIView):
    """API для получения всех магазинов (брендов) пользователей"""
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        if not HAS_SELLO_MODELS:
            return Response({
                'error': 'Модели sello_tovar не найдены',
                'brands': []
            }, status=status.HTTP_200_OK)
        
        try:
            # Получаем все активные магазины с количеством товаров
            queryset = SelloBrand.objects.filter(is_active=True).annotate(
                products_count=Count('products', filter=Q(products__quantity__gt=0))
            ).select_related('created_by')
            
            # Преобразуем в нужный формат
            brands_data = []
            for brand in queryset:
                brand_dict = {
                    'id': brand.id,
                    'name': brand.name or 'Без названия',
                    'description': brand.description or '',
                    'created_by': brand.created_by.username if brand.created_by else None,
                    'created_at': brand.created_at.isoformat() if brand.created_at else None,
                    'products_count': brand.products_count
                }
                
                brands_data.append(brand_dict)
            
            return Response({
                'brands': brands_data,
                'count': len(brands_data)
            })
            
        except Exception as e:
            print(f"Ошибка получения магазинов: {e}")
            return Response({
                'error': str(e),
                'brands': []
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AllUserProductsAPI(APIView):
    """API для получения всех товаров всех пользователей (для корзины)"""
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        if not HAS_SELLO_MODELS:
            return Response({
                'error': 'Модели sello_tovar не найдены',
                'products': []
            }, status=status.HTTP_200_OK)
        
        try:
            # Получаем все товары в наличии
            queryset = SelloProduct.objects.filter(quantity__gt=0).select_related('brand', 'created_by')
            
            # Получаем параметры фильтрации
            search = request.query_params.get('search', '').strip()
            brand_id = request.query_params.get('brand_id', '').strip()
            
            # Применяем фильтры
            if search:
                queryset = queryset.filter(
                    Q(name__icontains=search) |
                    Q(description__icontains=search)
                )
            
            if brand_id and brand_id != 'all':
                queryset = queryset.filter(brand_id=brand_id)
            
            # Преобразуем в формат для корзины
            products_data = []
            for product in queryset:
                product_data = {
                    'id': product.id,
                    'name': product.name or 'Без названия',
                    'price': str(product.price) if product.price else '0',
                    'description': product.description or '',
                    'stock': product.quantity or 0,
                    'category': product.category or 'Без категории',
                    'image': None,
                    'brand': {
                        'id': product.brand.id if product.brand else None,
                        'name': product.brand.name if product.brand else 'Неизвестно',
                        'created_by': product.brand.created_by.username if product.brand and product.brand.created_by else None
                    },
                    'created_by': product.created_by.username if product.created_by else None
                }
                
                # Получаем URL изображения
                if product.image:
                    try:
                        product_data['image'] = request.build_absolute_uri(product.image.url)
                    except:
                        product_data['image'] = None
                
                products_data.append(product_data)
            
            # Получаем все бренды для фильтра
            all_brands = SelloBrand.objects.filter(is_active=True).values('id', 'name')
            
            return Response({
                'products': products_data,
                'count': len(products_data),
                'brands': list(all_brands)
            })
            
        except Exception as e:
            print(f"Ошибка получения всех товаров: {e}")
            return Response({
                'error': str(e),
                'products': []
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SelloBrandDetailAPI(APIView):
    """API для получения информации о конкретном магазине"""
    permission_classes = [IsAuthenticated]
    
    def get(self, request, brand_id):
        if not HAS_SELLO_MODELS:
            return Response({
                'error': 'Модели sello_tovar не найдены'
            }, status=status.HTTP_200_OK)
        
        try:
            # Получаем магазин
            brand = get_object_or_404(SelloBrand, id=brand_id, is_active=True)
            
            # Получаем товары магазина
            products = SelloProduct.objects.filter(brand=brand, quantity__gt=0)
            
            # Преобразуем данные магазина
            brand_data = {
                'id': brand.id,
                'name': brand.name,
                'description': brand.description,
                'created_by': brand.created_by.username if brand.created_by else None,
                'created_at': brand.created_at.isoformat() if brand.created_at else None,
                'products_count': products.count()
            }
            
            # Преобразуем товары магазина
            products_data = []
            for product in products:
                product_dict = {
                    'id': product.id,
                    'name': product.name,
                    'price': str(product.price),
                    'description': product.description,
                    'stock': product.quantity,
                    'category': product.category,
                    'image': request.build_absolute_uri(product.image.url) if product.image else None
                }
                products_data.append(product_dict)
            
            return Response({
                'brand': brand_data,
                'products': products_data
            })
            
        except Exception as e:
            print(f"Ошибка получения магазина: {e}")
            return Response({
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
