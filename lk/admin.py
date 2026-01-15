
# from django.contrib import admin
# from .models import Brand, Product, Cart, CartItem, UserBrandConnection

# @admin.register(Brand)
# class BrandAdmin(admin.ModelAdmin):
#     list_display = ('name', 'creator', 'category', 'is_active', 'created_at')
#     list_filter = ('category', 'is_active', 'created_at')
#     search_fields = ('name', 'creator__username')
#     readonly_fields = ('created_at', 'updated_at')

# @admin.register(Product)
# class ProductAdmin(admin.ModelAdmin):
#     list_display = ('name', 'brand', 'price', 'category', 'stock', 'is_active')
#     list_filter = ('category', 'is_active', 'brand')
#     search_fields = ('name', 'brand__name')
#     readonly_fields = ('created_at', 'updated_at')

# @admin.register(Cart)
# class CartAdmin(admin.ModelAdmin):
#     list_display = ('user', 'items_count', 'total_amount', 'updated_at')
#     readonly_fields = ('created_at', 'updated_at')

# @admin.register(CartItem)
# class CartItemAdmin(admin.ModelAdmin):
#     list_display = ('product', 'cart', 'quantity', 'added_at')
#     list_filter = ('added_at',)
#     search_fields = ('product__name', 'cart__user__username')

# @admin.register(UserBrandConnection)
# class UserBrandConnectionAdmin(admin.ModelAdmin):
#     list_display = ('user', 'brand', 'connected_at')
#     list_filter = ('connected_at',)
#     search_fields = ('user__username', 'brand__name')
