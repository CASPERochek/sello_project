# final_fix.py
import os
import django
import sys

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ваш_проект.settings')
django.setup()

from django.db import connection
from django.core.management import call_command

print("1. Закрываем все соединения...")
connection.close()

print("2. Сбрасываем миграции construct...")
call_command('migrate', 'construct', 'zero', '--fake')

print("3. Удаляем файлы миграций...")
migrations_dir = 'construct/migrations'
for f in os.listdir(migrations_dir):
    if f.endswith('.py') and f != '__init__.py':
        os.remove(os.path.join(migrations_dir, f))

print("4. Создаем новые миграции...")
call_command('makemigrations', 'construct')

print("5. Применяем с --fake-initial...")
call_command('migrate', 'construct', '--fake-initial')

print("6. Проверяем...")
call_command('showmigrations', 'construct')

print("\n✅ Готово! Ошибка должна исчезнуть.")