import os
from pathlib import Path
from datetime import timedelta

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-your-secret-key-here'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1', '0.0.0.0', '192.168.1.*', '192.168.1.103']

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third party apps
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    
    # Local apps
    'sello_main',
    'sello_news',
    'sello_tovar',
    'construct',
    'tree',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'sello.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'sello.wsgi.application'

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'sello_db',
        'USER': 'sello_user',
        'PASSWORD': 'CAxRRTKRQSPER4!',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'ru-ru'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    BASE_DIR / 'static',
]
STATIC_ROOT = BASE_DIR / 'staticfiles'

# =============== ВАЖНО: Медиа файлы ===============
# Абсолютный путь к медиа файлам
MEDIA_URL = '/media/'  # URL префикс для медиа файлов
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')  # Абсолютный путь на диске

# =============== НАСТРОЙКИ КОНСТРУКТОРА ===============
CONSTRUCTOR_SETTINGS = {
    'MAX_BLOCKS_PER_DESIGN': 50,
    'MAX_BLOCKS_PER_PAGE': 20,
    'ALLOWED_IMAGE_EXTENSIONS': ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'],
    'MAX_IMAGE_SIZE_MB': 5,
    'DEFAULT_TEXT_COLOR': '#000000',
    'DEFAULT_BG_COLOR': '#ffffff',
    'DEFAULT_VERSION': '1.0',
    'JSON_INDENT': 2,
    'THUMBNAIL_SIZE': (300, 200),
}

# Дополняем create_media_dirs() для конструктора
def create_media_dirs():
    """Создает необходимые медиа директории"""
    directories = [
        MEDIA_ROOT,
        os.path.join(MEDIA_ROOT, 'news'),
        os.path.join(MEDIA_ROOT, 'news', 'uploads'),
        os.path.join(MEDIA_ROOT, 'temp'),
        os.path.join(MEDIA_ROOT, 'brands'),
        os.path.join(MEDIA_ROOT, 'brands', 'logos'),
        # Добавляем директории для конструктора
        os.path.join(MEDIA_ROOT, 'constructor'),
        os.path.join(MEDIA_ROOT, 'constructor_json'),
        os.path.join(MEDIA_ROOT, 'constructor_thumbnails'),
        os.path.join(MEDIA_ROOT, 'constructor_content'),
        os.path.join(MEDIA_ROOT, 'constructor', 'templates'),
        os.path.join(MEDIA_ROOT, 'constructor', 'exports'),
    ]
    
    for directory in directories:
        os.makedirs(directory, exist_ok=True)
        print(f"📁 Создана/проверена директория: {directory}")

# Вызываем при загрузке настроек
create_media_dirs()
# ==================================================

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# CORS settings - РАСШИРЕННЫЕ НАСТРОЙКИ
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://localhost:5174",    # Дополнительный порт для разработки
    "http://127.0.0.1:5174",
]

CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
    'x-csrf-token',
    'x-xsrf-token',
]

# Обновляем REST_FRAMEWORK настройки для конструктора
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',  # Меняем для конструктора
    ),
    'DEFAULT_PARSER_CLASSES': (
        'rest_framework.parsers.JSONParser',
        'rest_framework.parsers.FormParser',
        'rest_framework.parsers.MultiPartParser',
        'rest_framework.parsers.FileUploadParser',
    ),
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ),
    'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema',
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 100,
    'DEFAULT_FILTER_BACKENDS': [
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ],
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle'
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/day',
        'user': '1000/day'
    },
    'DEFAULT_METADATA_CLASS': 'rest_framework.metadata.SimpleMetadata',
    'EXCEPTION_HANDLER': 'rest_framework.views.exception_handler',
}

# JWT settings
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'UPDATE_LAST_LOGIN': False,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,
    'JWK_URL': None,
    'LEEWAY': 0,
    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'USER_AUTHENTICATION_RULE': 'rest_framework_simplejwt.authentication.default_user_authentication_rule',
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
    'TOKEN_USER_CLASS': 'rest_framework_simplejwt.models.TokenUser',
    'JTI_CLAIM': 'jti',
    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
}

# Custom user model
AUTH_USER_MODEL = 'sello_main.CustomUser'

# Обновляем FILE_UPLOAD настройки для конструктора
FILE_UPLOAD_MAX_MEMORY_SIZE = 100 * 1024 * 1024  # 100MB для конструктора
DATA_UPLOAD_MAX_MEMORY_SIZE = 100 * 1024 * 1024  # 100MB
DATA_UPLOAD_MAX_NUMBER_FIELDS = 5000  # Для множества блоков
FILE_UPLOAD_PERMISSIONS = 0o644
FILE_UPLOAD_HANDLERS = [
    'django.core.files.uploadhandler.MemoryFileUploadHandler',
    'django.core.files.uploadhandler.TemporaryFileUploadHandler',
]

# Fix for file name encoding issues
DEFAULT_FILE_STORAGE = 'django.core.files.storage.FileSystemStorage'

# Настройки для работы с JSON
JSON_OPTIONS = {
    'ensure_ascii': False,
    'indent': 2,
    'separators': (',', ':'),
    'sort_keys': False,
}

# Настройки для файлов конструктора
CONSTRUCTOR_FILE_SETTINGS = {
    'JSON_UPLOAD_PATH': 'constructor_json/',
    'THUMBNAIL_UPLOAD_PATH': 'constructor_thumbnails/',
    'CONTENT_UPLOAD_PATH': 'constructor_content/',
    'TEMPLATE_UPLOAD_PATH': 'constructor/templates/',
    'EXPORT_UPLOAD_PATH': 'constructor/exports/',
    'MAX_JSON_FILE_SIZE': 10 * 1024 * 1024,  # 10MB
    'MAX_THUMBNAIL_SIZE': 2 * 1024 * 1024,  # 2MB
}

