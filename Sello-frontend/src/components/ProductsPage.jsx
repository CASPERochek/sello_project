// // import { useState, useEffect } from "react";
// // import Sidebar from "./Sidebar";
// // import Header from "./Header";

// // import ProductsIcon from "../assets/icon/products-icon.svg";
// // import EditIcon from "../assets/icon/edit-icon.svg";
// // import PlusIcon from "../assets/icon/plus-icon.svg";
// // import DeleteWhiteIcon from "../assets/icon/delete-white-icon.svg";
// // import PlusImageIcon from "../assets/icon/plus-image-icon.svg";

// // const ProductsPage = () => {
// //   const [userName, setUserName] = useState("");
// //   const [isAddingProduct, setIsAddingProduct] = useState(false);
// //   const [editingProduct, setEditingProduct] = useState(null);
// //   const [selectedMainCategory, setSelectedMainCategory] = useState("");
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     brand: "",
// //     category: "",
// //     color: "",
// //     price: "",
// //     quantity: "",
// //     image: null,
// //     description: "",
// //   });



// //   // БРЕНДЫ ИЗ БАЗЫ ДАННЫХ - ПРИМЕР ЗАПРОСОВ:

// // /*
// // // 1. Состояние для хранения брендов из БД
// // const [brands, setBrands] = useState([]);

// // // 2. Загрузка брендов при монтировании компонента
// // useEffect(() => {
// //   fetchBrands();
// // }, []);

// // // 3. Функция для загрузки брендов с бэкенда
// // const fetchBrands = async () => {
// //   try {
// //     const response = await fetch('/api/brands/');
// //     const data = await response.json();
// //     setBrands(data);
// //   } catch (error) {
// //     console.error('Ошибка загрузки брендов:', error);
// //   }
// // };

// // // 4. Пример структуры данных от бэкенда для брендов:
// // // [
// // //   {
// // //     "id": 1,
// // //     "name": "Nike",
// // //     "description": "Спортивная одежда и обувь"
// // //   },
// // //   {
// // //     "id": 2,
// // //     "name": "Adidas",
// // //     "description": "Спортивные товары"
// // //   },
// // //   {
// // //     "id": 3,
// // //     "name": "Apple",
// // //     "description": "Электроника"
// // //   },
// // //   {
// // //     "id": 4,
// // //     "name": "Samsung",
// // //     "description": "Электроника и бытовая техника"
// // //   },
// // //   {
// // //     "id": 5, 
// // //     "name": "Bosch",
// // //     "description": "Сельхозтехника и инструменты"
// // //   },
// // //   {
// // //     "id": 6,
// // //     "name": "John Deere",
// // //     "description": "Сельскохозяйственная техника"
// // //   }
// // // ]

// // // 5. Django views пример для API брендов:
// // /*
// // from rest_framework import viewsets
// // from .models import Brand
// // from .serializers import BrandSerializer

// // class BrandViewSet(viewsets.ModelViewSet):
// //     queryset = Brand.objects.all()
// //     serializer_class = BrandSerializer
// // */

// // // 6. Django models пример для брендов:
// // /*
// // from django.db import models

// // class Brand(models.Model):
// //     name = models.CharField('Название бренда', max_length=100, unique=True)
// //     description = models.TextField('Описание бренда', blank=True)
// //     logo = models.ImageField('Логотип', upload_to='brands/logos/', blank=True, null=True)
    
// //     class Meta:
// //         verbose_name = 'Бренд'
// //         verbose_name_plural = 'Бренды'
// //         ordering = ['name']
    
// //     def __str__(self):
// //         return self.name
// // */

// // // 7. Django serializers пример для брендов:
// // /*
// // from rest_framework import serializers
// // from .models import Brand

// // class BrandSerializer(serializers.ModelSerializer):
// //     class Meta:
// //         model = Brand
// //         fields = ['id', 'name', 'description', 'logo']
// // */

// // // 8. Использование в форме добавления товара:
// // // Заменить статические option в select на:
// // // {brands.map(brand => (
// // //   <option key={brand.id} value={brand.name}>{brand.name}</option>
// // // ))}

// // // 9. Использование в форме поиска:
// // // Заменить статические option в select на:
// // // {brands.map(brand => (
// // //   <option key={brand.id} value={brand.name}>{brand.name}</option>
// // // ))}

// // // 10. Пример обновленного select для бренда в форме добавления:
// // /*
// // <select
// //   id="productBrand"
// //   className="form-select"
// //   name="brand"
// //   value={formData.brand}
// //   onChange={handleInputChange}
// //   required
// // >
// //   <option value="" disabled>Выберите</option>
// //   {brands.map(brand => (
// //     <option key={brand.id} value={brand.name}>{brand.name}</option>
// //   ))}
// // </select>
// // */


// // // ВАЖНО: Пока используем статические бренды
// // // Когда бэкенд будет готов, раскомментируйте код выше



// //   // Состояния для поиска
// //   const [searchSelectedMainCategory, setSearchSelectedMainCategory] =
// //     useState("");
// //   const [searchCategory, setSearchCategory] = useState("");

// //   // Категории товаров
// //   const categories = {
// //     "Грунты и Субстраты": [
// //       "Кокосовый субстрат и Перлит/Вермикулит",
// //       "Специализированные грунты - Для кактусов",
// //       "Специализированные грунты - Для орхидей",
// //       "Специализированные грунты - Для рассады",
// //       "Специализированные грунты - Для томатов и перцев",
// //       "Торф и Кора",
// //       "Универсальные грунты",
// //     ],
// //     "Инвентарь и Аксессуары": [
// //       "Ручной инструмент - Вилы",
// //       "Ручной инструмент - Грабли",
// //       "Ручной инструмент - Лопаты",
// //       "Ручной инструмент - Мотыги",
// //       "Садовый инструмент - Садовые ножи",
// //       "Садовый инструмент - Сапы",
// //       "Садовый инструмент - Секаторы",
// //       "Садовый инструмент - Совки",
// //       "Системы хранения - Органайзеры для семян",
// //       "Системы хранения - Стеллажи для рассады",
// //       "Средства ухода - Защитные очки",
// //       "Средства ухода - Перчатки",
// //       "Средства ухода - Садовая обувь",
// //       "Тележки и Тачки",
// //     ],
// //     "Саженцы и Луковицы": [
// //       "Виноград - Столовые сорта",
// //       "Виноград - Технические сорта",
// //       "Декоративные деревья и кустарники - Лиственные",
// //       "Декоративные деревья и кустарники - Хвойные",
// //       "Луковицы и клубни - Весенние",
// //       "Луковицы и клубни - Летние",
// //       "Луковицы и клубни - Осенние",
// //       "Многолетние цветы",
// //       "Плодовые деревья - Косточковые (абрикос, вишня, слива)",
// //       "Плодовые деревья - Семечковые (груша, яблоня)",
// //       "Розы - Плетистые",
// //       "Розы - Почвопокровные",
// //       "Розы - Чайно-гибридные",
// //       "Ягодные кустарники - Ежевика",
// //       "Ягодные кустарники - Крыжовник",
// //       "Ягодные кустарники - Малина",
// //       "Ягодные кустарники - Смородина",
// //     ],
// //     Семена: [
// //       "Овощные культуры - Бобовые (бобы, горох, фасоль)",
// //       "Овощные культуры - Капустные (брокколи, капуста белокочанная, цветная)",
// //       "Овощные культуры - Корнеплоды (морковь, редис, свекла)",
// //       "Овощные культуры - Листовые и зеленные (петрушка, салат, укроп, шпинат)",
// //       "Овощные культуры - Паслёновые (баклажаны, перцы, томаты)",
// //       "Овощные культуры - Тыквенные (кабачки, огурцы, тыквы)",
// //       "Плодовые культуры - Фруктовые деревья (вишня, груша, яблоня)",
// //       "Плодовые культуры - Ягоды (клубника, малина, смородина)",
// //       "Семена для фермеров (опт) - Зерновые (овес, пшеница, ячмень)",
// //       "Семена для фермеров (опт) - Кормовые травы",
// //       "Семена для фермеров (опт) - Масличные (подсолнечник, рапс)",
// //       "Цветы - Луковичные (лилии, нарциссы, тюльпаны)",
// //       "Цветы - Многолетние (пионы, розы, хосты)",
// //       "Цветы - Однолетние (астры, бархатцы, петуния)",
// //       "Газонные травы и сидераты - Сидераты (горчица, люпин, фацелия)",
// //       "Газонные травы и сидераты - Смеси для газона",
// //     ],
// //     "Сельская Одежда и Обувь": [
// //       "Защитные аксессуары - Каски",
// //       "Защитные аксессуары - Наушники",
// //       "Защитные аксессуары - Перчатки рабочие",
// //       "Одежда в народном стиле",
// //       "Рабочая одежда - Брюки",
// //       "Рабочая одежда - Комбинезоны",
// //       "Рабочая одежда - Куртки",
// //       "Спецобувь - Ботинки рабочие",
// //       "Спецобувь - Сапоги резиновые",
// //     ],
// //     "Сельхозтехника и Оборудование": [
// //       "Малая техника для сада и огорода - Бензопилы и электропилы",
// //       "Малая техника для сада и огорода - Газонокосилки и триммеры",
// //       "Малая техника для сада и огорода - Мотоблоки и культиваторы",
// //       "Малая техника для сада и огорода - Садовые пылесосы и воздуходувки",
// //       "Оборудование для хранения и переработки - Измельчители",
// //       "Оборудование для хранения и переработки - Силосы",
// //       "Оборудование для хранения и переработки - Сушилки для зерна",
// //       "Системы полива - Капельный полив",
// //       "Системы полива - Таймеры",
// //       "Системы полива - Шланги, разбрызгиватели",
// //       "Техника для фермеров - Комбайны",
// //       "Техника для фермеров - Опрыскиватели",
// //       "Техника для фермеров - Сеялки",
// //       "Техника для фермеров - Тракторы и навесное оборудование",
// //       "Теплицы и Парники - Каркасы",
// //       "Теплицы и Парники - Пленка",
// //       "Теплицы и Парники - Поликарбонат",
// //     ],
// //     "Удобрения и Средства защиты": [
// //       "Средства защиты растений (СЗР) - Гербициды (от сорняков)",
// //       "Средства защиты растений (СЗР) - Инсектициды (от вредителей)",
// //       "Средства защиты растений (СЗР) - Протравители семян",
// //       "Средства защиты растений (СЗР) - Фунгициды (от болезней)",
// //       "Стимуляторы роста и Биопрепараты - Адаптогены",
// //       "Стимуляторы роста и Биопрепараты - Укоренители",
// //       "Стимуляторы роста и Биопрепараты - ЭМ-препараты",
// //       "Удобрения - Жидкие и водорастворимые удобрения",
// //       "Удобрения - Минеральные - Азотные",
// //       "Удобрения - Минеральные - Калийные",
// //       "Удобрения - Минеральные - Комплексные (NPK)",
// //       "Удобрения - Минеральные - Фосфорные",
// //       "Удобрения - Микроудобрения",
// //       "Удобрения - Органические (биогумус, компост, навоз)",
// //     ],
// //     "Фермерские Продукты": [
// //       "Бакалея - Варенье",
// //       "Бакалея - Консервация",
// //       "Бакалея - Крупы",
// //       "Бакалея - Мёд",
// //       "Бакалея - Мука",
// //       "Молочная продукция - Молоко",
// //       "Молочная продукция - Сметана",
// //       "Молочная продукция - Сыр",
// //       "Молочная продукция - Творог",
// //       "Мясо и птица - Баранина",
// //       "Мясо и птица - Говядина",
// //       "Мясо и птица - Курица",
// //       "Мясо и птица - Свинина",
// //       "Свежие овощи и фрукты",
// //       "Эко-продукты и Органик",
// //     ],
// //   };


// // // КАТЕГОРИИ ИЗ БАЗЫ ДАННЫХ - ПРИМЕР ЗАПРОСОВ:

// // /*
// // // 1. Состояние для хранения категорий из БД
// // const [categories, setCategories] = useState({});

// // // 2. Загрузка категорий при монтировании компонента
// // useEffect(() => {
// //   fetchCategories();
// // }, []);

// // // 3. Функция для загрузки категорий с бэкенда
// // const fetchCategories = async () => {
// //   try {
// //     const response = await fetch('/api/categories/');
// //     const data = await response.json();
    
// //     // Преобразуем данные из БД в нужный формат
// //     const formattedCategories = {};
// //     data.forEach(category => {
// //       if (!formattedCategories[category.main_category]) {
// //         formattedCategories[category.main_category] = [];
// //       }
// //       formattedCategories[category.main_category].push(category.subcategory);
// //     });
    
// //     setCategories(formattedCategories);
// //   } catch (error) {
// //     console.error('Ошибка загрузки категорий:', error);
// //   }
// // };

// // // 4. Пример структуры данных от бэкенда (Django + PostgreSQL):
// // // [
// // //   {
// // //     "id": 1,
// // //     "main_category": "Грунты и Субстраты",
// // //     "subcategory": "Кокосовый субстрат и Перлит/Вермикулит"
// // //   },
// // //   {
// // //     "id": 2,
// // //     "main_category": "Грунты и Субстраты", 
// // //     "subcategory": "Специализированные грунты - Для кактусов"
// // //   },
// // //   {
// // //     "id": 3,
// // //     "main_category": "Инвентарь и Аксессуары",
// // //     "subcategory": "Ручной инструмент - Вилы"
// // //   }
// // // ]

