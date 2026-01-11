// import { useState } from "react";
// import Sidebar from "./Sidebar";
// import Header from "./Header";

// import BrandsIcon from "../assets/icon/brands-icon.svg";
// import EditIcon from "../assets/icon/edit-icon.svg";
// import DeleteIcon from "../assets/icon/delete-icon.svg";
// import PlusIcon from "../assets/icon/plus-icon.svg";
// import PlusImageIcon from "../assets/icon/plus-image-icon.svg";

// const BrandsPage = () => {
//   const [isAddingBrand, setIsAddingBrand] = useState(false);
//   const [editingBrand, setEditingBrand] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     country: "",
//     category: "",
//     logo: null,
//     description: "",
//   });

//   const [brands, setBrands] = useState([]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     if (e.target.files.length > 0) {
//       setFormData((prev) => ({ ...prev, logo: e.target.files[0] }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (editingBrand) {
//       setBrands(
//         brands.map((brand) =>
//           brand.id === editingBrand.id ? { ...brand, ...formData } : brand
//         )
//       );
//       setEditingBrand(null);
//     } else {
//       const newBrand = {
//         id: Date.now(),
//         ...formData,
//       };
//       setBrands([...brands, newBrand]);
//     }

//     setFormData({
//       name: "",
//       country: "",
//       category: "",
//       logo: null,
//       description: "",
//     });
//     setIsAddingBrand(false);
//   };

//   const handleDeleteBrand = (id) => {
//     setBrands(brands.filter((brand) => brand.id !== id));
//   };

//   const handleEditBrand = (brand) => {
//     setEditingBrand(brand);
//     setFormData({
//       name: brand.name,
//       country: brand.country,
//       category: brand.category,
//       logo: brand.logo || null,
//       description: brand.description,
//     });
//     setIsAddingBrand(true);
//   };

//   {
//     /* Если в режиме добавления/редактирования — показываем форму */
//   }
//   if (isAddingBrand) {
//     return (
//       <div className="brands-page-container">
//         <Header />
//         <div className="main-content-wrapper">
//           <Sidebar />
//           <main className="brands-content-main">
//             <div className="container-fluid p-4">
//               <div className="d-flex justify-content-center align-items-center mb-4">
//                 <img
//                   src={BrandsIcon}
//                   alt="Бренды"
//                   className="brands-title-icon me-2"
//                 />
//                 <h2 className="brands-main-title text-center">БРЕНДЫ</h2>
//               </div>

//               <h3 className="brands-subtitle mb-4 ms-4">
//                 {editingBrand ? "Редактировать бренд" : "Добавить новый бренд"}
//               </h3>

//               {/* Форма */}
//               <form onSubmit={handleSubmit} className="brands-form">
//                 <div className="row align-items-start d-flex justify-content-between">
//                   <div className="col-md-3">
//                     <label className="form-label">
//                       {editingBrand
//                         ? "Изменить название бренда:"
//                         : "Название бренда:"}
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       placeholder="Введите название..."
//                       required
//                     />
//                   </div>
//                   <div className="col-md-3">
//                     <label className="form-label">Страна:</label>
//                     <select
//                       className="form-select"
//                       name="country"
//                       value={formData.country}
//                       onChange={handleInputChange}
//                       required
//                     >
//                       <option value="">Выберите</option>
//                       <option value="Россия">Россия</option>
//                       <option value="США">США</option>
//                       <option value="Германия">Германия</option>
//                     </select>
//                   </div>
//                   <div className="col-md-3">
//                     <label className="form-label">Категория бренда:</label>
//                     <select
//                       className="form-select"
//                       name="category"
//                       value={formData.category}
//                       onChange={handleInputChange}
//                       required
//                     >
//                       <option value="">Выберите</option>
//                       <option value="Электроника">Электроника</option>
//                       <option value="Одежда">Одежда</option>
//                       <option value="Продукты">Продукты</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div className="mb-3 mt-4">
//                   <label className="form-label">
//                     {editingBrand ? "Изменить логотип:" : "Добавить логотип:"}
//                   </label>
//                   <div className="d-flex align-items-center">
//                     <button
//                       type="button"
//                       className="btn brands-file-btn d-flex align-items-center"
//                       onClick={() =>
//                         document.getElementById("logoInput").click()
//                       }
//                     >
//                       <img
//                         src={PlusImageIcon}
//                         alt="Прикрепить"
//                         className="brands-file-icon me-2"
//                       />
//                       Прикрепить изображение
//                     </button>
//                     <input
//                       id="logoInput"
//                       type="file"
//                       accept="image/*"
//                       className="brands-file-input"
//                       onChange={handleFileChange}
//                     />
//                     <span className="brands-file-name text-muted ms-2">
//                       {formData.logo
//                         ? formData.logo.name
//                         : "Медиафайлы не выбраны"}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="mb-5 mt-5">
//                   <label className="form-label">
//                     {editingBrand ? "Изменить описание:" : "Описание бренда:"}
//                   </label>
//                   <textarea
//                     className="form-control"
//                     name="description"
//                     value={formData.description}
//                     onChange={handleInputChange}
//                     rows="5"
//                     placeholder="Введите описание..."
//                   ></textarea>
//                 </div>