# Настройки кэширования для конструктора (опционально)
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
        'LOCATION': 'unique-snowflake',
        'TIMEOUT': 300,  # 5 минут
        'OPTIONS': {
            'MAX_ENTRIES': 1000
        }
    },
    'constructor_cache': {
        'BACKEND': 'django.core.cache.backends.filebased.FileBasedCache',
        'LOCATION': os.path.join(BASE_DIR, 'cache', 'constructor'),
        'TIMEOUT': 600,  # 10 минут
        'OPTIONS': {
            'MAX_ENTRIES': 100
        }
    }
}

# Настройки сессии для конструктора
SESSION_ENGINE = 'django.contrib.sessions.backends.db'
SESSION_COOKIE_AGE = 1209600  # 2 недели
SESSION_COOKIE_NAME = 'constructor_sessionid'
SESSION_COOKIE_HTTPONLY = True
SESSION_SAVE_EVERY_REQUEST = True

# Настройки безопасности для конструктора
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'
CSRF_COOKIE_SECURE = not DEBUG  # True в production
SESSION_COOKIE_SECURE = not DEBUG  # True в production

# Logging configuration - УЛУЧШЕННОЕ ЛОГИРОВАНИЕ
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
            'style': '{',
        },
        'simple': {
            'format': '{levelname} {asctime} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'simple',
        },
        'file': {
            'class': 'logging.FileHandler',
            'filename': os.path.join(BASE_DIR, 'debug.log'),
            'formatter': 'verbose',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console', 'file'],
            'level': 'INFO',
            'propagate': True,
        },
        'django.request': {
            'handlers': ['console', 'file'],
            'level': 'DEBUG',
            'propagate': False,
        },
        'sello_news': {
            'handlers': ['console', 'file'],
            'level': 'DEBUG',
            'propagate': True,
        },
        'sello_news.views': {
            'handlers': ['console', 'file'],
            'level': 'DEBUG',
            'propagate': False,
        },
        'sello_news.serializers': {
            'handlers': ['console', 'file'],
            'level': 'DEBUG',
            'propagate': False,
        },
        # Добавляем логирование для конструктора
        'construct': {
            'handlers': ['console', 'file'],
            'level': 'DEBUG',
            'propagate': True,
        },
        'construct.views': {
            'handlers': ['console', 'file'],
            'level': 'INFO',
            'propagate': False,
        },
        'construct.serializers': {
            'handlers': ['console', 'file'],
            'level': 'DEBUG',
            'propagate': False,
        },
        'construct.models': {
            'handlers': ['console', 'file'],
            'level': 'INFO',
            'propagate': False,
        },
    },
}

# Email настройки для конструктора (опционально)
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend' if DEBUG else 'django.core.mail.backends.smtp.EmailBackend'
DEFAULT_FROM_EMAIL = 'constructor@example.com'
EMAIL_SUBJECT_PREFIX = '[Constructor] '

# Security settings for development
if DEBUG:
    SECURE_SSL_REDIRECT = False
    SESSION_COOKIE_SECURE = False
    CSRF_COOKIE_SECURE = False
    SECURE_BROWSER_XSS_FILTER = False
    SECURE_CONTENT_TYPE_NOSNIFF = False
    X_FRAME_OPTIONS = 'SAMEORIGIN'

# =============== ОБНОВЛЕННЫЙ ВЫВОД ИНФОРМАЦИИ ===============
print("\n" + "="*60)
print("🚀 НАСТРОЙКИ DJANGO ПРОЕКТА SELLO")
print("="*60)
print(f"📁 BASE_DIR: {BASE_DIR}")
print(f"📁 MEDIA_ROOT: {MEDIA_ROOT}")
print(f"🌐 MEDIA_URL: {MEDIA_URL}")
print(f"📁 STATIC_ROOT: {STATIC_ROOT}")
print(f"🔧 DEBUG: {DEBUG}")
print(f"🌐 ALLOWED_HOSTS: {ALLOWED_HOSTS}")
print(f"🔗 CORS_ALLOWED_ORIGINS: {CORS_ALLOWED_ORIGINS}")

# Проверяем доступность медиа папок конструктора
constructor_dirs = [
    os.path.join(MEDIA_ROOT, 'constructor_json'),
    os.path.join(MEDIA_ROOT, 'constructor_thumbnails'),
    os.path.join(MEDIA_ROOT, 'constructor_content'),
]

print("\n🔧 НАСТРОЙКИ КОНСТРУКТОРА:")
print("-"*40)
for dir_path in constructor_dirs:
    if os.path.exists(dir_path):
        print(f"✅ {os.path.basename(dir_path)}: {dir_path}")
    else:
        print(f"❌ {os.path.basename(dir_path)} не существует")

print(f"\n📊 Макс. размер файла: {FILE_UPLOAD_MAX_MEMORY_SIZE / (1024*1024)}MB")
print(f"📁 Папка JSON файлов: {CONSTRUCTOR_FILE_SETTINGS['JSON_UPLOAD_PATH']}")

# Проверяем таблицы конструктора в БД (если доступно)
try:
    from django.db import connection
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name LIKE 'construct_%'
        """)
        tables = cursor.fetchall()
        if tables:
            print(f"\n📊 Таблицы конструктора в БД:")
            for table in tables:
                print(f"   • {table[0]}")
        else:
            print("\n⚠️ Таблицы конструктора не найдены в БД")
except Exception as e:
    print(f"\n⚠️ Не удалось проверить БД: {e}")

print("="*60 + "\n")