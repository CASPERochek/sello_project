from rest_framework import serializers
from .models import PageDesign, PageDesignHistory, ContentItem
import json
from django.core.files.base import ContentFile

class PageDesignSerializer(serializers.ModelSerializer):
    """Сериализатор для чтения дизайна"""
    user = serializers.ReadOnlyField(source='user.username')
    user_id = serializers.ReadOnlyField(source='user.id')
    can_edit = serializers.SerializerMethodField()
    full_json = serializers.SerializerMethodField()
    json_file_url = serializers.SerializerMethodField()
    
    class Meta:
        model = PageDesign
        fields = [
            'id', 'user', 'user_id', 'name', 'blocks', 'text_color', 'bg_color',
            'json_file', 'json_file_url', 'version', 'is_public', 'metadata',
            'blocks_count', 'thumbnail', 'created_at', 'updated_at', 'can_edit', 'full_json'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'blocks_count']
    
    def get_can_edit(self, obj):
        request = self.context.get('request')
        if request and request.user:
            return obj.can_edit(request.user)
        return False
    
    def get_full_json(self, obj):
        return obj.get_full_json()
    
    def get_json_file_url(self, obj):
        request = self.context.get('request')
        if obj.json_file and request:
            return request.build_absolute_uri(obj.json_file.url)
        return None


class PageDesignCreateSerializer(serializers.ModelSerializer):
    """Сериализатор для создания/обновления дизайна"""
    json_content = serializers.JSONField(write_only=True, required=False)
    generate_json_file = serializers.BooleanField(write_only=True, default=True)
    
    class Meta:
        model = PageDesign
        fields = [
            'name', 'blocks', 'text_color', 'bg_color', 'version',
            'is_public', 'metadata', 'json_content', 'generate_json_file'
        ]
    
    def validate_blocks(self, value):
        """Валидация blocks"""
        if not isinstance(value, (list, dict)):
            raise serializers.ValidationError("Blocks должен быть списком или словарем")
        return value
    
    def validate_metadata(self, value):
        """Валидация metadata"""
        if not isinstance(value, dict):
            raise serializers.ValidationError("Metadata должен быть словарем")
        return value
    
    def create(self, validated_data):
        """Создание нового дизайна"""
        request = self.context.get('request')
        json_content = validated_data.pop('json_content', None)
        generate_json_file = validated_data.pop('generate_json_file', True)
        
        # Создаем дизайн
        design = PageDesign(
            user=request.user if request and request.user.is_authenticated else None,
            **validated_data
        )
        design.save()
        
        # Сохраняем в историю
        self._save_to_history(design, request.user, 'Создание дизайна')
        
        # Генерируем JSON файл если нужно
        if generate_json_file:
            design.generate_json_file()
        
        # Если есть json_content, добавляем его в metadata
        if json_content:
            if 'json_data' not in design.metadata:
                design.metadata['json_data'] = {}
            design.metadata['json_data']['content'] = json_content
            design.save()
        
        return design
    
    def update(self, instance, validated_data):
        """Обновление существующего дизайна"""
        request = self.context.get('request')
        json_content = validated_data.pop('json_content', None)
        generate_json_file = validated_data.pop('generate_json_file', True)
        
        # Проверяем права
        if not instance.can_edit(request.user):
            raise serializers.ValidationError("У вас нет прав на редактирование этого дизайна")
        
        # Сохраняем текущую версию в историю
        self._save_to_history(instance, request.user, 'Обновление дизайна')
        
        # Обновляем поля
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()
        
        # Генерируем JSON файл если нужно
        if generate_json_file:
            instance.generate_json_file()
        
        # Обновляем metadata с json_content
        if json_content:
            if 'json_data' not in instance.metadata:
                instance.metadata['json_data'] = {}
            instance.metadata['json_data']['content'] = json_content
            instance.save()
        
        return instance
    
    def _save_to_history(self, design, user, comment=''):
        """Сохранить текущее состояние в историю"""
        PageDesignHistory.objects.create(
            design=design,
            version=design.version,
            blocks=design.blocks,
            text_color=design.text_color,
            bg_color=design.bg_color,
            changed_by=user,
            change_comment=comment
        )


class PageDesignHistorySerializer(serializers.ModelSerializer):
    """Сериализатор для истории изменений"""
    changed_by_username = serializers.ReadOnlyField(source='changed_by.username')
    
    class Meta:
        model = PageDesignHistory
        fields = [
            'id', 'version', 'blocks', 'text_color', 'bg_color',
            'changed_by', 'changed_by_username', 'change_comment', 'created_at'
        ]


class ContentItemSerializer(serializers.ModelSerializer):
    """Сериализатор для контентных элементов"""
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = ContentItem
        fields = ['id', 'title', 'content_type', 'image_url', 'description', 'price', 'text', 'created_at']
    
    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None