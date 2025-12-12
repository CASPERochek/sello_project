// import { useState, useEffect } from "react";
// import Sidebar from "./Sidebar";
// import Header from "./Header";
// import { useAuth } from "../context/AuthContext";
// import axios from "axios";

// import NewsIcon from "../assets/icon/news-icon.svg";
// import EditIcon from "../assets/icon/edit-icon.svg";
// import PlusIcon from "../assets/icon/plus-icon-brown.svg";
// import DeleteWhiteIcon from "../assets/icon/delete-white-icon.svg";
// import PlusImageIcon from "../assets/icon/plus-image-icon.svg";
// import NewsImage from "../assets/images/news1.jpg";

// const NewsPage = () => {
//   const [isAddingNews, setIsAddingNews] = useState(false);
//   const [editingNews, setEditingNews] = useState(null);
//   const [formData, setFormData] = useState({
//     title: "",
//     content: "",
//     image: null,
//     category: "general",
//     is_published: true,
//   });
//   const [newsList, setNewsList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [imagePreview, setImagePreview] = useState(null);
//   const { user, isAuthenticated } = useAuth();

//   // Базовый URL
//   const API_BASE = 'http://localhost:8000';

//   // Загрузка новостей
//   useEffect(() => {
//     fetchNews();
//   }, []);

//   const fetchNews = async () => {
//     try {
//       setLoading(true);
//       console.log('🔍 Запрашиваем новости...');
      
//       const response = await axios.get(`${API_BASE}/news/api/news/public/`);
//       console.log('📊 Ответ API:', response.data);
      
//       // Проверяем данные
//       if (response.data && response.data.length > 0) {
//         const firstNews = response.data[0];
//         console.log('📰 Пример данных новости:', {
//           id: firstNews.id,
//           title: firstNews.title,
//           image_url: firstNews.image_url,
//           has_image: !!firstNews.image,
//           image_field: firstNews.image
//         });
//       }
      
//       setNewsList(response.data || []);
      
//     } catch (error) {
//       console.error('❌ Ошибка загрузки:', error.response?.data || error.message);
//       console.log('⚠️ Используем тестовые данные');
      
