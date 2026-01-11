from django.db import models
from django.conf import settings  # Добавляем импорт settings

class PageDesign(models.Model):
    """Дизайн страницы конструктора"""
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,  # Используем AUTH_USER_MODEL
        on_delete=models.CASCADE, 
        verbose_name="Пользователь", 
        null=True, 
        blank=True
    )
    name = models.CharField(max_length=200, verbose_name="Название")
    blocks = models.JSONField(verbose_name="Блоки конструктора", default=list)
    text_color = models.CharField(max_length=7, default="#000000", verbose_name="Цвет текста")
    bg_color = models.CharField(max_length=7, default="#ffffff", verbose_name="Цвет фона")
    # Добавим поле для хранения JSON файла
    json_file = models.FileField(upload_to='constructor_json/', verbose_name="JSON файл", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Дата обновления")
    
    class Meta:
        verbose_name = "Дизайн страницы"
        verbose_name_plural = "Дизайны страниц"
        ordering = ['-created_at']  # Сортировка по дате создания
    
    def __str__(self):
        return f"{self.name} (Пользователь: {self.user.username if self.user else 'Нет'})"


class ContentItem(models.Model):
    """Контентные элементы (товары/новости) для конструктора"""
    CONTENT_TYPES = [
        ('product', 'Товар'),
        ('news', 'Новость'),
    ]
    
    title = models.CharField(max_length=200, verbose_name="Название")
    content_type = models.CharField(max_length=20, choices=CONTENT_TYPES, verbose_name="Тип контента")
    image = models.ImageField(upload_to='constructor_content/', verbose_name="Изображение", null=True, blank=True)
    description = models.TextField(verbose_name="Описание", blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Цена", null=True, blank=True)
    text = models.TextField(verbose_name="Текст новости", blank=True)
    is_active = models.BooleanField(default=True, verbose_name="Активный")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")
    
    class Meta:
        verbose_name = "Элемент контента"
        verbose_name_plural = "Элементы контента"
    
    def __str__(self):
        return f"{self.get_content_type_display()}: {self.title}"