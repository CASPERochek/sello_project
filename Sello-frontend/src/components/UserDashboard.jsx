// // src/components/UserDashboard.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Header from './Header';
// import connectIcon from '../assets/icon/connect-icon.svg';

// // Настройка axios
// const api = axios.create({
//   baseURL: 'http://localhost:8000/api/',
//   withCredentials: true,
// });

// api.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Token ${token}`;
//   }
//   return config;
// });

// const UserDashboard = () => {
//   const [availableBrands, setAvailableBrands] = useState([]);
//   const [filterCategory, setFilterCategory] = useState('');
//   const [filterCreator, setFilterCreator] = useState('');
//   const [uniqueCategories, setUniqueCategories] = useState([]);
//   const [uniqueCreators, setUniqueCreators] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Загрузка данных
//   useEffect(() => {
//     fetchAvailableBrands();
//   }, [filterCategory, filterCreator]);

//   const fetchAvailableBrands = async () => {
//     try {
//       setLoading(true);
//       const params = {};
//       if (filterCategory) params.category = filterCategory;
//       if (filterCreator) params.creator = filterCreator;
      
//       const response = await api.get('brands/available/', { params });
      
//       setAvailableBrands(response.data.brands || response.data.results || []);
      
//       // Получаем уникальные значения для фильтров
//       if (response.data.filters) {
//         setUniqueCategories(response.data.filters.categories || []);
//         setUniqueCreators(response.data.filters.creators || []);
//       } else {
//         // Если нет фильтров в ответе, извлекаем из данных
//         const categories = [...new Set(response.data.brands?.map(b => b.category) || [])];
//         const creators = [...new Set(response.data.brands?.map(b => b.creator?.username) || [])];
//         setUniqueCategories(categories);
//         setUniqueCreators(creators);
//       }
      
//       setError(null);
//     } catch (err) {
//       console.error('Ошибка при загрузке магазинов:', err);
//       setError('Не удалось загрузить магазины');
//       // Загружаем моковые данные при ошибке
//       setAvailableBrands(getMockBrands());
//       setUniqueCategories(['Электроника', 'Одежда', 'Книги', 'Садоводство', 'Продукты']);
//       setUniqueCreators(['Иван', 'Аноним', 'Павел', 'ПетяТоп', 'Фермер']);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getMockBrands = () => {
//     return [
//       { id: 1, name: 'СуперМагазин', creator: { username: 'Иван' }, category: 'Электроника' },
//       { id: 2, name: 'Селло', creator: { username: 'Аноним' }, category: 'Одежда' },
//       { id: 3, name: 'Магазин', creator: { username: 'Павел' }, category: 'Книги' },
//       { id: 4, name: 'Товары для сада', creator: { username: 'ПетяТоп' }, category: 'Садоводство' },
//       { id: 5, name: 'Новый магазин', creator: { username: 'Фермер' }, category: 'Продукты' },
//       { id: 6, name: 'Лучший магазин', creator: { username: 'Ваня П' }, category: 'Обувь' },
//       { id: 7, name: 'Продажа тракторов', creator: { username: 'Топитоп' }, category: 'Сельхозтехника' },
//       { id: 8, name: 'Новый магазин', creator: { username: 'Человек' }, category: 'Разное' },
//       { id: 9, name: 'Лучший из лучших', creator: { username: 'Пппппп' }, category: 'Эксклюзив' },
//       { id: 10, name: 'Интересные товары', creator: { username: 'Павел' }, category: 'Хобби' },
//       { id: 11, name: 'Селоло', creator: { username: 'Рустам' }, category: 'Одежда' },
//       { id: 12, name: 'Магазин у дома', creator: { username: 'Галина' }, category: 'Продукты' },
//     ];
//   };

//   const handleConnect = async (brand) => {
//     try {
//       await api.post('connections/', { brand_id: brand.id });
//       alert(`Вы успешно подключились к магазину: ${brand.name}`);
      
//       // Обновляем список доступных магазинов
//       setAvailableBrands(prev => prev.filter(b => b.id !== brand.id));
//     } catch (err) {
//       console.error('Ошибка при подключении:', err);
//       alert(err.response?.data?.error || 'Не удалось подключиться к магазину');
//     }
//   };

//   const handleGoToCart = () => {
//     window.location.href = '/cart';
//   };

//   if (loading) {
//     return (
//       <div style={{ backgroundColor: '#FFFAF4', minHeight: '100vh' }}>
//         <Header />
//         <div style={{ paddingTop: '70px' }}></div>
//         <div className="container mt-4 d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
//           <div className="spinner-border text-warning" role="status">
//             <span className="visually-hidden">Загрузка...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={{ backgroundColor: '#FFFAF4', minHeight: '100vh' }}>
//       <Header />

//       {/* Отступ сверху */}
//       <div style={{ paddingTop: '70px' }}></div>

//       <div className="container mt-4">
//         {/* Заголовок */}
//         <h1 className="text-center mb-4" style={{ color: '#886128', fontWeight: 'bold' }}>Личный кабинет</h1>

//         {error && (
//           <div className="alert alert-warning text-center" role="alert">
//             {error}
//           </div>
//         )}

//         {/* Фильтры */}
//         <div style={{
//           backgroundColor: '#FFF4E5',
//           borderRadius: '8px',
//           padding: '20px',
//           marginBottom: '20px',
//           display: 'flex',
//           flexWrap: 'wrap',
//           gap: '20px',
//           alignItems: 'center'
//         }}>
//           <div style={{ flex: '1 1 calc(50% - 10px)' }}>
//             <label style={{ color: '#886128', fontSize: '1rem', display: 'block', marginBottom: '5px' }}>Категория магазина:</label>
//             <select
//               value={filterCategory}
//               onChange={(e) => setFilterCategory(e.target.value)}
//               style={{
//                 width: '100%',
//                 padding: '8px',
//                 borderRadius: '8px',
//                 border: '1px solid #EED1A6',
//                 color: '#886128',
//                 backgroundColor: '#FFF'
//               }}
//             >
//               <option value="">Все категории</option>
//               {uniqueCategories.map(category => (
//                 <option key={category} value={category}>{category}</option>
//               ))}
//             </select>
//           </div>

//           <div style={{ flex: '1 1 calc(50% - 10px)' }}>
//             <label style={{ color: '#886128', fontSize: '1rem', display: 'block', marginBottom: '5px' }}>Создатель магазина:</label>
//             <select
//               value={filterCreator}
//               onChange={(e) => setFilterCreator(e.target.value)}
//               style={{
//                 width: '100%',
//                 padding: '8px',
//                 borderRadius: '8px',
//                 border: '1px solid #EED1A6',
//                 color: '#886128',
//                 backgroundColor: '#FFF'
//               }}
//             >
//               <option value="">Все создатели</option>
//               {uniqueCreators.map(creator => (
//                 <option key={creator} value={creator}>{creator}</option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Надпись "Доступные магазины" */}
//         <div className="mb-4">
//           <span style={{ color: '#886128', fontSize: '1.2rem' }}>Доступные магазины</span>
//         </div>

