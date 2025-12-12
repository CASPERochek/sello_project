# sello_tovar/models.py

from django.db import models
from django.conf import settings  # Импортируйте settings вместо прямого User


class Brand(models.Model):
    """Модель бренда"""
    COUNTRY_CHOICES = [
        ('Россия', 'Россия'),
        ('США', 'США'),
        ('Германия', 'Германия'),
        ('Китай', 'Китай'),
        ('Япония', 'Япония'),
        ('Италия', 'Италия'),
        ('Франция', 'Франция'),
        ('Великобритания', 'Великобритания'),
        ('Южная Корея', 'Южная Корея'),
        ('Другое', 'Другое'),
    ]
    
    CATEGORY_CHOICES = [
        ('Электроника', 'Электроника'),
        ('Одежда', 'Одежда'),
        ('Продукты', 'Продукты'),
        ('Сельхозтехника', 'Сельхозтехника'),
        ('Строительство', 'Строительство'),
        ('Красота и здоровье', 'Красота и здоровье'),
        ('Автомобили', 'Автомобили'),
        ('Мебель', 'Мебель'),
        ('Спорт', 'Спорт'),
        ('Другое', 'Другое'),
    ]
    
    name = models.CharField('Название бренда', max_length=200, unique=True)
    country = models.CharField('Страна', max_length=50, choices=COUNTRY_CHOICES)
    category = models.CharField('Категория', max_length=50, choices=CATEGORY_CHOICES)
    logo = models.ImageField('Логотип', upload_to='brands/logos/', blank=True, null=True)
    description = models.TextField('Описание бренда', blank=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,  # Используем AUTH_USER_MODEL из settings
        on_delete=models.SET_NULL, 
        null=True, 
        related_name='brands',
        verbose_name='Создано пользователем'
    )
    created_at = models.DateTimeField('Дата создания', auto_now_add=True)
    updated_at = models.DateTimeField('Дата обновления', auto_now=True)
    
    class Meta:
        verbose_name = 'Бренд'
        verbose_name_plural = 'Бренды'
        ordering = ['name']
    
    def __str__(self):
        return self.name


class Category(models.Model):
    """Модель категорий товаров"""
    main_category = models.CharField('Основная категория', max_length=100)
    subcategory = models.CharField('Подкатегория', max_length=200)
    
    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'
        unique_together = ['main_category', 'subcategory']
    
    def __str__(self):
        return f"{self.main_category} - {self.subcategory}"


class Product(models.Model):
    """Модель товара"""
    name = models.CharField('Название товара', max_length=200)
    brand = models.ForeignKey(
        Brand, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        verbose_name='Бренд', 
        related_name='products'
    )
    main_category = models.CharField('Основная категория', max_length=100)
    category = models.CharField('Категория', max_length=200)
    color = models.CharField('Цвет', max_length=50, blank=True)
    price = models.DecimalField('Цена', max_digits=10, decimal_places=2)
    quantity = models.IntegerField('Количество', default=0)
    image = models.ImageField('Изображение', upload_to='products/images/', blank=True, null=True)
    description = models.TextField('Описание товара')
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,  # Используем AUTH_USER_MODEL из settings
        on_delete=models.SET_NULL, 
        null=True, 
        related_name='products',
        verbose_name='Создано пользователем'
    )
    created_at = models.DateTimeField('Дата создания', auto_now_add=True)
    updated_at = models.DateTimeField('Дата обновления', auto_now=True)
    
    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'
        ordering = ['-created_at']
    
    def __str__(self):
        return self.name
    
    @property
    def availability(self):
        """Статус наличия товара"""
        if self.quantity > 10:
            return "В наличии"
        elif self.quantity > 0:
            return "Мало"
        else:
            return "Нет в наличии"