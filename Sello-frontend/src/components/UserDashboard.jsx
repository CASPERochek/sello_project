

// // src/components/UserDashboard.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
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
//   const navigate = useNavigate();
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
//   const [loadingProject, setLoadingProject] = useState(null);

//   useEffect(() => {
//     fetchUserInfo();
//     if (viewMode === 'projects') {
//       fetchAvailableProjects();
//     } else {
//       fetchAvailableBrands();
//     }
//   }, [viewMode, filterCategory, filterCreator]);

//   const fetchUserInfo = async () => {
//     try {
//       const response = await api.get('auth/user/');
//       setUserInfo(response.data);
//     } catch (err) {
//       console.error('Ошибка при загрузке информации о пользователе:', err);
//     }
//   };

//   const loadProjectForPreview = async (projectId) => {
//     try {
//       setLoadingProject(projectId);
//       const response = await constructorApi.get(`designs/${projectId}/`);
//       const design = response.data;
      
//       const previewData = {
//         id: design.id,
//         name: design.name || 'Без названия',
//         blocks: design.blocks || [],
//         text_color: design.text_color || '#000000',
//         bg_color: design.bg_color || '#ffffff',
//         metadata: design.metadata || {}
//       };
      
//       navigate('/preview', { state: previewData });
//     } catch (err) {
//       console.error('Ошибка загрузки проекта для превью:', err);
//       alert('Не удалось загрузить проект для предпросмотра');
//     } finally {
//       setLoadingProject(null);
//     }
//   };

//   const fetchAvailableProjects = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await constructorApi.get('designs/', {
//         params: {
//           is_public: true,
//           category: filterCategory || undefined,
//           search: filterCreator || undefined
//         }
//       });

//       const formattedProjects = response.data.results.map(design => ({
//         id: design.id,
//         title: design.name || 'Без названия',
//         owner: { 
//           username: design.user || 'Аноним',
//           id: design.user_id 
//         },
//         category: design.metadata?.category || 'Дизайн',
//         description: design.metadata?.description || '',
//         is_shop: design.metadata?.is_shop || false,
//         short_description: design.metadata?.description 
//           ? (design.metadata.description.length > 100 
//             ? design.metadata.description.substring(0, 100) + '...' 
//             : design.metadata.description)
//           : 'Без описания',
//         text_color: design.text_color || '#000000',
//         bg_color: design.bg_color || '#ffffff',
//         is_public: design.is_public || false,
//         blocks_count: design.blocks_count || 0,
//         blocks: design.blocks || [],
//         thumbnail: design.thumbnail,
//         version: design.version || '1.0',
//         metadata: design.metadata || {}
//       }));
      
//       setAvailableProjects(formattedProjects);
      
//       const categories = [...new Set(formattedProjects
//         .map(p => p.category)
//         .filter(c => c && c.trim() !== ''))];
      
//       const creators = [...new Set(formattedProjects
//         .map(p => p.owner.username)
//         .filter(c => c && c.trim() !== ''))];
      
//       setUniqueCategories(categories);
//       setUniqueCreators(creators);
//     } catch (err) {
//       console.error('❌ Ошибка при загрузке проектов:', err);
//       setError('Не удалось загрузить проекты из конструктора');
//       setAvailableProjects(getMockProjects());
//       setUniqueCategories(['Дизайн', 'Лендинг', 'Магазин', 'Портфолио', 'Блог']);
//       setUniqueCreators(['Иван', 'Мария', 'Алексей', 'Елена']);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAvailableBrands = async () => {
//     try {
//       setLoading(true);
//       setError(null);
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

//   const getMockProjects = () => {
//     return [
//       { 
//         id: 1, 
//         title: 'Магазин электроники TechStore', 
//         owner: { username: 'Иван' }, 
//         category: 'Интернет-магазин',
//         description: 'Современный магазин электроники с широким ассортиментом',
//         is_shop: true,
//         short_description: 'Современный магазин электроники с широким ассортиментом',
//         text_color: '#000000',
//         bg_color: '#ffffff',
//         is_public: true,
//         blocks_count: 5,
//         blocks: [],
//         version: '1.0'
//       },
//     ];
//   };

