from rest_framework import serializers
from .models import PageDesign, ContentItem

class ContentItemSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = ContentItem
        fields = ['id', 'title', 'content_type', 'image_url', 'description', 'price', 'text', 'created_at']
    
    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None


class PageDesignSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')  # Показываем имя пользователя
    json_file_url = serializers.SerializerMethodField()
    
    class Meta:
        model = PageDesign
        fields = ['id', 'user', 'name', 'blocks', 'text_color', 'bg_color', 'json_file_url', 'created_at', 'updated_at']
    
    def get_json_file_url(self, obj):
        if obj.json_file:
            return obj.json_file.url
        return None


class PageDesignCreateSerializer(serializers.ModelSerializer):
    json_data = serializers.JSONField(write_only=True, required=False)  # Для приема JSON данных
    
    class Meta:
        model = PageDesign
        fields = ['name', 'blocks', 'text_color', 'bg_color', 'json_data']
    
    def create(self, validated_data):
        # Извлекаем json_data если есть
        json_data = validated_data.pop('json_data', None)
        request = self.context.get('request')
        
        # Создаем объект с пользователем
        if request and request.user.is_authenticated:
            design = PageDesign.objects.create(user=request.user, **validated_data)
        else:
            design = PageDesign.objects.create(**validated_data)
        
        # Сохраняем JSON файл если есть данные
        if json_data:
            import json
            from django.core.files.base import ContentFile
            
            # Создаем файл с JSON
            json_str = json.dumps(json_data, ensure_ascii=False, indent=2)
            file_name = f"design_{design.id}_{design.name.replace(' ', '_')}.json"
            design.json_file.save(file_name, ContentFile(json_str.encode('utf-8')))
        
        return design
    
    def update(self, instance, validated_data):
        json_data = validated_data.pop('json_data', None)
        
        # Обновляем основные поля
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        # Обновляем JSON файл если есть новые данные
        if json_data:
            import json
            from django.core.files.base import ContentFile
            
            json_str = json.dumps(json_data, ensure_ascii=False, indent=2)
            file_name = f"design_{instance.id}_{instance.name.replace(' ', '_')}.json"
            
            # Удаляем старый файл если есть
            if instance.json_file:
                instance.json_file.delete(save=False)
            
            instance.json_file.save(file_name, ContentFile(json_str.encode('utf-8')))
        
        instance.save()
        return instance