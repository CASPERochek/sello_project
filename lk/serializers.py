
# from rest_framework import serializers
# from django.contrib.auth import get_user_model
# from .models import Brand, Product, Cart, CartItem, UserBrandConnection

# User = get_user_model()

# class UserSerializer(serializers.ModelSerializer):
#     """Сериализатор пользователя"""
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'email', 'first_name', 'last_name']

# class BrandSerializer(serializers.ModelSerializer):
#     """Сериализатор магазина"""
#     creator = UserSerializer(read_only=True)
#     creator_id = serializers.PrimaryKeyRelatedField(
#         queryset=User.objects.all(),
#         source='creator',
#         write_only=True
#     )
    
#     class Meta:
#         model = Brand
#         fields = ['id', 'name', 'creator', 'creator_id', 'category', 
#                  'description', 'is_active', 'created_at', 'updated_at']

# class ProductSerializer(serializers.ModelSerializer):
#     """Сериализатор товара"""
#     brand = BrandSerializer(read_only=True)
#     brand_id = serializers.PrimaryKeyRelatedField(
#         queryset=Brand.objects.all(),
#         source='brand',
#         write_only=True
#     )
    
#     class Meta:
#         model = Product
#         fields = ['id', 'name', 'brand', 'brand_id', 'price', 
#                  'description', 'image', 'category', 'stock', 
#                  'is_active', 'created_at', 'updated_at']
    
#     def to_representation(self, instance):
#         """Добавляем полный URL для изображения"""
#         representation = super().to_representation(instance)
#         if instance.image:
#             representation['image'] = self.context['request'].build_absolute_uri(instance.image.url)
#         else:
#             representation['image'] = None
#         return representation

# class CartItemSerializer(serializers.ModelSerializer):
#     """Сериализатор элемента корзины"""
#     product = ProductSerializer(read_only=True)
#     product_id = serializers.PrimaryKeyRelatedField(
#         queryset=Product.objects.all(),
#         source='product',
#         write_only=True
#     )
#     total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    
#     class Meta:
#         model = CartItem
#         fields = ['id', 'product', 'product_id', 'quantity', 
#                  'total_price', 'added_at']

# class CartSerializer(serializers.ModelSerializer):
#     """Сериализатор корзины"""
#     items = CartItemSerializer(many=True, read_only=True)
#     user = UserSerializer(read_only=True)
#     total_amount = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
#     items_count = serializers.IntegerField(read_only=True)
    
#     class Meta:
#         model = Cart
#         fields = ['id', 'user', 'items', 'total_amount', 
#                  'items_count', 'created_at', 'updated_at']

# class CartItemCreateSerializer(serializers.ModelSerializer):
#     """Сериализатор для создания элемента корзины"""
    
#     class Meta:
#         model = CartItem
#         fields = ['product', 'quantity']
    
#     def validate(self, data):
#         """Проверка наличия товара на складе"""
#         product = data['product']
#         quantity = data['quantity']
        
#         if quantity > product.stock:
#             raise serializers.ValidationError(
#                 f"Недостаточно товара на складе. Доступно: {product.stock}"
#             )
        
#         return data
    
#     def create(self, validated_data):
#         """Создание или обновление элемента корзины"""
#         cart, created = Cart.objects.get_or_create(user=self.context['request'].user)
#         product = validated_data['product']
#         quantity = validated_data['quantity']
        
#         # Проверяем, есть ли уже этот товар в корзине
#         cart_item, created = CartItem.objects.get_or_create(
#             cart=cart,
#             product=product,
#             defaults={'quantity': quantity}
#         )
        
#         if not created:
#             # Если товар уже в корзине, обновляем количество
#             cart_item.quantity += quantity
#             cart_item.save()
        
#         return cart_item

# class UserBrandConnectionSerializer(serializers.ModelSerializer):
#     """Сериализатор подключения к магазину"""
#     user = UserSerializer(read_only=True)
#     brand = BrandSerializer(read_only=True)
#     brand_id = serializers.PrimaryKeyRelatedField(
#         queryset=Brand.objects.all(),
#         source='brand',
#         write_only=True
#     )
    
#     class Meta:
#         model = UserBrandConnection
#         fields = ['id', 'user', 'brand', 'brand_id', 'connected_at']

# class AvailableBrandsFilterSerializer(serializers.Serializer):
#     """Сериализатор фильтров для доступных магазинов"""
#     category = serializers.CharField(required=False, allow_blank=True)
#     creator = serializers.CharField(required=False, allow_blank=True)






