# tree/serializers.py
from rest_framework import serializers
from .models import Category

class CategorySerializer(serializers.ModelSerializer):
    icon_code = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'main_category', 'subcategory', 'icon_code']

    def get_icon_code(self, obj):
        """Вычисляет код иконки на основе main_category"""
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
        category_name = obj.main_category or ""
        for name, code in mapping.items():
            if name in category_name:
                return code
        return 1  # default