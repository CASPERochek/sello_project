import os
import uuid
from django.conf import settings
from django.utils import timezone
from django.utils.text import slugify
import shutil

def save_file_to_react(file, subfolder='news'):
    """
    Сохраняет файл в папку React и возвращает имя файла
    """
    try:
        # Получаем расширение файла
        file_ext = os.path.splitext(file.name)[1].lower()
        
        # Генерируем уникальное имя файла
        timestamp = timezone.now().strftime("%Y%m%d_%H%M%S")
        unique_id = str(uuid.uuid4())[:8]
        original_name = slugify(os.path.splitext(file.name)[0])
        
        safe_filename = f"{original_name}_{timestamp}_{unique_id}{file_ext}"
        
        # Определяем пути
        react_news_path = settings.REACT_NEWS_UPLOADS
        django_media_path = settings.MEDIA_ROOT / 'news'
        
        # Создаем директории если их нет
        os.makedirs(react_news_path, exist_ok=True)
        os.makedirs(django_media_path, exist_ok=True)
        
        # Пути для сохранения
        react_file_path = react_news_path / safe_filename
        django_file_path = django_media_path / safe_filename
        
        # Сохраняем файл в React папку
        with open(react_file_path, 'wb+') as destination:
            for chunk in file.chunks():
                destination.write(chunk)
        
        # Копируем в Django медиа для резерва
        shutil.copy2(react_file_path, django_file_path)
        
        print(f"✅ Файл сохранен:")
        print(f"   React: {react_file_path}")
        print(f"   Django: {django_file_path}")
        print(f"   Размер: {os.path.getsize(react_file_path)} байт")
        
        return {
            'success': True,
            'filename': safe_filename,
            'react_path': str(react_file_path),
            'django_path': str(django_file_path),
            'url': f'/uploads/news/{safe_filename}',
            'size': os.path.getsize(react_file_path)
        }
        
    except Exception as e:
        print(f"❌ Ошибка сохранения файла: {str(e)}")
        return {
            'success': False,
            'error': str(e)
        }

def delete_file_from_react(filename, subfolder='news'):
    """
    Удаляет файл из папки React
    """
    try:
        react_news_path = settings.REACT_NEWS_UPLOADS
        django_media_path = settings.MEDIA_ROOT / 'news'
        
        react_file_path = react_news_path / filename
        django_file_path = django_media_path / filename
        
        deleted_files = []
        
        # Удаляем из React
        if os.path.exists(react_file_path):
            os.remove(react_file_path)
            deleted_files.append(str(react_file_path))
            print(f"🗑️ Удален из React: {react_file_path}")
        
        # Удаляем из Django медиа
        if os.path.exists(django_file_path):
            os.remove(django_file_path)
            deleted_files.append(str(django_file_path))
            print(f"🗑️ Удален из Django: {django_file_path}")
        
        return {
            'success': True,
            'deleted_files': deleted_files
        }
        
    except Exception as e:
        print(f"❌ Ошибка удаления файла: {str(e)}")
        return {
            'success': False,
            'error': str(e)
        }

def check_uploads_status():
    """
    Проверяет статус папок загрузки
    """
    react_news_path = settings.REACT_NEWS_UPLOADS
    django_media_path = settings.MEDIA_ROOT / 'news'
    
    react_exists = os.path.exists(react_news_path)
    django_exists = os.path.exists(django_media_path)
    
    react_files = []
    django_files = []
    
    if react_exists:
        try:
            react_files = os.listdir(react_news_path)
            react_files = [f for f in react_files if os.path.isfile(react_news_path / f)]
        except Exception as e:
            react_files = [f'Ошибка чтения: {str(e)}']
    
    if django_exists:
        try:
            django_files = os.listdir(django_media_path)
            django_files = [f for f in django_files if os.path.isfile(django_media_path / f)]
        except Exception as e:
            django_files = [f'Ошибка чтения: {str(e)}']
    
    return {
        'react_uploads': {
            'path': str(react_news_path),
            'exists': react_exists,
            'files': react_files,
            'files_count': len(react_files),
            'total_size': sum(os.path.getsize(react_news_path / f) for f in react_files if os.path.exists(react_news_path / f))
        },
        'django_media': {
            'path': str(django_media_path),
            'exists': django_exists,
            'files': django_files,
            'files_count': len(django_files),
            'total_size': sum(os.path.getsize(django_media_path / f) for f in django_files if os.path.exists(django_media_path / f))
        }
    }




    