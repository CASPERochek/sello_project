from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.serializers.json import DjangoJSONEncoder
import json
import os

User = get_user_model()

class PageDesign(models.Model):
    """Дизайн страницы конструктора"""
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name="Пользователь",
        null=True,
        blank=True,
        related_name='designs'
    )
    name = models.CharField(
        max_length=200,
        verbose_name="Название",
        default="Без названия"
    )
    blocks = models.JSONField(
        verbose_name="Блоки конструктора",
        encoder=DjangoJSONEncoder,
        default=list
    )
    text_color = models.CharField(
        max_length=7,
        default="#000000",
        verbose_name="Цвет текста"
    )
    bg_color = models.CharField(
        max_length=7,
        default="#ffffff",
        verbose_name="Цвет фона"
    )
    json_file = models.FileField(
        upload_to='constructor_json/',
        verbose_name="JSON файл",
        null=True,
        blank=True
    )
    version = models.CharField(
        max_length=10,
        default='1.0',
        verbose_name="Версия"
    )
    is_public = models.BooleanField(
        default=False,
        verbose_name="Публичный доступ"
    )
    metadata = models.JSONField(
        verbose_name="Метаданные",
        encoder=DjangoJSONEncoder,
        default=dict,
        blank=True
    )
    blocks_count = models.IntegerField(
        default=0,
        verbose_name="Количество блоков"
    )
    thumbnail = models.ImageField(
        upload_to='constructor_thumbnails/',
        verbose_name="Превью",
        null=True,
        blank=True
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Дата создания"
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="Дата обновления"
    )
    
    class Meta:
        db_table = 'construct_pagedesign'
        verbose_name = "Дизайн страницы"
        verbose_name_plural = "Дизайны страниц"
        ordering = ['-updated_at']
        indexes = [
            models.Index(fields=['user', 'created_at']),
            models.Index(fields=['is_public']),
            models.Index(fields=['name']),
        ]
    
    def __str__(self):
        username = self.user.username if self.user else "Аноним"
        return f"{self.name} ({username}, {self.blocks_count} блоков)"
    
    def save(self, *args, **kwargs):
        """Переопределяем save для автоматического подсчета блоков"""
        # Подсчет блоков
        if isinstance(self.blocks, list):
            self.blocks_count = len(self.blocks)
        elif isinstance(self.blocks, dict):
            # Если структура вида {"blocks": [...]}
            if 'blocks' in self.blocks and isinstance(self.blocks['blocks'], list):
                self.blocks_count = len(self.blocks['blocks'])
            else:
                self.blocks_count = 0
        else:
            self.blocks_count = 0
        
        super().save(*args, **kwargs)
    
    def get_full_json(self):
        """Получить полный JSON дизайна"""
        return {
            'id': self.id,
            'name': self.name,
            'version': self.version,
            'design': {
                'blocks': self.blocks,
                'colors': {
                    'text': self.text_color,
                    'background': self.bg_color
                }
            },
            'metadata': {
                **self.metadata,
                'blocks_count': self.blocks_count,
                'is_public': self.is_public,
                'created_at': self.created_at.isoformat(),
                'updated_at': self.updated_at.isoformat(),
                'user': self.user.username if self.user else None,
                'user_id': self.user.id if self.user else None,
                'json_file': self.json_file.url if self.json_file else None
            }
        }
    
    def generate_json_file(self):
        """Сгенерировать и сохранить JSON файл"""
        from django.core.files.base import ContentFile
        
        json_content = self.get_full_json()
        json_str = json.dumps(json_content, ensure_ascii=False, indent=2, cls=DjangoJSONEncoder)
        
        # Создаем имя файла
        file_name = f"design_{self.id}_{self.name.replace(' ', '_')}.json"
        
        # Удаляем старый файл если есть
        if self.json_file:
            try:
                if os.path.exists(self.json_file.path):
                    os.remove(self.json_file.path)
            except Exception as e:
                print(f"Ошибка удаления старого файла: {e}")
        
        # Сохраняем новый файл
        try:
            self.json_file.save(file_name, ContentFile(json_str.encode('utf-8')))
            self.save()
            return self.json_file.url if self.json_file else None
        except Exception as e:
            print(f"Ошибка сохранения JSON файла: {e}")
            return None
    
    def can_edit(self, user):
        """Проверка прав на редактирование"""
        if not user or not user.is_authenticated:
            return self.user is None  # Анонимные могут редактировать только анонимные дизайны
        return self.user == user or self.user is None
    
    def can_view(self, user):
        """Проверка прав на просмотр"""
        if self.is_public:
            return True
        if not user or not user.is_authenticated:
            return self.user is None
        return self.user == user or self.user is None


class PageDesignHistory(models.Model):
    """История изменений дизайна"""
    design = models.ForeignKey(
        PageDesign,
        on_delete=models.CASCADE,
        related_name='history',
        verbose_name="Дизайн"
    )
    version = models.CharField(
        max_length=10,
        verbose_name="Версия"
    )
    blocks = models.JSONField(
        verbose_name="Блоки",
        encoder=DjangoJSONEncoder
    )
    text_color = models.CharField(
        max_length=7,
        verbose_name="Цвет текста"
    )
    bg_color = models.CharField(
        max_length=7,
        verbose_name="Цвет фона"
    )
    changed_by = models.ForeignKey(
    User,
    on_delete=models.SET_NULL,
    null=True,
    verbose_name="Кем изменено"
)
    change_comment = models.TextField(
        verbose_name="Комментарий изменения",
        blank=True
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Дата изменения"
    )
    
    class Meta:
        db_table = 'construct_pagedesign_history'
        verbose_name = "История дизайна"
        verbose_name_plural = "История дизайнов"
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['design']),
            models.Index(fields=['created_at']),
        ]
    
    def __str__(self):
        return f"Версия {self.version} дизайна {self.design.name}"


class ContentItem(models.Model):
    """Контентные элементы (товары/новости) для конструктора"""
    CONTENT_TYPES = [
        ('product', 'Товар'),
        ('news', 'Новость'),
    ]
    
    title = models.CharField(
        max_length=200, 
        verbose_name="Название"
    )
    content_type = models.CharField(
        max_length=20, 
        choices=CONTENT_TYPES, 
        verbose_name="Тип контента"
    )
    image = models.ImageField(
        upload_to='constructor_content/', 
        verbose_name="Изображение", 
        null=True, 
        blank=True
    )
    description = models.TextField(
        verbose_name="Описание", 
        blank=True
    )
    price = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        verbose_name="Цена", 
        null=True, 
        blank=True
    )
    text = models.TextField(
        verbose_name="Текст новости", 
        blank=True
    )
    is_active = models.BooleanField(
        default=True, 
        verbose_name="Активный"
    )
    created_at = models.DateTimeField(
        auto_now_add=True, 
        verbose_name="Дата создания"
    )
    
    class Meta:
        db_table = 'construct_contentitem'
        verbose_name = "Элемент контента"
        verbose_name_plural = "Элементы контента"
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['content_type']),
            models.Index(fields=['is_active']),
        ]
    
    def __str__(self):
        return f"{self.get_content_type_display()}: {self.title}"