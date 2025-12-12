# sello_tovar/views.py

from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
from .models import Brand, Product, Category
from .serializers import BrandSerializer, ProductSerializer, CategorySerializer
import logging

logger = logging.getLogger(__name__)


def brands_page(request):
    """Страница управления брендами"""
    return render(request, 'brands.html')


def products_page(request):
    """Страница управления товарами"""
    return render(request, 'products.html')


class BrandViewSet(viewsets.ModelViewSet):
    """API для управления брендами"""
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['country', 'category']

    def perform_create(self, serializer):
        """Добавляем автора при создании бренда"""
        serializer.save(created_by=self.request.user)

    @action(detail=False, methods=['get'])
    def search(self, request):
        """Поиск брендов"""
        query = request.query_params.get('q', '')
        country = request.query_params.get('country', '')
        category = request.query_params.get('category', '')

        brands = Brand.objects.all()

        if query:
            brands = brands.filter(name__icontains=query)
        if country:
            brands = brands.filter(country=country)
        if category:
            brands = brands.filter(category=category)

        serializer = self.get_serializer(brands, many=True)
        return Response(serializer.data)


class ProductViewSet(viewsets.ModelViewSet):
    """API для управления товарами"""
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['brand', 'category', 'color']

    def perform_create(self, serializer):
        """Добавляем автора при создании товара"""
        serializer.save(created_by=self.request.user)

    @action(detail=False, methods=['get'])
    def search(self, request):
        """Поиск товаров с фильтрацией"""
        query = request.query_params.get('q', '')
        brand = request.query_params.get('brand', '')
        category = request.query_params.get('category', '')
        color = request.query_params.get('color', '')
        min_price = request.query_params.get('min_price')
        max_price = request.query_params.get('max_price')

        products = Product.objects.all()

        if query:
            products = products.filter(name__icontains=query)
        if brand:
            products = products.filter(brand__name=brand)
        if category:
            products = products.filter(category=category)
        if color:
            products = products.filter(color=color)
        if min_price:
            products = products.filter(price__gte=min_price)
        if max_price:
            products = products.filter(price__lte=max_price)

        serializer = self.get_serializer(products, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def categories(self, request):
        """Получение категорий товаров"""
        main_categories = Product.objects.values_list('main_category', flat=True).distinct()
        categories_data = {}
        
        for main_cat in main_categories:
            subcategories = Product.objects.filter(
                main_category=main_cat
            ).values_list('category', flat=True).distinct()
            categories_data[main_cat] = list(subcategories)
        
        return Response(categories_data)


class CategoryViewSet(viewsets.ModelViewSet):
    """API для управления категориями"""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @action(detail=False, methods=['get'])
    def tree(self, request):
        """Получение дерева категорий"""
        categories = Category.objects.all()
        tree_data = {}
        
        for category in categories:
            if category.main_category not in tree_data:
                tree_data[category.main_category] = []
            tree_data[category.main_category].append(category.subcategory)
        
        return Response(tree_data)