import os
from django.conf import settings

def check_media_structure():
    media_root = settings.MEDIA_ROOT
    news_media_dir = os.path.join(media_root, 'news')
    
    print(f"📁 MEDIA_ROOT: {media_root}")
    print(f"📁 Путь к новостям: {news_media_dir}")
    
    if not os.path.exists(media_root):
        print("❌ MEDIA_ROOT не существует! Создаю...")
        os.makedirs(media_root)
    
    if not os.path.exists(news_media_dir):
        print("❌ Папка news не существует! Создаю...")
        os.makedirs(news_media_dir)
    
    # Проверяем права доступа
    if os.access(news_media_dir, os.W_OK):
        print("✅ Права на запись: OK")
    else:
        print("❌ Нет прав на запись в папку news!")
    
    # Показываем существующие файлы
    if os.path.exists(news_media_dir):
        files = os.listdir(news_media_dir)
        print(f"📄 Файлы в папке news: {files}")

if __name__ == "__main__":
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sello.settings')
    import django
    django.setup()
    
    check_media_structure()