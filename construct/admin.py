from django.contrib import admin
from .models import PageDesign, PageDesignHistory, ContentItem

@admin.register(PageDesign)
class PageDesignAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'user', 'blocks_count', 'is_public', 'created_at', 'updated_at')
    list_filter = ('is_public', 'created_at', 'user', 'version')
    search_fields = ('name', 'user__username', 'metadata')
    readonly_fields = ('created_at', 'updated_at', 'blocks_count')
    fieldsets = (
        ('Основное', {
            'fields': ('name', 'user', 'is_public', 'version')
        }),
        ('Дизайн', {
            'fields': ('blocks', 'text_color', 'bg_color', 'blocks_count')
        }),
        ('Файлы', {
            'fields': ('json_file', 'thumbnail')
        }),
        ('Метаданные', {
            'fields': ('metadata',)
        }),
        ('Даты', {
            'fields': ('created_at', 'updated_at')
        }),
    )
    
    def get_queryset(self, request):
        """Оптимизация запросов"""
        return super().get_queryset(request).select_related('user')
    
    def get_readonly_fields(self, request, obj=None):
        """Динамические readonly поля"""
        readonly_fields = list(super().get_readonly_fields(request, obj))
        if obj and obj.json_file:  # Если есть файл, показываем ссылку
            self.readonly_fields = readonly_fields + ['json_file_link']
        return readonly_fields
    
    def json_file_link(self, obj):
        """Ссылка на JSON файл"""
        if obj.json_file:
            return f'<a href="{obj.json_file.url}" target="_blank">Скачать JSON</a>'
        return "Файл отсутствует"
    json_file_link.allow_tags = True
    json_file_link.short_description = "JSON файл"


@admin.register(PageDesignHistory)
class PageDesignHistoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'design', 'version', 'changed_by', 'created_at')
    list_filter = ('created_at', 'version')
    search_fields = ('design__name', 'change_comment', 'changed_by__username')
    readonly_fields = ('created_at',)
    fieldsets = (
        ('Основное', {
            'fields': ('design', 'version', 'changed_by')
        }),
        ('Содержимое дизайна', {
            'fields': ('blocks', 'text_color', 'bg_color')
        }),
        ('Комментарий', {
            'fields': ('change_comment',)
        }),
        ('Дата', {
            'fields': ('created_at',)
        }),
    )
    
    def get_queryset(self, request):
        """Оптимизация запросов"""
        return super().get_queryset(request).select_related('design', 'changed_by')


@admin.register(ContentItem)
class ContentItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'content_type', 'is_active', 'created_at')
    list_filter = ('content_type', 'is_active', 'created_at')
    search_fields = ('title', 'description', 'text')
    fieldsets = (
        ('Основное', {
            'fields': ('title', 'content_type', 'is_active')
        }),
        ('Контент', {
            'fields': ('image', 'description', 'price', 'text')
        }),
        ('Дата', {
            'fields': ('created_at',)
        }),
    )
    readonly_fields = ('created_at',)
    
    def get_queryset(self, request):
        """Оптимизация запросов"""
        return super().get_queryset(request)