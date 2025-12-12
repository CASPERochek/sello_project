import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

import ProductsIcon from "../assets/icon/products-icon.svg";
import EditIcon from "../assets/icon/edit-icon.svg";
import PlusIcon from "../assets/icon/plus-icon.svg";
import DeleteWhiteIcon from "../assets/icon/delete-white-icon.svg";
import PlusImageIcon from "../assets/icon/plus-image-icon.svg";

const ProductsPage = () => {
  const [userName, setUserName] = useState("");
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedMainCategory, setSelectedMainCategory] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    color: "",
    price: "",
    quantity: "",
    image: null,
    description: "",
  });



  // БРЕНДЫ ИЗ БАЗЫ ДАННЫХ - ПРИМЕР ЗАПРОСОВ:

/*
// 1. Состояние для хранения брендов из БД
const [brands, setBrands] = useState([]);

// 2. Загрузка брендов при монтировании компонента
useEffect(() => {
  fetchBrands();
}, []);

// 3. Функция для загрузки брендов с бэкенда
const fetchBrands = async () => {
  try {
    const response = await fetch('/api/brands/');
    const data = await response.json();
    setBrands(data);
  } catch (error) {
    console.error('Ошибка загрузки брендов:', error);
  }
};

// 4. Пример структуры данных от бэкенда для брендов:
// [
//   {
//     "id": 1,
//     "name": "Nike",
//     "description": "Спортивная одежда и обувь"
//   },
//   {
//     "id": 2,
//     "name": "Adidas",
//     "description": "Спортивные товары"
//   },
//   {
//     "id": 3,
//     "name": "Apple",
//     "description": "Электроника"
//   },
//   {
//     "id": 4,
//     "name": "Samsung",
//     "description": "Электроника и бытовая техника"
//   },
//   {
//     "id": 5, 
//     "name": "Bosch",
//     "description": "Сельхозтехника и инструменты"
//   },
//   {
//     "id": 6,
//     "name": "John Deere",
//     "description": "Сельскохозяйственная техника"
//   }
// ]

// 5. Django views пример для API брендов:
/*
from rest_framework import viewsets
from .models import Brand
from .serializers import BrandSerializer

class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
*/

// 6. Django models пример для брендов:
/*
from django.db import models

class Brand(models.Model):
    name = models.CharField('Название бренда', max_length=100, unique=True)
    description = models.TextField('Описание бренда', blank=True)
    logo = models.ImageField('Логотип', upload_to='brands/logos/', blank=True, null=True)
    
    class Meta:
        verbose_name = 'Бренд'
        verbose_name_plural = 'Бренды'
        ordering = ['name']
    
    def __str__(self):
        return self.name
*/

// 7. Django serializers пример для брендов:
/*
from rest_framework import serializers
from .models import Brand

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['id', 'name', 'description', 'logo']
*/

// 8. Использование в форме добавления товара:
// Заменить статические option в select на:
// {brands.map(brand => (
//   <option key={brand.id} value={brand.name}>{brand.name}</option>
// ))}

// 9. Использование в форме поиска:
// Заменить статические option в select на:
// {brands.map(brand => (
//   <option key={brand.id} value={brand.name}>{brand.name}</option>
// ))}

// 10. Пример обновленного select для бренда в форме добавления:
/*
<select
  id="productBrand"
  className="form-select"
  name="brand"
  value={formData.brand}
  onChange={handleInputChange}
  required
>
  <option value="" disabled>Выберите</option>
  {brands.map(brand => (
    <option key={brand.id} value={brand.name}>{brand.name}</option>
  ))}
</select>
*/


