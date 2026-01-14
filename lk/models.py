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
#         related_name='lk_user_brands',  # ИЗМЕНЕНО: уникальное имя
#         verbose_name=_('Создатель')
#     )
#     category = models.CharField(max_length=100, verbose_name=_('Категория'))
#     description = models.TextField(blank=True, verbose_name=_('Описание'))
#     is_active = models.BooleanField(default=True, verbose_name=_('Активен'))
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
    
#     class Meta:
#         db_table = 'lk_brands'  # ИЗМЕНЕНО: уникальное имя таблицы
#         verbose_name = _('Магазин LK')
#         verbose_name_plural = _('Магазины LK')
    
#     def __str__(self):
#         return self.name

# class Product(models.Model):
#     """Модель товара"""
#     name = models.CharField(max_length=255, verbose_name=_('Название'))
#     brand = models.ForeignKey(
#         Brand,
#         on_delete=models.CASCADE,
#         related_name='lk_products',  # ИЗМЕНЕНО: уникальное имя
#         verbose_name=_('Магазин')
#     )
#     price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name=_('Цена'))
#     description = models.TextField(blank=True, verbose_name=_('Описание'))
#     image = models.ImageField(
#         upload_to='lk_products/',  # ИЗМЕНЕНО: отдельная папка
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
#         db_table = 'lk_products'  # ИЗМЕНЕНО: уникальное имя таблицы
#         verbose_name = _('Товар LK')
#         verbose_name_plural = _('Товары LK')
    
#     def __str__(self):
#         return self.name

# class Cart(models.Model):
#     """Модель корзины пользователя"""
#     user = models.OneToOneField(
#         User,
#         on_delete=models.CASCADE,
#         related_name='lk_cart',  # ИЗМЕНЕНО: уникальное имя
#         verbose_name=_('Пользователь')
#     )
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
    
#     class Meta:
#         db_table = 'lk_carts'  # ИЗМЕНЕНО: уникальное имя таблицы
#         verbose_name = _('Корзина LK')
#         verbose_name_plural = _('Корзины LK')
    
#     def __str__(self):
#         return f"Корзина LK пользователя {self.user.username}"
    
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
#         related_name='lk_items',  # ИЗМЕНЕНО: уникальное имя
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
#         db_table = 'lk_cart_items'  # ИЗМЕНЕНО: уникальное имя таблицы
#         verbose_name = _('Элемент корзины LK')
#         verbose_name_plural = _('Элементы корзины LK')
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
#         related_name='lk_connected_brands',  # ИЗМЕНЕНО: уникальное имя
#         verbose_name=_('Пользователь')
#     )
#     brand = models.ForeignKey(
#         Brand,
#         on_delete=models.CASCADE,
#         related_name='lk_connected_users',  # ИЗМЕНЕНО: уникальное имя
#         verbose_name=_('Магазин')
#     )
#     connected_at = models.DateTimeField(auto_now_add=True)
    
#     class Meta:
#         db_table = 'lk_user_brand_connections'  # ИЗМЕНЕНО: уникальное имя таблицы
#         verbose_name = _('Подключение к магазину LK')
#         verbose_name_plural = _('Подключения к магазинам LK')
#         unique_together = ['user', 'brand']
    
#     def __str__(self):
#         return f"{self.user.username} -> {self.brand.name}"


















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
#         related_name='lk_user_brands',
#         verbose_name=_('Создатель')
#     )
#     category = models.CharField(max_length=100, verbose_name=_('Категория'))
#     description = models.TextField(blank=True, verbose_name=_('Описание'))
#     is_active = models.BooleanField(default=True, verbose_name=_('Активен'))
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
    
#     class Meta:
#         db_table = 'lk_brands'
#         verbose_name = _('Магазин LK')
#         verbose_name_plural = _('Магазины LK')
    
#     def __str__(self):
#         return self.name

# class Product(models.Model):
#     """Модель товара"""
#     name = models.CharField(max_length=255, verbose_name=_('Название'))
#     brand = models.ForeignKey(
#         Brand,
#         on_delete=models.CASCADE,
#         related_name='lk_products',
#         verbose_name=_('Магазин')
#     )
#     price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name=_('Цена'))
#     description = models.TextField(blank=True, verbose_name=_('Описание'))
#     image = models.ImageField(
#         upload_to='lk_products/',
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
#         db_table = 'lk_products'
#         verbose_name = _('Товар LK')
#         verbose_name_plural = _('Товары LK')
    
#     def __str__(self):
#         return self.name

# class Cart(models.Model):
#     """Модель корзины пользователя"""
#     user = models.OneToOneField(
#         User,
#         on_delete=models.CASCADE,
#         related_name='lk_cart',
#         verbose_name=_('Пользователь')
#     )
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
    
#     class Meta:
#         db_table = 'lk_carts'
#         verbose_name = _('Корзина LK')
#         verbose_name_plural = _('Корзины LK')
    
