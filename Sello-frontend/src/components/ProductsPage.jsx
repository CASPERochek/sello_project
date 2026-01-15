
// import { useState, useEffect } from "react";
// import Sidebar from "./Sidebar";
// import Header from "./Header";
// import { useAuth } from "../context/AuthContext";
// import axios from "axios";
// import "./ProductsPage.css";
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

//   // Основные состояния
//   const [isAddingProduct, setIsAddingProduct] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [selectedMainCategory, setSelectedMainCategory] = useState("");
//   const [imagePreview, setImagePreview] = useState(null);

//   // Форма данных
//   const [formData, setFormData] = useState({
//     name: "",
//     brand: "",
//     main_category: "",
//     category: "",
//     color: "",
//     price: "",
//     quantity: "0",
//     image: null,
//     description: "",
//   });

//   // Данные из базы
//   const [products, setProducts] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [categories, setCategories] = useState({});
//   const [allCategories, setAllCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // === СОСТОЯНИЯ ДЛЯ ПОИСКА (ввод vs применение) ===
//   const [filterInputs, setFilterInputs] = useState({
//     searchTerm: "",
//     searchBrand: "",
//     searchMainCategory: "",
//     searchCategory: "",
//     searchColor: "",
//     minPrice: "",
//     maxPrice: ""
//   });

//   const [appliedFilters, setAppliedFilters] = useState({
//     searchTerm: "",
//     searchBrand: "",
//     searchMainCategory: "",
//     searchCategory: "",
//     searchColor: "",
//     minPrice: "",
//     maxPrice: ""
//   });

//   // Модальное окно подробностей
//   const [showDetails, setShowDetails] = useState(null);

//   console.log('🚀 ProductsPage.jsx загружен!', { isAuthenticated });

//   // Загружаем данные при монтировании компонента
//   useEffect(() => {
//     fetchAllData();
//   }, []);

//   // Функция для получения заголовков с токеном
//   const getAuthHeaders = () => {
//     const token = localStorage.getItem('access_token');
//     const headers = {};
//     if (token) {
//       headers['Authorization'] = `Bearer ${token}`;
//     }
//     return headers;
//   };

//   // Загружаем все данные
//   const fetchAllData = async () => {
//     try {
//       setLoading(true);
//       console.log('🔍 Загружаем данные...');

//       const productsResponse = await axios.get(`${DJANGO_API}/products/`);
//       console.log('📦 Получено товаров:', productsResponse.data.results?.length || 0);
//       setProducts(productsResponse.data.results || []);

//       try {
//         const brandsResponse = await axios.get(`${DJANGO_API}/brands/`);
//         console.log('🏢 Получено брендов:', brandsResponse.data.results?.length || 0);
//         setBrands(brandsResponse.data.results || []);
//       } catch (brandsError) {
//         console.warn('⚠️ Не удалось загрузить бренды:', brandsError.message);
//         setBrands([]);
//       }

//       try {
//         const categoriesResponse = await axios.get(`${DJANGO_API}/categories/`);
//         console.log('📊 Получено категорий из базы:', categoriesResponse.data.results?.length || 0);
//         const categoriesList = categoriesResponse.data.results || [];
//         setAllCategories(categoriesList);

