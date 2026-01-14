# from django.db import models
# from django.contrib.auth import get_user_model
# from django.utils.translation import gettext_lazy as _
# from django.conf import settings

# User = get_user_model()

# class Brand(models.Model):
#     """Модель магазина/бренда"""
#     name = models.CharField(max_length=255, verbose_name=_('Название магазина'))
#     creator = models.ForeignKey(
#         User,
#         on_delete=models.CASCADE,
#         related_name='brands',
#         verbose_name=_('Создатель')
#     )
#     category = models.CharField(max_length=100, verbose_name=_('Категория'))
#     description = models.TextField(blank=True, verbose_name=_('Описание'))
#     is_active = models.BooleanField(default=True, verbose_name=_('Активен'))
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
    
#     class Meta:
#         db_table = 'brands'
#         verbose_name = _('Магазин')
#         verbose_name_plural = _('Магазины')
    
#     def __str__(self):
#         return self.name

# class Product(models.Model):
#     """Модель товара"""
#     name = models.CharField(max_length=255, verbose_name=_('Название'))
#     brand = models.ForeignKey(
#         Brand,
#         on_delete=models.CASCADE,
#         related_name='products',
#         verbose_name=_('Магазин')
#     )
#     price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name=_('Цена'))
#     description = models.TextField(blank=True, verbose_name=_('Описание'))
#     image = models.ImageField(
#         upload_to='products/',
#         null=True,
#         blank=True,
#         verbose_name=_('Изображение')
#     )
#     category = models.CharField(max_length=100, verbose_name=_('Категория'))
#     stock = models.IntegerField(default=0, verbose_name=_('Количество на складе'))
#     is_active = models.BooleanField(default=True, verbose_name=_('Активен'))
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
    
#     class Meta:
#         db_table = 'products'
#         verbose_name = _('Товар')
#         verbose_name_plural = _('Товары')
    
#     def __str__(self):
#         return self.name

# class Cart(models.Model):
#     """Модель корзины пользователя"""
#     user = models.OneToOneField(
#         User,
#         on_delete=models.CASCADE,
#         related_name='cart',
#         verbose_name=_('Пользователь')
#     )
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
    
#     class Meta:
#         db_table = 'carts'
#         verbose_name = _('Корзина')
#         verbose_name_plural = _('Корзины')
    
#     def __str__(self):
#         return f"Корзина пользователя {self.user.username}"
    
#     @property
#     def total_amount(self):
#         """Общая сумма корзины"""
#         return sum(item.total_price for item in self.items.all())
    
#     @property
#     def items_count(self):
#         """Количество товаров в корзине"""
#         return self.items.count()

# class CartItem(models.Model):
#     """Модель элемента корзины"""
#     cart = models.ForeignKey(
#         Cart,
#         on_delete=models.CASCADE,
#         related_name='items',
#         verbose_name=_('Корзина')
#     )
#     product = models.ForeignKey(
#         Product,
#         on_delete=models.CASCADE,
#         verbose_name=_('Товар')
#     )
#     quantity = models.PositiveIntegerField(default=1, verbose_name=_('Количество'))
#     added_at = models.DateTimeField(auto_now_add=True)
    
#     class Meta:
#         db_table = 'cart_items'
#         verbose_name = _('Элемент корзины')
#         verbose_name_plural = _('Элементы корзины')
#         unique_together = ['cart', 'product']
    
#     def __str__(self):
#         return f"{self.product.name} x {self.quantity}"
    
#     @property
#     def total_price(self):
#         """Общая цена за позицию"""
#         return self.product.price * self.quantity

# class UserBrandConnection(models.Model):
#     """Модель подключения пользователя к магазину"""
#     user = models.ForeignKey(
#         User,
#         on_delete=models.CASCADE,
#         related_name='connected_brands',
#         verbose_name=_('Пользователь')
#     )
#     brand = models.ForeignKey(
#         Brand,
#         on_delete=models.CASCADE,
#         related_name='connected_users',
#         verbose_name=_('Магазин')
#     )
#     connected_at = models.DateTimeField(auto_now_add=True)
    
#     class Meta:
#         db_table = 'user_brand_connections'
#         verbose_name = _('Подключение к магазину')
#         verbose_name_plural = _('Подключения к магазинам')
#         unique_together = ['user', 'brand']
    