// // // 5. Django views пример для API:
// // /*
// // from rest_framework import viewsets
// // from .models import Category
// // from .serializers import CategorySerializer

// // class CategoryViewSet(viewsets.ModelViewSet):
// //     queryset = Category.objects.all()
// //     serializer_class = CategorySerializer
// // */

// // // 6. Django models пример:
// // /*
// // from django.db import models

// // class Category(models.Model):
// //     main_category = models.CharField('Основная категория', max_length=100)
// //     subcategory = models.CharField('Подкатегория', max_length=200)
    
// //     class Meta:
// //         verbose_name = 'Категория'
// //         verbose_name_plural = 'Категории'
    
// //     def __str__(self):
// //         return f"{self.main_category} - {self.subcategory}"
// // */

// // // 7. Django serializers пример:
// // /*
// // from rest_framework import serializers
// // from .models import Category

// // class CategorySerializer(serializers.ModelSerializer):
// //     class Meta:
// //         model = Category
// //         fields = ['id', 'main_category', 'subcategory']
// // */

// // // 8. Замена статических категорий на динамические:
// // // Вместо статического объекта categories используем состояние categories
// // // Все остальное работает так же - структура данных идентична


// // // ВАЖНО: Пока используем статические категории, закомментированные выше
// // // Когда бэкенд будет готов, раскомментируйте код выше и удалите статический объект categories



// //   // Состояние для хранения списка товаров
// //   const [productsList, setProductsList] = useState([]);

// //   // Обработчики изменений формы
// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleFileChange = (e) => {
// //     if (e.target.files.length > 0) {
// //       setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
// //     }
// //   };

// //   // Обработчик отправки формы (добавление/редактирование)
// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     if (editingProduct) {
// //       // Редактирование
// //       setProductsList(
// //         productsList.map((product) =>
// //           product.id === editingProduct.id
// //             ? { ...product, ...formData }
// //             : product
// //         )
// //       );
// //       setEditingProduct(null);
// //     } else {
// //       // Добавление
// //       const newProduct = {
// //         id: Date.now(),
// //         ...formData,
// //         date: new Date().toLocaleDateString(),
// //       };
// //       setProductsList([...productsList, newProduct]);
// //     }

// //     // Очистка формы
// //     setFormData({
// //       name: "",
// //       brand: "",
// //       category: "",
// //       color: "",
// //       price: "",
// //       quantity: "",
// //       image: null,
// //       description: "",
// //     });
// //     setSelectedMainCategory("");
// //     setIsAddingProduct(false);
// //   };

// //   // Обработчик удаления товара
// //   const handleDeleteProduct = (id) => {
// //     setProductsList(productsList.filter((product) => product.id !== id));
// //     setEditingProduct(null);
// //     setFormData({
// //       name: "",
// //       brand: "",
// //       category: "",
// //       color: "",
// //       price: "",
// //       quantity: "",
// //       image: null,
// //       description: "",
// //     });
// //     setSelectedMainCategory("");
// //     setIsAddingProduct(false);
// //   };

// //   // Обработчик редактирования товара
// //   const handleEditProduct = (product) => {
// //     setEditingProduct(product);

// //     // Находим основную категорию по выбранной подкатегории
// //     const mainCategory = Object.keys(categories).find((cat) =>
// //       categories[cat].includes(product.category)
// //     );

// //     setSelectedMainCategory(mainCategory || "");
// //     setFormData({
// //       name: product.name,
// //       brand: product.brand || "",
// //       category: product.category || "",
// //       color: product.color || "",
// //       price: product.price || "",
// //       quantity: product.quantity || "",
// //       image: product.image || null,
// //       description: product.description || "",
// //     });
// //     setIsAddingProduct(true);
// //   };

// //   // Состояние для управления модальным окном "Подробнее"
// //   const [showDetails, setShowDetails] = useState(null);

// //   // Функция для открытия модального окна
// //   const openDetails = (product) => {
// //     setShowDetails(product.id);
// //   };

// //   // Получаем уникальные цвета для выпадающего списка в поиске
// //   const uniqueColors = [
// //     ...new Set(productsList.map((p) => p.color).filter(Boolean)),
// //   ];

// //   // Если в режиме добавления/редактирования — показываем форму
// //   if (isAddingProduct) {
// //     return (
// //       <div className="products-page-container">
// //         <Header />
// //         <div className="main-content-wrapper">
// //           <Sidebar />
// //           <main className="products-content-main">
// //             <div className="container-fluid p-4">
// //               {/* Заголовок страницы */}
// //               <div className="d-flex align-items-center justify-content-center mb-4">
// //                 <img
// //                   src={ProductsIcon}
// //                   alt="Товары"
// //                   className="news-title-icon me-3"
// //                   style={{ width: "29px", height: "28px" }}
// //                 />
// //                 <h1 className="news-main-title fw-normal">ТОВАРЫ</h1>
// //               </div>

// //               {/* Подзаголовок формы */}
// //               <h3 className="brands-subtitle mb-4 ms-4">
// //                 {editingProduct
// //                   ? "Редактировать товар"
// //                   : "Добавить новый товар"}
// //               </h3>

// //               {/* Форма добавления/редактирования */}
// //               <form
// //                 onSubmit={handleSubmit}
// //                 className="brands-form"
// //                 style={{ backgroundColor: "#FFF4E5" }}
// //               >
// //                 <div className="row g-4 mb-4 d-flex justify-content-between">
// //                   <div className="col-md-3">
// //                     <label htmlFor="productName" className="form-label">
// //                       {editingProduct
// //                         ? "Изменить название товара:"
// //                         : "Название товара:"}
// //                     </label>
// //                     <input
// //                       type="text"
// //                       id="productName"
// //                       className="form-control"
// //                       name="name"
// //                       value={formData.name}
// //                       onChange={handleInputChange}
// //                       placeholder="Введите..."
// //                       required
// //                     />
// //                   </div>
// //                   <div className="col-md-3">
// //                     <label htmlFor="productBrand" className="form-label">
// //                       Бренд:
// //                     </label>
// //                     <select
// //                       id="productBrand"
// //                       className="form-select"
// //                       name="brand"
// //                       value={formData.brand}
// //                       onChange={handleInputChange}
// //                       required
// //                     >
// //                       <option value="" disabled>
// //                         Выберите
// //                       </option>
// //                       <option value="Nike">Nike</option>
// //                       <option value="Adidas">Adidas</option>
// //                       <option value="Apple">Apple</option>
// //                       <option value="Samsung">Samsung</option>
// //                     </select>
// //                   </div>
// //                   <div className="col-md-3">
// //                     <label className="form-label">Категория:</label>
// //                     <select
// //                       className="form-select"
// //                       value={selectedMainCategory}
// //                       onChange={(e) => {
// //                         setSelectedMainCategory(e.target.value);
// //                         setFormData((prev) => ({ ...prev, category: "" }));
// //                       }}
// //                       required
// //                     >
// //                       <option value="">Выберите</option>
// //                       {Object.keys(categories).map((category) => (
// //                         <option key={category} value={category}>
// //                           {category}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </div>
// //                 </div>

// //                 <div className="row g-4 mb-4 d-flex justify-content-between">
// //                   <div className="col-md-3">
// //                     <label htmlFor="productColor" className="form-label">
// //                       Цвет:
// //                     </label>
// //                     <input
// //                       type="text"
// //                       id="productColor"
// //                       className="form-control"
// //                       name="color"
// //                       value={formData.color}
// //                       onChange={handleInputChange}
// //                       placeholder="Введите..."
// //                     />
// //                   </div>
// //                   <div className="col-md-3">
// //                     <label htmlFor="productPrice" className="form-label">
// //                       Цена, ₽:
// //                     </label>
// //                     <input
// //                       type="number"
// //                       id="productPrice"
// //                       className="form-control"
// //                       name="price"
// //                       value={formData.price}
// //                       onChange={handleInputChange}
// //                       placeholder="Введите..."
// //                       required
// //                     />
// //                   </div>
// //                   <div className="col-md-3">
// //                     <label className="form-label">Подкатегория:</label>
// //                     <select
// //                       className="form-select"
// //                       name="category"
// //                       value={formData.category}
// //                       onChange={handleInputChange}
// //                       disabled={!selectedMainCategory}
// //                       required
// //                     >
// //                       <option value="">Выберите</option>
// //                       {selectedMainCategory &&
// //                         categories[selectedMainCategory]?.map((subCategory) => (
// //                           <option key={subCategory} value={subCategory}>
// //                             {subCategory}
// //                           </option>
// //                         ))}
// //                     </select>
// //                   </div>
// //                 </div>

// //                 <div className="row g-4 mb-4 d-flex justify-content-between">
// //                   <div className="col-md-6">
// //                     <label htmlFor="productImage" className="form-label ">
// //                       {editingProduct
// //                         ? "Изменить изображение:"
// //                         : "Добавить изображение:"}
// //                     </label>
// //                     <div className="d-flex align-items-center gap-3">
// //                       <button
// //                         type="button"
// //                         className="btn d-flex align-items-center"
// //                         style={{
// //                           backgroundColor: "#FFECB3",
// //                           color: "#FFA000",
// //                           borderRadius: "8px",
// //                           padding: "8px 16px",
// //                         }}
// //                         onClick={() =>
// //                           document.getElementById("productImageInput").click()
// //                         }
// //                       >
// //                         <img
// //                           src={PlusImageIcon}
// //                           alt="Плюс"
// //                           className="me-2"
// //                           style={{ width: "16px", height: "16px" }}
// //                         />
// //                         Прикрепить изображение
// //                       </button>
// //                       <input
// //                         id="productImageInput"
// //                         type="file"
// //                         accept="image/*"
// //                         className="brands-file-input"
// //                         onChange={handleFileChange}
// //                       />
// //                       <span className="text-muted">
// //                         {formData.image
// //                           ? formData.image.name
// //                           : "Медиафайлы не выбраны"}
// //                       </span>
// //                     </div>
// //                   </div>
// //                   <div className="col-md-3">
// //                     <label htmlFor="productQuantity" className="form-label">
// //                       Количество:
// //                     </label>
// //                     <input
// //                       type="number"
// //                       id="productQuantity"
// //                       className="form-control"
// //                       name="quantity"
// //                       value={formData.quantity}
// //                       onChange={handleInputChange}
// //                       placeholder="Введите..."
// //                       min="0"
// //                     />
// //                   </div>
// //                 </div>

// //                 <div className="row g-4 mb-4">
// //                   <div className="col-12">
// //                     <label htmlFor="productDescription" className="form-label">
// //                       {editingProduct
// //                         ? "Изменить описание товара:"
// //                         : "Описание товара:"}
// //                     </label>
// //                     <textarea
// //                       id="productDescription"
// //                       className="form-control"
// //                       name="description"
// //                       value={formData.description}
// //                       onChange={handleInputChange}
// //                       rows="5"
// //                       placeholder="Введите описание..."
// //                       required
// //                     ></textarea>
// //                   </div>
// //                 </div>

// //                 {/* Кнопки внизу формы */}
// //                 <div className="mt-4">
// //                   {editingProduct ? (
// //                     // Режим редактирования: две кнопки по краям
// //                     <div className="d-flex justify-content-between">
// //                       <button
// //                         type="button"
// //                         className="btn btn-primary"
// //                         style={{
// //                           backgroundColor: "#FF6F00",
// //                           borderColor: "#FF6F00",
// //                           borderRadius: "20px",
// //                           padding: "10px 20px",
// //                           fontWeight: "600",
// //                         }}
// //                         onClick={() => handleDeleteProduct(editingProduct.id)}
// //                       >
// //                         <img
// //                           src={DeleteWhiteIcon}
// //                           alt="Удалить"
// //                           className="me-2"
// //                           style={{ width: "16px", height: "16px" }}
// //                         />
// //                         Удалить товар
// //                       </button>
// //                       <button
// //                         type="submit"
// //                         className="btn btn-primary"
// //                         style={{
// //                           backgroundColor: "#FF6F00",
// //                           borderColor: "#FF6F00",
// //                           borderRadius: "20px",
// //                           padding: "7px 35px",
// //                           fontWeight: "600",
// //                         }}
// //                       >
// //                         Сохранить
// //                       </button>
// //                     </div>
// //                   ) : (
// //                     // Режим добавления: одна кнопка по центру
// //                     <div className="d-flex justify-content-center">
// //                       <button
// //                         type="submit"
// //                         className="btn btn-primary"
// //                         style={{
// //                           backgroundColor: "#FF6F00",
// //                           borderColor: "#FF6F00",
// //                           borderRadius: "20px",
// //                           padding: "7px 35px",
// //                           fontWeight: "600",
// //                         }}
// //                       >
// //                         Готово
// //                       </button>
// //                     </div>
// //                   )}
// //                 </div>
// //               </form>
// //             </div>
// //           </main>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // Иначе — показываем основную страницу со списком товаров
// //   return (
// //     <div className="products-page-container">
// //       <Header />

// //       <div className="main-content-wrapper">
// //         <Sidebar />

