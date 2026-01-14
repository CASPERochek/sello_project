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
#         cart = self.context['request'].user.cart
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






from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Brand, Product, Cart, CartItem, UserBrandConnection

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    """Сериализатор пользователя"""
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class BrandSerializer(serializers.ModelSerializer):
    """Сериализатор магазина"""
    creator = UserSerializer(read_only=True)
    creator_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source='creator',
        write_only=True
    )
    
    class Meta:
        model = Brand
        fields = ['id', 'name', 'creator', 'creator_id', 'category', 
                 'description', 'is_active', 'created_at', 'updated_at']

class ProductSerializer(serializers.ModelSerializer):
    """Сериализатор товара"""
    brand = BrandSerializer(read_only=True)
    brand_id = serializers.PrimaryKeyRelatedField(
        queryset=Brand.objects.all(),
        source='brand',
        write_only=True
    )
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'brand', 'brand_id', 'price', 
                 'description', 'image', 'category', 'stock', 
                 'is_active', 'created_at', 'updated_at']
    
    def to_representation(self, instance):
        """Добавляем полный URL для изображения"""
        representation = super().to_representation(instance)
        if instance.image:
            representation['image'] = self.context['request'].build_absolute_uri(instance.image.url)
        else:
            representation['image'] = None
        return representation

class CartItemSerializer(serializers.ModelSerializer):
    """Сериализатор элемента корзины"""
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        source='product',
        write_only=True
    )
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_id', 'quantity', 
                 'total_price', 'added_at']

class CartSerializer(serializers.ModelSerializer):
    """Сериализатор корзины"""
    items = CartItemSerializer(many=True, read_only=True)
    user = UserSerializer(read_only=True)
    total_amount = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    items_count = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'total_amount', 
                 'items_count', 'created_at', 'updated_at']

class CartItemCreateSerializer(serializers.ModelSerializer):
    """Сериализатор для создания элемента корзины"""
    
    class Meta:
        model = CartItem
        fields = ['product', 'quantity']
    
    def validate(self, data):
        """Проверка наличия товара на складе"""
        product = data['product']
        quantity = data['quantity']
        
        if quantity > product.stock:
            raise serializers.ValidationError(
                f"Недостаточно товара на складе. Доступно: {product.stock}"
            )
        
        return data
    
    def create(self, validated_data):
        """Создание или обновление элемента корзины"""
        cart, created = Cart.objects.get_or_create(user=self.context['request'].user)
        product = validated_data['product']
        quantity = validated_data['quantity']
        
        # Проверяем, есть ли уже этот товар в корзине
        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={'quantity': quantity}
        )
        
        if not created:
            # Если товар уже в корзине, обновляем количество
            cart_item.quantity += quantity
            cart_item.save()
        
        return cart_item

class UserBrandConnectionSerializer(serializers.ModelSerializer):
    """Сериализатор подключения к магазину"""
    user = UserSerializer(read_only=True)
    brand = BrandSerializer(read_only=True)
    brand_id = serializers.PrimaryKeyRelatedField(
        queryset=Brand.objects.all(),
        source='brand',
        write_only=True
    )
    
    class Meta:
        model = UserBrandConnection
        fields = ['id', 'user', 'brand', 'brand_id', 'connected_at']

class AvailableBrandsFilterSerializer(serializers.Serializer):
    """Сериализатор фильтров для доступных магазинов"""
    category = serializers.CharField(required=False, allow_blank=True)
    creator = serializers.CharField(required=False, allow_blank=True)
