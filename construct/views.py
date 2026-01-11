from django.shortcuts import render
from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import PageDesign, ContentItem
from .serializers import PageDesignSerializer, ContentItemSerializer, PageDesignCreateSerializer

def constructor_view(request):
    """Главная страница конструктора - будет отдавать React приложение"""
    return render(request, 'constructor/index.html')


class PageDesignViewSet(viewsets.ModelViewSet):
    """API для работы с дизайнами страниц"""
    queryset = PageDesign.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']
    
    def get_queryset(self):
        """Фильтруем дизайны по текущему пользователю"""
        queryset = super().get_queryset()
        
        # Если пользователь аутентифицирован, показываем только его дизайны
        if self.request.user.is_authenticated:
            return queryset.filter(user=self.request.user)
        
        # Для анонимных пользователей показываем только дизайны без пользователя
        return queryset.filter(user__isnull=True)
    
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return PageDesignCreateSerializer
        return PageDesignSerializer
    
    def get_serializer_context(self):
        """Добавляем request в контекст сериализатора"""
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'preview']:
            return [AllowAny()]
        return [IsAuthenticated()]
    
    @action(detail=True, methods=['get'])
    def preview(self, request, pk=None):
        """Предпросмотр дизайна"""
        design = self.get_object()
        return Response({
            'blocks': design.blocks,
            'text_color': design.text_color,
            'bg_color': design.bg_color
        })
    
    @action(detail=True, methods=['get'])
    def download_json(self, request, pk=None):
        """Скачать JSON файл дизайна"""
        design = self.get_object()
        
        if not design.json_file:
            return Response({'error': 'JSON файл не найден'}, status=status.HTTP_404_NOT_FOUND)
        
        # Проверяем права доступа
        if design.user and design.user != request.user:
            return Response({'error': 'Нет доступа к этому файлу'}, status=status.HTTP_403_FORBIDDEN)
        
        from django.http import FileResponse
        response = FileResponse(design.json_file.open('rb'))
        response['Content-Type'] = 'application/json'
        response['Content-Disposition'] = f'attachment; filename="{design.json_file.name}"'
        return response
    
    def create(self, request):
        """Создание нового дизайна (POST запрос)"""
        serializer = PageDesignCreateSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            design = serializer.save()
            return Response({
                'id': design.id, 
                'message': 'Дизайн сохранен успешно',
                'name': design.name,
                'json_file_url': design.json_file.url if design.json_file else None
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk=None):
        """Обновление существующего дизайна (PUT запрос)"""
        design = self.get_object()
        
        # Проверяем, что пользователь обновляет свой дизайн
        if design.user and design.user != request.user:
            return Response({'error': 'Вы не можете изменять этот дизайн'}, 
                          status=status.HTTP_403_FORBIDDEN)
        
        serializer = PageDesignCreateSerializer(design, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ContentItemViewSet(viewsets.ModelViewSet):
    """API для работы с контентными элементами"""
    queryset = ContentItem.objects.filter(is_active=True)
    serializer_class = ContentItemSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()]
    
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