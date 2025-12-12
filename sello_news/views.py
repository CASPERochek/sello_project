# from rest_framework import viewsets, permissions, status
# from rest_framework.decorators import action
# from rest_framework.response import Response
# from django.db import models
# from django.shortcuts import get_object_or_404
# from .models import News
# from .serializers import NewsSerializer

# class NewsViewSet(viewsets.ModelViewSet):
#     serializer_class = NewsSerializer
    
#     def get_permissions(self):
#         if self.action in ['list', 'retrieve', 'public']:
#             permission_classes = [permissions.AllowAny]
#         else:
#             permission_classes = [permissions.IsAuthenticated]
#         return [permission() for permission in permission_classes]

#     def get_queryset(self):
#         # Для неавторизованных - только опубликованные
#         if not self.request.user.is_authenticated:
#             return News.objects.filter(is_published=True).order_by('-created_at')
        
#         # Для авторизованных - все их новости + опубликованные
#         return News.objects.filter(
#             models.Q(author=self.request.user) | 
#             models.Q(is_published=True)
#         ).order_by('-created_at')

#     def get_serializer_context(self):
#         """Добавляем request в контекст для построения полных URL"""
#         context = super().get_serializer_context()
#         context['request'] = self.request
#         return context

#     def perform_create(self, serializer):
#         serializer.save(author=self.request.user)

#     @action(detail=False, methods=['get'], permission_classes=[permissions.AllowAny])
#     def public(self, request):
#         """Публичные новости"""
#         news = News.objects.filter(is_published=True).order_by('-created_at')
#         serializer = self.get_serializer(news, many=True, context={'request': request})
#         return Response(serializer.data)

#     def list(self, request, *args, **kwargs):
#         queryset = self.filter_queryset(self.get_queryset())
#         page = self.paginate_queryset(queryset)
#         if page is not None:
#             serializer = self.get_serializer(page, many=True, context={'request': request})
#             return self.get_paginated_response(serializer.data)

#         serializer = self.get_serializer(queryset, many=True, context={'request': request})
#         return Response(serializer.data)

#     def retrieve(self, request, *args, **kwargs):
#         instance = self.get_object()
#         serializer = self.get_serializer(instance, context={'request': request})
#         return Response(serializer.data)











from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import models
from .models import News
from .serializers import NewsSerializer
import os

class NewsViewSet(viewsets.ModelViewSet):
    """
    ViewSet для работы с новостями
    """
    serializer_class = NewsSerializer
    queryset = News.objects.all().order_by('-created_at')
    
    def get_permissions(self):
        """
        Разные права доступа для разных действий
        """
        if self.action in ['list', 'retrieve', 'public']:
            # Публичные действия - доступны всем
            permission_classes = [permissions.AllowAny]
        else:
            # Создание, редактирование, удаление - только авторизованным
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        """
        Разные наборы данных для авторизованных и неавторизованных
        """
        if not self.request.user.is_authenticated:
            # Неавторизованные видят только опубликованные
            return News.objects.filter(is_published=True).order_by('-created_at')
        
        # Авторизованные видят свои + опубликованные
        return News.objects.filter(
            models.Q(author=self.request.user) | 
            models.Q(is_published=True)
        ).order_by('-created_at')

    def get_serializer_context(self):
        """
        Добавляем request в контекст для построения полных URL
        """
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def perform_create(self, serializer):
        """
        Автоматически устанавливаем автора при создании
        """
        serializer.save(author=self.request.user)

    @action(detail=False, methods=['get'], permission_classes=[permissions.AllowAny])
    def public(self, request):
        """
        Endpoint только для публичных новостей
        """
        news = News.objects.filter(is_published=True).order_by('-created_at')
        serializer = self.get_serializer(news, many=True, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.AllowAny])
    def check_media(self, request):
        """
        Проверка доступности медиафайлов
        """
        from django.conf import settings
        import os
        
        media_path = settings.MEDIA_ROOT
        news_media_path = os.path.join(media_path, 'news')
        
        exists = os.path.exists(news_media_path)
        files = []
        
        if exists:
            try:
                files = os.listdir(news_media_path)
                files = [f for f in files if os.path.isfile(os.path.join(news_media_path, f))]
            except Exception as e:
                files = [f'Ошибка: {str(e)}']
        
        return Response({
            'media_root': settings.MEDIA_ROOT,
            'media_url': settings.MEDIA_URL,
            'news_path': news_media_path,
            'exists': exists,
            'files': files,
            'files_count': len(files)
        })

    def create(self, request, *args, **kwargs):
        """
        Переопределяем create для отладки
        """
        print(f"📨 CREATE request received")
        print(f"   User: {request.user}")
        print(f"   Files: {request.FILES}")
        print(f"   Data: {request.data}")
        
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        """
        Переопределяем update для отладки
        """
        print(f"📨 UPDATE request received")
        print(f"   User: {request.user}")
        print(f"   Files: {request.FILES}")
        print(f"   Data: {request.data}")
        
        return super().update(request, *args, **kwargs)