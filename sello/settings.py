# import os
# from pathlib import Path
# from datetime import timedelta

# # Build paths inside the project like this: BASE_DIR / 'subdir'.
# BASE_DIR = Path(__file__).resolve().parent.parent

# # SECURITY WARNING: keep the secret key used in production secret!
# SECRET_KEY = 'django-insecure-your-secret-key-here'

# # SECURITY WARNING: don't run with debug turned on in production!
# DEBUG = True

# ALLOWED_HOSTS = ['localhost', '127.0.0.1', '0.0.0.0', '192.168.1.*']

# # Application definition
# INSTALLED_APPS = [
#     'django.contrib.admin',
#     'django.contrib.auth',
#     'django.contrib.contenttypes',
#     'django.contrib.sessions',
#     'django.contrib.messages',
#     'django.contrib.staticfiles',
    
#     # Third party apps
#     'rest_framework',
#     'rest_framework_simplejwt',
#     'corsheaders',
    
#     # Local apps
#     'sello_main',
#     'sello_news',
#     'sello_tovar',
# ]

# MIDDLEWARE = [
#     'corsheaders.middleware.CorsMiddleware',
#     'django.middleware.security.SecurityMiddleware',
#     'django.contrib.sessions.middleware.SessionMiddleware',
#     'django.middleware.common.CommonMiddleware',
#     'django.middleware.csrf.CsrfViewMiddleware',
#     'django.contrib.auth.middleware.AuthenticationMiddleware',
#     'django.contrib.messages.middleware.MessageMiddleware',
#     'django.middleware.clickjacking.XFrameOptionsMiddleware',
# ]

# ROOT_URLCONF = 'sello.urls'

# TEMPLATES = [
#     {
#         'BACKEND': 'django.template.backends.django.DjangoTemplates',
#         'DIRS': [BASE_DIR / 'templates'],
#         'APP_DIRS': True,
#         'OPTIONS': {
#             'context_processors': [
#                 'django.template.context_processors.debug',
#                 'django.template.context_processors.request',
#                 'django.contrib.auth.context_processors.auth',
#                 'django.contrib.messages.context_processors.messages',
#             ],
#         },
#     },
# ]

# WSGI_APPLICATION = 'sello.wsgi.application'

# # Database
# # https://docs.djangoproject.com/en/5.0/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': 'sello_db',
#         'USER': 'sello_user',
#         'PASSWORD': 'CAxRRTKRQSPER4!',
#         'HOST': 'localhost',
#         'PORT': '5432',
#     }
# }

# # Password validation
# # https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

# AUTH_PASSWORD_VALIDATORS = [
#     {
#         'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
#     },
#     {
#         'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
#     },
#     {
#         'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
#     },
#     {
#         'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
#     },
# ]

# # Internationalization
# # https://docs.djangoproject.com/en/5.0/topics/i18n/

# LANGUAGE_CODE = 'ru-ru'
# TIME_ZONE = 'UTC'
# USE_I18N = True
# USE_TZ = True

# # Static files (CSS, JavaScript, Images)
# # https://docs.djangoproject.com/en/5.0/howto/static-files/

# STATIC_URL = '/static/'
# STATICFILES_DIRS = [
#     BASE_DIR / 'static',
# ]
# STATIC_ROOT = BASE_DIR / 'staticfiles'

# # Media files
# MEDIA_URL = '/media/'
# MEDIA_ROOT = BASE_DIR / 'media'

# # Default primary key field type
# # https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

# DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# # CORS settings
# CORS_ALLOW_ALL_ORIGINS = True  # Для разработки
# CORS_ALLOW_CREDENTIALS = True
# CORS_ALLOWED_ORIGINS = [
#     "http://localhost:3000",
#     "http://127.0.0.1:3000",
#     "http://localhost:8000",
#     "http://127.0.0.1:8000",
#     "http://localhost:8080",
#     "http://127.0.0.1:8080",
#     "http://localhost:5173",  # Vite порт
#     "http://127.0.0.1:5173",  # Vite порт
# ]
# CORS_ALLOW_METHODS = [
#     'DELETE',
#     'GET',
#     'OPTIONS',
#     'PATCH',
#     'POST',
#     'PUT',
# ]
# CORS_ALLOW_HEADERS = [
#     'accept',
#     'accept-encoding',
#     'authorization',
#     'content-type',
#     'dnt',
#     'origin',
#     'user-agent',
#     'x-csrftoken',
#     'x-requested-with',
# ]

# # REST Framework settings
# REST_FRAMEWORK = {
#     'DEFAULT_AUTHENTICATION_CLASSES': (
#         'rest_framework_simplejwt.authentication.JWTAuthentication',
#         'rest_framework.authentication.SessionAuthentication',
#         'rest_framework.authentication.BasicAuthentication',
#     ),
#     'DEFAULT_PERMISSION_CLASSES': (
#         'rest_framework.permissions.AllowAny',  # Разрешить всем, кроме особых случаев
#     ),
#     'DEFAULT_PARSER_CLASSES': (
#         'rest_framework.parsers.JSONParser',
#         'rest_framework.parsers.FormParser',
#         'rest_framework.parsers.MultiPartParser',
#     ),
#     'DEFAULT_RENDERER_CLASSES': (
#         'rest_framework.renderers.JSONRenderer',
#         'rest_framework.renderers.BrowsableAPIRenderer',
#     ),
#     'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema',
#     'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
#     'PAGE_SIZE': 10,
# }

# # JWT settings
# SIMPLE_JWT = {
#     'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
#     'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
#     'ROTATE_REFRESH_TOKENS': True,
#     'BLACKLIST_AFTER_ROTATION': True,
#     'UPDATE_LAST_LOGIN': False,
#     'ALGORITHM': 'HS256',
#     'SIGNING_KEY': SECRET_KEY,
#     'VERIFYING_KEY': None,
#     'AUDIENCE': None,
#     'ISSUER': None,
#     'JWK_URL': None,
#     'LEEWAY': 0,
#     'AUTH_HEADER_TYPES': ('Bearer',),
#     'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
#     'USER_ID_FIELD': 'id',
#     'USER_ID_CLAIM': 'user_id',
#     'USER_AUTHENTICATION_RULE': 'rest_framework_simplejwt.authentication.default_user_authentication_rule',
#     'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
#     'TOKEN_TYPE_CLAIM': 'token_type',
#     'TOKEN_USER_CLASS': 'rest_framework_simplejwt.models.TokenUser',
#     'JTI_CLAIM': 'jti',
#     'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
#     'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
#     'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
# }

# # Custom user model
# AUTH_USER_MODEL = 'sello_main.CustomUser'

# # File upload settings
# FILE_UPLOAD_MAX_MEMORY_SIZE = 10 * 1024 * 1024  # 10MB
# DATA_UPLOAD_MAX_MEMORY_SIZE = 10 * 1024 * 1024  # 10MB
# FILE_UPLOAD_PERMISSIONS = 0o644
# FILE_UPLOAD_HANDLERS = [
#     'django.core.files.uploadhandler.MemoryFileUploadHandler',
#     'django.core.files.uploadhandler.TemporaryFileUploadHandler',
# ]

# # Fix for file name encoding issues
# DEFAULT_FILE_STORAGE = 'django.core.files.storage.FileSystemStorage'

# # Set encoding for file names
# import sys
# if sys.platform == 'win32':
#     # Windows specific settings
#     import locale
#     locale.setlocale(locale.LC_ALL, 'ru_RU.UTF-8')
    