// //         <main className="products-content-main">
// //           <div
// //             className="container-fluid py-4"
// //             style={{ paddingRight: "40px" }}
// //           >
// //             {/* Заголовок страницы с иконкой */}
// //             <div className="row mb-4">
// //               <div className="col-12">
// //                 <div className="d-flex align-items-center justify-content-center">
// //                   <img
// //                     src={ProductsIcon}
// //                     alt="Товары"
// //                     className="news-title-icon me-3"
// //                     style={{ width: "29px", height: "28px" }}
// //                   />
// //                   <h1 className="news-main-title fw-normal">ТОВАРЫ</h1>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Форма поиска товаров */}
// //             <div
// //               className="products-search-section mb-4 p-3 rounded"
// //               style={{ backgroundColor: "#FFF4E5" }}
// //             >
// //               <div className="row g-1 d-flex justify-content-around">
// //                 <div className="col-md-3">
// //                   <label className="form-label">Поиск товара:</label>
// //                   <input
// //                     type="text"
// //                     className="form-control"
// //                     placeholder="Введите название..."
// //                   />
// //                 </div>
// //                 <div className="col-md-3">
// //                   <label className="form-label">Бренд:</label>
// //                   <select className="form-select">
// //                     <option>Выберите</option>
// //                     <option>Nike</option>
// //                     <option>Adidas</option>
// //                     <option>Apple</option>
// //                     <option>Samsung</option>
// //                   </select>
// //                 </div>
// //                 <div className="col-md-3">
// //                   <label className="form-label">Категория:</label>
// //                   <select
// //                     className="form-select"
// //                     value={searchSelectedMainCategory}
// //                     onChange={(e) => {
// //                       setSearchSelectedMainCategory(e.target.value);
// //                       setSearchCategory("");
// //                     }}
// //                   >
// //                     <option value="">Выберите</option>
// //                     {Object.keys(categories).map((category) => (
// //                       <option key={category} value={category}>
// //                         {category}
// //                       </option>
// //                     ))}
// //                   </select>
// //                 </div>
// //               </div>

// //               {/* Строка с цветом, ценой и подкатегорией */}
// //               <div className="row g-1 mt-3 d-flex justify-content-around">
// //                 <div className="col-md-3">
// //                   <label className="form-label">Цвет:</label>
// //                   <select className="form-select">
// //                     <option>Выберите</option>
// //                     {uniqueColors.map((color, index) => (
// //                       <option key={index} value={color}>
// //                         {color}
// //                       </option>
// //                     ))}
// //                   </select>
// //                 </div>
// //                 <div className="col-md-3">
// //                   <label className="form-label">Цена, ₽:</label>
// //                   <div className="d-flex align-items-center gap-2">
// //                     <input
// //                       type="number"
// //                       className="form-control"
// //                       placeholder="От..."
// //                     />
// //                     <span className="fw-bold">—</span>
// //                     <input
// //                       type="number"
// //                       className="form-control"
// //                       placeholder="До..."
// //                     />
// //                   </div>
// //                 </div>
// //                 <div className="col-md-3">
// //                   <label className="form-label">Подкатегория:</label>
// //                   <select
// //                     className="form-select"
// //                     value={searchCategory}
// //                     onChange={(e) => setSearchCategory(e.target.value)}
// //                     disabled={!searchSelectedMainCategory}
// //                   >
// //                     <option value="">Выберите</option>
// //                     {searchSelectedMainCategory &&
// //                       categories[searchSelectedMainCategory]?.map(
// //                         (subCategory) => (
// //                           <option key={subCategory} value={subCategory}>
// //                             {subCategory}
// //                           </option>
// //                         )
// //                       )}
// //                   </select>
// //                 </div>
// //               </div>

// //               {/* Строка с кнопкой "Добавить товар" */}
// //               <div className="row g-2 mt-3 ms-5">
// //                 <div className="col-md-10">
// //                   <button
// //                     className="btn d-flex align-items-center"
// //                     style={{
// //                       backgroundColor: "#FFECB3",
// //                       color: "#FFA000",
// //                       borderRadius: "18px",
// //                       padding: "8px 20px",
// //                     }}
// //                     onClick={() => setIsAddingProduct(true)}
// //                   >
// //                     <img
// //                       src={PlusIcon}
// //                       alt="Добавить"
// //                       className="me-2"
// //                       style={{ width: "16px", height: "16px" }}
// //                     />
// //                     Добавить товар
// //                   </button>
// //                 </div>
// //                 <div className="col-md-1 d-flex justify-content-start">
// //                   <button
// //                     className="btn btn-primary"
// //                     style={{ padding: "5px 42px" }}
// //                   >
// //                     Поиск
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Сетка товаров */}
// //             <div className="products-grid-section">
// //               <div className="row g-4">
// //                 {productsList.length === 0 ? (
// //                   <div className="col-12 text-center py-5">
// //                     <p className="text-muted">
// //                       Нет товаров. Нажмите "+ Добавить товар".
// //                     </p>
// //                   </div>
// //                 ) : (
// //                   productsList.map((product) => (
// //                     <div key={product.id} className="col-12 col-md-6 col-lg-3">
// //                       <div className="product-card card h-100 shadow-sm border-0 position-relative">
// //                         {/* Изображение товара */}
// //                         <div className="product-image-container position-relative">
// //                           <img
// //                             src={
// //                               product.image
// //                                 ? URL.createObjectURL(product.image)
// //                                 : "https://via.placeholder.com/260x190?text=IMG"
// //                             }
// //                             alt={product.name || "Товар"}
// //                             className="product-image"
// //                           />
// //                           {/* Иконка редактирования - показывается при наведении на всю карточку */}
// //                           <div
// //                             className="position-absolute top-0 end-0 m-2 product-edit-icon"
// //                             style={{
// //                               opacity: 0,
// //                               transition: "opacity 0.3s ease",
// //                               cursor: "pointer",
// //                             }}
// //                             onClick={() => handleEditProduct(product)}
// //                           >
// //                             <img
// //                               src={EditIcon}
// //                               alt="Редактировать"
// //                               style={{
// //                                 width: "24px",
// //                                 height: "24px",
// //                               }}
// //                             />
// //                           </div>
// //                         </div>

// //                         {/* Контент товара */}
// //                         <div className="card-body d-flex flex-column p-3">
// //                           {/* Название товара по центру */}
// //                           <h5
// //                             className="product-title card-title fw-bold mb-2 text-center"
// //                             style={{ fontSize: "1.2rem" }}
// //                           >
// //                             {product.name}
// //                           </h5>

// //                           {/* Строка с кнопкой "Подробнее" и ценой */}
// //                           <div className="d-flex justify-content-between align-items-center mt-auto">
// //                             <button
// //                               className="btn btn-link p-0"
// //                               style={{
// //                                 textDecoration: "none",
// //                                 color: "#C79E63",
// //                                 fontWeight: "500",
// //                               }}
// //                               onClick={() => openDetails(product)}
// //                             >
// //                               Подробнее...
// //                             </button>
// //                             <span className="product-price badge bg-orange px-3 py-2">
// //                               ₽ {product.price}
// //                             </span>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   ))
// //                 )}
// //               </div>
// //             </div>

// //             {/* Модальное окно "Подробнее" */}
// //             {showDetails && (
// //               <>
// //                 {/* Затемненный фон */}
// //                 <div
// //                   className="modal-backdrop show"
// //                   style={{
// //                     backgroundColor: "rgba(0, 0, 0, 0.5)",
// //                     zIndex: 1040,
// //                   }}
// //                   onClick={() => setShowDetails(null)}
// //                 ></div>

// //                 {/* Модальное окно */}
// //                 <div
// //                   className="modal show d-block"
// //                   style={{ zIndex: 1050 }}
// //                   tabIndex="-1"
// //                 >
// //                   <div
// //                     className="modal-dialog modal-dialog-centered"
// //                     style={{ maxWidth: "450px" }}
// //                   >
// //                     <div className="modal-content" style={{ color: "#C79E63" }}>
// //                       <div className="modal-header border-0 pb-0 position-relative text-center">
// //                         <h5
// //                           className="modal-title fw-bold w-100 m-0"
// //                           style={{ color: "#AA8144", fontSize: "1.3rem" }}
// //                         >
// //                           {productsList.find((p) => p.id === showDetails)?.name}
// //                         </h5>
// //                         <button
// //                           type="button"
// //                           className="btn-close"
// //                           onClick={() => setShowDetails(null)}
// //                         ></button>
// //                       </div>
// //                       <div
// //                         style={{
// //                           height: "12px",
// //                           background:
// //                             "linear-gradient(180deg, rgba(199, 158, 99, 0.2) 0%, rgba(199, 158, 99, 0.1) 50%, transparent 100%)",
// //                           margin: "10px 0 15px 0",
// //                           boxShadow: "inset 0 2px 4px rgba(136, 97, 40, 0.3)",
// //                         }}
// //                       ></div>
// //                       <div className="modal-body">
// //                         <p className="mb-2">
// //                           <strong>Бренд:</strong>{" "}
// //                           {productsList.find((p) => p.id === showDetails)
// //                             ?.brand || "Не указан"}
// //                         </p>
// //                         <p className="mb-2">
// //                           <strong>Категория:</strong>{" "}
// //                           {productsList.find((p) => p.id === showDetails)
// //                             ?.category || "Не указана"}
// //                         </p>
// //                         <p className="mb-2">
// //                           <strong>Цвет:</strong>{" "}
// //                           {productsList.find((p) => p.id === showDetails)
// //                             ?.color || "Не указан"}
// //                         </p>
// //                         <p className="mb-3">
// //                           <strong>Описание товара:</strong>{" "}
// //                           {productsList.find((p) => p.id === showDetails)
// //                             ?.description || "Нет описания"}
// //                         </p>
// //                         <div className="d-flex justify-content-center mt-4">
// //                           <p className="mb-0 fw-bold">
// //                             Количество:{" "}
// //                             {productsList.find((p) => p.id === showDetails)
// //                               ?.quantity || 0}
// //                           </p>
// //                         </div>
// //                       </div>
// //                       <div className="modal-footer border-0">
// //                         <button
// //                           className="btn btn-primary mx-auto"
// //                           onClick={() => setShowDetails(null)}
// //                           style={{
// //                             backgroundColor: "#FF6F00",
// //                             borderColor: "#FF6F00",
// //                             borderRadius: "20px",
// //                             padding: "6px 30px",
// //                             fontWeight: "600",
// //                             fontSize: "1.1rem",
// //                           }}
// //                         >
// //                           Окей
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </>
// //             )}
// //           </div>
// //         </main>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductsPage;





// import { useState, useEffect } from "react";
// import Sidebar from "./Sidebar";
// import Header from "./Header";
// import { useAuth } from "../context/AuthContext";
// import axios from "axios";

// import ProductsIcon from "../assets/icon/products-icon.svg";
// import EditIcon from "../assets/icon/edit-icon.svg";
// import PlusIcon from "../assets/icon/plus-icon.svg";
// import DeleteWhiteIcon from "../assets/icon/delete-white-icon.svg";
// import PlusImageIcon from "../assets/icon/plus-image-icon.svg";

// // Базовые URL
// const DJANGO_API = 'http://localhost:8000/product/api';
// const DJANGO_MEDIA = 'http://localhost:8000/media';

// const ProductsPage = () => {
//   const { isAuthenticated } = useAuth();
//   const [userName, setUserName] = useState("");
//   const [isAddingProduct, setIsAddingProduct] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [selectedMainCategory, setSelectedMainCategory] = useState("");
//   const [formData, setFormData] = useState({
//     name: "",
//     brand: "", // Это будет ID бренда
//     brand_name: "", // Для отображения названия
//     main_category: "",
//     category: "",
//     color: "",
//     price: "",
//     quantity: "",
//     image: null,
//     description: "",
//   });

//   // Состояния для поиска
//   const [searchSelectedMainCategory, setSearchSelectedMainCategory] = useState("");
//   const [searchCategory, setSearchCategory] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchBrand, setSearchBrand] = useState("");
//   const [searchColor, setSearchColor] = useState("");
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");

//   // Данные из базы
//   const [products, setProducts] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [categories, setCategories] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);

//   console.log('🚀 ProductsPage.jsx загружен!', { isAuthenticated });

//   // Загружаем данные при монтировании компонента
//   useEffect(() => {
//     fetchAllData();
//   }, []);

//   // Функция для получения заголовков с токеном
//   const getAuthHeaders = () => {
//     const token = localStorage.getItem('access_token');
//     return {
//       'Authorization': token ? `Bearer ${token}` : '',
//       'Content-Type': 'multipart/form-data'
//     };
//   };

//   // Загружаем все данные
//   const fetchAllData = async () => {
//     try {
//       setLoading(true);
//       console.log('🔍 Загружаем данные...');

//       // Параллельно загружаем товары и бренды
//       const [productsResponse, brandsResponse] = await Promise.all([
//         axios.get(`${DJANGO_API}/products/`),
//         axios.get(`${DJANGO_API}/brands/`)
//       ]);

//       console.log('📦 Получено товаров:', productsResponse.data.results?.length || 0);
//       console.log('🏢 Получено брендов:', brandsResponse.data.results?.length || 0);

//       setProducts(productsResponse.data.results || []);
//       setBrands(brandsResponse.data.results || []);

//       // Формируем категории из товаров
//       const formattedCategories = {};
//       productsResponse.data.results?.forEach(product => {
//         if (product.main_category && product.category) {
//           if (!formattedCategories[product.main_category]) {
//             formattedCategories[product.main_category] = new Set();
//           }
//           formattedCategories[product.main_category].add(product.category);
//         }
//       });

//       // Преобразуем Set в массив
//       const finalCategories = {};
//       Object.keys(formattedCategories).forEach(key => {
//         finalCategories[key] = Array.from(formattedCategories[key]);
//       });

//       setCategories(finalCategories);
//       setError(null);

