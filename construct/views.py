from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, status, filters
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.parsers import MultiPartParser, JSONParser, FormParser
from django.http import HttpResponse, FileResponse, JsonResponse
from django.db.models import Q
import json
import os

from .models import PageDesign, PageDesignHistory, ContentItem
from .serializers import (
    PageDesignSerializer, 
    PageDesignCreateSerializer,
    PageDesignHistorySerializer,
    ContentItemSerializer
)

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