//                 {/* Кнопки в зависимости от режима */}
//                 {editingBrand ? (
//                   // В режиме редактирования - кнопка "Сохранить" в правом углу
//                   <div className="d-flex justify-content-end">
//                     <button
//                       type="submit"
//                       className="btn btn-primary px-4 brands-submit-btn"
//                     >
//                       Сохранить
//                     </button>
//                   </div>
//                 ) : (
//                   // В режиме добавления - кнопка "Готово" посередине
//                   <div className="d-flex justify-content-center">
//                     <button
//                       type="submit"
//                       className="btn btn-primary px-5 brands-submit-btn"
//                     >
//                       Готово
//                     </button>
//                   </div>
//                 )}
//               </form>
//             </div>
//           </main>
//         </div>
//       </div>
//     );
//   }

//   {
//     /* Иначе — показываем список брендов */
//   }
//   return (
//     <div className="brands-page-container">
//       <Header />
//       <div className="main-content-wrapper">
//         <Sidebar />
//         <main className="brands-content-main">
//           <div className="container-fluid p-4">
//             {/* Заголовок "Бренды" с иконкой по центру */}
//             <div className="brands-header d-flex align-items-center justify-content-center mb-4">
//               <img
//                 src={BrandsIcon}
//                 alt="Бренды"
//                 className="brands-title-icon me-3"
//               />
//               <h2 className="brands-main-title">БРЕНДЫ</h2>
//             </div>

//             {/* Форма фильтрации */}
//             <div className="brands-filter-section p-3 rounded mb-4">
//               <div className="row g-3 d-flex align-items-center justify-content-around">
//                 <div className="col-md-3">
//                   <label className="form-label">Название бренда:</label>
//                   <select
//                     className="form-select"
//                     style={{
//                       borderRadius: "8px",
//                       borderColor: "#AA8144",
//                     }}
//                   >
//                     <option>Выберите</option>
//                     {brands.map((brand) => (
//                       <option key={brand.id}>{brand.name}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="col-md-3">
//                   <label className="form-label">Страна:</label>
//                   <select
//                     className="form-select"
//                     style={{
//                       borderRadius: "8px",
//                       borderColor: "#AA8144",
//                     }}
//                   >
//                     <option>Выберите</option>
//                     <option>Россия</option>
//                     <option>США</option>
//                     <option>Германия</option>
//                   </select>
//                 </div>
//                 <div className="col-md-3">
//                   <label className="form-label">Категория товаров:</label>
//                   <select
//                     className="form-select"
//                     style={{
//                       borderRadius: "8px",
//                       borderColor: "#AA8144",
//                     }}
//                   >
//                     <option>Выберите</option>
//                     <option>Электроника</option>
//                     <option>Одежда</option>
//                     <option>Продукты</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="brands-filter-actions mt-3 d-flex align-items-center justify-content-between">
//                 <button
//                   className="btn brands-add-btn d-flex align-items-center justify-content-center"
//                   onClick={() => setIsAddingBrand(true)}
//                   style={{
//                     borderRadius: "20px",
//                     marginLeft: "45px",
//                   }}
//                 >
//                   <img
//                     src={PlusIcon}
//                     alt="Добавить"
//                     style={{
//                       width: "18px",
//                       height: "18px",
//                       marginRight: "10px",
//                     }}
//                   />
//                   Добавить бренд
//                 </button>
//                 <button
//                   className="btn btn-primary brands-search-btn"
//                   style={{ marginRight: "45px" }}
//                 >
//                   Поиск
//                 </button>
//               </div>
//             </div>

