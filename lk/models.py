



# # lk/models.py
# from django.db import models
# from django.contrib.auth import get_user_model

# User = get_user_model()

# class Brand(models.Model):
#     name = models.CharField(max_length=255)
#     creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='lk_brands')
#     category = models.CharField(max_length=100, blank=True)
#     is_active = models.BooleanField(default=True)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     def __str__(self):
#         return self.name

# class Product(models.Model):
#     name = models.CharField(max_length=255)
#     brand = models.ForeignKey(Brand, on_delete=models.CASCADE, related_name='products')
#     price = models.DecimalField(max_digits=10, decimal_places=2)
#     category = models.CharField(max_length=100, blank=True)
#     stock = models.PositiveIntegerField(default=0)
#     is_active = models.BooleanField(default=True)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     def __str__(self):
#         return self.name

# class Cart(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='lk_cart')
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     @property
#     def items_count(self):
#         return sum(item.quantity for item in self.lk_items.all())

#     @property
#     def total_amount(self):
#         return sum(item.quantity * item.product.price for item in self.lk_items.all())

# class CartItem(models.Model):
#     cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='lk_items')
#     product = models.ForeignKey(Product, on_delete=models.CASCADE)
#     quantity = models.PositiveIntegerField(default=1)
#     added_at = models.DateTimeField(auto_now_add=True)

# class UserBrandConnection(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='brand_connections')
#     brand = models.ForeignKey(Brand, on_delete=models.CASCADE, related_name='connected_users')
#     connected_at = models.DateTimeField(auto_now_add=True)

# class PublishedProject(models.Model):
#     title = models.CharField(max_length=255)
#     description = models.TextField(blank=True)
#     owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='published_projects')
#     category = models.CharField(max_length=100, blank=True)
#     is_shop = models.BooleanField(default=False)
#     is_active = models.BooleanField(default=True)
    
#     # Старые поля — сохраняем
#     published_at = models.DateTimeField(null=True, blank=True)
#     project_id = models.IntegerField(null=True, blank=True)
#     url_slug = models.CharField(max_length=255, blank=True, default='')
    
#     # Новые поля
#     preview_url = models.CharField(max_length=500, blank=True, default='')
#     text_color = models.CharField(max_length=20, blank=True, default='')
#     bg_color = models.CharField(max_length=20, blank=True, default='')
#     blocks_count = models.IntegerField(default=0)
#     thumbnail = models.CharField(max_length=500, blank=True, default='')
#     version = models.CharField(max_length=20, default='1.0')
    
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     def __str__(self):
#         return self.title













# lk/models.py
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Упрощенная модель магазина (пока не используем)
class Brand(models.Model):
    name = models.CharField(max_length=255)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='lk_brands')
    category = models.CharField(max_length=100, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

# Упрощенная модель для отображения проектов из конструктора
class PublishedProject(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='published_projects')
    category = models.CharField(max_length=100, blank=True)
    is_shop = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    
    # Связь с дизайном из конструктора (не ForeignKey, просто ID для связи)
    design_id = models.IntegerField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title