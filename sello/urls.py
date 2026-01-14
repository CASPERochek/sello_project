# sello/urls.py (основной файл)
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('sello_main.urls')),
    path('news/', include('sello_news.urls')),
    path('product/', include('sello_tovar.urls')),
    path('constructor/', include('construct.urls')),
    path('api/tree/', include('tree.urls')),
]

# Отдаём media и static в режиме разработки
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    print(f"📁 Media serving enabled: {settings.MEDIA_URL} -> {settings.MEDIA_ROOT}")
    print(f"📁 Static serving enabled: {settings.STATIC_URL} -> {settings.STATIC_ROOT}")