// ВАЖНО: Пока используем статические бренды
// Когда бэкенд будет готов, раскомментируйте код выше



  // Состояния для поиска
  const [searchSelectedMainCategory, setSearchSelectedMainCategory] =
    useState("");
  const [searchCategory, setSearchCategory] = useState("");

  // Категории товаров
  const categories = {
    "Грунты и Субстраты": [
      "Кокосовый субстрат и Перлит/Вермикулит",
      "Специализированные грунты - Для кактусов",
      "Специализированные грунты - Для орхидей",
      "Специализированные грунты - Для рассады",
      "Специализированные грунты - Для томатов и перцев",
      "Торф и Кора",
      "Универсальные грунты",
    ],
    "Инвентарь и Аксессуары": [
      "Ручной инструмент - Вилы",
      "Ручной инструмент - Грабли",
      "Ручной инструмент - Лопаты",
      "Ручной инструмент - Мотыги",
      "Садовый инструмент - Садовые ножи",
      "Садовый инструмент - Сапы",
      "Садовый инструмент - Секаторы",
      "Садовый инструмент - Совки",
      "Системы хранения - Органайзеры для семян",
      "Системы хранения - Стеллажи для рассады",
      "Средства ухода - Защитные очки",
      "Средства ухода - Перчатки",
      "Средства ухода - Садовая обувь",
      "Тележки и Тачки",
    ],
    "Саженцы и Луковицы": [
      "Виноград - Столовые сорта",
      "Виноград - Технические сорта",
      "Декоративные деревья и кустарники - Лиственные",
      "Декоративные деревья и кустарники - Хвойные",
      "Луковицы и клубни - Весенние",
      "Луковицы и клубни - Летние",
      "Луковицы и клубни - Осенние",
      "Многолетние цветы",
      "Плодовые деревья - Косточковые (абрикос, вишня, слива)",
      "Плодовые деревья - Семечковые (груша, яблоня)",
      "Розы - Плетистые",
      "Розы - Почвопокровные",
      "Розы - Чайно-гибридные",
      "Ягодные кустарники - Ежевика",
      "Ягодные кустарники - Крыжовник",
      "Ягодные кустарники - Малина",
      "Ягодные кустарники - Смородина",
    ],
    Семена: [
      "Овощные культуры - Бобовые (бобы, горох, фасоль)",
      "Овощные культуры - Капустные (брокколи, капуста белокочанная, цветная)",
      "Овощные культуры - Корнеплоды (морковь, редис, свекла)",
      "Овощные культуры - Листовые и зеленные (петрушка, салат, укроп, шпинат)",
      "Овощные культуры - Паслёновые (баклажаны, перцы, томаты)",
      "Овощные культуры - Тыквенные (кабачки, огурцы, тыквы)",
      "Плодовые культуры - Фруктовые деревья (вишня, груша, яблоня)",
      "Плодовые культуры - Ягоды (клубника, малина, смородина)",
      "Семена для фермеров (опт) - Зерновые (овес, пшеница, ячмень)",
      "Семена для фермеров (опт) - Кормовые травы",
      "Семена для фермеров (опт) - Масличные (подсолнечник, рапс)",
      "Цветы - Луковичные (лилии, нарциссы, тюльпаны)",
      "Цветы - Многолетние (пионы, розы, хосты)",
      "Цветы - Однолетние (астры, бархатцы, петуния)",
      "Газонные травы и сидераты - Сидераты (горчица, люпин, фацелия)",
      "Газонные травы и сидераты - Смеси для газона",
    ],
    "Сельская Одежда и Обувь": [
      "Защитные аксессуары - Каски",
      "Защитные аксессуары - Наушники",
      "Защитные аксессуары - Перчатки рабочие",
      "Одежда в народном стиле",
      "Рабочая одежда - Брюки",
      "Рабочая одежда - Комбинезоны",
      "Рабочая одежда - Куртки",
      "Спецобувь - Ботинки рабочие",
      "Спецобувь - Сапоги резиновые",
    ],
    "Сельхозтехника и Оборудование": [
      "Малая техника для сада и огорода - Бензопилы и электропилы",
      "Малая техника для сада и огорода - Газонокосилки и триммеры",
      "Малая техника для сада и огорода - Мотоблоки и культиваторы",
      "Малая техника для сада и огорода - Садовые пылесосы и воздуходувки",
      "Оборудование для хранения и переработки - Измельчители",
      "Оборудование для хранения и переработки - Силосы",
      "Оборудование для хранения и переработки - Сушилки для зерна",
      "Системы полива - Капельный полив",
      "Системы полива - Таймеры",
      "Системы полива - Шланги, разбрызгиватели",
      "Техника для фермеров - Комбайны",
      "Техника для фермеров - Опрыскиватели",
      "Техника для фермеров - Сеялки",
      "Техника для фермеров - Тракторы и навесное оборудование",
      "Теплицы и Парники - Каркасы",
      "Теплицы и Парники - Пленка",
      "Теплицы и Парники - Поликарбонат",
    ],
    "Удобрения и Средства защиты": [
      "Средства защиты растений (СЗР) - Гербициды (от сорняков)",
      "Средства защиты растений (СЗР) - Инсектициды (от вредителей)",
      "Средства защиты растений (СЗР) - Протравители семян",
      "Средства защиты растений (СЗР) - Фунгициды (от болезней)",
      "Стимуляторы роста и Биопрепараты - Адаптогены",
      "Стимуляторы роста и Биопрепараты - Укоренители",
      "Стимуляторы роста и Биопрепараты - ЭМ-препараты",
      "Удобрения - Жидкие и водорастворимые удобрения",
      "Удобрения - Минеральные - Азотные",
      "Удобрения - Минеральные - Калийные",
      "Удобрения - Минеральные - Комплексные (NPK)",
      "Удобрения - Минеральные - Фосфорные",
      "Удобрения - Микроудобрения",
      "Удобрения - Органические (биогумус, компост, навоз)",
    ],
    "Фермерские Продукты": [
      "Бакалея - Варенье",
      "Бакалея - Консервация",
      "Бакалея - Крупы",
      "Бакалея - Мёд",
      "Бакалея - Мука",
      "Молочная продукция - Молоко",
      "Молочная продукция - Сметана",
      "Молочная продукция - Сыр",
      "Молочная продукция - Творог",
      "Мясо и птица - Баранина",
      "Мясо и птица - Говядина",
      "Мясо и птица - Курица",
      "Мясо и птица - Свинина",
      "Свежие овощи и фрукты",
      "Эко-продукты и Органик",
    ],
  };