# # Logging configuration
# LOGGING = {
#     'version': 1,
#     'disable_existing_loggers': False,
#     'formatters': {
#         'verbose': {
#             'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
#             'style': '{',
#         },
#         'simple': {
#             'format': '{levelname} {message}',
#             'style': '{',
#         },
#     },
#     'handlers': {
#         'console': {
#             'class': 'logging.StreamHandler',
#             'formatter': 'simple',
#         },
#         'file': {
#             'class': 'logging.FileHandler',
#             'filename': os.path.join(BASE_DIR, 'debug.log'),
#             'formatter': 'verbose',
#         },
#     },
#     'loggers': {
#         'django': {
#             'handlers': ['console', 'file'],
#             'level': 'INFO',
#             'propagate': True,
#         },
#         'sello_news': {
#             'handlers': ['console', 'file'],
#             'level': 'DEBUG',
#             'propagate': True,
#         },
#     },
# }

# # Security settings for development
# if DEBUG:
#     # Для разработки - более мягкие настройки безопасности
#     SECURE_SSL_REDIRECT = False
#     SESSION_COOKIE_SECURE = False
#     CSRF_COOKIE_SECURE = False
#     SECURE_BROWSER_XSS_FILTER = False
#     SECURE_CONTENT_TYPE_NOSNIFF = False
#     X_FRAME_OPTIONS = 'SAMEORIGIN'

# # Create media directories if they don't exist
# os.makedirs(MEDIA_ROOT, exist_ok=True)
# os.makedirs(MEDIA_ROOT / 'news', exist_ok=True)
# os.makedirs(STATIC_ROOT, exist_ok=True)

# print(f"✅ Настройки загружены:")
# print(f"   BASE_DIR: {BASE_DIR}")
# print(f"   MEDIA_ROOT: {MEDIA_ROOT}")
# print(f"   STATIC_ROOT: {STATIC_ROOT}")
# print(f"   DEBUG: {DEBUG}")



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

# Убедимся что папки существуют
def create_media_dirs():
    """Создает необходимые медиа директории"""
    directories = [
        MEDIA_ROOT,
        os.path.join(MEDIA_ROOT, 'news'),
        os.path.join(MEDIA_ROOT, 'news', 'uploads'),
        os.path.join(MEDIA_ROOT, 'temp'),
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

# REST Framework settings
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.AllowAny',
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

# File upload settings - УВЕЛИЧИМ ЛИМИТЫ
FILE_UPLOAD_MAX_MEMORY_SIZE = 50 * 1024 * 1024  # 50MB
DATA_UPLOAD_MAX_MEMORY_SIZE = 50 * 1024 * 1024  # 50MB
FILE_UPLOAD_PERMISSIONS = 0o644
FILE_UPLOAD_HANDLERS = [
    'django.core.files.uploadhandler.MemoryFileUploadHandler',
    'django.core.files.uploadhandler.TemporaryFileUploadHandler',
]

# Fix for file name encoding issues
DEFAULT_FILE_STORAGE = 'django.core.files.storage.FileSystemStorage'

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
    },
}

# Security settings for development
if DEBUG:
    SECURE_SSL_REDIRECT = False
    SESSION_COOKIE_SECURE = False
    CSRF_COOKIE_SECURE = False
    SECURE_BROWSER_XSS_FILTER = False
    SECURE_CONTENT_TYPE_NOSNIFF = False
    X_FRAME_OPTIONS = 'SAMEORIGIN'

# =============== ВЫВОД ИНФОРМАЦИИ ПРИ ЗАПУСКЕ ===============
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
print("="*60)

# Проверяем доступность медиа папки
if os.path.exists(MEDIA_ROOT):
    print(f"✅ MEDIA_ROOT существует: {MEDIA_ROOT}")
    news_dir = os.path.join(MEDIA_ROOT, 'news')
    if os.path.exists(news_dir):
        files = os.listdir(news_dir)
        print(f"✅ Папка news существует, файлов: {len(files)}")
        if files:
            print(f"   Файлы: {', '.join(files[:5])}{'...' if len(files) > 5 else ''}")
    else:
        print(f"⚠️ Папка news не существует: {news_dir}")
else:
    print(f"❌ MEDIA_ROOT не существует: {MEDIA_ROOT}")

print("="*60 + "\n")