//             {/* Таблица брендов */}
//             <div className="brands-table-container">
//               <table className="brands-table">
//                 <thead>
//                   <tr>
//                     <th>№</th>
//                     <th>Название бренда</th>
//                     <th>Страна</th>
//                     <th>Категория</th>
//                     <th>Опции</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {brands.length === 0 ? (
//                     <tr>
//                       <td colSpan="5" className="text-center py-4 brands-empty">
//                         Нет брендов. Нажмите "+ Добавить бренд".
//                       </td>
//                     </tr>
//                   ) : (
//                     brands.map((brand, index) => (
//                       <tr key={brand.id} className="brands-table-row">
//                         <td className="brands-table-cell">{index + 1}</td>
//                         <td className="brands-table-cell">
//                           <img
//                             src={
//                               brand.logo
//                                 ? URL.createObjectURL(brand.logo)
//                                 : "https://via.placeholder.com/24x24?text=logo"
//                             }
//                             alt="Логотип"
//                             className="brands-logo me-2"
//                           />
//                           {brand.name}
//                         </td>
//                         <td className="brands-table-cell">{brand.country}</td>
//                         <td className="brands-table-cell">{brand.category}</td>
//                         <td className="brands-table-cell brands-actions">
//                           {/* Обёртка для выравнивания по центру */}
//                           <div className="d-flex justify-content-center gap-1">
//                             <button
//                               className="brands-edit-btn"
//                               onClick={() => handleEditBrand(brand)}
//                             >
//                               <img
//                                 src={EditIcon}
//                                 alt="Изменить"
//                                 className="brands-action-icon"
//                               />
//                               &nbsp;Изменить
//                             </button>
//                             <button
//                               className="brands-delete-btn"
//                               onClick={() => handleDeleteBrand(brand.id)}
//                             >
//                               <img
//                                 src={DeleteIcon}
//                                 alt="Удалить"
//                                 className="brands-action-icon"
//                               />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default BrandsPage;



import "./BrandsPage.css";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import BrandsIcon from "../assets/icon/brands-icon.svg";
import EditIcon from "../assets/icon/edit-icon.svg";
import DeleteIcon from "../assets/icon/delete-icon.svg";
import PlusIcon from "../assets/icon/plus-icon.svg";
import PlusImageIcon from "../assets/icon/plus-image-icon.svg";

// Базовые URL как в NewsPage
const DJANGO_API = 'http://localhost:8000/product/api';
const DJANGO_MEDIA = 'http://localhost:8000/media';

