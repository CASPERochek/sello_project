# sello_tovar/serializers.py
from rest_framework import serializers
from django.conf import settings
from .models import Brand, Product, Category


class BrandSerializer(serializers.ModelSerializer):
    created_by_username = serializers.CharField(source='created_by.username', read_only=True)
    created_by_email = serializers.CharField(source='created_by.email', read_only=True)
    logo_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Brand
        fields = [
            'id', 'name', 'country', 'category', 'logo', 'logo_url',
            'description', 'created_by', 'created_by_username', 'created_by_email',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_by', 'created_at', 'updated_at']
    
    def get_logo_url(self, obj):
        if obj.logo:
            return obj.logo.url
        return None
    
    def create(self, validated_data):
        validated_data['created_by'] = self.context['request'].user
        return super().create(validated_data)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'main_category', 'subcategory']


class ProductSerializer(serializers.ModelSerializer):
    brand_name = serializers.CharField(source='brand.name', read_only=True)
    brand_id = serializers.IntegerField(source='brand.id', read_only=True)
    created_by_username = serializers.CharField(source='created_by.username', read_only=True)
    created_by_email = serializers.CharField(source='created_by.email', read_only=True)
    image_url = serializers.SerializerMethodField()
    availability = serializers.CharField(read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'brand', 'brand_id', 'brand_name', 'main_category', 'category',
            'color', 'price', 'quantity', 'image', 'image_url',
            'description', 'availability', 'created_by', 'created_by_username', 'created_by_email',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_by', 'created_at', 'updated_at']
    
    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None
    
    def create(self, validated_data):
        validated_data['created_by'] = self.context['request'].user
        return super().create(validated_data)