//         {/* Таблица доступных магазинов */}
//         {availableBrands.length === 0 ? (
//           <div className="text-center py-5">
//             <p style={{ color: '#886128' }}>Нет доступных магазинов</p>
//           </div>
//         ) : (
//           <div className="table-responsive">
//             <table style={{
//               width: '100%',
//               backgroundColor: '#FFF',
//               borderCollapse: 'collapse',
//               border: '1px solid #EED1A6',
//               marginBottom: '1rem'
//             }}>
//               <thead>
//                 <tr>
//                   <th style={{
//                     backgroundColor: '#F9E5C8',
//                     color: '#886128',
//                     border: '1px solid #EED1A6',
//                     textAlign: 'center',
//                     verticalAlign: 'middle',
//                     padding: '12px',
//                     fontWeight: 'bold',
//                     fontSize: '16px'
//                   }}>
//                     №
//                   </th>
//                   <th style={{
//                     backgroundColor: '#F9E5C8',
//                     color: '#886128',
//                     border: '1px solid #EED1A6',
//                     textAlign: 'center',
//                     verticalAlign: 'middle',
//                     padding: '12px',
//                     fontWeight: 'bold',
//                     fontSize: '16px'
//                   }}>
//                     Название магазина
//                   </th>
//                   <th style={{
//                     backgroundColor: '#F9E5C8',
//                     color: '#886128',
//                     border: '1px solid #EED1A6',
//                     textAlign: 'center',
//                     verticalAlign: 'middle',
//                     padding: '12px',
//                     fontWeight: 'bold',
//                     fontSize: '16px'
//                   }}>
//                     Создатель
//                   </th>
//                   <th style={{
//                     backgroundColor: '#F9E5C8',
//                     color: '#886128',
//                     border: '1px solid #EED1A6',
//                     textAlign: 'center',
//                     verticalAlign: 'middle',
//                     padding: '12px',
//                     fontWeight: 'bold',
//                     fontSize: '16px'
//                   }}>
//                     Категория магазина
//                   </th>
//                   <th style={{
//                     backgroundColor: '#F9E5C8',
//                     color: '#886128',
//                     border: '1px solid #EED1A6',
//                     textAlign: 'center',
//                     verticalAlign: 'middle',
//                     padding: '12px',
//                     fontWeight: 'bold',
//                     fontSize: '16px'
//                   }}>
//                     Опции
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {availableBrands.map((brand, index) => (
//                   <tr key={brand.id} style={{ border: '1px solid #EED1A6' }}>
//                     <td style={{
//                       border: '1px solid #EED1A6',
//                       color: '#886128',
//                       textAlign: 'center',
//                       verticalAlign: 'middle',
//                       padding: '12px',
//                       fontSize: '15px'
//                     }}>
//                       {index + 1}
//                     </td>
//                     <td style={{
//                       border: '1px solid #EED1A6',
//                       color: '#886128',
//                       textAlign: 'center',
//                       verticalAlign: 'middle',
//                       padding: '12px',
//                       fontSize: '15px'
//                     }}>
//                       {brand.name}
//                     </td>
//                     <td style={{
//                       border: '1px solid #EED1A6',
//                       color: '#886128',
//                       textAlign: 'center',
//                       verticalAlign: 'middle',
//                       padding: '12px',
//                       fontSize: '15px'
//                     }}>
//                       {brand.creator?.username || brand.creator || 'Аноним'}
//                     </td>
//                     <td style={{
//                       border: '1px solid #EED1A6',
//                       color: '#886128',
//                       textAlign: 'center',
//                       verticalAlign: 'middle',
//                       padding: '12px',
//                       fontSize: '15px'
//                     }}>
//                       {brand.category}
//                     </td>
//                     <td style={{
//                       border: '1px solid #EED1A6',
//                       color: '#886128',
//                       textAlign: 'center',
//                       verticalAlign: 'middle',
//                       padding: '12px',
//                       fontSize: '15px'
//                     }}>
//                       <button
//                         onClick={() => handleConnect(brand)}
//                         style={{
//                           background: '#FFF8E1',
//                           color: '#FFA000',
//                           border: '1px solid #FFCA28',
//                           borderRadius: '20px',
//                           padding: '8px 15px',
//                           fontSize: '14px',
//                           cursor: 'pointer',
//                           display: 'flex',
//                           alignItems: 'center',
//                           gap: '8px',
//                           justifyContent: 'center',
//                           width: '150px',
//                           margin: '0 auto',
//                           transition: 'all 0.3s ease',
//                           minWidth: '150px'
//                         }}
//                         onMouseEnter={(e) => {
//                           e.currentTarget.style.background = '#FFA000';
//                           e.currentTarget.style.color = 'white';
//                         }}
//                         onMouseLeave={(e) => {
//                           e.currentTarget.style.background = '#FFF8E1';
//                           e.currentTarget.style.color = '#FFA000';
//                         }}
//                       >
//                         <img
//                           src={connectIcon}
//                           alt="Подключиться"
//                           style={{ width: '18px' }}
//                         />
//                         Подключиться
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Кнопка "Перейти в корзину" */}
//         <div className="d-flex justify-content-center mt-4">
//           <button
//             onClick={handleGoToCart}
//             style={{
//               backgroundColor: '#FFA000',
//               color: 'white',
//               border: 'none',
//               borderRadius: '20px',
//               padding: '10px 20px',
//               fontSize: '16px',
//               fontWeight: 'bold',
//               cursor: 'pointer'
//             }}
//           >
//             Перейти в корзину
//           </button>
//         </div>
//         <br />
//         <br />
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;



















// // src/components/UserDashboard.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Header from './Header';
// import connectIcon from '../assets/icon/connect-icon.svg';

// // Настройка axios
// const api = axios.create({
//   baseURL: 'http://localhost:8000/api/',
//   withCredentials: true,
// });

// api.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Token ${token}`;
//   }
//   return config;
// });

// // API для конструктора
// const constructorApi = axios.create({
//   baseURL: 'http://localhost:8000/constructor/api/',
//   withCredentials: true,
// });

// constructorApi.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Token ${token}`;
//   }
//   return config;
// });

// const UserDashboard = () => {
//   const [availableBrands, setAvailableBrands] = useState([]);
//   const [availableProjects, setAvailableProjects] = useState([]);
//   const [filterCategory, setFilterCategory] = useState('');
//   const [filterCreator, setFilterCreator] = useState('');
//   const [viewMode, setViewMode] = useState('projects');
//   const [uniqueCategories, setUniqueCategories] = useState([]);
//   const [uniqueCreators, setUniqueCreators] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [userInfo, setUserInfo] = useState(null);

//   useEffect(() => {
//     // Получаем информацию о текущем пользователе
//     fetchUserInfo();
    
//     if (viewMode === 'projects') {
//       fetchAvailableProjects();
//     } else {
//       fetchAvailableBrands();
//     }
//   }, [viewMode, filterCategory, filterCreator]);

//   // Получение информации о текущем пользователе
//   const fetchUserInfo = async () => {
//     try {
//       const response = await api.get('auth/user/');
//       setUserInfo(response.data);
//     } catch (err) {
//       console.error('Ошибка при загрузке информации о пользователе:', err);
//     }
//   };

//   // Основная функция для загрузки проектов из construct_pagedesign
// const fetchAvailableProjects = async () => {
//   try {
//     setLoading(true);
    
//     // Используем новый эндпоинт для дизайнов из конструктора
//     const response = await api.get('designs/available/', {
//       params: {
//         category: filterCategory || undefined,
//         creator: filterCreator || undefined
//       }
//     });
    
//     // Преобразуем дизайны в проекты
//     const formattedProjects = response.data.designs.map(design => ({
//       id: design.id,
//       title: design.name,
//       owner: design.owner,
//       category: design.category,
//       description: design.description,
//       preview_url: design.preview_url,
//       published_at: design.created_at,
//       is_shop: design.is_shop,
//       short_description: design.description.substring(0, 100) + '...',
//       text_color: design.text_color,
//       bg_color: design.bg_color,
//       is_public: design.is_public,
//       blocks_count: design.blocks_count,
//       thumbnail: design.thumbnail,
//       version: design.version
//     }));
    
//     setAvailableProjects(formattedProjects);
    
//     // Используем категории и создателей из ответа API
//     setUniqueCategories(response.data.filters?.categories || []);
//     setUniqueCreators(response.data.filters?.creators || []);
    
//     setError(null);
//   } catch (err) {
//     console.error('Ошибка при загрузке проектов:', err);
//     setError('Не удалось загрузить проекты из конструктора');
    
//     // Загружаем моковые данные при ошибке
//     setAvailableProjects(getMockProjects());
//     setUniqueCategories(['Дизайн', 'Лендинг', 'Магазин', 'Портфолио', 'Блог']);
//     setUniqueCreators(['Иван', 'Мария', 'Алексей', 'Елена']);
//   } finally {
//     setLoading(false);
//   }
// };

//   const fetchAvailableBrands = async () => {
//     try {
//       setLoading(true);
//       const params = {};
//       if (filterCategory) params.category = filterCategory;
//       if (filterCreator) params.creator = filterCreator;
      
//       const response = await api.get('brands/available/', { params });
      
//       setAvailableBrands(response.data.brands || response.data.results || []);
      
//       if (response.data.filters) {
//         setUniqueCategories(response.data.filters.categories || []);
//         setUniqueCreators(response.data.filters.creators || []);
//       } else {
//         const categories = [...new Set(response.data.brands?.map(b => b.category) || [])];
//         const creators = [...new Set(response.data.brands?.map(b => b.creator?.username) || [])];
//         setUniqueCategories(categories);
//         setUniqueCreators(creators);
//       }
      
//       setError(null);
//     } catch (err) {
//       console.error('Ошибка при загрузке магазинов:', err);
//       setError('Не удалось загрузить магазины');
//       setAvailableBrands(getMockBrands());
//       setUniqueCategories(['Электроника', 'Одежда', 'Книги', 'Садоводство', 'Продукты']);
//       setUniqueCreators(['Иван', 'Аноним', 'Павел', 'ПетяТоп', 'Фермер']);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Функция для создания прямого эндпоинта на бэкенде (нужно добавить на сервере)
//   const createBackendEndpointForDesigns = () => {
//     /*
//     НА БЭКЕНДЕ НУЖНО СОЗДАТЬ ЭНДПОИНТ:
    
//     1. В Django views.py:
    
//     from django.http import JsonResponse
//     from your_app.models import construct_pagedesign
//     from django.contrib.auth.models import User
    
//     @api_view(['GET'])
//     @permission_classes([IsAuthenticated])
//     def get_all_designs(request):
//         # Получаем все дизайны
//         designs = construct_pagedesign.objects.all()
        
//         # Преобразуем в JSON
//         designs_data = []
//         for design in designs:
//             try:
//                 user = User.objects.get(id=design.user_id)
//                 username = user.username
//             except User.DoesNotExist:
//                 username = f"User {design.user_id}"
                
//             designs_data.append({
//                 'id': design.id,
//                 'user_id': design.user_id,
//                 'name': design.name,
//                 'description': design.metadata.get('description', '') if design.metadata else '',
//                 'category': design.metadata.get('category', 'Дизайн') if design.metadata else 'Дизайн',
//                 'is_shop': design.metadata.get('is_shop', False) if design.metadata else False,
//                 'is_public': design.is_public,
//                 'text_color': design.text_color,
//                 'bg_color': design.bg_color,
//                 'blocks_count': design.blocks_count,
//                 'thumbnail': design.thumbnail,
//                 'created_at': design.created_at,
//                 'updated_at': design.updated_at,
//                 'creator': {
//                     'id': design.user_id,
//                     'username': username
//                 }
//             })
        
//         return JsonResponse({'designs': designs_data}, safe=False)
    
//     2. В urls.py:
//     path('api/projects/from-constructor/', views.get_all_designs, name='get_all_designs'),
//     */
//   };

//   const getMockProjects = () => {
//     return [
//       { 
//         id: 1, 
//         title: 'Магазин электроники TechStore', 
//         owner: { username: 'Иван' }, 
//         category: 'Интернет-магазин',
//         description: 'Современный магазин электроники с широким ассортиментом',
//         preview_url: '/project-preview/1/',
//         published_at: '2024-01-15T10:30:00Z',
//         is_shop: true,
//         short_description: 'Современный магазин электроники с широким ассортиментом'
//       },
//       { 
//         id: 2, 
//         title: 'Фотопортфолио PhotoArt', 
//         owner: { username: 'Мария' }, 
//         category: 'Портфолио',
//         description: 'Портфолио фотографа с галереей работ',
//         preview_url: '/project-preview/2/',
//         published_at: '2024-01-14T14:20:00Z',
//         is_shop: false,
//         short_description: 'Портфолио фотографа с галереей работ'
//       },
//       { 
//         id: 3, 
//         title: 'Блог о путешествиях', 
//         owner: { username: 'Алексей' }, 
//         category: 'Блог',
//         description: 'Личный блог о путешествиях по миру',
//         preview_url: '/project-preview/3/',
//         published_at: '2024-01-13T09:15:00Z',
//         is_shop: false,
//         short_description: 'Личный блог о путешествиях по миру'
//       },
//     ];
//   };

//   const getMockBrands = () => {
//     return [
//       { id: 1, name: 'СуперМагазин', creator: { username: 'Иван' }, category: 'Электроника' },
//       { id: 2, name: 'Селло', creator: { username: 'Аноним' }, category: 'Одежда' },
//       { id: 3, name: 'Магазин', creator: { username: 'Павел' }, category: 'Книги' },
//     ];
//   };

//   const handleConnect = async (brand) => {
//     try {
//       await api.post('connections/', { brand_id: brand.id });
//       alert(`Вы успешно подключились к магазину: ${brand.name}`);
//       setAvailableBrands(prev => prev.filter(b => b.id !== brand.id));
//     } catch (err) {
//       console.error('Ошибка при подключении:', err);
//       alert(err.response?.data?.error || 'Не удалось подключиться к магазину');
//     }
//   };

//   const handleVisitProject = (project) => {
//     // Открываем проект в новой вкладке
//     if (project.preview_url) {
//       window.open(project.preview_url, '_blank');
//     } else if (project.id) {
//       // Если нет preview_url, открываем страницу конструктора с этим проектом
//       window.open(`/constructor/design/${project.id}`, '_blank');
//     }
//   };

//   const handleGoToCart = () => {
//     window.location.href = '/cart';
//   };

//   const handleRefreshProjects = () => {
//     if (viewMode === 'projects') {
//       fetchAvailableProjects();
//     } else {
//       fetchAvailableBrands();
//     }
//   };

//   // Функция для отображения цвета проекта
//   const renderColorIndicator = (color) => {
//     if (!color) return null;
    
//     return (
//       <span 
//         className="color-indicator ms-2"
//         style={{
//           display: 'inline-block',
//           width: '12px',
//           height: '12px',
//           borderRadius: '50%',
//           backgroundColor: color,
//           border: '1px solid #ccc',
//           verticalAlign: 'middle'
//         }}
//         title={`Цвет текста: ${color}`}
//       ></span>
//     );
//   };

//   if (loading) {
//     return (
//       <div style={{ backgroundColor: '#FFFAF4', minHeight: '100vh' }}>
//         <Header />
//         <div style={{ paddingTop: '70px' }}></div>
//         <div className="container mt-4 d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
//           <div className="spinner-border text-warning" role="status">
//             <span className="visually-hidden">Загрузка...</span>
//           </div>
//           <div className="ms-3" style={{ color: '#886128' }}>
//             Загрузка {viewMode === 'projects' ? 'проектов' : 'магазинов'}...
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={{ backgroundColor: '#FFFAF4', minHeight: '100vh' }}>
//       <Header />
//       <div style={{ paddingTop: '70px' }}></div>

//       <div className="container mt-4">
//         <h1 className="text-center mb-4" style={{ color: '#886128', fontWeight: 'bold' }}>Личный кабинет</h1>

//         {error && (
//           <div className="alert alert-warning text-center" role="alert">
//             {error}
//             <button 
//               className="btn btn-sm btn-outline-warning ms-3"
//               onClick={handleRefreshProjects}
//             >
//               Обновить
//             </button>
//           </div>
//         )}

//         <div className="text-center mb-4">
//           <div className="btn-group" role="group" aria-label="Режим просмотра">
//             <button
//               type="button"
//               className={`btn ${viewMode === 'projects' ? 'btn-warning active' : 'btn-outline-warning'}`}
//               onClick={() => setViewMode('projects')}
//               style={{
//                 backgroundColor: viewMode === 'projects' ? '#FFA000' : 'transparent',
//                 color: viewMode === 'projects' ? 'white' : '#886128',
//                 border: '1px solid #FFA000',
//                 padding: '10px 20px',
//                 borderRadius: '20px 0 0 20px'
//               }}
//             >
//               Все сайты
//             </button>
//             <button
//               type="button"
//               className={`btn ${viewMode === 'brands' ? 'btn-warning active' : 'btn-outline-warning'}`}
//               onClick={() => setViewMode('brands')}
//               style={{
//                 backgroundColor: viewMode === 'brands' ? '#FFA000' : 'transparent',
//                 color: viewMode === 'brands' ? 'white' : '#886128',
//                 border: '1px solid #FFA000',
//                 padding: '10px 20px',
//                 borderRadius: '0 20px 20px 0'
//               }}
//             >
//               Магазины
//             </button>
//           </div>
          
//           <div className="mt-3">
//             <button 
//               className="btn btn-sm btn-outline-secondary"
//               onClick={handleRefreshProjects}
//               title="Обновить список"
//             >
//               🔄 Обновить
//             </button>
//             <span className="ms-3 small text-muted">
//               {viewMode === 'projects' 
//                 ? `Найдено проектов: ${availableProjects.length}` 
//                 : `Найдено магазинов: ${availableBrands.length}`}
//             </span>
//           </div>
//         </div>

//         <div style={{
//           backgroundColor: '#FFF4E5',
//           borderRadius: '8px',
//           padding: '20px',
//           marginBottom: '20px',
//           display: 'flex',
//           flexWrap: 'wrap',
//           gap: '20px',
//           alignItems: 'center'
//         }}>
//           <div style={{ flex: '1 1 calc(50% - 10px)' }}>
//             <label style={{ color: '#886128', fontSize: '1rem', display: 'block', marginBottom: '5px' }}>
//               {viewMode === 'projects' ? 'Категория сайта:' : 'Категория магазина:'}
//             </label>
//             <select
//               value={filterCategory}
//               onChange={(e) => setFilterCategory(e.target.value)}
//               style={{
//                 width: '100%',
//                 padding: '8px',
//                 borderRadius: '8px',
//                 border: '1px solid #EED1A6',
//                 color: '#886128',
//                 backgroundColor: '#FFF'
//               }}
//             >
//               <option value="">Все категории</option>
//               {uniqueCategories.map(category => (
//                 <option key={category} value={category}>{category}</option>
//               ))}
//             </select>
//           </div>

//           <div style={{ flex: '1 1 calc(50% - 10px)' }}>
//             <label style={{ color: '#886128', fontSize: '1rem', display: 'block', marginBottom: '5px' }}>
//               {viewMode === 'projects' ? 'Создатель сайта:' : 'Создатель магазина:'}
//             </label>
//             <select
//               value={filterCreator}
//               onChange={(e) => setFilterCreator(e.target.value)}
//               style={{
//                 width: '100%',
//                 padding: '8px',
//                 borderRadius: '8px',
//                 border: '1px solid #EED1A6',
//                 color: '#886128',
//                 backgroundColor: '#FFF'
//               }}
//             >
//               <option value="">Все создатели</option>
//               {uniqueCreators.map(creator => (
//                 <option key={creator} value={creator}>{creator}</option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className="mb-4 d-flex justify-content-between align-items-center">
//           <span style={{ color: '#886128', fontSize: '1.2rem', fontWeight: 'bold' }}>
//             {viewMode === 'projects' ? 'Доступные сайты' : 'Доступные магазины'}
//           </span>
//           {viewMode === 'projects' && availableProjects.length > 0 && (
//             <div className="text-muted small">
//               Проекты из конструктора
//             </div>
//           )}
//         </div>

//         {viewMode === 'projects' ? (
//           <div className="row g-4">
//             {availableProjects.length === 0 ? (
//               <div className="col-12 text-center py-5">
//                 <p style={{ color: '#886128', fontSize: '1.2rem' }}>Нет доступных сайтов</p>
//                 <p style={{ color: '#886128' }}>Попробуйте изменить фильтры или создать свой первый проект!</p>
//                 <button 
//                   className="btn btn-warning mt-3"
//                   onClick={() => window.location.href = '/constructor'}
//                 >
//                   Создать проект
//                 </button>
//               </div>
//             ) : (
//               availableProjects.map(project => (
//                 <div key={project.id} className="col-md-6 col-lg-4">
//                   <div className="card h-100" style={{ 
//                     borderColor: '#EED1A6', 
//                     boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//                     transition: 'transform 0.2s'
//                   }}
//                   onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
//                   onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//                   >
//                     <div className="card-header" style={{ 
//                       backgroundColor: project.is_shop ? '#FFF8E1' : '#F9E5C8',
//                       borderBottom: '1px solid #EED1A6'
//                     }}>
//                       <div className="d-flex justify-content-between align-items-center">
//                         <h5 className="mb-0" style={{ 
//                           color: project.text_color || '#886128', 
//                           fontSize: '1.1rem',
//                           backgroundColor: project.bg_color || 'transparent',
//                           padding: '4px 8px',
//                           borderRadius: '4px'
//                         }}>
//                           {project.title}
//                           {renderColorIndicator(project.text_color)}
//                         </h5>
//                         {project.is_shop && (
//                           <span className="badge" style={{ backgroundColor: '#FFA000', color: 'white' }}>
//                             Магазин
//                           </span>
//                         )}
//                         {!project.is_public && (
//                           <span className="badge bg-secondary ms-1" style={{ fontSize: '0.7rem' }}>
//                             Приватный
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                     <div className="card-body d-flex flex-column">
//                       <p className="card-text" style={{ color: '#886128', flex: 1, fontSize: '0.95rem' }}>
//                         {project.short_description}
//                       </p>
//                       <div className="mt-3">
//                         <p className="card-text small" style={{ color: '#886128', marginBottom: '5px' }}>
//                           <strong>Создатель:</strong> {project.owner?.username || 'Аноним'}
//                         </p>
//                         {project.category && (
//                           <p className="card-text small" style={{ color: '#886128', marginBottom: '5px' }}>
//                             <strong>Категория:</strong> {project.category}
//                           </p>
//                         )}
//                         {project.blocks_count > 0 && (
//                           <p className="card-text small" style={{ color: '#886128', marginBottom: '10px' }}>
//                             <strong>Блоков:</strong> {project.blocks_count}
//                           </p>
//                         )}
//                       </div>
//                       <div className="mt-auto pt-3">
//                         <button
//                           onClick={() => handleVisitProject(project)}
//                           className="btn w-100"
//                           style={{
//                             backgroundColor: '#FFA000',
//                             color: 'white',
//                             border: 'none',
//                             borderRadius: '20px',
//                             padding: '8px 16px',
//                             cursor: 'pointer',
//                             marginBottom: '10px',
//                             fontSize: '0.9rem'
//                           }}
//                         >
//                           👁️ Посетить сайт
//                         </button>
//                         {project.is_shop && project.brand && (
//                           <button
//                             onClick={() => handleConnect(project.brand)}
//                             className="btn w-100"
//                             style={{
//                               backgroundColor: '#FFF8E1',
//                               color: '#FFA000',
//                               border: '1px solid #FFCA28',
//                               borderRadius: '20px',
//                               padding: '8px 16px',
//                               cursor: 'pointer',
//                               display: 'flex',
//                               alignItems: 'center',
//                               justifyContent: 'center',
//                               gap: '8px',
//                               fontSize: '0.9rem'
//                             }}
//                           >
//                             <img
//                               src={connectIcon}
//                               alt="Подключиться"
//                               style={{ width: '18px' }}
//                             />
//                             Подключиться как покупатель
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                     <div className="card-footer text-muted small d-flex justify-content-between" style={{ 
//                       backgroundColor: '#FFF4E5',
//                       borderTop: '1px solid #EED1A6',
//                       fontSize: '0.8rem'
//                     }}>
//                       <span>Создан: {new Date(project.published_at).toLocaleDateString('ru-RU')}</span>
//                       <span>v{project.version || '1.0'}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         ) : (
//           // ... остальной код для отображения магазинов без изменений
//           <div className="table-responsive">
//             {availableBrands.length === 0 ? (
//               <div className="text-center py-5">
//                 <p style={{ color: '#886128' }}>Нет доступных магазинов</p>
//                 <p style={{ color: '#886128' }}>Все магазины уже подключены или еще не созданы</p>
//               </div>
//             ) : (
//               <table style={{
//                 width: '100%',
//                 backgroundColor: '#FFF',
//                 borderCollapse: 'collapse',
//                 border: '1px solid #EED1A6',
//                 marginBottom: '1rem'
//               }}>
//                 <thead>
//                   <tr>
//                     <th style={{
//                       backgroundColor: '#F9E5C8',
//                       color: '#886128',
//                       border: '1px solid #EED1A6',
//                       textAlign: 'center',
//                       verticalAlign: 'middle',
//                       padding: '12px',
//                       fontWeight: 'bold',
//                       fontSize: '16px'
//                     }}>
//                       №
//                     </th>
//                     <th style={{
//                       backgroundColor: '#F9E5C8',
//                       color: '#886128',
//                       border: '1px solid #EED1A6',
//                       textAlign: 'center',
//                       verticalAlign: 'middle',
//                       padding: '12px',
//                       fontWeight: 'bold',
//                       fontSize: '16px'
//                     }}>
//                       Название магазина
//                     </th>
//                     <th style={{
//                       backgroundColor: '#F9E5C8',
//                       color: '#886128',
//                       border: '1px solid #EED1A6',
//                       textAlign: 'center',
//                       verticalAlign: 'middle',
//                       padding: '12px',
//                       fontWeight: 'bold',
//                       fontSize: '16px'
//                     }}>
//                       Создатель
//                     </th>
//                     <th style={{
//                       backgroundColor: '#F9E5C8',
//                       color: '#886128',
//                       border: '1px solid #EED1A6',
//                       textAlign: 'center',
//                       verticalAlign: 'middle',
//                       padding: '12px',
//                       fontWeight: 'bold',
//                       fontSize: '16px'
//                     }}>
//                       Категория магазина
//                     </th>
//                     <th style={{
//                       backgroundColor: '#F9E5C8',
//                       color: '#886128',
//                       border: '1px solid #EED1A6',
//                       textAlign: 'center',
//                       verticalAlign: 'middle',
//                       padding: '12px',
//                       fontWeight: 'bold',
//                       fontSize: '16px'
//                     }}>
//                       Опции
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {availableBrands.map((brand, index) => (
//                     <tr key={brand.id} style={{ border: '1px solid #EED1A6' }}>
//                       <td style={{
//                         border: '1px solid #EED1A6',
//                         color: '#886128',
//                         textAlign: 'center',
//                         verticalAlign: 'middle',
//                         padding: '12px',
//                         fontSize: '15px'
//                       }}>
//                         {index + 1}
//                       </td>
//                       <td style={{
//                         border: '1px solid #EED1A6',
//                         color: '#886128',
//                         textAlign: 'center',
//                         verticalAlign: 'middle',
//                         padding: '12px',
//                         fontSize: '15px'
//                       }}>
//                         {brand.name}
//                       </td>
//                       <td style={{
//                         border: '1px solid #EED1A6',
//                         color: '#886128',
//                         textAlign: 'center',
//                         verticalAlign: 'middle',
//                         padding: '12px',
//                         fontSize: '15px'
//                       }}>
//                         {brand.creator?.username || brand.creator || 'Аноним'}
//                       </td>
//                       <td style={{
//                         border: '1px solid #EED1A6',
//                         color: '#886128',
//                         textAlign: 'center',
//                         verticalAlign: 'middle',
//                         padding: '12px',
//                         fontSize: '15px'
//                       }}>
//                         {brand.category}
//                       </td>
//                       <td style={{
//                         border: '1px solid #EED1A6',
//                         color: '#886128',
//                         textAlign: 'center',
//                         verticalAlign: 'middle',
//                         padding: '12px',
//                         fontSize: '15px'
//                       }}>
//                         <button
//                           onClick={() => handleConnect(brand)}
//                           style={{
//                             background: '#FFF8E1',
//                             color: '#FFA000',
//                             border: '1px solid #FFCA28',
//                             borderRadius: '20px',
//                             padding: '8px 15px',
//                             fontSize: '14px',
//                             cursor: 'pointer',
//                             display: 'flex',
//                             alignItems: 'center',
//                             gap: '8px',
//                             justifyContent: 'center',
//                             width: '150px',
//                             margin: '0 auto',
//                             transition: 'all 0.3s ease',
//                             minWidth: '150px'
//                           }}
//                           onMouseEnter={(e) => {
//                             e.currentTarget.style.background = '#FFA000';
//                             e.currentTarget.style.color = 'white';
//                           }}
//                           onMouseLeave={(e) => {
//                             e.currentTarget.style.background = '#FFF8E1';
//                             e.currentTarget.style.color = '#FFA000';
//                           }}
//                         >
//                           <img
//                             src={connectIcon}
//                             alt="Подключиться"
//                             style={{ width: '18px' }}
//                           />
//                           Подключиться
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         )}

//         <div className="d-flex justify-content-center mt-4">
//           <button
//             onClick={handleGoToCart}
//             style={{
//               backgroundColor: '#FFA000',
//               color: 'white',
//               border: 'none',
//               borderRadius: '20px',
//               padding: '10px 20px',
//               fontSize: '16px',
//               fontWeight: 'bold',
//               cursor: 'pointer'
//             }}
//           >
//             Перейти в корзину
//           </button>
//         </div>
//         <br />
//         <br />
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;




// // src/components/UserDashboard.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Header from './Header';
// import connectIcon from '../assets/icon/connect-icon.svg';

// // Настройка axios
// const api = axios.create({
//   baseURL: 'http://localhost:8000/api/',
//   withCredentials: true,
// });

// api.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Token ${token}`;
//   }
//   return config;
// });

// // API для конструктора (если нужно отдельно)
// const constructorApi = axios.create({
//   baseURL: 'http://localhost:8000/constructor/api/',
//   withCredentials: true,
// });

// constructorApi.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Token ${token}`;
//   }
//   return config;
// });

// const UserDashboard = () => {
//   const [availableProjects, setAvailableProjects] = useState([]);
//   const [filterCategory, setFilterCategory] = useState('');
//   const [filterCreator, setFilterCreator] = useState('');
//   const [viewMode, setViewMode] = useState('projects'); // По умолчанию показываем проекты из конструктора
//   const [uniqueCategories, setUniqueCategories] = useState([]);
//   const [uniqueCreators, setUniqueCreators] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [userInfo, setUserInfo] = useState(null);

//   useEffect(() => {
//     fetchUserInfo();
//     if (viewMode === 'projects') {
//       fetchAvailableProjects();
//     } else {
//       fetchAvailableBrands(); // Если нужен режим "магазины"
//     }
//   }, [viewMode, filterCategory, filterCreator]);

//   // Получение информации о текущем пользователе
//   const fetchUserInfo = async () => {
//     try {
//       const response = await api.get('auth/user/');
//       setUserInfo(response.data);
//     } catch (err) {
//       console.error('Ошибка при загрузке информации о пользователе:', err);
//     }
//   };

//   // Загрузка проектов из construct_pagedesign
//   const fetchAvailableProjects = async () => {
//     try {
//       setLoading(true);
//       const params = {};
//       if (filterCategory) params.category = filterCategory;
//       if (filterCreator) params.creator = filterCreator;

//       // Используем эндпоинт, который должен быть реализован на бэкенде
//       const response = await api.get('designs/available/', { params });

//       // Преобразуем данные из ответа API в нужный формат
//       const formattedProjects = response.data.designs.map(design => ({
//         id: design.id,
//         title: design.name,
//         owner: design.creator || { username: 'Аноним' },
//         category: design.category || 'Дизайн',
//         description: design.description || '',
//         preview_url: design.preview_url || `/project-preview/${design.id}/`,
//         published_at: design.created_at,
//         is_shop: design.is_shop || false,
//         short_description: (design.description || '').substring(0, 100) + '...',
//         text_color: design.text_color,
//         bg_color: design.bg_color,
//         is_public: design.is_public,
//         blocks_count: design.blocks_count,
//         thumbnail: design.thumbnail,
//         version: design.version || '1.0'
//       }));

//       setAvailableProjects(formattedProjects);
//       setUniqueCategories(response.data.filters?.categories || []);
//       setUniqueCreators(response.data.filters?.creators || []);
//       setError(null);
//     } catch (err) {
//       console.error('Ошибка при загрузке проектов из конструктора:', err);
//       setError('Не удалось загрузить проекты из конструктора');
//       setAvailableProjects(getMockProjects());
//       setUniqueCategories(['Дизайн', 'Лендинг', 'Магазин', 'Портфолио', 'Блог']);
//       setUniqueCreators(['Иван', 'Мария', 'Алексей', 'Елена']);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Загрузка магазинов (для режима "магазины")
//   const fetchAvailableBrands = async () => {
//     try {
//       setLoading(true);
//       const params = {};
//       if (filterCategory) params.category = filterCategory;
//       if (filterCreator) params.creator = filterCreator;

//       const response = await api.get('brands/available/', { params });
//       setAvailableBrands(response.data.brands || response.data.results || []);

//       if (response.data.filters) {
//         setUniqueCategories(response.data.filters.categories || []);
//         setUniqueCreators(response.data.filters.creators || []);
//       } else {
//         const categories = [...new Set(response.data.brands?.map(b => b.category) || [])];
//         const creators = [...new Set(response.data.brands?.map(b => b.creator?.username) || [])];
//         setUniqueCategories(categories);
//         setUniqueCreators(creators);
//       }
//       setError(null);
//     } catch (err) {
//       console.error('Ошибка при загрузке магазинов:', err);
//       setError('Не удалось загрузить магазины');
//       setAvailableBrands(getMockBrands());
//       setUniqueCategories(['Электроника', 'Одежда', 'Книги', 'Садоводство', 'Продукты']);
//       setUniqueCreators(['Иван', 'Аноним', 'Павел', 'ПетяТоп', 'Фермер']);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Моковые данные для проектов (на случай ошибки)
//   const getMockProjects = () => {
//     return [
//       {
//         id: 1,
//         title: 'Магазин электроники TechStore',
//         owner: { username: 'Иван' },
//         category: 'Интернет-магазин',
//         description: 'Современный магазин электроники с широким ассортиментом',
//         preview_url: '/project-preview/1/',
//         published_at: '2024-01-15T10:30:00Z',
//         is_shop: true,
//         short_description: 'Современный магазин электроники с широким ассортиментом'
//       },
//       {
//         id: 2,
//         title: 'Фотопортфолио PhotoArt',
//         owner: { username: 'Мария' },
//         category: 'Портфолио',
//         description: 'Портфолио фотографа с галереей работ',
//         preview_url: '/project-preview/2/',
//         published_at: '2024-01-14T14:20:00Z',
//         is_shop: false,
//         short_description: 'Портфолио фотографа с галереей работ'
//       },
//       {
//         id: 3,
//         title: 'Блог о путешествиях',
//         owner: { username: 'Алексей' },
//         category: 'Блог',
//         description: 'Личный блог о путешествиях по миру',
//         preview_url: '/project-preview/3/',
//         published_at: '2024-01-13T09:15:00Z',
//         is_shop: false,
//         short_description: 'Личный блог о путешествиях по миру'
//       },
//     ];
//   };

//   // Моковые данные для магазинов (на случай ошибки)
//   const getMockBrands = () => {
//     return [
//       { id: 1, name: 'СуперМагазин', creator: { username: 'Иван' }, category: 'Электроника' },
//       { id: 2, name: 'Селло', creator: { username: 'Аноним' }, category: 'Одежда' },
//       { id: 3, name: 'Магазин', creator: { username: 'Павел' }, category: 'Книги' },
//     ];
//   };

//   const handleConnect = async (brand) => {
//     try {
//       await api.post('connections/', { brand_id: brand.id });
//       alert(`Вы успешно подключились к магазину: ${brand.name}`);
//       setAvailableBrands(prev => prev.filter(b => b.id !== brand.id));
//     } catch (err) {
//       console.error('Ошибка при подключении:', err);
//       alert(err.response?.data?.error || 'Не удалось подключиться к магазину');
//     }
//   };

//   const handleVisitProject = (project) => {
//     if (project.preview_url) {
//       window.open(project.preview_url, '_blank');
//     } else if (project.id) {
//       window.open(`/constructor/design/${project.id}`, '_blank');
//     }
//   };

//   const handleGoToCart = () => {
//     window.location.href = '/cart';
//   };

//   const handleRefreshProjects = () => {
//     if (viewMode === 'projects') {
//       fetchAvailableProjects();
//     } else {
//       fetchAvailableBrands();
//     }
//   };

//   // Функция для отображения цвета проекта
//   const renderColorIndicator = (color) => {
//     if (!color) return null;
//     return (
//       <span
//         className="color-indicator ms-2"
//         style={{
//           display: 'inline-block',
//           width: '12px',
//           height: '12px',
//           borderRadius: '50%',
//           backgroundColor: color,
//           border: '1px solid #ccc',
//           verticalAlign: 'middle'
//         }}
//         title={`Цвет текста: ${color}`}
//       ></span>
//     );
//   };

//   if (loading) {
//     return (
//       <div style={{ backgroundColor: '#FFFAF4', minHeight: '100vh' }}>
//         <Header />
//         <div style={{ paddingTop: '70px' }}></div>
//         <div className="container mt-4 d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
//           <div className="spinner-border text-warning" role="status">
//             <span className="visually-hidden">Загрузка...</span>
//           </div>
//           <div className="ms-3" style={{ color: '#886128' }}>
//             Загрузка {viewMode === 'projects' ? 'проектов' : 'магазинов'}...
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={{ backgroundColor: '#FFFAF4', minHeight: '100vh' }}>
//       <Header />
//       <div style={{ paddingTop: '70px' }}></div>
//       <div className="container mt-4">
//         <h1 className="text-center mb-4" style={{ color: '#886128', fontWeight: 'bold' }}>Личный кабинет</h1>
//         {error && (
//           <div className="alert alert-warning text-center" role="alert">
//             {error}
//             <button
//               className="btn btn-sm btn-outline-warning ms-3"
//               onClick={handleRefreshProjects}
//             >
//               Обновить
//             </button>
//           </div>
//         )}
//         <div className="text-center mb-4">
//           <div className="btn-group" role="group" aria-label="Режим просмотра">
//             <button
//               type="button"
//               className={`btn ${viewMode === 'projects' ? 'btn-warning active' : 'btn-outline-warning'}`}
//               onClick={() => setViewMode('projects')}
//               style={{
//                 backgroundColor: viewMode === 'projects' ? '#FFA000' : 'transparent',
//                 color: viewMode === 'projects' ? 'white' : '#886128',
//                 border: '1px solid #FFA000',
//                 padding: '10px 20px',
//                 borderRadius: '20px 0 0 20px'
//               }}
//             >
//               Все сайты
//             </button>
//             <button
//               type="button"
//               className={`btn ${viewMode === 'brands' ? 'btn-warning active' : 'btn-outline-warning'}`}
//               onClick={() => setViewMode('brands')}
//               style={{
//                 backgroundColor: viewMode === 'brands' ? '#FFA000' : 'transparent',
//                 color: viewMode === 'brands' ? 'white' : '#886128',
//                 border: '1px solid #FFA000',
//                 padding: '10px 20px',
//                 borderRadius: '0 20px 20px 0'
//               }}
//             >
//               Магазины
//             </button>
//           </div>
//           <div className="mt-3">
//             <button
//               className="btn btn-sm btn-outline-secondary"
//               onClick={handleRefreshProjects}
//               title="Обновить список"
//             >
//               🔄 Обновить
//             </button>
//             <span className="ms-3 small text-muted">
//               {viewMode === 'projects'
//                 ? `Найдено проектов: ${availableProjects.length}`
//                 : `Найдено магазинов: ${availableBrands.length}`}
//             </span>
//           </div>
//         </div>

//         <div style={{
//           backgroundColor: '#FFF4E5',
//           borderRadius: '8px',
//           padding: '20px',
//           marginBottom: '20px',
//           display: 'flex',
//           flexWrap: 'wrap',
//           gap: '20px',
//           alignItems: 'center'
//         }}>
//           <div style={{ flex: '1 1 calc(50% - 10px)' }}>
//             <label style={{ color: '#886128', fontSize: '1rem', display: 'block', marginBottom: '5px' }}>
//               {viewMode === 'projects' ? 'Категория сайта:' : 'Категория магазина:'}
//             </label>
//             <select
//               value={filterCategory}
//               onChange={(e) => setFilterCategory(e.target.value)}
//               style={{
//                 width: '100%',
//                 padding: '8px',
//                 borderRadius: '8px',
//                 border: '1px solid #EED1A6',
//                 color: '#886128',
//                 backgroundColor: '#FFF'
//               }}
//             >
//               <option value="">Все категории</option>
//               {uniqueCategories.map(category => (
//                 <option key={category} value={category}>{category}</option>
//               ))}
//             </select>
//           </div>
//           <div style={{ flex: '1 1 calc(50% - 10px)' }}>
//             <label style={{ color: '#886128', fontSize: '1rem', display: 'block', marginBottom: '5px' }}>
//               {viewMode === 'projects' ? 'Создатель сайта:' : 'Создатель магазина:'}
//             </label>
//             <select
//               value={filterCreator}
//               onChange={(e) => setFilterCreator(e.target.value)}
//               style={{
//                 width: '100%',
//                 padding: '8px',
//                 borderRadius: '8px',
//                 border: '1px solid #EED1A6',
//                 color: '#886128',
//                 backgroundColor: '#FFF'
//               }}
//             >
//               <option value="">Все создатели</option>
//               {uniqueCreators.map(creator => (
//                 <option key={creator} value={creator}>{creator}</option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className="mb-4 d-flex justify-content-between align-items-center">
//           <span style={{ color: '#886128', fontSize: '1.2rem', fontWeight: 'bold' }}>
//             {viewMode === 'projects' ? 'Доступные сайты' : 'Доступные магазины'}
//           </span>
//           {viewMode === 'projects' && availableProjects.length > 0 && (
//             <div className="text-muted small">
//               Проекты из конструктора
//             </div>
//           )}
//         </div>

//         {viewMode === 'projects' ? (
//           <div className="row g-4">
//             {availableProjects.length === 0 ? (
//               <div className="col-12 text-center py-5">
//                 <p style={{ color: '#886128', fontSize: '1.2rem' }}>Нет доступных сайтов</p>
//                 <p style={{ color: '#886128' }}>Попробуйте изменить фильтры или создать свой первый проект!</p>
//                 <button
//                   className="btn btn-warning mt-3"
//                   onClick={() => window.location.href = '/constructor'}
//                 >
//                   Создать проект
//                 </button>
//               </div>
//             ) : (
//               availableProjects.map(project => (
//                 <div key={project.id} className="col-md-6 col-lg-4">
//                   <div className="card h-100" style={{
//                     borderColor: '#EED1A6',
//                     boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//                     transition: 'transform 0.2s'
//                   }}
//                   onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
//                   onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//                   >
//                     <div className="card-header" style={{
//                       backgroundColor: project.is_shop ? '#FFF8E1' : '#F9E5C8',
//                       borderBottom: '1px solid #EED1A6'
//                     }}>
//                       <div className="d-flex justify-content-between align-items-center">
//                         <h5 className="mb-0" style={{
//                           color: project.text_color || '#886128',
//                           fontSize: '1.1rem',
//                           backgroundColor: project.bg_color || 'transparent',
//                           padding: '4px 8px',
//                           borderRadius: '4px'
//                         }}>
//                           {project.title}
//                           {renderColorIndicator(project.text_color)}
//                         </h5>
//                         {project.is_shop && (
//                           <span className="badge" style={{ backgroundColor: '#FFA000', color: 'white' }}>
//                             Магазин
//                           </span>
//                         )}
//                         {!project.is_public && (
//                           <span className="badge bg-secondary ms-1" style={{ fontSize: '0.7rem' }}>
//                             Приватный
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                     <div className="card-body d-flex flex-column">
//                       <p className="card-text" style={{ color: '#886128', flex: 1, fontSize: '0.95rem' }}>
//                         {project.short_description}
//                       </p>
//                       <div className="mt-3">
//                         <p className="card-text small" style={{ color: '#886128', marginBottom: '5px' }}>
//                           <strong>Создатель:</strong> {project.owner?.username || 'Аноним'}
//                         </p>
//                         {project.category && (
//                           <p className="card-text small" style={{ color: '#886128', marginBottom: '5px' }}>
//                             <strong>Категория:</strong> {project.category}
//                           </p>
//                         )}
//                         {project.blocks_count > 0 && (
//                           <p className="card-text small" style={{ color: '#886128', marginBottom: '10px' }}>
//                             <strong>Блоков:</strong> {project.blocks_count}
//                           </p>
//                         )}
//                       </div>
//                       <div className="mt-auto pt-3">
//                         <button
//                           onClick={() => handleVisitProject(project)}
//                           className="btn w-100"
//                           style={{
//                             backgroundColor: '#FFA000',
//                             color: 'white',
//                             border: 'none',
//                             borderRadius: '20px',
//                             padding: '8px 16px',
//                             cursor: 'pointer',
//                             marginBottom: '10px',
//                             fontSize: '0.9rem'
//                           }}
//                         >
//                           👁️ Посетить сайт
//                         </button>
//                         {project.is_shop && (
//                           <button
//                             onClick={() => handleConnect({ id: project.id, name: project.title })}
//                             className="btn w-100"
//                             style={{
//                               backgroundColor: '#FFF8E1',
//                               color: '#FFA000',
//                               border: '1px solid #FFCA28',
//                               borderRadius: '20px',
//                               padding: '8px 16px',
//                               cursor: 'pointer',
//                               display: 'flex',
//                               alignItems: 'center',
//                               justifyContent: 'center',
//                               gap: '8px',
//                               fontSize: '0.9rem'
//                             }}
//                           >
//                             <img
//                               src={connectIcon}
//                               alt="Подключиться"
//                               style={{ width: '18px' }}
//                             />
//                             Подключиться как покупатель
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                     <div className="card-footer text-muted small d-flex justify-content-between" style={{
//                       backgroundColor: '#FFF4E5',
//                       borderTop: '1px solid #EED1A6',
//                       fontSize: '0.8rem'
//                     }}>
//                       <span>Создан: {new Date(project.published_at).toLocaleDateString('ru-RU')}</span>
//                       <span>v{project.version || '1.0'}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         ) : (
//           <div className="table-responsive">
//             {availableBrands.length === 0 ? (
//               <div className="text-center py-5">
//                 <p style={{ color: '#886128' }}>Нет доступных магазинов</p>
//                 <p style={{ color: '#886128' }}>Все магазины уже подключены или еще не созданы</p>
//               </div>
//             ) : (
//               <table style={{
//                 width: '100%',
//                 backgroundColor: '#FFF',
//                 borderCollapse: 'collapse',
//                 border: '1px solid #EED1A6',
//                 marginBottom: '1rem'
//               }}>
//                 <thead>
//                   <tr>
//                     <th style={{
//                       backgroundColor: '#F9E5C8',
//                       color: '#886128',
//                       border: '1px solid #EED1A6',
//                       textAlign: 'center',
//                       verticalAlign: 'middle',
//                       padding: '12px',
//                       fontWeight: 'bold',
//                       fontSize: '16px'
//                     }}>
//                       №
//                     </th>
//                     <th style={{
//                       backgroundColor: '#F9E5C8',
//                       color: '#886128',
//                       border: '1px solid #EED1A6',
//                       textAlign: 'center',
//                       verticalAlign: 'middle',
//                       padding: '12px',
//                       fontWeight: 'bold',
//                       fontSize: '16px'
//                     }}>
//                       Название магазина
//                     </th>
//                     <th style={{
//                       backgroundColor: '#F9E5C8',
//                       color: '#886128',
//                       border: '1px solid #EED1A6',
//                       textAlign: 'center',
//                       verticalAlign: 'middle',
//                       padding: '12px',
//                       fontWeight: 'bold',
//                       fontSize: '16px'
//                     }}>
//                       Создатель
//                     </th>
//                     <th style={{
//                       backgroundColor: '#F9E5C8',
//                       color: '#886128',
//                       border: '1px solid #EED1A6',
//                       textAlign: 'center',
//                       verticalAlign: 'middle',
//                       padding: '12px',
//                       fontWeight: 'bold',
//                       fontSize: '16px'
//                     }}>
//                       Категория магазина
//                     </th>
//                     <th style={{
//                       backgroundColor: '#F9E5C8',
//                       color: '#886128',
//                       border: '1px solid #EED1A6',
//                       textAlign: 'center',
//                       verticalAlign: 'middle',
//                       padding: '12px',
//                       fontWeight: 'bold',
//                       fontSize: '16px'
//                     }}>
//                       Опции
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {availableBrands.map((brand, index) => (
//                     <tr key={brand.id} style={{ border: '1px solid #EED1A6' }}>
//                       <td style={{
//                         border: '1px solid #EED1A6',
//                         color: '#886128',
//                         textAlign: 'center',
//                         verticalAlign: 'middle',
//                         padding: '12px',
//                         fontSize: '15px'
//                       }}>
//                         {index + 1}
//                       </td>
//                       <td style={{
//                         border: '1px solid #EED1A6',
//                         color: '#886128',
//                         textAlign: 'center',
//                         verticalAlign: 'middle',
//                         padding: '12px',
//                         fontSize: '15px'
//                       }}>
//                         {brand.name}
//                       </td>
//                       <td style={{
//                         border: '1px solid #EED1A6',
//                         color: '#886128',
//                         textAlign: 'center',
//                         verticalAlign: 'middle',
//                         padding: '12px',
//                         fontSize: '15px'
//                       }}>
//                         {brand.creator?.username || brand.creator || 'Аноним'}
//                       </td>
//                       <td style={{
//                         border: '1px solid #EED1A6',
//                         color: '#886128',
//                         textAlign: 'center',
//                         verticalAlign: 'middle',
//                         padding: '12px',
//                         fontSize: '15px'
//                       }}>
//                         {brand.category}
//                       </td>
//                       <td style={{
//                         border: '1px solid #EED1A6',
//                         color: '#886128',
//                         textAlign: 'center',
//                         verticalAlign: 'middle',
//                         padding: '12px',
//                         fontSize: '15px'
//                       }}>
//                         <button
//                           onClick={() => handleConnect(brand)}
//                           style={{
//                             background: '#FFF8E1',
//                             color: '#FFA000',
//                             border: '1px solid #FFCA28',
//                             borderRadius: '20px',
//                             padding: '8px 15px',
//                             fontSize: '14px',
//                             cursor: 'pointer',
//                             display: 'flex',
//                             alignItems: 'center',
//                             gap: '8px',
//                             justifyContent: 'center',
//                             width: '150px',
//                             margin: '0 auto',
//                             transition: 'all 0.3s ease',
//                             minWidth: '150px'
//                           }}
//                           onMouseEnter={(e) => {
//                             e.currentTarget.style.background = '#FFA000';
//                             e.currentTarget.style.color = 'white';
//                           }}
//                           onMouseLeave={(e) => {
//                             e.currentTarget.style.background = '#FFF8E1';
//                             e.currentTarget.style.color = '#FFA000';
//                           }}
//                         >
//                           <img
//                             src={connectIcon}
//                             alt="Подключиться"
//                             style={{ width: '18px' }}
//                           />
//                           Подключиться
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         )}

//         <div className="d-flex justify-content-center mt-4">
//           <button
//             onClick={handleGoToCart}
//             style={{
//               backgroundColor: '#FFA000',
//               color: 'white',
//               border: 'none',
//               borderRadius: '20px',
//               padding: '10px 20px',
//               fontSize: '16px',
//               fontWeight: 'bold',
//               cursor: 'pointer'
//             }}
//           >
//             Перейти в корзину
//           </button>
//         </div>
//         <br />
//         <br />
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;




// src/components/UserDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import connectIcon from '../assets/icon/connect-icon.svg';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: true,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

const UserDashboard = () => {
  const [availableProjects, setAvailableProjects] = useState([]);
  const [availableBrands, setAvailableBrands] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterCreator, setFilterCreator] = useState('');
  const [viewMode, setViewMode] = useState('projects');
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [uniqueCreators, setUniqueCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (viewMode === 'projects') {
      fetchAvailableProjects();
    } else {
      fetchAvailableBrands();
    }
  }, [viewMode, filterCategory, filterCreator]);

  const fetchAvailableProjects = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filterCategory) params.category = filterCategory;
      if (filterCreator) params.creator = filterCreator;

      // ⚠️ Используем правильный эндпоинт
      const response = await api.get('projects/available/', { params });

      setAvailableProjects(response.data.projects || []);
      setUniqueCategories(response.data.filters?.categories || []);
      setUniqueCreators(response.data.filters?.creators || []);
      setError(null);
    } catch (err) {
      console.error('Ошибка загрузки проектов:', err);
      setError('Не удалось загрузить проекты');
      setAvailableProjects([]); // ← НИКАКИХ МОКОВ
      setUniqueCategories([]);
      setUniqueCreators([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableBrands = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filterCategory) params.category = filterCategory;
      if (filterCreator) params.creator = filterCreator;

      const response = await api.get('brands/available/', { params });
      setAvailableBrands(response.data.brands || []);
      setUniqueCategories(response.data.filters?.categories || []);
      setUniqueCreators(response.data.filters?.creators || []);
      setError(null);
    } catch (err) {
      console.error('Ошибка загрузки магазинов:', err);
      setError('Не удалось загрузить магазины');
      setAvailableBrands([]);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (brand) => {
    try {
      await api.post('connections/', { brand_id: brand.id });
      alert(`Подключено: ${brand.name}`);
      setAvailableBrands(prev => prev.filter(b => b.id !== brand.id));
    } catch (err) {
      alert('Ошибка подключения');
    }
  };

  const handleVisitProject = (project) => {
    const url = project.preview_url || `/project-preview/${project.id}/`;
    window.open(url, '_blank');
  };

  const handleGoToCart = () => {
    window.location.href = '/cart';
  };

  const renderColorIndicator = (color) => {
    if (!color) return null;
    return (
      <span
        style={{
          display: 'inline-block',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: color,
          border: '1px solid #ccc',
          verticalAlign: 'middle',
          marginLeft: '4px'
        }}
      />
    );
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: '#FFFAF4', minHeight: '100vh' }}>
        <Header />
        <div style={{ paddingTop: '70px' }}></div>
        <div className="container mt-4 text-center">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </div>
          <div className="ms-3" style={{ color: '#886128' }}>
            Загрузка {viewMode === 'projects' ? 'проектов' : 'магазинов'}...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#FFFAF4', minHeight: '100vh' }}>
      <Header />
      <div style={{ paddingTop: '70px' }}></div>
      <div className="container mt-4">
        <h1 className="text-center mb-4" style={{ color: '#886128', fontWeight: 'bold' }}>Личный кабинет</h1>

        {error && (
          <div className="alert alert-warning text-center">{error}</div>
        )}

        <div className="text-center mb-4">
          <div className="btn-group">
            <button
              className={`btn ${viewMode === 'projects' ? 'btn-warning' : 'btn-outline-warning'}`}
              onClick={() => setViewMode('projects')}
            >
              Все сайты
            </button>
            <button
              className={`btn ${viewMode === 'brands' ? 'btn-warning' : 'btn-outline-warning'}`}
              onClick={() => setViewMode('brands')}
            >
              Магазины
            </button>
          </div>
        </div>

        <div style={{
          backgroundColor: '#FFF4E5',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div style={{ flex: '1 1 200px' }}>
            <label style={{ color: '#886128', fontSize: '1rem', marginBottom: '5px', display: 'block' }}>
              {viewMode === 'projects' ? 'Категория сайта:' : 'Категория магазина:'}
            </label>
            <select
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '8px',
                border: '1px solid #EED1A6',
                color: '#886128',
                backgroundColor: '#FFF'
              }}
            >
              <option value="">Все</option>
              {uniqueCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div style={{ flex: '1 1 200px' }}>
            <label style={{ color: '#886128', fontSize: '1rem', marginBottom: '5px', display: 'block' }}>
              Создатель:
            </label>
            <select
              value={filterCreator}
              onChange={e => setFilterCreator(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '8px',
                border: '1px solid #EED1A6',
                color: '#886128',
                backgroundColor: '#FFF'
              }}
            >
              <option value="">Все</option>
              {uniqueCreators.map(creator => (
                <option key={creator} value={creator}>{creator}</option>
              ))}
            </select>
          </div>
        </div>

        {viewMode === 'projects' ? (
          <div className="row g-4">
            {availableProjects.length === 0 ? (
              <div className="col-12 text-center py-5">
                <p style={{ color: '#886128', fontSize: '1.2rem' }}>Нет доступных сайтов</p>
                <p style={{ color: '#886128' }}>Создайте первый проект в конструкторе!</p>
                <button
                  className="btn btn-warning mt-3"
                  onClick={() => window.location.href = '/constructor'}
                >
                  Перейти в конструктор
                </button>
              </div>
            ) : (
              availableProjects.map(project => (
                <div key={project.id} className="col-md-6 col-lg-4">
                  <div className="card h-100" style={{ borderColor: '#EED1A6' }}>
                    <div className="card-header" style={{ backgroundColor: project.is_shop ? '#FFF8E1' : '#F9E5C8' }}>
                      <h5 className="mb-0" style={{
                        color: project.text_color || '#886128',
                        fontSize: '1.1rem',
                        backgroundColor: project.bg_color || 'transparent',
                        padding: '4px 8px',
                        borderRadius: '4px'
                      }}>
                        {project.title}
                        {renderColorIndicator(project.text_color)}
                      </h5>
                    </div>
                    <div className="card-body d-flex flex-column">
                      <p className="card-text" style={{ color: '#886128', flex: 1 }}>
                        {project.short_description}
                      </p>
                      <div className="mt-auto">
                        <button
                          className="btn w-100 mb-2"
                          style={{ backgroundColor: '#FFA000', color: 'white' }}
                          onClick={() => handleVisitProject(project)}
                        >
                          👁️ Посетить
                        </button>
                        {project.is_shop && (
                          <button
                            className="btn w-100"
                            style={{ backgroundColor: '#FFF8E1', color: '#FFA000', border: '1px solid #FFCA28' }}
                            onClick={() => handleConnect({ id: project.id, name: project.title })}
                          >
                            <img src={connectIcon} alt="Подключиться" style={{ width: '18px' }} />
                            Подключиться
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div>
            {availableBrands.length === 0 ? (
              <div className="text-center py-5">
                <p style={{ color: '#886128' }}>Нет доступных магазинов</p>
              </div>
            ) : (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Название</th>
                    <th>Создатель</th>
                    <th>Категория</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {availableBrands.map(brand => (
                    <tr key={brand.id}>
                      <td>{brand.name}</td>
                      <td>{brand.creator?.username || 'Аноним'}</td>
                      <td>{brand.category}</td>
                      <td>
                        <button
                          className="btn btn-sm"
                          style={{ backgroundColor: '#FFF8E1', color: '#FFA000' }}
                          onClick={() => handleConnect(brand)}
                        >
                          Подключиться
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn"
            style={{ backgroundColor: '#FFA000', color: 'white' }}
            onClick={handleGoToCart}
          >
            Перейти в корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