// КАТЕГОРИИ ИЗ БАЗЫ ДАННЫХ - ПРИМЕР ЗАПРОСОВ:

/*
// 1. Состояние для хранения категорий из БД
const [categories, setCategories] = useState({});

// 2. Загрузка категорий при монтировании компонента
useEffect(() => {
  fetchCategories();
}, []);

// 3. Функция для загрузки категорий с бэкенда
const fetchCategories = async () => {
  try {
    const response = await fetch('/api/categories/');
    const data = await response.json();
    
    // Преобразуем данные из БД в нужный формат
    const formattedCategories = {};
    data.forEach(category => {
      if (!formattedCategories[category.main_category]) {
        formattedCategories[category.main_category] = [];
      }
      formattedCategories[category.main_category].push(category.subcategory);
    });
    
    setCategories(formattedCategories);
  } catch (error) {
    console.error('Ошибка загрузки категорий:', error);
  }
};

// 4. Пример структуры данных от бэкенда (Django + PostgreSQL):
// [
//   {
//     "id": 1,
//     "main_category": "Грунты и Субстраты",
//     "subcategory": "Кокосовый субстрат и Перлит/Вермикулит"
//   },
//   {
//     "id": 2,
//     "main_category": "Грунты и Субстраты", 
//     "subcategory": "Специализированные грунты - Для кактусов"
//   },
//   {
//     "id": 3,
//     "main_category": "Инвентарь и Аксессуары",
//     "subcategory": "Ручной инструмент - Вилы"
//   }
// ]

// 5. Django views пример для API:
/*
from rest_framework import viewsets
from .models import Category
from .serializers import CategorySerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
*/

// 6. Django models пример:
/*
from django.db import models

class Category(models.Model):
    main_category = models.CharField('Основная категория', max_length=100)
    subcategory = models.CharField('Подкатегория', max_length=200)
    
    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'
    
    def __str__(self):
        return f"{self.main_category} - {self.subcategory}"
*/

// 7. Django serializers пример:
/*
from rest_framework import serializers
from .models import Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'main_category', 'subcategory']
*/

// 8. Замена статических категорий на динамические:
// Вместо статического объекта categories используем состояние categories
// Все остальное работает так же - структура данных идентична


