# sello_tovar/admin.py

from django.contrib import admin
from .models import Brand, Product, Category


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ('name', 'country', 'category', 'created_at')
    list_filter = ('country', 'category', 'created_at')
    search_fields = ('name', 'description')
    readonly_fields = ('created_at', 'updated_at')


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('main_category', 'subcategory')
    list_filter = ('main_category',)
    search_fields = ('main_category', 'subcategory')


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'brand', 'category', 'price', 'quantity', 'availability', 'created_at')
    list_filter = ('main_category', 'category', 'brand', 'created_at')
    search_fields = ('name', 'description')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Основная информация', {
            'fields': ('name', 'brand', 'main_category', 'category')
        }),
        ('Характеристики', {
            'fields': ('color', 'price', 'quantity')
        }),
        ('Описание и изображение', {
            'fields': ('description', 'image')
        }),
        ('Даты', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )