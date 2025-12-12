# from rest_framework import serializers
# from .models import News
# from django.conf import settings

# class NewsSerializer(serializers.ModelSerializer):
#     author_name = serializers.CharField(source='author.username', read_only=True)
#     created_at_formatted = serializers.SerializerMethodField()
#     image_url = serializers.SerializerMethodField()
    
#     class Meta:
#         model = News
#         fields = [
#             'id', 'title', 'content', 'image', 'image_url', 'category', 
#             'created_at', 'created_at_formatted', 'author_name', 'is_published'
#         ]
#         read_only_fields = ['id', 'created_at', 'author']
#         extra_kwargs = {
#             'image': {'write_only': True}
#         }

#     def get_created_at_formatted(self, obj):
#         return obj.created_at.strftime("%d.%m.%Y")
    
#     def get_image_url(self, obj):
#         if obj.image:
#             request = self.context.get('request')
#             if request:
#                 # Используем build_absolute_uri для получения полного URL
#                 url = request.build_absolute_uri(obj.image.url)
#                 print(f"🖼️ Generated image URL with request: {url}")
#                 return url
            
#             # Если request нет (например, в консоли), строим URL вручную
#             # Убираем лишние слэши
#             image_path = obj.image.url
#             if image_path.startswith('/'):
#                 image_path = image_path[1:]
            
#             # Проверяем, есть ли уже media/ в пути
#             if not image_path.startswith('media/'):
#                 image_path = f'media/{image_path}'
            
#             url = f"http://localhost:8000/{image_path}"
#             print(f"🖼️ Generated image URL manually: {url}")
#             return url
        
#         print("🖼️ No image for news")
#         return None




from rest_framework import serializers
from .models import News
from django.conf import settings

class NewsSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.username', read_only=True)
    created_at_formatted = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = News
        fields = [
            'id', 'title', 'content', 'image', 'image_url', 'category', 
            'created_at', 'created_at_formatted', 'author_name', 'is_published'
        ]
        read_only_fields = ['id', 'created_at', 'author']
        extra_kwargs = {
            'image': {'write_only': True}
        }

    def get_created_at_formatted(self, obj):
        return obj.created_at.strftime("%d.%m.%Y")
    
    def get_image_url(self, obj):
        """
        Генерируем полный URL для изображения
        """
        if obj.image:
            request = self.context.get('request')
            
            if request:
                # Полный абсолютный URL через Django
                url = request.build_absolute_uri(obj.image.url)
                print(f"🖼️ Generated image URL: {url}")
                return url
            
            # Если нет request (например, в консоли)
            # Строим URL вручную
            if obj.image.url.startswith('/'):
                # Относительный URL
                return f"http://localhost:8000{obj.image.url}"
            else:
                # Полный URL
                return obj.image.url
        
        print("🖼️ No image for news")
        return None
    
    def create(self, validated_data):
        # Автоматически устанавливаем автора
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            validated_data['author'] = request.user
        
        print(f"📝 Creating news with image: {validated_data.get('image')}")
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        print(f"📝 Updating news with image: {validated_data.get('image')}")
        return super().update(instance, validated_data)