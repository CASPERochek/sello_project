from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'news', views.NewsViewSet, basename='news')

urlpatterns = [
    path('api/', include(router.urls)),
]

# ВАЖНО: Добавляем обслуживание медиафайлов
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    print(f"✅ Media URLs added: {settings.MEDIA_URL} -> {settings.MEDIA_ROOT}")