//     } catch (err) {
//       console.error('❌ Ошибка загрузки данных:', err);
//       setError("Не удалось загрузить данные. Проверьте подключение к серверу.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Загружаем категории товаров
//   const fetchCategoriesFromAPI = async () => {
//     try {
//       const response = await axios.get(`${DJANGO_API}/products/categories/`);
//       console.log('📊 Получены категории:', response.data);
//       setCategories(response.data);
//     } catch (err) {
//       console.error('Ошибка загрузки категорий:', err);
//       // Используем категории из товаров как запасной вариант
//     }
//   };

//   // Обработчики изменений формы
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     if (e.target.files.length > 0) {
//       const file = e.target.files[0];
//       console.log('📁 Выбран файл:', file.name, file.size, file.type);
      
//       setFormData((prev) => ({ ...prev, image: file }));
      
//       // Создаем превью
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Обработчик выбора бренда
//   const handleBrandChange = (e) => {
//     const selectedBrandId = e.target.value;
//     const selectedBrand = brands.find(brand => brand.id == selectedBrandId);
    
//     setFormData(prev => ({
//       ...prev,
//       brand: selectedBrandId,
//       brand_name: selectedBrand ? selectedBrand.name : ""
//     }));
//   };

//   // Обработчик отправки формы (добавление/редактирование)
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Проверяем авторизацию
//     if (!isAuthenticated) {
//       alert('Требуется авторизация для добавления/редактирования товаров');
//       return;
//     }

//     try {
//       setLoading(true);
//       const token = localStorage.getItem('access_token');
      
//       // Создаем FormData для отправки файлов
//       const formDataToSend = new FormData();
//       formDataToSend.append("name", formData.name);
//       formDataToSend.append("brand", formData.brand); // ID бренда
//       formDataToSend.append("main_category", selectedMainCategory);
//       formDataToSend.append("category", formData.category);
//       formDataToSend.append("color", formData.color);
//       formDataToSend.append("price", formData.price);
//       formDataToSend.append("quantity", formData.quantity);
//       formDataToSend.append("description", formData.description);
      
//       if (formData.image instanceof File) {
//         formDataToSend.append("image", formData.image);
//         console.log('📤 Добавляем изображение в FormData:', formData.image.name);
//       } else if (editingProduct && formData.image === null) {
//         // При редактировании, если image установлен в null - оставляем текущий
//         console.log('🔄 Используем текущее изображение');
//       }

//       const config = {
//         headers: getAuthHeaders()
//       };

//       let response;
//       if (editingProduct) {
//         console.log('✏️ Редактируем товар ID:', editingProduct.id);
//         response = await axios.patch(
//           `${DJANGO_API}/products/${editingProduct.id}/`, 
//           formDataToSend, 
//           config
//         );
//       } else {
//         console.log('➕ Создаем новый товар');
//         response = await axios.post(
//           `${DJANGO_API}/products/`, 
//           formDataToSend, 
//           config
//         );
//       }
      
//       console.log('✅ Успешно! Ответ:', response.data);
      
//       // Немедленно обновляем список
//       await fetchAllData();
      
//       // Сбрасываем форму
//       setFormData({
//         name: "",
//         brand: "",
//         brand_name: "",
//         main_category: "",
//         category: "",
//         color: "",
//         price: "",
//         quantity: "",
//         image: null,
//         description: "",
//       });
//       setSelectedMainCategory("");
//       setImagePreview(null);
//       setEditingProduct(null);
//       setIsAddingProduct(false);
      
//       alert(editingProduct ? 'Товар обновлен!' : 'Товар добавлен!');
      
//     } catch (err) {
//       console.error('❌ Ошибка сохранения товара:', err);
//       console.error('Статус:', err.response?.status);
//       console.error('Данные:', err.response?.data);
      
//       if (err.response?.status === 401) {
//         alert('Ошибка авторизации. Войдите снова.');
//       } else if (err.response?.status === 400) {
//         alert('Ошибка данных: ' + JSON.stringify(err.response?.data));
//       } else if (err.response?.status === 403) {
//         alert('Доступ запрещен. Недостаточно прав.');
//       } else {
//         alert('Ошибка: ' + (err.response?.data?.detail || err.message));
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Обработчик удаления товара
//   const handleDeleteProduct = async (id) => {
//     if (!window.confirm("Вы уверены, что хотите удалить этот товар?")) {
//       return;
//     }
    
//     // Проверяем авторизацию
//     if (!isAuthenticated) {
//       alert('Требуется авторизация для удаления товаров');
//       return;
//     }
    
//     try {
//       console.log('🗑️ Удаляем товар ID:', id);
      
//       const config = {
//         headers: getAuthHeaders()
//       };
      
//       await axios.delete(`${DJANGO_API}/products/${id}/`, config);
      
//       console.log('✅ Удалено успешно');
      
//       // Обновляем список локально
//       setProducts(products.filter((product) => product.id !== id));
      
//       // Если удаляем редактируемый товар, сбрасываем форму
//       if (editingProduct && editingProduct.id === id) {
//         setEditingProduct(null);
//         setIsAddingProduct(false);
//       }
      
//       alert('Товар удален!');
      
//     } catch (err) {
//       console.error('❌ Ошибка удаления товара:', err);
//       console.error('Статус:', err.response?.status);
//       console.error('Данные:', err.response?.data);
      
//       if (err.response?.status === 401) {
//         alert('Ошибка авторизации. Войдите снова.');
//       } else if (err.response?.status === 403) {
//         alert('Доступ запрещен. Недостаточно прав.');
//       } else {
//         alert('Ошибка удаления: ' + (err.response?.data?.detail || err.message));
//       }
//     }
//   };

//   // Обработчик редактирования товара
//   const handleEditProduct = (product) => {
//     console.log('✏️ Начинаем редактирование товара:', product);
//     setEditingProduct(product);

//     // Находим основную категорию
//     const mainCategory = product.main_category || "";
    
//     setSelectedMainCategory(mainCategory);
//     setFormData({
//       name: product.name,
//       brand: product.brand || "",
//       brand_name: product.brand_name || "",
//       main_category: mainCategory,
//       category: product.category || "",
//       color: product.color || "",
//       price: product.price || "",
//       quantity: product.quantity || "",
//       image: null, // Не передаем файл при редактировании
//       description: product.description || "",
//     });
    
//     // Показываем текущее изображение если есть
//     if (product.image_url) {
//       console.log('🖼️ Устанавливаем preview из image_url:', product.image_url);
//       setImagePreview(product.image_url);
//     } else if (product.image && typeof product.image === 'string') {
//       const fullUrl = product.image.startsWith('/') 
//         ? `http://localhost:8000${product.image}`
//         : `${DJANGO_MEDIA}/${product.image}`;
//       setImagePreview(fullUrl);
//     }
    
//     setIsAddingProduct(true);
//   };

//   // Функция для поиска товаров
//   const handleSearch = async () => {
//     try {
//       setLoading(true);
      
//       const params = new URLSearchParams();
//       if (searchTerm) params.append('q', searchTerm);
//       if (searchBrand) params.append('brand', searchBrand);
//       if (searchSelectedMainCategory) params.append('category', searchSelectedMainCategory);
//       if (searchColor) params.append('color', searchColor);
//       if (minPrice) params.append('min_price', minPrice);
//       if (maxPrice) params.append('max_price', maxPrice);
      
//       const url = `${DJANGO_API}/products/search/?${params.toString()}`;
//       console.log('🔍 Выполняем поиск по URL:', url);
      
//       const response = await axios.get(url);
//       setProducts(response.data || []);
      
//     } catch (err) {
//       console.error('Ошибка поиска:', err);
//       // Если поиск не работает, показываем все товары
//       fetchAllData();
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Функция для получения URL изображения
//   const getImageUrl = (product) => {
//     if (!product) {
//       return "https://via.placeholder.com/260x190?text=IMG";
//     }
    
//     // 1. Используем image_url из API если есть
//     if (product.image_url) {
//       return product.image_url;
//     }
    
//     // 2. Если есть относительный путь в поле image
//     if (product.image && typeof product.image === 'string') {
//       if (product.image.startsWith('http')) {
//         return product.image;
//       } else if (product.image.startsWith('/')) {
//         return `http://localhost:8000${product.image}`;
//       } else if (product.image.includes('products/')) {
//         return `${DJANGO_MEDIA}/${product.image}`;
//       }
//     }
    
//     return "https://via.placeholder.com/260x190?text=IMG";
//   };

//   // Состояние для управления модальным окном "Подробнее"
//   const [showDetails, setShowDetails] = useState(null);

//   // Функция для открытия модального окна
//   const openDetails = (product) => {
//     setShowDetails(product.id);
//   };

//   // Получаем уникальные цвета для выпадающего списка в поиске
//   const uniqueColors = [
//     ...new Set(products.map((p) => p.color).filter(Boolean)),
//   ];

//   // Получаем отфильтрованные товары для отображения
//   const displayedProducts = products;

//   // Если в режиме добавления/редактирования — показываем форму
//   if (isAddingProduct) {
//     return (
//       <div className="products-page-container">
//         <Header />
//         <div className="main-content-wrapper">
//           <Sidebar />
//           <main className="products-content-main">
//             <div className="container-fluid p-4">
//               {/* Заголовок страницы */}
//               <div className="d-flex align-items-center justify-content-center mb-4">
//                 <img
//                   src={ProductsIcon}
//                   alt="Товары"
//                   className="news-title-icon me-3"
//                   style={{ width: "29px", height: "28px" }}
//                 />
//                 <h1 className="news-main-title fw-normal">ТОВАРЫ</h1>
//               </div>

//               {/* Подзаголовок формы */}
//               <h3 className="brands-subtitle mb-4 ms-4">
//                 {editingProduct
//                   ? "Редактировать товар"
//                   : "Добавить новый товар"}
//               </h3>

//               {/* Сообщение о необходимости авторизации */}
//               {!isAuthenticated && (
//                 <div className="alert alert-warning mb-4">
//                   <strong>⚠️ Внимание!</strong> Для сохранения изменений требуется авторизация.
//                 </div>
//               )}

//               {/* Форма добавления/редактирования */}
//               <form
//                 onSubmit={handleSubmit}
//                 className="brands-form"
//                 style={{ backgroundColor: "#FFF4E5" }}
//               >
//                 <div className="row g-4 mb-4 d-flex justify-content-between">
//                   <div className="col-md-3">
//                     <label htmlFor="productName" className="form-label">
//                       {editingProduct
//                         ? "Изменить название товара:"
//                         : "Название товара:"}
//                     </label>
//                     <input
//                       type="text"
//                       id="productName"
//                       className="form-control"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       placeholder="Введите..."
//                       required
//                       disabled={loading}
//                     />
//                   </div>
//                   <div className="col-md-3">
//                     <label htmlFor="productBrand" className="form-label">
//                       Бренд:
//                     </label>
//                     <select
//                       id="productBrand"
//                       className="form-select"
//                       name="brand"
//                       value={formData.brand}
//                       onChange={handleBrandChange}
//                       required
//                       disabled={loading || brands.length === 0}
//                     >
//                       <option value="" disabled>
//                         Выберите
//                       </option>
//                       {brands.map((brand) => (
//                         <option key={brand.id} value={brand.id}>
//                           {brand.name}
//                         </option>
//                       ))}
//                     </select>
//                     {brands.length === 0 && (
//                       <small className="text-muted">Нет доступных брендов</small>
//                     )}
//                   </div>
//                   <div className="col-md-3">
//                     <label className="form-label">Основная категория:</label>
//                     <select
//                       className="form-select"
//                       value={selectedMainCategory}
//                       onChange={(e) => {
//                         setSelectedMainCategory(e.target.value);
//                         setFormData((prev) => ({ ...prev, category: "" }));
//                       }}
//                       required
//                       disabled={loading}
//                     >
//                       <option value="">Выберите</option>
//                       {Object.keys(categories).map((category) => (
//                         <option key={category} value={category}>
//                           {category}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <div className="row g-4 mb-4 d-flex justify-content-between">
//                   <div className="col-md-3">
//                     <label htmlFor="productColor" className="form-label">
//                       Цвет:
//                     </label>
//                     <input
//                       type="text"
//                       id="productColor"
//                       className="form-control"
//                       name="color"
//                       value={formData.color}
//                       onChange={handleInputChange}
//                       placeholder="Введите..."
//                       disabled={loading}
//                     />
//                   </div>
//                   <div className="col-md-3">
//                     <label htmlFor="productPrice" className="form-label">
//                       Цена, ₽:
//                     </label>
//                     <input
//                       type="number"
//                       id="productPrice"
//                       className="form-control"
//                       name="price"
//                       value={formData.price}
//                       onChange={handleInputChange}
//                       placeholder="Введите..."
//                       required
//                       min="0"
//                       step="0.01"
//                       disabled={loading}
//                     />
//                   </div>
//                   <div className="col-md-3">
//                     <label className="form-label">Подкатегория:</label>
//                     <select
//                       className="form-select"
//                       name="category"
//                       value={formData.category}
//                       onChange={handleInputChange}
//                       disabled={!selectedMainCategory || loading}
//                       required
//                     >
//                       <option value="">Выберите</option>
//                       {selectedMainCategory &&
//                         categories[selectedMainCategory]?.map((subCategory) => (
//                           <option key={subCategory} value={subCategory}>
//                             {subCategory}
//                           </option>
//                         ))}
//                     </select>
//                   </div>
//                 </div>

//                 <div className="row g-4 mb-4 d-flex justify-content-between">
//                   <div className="col-md-6">
//                     <label htmlFor="productImage" className="form-label ">
//                       {editingProduct
//                         ? "Изменить изображение:"
//                         : "Добавить изображение:"}
//                       <span className="text-muted ms-2">(необязательно)</span>
//                     </label>
                    
//                     {/* Превью изображения */}
//                     {imagePreview && (
//                       <div className="mb-3">
//                         <img
//                           src={imagePreview}
//                           alt="Превью"
//                           style={{
//                             maxWidth: "150px",
//                             maxHeight: "150px",
//                             borderRadius: "8px",
//                             border: "1px solid #ddd",
//                             padding: "4px",
//                           }}
//                           className="img-fluid"
//                         />
//                         <p className="text-muted small mt-1">
//                           {formData.image instanceof File 
//                             ? 'Новое изображение' 
//                             : 'Текущее изображение из базы данных'}
//                         </p>
//                       </div>
//                     )}
                    
//                     <div className="d-flex align-items-center gap-3">
//                       <button
//                         type="button"
//                         className="btn d-flex align-items-center"
//                         style={{
//                           backgroundColor: "#FFECB3",
//                           color: "#FFA000",
//                           borderRadius: "8px",
//                           padding: "8px 16px",
//                         }}
//                         onClick={() =>
//                           document.getElementById("productImageInput").click()
//                         }
//                         disabled={loading}
//                       >
//                         <img
//                           src={PlusImageIcon}
//                           alt="Плюс"
//                           className="me-2"
//                           style={{ width: "16px", height: "16px" }}
//                         />
//                         {editingProduct && imagePreview ? "Изменить изображение" : "Прикрепить изображение"}
//                       </button>
//                       <input
//                         id="productImageInput"
//                         type="file"
//                         accept="image/*"
//                         className="brands-file-input"
//                         onChange={handleFileChange}
//                         style={{ display: "none" }}
//                         disabled={loading}
//                       />
//                       <span className="text-muted">
//                         {formData.image instanceof File
//                           ? formData.image.name
//                           : editingProduct?.image_url 
//                             ? "Текущее изображение сохранено" 
//                             : "Медиафайлы не выбраны"}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="col-md-3">
//                     <label htmlFor="productQuantity" className="form-label">
//                       Количество:
//                     </label>
//                     <input
//                       type="number"
//                       id="productQuantity"
//                       className="form-control"
//                       name="quantity"
//                       value={formData.quantity}
//                       onChange={handleInputChange}
//                       placeholder="Введите..."
//                       min="0"
//                       disabled={loading}
//                     />
//                   </div>
//                 </div>

//                 <div className="row g-4 mb-4">
//                   <div className="col-12">
//                     <label htmlFor="productDescription" className="form-label">
//                       {editingProduct
//                         ? "Изменить описание товара:"
//                         : "Описание товара:"}
//                     </label>
//                     <textarea
//                       id="productDescription"
//                       className="form-control"
//                       name="description"
//                       value={formData.description}
//                       onChange={handleInputChange}
//                       rows="5"
//                       placeholder="Введите описание..."
//                       required
//                       disabled={loading}
//                     ></textarea>
//                   </div>
//                 </div>

//                 {/* Кнопки внизу формы */}
//                 <div className="mt-4">
//                   {editingProduct ? (
//                     // Режим редактирования: две кнопки по краям
//                     <div className="d-flex justify-content-between">
//                       <button
//                         type="button"
//                         className="btn btn-primary"
//                         style={{
//                           backgroundColor: "#FF6F00",
//                           borderColor: "#FF6F00",
//                           borderRadius: "20px",
//                           padding: "10px 20px",
//                           fontWeight: "600",
//                         }}
//                         onClick={() => handleDeleteProduct(editingProduct.id)}
//                         disabled={loading || !isAuthenticated}
//                       >
//                         <img
//                           src={DeleteWhiteIcon}
//                           alt="Удалить"
//                           className="me-2"
//                           style={{ width: "16px", height: "16px" }}
//                         />
//                         Удалить товар
//                       </button>
//                       <button
//                         type="submit"
//                         className="btn btn-primary"
//                         style={{
//                           backgroundColor: "#FF6F00",
//                           borderColor: "#FF6F00",
//                           borderRadius: "20px",
//                           padding: "7px 35px",
//                           fontWeight: "600",
//                         }}
//                         disabled={loading || !isAuthenticated}
//                       >
//                         {loading ? (
//                           <>
//                             <span className="spinner-border spinner-border-sm me-2" />
//                             Сохранение...
//                           </>
//                         ) : (
//                           "Сохранить"
//                         )}
//                       </button>
//                     </div>
//                   ) : (
//                     // Режим добавления: одна кнопка по центру
//                     <div className="d-flex justify-content-between">
//                       <button
//                         type="button"
//                         className="btn btn-secondary px-4"
//                         onClick={() => {
//                           setIsAddingProduct(false);
//                           setEditingProduct(null);
//                           setImagePreview(null);
//                         }}
//                         disabled={loading}
//                       >
//                         Отмена
//                       </button>
//                       <button
//                         type="submit"
//                         className="btn btn-primary"
//                         style={{
//                           backgroundColor: "#FF6F00",
//                           borderColor: "#FF6F00",
//                           borderRadius: "20px",
//                           padding: "7px 35px",
//                           fontWeight: "600",
//                         }}
//                         disabled={loading || !isAuthenticated}
//                       >
//                         {loading ? (
//                           <>
//                             <span className="spinner-border spinner-border-sm me-2" />
//                             Сохранение...
//                           </>
//                         ) : (
//                           "Готово"
//                         )}
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </form>
//             </div>
//           </main>
//         </div>
//       </div>
//     );
//   }

//   // Иначе — показываем основную страницу со списком товаров
//   return (
//     <div className="products-page-container">
//       <Header />

//       <div className="main-content-wrapper">
//         <Sidebar />

//         <main className="products-content-main">
//           <div
//             className="container-fluid py-4"
//             style={{ paddingRight: "40px" }}
//           >
//             {/* Заголовок страницы с иконкой */}
//             <div className="row mb-4">
//               <div className="col-12">
//                 <div className="d-flex align-items-center justify-content-center">
//                   <img
//                     src={ProductsIcon}
//                     alt="Товары"
//                     className="news-title-icon me-3"
//                     style={{ width: "29px", height: "28px" }}
//                   />
//                   <h1 className="news-main-title fw-normal">ТОВАРЫ</h1>
//                 </div>
//               </div>
//             </div>

//             {/* Панель отладки */}
//             <div className="alert alert-info mb-4">
//               <div className="d-flex justify-content-between align-items-center">
//                 <div>
//                   <h5 className="mb-1">📦 Система товаров</h5>
//                   <div className="small">
//                     <span className="badge bg-primary me-2">Товаров: {products.length}</span>
//                     <span className="badge bg-success me-2">Брендов: {brands.length}</span>
//                     <span className="badge bg-warning">Авторизация: {isAuthenticated ? '✅ Да' : '❌ Нет'}</span>
//                   </div>
//                 </div>
//                 <div className="d-flex gap-2">
//                   <button 
//                     className="btn btn-sm btn-outline-dark"
//                     onClick={() => {
//                       console.log('=== DEBUG INFO ===');
//                       console.log('Товары:', products);
//                       console.log('Бренды:', brands);
//                       console.log('Категории:', categories);
//                       console.log('Токен:', localStorage.getItem('access_token'));
//                     }}
//                   >
//                     Консоль
//                   </button>
//                   {isAuthenticated && (
//                     <button 
//                       className="btn btn-sm btn-warning"
//                       onClick={() => setIsAddingProduct(true)}
//                       disabled={loading}
//                     >
//                       + Добавить товар
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {loading && (
//               <div className="text-center py-4">
//                 <div className="spinner-border text-primary" role="status">
//                   <span className="visually-hidden">Загрузка...</span>
//                 </div>
//                 <p className="mt-2">Загрузка товаров...</p>
//               </div>
//             )}

//             {error && (
//               <div className="alert alert-danger mb-4" role="alert">
//                 {error}
//                 <button 
//                   className="btn btn-sm btn-outline-danger ms-3" 
//                   onClick={fetchAllData}
//                   disabled={loading}
//                 >
//                   Повторить
//                 </button>
//               </div>
//             )}

//             {/* Форма поиска товаров */}
//             <div
//               className="products-search-section mb-4 p-3 rounded"
//               style={{ backgroundColor: "#FFF4E5" }}
//             >
//               <div className="row g-1 d-flex justify-content-around">
//                 <div className="col-md-3">
//                   <label className="form-label">Поиск товара:</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Введите название..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     disabled={loading}
//                   />
//                 </div>
//                 <div className="col-md-3">
//                   <label className="form-label">Бренд:</label>
//                   <select 
//                     className="form-select"
//                     value={searchBrand}
//                     onChange={(e) => setSearchBrand(e.target.value)}
//                     disabled={loading || brands.length === 0}
//                   >
//                     <option value="">Выберите</option>
//                     {brands.map((brand) => (
//                       <option key={brand.id} value={brand.name}>
//                         {brand.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="col-md-3">
//                   <label className="form-label">Категория:</label>
//                   <select
//                     className="form-select"
//                     value={searchSelectedMainCategory}
//                     onChange={(e) => {
//                       setSearchSelectedMainCategory(e.target.value);
//                       setSearchCategory("");
//                     }}
//                     disabled={loading}
//                   >
//                     <option value="">Выберите</option>
//                     {Object.keys(categories).map((category) => (
//                       <option key={category} value={category}>
//                         {category}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               {/* Строка с цветом, ценой и подкатегорией */}
//               <div className="row g-1 mt-3 d-flex justify-content-around">
//                 <div className="col-md-3">
//                   <label className="form-label">Цвет:</label>
//                   <select 
//                     className="form-select"
//                     value={searchColor}
//                     onChange={(e) => setSearchColor(e.target.value)}
//                     disabled={loading}
//                   >
//                     <option value="">Выберите</option>
//                     {uniqueColors.map((color, index) => (
//                       <option key={index} value={color}>
//                         {color}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="col-md-3">
//                   <label className="form-label">Цена, ₽:</label>
//                   <div className="d-flex align-items-center gap-2">
//                     <input
//                       type="number"
//                       className="form-control"
//                       placeholder="От..."
//                       value={minPrice}
//                       onChange={(e) => setMinPrice(e.target.value)}
//                       disabled={loading}
//                     />
//                     <span className="fw-bold">—</span>
//                     <input
//                       type="number"
//                       className="form-control"
//                       placeholder="До..."
//                       value={maxPrice}
//                       onChange={(e) => setMaxPrice(e.target.value)}
//                       disabled={loading}
//                     />
//                   </div>
//                 </div>
//                 <div className="col-md-3">
//                   <label className="form-label">Подкатегория:</label>
//                   <select
//                     className="form-select"
//                     value={searchCategory}
//                     onChange={(e) => setSearchCategory(e.target.value)}
//                     disabled={!searchSelectedMainCategory || loading}
//                   >
//                     <option value="">Выберите</option>
//                     {searchSelectedMainCategory &&
//                       categories[searchSelectedMainCategory]?.map(
//                         (subCategory) => (
//                           <option key={subCategory} value={subCategory}>
//                             {subCategory}
//                           </option>
//                         )
//                       )}
//                   </select>
//                 </div>
//               </div>

//               {/* Строка с кнопкой "Добавить товар" */}
//               <div className="row g-2 mt-3 ms-5">
//                 <div className="col-md-10">
//                   <button
//                     className="btn d-flex align-items-center"
//                     style={{
//                       backgroundColor: "#FFECB3",
//                       color: "#FFA000",
//                       borderRadius: "18px",
//                       padding: "8px 20px",
//                     }}
//                     onClick={() => setIsAddingProduct(true)}
//                     disabled={loading || !isAuthenticated}
//                   >
//                     <img
//                       src={PlusIcon}
//                       alt="Добавить"
//                       className="me-2"
//                       style={{ width: "16px", height: "16px" }}
//                     />
//                     {isAuthenticated ? "Добавить товар" : "Требуется вход"}
//                   </button>
//                 </div>
//                 <div className="col-md-1 d-flex justify-content-start">
//                   <button
//                     className="btn btn-primary"
//                     style={{ padding: "5px 42px" }}
//                     onClick={handleSearch}
//                     disabled={loading}
//                   >
//                     {loading ? (
//                       <>
//                         <span className="spinner-border spinner-border-sm me-2" />
//                         Поиск...
//                       </>
//                     ) : (
//                       "Поиск"
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Сетка товаров */}
//             <div className="products-grid-section">
//               {!loading && products.length === 0 ? (
//                 <div className="col-12 text-center py-5">
//                   <div className="display-1 text-muted mb-4">📦</div>
//                   <h4 className="text-muted mb-3">Товаров пока нет</h4>
//                   <p className="text-muted mb-4">
//                     {isAuthenticated 
//                       ? "Добавьте первый товар!" 
//                       : "Войдите в систему для управления товарами."}
//                   </p>
//                   {isAuthenticated && (
//                     <button
//                       className="btn btn-warning px-4 py-2"
//                       onClick={() => setIsAddingProduct(true)}
//                     >
//                       <img
//                         src={PlusIcon}
//                         alt="Добавить"
//                         className="me-2"
//                         style={{ width: "16px", height: "16px" }}
//                       />
//                       Добавить первый товар
//                     </button>
//                   )}
//                 </div>
//               ) : (
//                 <div className="row g-4">
//                   {displayedProducts.map((product) => (
//                     <div key={product.id} className="col-12 col-md-6 col-lg-3">
//                       <div className="product-card card h-100 shadow-sm border-0 position-relative">
//                         {/* Изображение товара */}
//                         <div className="product-image-container position-relative">
//                           <img
//                             src={getImageUrl(product)}
//                             alt={product.name || "Товар"}
//                             className="product-image"
//                             style={{
//                               width: "100%",
//                               height: "190px",
//                               objectFit: "cover"
//                             }}
//                             onError={(e) => {
//                               console.error('❌ Ошибка загрузки изображения товара');
//                               e.target.src = "https://via.placeholder.com/260x190?text=IMG";
//                               e.target.style.objectFit = 'contain';
//                               e.target.style.padding = '20px';
//                               e.target.style.backgroundColor = '#f8f9fa';
//                             }}
//                           />
//                           {/* Иконка редактирования - показывается при наведении на всю карточку */}
//                           {isAuthenticated && (
//                             <div
//                               className="position-absolute top-0 end-0 m-2 product-edit-icon"
//                               style={{
//                                 opacity: 0,
//                                 transition: "opacity 0.3s ease",
//                                 cursor: "pointer",
//                               }}
//                               onClick={() => handleEditProduct(product)}
//                               onMouseEnter={(e) => e.target.style.opacity = 1}
//                               onMouseLeave={(e) => e.target.style.opacity = 0}
//                             >
//                               <img
//                                 src={EditIcon}
//                                 alt="Редактировать"
//                                 style={{
//                                   width: "24px",
//                                   height: "24px",
//                                 }}
//                               />
//                             </div>
//                           )}
//                         </div>

//                         {/* Контент товара */}
//                         <div className="card-body d-flex flex-column p-3">
//                           {/* Название товара по центру */}
//                           <h5
//                             className="product-title card-title fw-bold mb-2 text-center"
//                             style={{ fontSize: "1.2rem" }}
//                           >
//                             {product.name}
//                           </h5>

//                           {/* Информация о бренде */}
//                           {product.brand_name && (
//                             <p className="text-muted small text-center mb-2">
//                               Бренд: {product.brand_name}
//                             </p>
//                           )}

//                           {/* Статус наличия */}
//                           <div className="text-center mb-3">
//                             <span className={`badge ${product.quantity > 10 ? 'bg-success' : product.quantity > 0 ? 'bg-warning' : 'bg-danger'}`}>
//                               {product.quantity > 10 ? 'В наличии' : product.quantity > 0 ? 'Мало' : 'Нет в наличии'}
//                             </span>
//                           </div>

//                           {/* Строка с кнопкой "Подробнее" и ценой */}
//                           <div className="d-flex justify-content-between align-items-center mt-auto">
//                             <button
//                               className="btn btn-link p-0"
//                               style={{
//                                 textDecoration: "none",
//                                 color: "#C79E63",
//                                 fontWeight: "500",
//                               }}
//                               onClick={() => openDetails(product)}
//                             >
//                               Подробнее...
//                             </button>
//                             <span className="product-price badge bg-orange px-3 py-2">
//                               ₽ {product.price}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Модальное окно "Подробнее" */}
//             {showDetails && (
//               <>
//                 {/* Затемненный фон */}
//                 <div
//                   className="modal-backdrop show"
//                   style={{
//                     backgroundColor: "rgba(0, 0, 0, 0.5)",
//                     zIndex: 1040,
//                   }}
//                   onClick={() => setShowDetails(null)}
//                 ></div>

//                 {/* Модальное окно */}
//                 <div
//                   className="modal show d-block"
//                   style={{ zIndex: 1050 }}
//                   tabIndex="-1"
//                 >
//                   <div
//                     className="modal-dialog modal-dialog-centered"
//                     style={{ maxWidth: "450px" }}
//                   >
//                     <div className="modal-content" style={{ color: "#C79E63" }}>
//                       <div className="modal-header border-0 pb-0 position-relative text-center">
//                         <h5
//                           className="modal-title fw-bold w-100 m-0"
//                           style={{ color: "#AA8144", fontSize: "1.3rem" }}
//                         >
//                           {products.find((p) => p.id === showDetails)?.name}
//                         </h5>
//                         <button
//                           type="button"
//                           className="btn-close"
//                           onClick={() => setShowDetails(null)}
//                         ></button>
//                       </div>
//                       <div
//                         style={{
//                           height: "12px",
//                           background:
//                             "linear-gradient(180deg, rgba(199, 158, 99, 0.2) 0%, rgba(199, 158, 99, 0.1) 50%, transparent 100%)",
//                           margin: "10px 0 15px 0",
//                           boxShadow: "inset 0 2px 4px rgba(136, 97, 40, 0.3)",
//                         }}
//                       ></div>
//                       <div className="modal-body">
//                         <p className="mb-2">
//                           <strong>Бренд:</strong>{" "}
//                           {products.find((p) => p.id === showDetails)
//                             ?.brand_name || "Не указан"}
//                         </p>
//                         <p className="mb-2">
//                           <strong>Категория:</strong>{" "}
//                           {products.find((p) => p.id === showDetails)
//                             ?.category || "Не указана"}
//                         </p>
//                         <p className="mb-2">
//                           <strong>Основная категория:</strong>{" "}
//                           {products.find((p) => p.id === showDetails)
//                             ?.main_category || "Не указана"}
//                         </p>
//                         <p className="mb-2">
//                           <strong>Цвет:</strong>{" "}
//                           {products.find((p) => p.id === showDetails)
//                             ?.color || "Не указан"}
//                         </p>
//                         <p className="mb-2">
//                           <strong>Цена:</strong> ₽{" "}
//                           {products.find((p) => p.id === showDetails)
//                             ?.price || "0"}
//                         </p>
//                         <p className="mb-3">
//                           <strong>Описание товара:</strong>{" "}
//                           {products.find((p) => p.id === showDetails)
//                             ?.description || "Нет описания"}
//                         </p>
//                         <div className="d-flex justify-content-center mt-4">
//                           <p className="mb-0 fw-bold">
//                             Количество:{" "}
//                             {products.find((p) => p.id === showDetails)
//                               ?.quantity || 0}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="modal-footer border-0">
//                         <button
//                           className="btn btn-primary mx-auto"
//                           onClick={() => setShowDetails(null)}
//                           style={{
//                             backgroundColor: "#FF6F00",
//                             borderColor: "#FF6F00",
//                             borderRadius: "20px",
//                             padding: "6px 30px",
//                             fontWeight: "600",
//                             fontSize: "1.1rem",
//                           }}
//                         >
//                           Окей
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default ProductsPage;


import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "./ProductsPage.css";

import ProductsIcon from "../assets/icon/products-icon.svg";
import EditIcon from "../assets/icon/edit-icon.svg";
import PlusIcon from "../assets/icon/plus-icon.svg";
import DeleteWhiteIcon from "../assets/icon/delete-white-icon.svg";
import PlusImageIcon from "../assets/icon/plus-image-icon.svg";

// Базовые URL
const DJANGO_API = 'http://localhost:8000/product/api';
const DJANGO_MEDIA = 'http://localhost:8000/media';

const ProductsPage = () => {
  const { isAuthenticated } = useAuth();
  
  // Основные состояния
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedMainCategory, setSelectedMainCategory] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  
  // Форма данных
  const [formData, setFormData] = useState({
    name: "",
    brand: "", // Это будет ID бренда из базы
    main_category: "",
    category: "",
    color: "",
    price: "",
    quantity: "0",
    image: null,
    description: "",
  });

  // Данные из базы
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState({}); // {main_category: [subcategories]}
  const [allCategories, setAllCategories] = useState([]); // Все категории из базы
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Состояния для поиска
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBrand, setSearchBrand] = useState("");
  const [searchMainCategory, setSearchMainCategory] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchColor, setSearchColor] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Модальное окно подробностей
  const [showDetails, setShowDetails] = useState(null);

  console.log('🚀 ProductsPage.jsx загружен!', { isAuthenticated });

  // Загружаем данные при монтировании компонента
  useEffect(() => {
    fetchAllData();
  }, []);

  // Функция для получения заголовков с токеном
  const getAuthHeaders = () => {
    const token = localStorage.getItem('access_token');
    const headers = {};
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  };

  // Загружаем все данные
  const fetchAllData = async () => {
    try {
      setLoading(true);
      console.log('🔍 Загружаем данные...');

      // Загружаем товары
      const productsResponse = await axios.get(`${DJANGO_API}/products/`);
      console.log('📦 Получено товаров:', productsResponse.data.results?.length || 0);
      setProducts(productsResponse.data.results || []);

      // Загружаем бренды
      try {
        const brandsResponse = await axios.get(`${DJANGO_API}/brands/`);
        console.log('🏢 Получено брендов:', brandsResponse.data.results?.length || 0);
        setBrands(brandsResponse.data.results || []);
      } catch (brandsError) {
        console.warn('⚠️ Не удалось загрузить бренды:', brandsError.message);
        setBrands([]);
      }

      // Загружаем категории из базы
      try {
        const categoriesResponse = await axios.get(`${DJANGO_API}/categories/`);
        console.log('📊 Получено категорий из базы:', categoriesResponse.data.results?.length || 0);
        
        const categoriesList = categoriesResponse.data.results || [];
        setAllCategories(categoriesList);
        
        // Формируем структуру категорий {main_category: [subcategories]}
        const formattedCategories = {};
        categoriesList.forEach(category => {
          if (!formattedCategories[category.main_category]) {
            formattedCategories[category.main_category] = [];
          }
          formattedCategories[category.main_category].push(category.subcategory);
        });
        
        setCategories(formattedCategories);
        console.log('📋 Сформированные категории:', formattedCategories);
        
      } catch (categoriesError) {
        console.warn('⚠️ Не удалось загрузить категории из базы:', categoriesError.message);
        
        // Если нет категорий в базе, создаем дефолтные
        const defaultCategories = {
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
            "Яборные кустарники - Смородина",
          ],
          "Семена": [
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
        
        setCategories(defaultCategories);
      }

      setError(null);

    } catch (err) {
      console.error('❌ Ошибка загрузки данных:', err);
      console.error('URL запроса:', err.config?.url);
      console.error('Ответ сервера:', err.response?.data);
      
      if (err.response?.status === 404) {
        setError("API не найден. Проверьте настройки сервера.");
      } else if (err.response?.status === 500) {
        setError("Ошибка сервера. Попробуйте позже.");
      } else if (!err.response) {
        setError("Нет соединения с сервером. Убедитесь что Django запущен.");
      } else {
        setError(`Ошибка: ${err.response?.status} - ${err.response?.statusText}`);
      }
      
      // Устанавливаем пустые массивы чтобы избежать ошибок
      setProducts([]);
      setBrands([]);
      setCategories({});
      setAllCategories([]);
      
    } finally {
      setLoading(false);
    }
  };

  // Функция для добавления новой категории в базу
  const addCategoryToDatabase = async (mainCategory, subcategory) => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.warn('Нет токена для добавления категории');
        return false;
      }

      const categoryData = {
        main_category: mainCategory,
        subcategory: subcategory
      };

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      const response = await axios.post(`${DJANGO_API}/categories/`, categoryData, config);
      console.log('✅ Категория добавлена в базу:', response.data);
      
      // Обновляем список категорий
      setAllCategories(prev => [...prev, response.data]);
      
      // Обновляем структуру категорий
      setCategories(prev => {
        const newCategories = { ...prev };
        if (!newCategories[mainCategory]) {
          newCategories[mainCategory] = [];
        }
        if (!newCategories[mainCategory].includes(subcategory)) {
          newCategories[mainCategory].push(subcategory);
        }
        return newCategories;
      });
      
      return true;
    } catch (err) {
      console.error('❌ Ошибка добавления категории:', err);
      return false;
    }
  };

  // Обработчики изменений формы
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log('📁 Выбран файл:', file.name, file.size, file.type);
      
      setFormData((prev) => ({ ...prev, image: file }));
      
      // Создаем превью
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Обработчик изменения основной категории
  const handleMainCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedMainCategory(value);
    setFormData(prev => ({
      ...prev,
      main_category: value,
      category: "" // Сбрасываем подкатегорию
    }));
  };

  // Обработчик выбора бренда
  const handleBrandChange = (e) => {
    const brandId = e.target.value;
    setFormData(prev => ({
      ...prev,
      brand: brandId
    }));
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверяем авторизацию
    if (!isAuthenticated) {
      alert('Требуется авторизация для добавления/редактирования товаров');
      return;
    }

    // Валидация данных
    if (!formData.name.trim()) {
      alert('Введите название товара');
      return;
    }

    if (!formData.brand) {
      alert('Выберите бренд');
      return;
    }

    if (!selectedMainCategory) {
      alert('Выберите основную категорию');
      return;
    }

    if (!formData.category) {
      alert('Выберите подкатегорию');
      return;
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      alert('Введите корректную цену');
      return;
    }

    // Проверяем, есть ли выбранная категория в базе
    const categoryExists = allCategories.some(
      cat => cat.main_category === selectedMainCategory && cat.subcategory === formData.category
    );

    // Если категории нет в базе, предлагаем добавить
    if (!categoryExists) {
      const shouldAddCategory = window.confirm(
        `Категория "${formData.category}" в разделе "${selectedMainCategory}" не найдена в базе данных. Добавить её?`
      );
      
      if (shouldAddCategory) {
        const added = await addCategoryToDatabase(selectedMainCategory, formData.category);
        if (!added) {
          alert('Не удалось добавить категорию в базу данных');
          return;
        }
      }
    }

    try {
      setLoading(true);
      
      // Создаем FormData для отправки файлов
      const formDataToSend = new FormData();
      
      // Добавляем текстовые поля (соответствуют полям модели Product)
      formDataToSend.append("name", formData.name.trim());
      formDataToSend.append("brand", formData.brand); // ID бренда
      formDataToSend.append("main_category", selectedMainCategory);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("color", formData.color || "");
      formDataToSend.append("price", formData.price);
      formDataToSend.append("quantity", formData.quantity || "0");
      formDataToSend.append("description", formData.description || "");
      
      // Добавляем изображение если есть
      if (formData.image instanceof File) {
        formDataToSend.append("image", formData.image);
        console.log('📤 Добавляем изображение:', formData.image.name);
      }

      console.log('📨 Отправляем данные товара:', {
        name: formData.name,
        brand: formData.brand,
        main_category: selectedMainCategory,
        category: formData.category,
        price: formData.price,
        quantity: formData.quantity,
        hasImage: !!(formData.image instanceof File)
      });

      const config = {
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'multipart/form-data'
        }
      };

      let response;
      let url;
      
      if (editingProduct) {
        console.log('✏️ Редактируем товар ID:', editingProduct.id);
        url = `${DJANGO_API}/products/${editingProduct.id}/`;
        response = await axios.patch(url, formDataToSend, config);
      } else {
        console.log('➕ Создаем новый товар');
        url = `${DJANGO_API}/products/`;
        response = await axios.post(url, formDataToSend, config);
      }
      
      console.log('✅ Успешно! Ответ:', response.data);
      
      // Немедленно обновляем список
      await fetchAllData();
      
      // Сбрасываем форму
      resetForm();
      
      alert(editingProduct ? 'Товар обновлен!' : 'Товар успешно добавлен!');
      
    } catch (err) {
      console.error('❌ Ошибка сохранения товара:', err);
      console.error('URL запроса:', err.config?.url);
      console.error('Статус:', err.response?.status);
      console.error('Данные ошибки:', err.response?.data);
      
      if (err.response?.status === 401) {
        alert('Ошибка авторизации. Войдите снова.');
      } else if (err.response?.status === 400) {
        // Показываем подробности ошибок валидации
        const errors = err.response.data;
        let errorMessage = 'Ошибка валидации:\n';
        
        Object.keys(errors).forEach(key => {
          if (Array.isArray(errors[key])) {
            errorMessage += `${key}: ${errors[key].join(', ')}\n`;
          } else {
            errorMessage += `${key}: ${errors[key]}\n`;
          }
        });
        
        alert(errorMessage);
      } else if (err.response?.status === 403) {
        alert('Доступ запрещен. Недостаточно прав.');
      } else if (err.response?.status === 404) {
        alert('API не найден. Проверьте настройки сервера.');
      } else {
        alert('Ошибка сервера. Попробуйте позже.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Сброс формы
  const resetForm = () => {
    setFormData({
      name: "",
      brand: "",
      main_category: "",
      category: "",
      color: "",
      price: "",
      quantity: "0",
      image: null,
      description: "",
    });
    setSelectedMainCategory("");
    setImagePreview(null);
    setEditingProduct(null);
    setIsAddingProduct(false);
  };

  // Обработчик удаления товара
  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Вы уверены, что хотите удалить этот товар?")) {
      return;
    }
    
    // Проверяем авторизацию
    if (!isAuthenticated) {
      alert('Требуется авторизация для удаления товаров');
      return;
    }
    
    try {
      console.log('🗑️ Удаляем товар ID:', id);
      
      const config = {
        headers: getAuthHeaders()
      };
      
      await axios.delete(`${DJANGO_API}/products/${id}/`, config);
      
      console.log('✅ Удалено успешно');
      
      // Обновляем список локально
      setProducts(products.filter((product) => product.id !== id));
      
      // Если удаляем редактируемый товар, сбрасываем форму
      if (editingProduct && editingProduct.id === id) {
        resetForm();
      }
      
      alert('Товар удален!');
      
    } catch (err) {
      console.error('❌ Ошибка удаления товара:', err);
      console.error('Статус:', err.response?.status);
      
      if (err.response?.status === 401) {
        alert('Ошибка авторизации. Войдите снова.');
      } else if (err.response?.status === 403) {
        alert('Доступ запрещен. Недостаточно прав.');
      } else if (err.response?.status === 404) {
        alert('Товар не найден. Возможно он уже удален.');
      } else {
        alert('Ошибка удаления: ' + (err.response?.data?.detail || err.message));
      }
    }
  };

  // Обработчик редактирования товара
  const handleEditProduct = (product) => {
    console.log('✏️ Начинаем редактирование товара:', product);
    
    // Находим бренд по ID
    let brandId = "";
    if (product.brand && typeof product.brand === 'object') {
      brandId = product.brand.id;
    } else if (product.brand) {
      // Если brand - это ID (число)
      brandId = product.brand;
    }
    
    setEditingProduct(product);
    setSelectedMainCategory(product.main_category || "");
    
    setFormData({
      name: product.name || "",
      brand: brandId,
      main_category: product.main_category || "",
      category: product.category || "",
      color: product.color || "",
      price: product.price || "",
      quantity: product.quantity?.toString() || "0",
      image: null, // Не передаем файл при редактировании
      description: product.description || "",
    });
    
    // Показываем текущее изображение если есть
    if (product.image_url) {
      console.log('🖼️ Устанавливаем preview из image_url:', product.image_url);
      setImagePreview(product.image_url);
    } else if (product.image && typeof product.image === 'string') {
      const fullUrl = product.image.startsWith('/') 
        ? `http://localhost:8000${product.image}`
        : `${DJANGO_MEDIA}/${product.image}`;
      setImagePreview(fullUrl);
    } else {
      setImagePreview(null);
    }
    
    setIsAddingProduct(true);
  };

  // Функция для поиска товаров
  const handleSearch = () => {
    // Фильтруем товары локально
    let filtered = [...products];
    
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (searchBrand) {
      filtered = filtered.filter(p => {
        const brandName = p.brand_name || 
                         (p.brand && typeof p.brand === 'object' ? p.brand.name : '');
        return brandName.toLowerCase().includes(searchBrand.toLowerCase());
      });
    }
    
    if (searchMainCategory) {
      filtered = filtered.filter(p => 
        p.main_category === searchMainCategory
      );
    }
    
    if (searchColor) {
      filtered = filtered.filter(p => 
        p.color && p.color.toLowerCase().includes(searchColor.toLowerCase())
      );
    }
    
    if (minPrice) {
      filtered = filtered.filter(p => 
        parseFloat(p.price) >= parseFloat(minPrice)
      );
    }
    
    if (maxPrice) {
      filtered = filtered.filter(p => 
        parseFloat(p.price) <= parseFloat(maxPrice)
      );
    }
    
    if (searchCategory) {
      filtered = filtered.filter(p => 
        p.category === searchCategory
      );
    }
    
    return filtered;
  };

  // Функция для получения URL изображения
  const getImageUrl = (product) => {
    if (!product) {
      return "https://via.placeholder.com/300x200?text=Товар";
    }
    
    // 1. Используем image_url из API если есть
    if (product.image_url) {
      return product.image_url;
    }
    
    // 2. Если есть относительный путь в поле image
    if (product.image && typeof product.image === 'string') {
      if (product.image.startsWith('http')) {
        return product.image;
      } else if (product.image.startsWith('/')) {
        return `http://localhost:8000${product.image}`;
      } else if (product.image.includes('products/')) {
        return `${DJANGO_MEDIA}/${product.image}`;
      }
    }
    
    return "https://via.placeholder.com/300x200?text=Товар";
  };

  // Получаем уникальные цвета для поиска
  const uniqueColors = [...new Set(products.map(p => p.color).filter(Boolean))];

  // Получаем отфильтрованные товары
  const filteredProducts = handleSearch();

  // Если в режиме добавления/редактирования — показываем форму
  if (isAddingProduct) {
    const mainCategories = Object.keys(categories);
    const subcategories = selectedMainCategory ? categories[selectedMainCategory] || [] : [];

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

              {/* Сообщение о необходимости авторизации */}
              {!isAuthenticated && (
                <div className="alert alert-warning mb-4">
                  <strong>⚠️ Внимание!</strong> Для сохранения изменений требуется авторизация.
                </div>
              )}

              {/* Форма добавления/редактирования */}
              <form
                onSubmit={handleSubmit}
                className="brands-form"
                style={{ backgroundColor: "#FFF4E5", padding: "20px", borderRadius: "10px" }}
              >
                <div className="row g-4 mb-4">
                  <div className="col-md-6">
                    <label htmlFor="productName" className="form-label fw-bold">
                      {editingProduct
                        ? "Изменить название товара:"
                        : "Название товара:"} *
                    </label>
                    <input
                      type="text"
                      id="productName"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Введите название..."
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="productBrand" className="form-label fw-bold">
                      Бренд: *
                    </label>
                    <select
                      id="productBrand"
                      className="form-select"
                      name="brand"
                      value={formData.brand}
                      onChange={handleBrandChange}
                      required
                      disabled={loading || brands.length === 0}
                    >
                      <option value="">Выберите бренд</option>
                      {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                    {brands.length === 0 && (
                      <small className="text-danger">Нет доступных брендов. Сначала добавьте бренды.</small>
                    )}
                  </div>
                </div>

                <div className="row g-4 mb-4">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">
                      Основная категория: *
                    </label>
                    <select
                      className="form-select"
                      value={selectedMainCategory}
                      onChange={handleMainCategoryChange}
                      required
                      disabled={loading || mainCategories.length === 0}
                    >
                      <option value="">{mainCategories.length === 0 ? "Загрузка категорий..." : "Выберите категорию"}</option>
                      {mainCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {mainCategories.length === 0 && !loading && (
                      <small className="text-danger">Нет категорий. Добавьте категории в базу данных.</small>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">
                      Подкатегория: *
                    </label>
                    <select
                      className="form-select"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      disabled={!selectedMainCategory || loading || subcategories.length === 0}
                      required
                    >
                      <option value="">{subcategories.length === 0 ? "Выберите основную категорию" : "Выберите подкатегорию"}</option>
                      {subcategories.map((subCategory) => (
                        <option key={subCategory} value={subCategory}>
                          {subCategory}
                        </option>
                      ))}
                    </select>
                    {selectedMainCategory && subcategories.length === 0 && !loading && (
                      <small className="text-danger">Нет подкатегорий для выбранной категории</small>
                    )}
                  </div>
                </div>

                <div className="row g-4 mb-4">
                  <div className="col-md-4">
                    <label htmlFor="productColor" className="form-label fw-bold">
                      Цвет:
                    </label>
                    <input
                      type="text"
                      id="productColor"
                      className="form-control"
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      placeholder="Например: красный"
                      disabled={loading}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="productPrice" className="form-label fw-bold">
                      Цена, ₽: *
                    </label>
                    <input
                      type="number"
                      id="productPrice"
                      className="form-control"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      required
                      min="0"
                      step="0.01"
                      disabled={loading}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="productQuantity" className="form-label fw-bold">
                      Количество:
                    </label>
                    <input
                      type="number"
                      id="productQuantity"
                      className="form-control"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      placeholder="0"
                      min="0"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="row g-4 mb-4">
                  <div className="col-12">
                    <label className="form-label fw-bold">
                      {editingProduct
                        ? "Изменить изображение:"
                        : "Добавить изображение:"}
                      <span className="text-muted ms-2">(необязательно)</span>
                    </label>
                    
                    {/* Превью изображения */}
                    {imagePreview && (
                      <div className="mb-3">
                        <img
                          src={imagePreview}
                          alt="Превью"
                          style={{
                            maxWidth: "200px",
                            maxHeight: "200px",
                            borderRadius: "8px",
                            border: "1px solid #ddd",
                            padding: "4px",
                            objectFit: "contain"
                          }}
                          className="img-fluid"
                        />
                        <p className="text-muted small mt-1">
                          {formData.image instanceof File 
                            ? 'Новое изображение' 
                            : 'Текущее изображение'}
                        </p>
                      </div>
                    )}
                    
                    <div className="d-flex align-items-center gap-3">
                      <button
                        type="button"
                        className="btn d-flex align-items-center"
                        style={{
                          backgroundColor: "#FFECB3",
                          color: "#FFA000",
                          borderRadius: "8px",
                          padding: "8px 16px",
                          border: "none"
                        }}
                        onClick={() =>
                          document.getElementById("productImageInput").click()
                        }
                        disabled={loading}
                      >
                        <img
                          src={PlusImageIcon}
                          alt="Плюс"
                          className="me-2"
                          style={{ width: "16px", height: "16px" }}
                        />
                        {editingProduct && imagePreview ? "Изменить изображение" : "Выбрать изображение"}
                      </button>
                      <input
                        id="productImageInput"
                        type="file"
                        accept="image/*"
                        className="form-control"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                        disabled={loading}
                      />
                      <span className="text-muted">
                        {formData.image instanceof File
                          ? formData.image.name
                          : editingProduct?.image 
                            ? "Изображение уже загружено" 
                            : "Файл не выбран"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="row g-4 mb-4">
                  <div className="col-12">
                    <label htmlFor="productDescription" className="form-label fw-bold">
                      {editingProduct
                        ? "Изменить описание товара:"
                        : "Описание товара:"} *
                    </label>
                    <textarea
                      id="productDescription"
                      className="form-control"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="5"
                      placeholder="Опишите товар..."
                      required
                      disabled={loading}
                    ></textarea>
                  </div>
                </div>

                {/* Кнопки внизу формы */}
                <div className="mt-4">
                  {editingProduct ? (
                    // Режим редактирования: кнопки
                    <div className="d-flex justify-content-between">
                      <div>
                        <button
                          type="button"
                          className="btn btn-secondary me-2 px-4"
                          onClick={resetForm}
                          disabled={loading}
                        >
                          Отмена
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger px-4"
                          onClick={() => handleDeleteProduct(editingProduct.id)}
                          disabled={loading || !isAuthenticated}
                        >
                          <img
                            src={DeleteWhiteIcon}
                            alt="Удалить"
                            className="me-2"
                            style={{ width: "16px", height: "16px" }}
                          />
                          Удалить
                        </button>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary px-4"
                        style={{
                          backgroundColor: "#FF6F00",
                          borderColor: "#FF6F00",
                          borderRadius: "20px",
                          fontWeight: "600",
                        }}
                        disabled={loading || !isAuthenticated || !selectedMainCategory || !formData.category}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" />
                            Сохранение...
                          </>
                        ) : (
                          "Сохранить изменения"
                        )}
                      </button>
                    </div>
                  ) : (
                    // Режим добавления: кнопки
                    <div className="d-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn-secondary px-4"
                        onClick={resetForm}
                        disabled={loading}
                      >
                        Отмена
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary px-4"
                        style={{
                          backgroundColor: "#FF6F00",
                          borderColor: "#FF6F00",
                          borderRadius: "20px",
                          fontWeight: "600",
                        }}
                        disabled={loading || !isAuthenticated || !selectedMainCategory || !formData.category}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" />
                            Добавление...
                          </>
                        ) : (
                          "Добавить товар"
                        )}
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="mt-3">
                  <small className="text-muted">* - обязательные поля</small>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Иначе — показываем основную страницу со списком товаров
  const mainCategories = Object.keys(categories);
  const searchSubcategories = searchMainCategory ? categories[searchMainCategory] || [] : [];

  return (
    <div className="products-page-container">
      <Header />
      <div className="main-content-wrapper">
        <Sidebar />
        <main className="products-content-main">
          <div className="container-fluid py-4" style={{ paddingRight: "40px" }}>
            
            {/* Заголовок страницы */}
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

            {/* Панель информации */}
            <div className="alert alert-info mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">📦 Управление товарами</h5>
                  <div className="small">
                    <span className="badge bg-primary me-2">Товаров: {products.length}</span>
                    <span className="badge bg-success me-2">Брендов: {brands.length}</span>
                    <span className="badge bg-warning me-2">Категорий: {mainCategories.length}</span>
                    <span className="badge bg-secondary">Авторизация: {isAuthenticated ? '✅' : '❌'}</span>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <button 
                    className="btn btn-sm btn-outline-dark"
                    onClick={() => {
                      console.log('=== DEBUG INFO ===');
                      console.log('Товары:', products);
                      console.log('Бренды:', brands);
                      console.log('Категории:', categories);
                      console.log('Основные категории:', mainCategories);
                    }}
                  >
                    Консоль
                  </button>
                  {isAuthenticated && (
                    <button 
                      className="btn btn-sm btn-warning"
                      onClick={() => setIsAddingProduct(true)}
                      disabled={loading}
                    >
                      + Добавить товар
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Индикатор загрузки */}
            {loading && (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Загрузка...</span>
                </div>
                <p className="mt-2">Загрузка данных...</p>
              </div>
            )}

            {/* Сообщение об ошибке */}
            {error && !loading && (
              <div className="alert alert-danger mb-4" role="alert">
                {error}
                <button 
                  className="btn btn-sm btn-outline-danger ms-3" 
                  onClick={fetchAllData}
                  disabled={loading}
                >
                  Повторить
                </button>
              </div>
            )}

            {/* Форма поиска товаров */}
            {!loading && (
              <div className="products-search-section mb-4 p-3 rounded" style={{ backgroundColor: "#FFF4E5" }}>
                <div className="row g-3">
                  <div className="col-md-3">
                    <label className="form-label">Поиск товара:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Название товара..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Бренд:</label>
                    <select 
                      className="form-select"
                      value={searchBrand}
                      onChange={(e) => setSearchBrand(e.target.value)}
                    >
                      <option value="">Все бренды</option>
                      {brands.map((brand) => (
                        <option key={brand.id} value={brand.name}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Основная категория:</label>
                    <select
                      className="form-select"
                      value={searchMainCategory}
                      onChange={(e) => {
                        setSearchMainCategory(e.target.value);
                        setSearchCategory("");
                      }}
                    >
                      <option value="">Все категории</option>
                      {mainCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Цвет:</label>
                    <select 
                      className="form-select"
                      value={searchColor}
                      onChange={(e) => setSearchColor(e.target.value)}
                    >
                      <option value="">Любой цвет</option>
                      {uniqueColors.map((color, index) => (
                        <option key={index} value={color}>
                          {color}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row g-3 mt-2">
                  <div className="col-md-3">
                    <label className="form-label">Цена от:</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="₽"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Цена до:</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="₽"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Подкатегория:</label>
                    <select
                      className="form-select"
                      value={searchCategory}
                      onChange={(e) => setSearchCategory(e.target.value)}
                      disabled={!searchMainCategory}
                    >
                      <option value="">Все подкатегории</option>
                      {searchSubcategories.map((subCategory) => (
                        <option key={subCategory} value={subCategory}>
                          {subCategory}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3 d-flex align-items-end">
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => {
                        // Просто перефильтруем товары
                        console.log('Применяем фильтры');
                      }}
                    >
                      Применить фильтры
                    </button>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-12">
                    {isAuthenticated ? (
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
                    ) : (
                      <div className="alert alert-warning mb-0">
                        Для управления товарами требуется авторизация
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Сетка товаров */}
            <div className="products-grid-section">
              {!loading && filteredProducts.length === 0 ? (
                <div className="text-center py-5">
                  <div className="display-1 text-muted mb-4">📦</div>
                  <h4 className="text-muted mb-3">Товаров не найдено</h4>
                  <p className="text-muted">
                    {searchTerm || searchBrand || searchMainCategory 
                      ? "Попробуйте изменить критерии поиска" 
                      : isAuthenticated 
                        ? "Добавьте первый товар!" 
                        : "Войдите в систему для управления товарами"}
                  </p>
                  {isAuthenticated && !searchTerm && !searchBrand && !searchMainCategory && (
                    <button
                      className="btn btn-warning px-4 py-2"
                      onClick={() => setIsAddingProduct(true)}
                    >
                      <img
                        src={PlusIcon}
                        alt="Добавить"
                        className="me-2"
                        style={{ width: "16px", height: "16px" }}
                      />
                      Добавить первый товар
                    </button>
                  )}
                </div>
              ) : (
                <div className="row g-4">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="col-12 col-md-6 col-lg-4 col-xl-3">
                      <div 
                        className="product-card card h-100 shadow-sm border-0 position-relative"
                        style={{ cursor: 'pointer' }}
                        onMouseEnter={(e) => {
                          const icon = e.currentTarget.querySelector('.product-edit-icon');
                          if (icon) icon.style.opacity = 1;
                        }}
                        onMouseLeave={(e) => {
                          const icon = e.currentTarget.querySelector('.product-edit-icon');
                          if (icon) icon.style.opacity = 0;
                        }}
                      >
                        {/* Изображение товара */}
                        <div className="product-image-container position-relative" style={{ height: '200px', overflow: 'hidden' }}>
                          <img
                            src={getImageUrl(product)}
                            alt={product.name}
                            className="w-100 h-100"
                            style={{ objectFit: 'cover' }}
                            onError={(e) => {
                              console.error('❌ Ошибка загрузки изображения');
                              e.target.src = "https://via.placeholder.com/300x200?text=Товар";
                              e.target.style.objectFit = 'contain';
                              e.target.style.padding = '20px';
                              e.target.style.backgroundColor = '#f8f9fa';
                            }}
                          />
                          
                          {/* Иконка редактирования */}
                          {isAuthenticated && (
                            <div
                              className="product-edit-icon position-absolute top-0 end-0 m-2"
                              style={{
                                opacity: 0,
                                transition: "opacity 0.3s ease",
                                cursor: "pointer",
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                borderRadius: '50%',
                                width: '36px',
                                height: '36px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditProduct(product);
                              }}
                              title="Редактировать товар"
                            >
                              <img
                                src={EditIcon}
                                alt="Редактировать"
                                style={{ width: "20px", height: "20px" }}
                              />
                            </div>
                          )}
                          
                          {/* Статус наличия */}
                          <div className="position-absolute top-0 start-0 m-2">
                            <span className={`badge ${product.quantity > 10 ? 'bg-success' : product.quantity > 0 ? 'bg-warning' : 'bg-danger'}`}>
                              {product.quantity > 10 ? 'В наличии' : product.quantity > 0 ? 'Мало' : 'Нет в наличии'}
                            </span>
                          </div>
                        </div>

                        {/* Контент товара */}
                        <div className="card-body d-flex flex-column p-3">
                          <h6 className="card-title fw-bold mb-2">{product.name}</h6>
                          
                          <div className="mb-2">
                            {product.brand_name && (
                              <small className="text-muted d-block">Бренд: {product.brand_name}</small>
                            )}
                            {product.main_category && (
                              <small className="text-muted d-block">Категория: {product.main_category}</small>
                            )}
                            {product.category && (
                              <small className="text-muted d-block">Подкатегория: {product.category}</small>
                            )}
                            {product.color && (
                              <small className="text-muted d-block">Цвет: {product.color}</small>
                            )}
                          </div>
                          
                          {product.description && (
                            <p className="card-text small text-muted mb-3">
                              {product.description.length > 100 
                                ? `${product.description.substring(0, 100)}...` 
                                : product.description}
                            </p>
                          )}
                          
                          <div className="d-flex justify-content-between align-items-center mt-auto">
                            <button
                              className="btn btn-link p-0 text-decoration-none"
                              style={{ color: "#C79E63", fontWeight: "500" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowDetails(product.id);
                              }}
                            >
                              Подробнее...
                            </button>
                            <span className="product-price fw-bold" style={{ color: "#FF6F00", fontSize: "1.1rem" }}>
                              ₽ {parseFloat(product.price).toFixed(2)}
                            </span>
                          </div>
                          
                          <div className="mt-2">
                            <small className="text-muted">Количество: {product.quantity} шт.</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Модальное окно "Подробнее" */}
            {showDetails && (
              <>
                <div
                  className="modal-backdrop show"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 1040,
                  }}
                  onClick={() => setShowDetails(null)}
                ></div>

                <div
                  className="modal show d-block"
                  style={{ zIndex: 1050 }}
                  tabIndex="-1"
                >
                  <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content" style={{ color: "#C79E63" }}>
                      <div className="modal-header border-0 pb-0 position-relative">
                        <h5 className="modal-title fw-bold w-100 text-center" style={{ color: "#AA8144", fontSize: "1.3rem" }}>
                          {filteredProducts.find((p) => p.id === showDetails)?.name}
                        </h5>
                        <button
                          type="button"
                          className="btn-close position-absolute top-0 end-0 m-2"
                          onClick={() => setShowDetails(null)}
                        ></button>
                      </div>
                      
                      <div className="modal-body">
                        <div className="row">
                          <div className="col-md-6">
                            <img
                              src={getImageUrl(filteredProducts.find(p => p.id === showDetails))}
                              alt="Товар"
                              className="img-fluid rounded"
                              style={{ maxHeight: '300px', objectFit: 'contain' }}
                              onError={(e) => {
                                e.target.src = "https://via.placeholder.com/400x300?text=Изображение+товара";
                              }}
                            />
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <h6 style={{ color: "#AA8144" }}>Информация о товаре</h6>
                              <div className="mb-2">
                                <strong>Бренд:</strong> {filteredProducts.find(p => p.id === showDetails)?.brand_name || "Не указан"}
                              </div>
                              <div className="mb-2">
                                <strong>Основная категория:</strong> {filteredProducts.find(p => p.id === showDetails)?.main_category || "Не указана"}
                              </div>
                              <div className="mb-2">
                                <strong>Подкатегория:</strong> {filteredProducts.find(p => p.id === showDetails)?.category || "Не указана"}
                              </div>
                              <div className="mb-2">
                                <strong>Цвет:</strong> {filteredProducts.find(p => p.id === showDetails)?.color || "Не указан"}
                              </div>
                              <div className="mb-2">
                                <strong>Цена:</strong> ₽ {parseFloat(filteredProducts.find(p => p.id === showDetails)?.price || 0).toFixed(2)}
                              </div>
                              <div className="mb-3">
                                <strong>Количество:</strong> {filteredProducts.find(p => p.id === showDetails)?.quantity || 0} шт.
                              </div>
                              <div>
                                <strong>Описание:</strong>
                                <p className="mt-1">
                                  {filteredProducts.find(p => p.id === showDetails)?.description || "Нет описания"}
                                </p>
                              </div>
                            </div>
                            
                            {isAuthenticated && (
                              <div className="mt-4">
                                <button
                                  className="btn btn-warning w-100"
                                  onClick={() => {
                                    const product = filteredProducts.find(p => p.id === showDetails);
                                    setShowDetails(null);
                                    handleEditProduct(product);
                                  }}
                                >
                                  <img
                                    src={EditIcon}
                                    alt="Редактировать"
                                    className="me-2"
                                    style={{ width: "16px", height: "16px" }}
                                  />
                                  Редактировать товар
                                </button>
                              </div>
                            )}
                          </div>
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
                            padding: "8px 40px",
                            fontWeight: "600",
                          }}
                        >
                          Закрыть
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