const BrandsPage = () => {
  const [isAddingBrand, setIsAddingBrand] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    category: "",
    logo: null,
    description: "",
  });
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  const { isAuthenticated } = useAuth();

  console.log('🚀 BrandsPage.jsx загружен!', { isAuthenticated });

  // Загружаем бренды с сервера при монтировании компонента
  useEffect(() => {
    fetchBrands();
  }, []);

  // Функция для получения заголовков с токеном
  const getAuthHeaders = () => {
    const token = localStorage.getItem('access_token');
    return {
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'multipart/form-data'
    };
  };

  // Загружаем бренды с сервера
  const fetchBrands = async () => {
    try {
      setLoading(true);
      console.log('🔍 Запрашиваем бренды по URL:', `${DJANGO_API}/brands/`);
      
      // Публичный эндпоинт, не требует авторизации
      const response = await axios.get(`${DJANGO_API}/brands/`);
      console.log('🏢 Получено брендов:', response.data.results?.length || 0);
      
      setBrands(response.data.results || []);
      setError(null);
    } catch (err) {
      console.error('❌ Ошибка загрузки брендов:', err);
      console.error('Статус:', err.response?.status);
      console.error('Данные:', err.response?.data);
      
      // Проверяем разные ошибки
      if (err.response?.status === 401) {
        setError("Требуется авторизация. Войдите в систему.");
      } else if (err.response?.status === 404) {
        setError("URL не найден. Проверьте настройки сервера.");
        console.error('Проверьте URL:', `${DJANGO_API}/brands/`);
      } else if (err.response?.status === 500) {
        setError("Ошибка сервера. Попробуйте позже.");
      } else if (!err.response) {
        setError("Нет соединения с сервером. Проверьте, запущен ли Django.");
      } else {
        setError("Не удалось загрузить бренды.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log('📁 Выбран файл:', file.name, file.size, file.type);
      
      setFormData((prev) => ({ ...prev, logo: file }));
      
      // Создаем превью для изображения
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Проверяем авторизацию
    if (!isAuthenticated) {
      alert('Требуется авторизация для добавления/редактирования брендов');
      return;
    }
    
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      console.log('🔑 Токен для запроса:', token ? 'Есть' : 'Нет');
      
      // Создаем FormData для отправки файлов
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("country", formData.country);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("description", formData.description);
      
      if (formData.logo instanceof File) {
        formDataToSend.append("logo", formData.logo);
        console.log('📤 Добавляем логотип в FormData:', formData.logo.name);
      } else if (editingBrand && formData.logo === null) {
        // При редактировании, если logo установлен в null - оставляем текущий
        console.log('🔄 Используем текущий логотип');
      }
      
      console.log('📨 Отправляем данные...');

      const config = {
        headers: getAuthHeaders()
      };

      let response;
      if (editingBrand) {
        console.log('✏️ Редактируем бренд ID:', editingBrand.id);
        response = await axios.patch(
          `${DJANGO_API}/brands/${editingBrand.id}/`, 
          formDataToSend, 
          config
        );
      } else {
        console.log('➕ Создаем новый бренд');
        response = await axios.post(
          `${DJANGO_API}/brands/`, 
          formDataToSend, 
          config
        );
      }
      
      console.log('✅ Успешно! Ответ:', response.data);
      
      // Немедленно обновляем список
      await fetchBrands();
      
      // Сбрасываем форму
      setFormData({
        name: "",
        country: "",
        category: "",
        logo: null,
        description: "",
      });
      setPreviewUrl(null);
      setEditingBrand(null);
      setIsAddingBrand(false);
      
      alert(editingBrand ? 'Бренд обновлен!' : 'Бренд добавлен!');
      
    } catch (err) {
      console.error('❌ Ошибка сохранения бренда:', err);
      console.error('Статус:', err.response?.status);
      console.error('Данные:', err.response?.data);
      
      if (err.response?.status === 401) {
        alert('Ошибка авторизации. Войдите снова.');
      } else if (err.response?.status === 400) {
        alert('Ошибка данных: ' + JSON.stringify(err.response?.data));
      } else if (err.response?.status === 403) {
        alert('Доступ запрещен. Недостаточно прав.');
      } else {
        alert('Ошибка: ' + (err.response?.data?.detail || err.message));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBrand = async (id) => {
    if (!window.confirm("Вы уверены, что хотите удалить этот бренд?")) {
      return;
    }
    
    // Проверяем авторизацию
    if (!isAuthenticated) {
      alert('Требуется авторизация для удаления брендов');
      return;
    }
    
    try {
      console.log('🗑️ Удаляем бренд ID:', id);
      
      const config = {
        headers: getAuthHeaders()
      };
      
      await axios.delete(`${DJANGO_API}/brands/${id}/`, config);
      
      console.log('✅ Удалено успешно');
      
      // Обновляем список локально
      setBrands(brands.filter((brand) => brand.id !== id));
      
      alert('Бренд удален!');
      
    } catch (err) {
      console.error('❌ Ошибка удаления бренда:', err);
      console.error('Статус:', err.response?.status);
      console.error('Данные:', err.response?.data);
      
      if (err.response?.status === 401) {
        alert('Ошибка авторизации. Войдите снова.');
      } else if (err.response?.status === 403) {
        alert('Доступ запрещен. Недостаточно прав.');
      } else {
        alert('Ошибка удаления: ' + (err.response?.data?.detail || err.message));
      }
    }
  };

  const handleEditBrand = (brand) => {
    console.log('✏️ Начинаем редактирование бренда:', brand);
    setEditingBrand(brand);
    setFormData({
      name: brand.name,
      country: brand.country,
      category: brand.category,
      logo: null, // Не передаем файл при редактировании
      description: brand.description,
    });
    
    // Показываем текущее изображение если есть
    if (brand.logo_url) {
      console.log('🖼️ Устанавливаем preview из logo_url:', brand.logo_url);
      setPreviewUrl(brand.logo_url);
    } else if (brand.logo && typeof brand.logo === 'string') {
      // Если есть относительный путь
      const fullUrl = brand.logo.startsWith('/') 
        ? `http://localhost:8000${brand.logo}`
        : `${DJANGO_MEDIA}/${brand.logo}`;
      setPreviewUrl(fullUrl);
    }
    
    setIsAddingBrand(true);
  };

  // Функция для получения URL логотипа
  const getLogoUrl = (brand) => {
    if (!brand) {
      return "https://via.placeholder.com/24x24?text=logo";
    }
    
    // 1. Используем logo_url из API если есть
    if (brand.logo_url) {
      return brand.logo_url;
    }
    
    // 2. Если есть относительный путь в поле logo
    if (brand.logo && typeof brand.logo === 'string') {
      // Проверяем разные форматы
      if (brand.logo.startsWith('http')) {
        return brand.logo;
      } else if (brand.logo.startsWith('/')) {
        return `http://localhost:8000${brand.logo}`;
      } else if (brand.logo.includes('brands/')) {
        return `${DJANGO_MEDIA}/${brand.logo}`;
      }
    }
    
    return "https://via.placeholder.com/24x24?text=logo";
  };

  // Показываем превью логотипа
  const renderLogoPreview = () => {
    if (previewUrl) {
      return (
        <div className="mb-2">
          <img
            src={previewUrl}
            alt="Превью логотипа"
            style={{
              maxWidth: "100px",
              maxHeight: "100px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              padding: "4px",
            }}
            onError={(e) => {
              console.error('❌ Ошибка загрузки превью');
              e.target.style.display = 'none';
            }}
          />
          <p className="text-muted small mt-1">
            {formData.logo instanceof File ? 
              'Новое изображение' : 
              'Текущее изображение из базы данных'}
          </p>
        </div>
      );
    }
    return null;
  };

  {
    /* Если в режиме добавления/редактирования — показываем форму */
  }
  if (isAddingBrand) {
    return (
      <div className="brands-page-container">
        <Header />
        <div className="main-content-wrapper">
          <Sidebar />
          <main className="brands-content-main">
            <div className="container-fluid p-4">
              <div className="d-flex justify-content-center align-items-center mb-4">
                <img
                  src={BrandsIcon}
                  alt="Бренды"
                  className="brands-title-icon me-2"
                />
                <h2 className="brands-main-title text-center">БРЕНДЫ</h2>
              </div>

              <h3 className="brands-subtitle mb-4 ms-4">
                {editingBrand ? "Редактировать бренд" : "Добавить новый бренд"}
              </h3>

              {/* Сообщение о необходимости авторизации */}
              {!isAuthenticated && (
                <div className="alert alert-warning mb-4">
                  <strong>⚠️ Внимание!</strong> Для сохранения изменений требуется авторизация.
                </div>
              )}

              {/* Форма */}
              <form onSubmit={handleSubmit} className="brands-form">
                <div className="row align-items-start d-flex justify-content-between">
                  <div className="col-md-3">
                    <label className="form-label">
                      {editingBrand
                        ? "Изменить название бренда:"
                        : "Название бренда:"}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Введите название..."
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Страна:</label>
                    <select
                      className="form-select"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                    >
                      <option value="">Выберите</option>
                      <option value="Россия">Россия</option>
                      <option value="США">США</option>
                      <option value="Германия">Германия</option>
                      <option value="Китай">Китай</option>
                      <option value="Япония">Япония</option>
                      <option value="Италия">Италия</option>
                      <option value="Франция">Франция</option>
                      <option value="Великобритания">Великобритания</option>
                      <option value="Южная Корея">Южная Корея</option>
                      <option value="Другое">Другое</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Категория бренда:</label>
                    <select
                      className="form-select"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                    >
                      <option value="">Выберите</option>
                      <option value="Электроника">Электроника</option>
                      <option value="Одежда">Одежда</option>
                      <option value="Продукты">Продукты</option>
                      <option value="Сельхозтехника">Сельхозтехника</option>
                      <option value="Строительство">Строительство</option>
                      <option value="Красота и здоровье">Красота и здоровье</option>
                      <option value="Автомобили">Автомобили</option>
                      <option value="Мебель">Мебель</option>
                      <option value="Спорт">Спорт</option>
                      <option value="Другое">Другое</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3 mt-4">
                  <label className="form-label">
                    {editingBrand ? "Изменить логотип:" : "Добавить логотип:"}
                    <span className="text-muted ms-2">(необязательно)</span>
                  </label>
                  
                  {renderLogoPreview()}
                  
                  <div className="d-flex align-items-center">
                    <button
                      type="button"
                      className="btn brands-file-btn d-flex align-items-center"
                      onClick={() =>
                        document.getElementById("logoInput").click()
                      }
                      disabled={loading}
                    >
                      <img
                        src={PlusImageIcon}
                        alt="Прикрепить"
                        className="brands-file-icon me-2"
                      />
                      {editingBrand && previewUrl ? "Изменить изображение" : "Прикрепить изображение"}
                    </button>
                    <input
                      id="logoInput"
                      type="file"
                      accept="image/*"
                      className="brands-file-input"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                      disabled={loading}
                    />
                    <span className="brands-file-name text-muted ms-2">
                      {formData.logo instanceof File
                        ? formData.logo.name
                        : editingBrand?.logo_url 
                          ? "Текущий логотип сохранен" 
                          : "Медиафайлы не выбраны"}
                    </span>
                  </div>
                </div>

                <div className="mb-5 mt-5">
                  <label className="form-label">
                    {editingBrand ? "Изменить описание:" : "Описание бренда:"}
                  </label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="5"
                    placeholder="Введите описание..."
                    disabled={loading}
                  ></textarea>
                </div>

                {/* Кнопки в зависимости от режима */}
                {editingBrand ? (
                  // В режиме редактирования - кнопки
                  <div className="d-flex justify-content-between">
                    <button
                      type="button"
                      className="btn btn-secondary px-4"
                      onClick={() => {
                        setIsAddingBrand(false);
                        setEditingBrand(null);
                        setPreviewUrl(null);
                      }}
                      disabled={loading}
                    >
                      Отмена
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary px-4 brands-submit-btn"
                      disabled={loading || !isAuthenticated}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Сохранение...
                        </>
                      ) : (
                        "Сохранить"
                      )}
                    </button>
                  </div>
                ) : (
                  // В режиме добавления - кнопки
                  <div className="d-flex justify-content-between">
                    <button
                      type="button"
                      className="btn btn-secondary px-4"
                      onClick={() => {
                        setIsAddingBrand(false);
                        setPreviewUrl(null);
                      }}
                      disabled={loading}
                    >
                      Отмена
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary px-5 brands-submit-btn"
                      disabled={loading || !isAuthenticated}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Сохранение...
                        </>
                      ) : (
                        "Готово"
                      )}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </main>
        </div>
      </div>
    );
  }

  {
    /* Иначе — показываем список брендов */
  }
  return (
    <div className="brands-page-container">
      <Header />
      <div className="main-content-wrapper">
        <Sidebar />
        <main className="brands-content-main">
          <div className="container-fluid p-4">
            {/* Заголовок "Бренды" с иконкой по центру */}
            <div className="brands-header d-flex align-items-center justify-content-center mb-4">
              <img
                src={BrandsIcon}
                alt="Бренды"
                className="brands-title-icon me-3"
              />
              <h2 className="brands-main-title">БРЕНДЫ</h2>
            </div>

            {/* Панель отладки */}
            {/* <div className="alert alert-info mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">🏢 Система брендов</h5>
                  <div className="small">
                    <span className="badge bg-primary me-2">URL: {DJANGO_API}/brands/</span>
                    <span className="badge bg-success me-2">Брендов: {brands.length}</span>
                    <span className="badge bg-warning">Авторизация: {isAuthenticated ? '✅ Да' : '❌ Нет'}</span>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <button 
                    className="btn btn-sm btn-outline-dark"
                    onClick={() => {
                      console.log('=== DEBUG INFO ===');
                      console.log('URL API:', `${DJANGO_API}/brands/`);
                      console.log('Токен:', localStorage.getItem('access_token'));
                      console.log('Авторизован:', isAuthenticated);
                      console.log('Бренды:', brands);
                      console.log('Ошибка:', error);
                    }}
                  >
                    Консоль
                  </button>
                  {isAuthenticated && (
                    <button 
                      className="btn btn-sm btn-warning"
                      onClick={() => setIsAddingBrand(true)}
                      disabled={loading}
                    >
                      + Добавить бренд
                    </button>
                  )}
                </div>
              </div>
            </div> */}

            {loading && (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Загрузка...</span>
                </div>
                <p className="mt-2">Загрузка брендов...</p>
              </div>
            )}

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
                <button 
                  className="btn btn-sm btn-outline-danger ms-3" 
                  onClick={fetchBrands}
                  disabled={loading}
                >
                  Повторить
                </button>
              </div>
            )}

            {/* Форма фильтрации */}
            <div className="brands-filter-section p-3 rounded mb-4">
              <div className="row g-3 d-flex align-items-center justify-content-around">
                <div className="col-md-3">
                  <label className="form-label">Название бренда:</label>
                  <select
                    className="form-select"
                    style={{
                      borderRadius: "8px",
                      borderColor: "#AA8144",
                    }}
                    disabled={loading}
                  >
                    <option>Выберите</option>
                    {brands.map((brand) => (
                      <option key={brand.id}>{brand.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label">Страна:</label>
                  <select
                    className="form-select"
                    style={{
                      borderRadius: "8px",
                      borderColor: "#AA8144",
                    }}
                    disabled={loading}
                  >
                    <option>Выберите</option>
                    <option>Россия</option>
                    <option>США</option>
                    <option>Германия</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label">Категория товаров:</label>
                  <select
                    className="form-select"
                    style={{
                      borderRadius: "8px",
                      borderColor: "#AA8144",
                    }}
                    disabled={loading}
                  >
                    <option>Выберите</option>
                    <option>Электроника</option>
                    <option>Одежда</option>
                    <option>Продукты</option>
                  </select>
                </div>
              </div>
              <div className="brands-filter-actions mt-3 d-flex align-items-center justify-content-between">
                <button
                  className="btn brands-add-btn d-flex align-items-center justify-content-center"
                  onClick={() => setIsAddingBrand(true)}
                  style={{
                    borderRadius: "20px",
                    marginLeft: "45px",
                  }}
                  disabled={loading || !isAuthenticated}
                >
                  <img
                    src={PlusIcon}
                    alt="Добавить"
                    style={{
                      width: "18px",
                      height: "18px",
                      marginRight: "10px",
                    }}
                  />
                  {isAuthenticated ? "Добавить бренд" : "Требуется вход"}
                </button>
                <button
                  className="btn btn-primary brands-search-btn"
                  style={{ marginRight: "45px" }}
                  disabled={loading}
                >
                  Поиск
                </button>
              </div>
            </div>

            {/* Таблица брендов */}
            <div className="brands-table-container">
              <table className="brands-table">
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Название бренда</th>
                    <th>Страна</th>
                    <th>Категория</th>
                    <th>Опции</th>
                  </tr>
                </thead>
                <tbody>
                  {!loading && brands.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4 brands-empty">
                        {isAuthenticated 
                          ? "Нет брендов. Нажмите 'Добавить бренд'."
                          : "Нет брендов. Войдите в систему для управления."}
                      </td>
                    </tr>
                  ) : (
                    brands.map((brand, index) => (
                      <tr key={brand.id} className="brands-table-row">
                        <td className="brands-table-cell">{index + 1}</td>
                        <td className="brands-table-cell">
                          <img
                            src={getLogoUrl(brand)}
                            alt="Логотип"
                            className="brands-logo me-2"
                            style={{ 
                              width: "24px", 
                              height: "24px", 
                              objectFit: "contain",
                              backgroundColor: '#f8f9fa'
                            }}
                            onError={(e) => {
                              console.error(`❌ Ошибка загрузки логотипа для бренда ${brand.id}`);
                              e.target.src = "https://via.placeholder.com/24x24?text=logo";
                              e.target.style.objectFit = 'contain';
                              e.target.style.padding = '4px';
                            }}
                          />
                          {brand.name}
                        </td>
                        <td className="brands-table-cell">{brand.country}</td>
                        <td className="brands-table-cell">{brand.category}</td>
                        <td className="brands-table-cell brands-actions">
                          <div className="d-flex justify-content-center gap-1">
                            {isAuthenticated && (
                              <>
                                <button
                                  className="brands-edit-btn"
                                  onClick={() => handleEditBrand(brand)}
                                  disabled={loading}
                                >
                                  <img
                                    src={EditIcon}
                                    alt="Изменить"
                                    className="brands-action-icon"
                                  />
                                  &nbsp;Изменить
                                </button>
                                <button
                                  className="brands-delete-btn"
                                  onClick={() => handleDeleteBrand(brand.id)}
                                  disabled={loading}
                                >
                                  <img
                                    src={DeleteIcon}
                                    alt="Удалить"
                                    className="brands-action-icon"
                                  />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BrandsPage;