#     def __str__(self):
#         return f"Корзина LK пользователя {self.user.username}"
    
#     @property
#     def total_amount(self):
#         """Общая сумма корзины"""
#         return sum(item.total_price for item in self.lk_items.all())
    
#     @property
#     def items_count(self):
#         """Количество товаров в корзине"""
#         return self.lk_items.count()

# class CartItem(models.Model):
#     """Модель элемента корзины"""
#     cart = models.ForeignKey(
#         Cart,
#         on_delete=models.CASCADE,
#         related_name='lk_items',
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
#         db_table = 'lk_cart_items'
#         verbose_name = _('Элемент корзины LK')
#         verbose_name_plural = _('Элементы корзины LK')
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
#         related_name='lk_connected_brands',
#         verbose_name=_('Пользователь')
#     )
#     brand = models.ForeignKey(
#         Brand,
#         on_delete=models.CASCADE,
#         related_name='lk_connected_users',
#         verbose_name=_('Магазин')
#     )
#     connected_at = models.DateTimeField(auto_now_add=True)
    
#     class Meta:
#         db_table = 'lk_user_brand_connections'
#         verbose_name = _('Подключение к магазину LK')
#         verbose_name_plural = _('Подключения к магазинам LK')
#         unique_together = ['user', 'brand']
    
#     def __str__(self):
#         return f"{self.user.username} -> {self.brand.name}"

# class PublishedProject(models.Model):
#     """Модель для опубликованных проектов из конструктора"""
#     project_id = models.IntegerField(verbose_name=_('ID проекта в конструкторе'))
#     title = models.CharField(max_length=255, verbose_name=_('Название сайта'))
#     owner = models.ForeignKey(
#         User,
#         on_delete=models.CASCADE,
#         related_name='published_projects',
#         verbose_name=_('Владелец')
#     )
#     description = models.TextField(blank=True, verbose_name=_('Описание'))
#     url_slug = models.SlugField(max_length=100, unique=True, verbose_name=_('URL-адрес'))
#     is_active = models.BooleanField(default=True, verbose_name=_('Активен'))
#     published_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
    
#     # Дополнительные поля для магазина
#     is_shop = models.BooleanField(default=False, verbose_name=_('Это магазин'))
#     category = models.CharField(max_length=100, blank=True, verbose_name=_('Категория'))
    
#     # Связь с существующей моделью Brand
#     brand = models.OneToOneField(
#         Brand,
#         on_delete=models.SET_NULL,
#         null=True,
#         blank=True,
#         related_name='published_project',
#         verbose_name=_('Связанный магазин')
#     )
    
#     class Meta:
#         db_table = 'published_projects'
#         verbose_name = _('Опубликованный проект')
#         verbose_name_plural = _('Опубликованные проекты')
#         ordering = ['-published_at']
#         indexes = [
#             models.Index(fields=['is_active', 'published_at']),
#             models.Index(fields=['owner', 'is_active']),
#             models.Index(fields=['category', 'is_active']),
#         ]
    
#     def __str__(self):
#         return f"{self.title} ({self.owner.username})"
    
#     def get_absolute_url(self):
#         return f"/projects/{self.url_slug}/"
    
#     @property
#     def preview_url(self):
#         """URL для предпросмотра проекта"""
#         return f"/project-preview/{self.project_id}/"
    
#     @property
#     def short_description(self):
#         """Краткое описание"""
#         if len(self.description) > 150:
#             return self.description[:150] + '...'
#         return self.description









# lk/models.py
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Brand(models.Model):
    name = models.CharField(max_length=255)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='lk_brands')
    category = models.CharField(max_length=100, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)  # ← добавлено

class Product(models.Model):
    name = models.CharField(max_length=255)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, related_name='products')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    # Добавлены недостающие поля
    category = models.CharField(max_length=100, blank=True)
    stock = models.PositiveIntegerField(default=0)  # остаток
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)  # ← добавлено

class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='lk_cart')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)  # ← добавлено

    @property
    def items_count(self):
        return sum(item.quantity for item in self.lk_items.all())

    @property
    def total_amount(self):
        return sum(item.quantity * item.product.price for item in self.lk_items.all())

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='lk_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)

class UserBrandConnection(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='brand_connections')
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, related_name='connected_users')
    connected_at = models.DateTimeField(auto_now_add=True)

class PublishedProject(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='published_projects')
    category = models.CharField(max_length=100, blank=True)
    is_shop = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)  # ← используем updated_at вместо published_at
    preview_url = models.CharField(max_length=500, blank=True)
    text_color = models.CharField(max_length=20, blank=True)
    bg_color = models.CharField(max_length=20, blank=True)
    blocks_count = models.IntegerField(default=0)
    thumbnail = models.CharField(max_length=500, blank=True)
    version = models.CharField(max_length=20, default='1.0')

    def __str__(self):
        return self.title