# from rest_framework import serializers
# from django.contrib.auth import get_user_model
# from .models import Brand, Product, Cart, CartItem, UserBrandConnection, PublishedProject

# User = get_user_model()

# class UserSerializer(serializers.ModelSerializer):
#     """Сериализатор пользователя"""
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'email', 'first_name', 'last_name']

# class BrandSerializer(serializers.ModelSerializer):
#     """Сериализатор магазина"""
#     creator = UserSerializer(read_only=True)
#     creator_id = serializers.PrimaryKeyRelatedField(
#         queryset=User.objects.all(),
#         source='creator',
#         write_only=True
#     )
    
#     class Meta:
#         model = Brand
#         fields = ['id', 'name', 'creator', 'creator_id', 'category', 
#                  'description', 'is_active', 'created_at', 'updated_at']

# class ProductSerializer(serializers.ModelSerializer):
#     """Сериализатор товара"""
#     brand = BrandSerializer(read_only=True)
#     brand_id = serializers.PrimaryKeyRelatedField(
#         queryset=Brand.objects.all(),
#         source='brand',
#         write_only=True
#     )
    
#     class Meta:
#         model = Product
#         fields = ['id', 'name', 'brand', 'brand_id', 'price', 
#                  'description', 'image', 'category', 'stock', 
#                  'is_active', 'created_at', 'updated_at']
    
#     def to_representation(self, instance):
#         """Добавляем полный URL для изображения"""
#         representation = super().to_representation(instance)
#         if instance.image:
#             representation['image'] = self.context['request'].build_absolute_uri(instance.image.url)
#         else:
#             representation['image'] = None
#         return representation

# class CartItemSerializer(serializers.ModelSerializer):
#     """Сериализатор элемента корзины"""
#     product = ProductSerializer(read_only=True)
#     product_id = serializers.PrimaryKeyRelatedField(
#         queryset=Product.objects.all(),
#         source='product',
#         write_only=True
#     )
#     total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    
#     class Meta:
#         model = CartItem
#         fields = ['id', 'product', 'product_id', 'quantity', 
#                  'total_price', 'added_at']

# class CartSerializer(serializers.ModelSerializer):
#     """Сериализатор корзины"""
#     items = CartItemSerializer(many=True, read_only=True)
#     user = UserSerializer(read_only=True)
#     total_amount = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
#     items_count = serializers.IntegerField(read_only=True)
    
#     class Meta:
#         model = Cart
#         fields = ['id', 'user', 'items', 'total_amount', 
#                  'items_count', 'created_at', 'updated_at']

# class CartItemCreateSerializer(serializers.ModelSerializer):
#     """Сериализатор для создания элемента корзины"""
    
#     class Meta:
#         model = CartItem
#         fields = ['product', 'quantity']
    
#     def validate(self, data):
#         """Проверка наличия товара на складе"""
#         product = data['product']
#         quantity = data['quantity']
        
#         if quantity > product.stock:
#             raise serializers.ValidationError(
#                 f"Недостаточно товара на складе. Доступно: {product.stock}"
#             )
        
#         return data
    
#     def create(self, validated_data):
#         """Создание или обновление элемента корзины"""
#         cart, created = Cart.objects.get_or_create(user=self.context['request'].user)
#         product = validated_data['product']
#         quantity = validated_data['quantity']
        
#         # Проверяем, есть ли уже этот товар в корзине
#         cart_item, created = CartItem.objects.get_or_create(
#             cart=cart,
#             product=product,
#             defaults={'quantity': quantity}
#         )
        
#         if not created:
#             # Если товар уже в корзине, обновляем количество
#             cart_item.quantity += quantity
#             cart_item.save()
        
#         return cart_item

# class UserBrandConnectionSerializer(serializers.ModelSerializer):
#     """Сериализатор подключения к магазину"""
#     user = UserSerializer(read_only=True)
#     brand = BrandSerializer(read_only=True)
#     brand_id = serializers.PrimaryKeyRelatedField(
#         queryset=Brand.objects.all(),
#         source='brand',
#         write_only=True
#     )
    
#     class Meta:
#         model = UserBrandConnection
#         fields = ['id', 'user', 'brand', 'brand_id', 'connected_at']

