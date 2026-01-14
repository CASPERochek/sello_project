from django.db import migrations

class Migration(migrations.Migration):
    dependencies = [
        ('construct', '0001_initial'),  # ← укажите последнюю миграцию
    ]

    operations = [
        migrations.RunSQL(
            "ALTER TABLE construct_pagedesign_history RENAME COLUMN changed_by TO changed_by_id;",
            reverse_sql="ALTER TABLE construct_pagedesign_history RENAME COLUMN changed_by_id TO changed_by;"
        ),
    ]