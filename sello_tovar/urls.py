# sello_tovar/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'brands', views.BrandViewSet, basename='brand')
router.register(r'products', views.ProductViewSet, basename='product')
router.register(r'categories', views.CategoryViewSet, basename='category')

urlpatterns = [
    path('api/', include(router.urls)),
    # Страницы для React-приложения
    path('', views.brands_page, name='brands_page'),
    path('products/', views.products_page, name='products_page'),
]