# class AvailableBrandsFilterSerializer(serializers.Serializer):
#     """Сериализатор фильтров для доступных магазинов"""
#     category = serializers.CharField(required=False, allow_blank=True)
#     creator = serializers.CharField(required=False, allow_blank=True)

# class PublishedProjectSerializer(serializers.ModelSerializer):
#     """Сериализатор для опубликованных проектов"""
#     owner = UserSerializer(read_only=True)
#     preview_url = serializers.CharField(read_only=True)
#     project_url = serializers.CharField(read_only=True)
#     short_description = serializers.CharField(read_only=True)
    
#     class Meta:
#         model = PublishedProject
#         fields = [
#             'id', 'project_id', 'title', 'description', 'owner',
#             'url_slug', 'is_active', 'published_at', 'updated_at',
#             'is_shop', 'category', 'preview_url', 'project_url',
#             'short_description', 'brand'
#         ]
#         read_only_fields = ['owner', 'published_at', 'updated_at', 'preview_url', 'project_url', 'short_description']
    
#     def get_project_url(self, obj):
#         """Получаем URL проекта"""
#         request = self.context.get('request')
#         if request:
#             return request.build_absolute_uri(obj.get_absolute_url())
#         return obj.get_absolute_url()
    
#     def to_representation(self, instance):
#         """Добавляем вычисляемые поля"""
#         representation = super().to_representation(instance)
#         representation['preview_url'] = instance.preview_url
#         representation['project_url'] = self.get_project_url(instance)
#         representation['short_description'] = instance.short_description
#         return representation

# class AvailableProjectsFilterSerializer(serializers.Serializer):
#     """Сериализатор фильтров для доступных проектов"""
#     category = serializers.CharField(required=False, allow_blank=True)
#     creator = serializers.CharField(required=False, allow_blank=True)
#     search = serializers.CharField(required=False, allow_blank=True)










# lk/serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Brand, Product, Cart, CartItem, UserBrandConnection, PublishedProject

User = get_user_model()

class BrandSerializer(serializers.ModelSerializer):
    creator = serializers.StringRelatedField()

    class Meta:
        model = Brand
        fields = ['id', 'name', 'creator', 'category', 'created_at']

class ProductSerializer(serializers.ModelSerializer):
    brand = BrandSerializer(read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'brand', 'price', 'is_active', 'created_at']

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity', 'added_at']

class CartSerializer(serializers.ModelSerializer):
    lk_items = CartItemSerializer(many=True, read_only=True)
    items_count = serializers.SerializerMethodField()
    total_amount = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'lk_items', 'items_count', 'total_amount', 'created_at']

    def get_items_count(self, obj):
        return sum(item.quantity for item in obj.lk_items.all())

    def get_total_amount(self, obj):
        return sum(item.quantity * item.product.price for item in obj.lk_items.all())

class CartItemCreateSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1, default=1)

    def create(self, validated_data):
        cart, created = Cart.objects.get_or_create(user=self.context['request'].user)
        product = Product.objects.get(id=validated_data['product_id'])
        item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={'quantity': validated_data['quantity']}
        )
        if not created:
            item.quantity += validated_data['quantity']
            item.save()
        return item

class UserBrandConnectionSerializer(serializers.ModelSerializer):
    brand = BrandSerializer(read_only=True)

    class Meta:
        model = UserBrandConnection
        fields = ['id', 'brand', 'connected_at']

class AvailableBrandsFilterSerializer(serializers.Serializer):
    category = serializers.CharField(required=False)
    creator = serializers.CharField(required=False)

class AvailableProjectsFilterSerializer(serializers.Serializer):
    category = serializers.CharField(required=False)
    creator = serializers.CharField(required=False)
    search = serializers.CharField(required=False)

class PublishedProjectSerializer(serializers.ModelSerializer):
    owner = serializers.SerializerMethodField()
    short_description = serializers.SerializerMethodField()

    class Meta:
        model = PublishedProject
        fields = [
            'id', 'title', 'description', 'category', 'is_shop', 'is_active',
            'text_color', 'bg_color', 'blocks_count', 'thumbnail', 'version',
            'created_at', 'updated_at', 'preview_url', 'owner', 'short_description'
        ]

    def get_owner(self, obj):
        return {
            'id': obj.owner.id,
            'username': obj.owner.username
        }

    def get_short_description(self, obj):
        desc = obj.description or ''
        return desc[:100] + '...' if len(desc) > 100 else desc