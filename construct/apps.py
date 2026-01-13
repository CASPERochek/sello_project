from django.apps import AppConfig

class ConstructConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'construct'
    verbose_name = 'Конструктор'
    
    def ready(self):
        """Инициализация приложения"""
        try:
            # Импортируем сигналы, если они есть
            from . import signals
        except ImportError:
            pass