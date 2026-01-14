# from django.db import models
# from django.utils.translation import gettext_lazy as _

# class CategoryTree(models.Model):
#     """
#     Модель для дерева категорий
#     Используем существующую таблицу sello_tovar_category
#     Но под другим именем класса чтобы не конфликтовать
#     """
#     MAIN_CATEGORY_ICONS = {
#         1: 'ground',
#         2: 'inventory',
#         3: 'equipment',
#         4: 'clothes',
#         5: 'seedlings',
#         6: 'seeds',
#         7: 'agriculture_technic',
#         8: 'plant_protection',
#         9: 'fertilizer',
#         10: 'farm_product'
#     }
    
#     # Поля из существующей таблицы
#     id = models.BigAutoField(primary_key=True)
#     main_category = models.CharField(
#         max_length=100,
#         null=True,
#         blank=True,
#         verbose_name=_('Главная категория'),
#         help_text=_('Название главной категории или код иконки')
#     )
#     subcategory = models.CharField(
#         max_length=200,
#         null=True,
#         blank=True,
#         verbose_name=_('Подкатегория'),
#         help_text=_('Название подкатегории')
#     )
    
#     # Дополнительные поля которые мы добавим
#     parent = models.ForeignKey(
#         'self',
#         on_delete=models.CASCADE,
#         related_name='children',
#         null=True,
#         blank=True,
#         db_column='parent_id',  # Используем существующее имя столбца
#         verbose_name=_('Родительская категория'),
#         help_text=_('Выберите родительскую категорию')
#     )
#     created_at = models.DateTimeField(
#         auto_now_add=True,
#         db_column='created_at',
#         verbose_name=_('Дата создания')
#     )
#     updated_at = models.DateTimeField(
#         auto_now=True,
#         db_column='updated_at',
#         verbose_name=_('Дата обновления')
#     )
    
#     class Meta:
#         db_table = 'sello_tovar_category'
#         managed = True  # Django будет управлять миграциями
#         verbose_name = _('Категория дерева')
#         verbose_name_plural = _('Категории дерева')
#         ordering = ['main_category', 'subcategory']
    
#     def __str__(self):
#         return self.name
    
#     @property
#     def name(self):
#         """Возвращает название категории"""
#         if self.subcategory:
#             return self.subcategory
#         return self.main_category or f"Категория {self.id}"
    
#     @property
#     def is_main_category(self):
#         """Проверяет, является ли категория главной"""
#         return self.parent is None and bool(self.main_category)
    
#     @property
#     def is_subcategory(self):
#         """Проверяет, является ли категория подкатегорией"""
#         return self.parent is not None
    
#     @property
#     def icon_code(self):
#         """Получает код иконки из main_category"""
#         if not self.is_main_category:
#             return None
        
#         # Если main_category содержит число - это код иконки
#         if self.main_category and self.main_category.isdigit():
#             try:
#                 code = int(self.main_category)
#                 if 1 <= code <= 10:
#                     return code
#             except (ValueError, TypeError):
#                 pass
        
#         # Определяем по названию
#         icon_mapping = {
#             'Грунты и субстраты': 1,
#             'Инвентарь и аксессуары': 2,
#             'Оборудование для хозяйства': 3,
#             'Саженцы и Луковицы': 4,
#             'Семена': 5,
#             'Одежда и Обувь': 6,
#             'Сельхозтехника': 7,
#             'Средства защиты растений': 8,
#             'Удобрения': 9,
#             'Фермерские продукты': 10,
#         }
        
#         for name, code in icon_mapping.items():
#             if self.main_category and name in self.main_category:
#                 return code
        
#         return None
    
#     @property
#     def icon_name(self):
#         """Получает название иконки"""
#         code = self.icon_code
#         if code and code in self.MAIN_CATEGORY_ICONS:
#             return self.MAIN_CATEGORY_ICONS[code]
#         return None
    
#     def get_subcategories(self):
#         """Получает все подкатегории"""
#         return self.children.all()
    
#     def save(self, *args, **kwargs):
#         # Автоматически заполняем поля при сохранении
#         if not self.parent and not self.main_category and self.subcategory:
#             # Если это главная категория без main_category
#             self.main_category = self.subcategory
#             self.subcategory = None
#         elif self.parent and self.main_category:
#             # Если это подкатегория, но указан main_category
#             self.main_category = None
        
#         super().save(*args, **kwargs)




# tree/models.py
from django.db import models
from django.utils.translation import gettext_lazy as _

class Category(models.Model):
    main_category = models.CharField(max_length=100, verbose_name=_("Главная категория"))
    subcategory = models.CharField(max_length=200, verbose_name=_("Подкатегория"))

    class Meta:
        db_table = 'sello_tovar_category'
        managed = False  # ← КЛЮЧЕВОЕ: не управлять таблицей!
        verbose_name = _("Категория")
        verbose_name_plural = _("Категории")

    def __str__(self):
        return f"{self.main_category} → {self.subcategory}"

    @property
    def name(self):
        return self.subcategory

    @property
    def is_main_category(self):
        return False  # Все записи — подкатегории

    @property
    def icon_code(self):
        mapping = {
            "Грунты и Субстраты": 1,
            "Инвентарь и Аксессуары": 2,
            "Сельхозтехника и Оборудование": 3,
            "Саженцы и Луковицы": 4,
            "Семена": 5,
            "Сельская Одежда и Обувь": 6,
            "Сельхозтехника и Оборудование": 7,
            "Удобрения и Средства защиты": 8,
            "Удобрения и Средства защиты": 9,
            "Фермерские Продукты": 10,
        }
        for key, code in mapping.items():
            if key in self.main_category:
                return code
        return 1  # default