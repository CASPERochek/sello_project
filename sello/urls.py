from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('sello_main.urls')),
    path('news/', include('sello_news.urls')),
    path('product/', include('sello_tovar.urls')),
]

# Отдаём media и static в режиме разработки

# ОБЯЗАТЕЛЬНО для медиафайлов в разработке
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    print(f"📁 Media serving enabled: {settings.MEDIA_URL}")





