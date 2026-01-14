# tree/admin.py
from django.contrib import admin
from .models import Category

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'main_category', 'subcategory']
    list_filter = ['main_category']
    search_fields = ['main_category', 'subcategory']