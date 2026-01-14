
# # from django.contrib import admin
# # from .models import Brand, Product, Cart, CartItem, UserBrandConnection

# # @admin.register(Brand)
# # class BrandAdmin(admin.ModelAdmin):
# #     list_display = ('name', 'creator', 'category', 'is_active', 'created_at')
# #     list_filter = ('category', 'is_active', 'created_at')
# #     search_fields = ('name', 'creator__username')
# #     readonly_fields = ('created_at', 'updated_at')

# # @admin.register(Product)
# # class ProductAdmin(admin.ModelAdmin):
# #     list_display = ('name', 'brand', 'price', 'category', 'stock', 'is_active')
# #     list_filter = ('category', 'is_active', 'brand')
# #     search_fields = ('name', 'brand__name')
# #     readonly_fields = ('created_at', 'updated_at')

# # @admin.register(Cart)
# # class CartAdmin(admin.ModelAdmin):
# #     list_display = ('user', 'items_count', 'total_amount', 'updated_at')
# #     readonly_fields = ('created_at', 'updated_at')

# # @admin.register(CartItem)
# # class CartItemAdmin(admin.ModelAdmin):
# #     list_display = ('product', 'cart', 'quantity', 'added_at')
# #     list_filter = ('added_at',)
# #     search_fields = ('product__name', 'cart__user__username')

# # @admin.register(UserBrandConnection)
# # class UserBrandConnectionAdmin(admin.ModelAdmin):
# #     list_display = ('user', 'brand', 'connected_at')
# #     list_filter = ('connected_at',)
# #     search_fields = ('user__username', 'brand__name')




# from django.contrib import admin
# from .models import Brand, Product, Cart, CartItem, UserBrandConnection, PublishedProject

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

# @admin.register(PublishedProject)
# class PublishedProjectAdmin(admin.ModelAdmin):
#     list_display = ('title', 'owner', 'category', 'is_shop', 'is_active', 'published_at')
#     list_filter = ('is_shop', 'is_active', 'category', 'published_at')
#     search_fields = ('title', 'owner__username', 'description')
#     readonly_fields = ('published_at', 'updated_at')
#     fieldsets = (
#         ('Основная информация', {
#             'fields': ('project_id', 'title', 'owner', 'description', 'url_slug')
#         }),
#         ('Классификация', {
#             'fields': ('is_shop', 'category', 'brand')
#         }),
#         ('Статус', {
#             'fields': ('is_active',)
#         }),
#         ('Даты', {
#             'fields': ('published_at', 'updated_at'),
#             'classes': ('collapse',)
#         }),
#     )



# lk/admin.py
from django.contrib import admin
from .models import Brand, Product, Cart, CartItem, UserBrandConnection, PublishedProject

@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ('name', 'creator', 'category', 'is_active', 'created_at', 'updated_at')
    list_filter = ('is_active', 'category', 'created_at')
    search_fields = ('name', 'creator__username')
    readonly_fields = ('created_at', 'updated_at')

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'brand', 'price', 'category', 'stock', 'is_active', 'created_at', 'updated_at')
    list_filter = ('is_active', 'category', 'brand', 'created_at')
    search_fields = ('name', 'brand__name')
    readonly_fields = ('created_at', 'updated_at')

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('user', 'items_count', 'total_amount', 'updated_at')
    readonly_fields = ('user', 'created_at', 'updated_at', 'items_count', 'total_amount')
    
    def items_count(self, obj):
        return obj.items_count
    items_count.short_description = 'Количество товаров'

    def total_amount(self, obj):
        return f"{obj.total_amount} ₽"
    total_amount.short_description = 'Сумма'

@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('cart', 'product', 'quantity', 'added_at')
    readonly_fields = ('added_at',)

@admin.register(UserBrandConnection)
class UserBrandConnectionAdmin(admin.ModelAdmin):
    list_display = ('user', 'brand', 'connected_at')
    readonly_fields = ('connected_at',)

@admin.register(PublishedProject)
class PublishedProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'owner', 'category', 'is_shop', 'is_active', 'updated_at')
    list_filter = ('is_shop', 'is_active', 'category', 'updated_at')
    search_fields = ('title', 'owner__username', 'description')
    readonly_fields = ('updated_at',)  # ← было 'published_at' — заменили