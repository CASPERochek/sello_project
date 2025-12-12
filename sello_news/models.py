# from django.db import models
# from django.conf import settings

# class News(models.Model):
#     CATEGORY_CHOICES = [
#         ('general', 'Общие'),
#         ('updates', 'Обновления'),
#         ('promotions', 'Акции'),
#         ('tech', 'Технологии'),
#     ]
    
#     title = models.CharField(max_length=200)
#     content = models.TextField()
#     image = models.ImageField(upload_to='news/', blank=True, null=True)
#     category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='general')
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
#     author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     is_published = models.BooleanField(default=True)

#     def __str__(self):
#         return self.title

#     class Meta:
#         ordering = ['-created_at']





from django.db import models
from django.conf import settings
import os

class News(models.Model):
    CATEGORY_CHOICES = [
        ('general', 'Общие'),
        ('updates', 'Обновления'),
        ('promotions', 'Акции'),
        ('tech', 'Технологии'),
    ]
    
    title = models.CharField(max_length=200)
    content = models.TextField()
    image = models.ImageField(
        upload_to='news/',
        blank=True, 
        null=True,
        verbose_name='Изображение'
    )
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='general')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    is_published = models.BooleanField(default=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Новость'
        verbose_name_plural = 'Новости'
    
    def save(self, *args, **kwargs):
        # При сохранении выводим информацию об изображении
        if self.image:
            print(f"💾 Сохраняем изображение: {self.image.name}")
            print(f"   Путь: {self.image.path}")
            print(f"   URL: {self.image.url}")
        super().save(*args, **kwargs)