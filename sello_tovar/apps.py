# sello_tovar/apps.py

from django.apps import AppConfig


class SelloTovarConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'sello_tovar'
    
    def ready(self):
        """Инициализация приложения"""
        try:
            # Импорт сигналов
            from . import signals
        except ImportError:
            pass