//   const getMockBrands = () => {
//     return [
//       { id: 1, name: 'СуперМагазин', creator: { username: 'Иван' }, category: 'Электроника' },
//       { id: 2, name: 'Селло', creator: { username: 'Аноним' }, category: 'Одежда' },
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

//   const handleVisitProject = async (project) => {
//     loadProjectForPreview(project.id);
//   };

//   const handleVisitProjectNewTab = async (project) => {
//     if (project.blocks && project.blocks.length > 0) {
//       const previewData = {
//         id: project.id,
//         name: project.title,
//         blocks: project.blocks,
//         text_color: project.text_color,
//         bg_color: project.bg_color,
//         metadata: project.metadata
//       };
      
//       const newWindow = window.open('', '_blank');
//       const previewHtml = `
//         <html>
//           <head>
//             <title>${project.title} - Превью</title>
//             <style>
//               body { 
//                 margin: 0; 
//                 padding: 20px;
//                 background-color: ${project.bg_color};
//                 color: ${project.text_color};
//                 font-family: Arial, sans-serif;
//               }
//               .preview-container { max-width: 800px; margin: 0 auto; }
//               .block { margin-bottom: 32px; }
//               h2 { text-align: center; margin: 20px 0; }
//               p { line-height: 1.6; }
//             </style>
//           </head>
//           <body>
//             <div class="preview-container">
//               <h2>${project.title}</h2>
//               <p><em>Это предварительный просмотр проекта</em></p>
//               <div id="blocks-container"></div>
//             </div>
//             <script>
//               document.getElementById('blocks-container').innerHTML = 
//                 '<p>Для полного просмотра используйте кнопку "Посмотреть проект" в основном интерфейсе</p>';
//             </script>
//           </body>
//         </html>
//       `;
//       newWindow.document.write(previewHtml);
//       newWindow.document.close();
//     } else {
//       loadProjectForPreview(project.id);
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
//           <div className="mt-3"></div>
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
//                     // УДАЛЕНО: borderLeft и использование bg_color в карточке
//                   }}
//                   onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
//                   onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//                   >
//                     {/* ФИКСИРОВАННЫЙ ЦВЕТ ФОНА — НЕ ЗАВИСИТ ОТ project.bg_color */}
//                     <div className="card-header" style={{ 
//                       backgroundColor: '#F9E5C8', // ← БАЗОВЫЙ ЦВЕТ
//                       borderBottom: '1px solid #EED1A6',
//                       color: '#886128' // ← БАЗОВЫЙ ЦВЕТ ТЕКСТА
//                     }}>
//                       <div className="d-flex justify-content-between align-items-center">
//                         <h5 className="mb-0" style={{ 
//                           fontSize: '1.1rem',
//                           fontWeight: 'bold'
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
//                       <p className="card-text" style={{ 
//                         color: '#886128', // ← БАЗОВЫЙ ЦВЕТ ТЕКСТА
//                         flex: 1, 
//                         fontSize: '0.95rem' 
//                       }}>
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
//                         <div className="d-flex align-items-center mb-2">
//                           <span className="small me-2" style={{ color: '#886128' }}>Цвета:</span>
//                           <div 
//                             className="me-1" 
//                             style={{ 
//                               backgroundColor: project.text_color || '#000000',
//                               width: '12px', 
//                               height: '12px',
//                               borderRadius: '50%',
//                               border: '1px solid #ccc'
//                             }} 
//                             title={`Цвет текста: ${project.text_color || '#000000'}`}
//                           />
//                           <div 
//                             style={{ 
//                               backgroundColor: project.bg_color || '#ffffff',
//                               width: '12px', 
//                               height: '12px',
//                               borderRadius: '50%',
//                               border: '1px solid #ccc'
//                             }} 
//                             title={`Цвет фона: ${project.bg_color || '#ffffff'}`}
//                           />
//                         </div>
//                       </div>
//                       <div className="mt-auto pt-3">
//                         <button
//                           onClick={() => handleVisitProject(project)}
//                           className="btn w-100 d-flex align-items-center justify-content-center"
//                           style={{
//                             backgroundColor: '#FFA000',
//                             color: 'white',
//                             border: 'none',
//                             borderRadius: '20px',
//                             padding: '8px 16px',
//                             cursor: 'pointer',
//                             marginBottom: '10px',
//                             fontSize: '0.9rem',
//                             minHeight: '40px'
//                           }}
//                           disabled={loadingProject === project.id}
//                         >
//                           {loadingProject === project.id ? (
//                             <>
//                               <span className="spinner-border spinner-border-sm me-2" role="status"></span>
//                               Загрузка...
//                             </>
//                           ) : (
//                             <>
//                               👁️ Посмотреть проект
//                             </>
//                           )}
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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import connectIcon from '../assets/icon/connect-icon.svg';