//       // Тестовые данные с правильной структурой
//       setNewsList([
//         {
//           id: 1,
//           title: "Тестовая новость",
//           content: "Проверка работы системы",
//           image: null,
//           image_url: "http://localhost:8000/media/news/news1.jpg", // Пример пути
//           category: "general",
//           created_at: "2024-12-10T10:00:00Z",
//           created_at_formatted: "10.12.2024",
//           author_name: "Тест",
//           is_published: true
//         }
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({ 
//       ...prev, 
//       [name]: type === 'checkbox' ? checked : value 
//     }));
//   };

//   const handleFileChange = (e) => {
//     if (e.target.files.length > 0) {
//       const file = e.target.files[0];
//       setFormData((prev) => ({ ...prev, image: file }));
      
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!isAuthenticated) {
//       alert('Требуется авторизация');
//       return;
//     }
    
//     try {
//       const token = localStorage.getItem('access_token');
//       console.log('🔑 Токен:', token ? 'Есть' : 'Нет');
      
//       const formDataToSend = new FormData();
//       formDataToSend.append('title', formData.title);
//       formDataToSend.append('content', formData.content);
//       formDataToSend.append('category', formData.category);
//       formDataToSend.append('is_published', formData.is_published);
      
//       if (formData.image) {
//         formDataToSend.append('image', formData.image);
//         console.log('📤 Добавляем изображение:', formData.image.name);
//       }

//       const config = {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data'
//         }
//       };

//       let url, method;
//       if (editingNews) {
//         url = `${API_BASE}/news/api/news/${editingNews.id}/`;
//         method = 'put';
//         console.log('✏️ Редактируем новость ID:', editingNews.id);
//       } else {
//         url = `${API_BASE}/news/api/news/`;
//         method = 'post';
//         console.log('➕ Создаем новую новость');
//       }

//       const response = await axios[method](url, formDataToSend, config);
//       console.log('✅ Успешно! Ответ:', response.data);

//       // Немедленно обновляем список
//       await fetchNews();
      
//       // Сбрасываем форму
//       setFormData({
//         title: "",
//         content: "",
//         image: null,
//         category: "general",
//         is_published: true,
//       });
//       setImagePreview(null);
//       setIsAddingNews(false);
//       setEditingNews(null);
      
//       alert(editingNews ? 'Новость обновлена!' : 'Новость добавлена!');
      
//     } catch (error) {
//       console.error('❌ Ошибка сохранения:', error);
//       console.error('Статус:', error.response?.status);
//       console.error('Данные:', error.response?.data);
      
//       if (error.response?.status === 401) {
//         alert('Ошибка авторизации. Войдите снова.');
//       } else {
//         alert('Ошибка: ' + (error.response?.data?.detail || error.message));
//       }
//     }
//   };

//   const handleDeleteNews = async (id) => {
//     if (!window.confirm('Удалить эту новость?')) {
//       return;
//     }

//     if (!isAuthenticated) {
//       alert('Требуется авторизация');
//       return;
//     }

//     try {
//       const token = localStorage.getItem('access_token');
//       console.log('🗑️ Удаляем новость ID:', id);
      
//       const response = await axios.delete(`${API_BASE}/news/api/news/${id}/`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       console.log('✅ Удалено успешно:', response.data);
      
//       // Обновляем список
//       setNewsList(newsList.filter(news => news.id !== id));
      
//       // Если удаляем редактируемую новость, сбрасываем форму
//       if (editingNews && editingNews.id === id) {
//         setEditingNews(null);
//         setFormData({
//           title: "",
//           content: "",
//           image: null,
//           category: "general",
//           is_published: true,
//         });
//         setImagePreview(null);
//         setIsAddingNews(false);
//       }
      
//       alert('Новость удалена!');
      
//     } catch (error) {
//       console.error('❌ Ошибка удаления:', error);
//       console.error('Статус:', error.response?.status);
//       console.error('Данные:', error.response?.data);
      
//       if (error.response?.status === 401) {
//         alert('Ошибка авторизации. Войдите снова.');
//       } else {
//         alert('Ошибка удаления: ' + (error.response?.data?.detail || error.message));
//       }
//     }
//   };

//   const handleEditNews = (news) => {
//     console.log('✏️ Начинаем редактирование:', news);
//     setEditingNews(news);
//     setFormData({
//       title: news.title,
//       content: news.content,
//       image: null,
//       category: news.category || "general",
//       is_published: news.is_published,
//     });
    
//     // Показываем текущее изображение если есть
//     const imageUrl = getImageUrl(news);
//     if (imageUrl && imageUrl !== NewsImage) {
//       setImagePreview(imageUrl);
//     } else {
//       setImagePreview(null);
//     }
    
//     setIsAddingNews(true);
//   };

//   // УЛУЧШЕННАЯ функция для получения URL изображения
//   const getImageUrl = (news) => {
//     if (!news) return NewsImage;
    
//     console.log('🖼️ Новость ID:', news.id);
//     console.log('Данные изображения:', {
//       image: news.image,
//       image_url: news.image_url
//     });
    
//     // 1. Пробуем image_url из API (самый надежный способ)
//     if (news.image_url) {
//       console.log('✅ Используем image_url:', news.image_url);
//       return news.image_url;
//     }
    
//     // 2. Если есть image как строка (относительный путь)
//     if (typeof news.image === 'string' && news.image.trim() !== '') {
//       // Если это уже полный URL
//       if (news.image.startsWith('http')) {
//         console.log('🌐 Используем полный URL:', news.image);
//         return news.image;
//       }
      
//       // Если это путь
//       let imagePath = news.image;
      
//       // Убираем лишние слэши
//       if (imagePath.startsWith('/')) {
//         imagePath = imagePath.substring(1);
//       }
      
//       // Проверяем, есть ли уже media/ в пути
//       if (!imagePath.startsWith('media/')) {
//         imagePath = `media/${imagePath}`;
//       }
      
//       const fullUrl = `${API_BASE}/${imagePath}`;
//       console.log('🔗 Строим URL:', fullUrl);
//       return fullUrl;
//     }
    
//     // 3. Если ничего не сработало, используем заглушку
//     console.log('🔄 Используем заглушку');
//     return NewsImage;
//   };

//   const containerStyle = {
//     minHeight: '100vh',
//     backgroundColor: '#f8f9fa'
//   };

//   const mainContentStyle = {
//     flex: 1,
//     padding: '20px',
//     marginLeft: '250px'
//   };

//   // Создаем функцию для проверки существования медиапапки
//   const checkMediaFolder = async () => {
//     try {
//       const response = await axios.get(`${API_BASE}/media/news/`);
//       console.log('📁 Содержимое медиапапки:', response.data);
//     } catch (error) {
//       console.log('⚠️ Медиапапка недоступна или пуста');
//     }
//   };

//   // Добавляем чекбокс публикации в форму
//   const renderForm = () => (
//     <form onSubmit={handleSubmit} className="p-4" style={{ backgroundColor: "#FFF4E5", borderRadius: "10px" }}>
//       <div className="mb-3">
//         <label className="form-label fw-bold">Заголовок *</label>
//         <input
//           type="text"
//           className="form-control"
//           name="title"
//           value={formData.title}
//           onChange={handleInputChange}
//           required
//         />
//       </div>

//       <div className="mb-3">
//         <label className="form-label fw-bold">Категория</label>
//         <select
//           className="form-select"
//           name="category"
//           value={formData.category}
//           onChange={handleInputChange}
//           required
//         >
//           <option value="general">Общие</option>
//           <option value="updates">Обновления</option>
//           <option value="promotions">Акции</option>
//           <option value="tech">Технологии</option>
//         </select>
//       </div>

//       <div className="mb-3">
//         <label className="form-label fw-bold">Изображение</label>
//         <div className="d-flex align-items-center gap-2 mb-2">
//           <button
//             type="button"
//             className="btn btn-outline-warning"
//             onClick={() => document.getElementById("imageInput").click()}
//           >
//             Выбрать файл
//           </button>
//           <input
//             id="imageInput"
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             style={{ display: 'none' }}
//           />
//           <span className="text-muted">
//             {formData.image ? formData.image.name : "Файл не выбран"}
//           </span>
//         </div>
        
//         {imagePreview && (
//           <div className="mt-2">
//             <img 
//               src={imagePreview} 
//               alt="Превью" 
//               style={{ maxWidth: '200px', maxHeight: '150px', objectFit: 'cover' }}
//               className="border rounded"
//             />
//           </div>
//         )}
        
//         {editingNews && editingNews.image_url && !formData.image && !imagePreview && (
//           <div className="mt-2">
//             <p className="text-muted small">Текущее изображение:</p>
//             <img 
//               src={getImageUrl(editingNews)} 
//               alt="Текущее" 
//               style={{ maxWidth: '200px', maxHeight: '150px', objectFit: 'cover' }}
//               className="border rounded"
//             />
//           </div>
//         )}
//       </div>

//       <div className="mb-3">
//         <div className="form-check">
//           <input
//             className="form-check-input"
//             type="checkbox"
//             name="is_published"
//             id="is_published"
//             checked={formData.is_published}
//             onChange={handleInputChange}
//           />
//           <label className="form-check-label fw-bold" htmlFor="is_published">
//             Опубликовать
//           </label>
//         </div>
//       </div>

//       <div className="mb-4">
//         <label className="form-label fw-bold">Описание *</label>
//         <textarea
//           className="form-control"
//           name="content"
//           rows="5"
//           value={formData.content}
//           onChange={handleInputChange}
//           required
//         />
//       </div>

//       <div className="d-flex justify-content-between">
//         <div>
//           {editingNews && (
//             <button
//               type="button"
//               className="btn btn-danger me-2"
//               onClick={() => handleDeleteNews(editingNews.id)}
//             >
//               Удалить
//             </button>
//           )}
//           <button
//             type="button"
//             className="btn btn-secondary"
//             onClick={() => {
//               setIsAddingNews(false);
//               setEditingNews(null);
//               setImagePreview(null);
//             }}
//           >
//             Отмена
//           </button>
//         </div>
//         <button
//           type="submit"
//           className="btn btn-warning"
//           style={{ backgroundColor: '#FF6F00', color: 'white' }}
//           disabled={loading}
//         >
//           {loading ? 'Сохранение...' : editingNews ? 'Сохранить' : 'Добавить'}
//         </button>
//       </div>
//     </form>
//   );

//   if (isAddingNews) {
//     return (
//       <div className="news-page-container" style={containerStyle}>
//         <Header />
//         <div className="main-content-wrapper" style={{ display: 'flex', minHeight: 'calc(100vh - 56px)' }}>
//           <Sidebar />
//           <main className="news-content-main" style={mainContentStyle}>
//             <div className="container-fluid p-4">
//               <div className="d-flex align-items-center justify-content-center mb-4">
//                 <img src={NewsIcon} alt="Новости" style={{ width: "29px", height: "28px" }} className="me-3" />
//                 <h1 className="news-main-title fw-normal">НОВОСТИ</h1>
//               </div>

//               <h3 className="brands-subtitle mb-4 ms-4">
//                 {editingNews ? "Редактировать новость" : "Добавить новость"}
//               </h3>

//               {renderForm()}
//             </div>
//           </main>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="news-page-container" style={containerStyle}>
//       <Header />
//       <div className="main-content-wrapper" style={{ display: 'flex', minHeight: 'calc(100vh - 56px)' }}>
//         <Sidebar />
//         <main className="news-content-main" style={mainContentStyle}>
//           <div className="container-fluid py-4">
            
//             {/* ОТЛАДОЧНАЯ ИНФОРМАЦИЯ */}
//             {/* <div className="alert alert-dark mb-4">
//               <h5>🔧 Отладка</h5>
//               <div>Токен: {localStorage.getItem('access_token') ? '✅ Есть' : '❌ Нет'}</div>
//               <div>Авторизован: {isAuthenticated ? '✅ Да' : '❌ Нет'}</div>
//               <div>Новостей: {newsList.length}</div>
//               <div className="d-flex gap-2 mt-2">
//                 <button 
//                   className="btn btn-sm btn-outline-info"
//                   onClick={() => {
//                     console.log('📊 Все новости:', newsList);
//                     newsList.forEach((news, idx) => {
//                       console.log(`Новость ${idx + 1}:`, {
//                         id: news.id,
//                         title: news.title,
//                         image: news.image,
//                         image_url: news.image_url
//                       });
//                     });
//                   }}
//                 >
//                   Показать данные в консоли
//                 </button>
//                 <button 
//                   className="btn btn-sm btn-outline-secondary"
//                   onClick={checkMediaFolder}
//                 >
//                   Проверить медиапапку
//                 </button>
//               </div>
//             </div> */}

//             {/* ЗАГОЛОВОК */}
//             <div className="d-flex justify-content-between align-items-center mb-4">
//               <div className="d-flex align-items-center">
//                 <img src={NewsIcon} alt="Новости" style={{ width: "32px", height: "32px" }} className="me-3" />
//                 <h1 className="fw-bold" style={{ color: '#886128' }}>НОВОСТИ</h1>
//               </div>
//               {isAuthenticated && (
//                 <button
//                   className="btn btn-outline-warning d-flex align-items-center"
//                   onClick={() => setIsAddingNews(true)}
//                 >
//                   <img src={PlusIcon} alt="Добавить" className="me-2" style={{ width: "18px", height: "18px" }} />
//                   Добавить новость
//                 </button>
//               )}
//             </div>

//             {/* ОСНОВНЫЕ НОВОСТИ */}
//             <div className="row mb-5">
//               <div className="col-lg-6 mb-4 mb-lg-0">
//                 {newsList[0] ? (
//                   <div className="card h-100 border-0 shadow">
//                     <div style={{ height: '300px', overflow: 'hidden', backgroundColor: '#f0f0f0' }}>
//                       <img
//                         src={getImageUrl(newsList[0])}
//                         alt={newsList[0].title}
//                         className="w-100 h-100"
//                         style={{ objectFit: 'cover' }}
//                         onError={(e) => {
//                           console.error('❌ Ошибка загрузки изображения:', newsList[0].image_url);
//                           e.target.src = NewsImage;
//                         }}
//                       />
//                     </div>
//                     <div className="card-body">
//                       <h3 className="card-title fw-bold">{newsList[0].title}</h3>
//                       <p className="card-text">{newsList[0].content}</p>
//                       <div className="d-flex justify-content-between align-items-center mt-3">
//                         <small className="text-muted">
//                           {newsList[0].created_at_formatted} • {newsList[0].category}
//                         </small>
//                         <small className="text-muted">{newsList[0].author_name}</small>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="card h-100 border-0 shadow">
//                     <div style={{ height: '300px', backgroundColor: '#f0f0f0' }} />
//                     <div className="card-body">
//                       <h3 className="card-title fw-bold">Заголовок новости</h3>
//                       <p className="card-text">Описание новости появится здесь</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
              
//               <div className="col-lg-6">
//                 <div className="row g-4 h-100">
//                   {[1, 2].map((idx) => (
//                     <div key={idx} className="col-12">
//                       {newsList[idx] ? (
//                         <div className="card border-0 shadow h-100">
//                           <div className="row g-0 h-100">
//                             <div className="col-4" style={{ backgroundColor: '#f0f0f0' }}>
//                               <img
//                                 src={getImageUrl(newsList[idx])}
//                                 alt={newsList[idx].title}
//                                 className="w-100 h-100"
//                                 style={{ objectFit: 'cover' }}
//                                 onError={(e) => {
//                                   console.error('❌ Ошибка загрузки изображения:', newsList[idx].image_url);
//                                   e.target.src = NewsImage;
//                                 }}
//                               />
//                             </div>
//                             <div className="col-8">
//                               <div className="card-body">
//                                 <h5 className="card-title fw-bold">{newsList[idx].title}</h5>
//                                 <p className="card-text small">{newsList[idx].content.substring(0, 100)}...</p>
//                                 <div className="d-flex justify-content-between align-items-center mt-2">
//                                   <small className="text-muted">{newsList[idx].category}</small>
//                                   <small className="text-muted">{newsList[idx].author_name}</small>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       ) : (
//                         <div className="card border-0 shadow h-100">
//                           <div className="row g-0 h-100">
//                             <div className="col-4 bg-light" />
//                             <div className="col-8">
//                               <div className="card-body">
//                                 <h5 className="card-title fw-bold">Заголовок</h5>
//                                 <p className="card-text small">Краткое описание</p>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* ЛЕНТА НОВОСТЕЙ */}
//             <div className="mt-5">
//               <h3 className="fw-bold mb-4" style={{ color: '#886128' }}>Лента новостей</h3>
              
//               {loading ? (
//                 <div className="text-center py-5">
//                   <div className="spinner-border text-warning" />
//                   <p className="mt-2">Загрузка...</p>
//                 </div>
//               ) : newsList.length === 0 ? (
//                 <div className="text-center py-5">
//                   <p className="text-muted">Нет новостей для отображения</p>
//                   {isAuthenticated && (
//                     <button
//                       className="btn btn-warning mt-2"
//                       onClick={() => setIsAddingNews(true)}
//                     >
//                       Добавить первую новость
//                     </button>
//                   )}
//                 </div>
//               ) : (
//                 <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
//                   {newsList.map((news) => (
//                     <div key={news.id} className="col">
//                       <div className="card h-100 border-0 shadow-sm">
//                         <div style={{ height: '180px', overflow: 'hidden', position: 'relative', backgroundColor: '#f0f0f0' }}>
//                           <img
//                             src={getImageUrl(news)}
//                             alt={news.title}
//                             className="w-100 h-100"
//                             style={{ objectFit: 'cover' }}
//                             onError={(e) => {
//                               console.error('❌ Ошибка загрузки изображения для новости', news.id, ':', news.image_url);
//                               e.target.src = NewsImage;
//                             }}
//                           />
//                           {isAuthenticated && (
//                             <button
//                               className="position-absolute top-0 end-0 m-2 btn btn-light btn-sm shadow"
//                               onClick={() => handleEditNews(news)}
//                               title="Редактировать"
//                               style={{ borderRadius: '50%', width: '32px', height: '32px' }}
//                             >
//                               ✏️
//                             </button>
//                           )}
//                         </div>
//                         <div className="card-body">
//                           <h6 className="card-title fw-bold">{news.title}</h6>
//                           <p className="card-text small text-muted">
//                             {news.content.length > 80 ? `${news.content.substring(0, 80)}...` : news.content}
//                           </p>
//                           <div className="d-flex justify-content-between align-items-center mt-3">
//                             <small className="text-muted">
//                               {news.created_at_formatted} • {news.category}
//                             </small>
//                             <small className="text-muted">{news.author_name}</small>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* КНОПКА ТЕСТИРОВАНИЯ */}
//             <div className="mt-5 text-center">
              
              
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default NewsPage;




import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

import NewsIcon from "../assets/icon/news-icon.svg";
import PlusIcon from "../assets/icon/plus-icon-brown.svg";
import NewsImage from "../assets/images/news1.jpg";

const NewsPage = () => {
  const [isAddingNews, setIsAddingNews] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
    category: "general",
    is_published: true,
  });
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const { user, isAuthenticated } = useAuth();

  // Базовые URL
  const DJANGO_API = 'http://localhost:8000/news/api';
  const DJANGO_MEDIA = 'http://localhost:8000/media';

  // Загрузка новостей
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      console.log('🔍 Запрашиваем новости...');
      
      const response = await axios.get(`${DJANGO_API}/news/public/`);
      console.log('📰 Получено новостей:', response.data.length);
      
      // Проверяем данные первой новости
      if (response.data.length > 0) {
        const firstNews = response.data[0];
        console.log('📊 Пример данных новости:', {
          id: firstNews.id,
          title: firstNews.title,
          image_url: firstNews.image_url,
          has_image: !!firstNews.image
        });
      }
      
      setNewsList(response.data || []);
      
    } catch (error) {
      console.error('❌ Ошибка загрузки:', error);
      console.error('Статус:', error.response?.status);
      console.error('Данные:', error.response?.data);
      setNewsList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log('📁 Выбран файл:', file.name, file.size, file.type);
      
      setFormData(prev => ({ ...prev, image: file }));
      
      // Создаем preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      alert('Требуется авторизация');
      return;
    }
    
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      console.log('🔑 Токен:', token ? 'Есть' : 'Нет');
      
      // Создаем FormData
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('is_published', formData.is_published);
      
      if (formData.image instanceof File) {
        formDataToSend.append('image', formData.image);
        console.log('📤 Добавляем изображение в FormData:', formData.image.name);
      } else if (editingNews && formData.image === null) {
        // При редактировании, если image установлен в null - удаляем изображение
        formDataToSend.append('image', '');
      }
      
      console.log('📨 Отправляем данные...');

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      };

      let url, method;
      if (editingNews) {
        url = `${DJANGO_API}/news/${editingNews.id}/`;
        method = 'put';
        console.log('✏️ Редактируем новость ID:', editingNews.id);
      } else {
        url = `${DJANGO_API}/news/`;
        method = 'post';
        console.log('➕ Создаем новую новость');
      }

      const response = await axios[method](url, formDataToSend, config);
      console.log('✅ Успешно! Ответ:', response.data);

      // Немедленно обновляем список
      await fetchNews();
      
      // Сбрасываем форму
      resetForm();
      
      alert(editingNews ? 'Новость обновлена!' : 'Новость добавлена!');
      
    } catch (error) {
      console.error('❌ Ошибка сохранения:', error);
      console.error('Статус:', error.response?.status);
      console.error('Данные:', error.response?.data);
      console.error('Headers:', error.response?.headers);
      
      if (error.response?.status === 401) {
        alert('Ошибка авторизации. Войдите снова.');
      } else if (error.response?.status === 400) {
        alert('Ошибка данных: ' + JSON.stringify(error.response?.data));
      } else {
        alert('Ошибка: ' + (error.response?.data?.detail || error.message));
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      image: null,
      category: "general",
      is_published: true,
    });
    setImagePreview(null);
    setIsAddingNews(false);
    setEditingNews(null);
  };

  const handleDeleteNews = async (id) => {
    if (!window.confirm('Удалить эту новость?')) {
      return;
    }

    if (!isAuthenticated) {
      alert('Требуется авторизация');
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      console.log('🗑️ Удаляем новость ID:', id);
      
      const response = await axios.delete(`${DJANGO_API}/news/${id}/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('✅ Удалено успешно:', response.data);
      
      // Обновляем список
      setNewsList(newsList.filter(news => news.id !== id));
      
      // Если удаляем редактируемую новость, сбрасываем форму
      if (editingNews && editingNews.id === id) {
        resetForm();
      }
      
      alert('Новость удалена!');
      
    } catch (error) {
      console.error('❌ Ошибка удаления:', error);
      console.error('Статус:', error.response?.status);
      console.error('Данные:', error.response?.data);
      
      if (error.response?.status === 401) {
        alert('Ошибка авторизации. Войдите снова.');
      } else {
        alert('Ошибка удаления: ' + (error.response?.data?.detail || error.message));
      }
    }
  };

  const handleEditNews = (news) => {
    console.log('✏️ Начинаем редактирование:', news);
    setEditingNews(news);
    setFormData({
      title: news.title,
      content: news.content,
      image: null, // Не передаем файл при редактировании
      category: news.category || "general",
      is_published: news.is_published,
    });
    
    // Показываем текущее изображение если есть
    if (news.image_url) {
      console.log('🖼️ Устанавливаем preview из image_url:', news.image_url);
      setImagePreview(news.image_url);
    }
    
    setIsAddingNews(true);
  };

  // Функция для получения URL изображения
  const getImageUrl = (news) => {
    if (!news) {
      console.log('❌ Нет данных новости');
      return NewsImage;
    }
    
    console.log('🖼️ Получаем URL для новости', news.id, ':', {
      image: news.image,
      image_url: news.image_url
    });
    
    // 1. Используем image_url из API если есть
    if (news.image_url) {
      console.log('✅ Используем image_url:', news.image_url);
      return news.image_url;
    }
    
    // 2. Если есть относительный путь в поле image
    if (news.image && typeof news.image === 'string') {
      // Проверяем разные форматы
      if (news.image.startsWith('http')) {
        console.log('🌐 Используем полный URL:', news.image);
        return news.image;
      } else if (news.image.startsWith('/')) {
        const url = `http://localhost:8000${news.image}`;
        console.log('🔗 Строим URL из пути:', url);
        return url;
      } else if (news.image.includes('news/')) {
        const url = `${DJANGO_MEDIA}/${news.image}`;
        console.log('📁 Строим URL из имени файла:', url);
        return url;
      }
    }
    
    console.log('🔄 Используем заглушку');
    return NewsImage;
  };

  // Проверка медиафайлов
  const checkMedia = async () => {
    try {
      const response = await axios.get(`${DJANGO_API}/news/check_media/`);
      console.log('📁 Проверка медиа:', response.data);
      
      alert(`📊 Статус медиафайлов:\n
Путь: ${response.data.news_path}
Существует: ${response.data.exists ? '✅ Да' : '❌ Нет'}
Файлов: ${response.data.files_count}
Список: ${response.data.files.join(', ') || 'нет файлов'}`);
      
    } catch (error) {
      console.error('Ошибка проверки медиа:', error);
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa'
  };

  const mainContentStyle = {
    flex: 1,
    padding: '20px',
    marginLeft: '250px'
  };

  // Форма добавления/редактирования
  const renderForm = () => (
    <form onSubmit={handleSubmit} className="p-4" style={{ backgroundColor: "#FFF4E5", borderRadius: "10px" }}>
      <div className="mb-3">
        <label className="form-label fw-bold">Заголовок *</label>
        <input
          type="text"
          className="form-control"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          placeholder="Введите заголовок новости"
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Категория</label>
        <select
          className="form-select"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
        >
          <option value="general">Общие</option>
          <option value="updates">Обновления</option>
          <option value="promotions">Акции</option>
          <option value="tech">Технологии</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Изображение</label>
        <div className="d-flex align-items-center gap-2 mb-2">
          <label htmlFor="imageInput" className="btn btn-outline-warning mb-0">
            Выбрать файл
          </label>
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <span className="text-muted">
            {formData.image instanceof File ? formData.image.name : "Файл не выбран"}
          </span>
        </div>
        
        {/* Превью */}
        {imagePreview && (
          <div className="mt-2">
            <p className="text-muted small mb-1">
              {formData.image instanceof File ? 'Новое изображение:' : 'Текущее изображение:'}
            </p>
            <img 
              src={imagePreview} 
              alt="Превью" 
              style={{ 
                maxWidth: '300px', 
                maxHeight: '200px', 
                objectFit: 'contain',
                border: '1px solid #ddd',
                borderRadius: '5px',
                backgroundColor: '#f8f9fa'
              }}
              className="img-fluid"
            />
            <p className="text-muted small mt-1">
              {formData.image instanceof File ? 
                'Будет загружено на сервер' : 
                'Текущее изображение из базы данных'}
            </p>
          </div>
        )}
        
        {editingNews && editingNews.image_url && !imagePreview && (
          <div className="mt-2">
            <p className="text-muted small">Текущее изображение:</p>
            <img 
              src={editingNews.image_url} 
              alt="Текущее" 
              style={{ 
                maxWidth: '300px', 
                maxHeight: '200px', 
                objectFit: 'contain',
                border: '1px solid #ddd',
                borderRadius: '5px'
              }}
              className="img-fluid"
            />
          </div>
        )}
        
        {editingNews && !editingNews.image_url && !imagePreview && (
          <div className="alert alert-info mt-2 small">
            У этой новости нет изображения. Выберите файл, чтобы добавить его.
          </div>
        )}
      </div>

      <div className="mb-3">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="is_published"
            id="is_published"
            checked={formData.is_published}
            onChange={handleInputChange}
          />
          <label className="form-check-label fw-bold" htmlFor="is_published">
            Опубликовать сразу
          </label>
        </div>
        <div className="form-text text-muted">
          Если не отмечено, новость будет сохранена как черновик
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label fw-bold">Текст новости *</label>
        <textarea
          className="form-control"
          name="content"
          rows="6"
          value={formData.content}
          onChange={handleInputChange}
          required
          placeholder="Введите полный текст новости..."
        />
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <div>
          {editingNews && (
            <button
              type="button"
              className="btn btn-danger me-2"
              onClick={() => handleDeleteNews(editingNews.id)}
            >
              Удалить
            </button>
          )}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={resetForm}
          >
            Отмена
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-warning px-4"
          style={{ 
            backgroundColor: '#FF6F00', 
            color: 'white',
            fontWeight: 'bold'
          }}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" />
              Сохранение...
            </>
          ) : editingNews ? 'Сохранить изменения' : 'Опубликовать новость'}
        </button>
      </div>
    </form>
  );

  if (isAddingNews) {
    return (
      <div className="news-page-container" style={containerStyle}>
        <Header />
        <div className="main-content-wrapper" style={{ display: 'flex', minHeight: 'calc(100vh - 56px)' }}>
          <Sidebar />
          <main className="news-content-main" style={mainContentStyle}>
            <div className="container-fluid p-4">
              <div className="d-flex align-items-center mb-4">
                <img src={NewsIcon} alt="Новости" style={{ width: "32px", height: "32px" }} className="me-3" />
                <h1 className="fw-bold" style={{ color: '#886128' }}>НОВОСТИ</h1>
              </div>

              <div className="card border-0 shadow mb-4">
                <div className="card-body">
                  <h3 className="card-title mb-4">
                    {editingNews ? "✏️ Редактирование новости" : "➕ Добавление новой новости"}
                  </h3>
                  {renderForm()}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="news-page-container" style={containerStyle}>
      <Header />
      <div className="main-content-wrapper" style={{ display: 'flex', minHeight: 'calc(100vh - 56px)' }}>
        <Sidebar />
        <main className="news-content-main" style={mainContentStyle}>
          <div className="container-fluid py-4">
            
            {/* Панель отладки и управления */}
            <div className="alert alert-info mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">📰 Система новостей</h5>
                  <div className="small">
                    <span className="badge bg-primary me-2">React: localhost:5173</span>
                    <span className="badge bg-success me-2">Django: localhost:8000</span>
                    <span className="badge bg-secondary">Новостей: {newsList.length}</span>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <button 
                    className="btn btn-sm btn-outline-dark"
                    onClick={() => {
                      console.log('=== DEBUG INFO ===');
                      console.log('Токен:', localStorage.getItem('access_token'));
                      console.log('Авторизован:', isAuthenticated);
                      console.log('Пользователь:', user);
                      console.log('Новости:', newsList);
                      newsList.forEach((news, idx) => {
                        console.log(`Новость ${idx + 1}:`, {
                          id: news.id,
                          title: news.title,
                          image: news.image,
                          image_url: news.image_url
                        });
                      });
                    }}
                  >
                    Консоль
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-dark"
                    onClick={checkMedia}
                  >
                    Проверить медиа
                  </button>
                  {isAuthenticated && (
                    <button 
                      className="btn btn-sm btn-warning"
                      onClick={() => setIsAddingNews(true)}
                    >
                      + Добавить
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Заголовок страницы */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="d-flex align-items-center">
                <img src={NewsIcon} alt="Новости" style={{ width: "40px", height: "40px" }} className="me-3" />
                <div>
                  <h1 className="fw-bold mb-0" style={{ color: '#886128' }}>НОВОСТИ</h1>
                  <p className="text-muted small mb-0">Актуальные события и обновления</p>
                </div>
              </div>
              {isAuthenticated && (
                <button
                  className="btn btn-warning d-flex align-items-center px-4 py-2"
                  onClick={() => setIsAddingNews(true)}
                  style={{ backgroundColor: '#FF6F00', color: 'white' }}
                >
                  <i className="bi bi-plus-lg me-2" />
                  Добавить новость
                </button>
              )}
            </div>

            {/* Основные новости */}
            {newsList.length > 0 && (
              <div className="row mb-5">
                <div className="col-lg-6 mb-4 mb-lg-0">
                  <div className="card border-0 shadow h-100">
                    <div style={{ height: '350px', overflow: 'hidden' }}>
                      <img
                        src={getImageUrl(newsList[0])}
                        alt={newsList[0].title}
                        className="w-100 h-100"
                        style={{ objectFit: 'cover' }}
                        onError={(e) => {
                          console.error('❌ Ошибка загрузки изображения для главной новости');
                          e.target.src = NewsImage;
                          e.target.style.objectFit = 'contain';
                          e.target.style.backgroundColor = '#f8f9fa';
                        }}
                      />
                    </div>
                    <div className="card-body">
                      <h2 className="card-title fw-bold">{newsList[0].title}</h2>
                      <p className="card-text">{newsList[0].content}</p>
                      <div className="d-flex justify-content-between align-items-center mt-4">
                        <div>
                          <span className="badge bg-warning text-dark me-2">
                            {newsList[0].category}
                          </span>
                          <small className="text-muted">{newsList[0].created_at_formatted}</small>
                        </div>
                        <small className="text-muted">Автор: {newsList[0].author_name}</small>
                      </div>
                    </div>
                  </div>
                </div>
                
                {newsList.length > 1 && (
                  <div className="col-lg-6">
                    <div className="row g-4 h-100">
                      {newsList.slice(1, 3).map((news, idx) => (
                        <div key={news.id} className="col-12">
                          <div className="card border-0 shadow h-100">
                            <div className="row g-0 h-100">
                              <div className="col-5">
                                <div style={{ height: '150px', overflow: 'hidden' }}>
                                  <img
                                    src={getImageUrl(news)}
                                    alt={news.title}
                                    className="w-100 h-100"
                                    style={{ objectFit: 'cover' }}
                                    onError={(e) => {
                                      console.error(`❌ Ошибка загрузки изображения для новости ${news.id}`);
                                      e.target.src = NewsImage;
                                      e.target.style.objectFit = 'contain';
                                      e.target.style.backgroundColor = '#f8f9fa';
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="col-7">
                                <div className="card-body h-100 d-flex flex-column">
                                  <h5 className="card-title fw-bold">{news.title}</h5>
                                  <p className="card-text small flex-grow-1">
                                    {news.content.substring(0, 100)}...
                                  </p>
                                  <div className="d-flex justify-content-between align-items-center mt-2">
                                    <small className="text-muted">{news.category}</small>
                                    <small className="text-muted">{news.author_name}</small>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Лента новостей */}
            <div className="mt-5">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold mb-0" style={{ color: '#886128' }}>Все новости</h3>
                <div className="text-muted small">
                  Всего: {newsList.length} {newsList.length === 0 ? 'новостей' : 
                    newsList.length === 1 ? 'новость' : 
                    newsList.length < 5 ? 'новости' : 'новостей'}
                </div>
              </div>
              
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-warning" style={{ width: '3rem', height: '3rem' }} />
                  <p className="mt-3">Загрузка новостей...</p>
                </div>
              ) : newsList.length === 0 ? (
                <div className="text-center py-5">
                  <div className="display-1 text-muted mb-4">📰</div>
                  <h4 className="text-muted mb-3">Новостей пока нет</h4>
                  <p className="text-muted mb-4">Будьте первым, кто добавит новость!</p>
                  {isAuthenticated && (
                    <button
                      className="btn btn-warning px-4 py-2"
                      onClick={() => setIsAddingNews(true)}
                    >
                      <i className="bi bi-plus-lg me-2" />
                      Добавить первую новость
                    </button>
                  )}
                </div>
              ) : (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
                  {newsList.map((news) => (
                    <div key={news.id} className="col">
                      <div className="card h-100 border-0 shadow-sm hover-shadow">
                        <div 
                          style={{ 
                            height: '200px', 
                            overflow: 'hidden',
                            position: 'relative',
                            backgroundColor: '#f8f9fa'
                          }}
                        >
                          <img
                            src={getImageUrl(news)}
                            alt={news.title}
                            className="w-100 h-100"
                            style={{ 
                              objectFit: 'cover',
                              transition: 'transform 0.3s ease'
                            }}
                            onError={(e) => {
                              console.error(`❌ Ошибка загрузки изображения для новости ${news.id}`);
                              e.target.src = NewsImage;
                              e.target.style.objectFit = 'contain';
                              e.target.style.padding = '20px';
                            }}
                            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                          />
                          {isAuthenticated && (
                            <button
                              className="position-absolute top-0 end-0 m-2 btn btn-light btn-sm shadow"
                              onClick={() => handleEditNews(news)}
                              title="Редактировать"
                              style={{ 
                                borderRadius: '50%', 
                                width: '36px', 
                                height: '36px',
                                backdropFilter: 'blur(5px)'
                              }}
                            >
                              ✏️
                            </button>
                          )}
                        </div>
                        <div className="card-body d-flex flex-column">
                          <h6 className="card-title fw-bold">{news.title}</h6>
                          <p className="card-text small text-muted flex-grow-1">
                            {news.content.length > 120 ? `${news.content.substring(0, 120)}...` : news.content}
                          </p>
                          <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                            <div>
                              <span className="badge bg-light text-dark me-2">
                                {news.category}
                              </span>
                              <small className="text-muted">{news.created_at_formatted}</small>
                            </div>
                            <small className="text-muted">{news.author_name}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NewsPage;