#     def __str__(self):
#         return f"{self.user.username} -> {self.brand.name}"










from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from django.conf import settings

User = get_user_model()

class Brand(models.Model):
    """Модель магазина/бренда"""
    name = models.CharField(max_length=255, verbose_name=_('Название магазина'))
    creator = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='lk_user_brands',  # ИЗМЕНЕНО: уникальное имя
        verbose_name=_('Создатель')
    )
    category = models.CharField(max_length=100, verbose_name=_('Категория'))
    description = models.TextField(blank=True, verbose_name=_('Описание'))
    is_active = models.BooleanField(default=True, verbose_name=_('Активен'))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'lk_brands'  # ИЗМЕНЕНО: уникальное имя таблицы
        verbose_name = _('Магазин LK')
        verbose_name_plural = _('Магазины LK')
    
    def __str__(self):
        return self.name

class Product(models.Model):
    """Модель товара"""
    name = models.CharField(max_length=255, verbose_name=_('Название'))
    brand = models.ForeignKey(
        Brand,
        on_delete=models.CASCADE,
        related_name='lk_products',  # ИЗМЕНЕНО: уникальное имя
        verbose_name=_('Магазин')
    )
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name=_('Цена'))
    description = models.TextField(blank=True, verbose_name=_('Описание'))
    image = models.ImageField(
        upload_to='lk_products/',  # ИЗМЕНЕНО: отдельная папка
        null=True,
        blank=True,
        verbose_name=_('Изображение')
    )
    category = models.CharField(max_length=100, verbose_name=_('Категория'))
    stock = models.IntegerField(default=0, verbose_name=_('Количество на складе'))
    is_active = models.BooleanField(default=True, verbose_name=_('Активен'))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'lk_products'  # ИЗМЕНЕНО: уникальное имя таблицы
        verbose_name = _('Товар LK')
        verbose_name_plural = _('Товары LK')
    
    def __str__(self):
        return self.name

class Cart(models.Model):
    """Модель корзины пользователя"""
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='lk_cart',  # ИЗМЕНЕНО: уникальное имя
        verbose_name=_('Пользователь')
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'lk_carts'  # ИЗМЕНЕНО: уникальное имя таблицы
        verbose_name = _('Корзина LK')
        verbose_name_plural = _('Корзины LK')
    
    def __str__(self):
        return f"Корзина LK пользователя {self.user.username}"
    
    @property
    def total_amount(self):
        """Общая сумма корзины"""
        return sum(item.total_price for item in self.items.all())
    
    @property
    def items_count(self):
        """Количество товаров в корзине"""
        return self.items.count()

class CartItem(models.Model):
    """Модель элемента корзины"""
    cart = models.ForeignKey(
        Cart,
        on_delete=models.CASCADE,
        related_name='lk_items',  # ИЗМЕНЕНО: уникальное имя
        verbose_name=_('Корзина')
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        verbose_name=_('Товар')
    )
    quantity = models.PositiveIntegerField(default=1, verbose_name=_('Количество'))
    added_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'lk_cart_items'  # ИЗМЕНЕНО: уникальное имя таблицы
        verbose_name = _('Элемент корзины LK')
        verbose_name_plural = _('Элементы корзины LK')
        unique_together = ['cart', 'product']
    
    def __str__(self):
        return f"{self.product.name} x {self.quantity}"
    
    @property
    def total_price(self):
        """Общая цена за позицию"""
        return self.product.price * self.quantity

class UserBrandConnection(models.Model):
    """Модель подключения пользователя к магазину"""
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='lk_connected_brands',  # ИЗМЕНЕНО: уникальное имя
        verbose_name=_('Пользователь')
    )
    brand = models.ForeignKey(
        Brand,
        on_delete=models.CASCADE,
        related_name='lk_connected_users',  # ИЗМЕНЕНО: уникальное имя
        verbose_name=_('Магазин')
    )
    connected_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'lk_user_brand_connections'  # ИЗМЕНЕНО: уникальное имя таблицы
        verbose_name = _('Подключение к магазину LK')
        verbose_name_plural = _('Подключения к магазинам LK')
        unique_together = ['user', 'brand']
    
    def __str__(self):
        return f"{self.user.username} -> {self.brand.name}"
