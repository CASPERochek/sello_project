#!/usr/bin/env python
import os
import sys
import django
from pathlib import Path

# Добавляем путь к проекту
sys.path.append(str(Path(__file__).resolve().parent.parent))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sello.settings')
django.setup()

from sello_news.models import News
from django.conf import settings
import shutil

def migrate_images():
    """
    Мигрирует изображения из старых путей в новые
    """
    print("🚀 Начинаем миграцию изображений...")
    
    # Проверяем существование папок
    react_news_path = settings.REACT_NEWS_UPLOADS
    django_media_path = settings.MEDIA_ROOT / 'news'
    
    print(f"📁 React папка: {react_news_path}")
    print(f"📁 Django папка: {django_media_path}")
    
    # Создаем директории если их нет
    os.makedirs(react_news_path, exist_ok=True)
    os.makedirs(django_media_path, exist_ok=True)
    
    # Получаем все новости
    news_items = News.objects.all()
    print(f"📰 Всего новостей: {news_items.count()}")
    
    migrated = 0
    errors = 0
    
    for news in news_items:
        try:
            old_image = news.image
            
            if old_image:
                print(f"\n🔍 Обрабатываем новость {news.id}: {news.title}")
                print(f"   Старое изображение: {old_image}")
                
                # Проверяем, что old_image - это строка (имя файла)
                if isinstance(old_image, str) and old_image.strip():
                    # Ищем файл в разных местах
                    possible_paths = [
                        settings.MEDIA_ROOT / 'news' / old_image,
                        settings.MEDIA_ROOT / old_image,
                        Path(old_image) if os.path.exists(old_image) else None
                    ]
                    
                    source_file = None
                    for path in possible_paths:
                        if path and os.path.exists(path):
                            source_file = path
                            break
                    
                    if source_file:
                        # Копируем в React папку
                        dest_file = react_news_path / old_image
                        
                        # Если файл уже существует в React папке, пропускаем
                        if not os.path.exists(dest_file):
                            shutil.copy2(source_file, dest_file)
                            print(f"   ✅ Скопировано в React: {dest_file}")
                        
                        # Обновляем запись в базе данных (если нужно)
                        if news.image != old_image:
                            news.image = old_image
                            news.save()
                            print(f"   📝 Обновлено в базе данных")
                        
                        migrated += 1
                    else:
                        print(f"   ⚠️ Файл не найден: {old_image}")
                        errors += 1
                else:
                    print(f"   ℹ️ Нет изображения или некорректное значение")
            else:
                print(f"\nℹ️ Новость {news.id} без изображения")
                
        except Exception as e:
            print(f"❌ Ошибка при обработке новости {news.id}: {str(e)}")
            errors += 1
    
    print(f"\n{'='*50}")
    print(f"✅ Миграция завершена!")
    print(f"   Успешно: {migrated}")
    print(f"   Ошибок: {errors}")
    print(f"   Файлов в React папке: {len(os.listdir(react_news_path))}")
    print(f"   Файлов в Django папке: {len(os.listdir(django_media_path))}")

def cleanup_orphaned_files():
    """
    Удаляет файлы, на которые нет ссылок в базе данных
    """
    print("\n🧹 Очистка orphaned файлов...")
    
    react_news_path = settings.REACT_NEWS_UPLOADS
    django_media_path = settings.MEDIA_ROOT / 'news'
    
    # Получаем все используемые имена файлов из базы данных
    used_files = set(News.objects.exclude(image__isnull=True).exclude(image='').values_list('image', flat=True))
    print(f"📊 Используемых файлов в базе: {len(used_files)}")
    
    # Проверяем React папку
    react_files = os.listdir(react_news_path) if os.path.exists(react_news_path) else []
    orphaned_react = [f for f in react_files if f not in used_files]
    
    print(f"📁 Файлов в React папке: {len(react_files)}")
    print(f"🗑️ Orphaned файлов в React: {len(orphaned_react)}")
    
    # Удаляем orphaned файлы
    for file in orphaned_react:
        file_path = react_news_path / file
        try:
            os.remove(file_path)
            print(f"   Удален: {file}")
        except Exception as e:
            print(f"   Ошибка удаления {file}: {str(e)}")
    
    # То же самое для Django папки
    django_files = os.listdir(django_media_path) if os.path.exists(django_media_path) else []
    orphaned_django = [f for f in django_files if f not in used_files]
    
    print(f"\n📁 Файлов в Django папке: {len(django_files)}")
    print(f"🗑️ Orphaned файлов в Django: {len(orphaned_django)}")
    
    for file in orphaned_django:
        file_path = django_media_path / file
        try:
            os.remove(file_path)
            print(f"   Удален: {file}")
        except Exception as e:
            print(f"   Ошибка удаления {file}: {str(e)}")

if __name__ == '__main__':
    migrate_images()
    cleanup_orphaned_files()