//         const formattedCategories = {};
//         categoriesList.forEach(category => {
//           if (!formattedCategories[category.main_category]) {
//             formattedCategories[category.main_category] = [];
//           }
//           formattedCategories[category.main_category].push(category.subcategory);
//         });
//         setCategories(formattedCategories);
//         console.log('📋 Сформированные категории:', formattedCategories);
//       } catch (categoriesError) {
//         console.warn('⚠️ Не удалось загрузить категории из базы:', categoriesError.message);
//         const defaultCategories = {
//           "Грунты и Субстраты": [
//             "Кокосовый субстрат и Перлит/Вермикулит",
//             "Специализированные грунты - Для кактусов",
//             "Специализированные грунты - Для орхидей",
//             "Специализированные грунты - Для рассады",
//             "Специализированные грунты - Для томатов и перцев",
//             "Торф и Кора",
//             "Универсальные грунты",
//           ],
//           "Инвентарь и Аксессуары": [
//             "Ручной инструмент - Вилы",
//             "Ручной инструмент - Грабли",
//             "Ручной инструмент - Лопаты",
//             "Ручной инструмент - Мотыги",
//             "Садовый инструмент - Садовые ножи",
//             "Садовый инструмент - Сапы",
//             "Садовый инструмент - Секаторы",
//             "Садовый инструмент - Совки",
//             "Системы хранения - Органайзеры для семян",
//             "Системы хранения - Стеллажи для рассады",
//             "Средства ухода - Защитные очки",
//             "Средства ухода - Перчатки",
//             "Средства ухода - Садовая обувь",
//             "Тележки и Тачки",
//           ],
//           "Саженцы и Луковицы": [
//             "Виноград - Столовые сорта",
//             "Виноград - Технические сорта",
//             "Декоративные деревья и кустарники - Лиственные",
//             "Декоративные деревья и кустарники - Хвойные",
//             "Луковицы и клубни - Весенние",
//             "Луковицы и клубни - Летние",
//             "Луковицы и клубни - Осенние",
//             "Многолетние цветы",
//             "Плодовые деревья - Косточковые (абрикос, вишня, слива)",
//             "Плодовые деревья - Семечковые (груша, яблоня)",
//             "Розы - Плетистые",
//             "Розы - Почвопокровные",
//             "Розы - Чайно-гибридные",
//             "Ягодные кустарники - Ежевика",
//             "Ягодные кустарники - Крыжовник",
//             "Ягодные кустарники - Малина",
//             "Яборные кустарники - Смородина",
//           ],
//           "Семена": [
//             "Овощные культуры - Бобовые (бобы, горох, фасоль)",
//             "Овощные культуры - Капустные (брокколи, капуста белокочанная, цветная)",
//             "Овощные культуры - Корнеплоды (морковь, редис, свекла)",
//             "Овощные культуры - Листовые и зеленные (петрушка, салат, укроп, шпинат)",
//             "Овощные культуры - Паслёновые (баклажаны, перцы, томаты)",
//             "Овощные культуры - Тыквенные (кабачки, огурцы, тыквы)",
//             "Плодовые культуры - Фруктовые деревья (вишня, груша, яблоня)",
//             "Плодовые культуры - Ягоды (клубника, малина, смородина)",
//             "Семена для фермеров (опт) - Зерновые (овес, пшеница, ячмень)",
//             "Семена для фермеров (опт) - Кормовые травы",
//             "Семена для фермеров (опт) - Масличные (подсолнечник, рапс)",
//             "Цветы - Луковичные (лилии, нарциссы, тюльпаны)",
//             "Цветы - Многолетние (пионы, розы, хосты)",
//             "Цветы - Однолетние (астры, бархатцы, петуния)",
//             "Газонные травы и сидераты - Сидераты (горчица, люпин, фацелия)",
//             "Газонные травы и сидераты - Смеси для газона",
//           ],
//           "Сельская Одежда и Обувь": [
//             "Защитные аксессуары - Каски",
//             "Защитные аксессуары - Наушники",
//             "Защитные аксессуары - Перчатки рабочие",
//             "Одежда в народном стиле",
//             "Рабочая одежда - Брюки",
//             "Рабочая одежда - Комбинезоны",
//             "Рабочая одежда - Куртки",
//             "Спецобувь - Ботинки рабочие",
//             "Спецобувь - Сапоги резиновые",
//           ],
//           "Сельхозтехника и Оборудование": [
//             "Малая техника для сада и огорода - Бензопилы и электропилы",
//             "Малая техника для сада и огорода - Газонокосилки и триммеры",
//             "Малая техника для сада и огорода - Мотоблоки и культиваторы",
//             "Малая техника для сада и огорода - Садовые пылесосы и воздуходувки",
//             "Оборудование для хранения и переработки - Измельчители",
//             "Оборудование для хранения и переработки - Силосы",
//             "Оборудование для хранения и переработки - Сушилки для зерна",
//             "Системы полива - Капельный полив",
//             "Системы полива - Таймеры",
//             "Системы полива - Шланги, разбрызгиватели",
//             "Техника для фермеров - Комбайны",
//             "Техника для фермеров - Опрыскиватели",
//             "Техника для фермеров - Сеялки",
//             "Техника для фермеров - Тракторы и навесное оборудование",
//             "Теплицы и Парники - Каркасы",
//             "Теплицы и Парники - Пленка",
//             "Теплицы и Парники - Поликарбонат",
//           ],
//           "Удобрения и Средства защиты": [
//             "Средства защиты растений (СЗР) - Гербициды (от сорняков)",
//             "Средства защиты растений (СЗР) - Инсектициды (от вредителей)",
//             "Средства защиты растений (СЗР) - Протравители семян",
//             "Средства защиты растений (СЗР) - Фунгициды (от болезней)",
//             "Стимуляторы роста и Биопрепараты - Адаптогены",
//             "Стимуляторы роста и Биопрепараты - Укоренители",
//             "Стимуляторы роста и Биопрепараты - ЭМ-препараты",
//             "Удобрения - Жидкие и водорастворимые удобрения",
//             "Удобрения - Минеральные - Азотные",
//             "Удобрения - Минеральные - Калийные",
//             "Удобрения - Минеральные - Комплексные (NPK)",
//             "Удобрения - Минеральные - Фосфорные",
//             "Удобрения - Микроудобрения",
//             "Удобрения - Органические (биогумус, компост, навоз)",
//           ],
//           "Фермерские Продукты": [
//             "Бакалея - Варенье",
//             "Бакалея - Консервация",
//             "Бакалея - Крупы",
//             "Бакалея - Мёд",
//             "Бакалея - Мука",
//             "Молочная продукция - Молоко",
//             "Молочная продукция - Сметана",
//             "Молочная продукция - Сыр",
//             "Молочная продукция - Творог",
//             "Мясо и птица - Баранина",
//             "Мясо и птица - Говядина",
//             "Мясо и птица - Курица",
//             "Мясо и птица - Свинина",
//             "Свежие овощи и фрукты",
//             "Эко-продукты и Органик",
//           ],
//         };
//         setCategories(defaultCategories);
//       }
//       setError(null);
//     } catch (err) {
//       console.error('❌ Ошибка загрузки данных:', err);
//       console.error('URL запроса:', err.config?.url);
//       console.error('Ответ сервера:', err.response?.data);
//       if (err.response?.status === 404) {
//         setError("API не найден. Проверьте настройки сервера.");
//       } else if (err.response?.status === 500) {
//         setError("Ошибка сервера. Попробуйте позже.");
//       } else if (!err.response) {
//         setError("Нет соединения с сервером. Убедитесь что Django запущен.");
//       } else {
//         setError(`Ошибка: ${err.response?.status} - ${err.response?.statusText}`);
//       }
//       setProducts([]);
//       setBrands([]);
//       setCategories({});
//       setAllCategories([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Функция для добавления новой категории в базу
//   const addCategoryToDatabase = async (mainCategory, subcategory) => {
//     try {
//       const token = localStorage.getItem('access_token');
//       if (!token) {
//         console.warn('Нет токена для добавления категории');
//         return false;
//       }
//       const categoryData = {
//         main_category: mainCategory,
//         subcategory: subcategory
//       };
//       const config = {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       };
//       const response = await axios.post(`${DJANGO_API}/categories/`, categoryData, config);
//       console.log('✅ Категория добавлена в базу:', response.data);
//       setAllCategories(prev => [...prev, response.data]);
//       setCategories(prev => {
//         const newCategories = { ...prev };
//         if (!newCategories[mainCategory]) {
//           newCategories[mainCategory] = [];
//         }
//         if (!newCategories[mainCategory].includes(subcategory)) {
//           newCategories[mainCategory].push(subcategory);
//         }
//         return newCategories;
//       });
//       return true;
//     } catch (err) {
//       console.error('❌ Ошибка добавления категории:', err);
//       return false;
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
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleMainCategoryChange = (e) => {
//     const value = e.target.value;
//     setSelectedMainCategory(value);
//     setFormData(prev => ({
//       ...prev,
//       main_category: value,
//       category: ""
//     }));
//   };

//   const handleBrandChange = (e) => {
//     const brandId = e.target.value;
//     setFormData(prev => ({
//       ...prev,
//       brand: brandId
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isAuthenticated) {
//       alert('Требуется авторизация для добавления/редактирования товаров');
//       return;
//     }
//     if (!formData.name.trim()) {
//       alert('Введите название товара');
//       return;
//     }
//     if (!formData.brand) {
//       alert('Выберите бренд');
//       return;
//     }
//     if (!selectedMainCategory) {
//       alert('Выберите основную категорию');
//       return;
//     }
//     if (!formData.category) {
//       alert('Выберите подкатегорию');
//       return;
//     }
//     if (!formData.price || parseFloat(formData.price) <= 0) {
//       alert('Введите корректную цену');
//       return;
//     }

//     const categoryExists = allCategories.some(
//       cat => cat.main_category === selectedMainCategory && cat.subcategory === formData.category
//     );

//     if (!categoryExists) {
//       const shouldAddCategory = window.confirm(
//         `Категория "${formData.category}" в разделе "${selectedMainCategory}" не найдена в базе данных. Добавить её?`
//       );
//       if (shouldAddCategory) {
//         const added = await addCategoryToDatabase(selectedMainCategory, formData.category);
//         if (!added) {
//           alert('Не удалось добавить категорию в базу данных');
//           return;
//         }
//       }
//     }

//     try {
//       setLoading(true);
//       const formDataToSend = new FormData();
//       formDataToSend.append("name", formData.name.trim());
//       formDataToSend.append("brand", formData.brand);
//       formDataToSend.append("main_category", selectedMainCategory);
//       formDataToSend.append("category", formData.category);
//       formDataToSend.append("color", formData.color || "");
//       formDataToSend.append("price", formData.price);
//       formDataToSend.append("quantity", formData.quantity || "0");
//       formDataToSend.append("description", formData.description || "");

//       if (formData.image instanceof File) {
//         formDataToSend.append("image", formData.image);
//         console.log('📤 Добавляем изображение:', formData.image.name);
//       }

//       console.log('📨 Отправляем данные товара:', {
//         name: formData.name,
//         brand: formData.brand,
//         main_category: selectedMainCategory,
//         category: formData.category,
//         price: formData.price,
//         quantity: formData.quantity,
//         hasImage: !!(formData.image instanceof File)
//       });

//       const config = {
//         headers: {
//           ...getAuthHeaders(),
//           'Content-Type': 'multipart/form-data'
//         }
//       };

//       let response;
//       let url;
//       if (editingProduct) {
//         console.log('✏️ Редактируем товар ID:', editingProduct.id);
//         url = `${DJANGO_API}/products/${editingProduct.id}/`;
//         response = await axios.patch(url, formDataToSend, config);
//       } else {
//         console.log('➕ Создаем новый товар');
//         url = `${DJANGO_API}/products/`;
//         response = await axios.post(url, formDataToSend, config);
//       }

//       console.log('✅ Успешно! Ответ:', response.data);
//       await fetchAllData();
//       resetForm();
//       alert(editingProduct ? 'Товар обновлен!' : 'Товар успешно добавлен!');
//     } catch (err) {
//       console.error('❌ Ошибка сохранения товара:', err);
//       console.error('URL запроса:', err.config?.url);
//       console.error('Статус:', err.response?.status);
//       console.error('Данные ошибки:', err.response?.data);
//       if (err.response?.status === 401) {
//         alert('Ошибка авторизации. Войдите снова.');
//       } else if (err.response?.status === 400) {
//         const errors = err.response.data;
//         let errorMessage = 'Ошибка валидации:\n';
//         Object.keys(errors).forEach(key => {
//           if (Array.isArray(errors[key])) {
//             errorMessage += `${key}: ${errors[key].join(', ')}\n`;
//           } else {
//             errorMessage += `${key}: ${errors[key]}\n`;
//           }
//         });
//         alert(errorMessage);
//       } else if (err.response?.status === 403) {
//         alert('Доступ запрещен. Недостаточно прав.');
//       } else if (err.response?.status === 404) {
//         alert('API не найден. Проверьте настройки сервера.');
//       } else {
//         alert('Ошибка сервера. Попробуйте позже.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       name: "",
//       brand: "",
//       main_category: "",
//       category: "",
//       color: "",
//       price: "",
//       quantity: "0",
//       image: null,
//       description: "",
//     });
//     setSelectedMainCategory("");
//     setImagePreview(null);
//     setEditingProduct(null);
//     setIsAddingProduct(false);
//   };

//   const handleDeleteProduct = async (id) => {
//     if (!window.confirm("Вы уверены, что хотите удалить этот товар?")) {
//       return;
//     }
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
//       setProducts(products.filter((product) => product.id !== id));
//       if (editingProduct && editingProduct.id === id) {
//         resetForm();
//       }
//       alert('Товар удален!');
//     } catch (err) {
//       console.error('❌ Ошибка удаления товара:', err);
//       console.error('Статус:', err.response?.status);
//       if (err.response?.status === 401) {
//         alert('Ошибка авторизации. Войдите снова.');
//       } else if (err.response?.status === 403) {
//         alert('Доступ запрещен. Недостаточно прав.');
//       } else if (err.response?.status === 404) {
//         alert('Товар не найден. Возможно он уже удален.');
//       } else {
//         alert('Ошибка удаления: ' + (err.response?.data?.detail || err.message));
//       }
//     }
//   };

//   const handleEditProduct = (product) => {
//     console.log('✏️ Начинаем редактирование товара:', product);
//     let brandId = "";
//     if (product.brand && typeof product.brand === 'object') {
//       brandId = product.brand.id;
//     } else if (product.brand) {
//       brandId = product.brand;
//     }
//     setEditingProduct(product);
//     setSelectedMainCategory(product.main_category || "");
//     setFormData({
//       name: product.name || "",
//       brand: brandId,
//       main_category: product.main_category || "",
//       category: product.category || "",
//       color: product.color || "",
//       price: product.price || "",
//       quantity: product.quantity?.toString() || "0",
//       image: null,
//       description: product.description || "",
//     });
//     if (product.image_url) {
//       console.log('🖼️ Устанавливаем preview из image_url:', product.image_url);
//       setImagePreview(product.image_url);
//     } else if (product.image && typeof product.image === 'string') {
//       const fullUrl = product.image.startsWith('/')
//         ? `http://localhost:8000${product.image}`
//         : `${DJANGO_MEDIA}/${product.image}`;
//       setImagePreview(fullUrl);
//     } else {
//       setImagePreview(null);
//     }
//     setIsAddingProduct(true);
//   };

//   // === ФИЛЬТРАЦИЯ ПО ПРИМЕНЁННЫМ ФИЛЬТРАМ ===
//   const handleSearch = () => {
//     setAppliedFilters(filterInputs);
//   };

//   const filteredProducts = products.filter(product => {
//     const { searchTerm, searchBrand, searchMainCategory, searchCategory, searchColor, minPrice, maxPrice } = appliedFilters;

//     let matches = true;

//     if (searchTerm) {
//       matches = matches && product.name.toLowerCase().includes(searchTerm.toLowerCase());
//     }

//     if (searchBrand) {
//       const brandName = product.brand_name ||
//         (product.brand && typeof product.brand === 'object' ? product.brand.name : '');
//       matches = matches && brandName.toLowerCase().includes(searchBrand.toLowerCase());
//     }

//     if (searchMainCategory) {
//       matches = matches && product.main_category === searchMainCategory;
//     }

//     if (searchCategory) {
//       matches = matches && product.category === searchCategory;
//     }

//     if (searchColor) {
//       matches = matches && product.color && product.color.toLowerCase().includes(searchColor.toLowerCase());
//     }

//     if (minPrice) {
//       matches = matches && parseFloat(product.price) >= parseFloat(minPrice);
//     }

//     if (maxPrice) {
//       matches = matches && parseFloat(product.price) <= parseFloat(maxPrice);
//     }

//     return matches;
//   });

//   const getImageUrl = (product) => {
//     if (!product) {
//       return "https://via.placeholder.com/300x200?text=Товар";
//     }
//     if (product.image_url) {
//       return product.image_url;
//     }
//     if (product.image && typeof product.image === 'string') {
//       if (product.image.startsWith('http')) {
//         return product.image;
//       } else if (product.image.startsWith('/')) {
//         return `http://localhost:8000${product.image}`;
//       } else if (product.image.includes('products/')) {
//         return `${DJANGO_MEDIA}/${product.image}`;
//       }
//     }
//     return "https://via.placeholder.com/300x200?text=Товар";
//   };

//   const uniqueColors = [...new Set(products.map(p => p.color).filter(Boolean))];
//   const mainCategories = Object.keys(categories);
//   const searchSubcategories = filterInputs.searchMainCategory ? categories[filterInputs.searchMainCategory] || [] : [];

//   if (isAddingProduct) {
//     const subcategories = selectedMainCategory ? categories[selectedMainCategory] || [] : [];
//     return (
//       <div className="products-page-container">
//         <Header />
//         <div className="main-content-wrapper">
//           <Sidebar />
//           <main className="products-content-main">
//             <div className="container-fluid p-4">
//               <div className="d-flex align-items-center justify-content-center mb-4">
//                 <img
//                   src={ProductsIcon}
//                   alt="Товары"
//                   className="news-title-icon me-3"
//                   style={{ width: "29px", height: "28px" }}
//                 />
//                 <h1 className="news-main-title fw-normal">ТОВАРЫ</h1>
//               </div>
//               <h3 className="brands-subtitle mb-4 ms-4">
//                 {editingProduct ? "Редактировать товар" : "Добавить новый товар"}
//               </h3>
//               {!isAuthenticated && (
//                 <div className="alert alert-warning mb-4">
//                   <strong>⚠️ Внимание!</strong> Для сохранения изменений требуется авторизация.
//                 </div>
//               )}
//               <form
//                 onSubmit={handleSubmit}
//                 className="brands-form"
//                 style={{ backgroundColor: "#FFF4E5", padding: "20px", borderRadius: "10px" }}
//               >
//                 <div className="row g-4 mb-4">
//                   <div className="col-md-6">
//                     <label htmlFor="productName" className="form-label fw-bold">
//                       {editingProduct ? "Изменить название товара:" : "Название товара:"} *
//                     </label>
//                     <input
//                       type="text"
//                       id="productName"
//                       className="form-control"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       placeholder="Введите название..."
//                       required
//                       disabled={loading}
//                     />
//                   </div>
//                   <div className="col-md-6">
//                     <label htmlFor="productBrand" className="form-label fw-bold">
//                       Бренд: *
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
//                       <option value="">Выберите бренд</option>
//                       {brands.map((brand) => (
//                         <option key={brand.id} value={brand.id}>
//                           {brand.name}
//                         </option>
//                       ))}
//                     </select>
//                     {brands.length === 0 && (
//                       <small className="text-danger">Нет доступных брендов. Сначала добавьте бренды.</small>
//                     )}
//                   </div>
//                 </div>
//                 <div className="row g-4 mb-4">
//                   <div className="col-md-6">
//                     <label className="form-label fw-bold">
//                       Основная категория: *
//                     </label>
//                     <select
//                       className="form-select"
//                       value={selectedMainCategory}
//                       onChange={handleMainCategoryChange}
//                       required
//                       disabled={loading || mainCategories.length === 0}
//                     >
//                       <option value="">{mainCategories.length === 0 ? "Загрузка категорий..." : "Выберите категорию"}</option>
//                       {mainCategories.map((category) => (
//                         <option key={category} value={category}>
//                           {category}
//                         </option>
//                       ))}
//                     </select>
//                     {mainCategories.length === 0 && !loading && (
//                       <small className="text-danger">Нет категорий. Добавьте категории в базу данных.</small>
//                     )}
//                   </div>
//                   <div className="col-md-6">
//                     <label className="form-label fw-bold">
//                       Подкатегория: *
//                     </label>
//                     <select
//                       className="form-select"
//                       name="category"
//                       value={formData.category}
//                       onChange={handleInputChange}
//                       disabled={!selectedMainCategory || loading || subcategories.length === 0}
//                       required
//                     >
//                       <option value="">{subcategories.length === 0 ? "Выберите основную категорию" : "Выберите подкатегорию"}</option>
//                       {subcategories.map((subCategory) => (
//                         <option key={subCategory} value={subCategory}>
//                           {subCategory}
//                         </option>
//                       ))}
//                     </select>
//                     {selectedMainCategory && subcategories.length === 0 && !loading && (
//                       <small className="text-danger">Нет подкатегорий для выбранной категории</small>
//                     )}
//                   </div>
//                 </div>
//                 <div className="row g-4 mb-4">
//                   <div className="col-md-4">
//                     <label htmlFor="productColor" className="form-label fw-bold">
//                       Цвет:
//                     </label>
//                     <input
//                       type="text"
//                       id="productColor"
//                       className="form-control"
//                       name="color"
//                       value={formData.color}
//                       onChange={handleInputChange}
//                       placeholder="Например: красный"
//                       disabled={loading}
//                     />
//                   </div>
//                   <div className="col-md-4">
//                     <label htmlFor="productPrice" className="form-label fw-bold">
//                       Цена, ₽: *
//                     </label>
//                     <input
//                       type="number"
//                       id="productPrice"
//                       className="form-control"
//                       name="price"
//                       value={formData.price}
//                       onChange={handleInputChange}
//                       placeholder="0.00"
//                       required
//                       min="0"
//                       step="0.01"
//                       disabled={loading}
//                     />
//                   </div>
//                   <div className="col-md-4">
//                     <label htmlFor="productQuantity" className="form-label fw-bold">
//                       Количество:
//                     </label>
//                     <input
//                       type="number"
//                       id="productQuantity"
//                       className="form-control"
//                       name="quantity"
//                       value={formData.quantity}
//                       onChange={handleInputChange}
//                       placeholder="0"
//                       min="0"
//                       disabled={loading}
//                     />
//                   </div>
//                 </div>
//                 <div className="row g-4 mb-4">
//                   <div className="col-12">
//                     <label className="form-label fw-bold">
//                       {editingProduct ? "Изменить изображение:" : "Добавить изображение:"}
//                       <span className="text-muted ms-2">(необязательно)</span>
//                     </label>
//                     {imagePreview && (
//                       <div className="mb-3">
//                         <img
//                           src={imagePreview}
//                           alt="Превью"
//                           style={{
//                             maxWidth: "200px",
//                             maxHeight: "200px",
//                             borderRadius: "8px",
//                             border: "1px solid #ddd",
//                             padding: "4px",
//                             objectFit: "contain"
//                           }}
//                           className="img-fluid"
//                         />
//                         <p className="text-muted small mt-1">
//                           {formData.image instanceof File
//                             ? 'Новое изображение'
//                             : 'Текущее изображение'}
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
//                           border: "none"
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
//                         {editingProduct && imagePreview ? "Изменить изображение" : "Выбрать изображение"}
//                       </button>
//                       <input
//                         id="productImageInput"
//                         type="file"
//                         accept="image/*"
//                         className="form-control"
//                         onChange={handleFileChange}
//                         style={{ display: "none" }}
//                         disabled={loading}
//                       />
//                       <span className="text-muted">
//                         {formData.image instanceof File
//                           ? formData.image.name
//                           : editingProduct?.image
//                             ? "Изображение уже загружено"
//                             : "Файл не выбран"}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row g-4 mb-4">
//                   <div className="col-12">
//                     <label htmlFor="productDescription" className="form-label fw-bold">
//                       {editingProduct ? "Изменить описание товара:" : "Описание товара:"} *
//                     </label>
//                     <textarea
//                       id="productDescription"
//                       className="form-control"
//                       name="description"
//                       value={formData.description}
//                       onChange={handleInputChange}
//                       rows="5"
//                       placeholder="Опишите товар..."
//                       required
//                       disabled={loading}
//                     ></textarea>
//                   </div>
//                 </div>
//                 <div className="mt-4">
//                   {editingProduct ? (
//                     <div className="d-flex justify-content-between">
//                       <div>
//                         <button
//                           type="button"
//                           className="btn btn-secondary me-2 px-4"
//                           onClick={resetForm}
//                           disabled={loading}
//                         >
//                           Отмена
//                         </button>
//                         <button
//                           type="button"
//                           className="btn btn-danger px-4"
//                           onClick={() => handleDeleteProduct(editingProduct.id)}
//                           disabled={loading || !isAuthenticated}
//                         >
//                           <img
//                             src={DeleteWhiteIcon}
//                             alt="Удалить"
//                             className="me-2"
//                             style={{ width: "16px", height: "16px" }}
//                           />
//                           Удалить
//                         </button>
//                       </div>
//                       <button
//                         type="submit"
//                         className="btn btn-primary px-4"
//                         style={{
//                           backgroundColor: "#FF6F00",
//                           borderColor: "#FF6F00",
//                           borderRadius: "20px",
//                           fontWeight: "600",
//                         }}
//                         disabled={loading || !isAuthenticated || !selectedMainCategory || !formData.category}
//                       >
//                         {loading ? (
//                           <>
//                             <span className="spinner-border spinner-border-sm me-2" />
//                             Сохранение...
//                           </>
//                         ) : (
//                           "Сохранить изменения"
//                         )}
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="d-flex justify-content-between">
//                       <button
//                         type="button"
//                         className="btn btn-secondary px-4"
//                         onClick={resetForm}
//                         disabled={loading}
//                       >
//                         Отмена
//                       </button>
//                       <button
//                         type="submit"
//                         className="btn btn-primary px-4"
//                         style={{
//                           backgroundColor: "#FF6F00",
//                           borderColor: "#FF6F00",
//                           borderRadius: "20px",
//                           fontWeight: "600",
//                         }}
//                         disabled={loading || !isAuthenticated || !selectedMainCategory || !formData.category}
//                       >
//                         {loading ? (
//                           <>
//                             <span className="spinner-border spinner-border-sm me-2" />
//                             Добавление...
//                           </>
//                         ) : (
//                           "Добавить товар"
//                         )}
//                       </button>
//                     </div>
//                   )}
//                 </div>
//                 <div className="mt-3">
//                   <small className="text-muted">* - обязательные поля</small>
//                 </div>
//               </form>
//             </div>
//           </main>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="products-page-container">
//       <Header />
//       <div className="main-content-wrapper">
//         <Sidebar />
//         <main className="products-content-main">
//           <div className="container-fluid py-4" style={{ paddingRight: "40px" }}>
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

//             {loading && (
//               <div className="text-center py-4">
//                 <div className="spinner-border text-primary" role="status">
//                   <span className="visually-hidden">Загрузка...</span>
//                 </div>
//                 <p className="mt-2">Загрузка данных...</p>
//               </div>
//             )}

//             {error && !loading && (
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

//             {!loading && (
//               <div className="products-search-section mb-4 p-3 rounded" style={{ backgroundColor: "#FFF4E5" }}>
//                 <div className="row g-3">
//                   <div className="col-md-3">
//                     <label className="form-label">Поиск товара:</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Название товара..."
//                       value={filterInputs.searchTerm}
//                       onChange={(e) => setFilterInputs(prev => ({ ...prev, searchTerm: e.target.value }))}
//                     />
//                   </div>
//                   <div className="col-md-3">
//                     <label className="form-label">Бренд:</label>
//                     <select
//                       className="form-select"
//                       value={filterInputs.searchBrand}
//                       onChange={(e) => setFilterInputs(prev => ({ ...prev, searchBrand: e.target.value }))}
//                     >
//                       <option value="">Все бренды</option>
//                       {brands.map((brand) => (
//                         <option key={brand.id} value={brand.name}>
//                           {brand.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="col-md-3">
//                     <label className="form-label">Основная категория:</label>
//                     <select
//                       className="form-select"
//                       value={filterInputs.searchMainCategory}
//                       onChange={(e) => {
//                         const val = e.target.value;
//                         setFilterInputs(prev => ({
//                           ...prev,
//                           searchMainCategory: val,
//                           searchCategory: ""
//                         }));
//                       }}
//                     >
//                       <option value="">Все категории</option>
//                       {mainCategories.map((category) => (
//                         <option key={category} value={category}>
//                           {category}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="col-md-3">
//                     <label className="form-label">Цвет:</label>
//                     <select
//                       className="form-select"
//                       value={filterInputs.searchColor}
//                       onChange={(e) => setFilterInputs(prev => ({ ...prev, searchColor: e.target.value }))}
//                     >
//                       <option value="">Любой цвет</option>
//                       {uniqueColors.map((color, index) => (
//                         <option key={index} value={color}>
//                           {color}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//                 <div className="row g-3 mt-2">
//                   <div className="col-md-3">
//                     <label className="form-label">Цена от:</label>
//                     <input
//                       type="number"
//                       className="form-control"
//                       placeholder="₽"
//                       value={filterInputs.minPrice}
//                       onChange={(e) => setFilterInputs(prev => ({ ...prev, minPrice: e.target.value }))}
//                     />
//                   </div>
//                   <div className="col-md-3">
//                     <label className="form-label">Цена до:</label>
//                     <input
//                       type="number"
//                       className="form-control"
//                       placeholder="₽"
//                       value={filterInputs.maxPrice}
//                       onChange={(e) => setFilterInputs(prev => ({ ...prev, maxPrice: e.target.value }))}
//                     />
//                   </div>
//                   <div className="col-md-3">
//                     <label className="form-label">Подкатегория:</label>
//                     <select
//                       className="form-select"
//                       value={filterInputs.searchCategory}
//                       onChange={(e) => setFilterInputs(prev => ({ ...prev, searchCategory: e.target.value }))}
//                       disabled={!filterInputs.searchMainCategory}
//                     >
//                       <option value="">Все подкатегории</option>
//                       {searchSubcategories.map((subCategory) => (
//                         <option key={subCategory} value={subCategory}>
//                           {subCategory}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="col-md-3 d-flex align-items-end">
//                     <button
//                       className="btn btn-primary w-100"
//                       onClick={handleSearch}
//                     >
//                       Применить фильтры
//                     </button>
//                   </div>
//                 </div>
//                 <div className="row mt-3">
//                   <div className="col-12">
//                     {isAuthenticated ? (
//                       <button
//                         className="btn d-flex align-items-center"
//                         style={{
//                           backgroundColor: "#FFECB3",
//                           color: "#FFA000",
//                           borderRadius: "18px",
//                           padding: "8px 20px",
//                         }}
//                         onClick={() => setIsAddingProduct(true)}
//                       >
//                         <img
//                           src={PlusIcon}
//                           alt="Добавить"
//                           className="me-2"
//                           style={{ width: "16px", height: "16px" }}
//                         />
//                         Добавить товар
//                       </button>
//                     ) : (
//                       <div className="alert alert-warning mb-0">
//                         Для управления товарами требуется авторизация
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div className="products-grid-section">
//               {!loading && filteredProducts.length === 0 ? (
//                 <div className="text-center py-5">
//                   <div className="display-1 text-muted mb-4">📦</div>
//                   <h4 className="text-muted mb-3">Товаров не найдено</h4>
//                   <p className="text-muted">
//                     {appliedFilters.searchTerm || appliedFilters.searchBrand || appliedFilters.searchMainCategory
//                       ? "Попробуйте изменить критерии поиска"
//                       : isAuthenticated
//                         ? "Добавьте первый товар!"
//                         : "Войдите в систему для управления товарами"}
//                   </p>
//                   {isAuthenticated && !appliedFilters.searchTerm && !appliedFilters.searchBrand && !appliedFilters.searchMainCategory && (
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
//                   {filteredProducts.map((product) => (
//                     <div key={product.id} className="col-12 col-md-6 col-lg-4 col-xl-3">
//                       <div
//                         className="product-card card h-100 shadow-sm border-0 position-relative"
//                         style={{ cursor: 'pointer' }}
//                         onMouseEnter={(e) => {
//                           const icon = e.currentTarget.querySelector('.product-edit-icon');
//                           if (icon) icon.style.opacity = 1;
//                         }}
//                         onMouseLeave={(e) => {
//                           const icon = e.currentTarget.querySelector('.product-edit-icon');
//                           if (icon) icon.style.opacity = 0;
//                         }}
//                       >
//                         <div className="product-image-container position-relative" style={{ height: '200px', overflow: 'hidden' }}>
//                           <img
//                             src={getImageUrl(product)}
//                             alt={product.name}
//                             className="w-100 h-100"
//                             style={{ objectFit: 'cover' }}
//                             onError={(e) => {
//                               console.error('❌ Ошибка загрузки изображения');
//                               e.target.src = "https://via.placeholder.com/300x200?text=Товар";
//                               e.target.style.objectFit = 'contain';
//                               e.target.style.padding = '20px';
//                               e.target.style.backgroundColor = '#f8f9fa';
//                             }}
//                           />
//                           {isAuthenticated && (
//                             <div
//                               className="product-edit-icon position-absolute top-0 end-0 m-2"
//                               style={{
//                                 opacity: 0,
//                                 transition: "opacity 0.3s ease",
//                                 cursor: "pointer",
//                                 backgroundColor: 'rgba(255, 255, 255, 0.9)',
//                                 borderRadius: '50%',
//                                 width: '36px',
//                                 height: '36px',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center'
//                               }}
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleEditProduct(product);
//                               }}
//                               title="Редактировать товар"
//                             >
//                               <img
//                                 src={EditIcon}
//                                 alt="Редактировать"
//                                 style={{ width: "20px", height: "20px" }}
//                               />
//                             </div>
//                           )}
//                           <div className="position-absolute top-0 start-0 m-2">
//                             <span className={`badge ${product.quantity > 10 ? 'bg-success' : product.quantity > 0 ? 'bg-warning' : 'bg-danger'}`}>
//                               {product.quantity > 10 ? 'В наличии' : product.quantity > 0 ? 'Мало' : 'Нет в наличии'}
//                             </span>
//                           </div>
//                         </div>
//                         <div className="card-body d-flex flex-column p-3">
//                           <h6 className="card-title fw-bold mb-2">{product.name}</h6>
//                           <div className="mb-2">
//                             {product.brand_name && (
//                               <small className="text-muted d-block">Бренд: {product.brand_name}</small>
//                             )}
//                             {product.main_category && (
//                               <small className="text-muted d-block">Категория: {product.main_category}</small>
//                             )}
//                             {product.category && (
//                               <small className="text-muted d-block">Подкатегория: {product.category}</small>
//                             )}
//                             {product.color && (
//                               <small className="text-muted d-block">Цвет: {product.color}</small>
//                             )}
//                           </div>
//                           {product.description && (
//                             <p className="card-text small text-muted mb-3">
//                               {product.description.length > 100
//                                 ? `${product.description.substring(0, 100)}...`
//                                 : product.description}
//                             </p>
//                           )}
//                           <div className="d-flex justify-content-between align-items-center mt-auto">
//                             <button
//                               className="btn btn-link p-0 text-decoration-none"
//                               style={{ color: "#C79E63", fontWeight: "500" }}
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 setShowDetails(product.id);
//                               }}
//                             >
//                               Подробнее...
//                             </button>
//                             <span className="product-price fw-bold" style={{ color: "#FF6F00", fontSize: "1.1rem" }}>
//                               ₽ {parseFloat(product.price).toFixed(2)}
//                             </span>
//                           </div>
//                           <div className="mt-2">
//                             <small className="text-muted">Количество: {product.quantity} шт.</small>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {showDetails && (
//               <>
//                 <div
//                   className="modal-backdrop show"
//                   style={{
//                     backgroundColor: "rgba(0, 0, 0, 0.5)",
//                     zIndex: 1040,
//                   }}
//                   onClick={() => setShowDetails(null)}
//                 ></div>
//                 <div
//                   className="modal show d-block"
//                   style={{ zIndex: 1050 }}
//                   tabIndex="-1"
//                 >
//                   <div className="modal-dialog modal-dialog-centered modal-lg">
//                     <div className="modal-content" style={{ color: "#C79E63" }}>
//                       <div className="modal-header border-0 pb-0 position-relative">
//                         <h5 className="modal-title fw-bold w-100 text-center" style={{ color: "#AA8144", fontSize: "1.3rem" }}>
//                           {filteredProducts.find((p) => p.id === showDetails)?.name}
//                         </h5>
//                         <button
//                           type="button"
//                           className="btn-close position-absolute top-0 end-0 m-2"
//                           onClick={() => setShowDetails(null)}
//                         ></button>
//                       </div>
//                       <div className="modal-body">
//                         <div className="row">
//                           <div className="col-md-6">
//                             <img
//                               src={getImageUrl(filteredProducts.find(p => p.id === showDetails))}
//                               alt="Товар"
//                               className="img-fluid rounded"
//                               style={{ maxHeight: '300px', objectFit: 'contain' }}
//                               onError={(e) => {
//                                 e.target.src = "https://via.placeholder.com/400x300?text=Изображение+товара";
//                               }}
//                             />
//                           </div>
//                           <div className="col-md-6">
//                             <div className="mb-3">
//                               <h6 style={{ color: "#AA8144" }}>Информация о товаре</h6>
//                               <div className="mb-2">
//                                 <strong>Бренд:</strong> {filteredProducts.find(p => p.id === showDetails)?.brand_name || "Не указан"}
//                               </div>
//                               <div className="mb-2">
//                                 <strong>Основная категория:</strong> {filteredProducts.find(p => p.id === showDetails)?.main_category || "Не указана"}
//                               </div>
//                               <div className="mb-2">
//                                 <strong>Подкатегория:</strong> {filteredProducts.find(p => p.id === showDetails)?.category || "Не указана"}
//                               </div>
//                               <div className="mb-2">
//                                 <strong>Цвет:</strong> {filteredProducts.find(p => p.id === showDetails)?.color || "Не указан"}
//                               </div>
//                               <div className="mb-2">
//                                 <strong>Цена:</strong> ₽ {parseFloat(filteredProducts.find(p => p.id === showDetails)?.price || 0).toFixed(2)}
//                               </div>
//                               <div className="mb-3">
//                                 <strong>Количество:</strong> {filteredProducts.find(p => p.id === showDetails)?.quantity || 0} шт.
//                               </div>
//                               <div>
//                                 <strong>Описание:</strong>
//                                 <p className="mt-1">
//                                   {filteredProducts.find(p => p.id === showDetails)?.description || "Нет описания"}
//                                 </p>
//                               </div>
//                             </div>
//                             {isAuthenticated && (
//                               <div className="mt-4">
//                                 <button
//                                   className="btn btn-warning w-100"
//                                   onClick={() => {
//                                     const product = filteredProducts.find(p => p.id === showDetails);
//                                     setShowDetails(null);
//                                     handleEditProduct(product);
//                                   }}
//                                 >
//                                   <img
//                                     src={EditIcon}
//                                     alt="Редактировать"
//                                     className="me-2"
//                                     style={{ width: "16px", height: "16px" }}
//                                   />
//                                   Редактировать товар
//                                 </button>
//                               </div>
//                             )}
//                           </div>
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
//                             padding: "8px 40px",
//                             fontWeight: "600",
//                           }}
//                         >
//                           Закрыть
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
    brand: "",
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
  const [categories, setCategories] = useState({});
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // === СОСТОЯНИЯ ДЛЯ ПОИСКА (ввод vs применение) ===
  const [filterInputs, setFilterInputs] = useState({
    searchTerm: "",
    searchBrand: "",
    searchMainCategory: "",
    searchCategory: "",
    searchColor: "",
    minPrice: "",
    maxPrice: ""
  });
  const [appliedFilters, setAppliedFilters] = useState({
    searchTerm: "",
    searchBrand: "",
    searchMainCategory: "",
    searchCategory: "",
    searchColor: "",
    minPrice: "",
    maxPrice: ""
  });

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
      const productsResponse = await axios.get(`${DJANGO_API}/products/`);
      console.log('📦 Получено товаров:', productsResponse.data.results?.length || 0);
      setProducts(productsResponse.data.results || []);

      try {
        const brandsResponse = await axios.get(`${DJANGO_API}/brands/`);
        console.log('🏢 Получено брендов:', brandsResponse.data.results?.length || 0);
        setBrands(brandsResponse.data.results || []);
      } catch (brandsError) {
        console.warn('⚠️ Не удалось загрузить бренды:', brandsError.message);
        setBrands([]);
      }

      try {
        const categoriesResponse = await axios.get(`${DJANGO_API}/categories/`);
        console.log('📊 Получено категорий из базы:', categoriesResponse.data.results?.length || 0);
        const categoriesList = categoriesResponse.data.results || [];
        setAllCategories(categoriesList);
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
      setAllCategories(prev => [...prev, response.data]);
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMainCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedMainCategory(value);
    setFormData(prev => ({
      ...prev,
      main_category: value,
      category: ""
    }));
  };

  const handleBrandChange = (e) => {
    const brandId = e.target.value;
    setFormData(prev => ({
      ...prev,
      brand: brandId
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Требуется авторизация для добавления/редактирования товаров');
      return;
    }
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

    const categoryExists = allCategories.some(
      cat => cat.main_category === selectedMainCategory && cat.subcategory === formData.category
    );
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
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name.trim());
      formDataToSend.append("brand", formData.brand);
      formDataToSend.append("main_category", selectedMainCategory);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("color", formData.color || "");
      formDataToSend.append("price", formData.price);
      formDataToSend.append("quantity", formData.quantity || "0");
      formDataToSend.append("description", formData.description || "");
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
      await fetchAllData();
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

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Вы уверены, что хотите удалить этот товар?")) {
      return;
    }
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
      setProducts(products.filter((product) => product.id !== id));
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

  const handleEditProduct = (product) => {
    console.log('✏️ Начинаем редактирование товара:', product);
    let brandId = "";
    if (product.brand && typeof product.brand === 'object') {
      brandId = product.brand.id;
    } else if (product.brand) {
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
      image: null,
      description: product.description || "",
    });
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

  // === ФИЛЬТРАЦИЯ ПО ПРИМЕНЁННЫМ ФИЛЬТРАМ ===
  const handleSearch = () => {
    setAppliedFilters(filterInputs);
  };

  const filteredProducts = products.filter(product => {
    const { searchTerm, searchBrand, searchMainCategory, searchCategory, searchColor, minPrice, maxPrice } = appliedFilters;
    let matches = true;
    if (searchTerm) {
      matches = matches && product.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    if (searchBrand) {
      const brandName = product.brand_name ||
        (product.brand && typeof product.brand === 'object' ? product.brand.name : '');
      matches = matches && brandName.toLowerCase().includes(searchBrand.toLowerCase());
    }
    if (searchMainCategory) {
      matches = matches && product.main_category === searchMainCategory;
    }
    if (searchCategory) {
      matches = matches && product.category === searchCategory;
    }
    if (searchColor) {
      matches = matches && product.color && product.color.toLowerCase().includes(searchColor.toLowerCase());
    }
    if (minPrice) {
      matches = matches && parseFloat(product.price) >= parseFloat(minPrice);
    }
    if (maxPrice) {
      matches = matches && parseFloat(product.price) <= parseFloat(maxPrice);
    }
    return matches;
  });

  const getImageUrl = (product) => {
    if (!product) {
      return "https://via.placeholder.com/300x200?text=Товар";
    }
    if (product.image_url) {
      return product.image_url;
    }
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

  const uniqueColors = [...new Set(products.map(p => p.color).filter(Boolean))];
  const mainCategories = Object.keys(categories);
  const searchSubcategories = filterInputs.searchMainCategory ? categories[filterInputs.searchMainCategory] || [] : [];

  if (isAddingProduct) {
    const subcategories = selectedMainCategory ? categories[selectedMainCategory] || [] : [];

    return (
      <div className="products-page-container">
        <Header />
        <div className="container-fluid p-0">
          <div className="row g-0">
            {/* Sidebar */}
            <div className="col-auto" style={{ width: '130px', flexShrink: 0 }}>
              <Sidebar />
            </div>
            
            {/* Main Content */}
            <div className="col" style={{ overflowX: 'hidden' }}>
              <main className="products-content-main">
                <div className="container-fluid p-4">
                  <div className="d-flex align-items-center justify-content-center mb-4">
                    <img
                      src={ProductsIcon}
                      alt="Товары"
                      className="news-title-icon me-3"
                      style={{ width: "29px", height: "28px" }}
                    />
                    <h1 className="news-main-title fw-normal">ТОВАРЫ</h1>
                  </div>
                  <h3 className="brands-subtitle mb-4 ms-4">
                    {editingProduct ? "Редактировать товар" : "Добавить новый товар"}
                  </h3>
                  {!isAuthenticated && (
                    <div className="alert alert-warning mb-4">
                      <strong>⚠️ Внимание!</strong> Для сохранения изменений требуется авторизация.
                    </div>
                  )}
                  <form
                    onSubmit={handleSubmit}
                    className="brands-form"
                    style={{ backgroundColor: "#FFF4E5", padding: "20px", borderRadius: "10px" }}
                  >
                    <div className="row g-4 mb-4">
                      <div className="col-md-6">
                        <label htmlFor="productName" className="form-label fw-bold">
                          {editingProduct ? "Изменить название товара:" : "Название товара:"} *
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
                          {editingProduct ? "Изменить изображение:" : "Добавить изображение:"}
                          <span className="text-muted ms-2">(необязательно)</span>
                        </label>
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
                          {editingProduct ? "Изменить описание товара:" : "Описание товара:"} *
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
                    <div className="mt-4">
                      {editingProduct ? (
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
        </div>
      </div>
    );
  }

  return (
    <div className="products-page-container">
      <Header />
      <div className="container-fluid p-0">
        <div className="row g-0">
          {/* Sidebar */}
          <div className="col-auto" style={{ width: '130px', flexShrink: 0 }}>
            <Sidebar />
          </div>
          
          {/* Main Content */}
          <div className="col" style={{ overflowX: 'hidden' }}>
            <main className="products-content-main">
              <div className="container-fluid py-4" style={{ paddingRight: "40px" }}>
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

                {loading && (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Загрузка...</span>
                    </div>
                    <p className="mt-2">Загрузка данных...</p>
                  </div>
                )}

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

                {!loading && (
                  <div className="products-search-section mb-4 p-3 rounded" style={{ backgroundColor: "#FFF4E5" }}>
                    <div className="row g-3">
                      <div className="col-md-3">
                        <label className="form-label">Поиск товара:</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Название товара..."
                          value={filterInputs.searchTerm}
                          onChange={(e) => setFilterInputs(prev => ({ ...prev, searchTerm: e.target.value }))}
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label">Бренд:</label>
                        <select
                          className="form-select"
                          value={filterInputs.searchBrand}
                          onChange={(e) => setFilterInputs(prev => ({ ...prev, searchBrand: e.target.value }))}
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
                          value={filterInputs.searchMainCategory}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFilterInputs(prev => ({
                              ...prev,
                              searchMainCategory: val,
                              searchCategory: ""
                            }));
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
                          value={filterInputs.searchColor}
                          onChange={(e) => setFilterInputs(prev => ({ ...prev, searchColor: e.target.value }))}
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
                          value={filterInputs.minPrice}
                          onChange={(e) => setFilterInputs(prev => ({ ...prev, minPrice: e.target.value }))}
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label">Цена до:</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="₽"
                          value={filterInputs.maxPrice}
                          onChange={(e) => setFilterInputs(prev => ({ ...prev, maxPrice: e.target.value }))}
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label">Подкатегория:</label>
                        <select
                          className="form-select"
                          value={filterInputs.searchCategory}
                          onChange={(e) => setFilterInputs(prev => ({ ...prev, searchCategory: e.target.value }))}
                          disabled={!filterInputs.searchMainCategory}
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
                          onClick={handleSearch}
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

                <div className="products-grid-section">
                  {!loading && filteredProducts.length === 0 ? (
                    <div className="text-center py-5">
                      <div className="display-1 text-muted mb-4">📦</div>
                      <h4 className="text-muted mb-3">Товаров не найдено</h4>
                      <p className="text-muted">
                        {appliedFilters.searchTerm || appliedFilters.searchBrand || appliedFilters.searchMainCategory
                          ? "Попробуйте изменить критерии поиска"
                          : isAuthenticated
                            ? "Добавьте первый товар!"
                            : "Войдите в систему для управления товарами"}
                      </p>
                      {isAuthenticated && !appliedFilters.searchTerm && !appliedFilters.searchBrand && !appliedFilters.searchMainCategory && (
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
                              <div className="position-absolute top-0 start-0 m-2">
                                <span className={`badge ${product.quantity > 10 ? 'bg-success' : product.quantity > 0 ? 'bg-warning' : 'bg-danger'}`}>
                                  {product.quantity > 10 ? 'В наличии' : product.quantity > 0 ? 'Мало' : 'Нет в наличии'}
                                </span>
                              </div>
                            </div>
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
      </div>
    </div>
  );
};

export default ProductsPage;