// ВАЖНО: Пока используем статические категории, закомментированные выше
// Когда бэкенд будет готов, раскомментируйте код выше и удалите статический объект categories



  // Состояние для хранения списка товаров
  const [productsList, setProductsList] = useState([]);

  // Обработчики изменений формы
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    }
  };

  // Обработчик отправки формы (добавление/редактирование)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingProduct) {
      // Редактирование
      setProductsList(
        productsList.map((product) =>
          product.id === editingProduct.id
            ? { ...product, ...formData }
            : product
        )
      );
      setEditingProduct(null);
    } else {
      // Добавление
      const newProduct = {
        id: Date.now(),
        ...formData,
        date: new Date().toLocaleDateString(),
      };
      setProductsList([...productsList, newProduct]);
    }

    // Очистка формы
    setFormData({
      name: "",
      brand: "",
      category: "",
      color: "",
      price: "",
      quantity: "",
      image: null,
      description: "",
    });
    setSelectedMainCategory("");
    setIsAddingProduct(false);
  };

  // Обработчик удаления товара
  const handleDeleteProduct = (id) => {
    setProductsList(productsList.filter((product) => product.id !== id));
    setEditingProduct(null);
    setFormData({
      name: "",
      brand: "",
      category: "",
      color: "",
      price: "",
      quantity: "",
      image: null,
      description: "",
    });
    setSelectedMainCategory("");
    setIsAddingProduct(false);
  };

  // Обработчик редактирования товара
  const handleEditProduct = (product) => {
    setEditingProduct(product);

    // Находим основную категорию по выбранной подкатегории
    const mainCategory = Object.keys(categories).find((cat) =>
      categories[cat].includes(product.category)
    );

    setSelectedMainCategory(mainCategory || "");
    setFormData({
      name: product.name,
      brand: product.brand || "",
      category: product.category || "",
      color: product.color || "",
      price: product.price || "",
      quantity: product.quantity || "",
      image: product.image || null,
      description: product.description || "",
    });
    setIsAddingProduct(true);
  };

  // Состояние для управления модальным окном "Подробнее"
  const [showDetails, setShowDetails] = useState(null);

  // Функция для открытия модального окна
  const openDetails = (product) => {
    setShowDetails(product.id);
  };

  // Получаем уникальные цвета для выпадающего списка в поиске
  const uniqueColors = [
    ...new Set(productsList.map((p) => p.color).filter(Boolean)),
  ];

  // Если в режиме добавления/редактирования — показываем форму
  if (isAddingProduct) {
    return (
      <div className="products-page-container">
        <Header />
        <div className="main-content-wrapper">
          <Sidebar />
          <main className="products-content-main">
            <div className="container-fluid p-4">
              {/* Заголовок страницы */}
              <div className="d-flex align-items-center justify-content-center mb-4">
                <img
                  src={ProductsIcon}
                  alt="Товары"
                  className="news-title-icon me-3"
                  style={{ width: "29px", height: "28px" }}
                />
                <h1 className="news-main-title fw-normal">ТОВАРЫ</h1>
              </div>

              {/* Подзаголовок формы */}
              <h3 className="brands-subtitle mb-4 ms-4">
                {editingProduct
                  ? "Редактировать товар"
                  : "Добавить новый товар"}
              </h3>

              {/* Форма добавления/редактирования */}
              <form
                onSubmit={handleSubmit}
                className="brands-form"
                style={{ backgroundColor: "#FFF4E5" }}
              >
                <div className="row g-4 mb-4 d-flex justify-content-between">
                  <div className="col-md-3">
                    <label htmlFor="productName" className="form-label">
                      {editingProduct
                        ? "Изменить название товара:"
                        : "Название товара:"}
                    </label>
                    <input
                      type="text"
                      id="productName"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Введите..."
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="productBrand" className="form-label">
                      Бренд:
                    </label>
                    <select
                      id="productBrand"
                      className="form-select"
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled>
                        Выберите
                      </option>
                      <option value="Nike">Nike</option>
                      <option value="Adidas">Adidas</option>
                      <option value="Apple">Apple</option>
                      <option value="Samsung">Samsung</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Категория:</label>
                    <select
                      className="form-select"
                      value={selectedMainCategory}
                      onChange={(e) => {
                        setSelectedMainCategory(e.target.value);
                        setFormData((prev) => ({ ...prev, category: "" }));
                      }}
                      required
                    >
                      <option value="">Выберите</option>
                      {Object.keys(categories).map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row g-4 mb-4 d-flex justify-content-between">
                  <div className="col-md-3">
                    <label htmlFor="productColor" className="form-label">
                      Цвет:
                    </label>
                    <input
                      type="text"
                      id="productColor"
                      className="form-control"
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      placeholder="Введите..."
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="productPrice" className="form-label">
                      Цена, ₽:
                    </label>
                    <input
                      type="number"
                      id="productPrice"
                      className="form-control"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="Введите..."
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Подкатегория:</label>
                    <select
                      className="form-select"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      disabled={!selectedMainCategory}
                      required
                    >
                      <option value="">Выберите</option>
                      {selectedMainCategory &&
                        categories[selectedMainCategory]?.map((subCategory) => (
                          <option key={subCategory} value={subCategory}>
                            {subCategory}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="row g-4 mb-4 d-flex justify-content-between">
                  <div className="col-md-6">
                    <label htmlFor="productImage" className="form-label ">
                      {editingProduct
                        ? "Изменить изображение:"
                        : "Добавить изображение:"}
                    </label>
                    <div className="d-flex align-items-center gap-3">
                      <button
                        type="button"
                        className="btn d-flex align-items-center"
                        style={{
                          backgroundColor: "#FFECB3",
                          color: "#FFA000",
                          borderRadius: "8px",
                          padding: "8px 16px",
                        }}
                        onClick={() =>
                          document.getElementById("productImageInput").click()
                        }
                      >
                        <img
                          src={PlusImageIcon}
                          alt="Плюс"
                          className="me-2"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Прикрепить изображение
                      </button>
                      <input
                        id="productImageInput"
                        type="file"
                        accept="image/*"
                        className="brands-file-input"
                        onChange={handleFileChange}
                      />
                      <span className="text-muted">
                        {formData.image
                          ? formData.image.name
                          : "Медиафайлы не выбраны"}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="productQuantity" className="form-label">
                      Количество:
                    </label>
                    <input
                      type="number"
                      id="productQuantity"
                      className="form-control"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      placeholder="Введите..."
                      min="0"
                    />
                  </div>
                </div>

                <div className="row g-4 mb-4">
                  <div className="col-12">
                    <label htmlFor="productDescription" className="form-label">
                      {editingProduct
                        ? "Изменить описание товара:"
                        : "Описание товара:"}
                    </label>
                    <textarea
                      id="productDescription"
                      className="form-control"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="5"
                      placeholder="Введите описание..."
                      required
                    ></textarea>
                  </div>
                </div>

                {/* Кнопки внизу формы */}
                <div className="mt-4">
                  {editingProduct ? (
                    // Режим редактирования: две кнопки по краям
                    <div className="d-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{
                          backgroundColor: "#FF6F00",
                          borderColor: "#FF6F00",
                          borderRadius: "20px",
                          padding: "10px 20px",
                          fontWeight: "600",
                        }}
                        onClick={() => handleDeleteProduct(editingProduct.id)}
                      >
                        <img
                          src={DeleteWhiteIcon}
                          alt="Удалить"
                          className="me-2"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Удалить товар
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={{
                          backgroundColor: "#FF6F00",
                          borderColor: "#FF6F00",
                          borderRadius: "20px",
                          padding: "7px 35px",
                          fontWeight: "600",
                        }}
                      >
                        Сохранить
                      </button>
                    </div>
                  ) : (
                    // Режим добавления: одна кнопка по центру
                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={{
                          backgroundColor: "#FF6F00",
                          borderColor: "#FF6F00",
                          borderRadius: "20px",
                          padding: "7px 35px",
                          fontWeight: "600",
                        }}
                      >
                        Готово
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Иначе — показываем основную страницу со списком товаров
  return (
    <div className="products-page-container">
      <Header />

      <div className="main-content-wrapper">
        <Sidebar />

        <main className="products-content-main">
          <div
            className="container-fluid py-4"
            style={{ paddingRight: "40px" }}
          >
            {/* Заголовок страницы с иконкой */}
            <div className="row mb-4">
              <div className="col-12">
                <div className="d-flex align-items-center justify-content-center">
                  <img
                    src={ProductsIcon}
                    alt="Товары"
                    className="news-title-icon me-3"
                    style={{ width: "29px", height: "28px" }}
                  />
                  <h1 className="news-main-title fw-normal">ТОВАРЫ</h1>
                </div>
              </div>
            </div>

            {/* Форма поиска товаров */}
            <div
              className="products-search-section mb-4 p-3 rounded"
              style={{ backgroundColor: "#FFF4E5" }}
            >
              <div className="row g-1 d-flex justify-content-around">
                <div className="col-md-3">
                  <label className="form-label">Поиск товара:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Введите название..."
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Бренд:</label>
                  <select className="form-select">
                    <option>Выберите</option>
                    <option>Nike</option>
                    <option>Adidas</option>
                    <option>Apple</option>
                    <option>Samsung</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label">Категория:</label>
                  <select
                    className="form-select"
                    value={searchSelectedMainCategory}
                    onChange={(e) => {
                      setSearchSelectedMainCategory(e.target.value);
                      setSearchCategory("");
                    }}
                  >
                    <option value="">Выберите</option>
                    {Object.keys(categories).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Строка с цветом, ценой и подкатегорией */}
              <div className="row g-1 mt-3 d-flex justify-content-around">
                <div className="col-md-3">
                  <label className="form-label">Цвет:</label>
                  <select className="form-select">
                    <option>Выберите</option>
                    {uniqueColors.map((color, index) => (
                      <option key={index} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label">Цена, ₽:</label>
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="От..."
                    />
                    <span className="fw-bold">—</span>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="До..."
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <label className="form-label">Подкатегория:</label>
                  <select
                    className="form-select"
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                    disabled={!searchSelectedMainCategory}
                  >
                    <option value="">Выберите</option>
                    {searchSelectedMainCategory &&
                      categories[searchSelectedMainCategory]?.map(
                        (subCategory) => (
                          <option key={subCategory} value={subCategory}>
                            {subCategory}
                          </option>
                        )
                      )}
                  </select>
                </div>
              </div>

              {/* Строка с кнопкой "Добавить товар" */}
              <div className="row g-2 mt-3 ms-5">
                <div className="col-md-10">
                  <button
                    className="btn d-flex align-items-center"
                    style={{
                      backgroundColor: "#FFECB3",
                      color: "#FFA000",
                      borderRadius: "18px",
                      padding: "8px 20px",
                    }}
                    onClick={() => setIsAddingProduct(true)}
                  >
                    <img
                      src={PlusIcon}
                      alt="Добавить"
                      className="me-2"
                      style={{ width: "16px", height: "16px" }}
                    />
                    Добавить товар
                  </button>
                </div>
                <div className="col-md-1 d-flex justify-content-start">
                  <button
                    className="btn btn-primary"
                    style={{ padding: "5px 42px" }}
                  >
                    Поиск
                  </button>
                </div>
              </div>
            </div>

            {/* Сетка товаров */}
            <div className="products-grid-section">
              <div className="row g-4">
                {productsList.length === 0 ? (
                  <div className="col-12 text-center py-5">
                    <p className="text-muted">
                      Нет товаров. Нажмите "+ Добавить товар".
                    </p>
                  </div>
                ) : (
                  productsList.map((product) => (
                    <div key={product.id} className="col-12 col-md-6 col-lg-3">
                      <div className="product-card card h-100 shadow-sm border-0 position-relative">
                        {/* Изображение товара */}
                        <div className="product-image-container position-relative">
                          <img
                            src={
                              product.image
                                ? URL.createObjectURL(product.image)
                                : "https://via.placeholder.com/260x190?text=IMG"
                            }
                            alt={product.name || "Товар"}
                            className="product-image"
                          />
                          {/* Иконка редактирования - показывается при наведении на всю карточку */}
                          <div
                            className="position-absolute top-0 end-0 m-2 product-edit-icon"
                            style={{
                              opacity: 0,
                              transition: "opacity 0.3s ease",
                              cursor: "pointer",
                            }}
                            onClick={() => handleEditProduct(product)}
                          >
                            <img
                              src={EditIcon}
                              alt="Редактировать"
                              style={{
                                width: "24px",
                                height: "24px",
                              }}
                            />
                          </div>
                        </div>

                        {/* Контент товара */}
                        <div className="card-body d-flex flex-column p-3">
                          {/* Название товара по центру */}
                          <h5
                            className="product-title card-title fw-bold mb-2 text-center"
                            style={{ fontSize: "1.2rem" }}
                          >
                            {product.name}
                          </h5>

                          {/* Строка с кнопкой "Подробнее" и ценой */}
                          <div className="d-flex justify-content-between align-items-center mt-auto">
                            <button
                              className="btn btn-link p-0"
                              style={{
                                textDecoration: "none",
                                color: "#C79E63",
                                fontWeight: "500",
                              }}
                              onClick={() => openDetails(product)}
                            >
                              Подробнее...
                            </button>
                            <span className="product-price badge bg-orange px-3 py-2">
                              ₽ {product.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Модальное окно "Подробнее" */}
            {showDetails && (
              <>
                {/* Затемненный фон */}
                <div
                  className="modal-backdrop show"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 1040,
                  }}
                  onClick={() => setShowDetails(null)}
                ></div>

                {/* Модальное окно */}
                <div
                  className="modal show d-block"
                  style={{ zIndex: 1050 }}
                  tabIndex="-1"
                >
                  <div
                    className="modal-dialog modal-dialog-centered"
                    style={{ maxWidth: "450px" }}
                  >
                    <div className="modal-content" style={{ color: "#C79E63" }}>
                      <div className="modal-header border-0 pb-0 position-relative text-center">
                        <h5
                          className="modal-title fw-bold w-100 m-0"
                          style={{ color: "#AA8144", fontSize: "1.3rem" }}
                        >
                          {productsList.find((p) => p.id === showDetails)?.name}
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={() => setShowDetails(null)}
                        ></button>
                      </div>
                      <div
                        style={{
                          height: "12px",
                          background:
                            "linear-gradient(180deg, rgba(199, 158, 99, 0.2) 0%, rgba(199, 158, 99, 0.1) 50%, transparent 100%)",
                          margin: "10px 0 15px 0",
                          boxShadow: "inset 0 2px 4px rgba(136, 97, 40, 0.3)",
                        }}
                      ></div>
                      <div className="modal-body">
                        <p className="mb-2">
                          <strong>Бренд:</strong>{" "}
                          {productsList.find((p) => p.id === showDetails)
                            ?.brand || "Не указан"}
                        </p>
                        <p className="mb-2">
                          <strong>Категория:</strong>{" "}
                          {productsList.find((p) => p.id === showDetails)
                            ?.category || "Не указана"}
                        </p>
                        <p className="mb-2">
                          <strong>Цвет:</strong>{" "}
                          {productsList.find((p) => p.id === showDetails)
                            ?.color || "Не указан"}
                        </p>
                        <p className="mb-3">
                          <strong>Описание товара:</strong>{" "}
                          {productsList.find((p) => p.id === showDetails)
                            ?.description || "Нет описания"}
                        </p>
                        <div className="d-flex justify-content-center mt-4">
                          <p className="mb-0 fw-bold">
                            Количество:{" "}
                            {productsList.find((p) => p.id === showDetails)
                              ?.quantity || 0}
                          </p>
                        </div>
                      </div>
                      <div className="modal-footer border-0">
                        <button
                          className="btn btn-primary mx-auto"
                          onClick={() => setShowDetails(null)}
                          style={{
                            backgroundColor: "#FF6F00",
                            borderColor: "#FF6F00",
                            borderRadius: "20px",
                            padding: "6px 30px",
                            fontWeight: "600",
                            fontSize: "1.1rem",
                          }}
                        >
                          Окей
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;