// Настройка axios для основного API
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

// API для конструктора
const constructorApi = axios.create({
  baseURL: 'http://localhost:8000/constructor/api/',
  withCredentials: true,
});

constructorApi.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// API для товаров и брендов
const productApi = axios.create({
  baseURL: 'http://localhost:8000/product/api/',
  withCredentials: true,
});

productApi.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

const UserDashboard = () => {
  const navigate = useNavigate();
  const [availableBrands, setAvailableBrands] = useState([]);
  const [availableProjects, setAvailableProjects] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterCreator, setFilterCreator] = useState('');
  const [viewMode, setViewMode] = useState('projects');
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [uniqueCreators, setUniqueCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loadingProject, setLoadingProject] = useState(null);
  const [brandsFromDB, setBrandsFromDB] = useState([]); // Все бренды из таблицы sello_tovar_brand
  const [brandsWithDetails, setBrandsWithDetails] = useState([]); // Объединенные данные

  useEffect(() => {
    fetchUserInfo();
    // Загружаем бренды из таблицы sello_tovar_brand
    fetchBrandsFromDB();
  }, []);

  useEffect(() => {
    if (viewMode === 'projects') {
      fetchAvailableProjects();
    } else {
      fetchAvailableBrands();
    }
  }, [viewMode, filterCategory, filterCreator]);

  // При изменении availableBrands или brandsFromDB, объединяем данные
  useEffect(() => {
    if (availableBrands.length > 0 && brandsFromDB.length > 0) {
      mergeBrandsWithDetails();
    }
  }, [availableBrands, brandsFromDB]);

  const fetchUserInfo = async () => {
    try {
      const response = await api.get('auth/user/');
      setUserInfo(response.data);
    } catch (err) {
      console.error('Ошибка при загрузке информации о пользователе:', err);
    }
  };

  // Загрузка всех брендов из таблицы sello_tovar_brand
  const fetchBrandsFromDB = async () => {
    try {
      console.log('🔄 Загружаем бренды из таблицы sello_tovar_brand...');
      const response = await productApi.get('brands/');
      console.log('✅ Данные брендов из БД получены:', response.data);
      
      if (response.data && Array.isArray(response.data)) {
        setBrandsFromDB(response.data);
      } else if (response.data.results && Array.isArray(response.data.results)) {
        setBrandsFromDB(response.data.results);
      }
    } catch (err) {
      console.error('❌ Ошибка загрузки брендов из БД:', err);
      // Используем моковые данные при ошибке
      setBrandsFromDB(getMockBrandsFromDB());
    }
  };

  // Функция для нормализации строк (удаление лишних пробелов, приведение к нижнему регистру)
  const normalizeString = (str) => {
    return str?.toLowerCase().trim().replace(/\s+/g, ' ') || '';
  };

  // Функция для сравнения названий брендов
  const compareBrandNames = (brandName, dbBrandName) => {
    const normalizedBrand = normalizeString(brandName);
    const normalizedDB = normalizeString(dbBrandName);
    
    // Прямое совпадение
    if (normalizedBrand === normalizedDB) return true;
    
    // Удаляем общие слова для лучшего сравнения
    const removeCommonWords = (str) => {
      const commonWords = ['магазин', 'shop', 'store', 'company', 'inc', 'ltd', 'бренд', 'марка'];
      return commonWords.reduce((acc, word) => 
        acc.replace(new RegExp(`\\b${word}\\b`, 'gi'), ''), str).trim();
    };
    
    const brandClean = removeCommonWords(normalizedBrand);
    const dbClean = removeCommonWords(normalizedDB);
    
    if (brandClean === dbClean) return true;
    
    // Частичное совпадение (если одно название содержит другое)
    return normalizedBrand.includes(normalizedDB) || normalizedDB.includes(normalizedBrand);
  };

  // Объединение данных: сравниваем название бренда и название магазина
  const mergeBrandsWithDetails = () => {
    console.log('🔄 Объединяем данные брендов и магазинов...');
    console.log('Доступные магазины:', availableBrands);
    console.log('Бренды из БД:', brandsFromDB);
    
    const merged = availableBrands.map(brand => {
      // Ищем соответствующий бренд в таблице sello_tovar_brand
      const matchingBrand = brandsFromDB.find(dbBrand => {
        return compareBrandNames(brand.name, dbBrand.name);
      });
      
      if (matchingBrand) {
        console.log(`✅ Для магазина "${brand.name}" найдены детали в БД:`, matchingBrand);
        return {
          ...brand,
          logo: matchingBrand.logo || matchingBrand.logo_url || null,
          description: matchingBrand.description || 'Нет описания',
          country: matchingBrand.country || 'Не указана',
          category: matchingBrand.category || brand.category || 'Без категории',
          // Сохраняем оригинальные данные для отладки
          _originalBrand: brand,
          _matchedBrand: matchingBrand
        };
      } else {
        console.log(`❌ Для магазина "${brand.name}" не найдено совпадений в БД`);
        return {
          ...brand,
          logo: null,
          description: 'Описание магазина временно недоступно',
          country: 'Не указана',
          category: brand.category || 'Без категории'
        };
      }
    });
    
    console.log('✅ Объединенные данные:', merged);
    setBrandsWithDetails(merged);
  };

  const loadProjectForPreview = async (projectId) => {
    try {
      setLoadingProject(projectId);
      const response = await constructorApi.get(`designs/${projectId}/`);
      const design = response.data;
      
      const previewData = {
        id: design.id,
        name: design.name || 'Без названия',
        blocks: design.blocks || [],
        text_color: design.text_color || '#000000',
        bg_color: design.bg_color || '#ffffff',
        metadata: design.metadata || {}
      };
      
      navigate('/preview', { state: previewData });
    } catch (err) {
      console.error('Ошибка загрузки проекта для превью:', err);
      alert('Не удалось загрузить проект для предпросмотра');
    } finally {
      setLoadingProject(null);
    }
  };

  const fetchAvailableProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await constructorApi.get('designs/', {
        params: {
          is_public: true,
          category: filterCategory || undefined,
          search: filterCreator || undefined
        }
      });

      const formattedProjects = response.data.results.map(design => ({
        id: design.id,
        title: design.name || 'Без названия',
        owner: { 
          username: design.user || 'Аноним',
          id: design.user_id 
        },
        category: design.metadata?.category || 'Дизайн',
        description: design.metadata?.description || '',
        is_shop: design.metadata?.is_shop || false,
        short_description: design.metadata?.description 
          ? (design.metadata.description.length > 100 
            ? design.metadata.description.substring(0, 100) + '...' 
            : design.metadata.description)
          : '',
        text_color: design.text_color || '#000000',
        bg_color: design.bg_color || '#ffffff',
        is_public: design.is_public || false,
        blocks_count: design.blocks_count || 0,
        blocks: design.blocks || [],
        thumbnail: design.thumbnail,
        version: design.version || '1.0',
        metadata: design.metadata || {}
      }));
      
      setAvailableProjects(formattedProjects);
      
      const categories = [...new Set(formattedProjects
        .map(p => p.category)
        .filter(c => c && c.trim() !== ''))];
      
      const creators = [...new Set(formattedProjects
        .map(p => p.owner.username)
        .filter(c => c && c.trim() !== ''))];
      
      setUniqueCategories(categories);
      setUniqueCreators(creators);
    } catch (err) {
      console.error('❌ Ошибка при загрузке проектов:', err);
      setError('Не удалось загрузить проекты из конструктора');
      setAvailableProjects(getMockProjects());
      setUniqueCategories(['Дизайн', 'Лендинг', 'Магазин', 'Портфолио', 'Блог']);
      setUniqueCreators(['Иван', 'Мария', 'Алексей', 'Елена']);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableBrands = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {};
      if (filterCategory) params.category = filterCategory;
      if (filterCreator) params.creator = filterCreator;
      
      const response = await api.get('brands/available/', { params });
      
      const brandsData = response.data.brands || response.data.results || [];
      console.log('🛒 Получены магазины из API:', brandsData);
      setAvailableBrands(brandsData);
      
      if (response.data.filters) {
        setUniqueCategories(response.data.filters.categories || []);
        setUniqueCreators(response.data.filters.creators || []);
      } else {
        const categories = [...new Set(brandsData.map(b => b.category) || [])];
        const creators = [...new Set(brandsData.map(b => b.creator?.username) || [])];
        setUniqueCategories(categories);
        setUniqueCreators(creators);
      }
    } catch (err) {
      console.error('Ошибка при загрузке магазинов:', err);
      setError('Не удалось загрузить магазины');
      setAvailableBrands(getMockBrands());
      setUniqueCategories(['Электроника', 'Одежда', 'Книги', 'Садоводство', 'Продукты']);
      setUniqueCreators(['Иван', 'Аноним', 'Павел', 'ПетяТоп', 'Фермер']);
    } finally {
      setLoading(false);
    }
  };

  const getMockProjects = () => {
    return [
      { 
        id: 1, 
        title: 'Магазин электроники TechStore', 
        owner: { username: 'Иван' }, 
        category: 'Интернет-магазин',
        description: 'Современный магазин электроники с широким ассортиментом',
        is_shop: true,
        short_description: 'Современный магазин электроники с широким ассортиментом',
        text_color: '#000000',
        bg_color: '#ffffff',
        is_public: true,
        blocks_count: 5,
        blocks: [],
        version: '1.0'
      },
    ];
  };

  const getMockBrands = () => {
    return [
      { 
        id: 1, 
        name: 'СуперМагазин', 
        creator: { username: 'Иван' }, 
        category: 'Электроника'
      },
      { 
        id: 2, 
        name: 'Селло', 
        creator: { username: 'Аноним' }, 
        category: 'Одежда'
      },
    ];
  };

  const getMockBrandsFromDB = () => {
    return [
      { 
        id: 1, 
        name: 'СуперМагазин', 
        logo: 'https://via.placeholder.com/80x80?text=СуперМагазин',
        description: 'Лучшие гаджеты по низким ценам. Широкий выбор электроники и бытовой техники. Мы работаем с 2010 года и предлагаем только качественную продукцию от проверенных производителей.',
        country: 'Россия',
        category: 'Электроника'
      },
      { 
        id: 2, 
        name: 'Селло', 
        logo: 'https://via.placeholder.com/80x80?text=Селло',
        description: 'Модная одежда и обувь по доступным ценам. Стиль и качество. Наш магазин предлагает широкий ассортимент одежды для всей семьи от ведущих брендов.',
        country: 'Россия',
        category: 'Одежда'
      },
      { 
        id: 3, 
        name: 'Книжный мир', 
        logo: 'https://via.placeholder.com/80x80?text=Книги',
        description: 'Книги для всех возрастов. Художественная и учебная литература. У нас вы найдете книги на любой вкус: от классики до современных бестселлеров.',
        country: 'Россия',
        category: 'Книги'
      },
      { 
        id: 4, 
        name: 'Фермерские продукты', 
        logo: 'https://via.placeholder.com/80x80?text=Фермер',
        description: 'Натуральные фермерские продукты напрямую от производителей. Свежие овощи, фрукты, молочные продукты и мясо. Качество, которому можно доверять.',
        country: 'Россия',
        category: 'Продукты'
      },
    ];
  };

  const handleConnect = async (brand) => {
    try {
      await api.post('connections/', { brand_id: brand.id });
      alert(`Вы успешно подключились к магазину: ${brand.name}`);
      setAvailableBrands(prev => prev.filter(b => b.id !== brand.id));
      setBrandsWithDetails(prev => prev.filter(b => b.id !== brand.id));
    } catch (err) {
      console.error('Ошибка при подключении:', err);
      alert(err.response?.data?.error || 'Не удалось подключиться к магазину');
    }
  };

  const handleVisitProject = async (project) => {
    loadProjectForPreview(project.id);
  };

  const handleGoToCart = () => {
    window.location.href = '/cart';
  };

  const handleRefreshProjects = () => {
    if (viewMode === 'projects') {
      fetchAvailableProjects();
    } else {
      fetchAvailableBrands();
      fetchBrandsFromDB(); // Перезагружаем и данные из БД
    }
  };

  const renderColorIndicator = (color) => {
    if (!color) return null;
    return (
      <span 
        className="color-indicator ms-2"
        style={{
          display: 'inline-block',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: color,
          border: '1px solid #ccc',
          verticalAlign: 'middle'
        }}
        title={`Цвет текста: ${color}`}
      ></span>
    );
  };

  // Функция для получения URL логотипа
  const getLogoUrl = (logo) => {
    if (!logo) return 'https://via.placeholder.com/80x80?text=Нет+лого';
    if (logo.startsWith('http')) return logo;
    if (logo.startsWith('/media/')) return `http://localhost:8000${logo}`;
    return `http://localhost:8000/media/${logo}`;
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: '#FFFAF4', minHeight: '100vh' }}>
        <Header />
        <div style={{ paddingTop: '70px' }}></div>
        <div className="container mt-4 d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
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
          <div className="alert alert-warning text-center" role="alert">
            {error}
            <button 
              className="btn btn-sm btn-outline-warning ms-3"
              onClick={handleRefreshProjects}
            >
              Обновить
            </button>
          </div>
        )}

        <div className="text-center mb-4">
          <div className="mt-3"></div>
        </div>

        <div style={{
          backgroundColor: '#FFF4E5',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          alignItems: 'center'
        }}>
          {/* <div style={{ flex: '1 1 calc(50% - 10px)' }}>
            <label style={{ color: '#886128', fontSize: '1rem', display: 'block', marginBottom: '5px' }}>
              {viewMode === 'projects' ? 'Категория сайта:' : 'Категория магазина:'}
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '8px',
                border: '1px solid #EED1A6',
                color: '#886128',
                backgroundColor: '#FFF'
              }}
            >
              <option value="">Все категории</option>
              {uniqueCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div> */}

          <div style={{ flex: '1 1 calc(50% - 10px)' }}>
            <label style={{ color: '#886128', fontSize: '1rem', display: 'block', marginBottom: '5px' }}>
              {viewMode === 'projects' ? 'Создатель сайта:' : 'Создатель магазина:'}
            </label>
            <select
              value={filterCreator}
              onChange={(e) => setFilterCreator(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '8px',
                border: '1px solid #EED1A6',
                color: '#886128',
                backgroundColor: '#FFF'
              }}
            >
              <option value="">Все создатели</option>
              {uniqueCreators.map(creator => (
                <option key={creator} value={creator}>{creator}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4 d-flex justify-content-between align-items-center">
          <span style={{ color: '#886128', fontSize: '1.2rem', fontWeight: 'bold' }}>
            {viewMode === 'projects' ? 'Доступные сайты' : 'Доступные магазины'}
          </span>
          {viewMode === 'projects' && availableProjects.length > 0 && (
            <div className="text-muted small"></div>
          )}
        </div>

        {viewMode === 'projects' ? (
          <div className="row g-4">
            {availableProjects.length === 0 ? (
              <div className="col-12 text-center py-5">
                <p style={{ color: '#886128', fontSize: '1.2rem' }}>Нет доступных сайтов</p>
                <p style={{ color: '#886128' }}>Попробуйте изменить фильтры или создать свой первый проект!</p>
                <button 
                  className="btn btn-warning mt-3"
                  onClick={() => window.location.href = '/constructor'}
                >
                  Создать проект
                </button>
              </div>
            ) : (
              availableProjects.map(project => (
                <div key={project.id} className="col-md-6 col-lg-4">
                  <div className="card h-100" style={{ 
                    borderColor: '#EED1A6', 
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <div className="card-header" style={{ 
                      backgroundColor: '#F9E5C8',
                      borderBottom: '1px solid #EED1A6',
                      color: '#886128'
                    }}>
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0" style={{ 
                          fontSize: '1.1rem',
                          fontWeight: 'bold'
                        }}>
                          {project.title}
                          {/* {renderColorIndicator(project.text_color)} */}
                        </h5>
                        {project.is_shop && (
                          <span className="badge" style={{ backgroundColor: '#FFA000', color: 'white' }}>
                            Магазин
                          </span>
                        )}
                        {!project.is_public && (
                          <span className="badge bg-secondary ms-1" style={{ fontSize: '0.7rem' }}>
                            Приватный
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="card-body d-flex flex-column">
                      <p className="card-text" style={{ 
                        color: '#886128',
                        flex: 1, 
                        fontSize: '0.95rem' 
                      }}>
                        {project.short_description}
                      </p>
                      <div className="mt-3">
                        <p className="card-text small" style={{ color: '#886128', marginBottom: '5px' }}>
                          <strong>Создатель:</strong> {project.owner?.username || 'Аноним'}
                        </p>
                        {/* {project.category && (
                          <p className="card-text small" style={{ color: '#886128', marginBottom: '5px' }}>
                            <strong>Категория:</strong> {project.category}
                          </p>
                        )} */}
                        {project.blocks_count > 0 && (
                          <p className="card-text small" style={{ color: '#886128', marginBottom: '10px' }}>
                            <strong>Блоков:</strong> {project.blocks_count}
                          </p>
                        )}
                        <div className="d-flex align-items-center mb-2">
                          {/* <span className="small me-2" style={{ color: '#886128' }}>Цвета:</span>
                          <div 
                            className="me-1" 
                            style={{ 
                              backgroundColor: project.text_color || '#000000',
                              width: '12px', 
                              height: '12px',
                              borderRadius: '50%',
                              border: '1px solid #ccc'
                            }} 
                            title={`Цвет текста: ${project.text_color || '#000000'}`}
                          />
                          <div 
                            style={{ 
                              backgroundColor: project.bg_color || '#ffffff',
                              width: '12px', 
                              height: '12px',
                              borderRadius: '50%',
                              border: '1px solid #ccc'
                            }} 
                            title={`Цвет фона: ${project.bg_color || '#ffffff'}`}
                          /> */}
                        </div>
                      </div>
                      <div className="mt-auto pt-3 me-3">
                        <button
                          onClick={() => handleVisitProject(project)}
                          className="btn  d-flex align-items-center justify-content-center"
                          style={{
                            backgroundColor: '#FFA000',
                            color: 'white',
                            border: 'none',
                            borderRadius: '20px',
                            padding: '8px 16px',
                            cursor: 'pointer',
                            marginBottom: '10px',
                            fontSize: '0.9rem',
                            minHeight: '40px',
                            width: '200px',
                            marginLeft: '85px'
                          }}
                          disabled={loadingProject === project.id}
                        >
                          {loadingProject === project.id ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                              Загрузка...
                            </>
                          ) : (
                            <>
                               Посмотреть проект
                            </>
                          )}
                        </button>
                        
                        {project.is_shop && project.brand && (
                          <button
                            onClick={() => handleConnect(project.brand)}
                            className="btn w-100"
                            style={{
                              backgroundColor: '#FFF8E1',
                              color: '#FFA000',
                              border: '1px solid #FFCA28',
                              borderRadius: '20px',
                              padding: '8px 16px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '8px',
                              fontSize: '0.9rem'
                            }}
                          >
                            <img
                              src={connectIcon}
                              alt="Подключиться"
                              style={{ width: '18px' }}
                            />
                            Подключиться как покупатель
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="card-footer text-muted small d-flex justify-content-between" style={{ 
                      backgroundColor: '#FFF4E5',
                      borderTop: '1px solid #EED1A6',
                      fontSize: '0.8rem'
                    }}>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="table-responsive">
            {brandsWithDetails.length === 0 ? (
              <div className="text-center py-5">
                <p style={{ color: '#886128' }}>Нет доступных магазинов</p>
                <p style={{ color: '#886128' }}>Все магазины уже подключены или еще не созданы</p>
                <button 
                  className="btn btn-warning mt-3"
                  onClick={handleRefreshProjects}
                >
                  Обновить список магазинов
                </button>
              </div>
            ) : (
              <table style={{
                width: '100%',
                backgroundColor: '#FFF',
                borderCollapse: 'collapse',
                border: '1px solid #EED1A6',
                marginBottom: '1rem'
              }}>
                <thead>
                  <tr>
                    <th style={{
                      backgroundColor: '#F9E5C8',
                      color: '#886128',
                      border: '1px solid #EED1A6',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                      padding: '12px',
                      fontWeight: 'bold',
                      fontSize: '16px'
                    }}>
                      Логотип
                    </th>
                    <th style={{
                      backgroundColor: '#F9E5C8',
                      color: '#886128',
                      border: '1px solid #EED1A6',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                      padding: '12px',
                      fontWeight: 'bold',
                      fontSize: '16px'
                    }}>
                      Название магазина
                    </th>
                    <th style={{
                      backgroundColor: '#F9E5C8',
                      color: '#886128',
                      border: '1px solid #EED1A6',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                      padding: '12px',
                      fontWeight: 'bold',
                      fontSize: '16px'
                    }}>
                      Описание магазина
                    </th>
                    <th style={{
                      backgroundColor: '#F9E5C8',
                      color: '#886128',
                      border: '1px solid #EED1A6',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                      padding: '12px',
                      fontWeight: 'bold',
                      fontSize: '16px'
                    }}>
                      Страна
                    </th>
                    <th style={{
                      backgroundColor: '#F9E5C8',
                      color: '#886128',
                      border: '1px solid #EED1A6',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                      padding: '12px',
                      fontWeight: 'bold',
                      fontSize: '16px'
                    }}>
                      Категория
                    </th>
                    <th style={{
                      backgroundColor: '#F9E5C8',
                      color: '#886128',
                      border: '1px solid #EED1A6',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                      padding: '12px',
                      fontWeight: 'bold',
                      fontSize: '16px'
                    }}>
                      Опции
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {brandsWithDetails.map((brand, index) => (
                    <tr key={brand.id} style={{ border: '1px solid #EED1A6' }}>
                      <td style={{
                        border: '1px solid #EED1A6',
                        color: '#886128',
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        padding: '12px',
                        fontSize: '15px'
                      }}>
                        <img 
                          src={getLogoUrl(brand.logo)} 
                          alt={`Логотип ${brand.name}`}
                          style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '8px',
                            objectFit: 'cover',
                            border: '1px solid #EED1A6'
                          }}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/80x80?text=Нет+лого';
                            e.target.style.objectFit = 'contain';
                            e.target.style.padding = '8px';
                          }}
                        />
                      </td>
                      <td style={{
                        border: '1px solid #EED1A6',
                        color: '#886128',
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        padding: '12px',
                        fontSize: '15px',
                        fontWeight: 'bold'
                      }}>
                        {brand.name}
                        <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                          👤 Создатель: {brand.creator?.username || brand.creator || 'Аноним'}
                        </div>
                      </td>
                      <td style={{
                        border: '1px solid #EED1A6',
                        color: '#886128',
                        textAlign: 'left',
                        verticalAlign: 'middle',
                        padding: '12px',
                        fontSize: '14px',
                        maxWidth: '300px'
                      }}>
                        <div style={{
                          maxHeight: '150px',
                          overflowY: 'auto',
                          paddingRight: '5px'
                        }}>
                          {brand.description || 'Нет описания'}
                        </div>
                      </td>
                      <td style={{
                        border: '1px solid #EED1A6',
                        color: '#886128',
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        padding: '12px',
                        fontSize: '15px'
                      }}>
                        {brand.country || 'Не указана'}
                      </td>
                      <td style={{
                        border: '1px solid #EED1A6',
                        color: '#886128',
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        padding: '12px',
                        fontSize: '15px'
                      }}>
                        {brand.category || 'Без категории'}
                      </td>
                      <td style={{
                        border: '1px solid #EED1A6',
                        color: '#886128',
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        padding: '12px',
                        fontSize: '15px'
                      }}>
                        <button
                          onClick={() => handleConnect(brand)}
                          style={{
                            background: '#FFF8E1',
                            color: '#FFA000',
                            border: '1px solid #FFCA28',
                            borderRadius: '20px',
                            padding: '8px 15px',
                            fontSize: '14px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            justifyContent: 'center',
                            width: '150px',
                            margin: '0 auto',
                            transition: 'all 0.3s ease',
                            minWidth: '150px'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#FFA000';
                            e.currentTarget.style.color = 'white';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#FFF8E1';
                            e.currentTarget.style.color = '#FFA000';
                          }}
                        >
                          <img
                            src={connectIcon}
                            alt="Подключиться"
                            style={{ width: '18px' }}
                          />
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
            onClick={handleGoToCart}
            style={{
              backgroundColor: '#FFA000',
              color: 'white',
              border: 'none',
              borderRadius: '20px',
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Перейти в корзину
          </button>
        </div>
        <br />
        <br />
      </div>
    </div>
  );
};

export default UserDashboard;