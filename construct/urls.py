from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'designs', views.PageDesignViewSet, basename='design')
router.register(r'content', views.ContentItemViewSet, basename='content')

urlpatterns = [
    # API
    path('api/', include(router.urls)),
    
    # Страницы
    path('constructor/', views.constructor_view, name='constructor'),
    
    # API endpoints для фронтенда
    path('api/designs/my/', views.PageDesignViewSet.as_view({'get': 'my_designs'}), name='my-designs'),
]