// // // src/components/CreatorDashboard.jsx
// // import React, { useState } from 'react';
// // import Header from './Header';
// // import plusIcon from '../assets/icon/plus-icon-brown.svg';
// // import editIcon from '../assets/icon/edit-icon.svg';
// // import deleteIcon from '../assets/icon/delete-icon.svg';

// // import 'bootstrap/dist/css/bootstrap.min.css';

// // import {
// //   Chart as ChartJS,
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   ArcElement,
// //   Tooltip,
// //   Legend,
// // } from 'chart.js';
// // import { Bar, Doughnut } from 'react-chartjs-2';

// // ChartJS.register(
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   ArcElement,
// //   Tooltip,
// //   Legend
// // );

// // const CreatorDashboard = () => {
// //   const [showModal, setShowModal] = useState(false);
// //   const [newBrandName, setNewBrandName] = useState('');
// //   const [newBrandCategory, setNewBrandCategory] = useState('');

// //   // Моковые данные
// //   const [brands, setBrands] = useState([
// //     { id: 1, name: 'СуперМагазин', createdAt: '18.12.2025', category: 'Электроника', orders: 46736482 },
// //     { id: 2, name: 'Селло', createdAt: '19.11.2025', category: 'Одежда', orders: 100 },
// //     { id: 3, name: 'Магазин', createdAt: '07.11.2025', category: 'Книги', orders: 0 },
// //     { id: 4, name: 'Лучший магазин', createdAt: '01.11.2025', category: 'Продукты', orders: 2874966386365 },
// //     { id: 5, name: 'Новый магазин', createdAt: '12.10.2025', category: 'Обувь', orders: 24 },
// //   ]);

// //   const handleAddBrand = () => {
// //     if (!newBrandName.trim() || !newBrandCategory.trim()) return;

// //     const newBrand = {
// //       id: brands.length + 1,
// //       name: newBrandName,
// //       createdAt: new Date().toLocaleDateString('ru-RU'),
// //       category: newBrandCategory,
// //       orders: 0,
// //     };

// //     setBrands([...brands, newBrand]);
// //     setNewBrandName('');
// //     setNewBrandCategory('');
// //     setShowModal(false);
// //     console.log('Переход на BrandsPage...');
// //   };

// //   const handleEditBrand = (brand) => {
// //     window.location.href = `/constructor?brandId=${brand.id}`;
// //   };

// //   const handleDeleteBrand = (id) => {
// //     if (window.confirm('Вы уверены, что хотите удалить этот магазин?')) {
// //       setBrands(brands.filter(brand => brand.id !== id));
// //     }
// //   };

// //   // Статистика
// //   const totalOrders = brands.reduce((sum, b) => sum + b.orders, 0);
// //   const totalBrands = brands.length;
// //   const avgOrdersPerBrand = totalBrands > 0 ? Math.round(totalOrders / totalBrands) : 0;

// //   // Топ-магазин по заказам
// //   const topBrand = brands.reduce((prev, current) => (prev.orders > current.orders ? prev : current), brands[0]);

// //   // Данные для графиков
// //   const barChartData = {
// //     labels: brands.map(b => b.name),
// //     datasets: [
// //       {
// //         label: 'Количество заказов',
// //         data: brands.map(b => b.orders),
// //         backgroundColor: '#FFCA28',
// //         borderColor: '#FFA000',
// //         borderWidth: 1,
// //       },
// //     ],
// //   };

// //   const doughnutChartData = {
// //     labels: ['Активные магазины', 'Без заказов'],
// //     datasets: [
// //       {
// //         data: [brands.filter(b => b.orders > 0).length, brands.filter(b => b.orders === 0).length],
// //         backgroundColor: ['#FFA000', '#F9E5C8'],
// //         borderColor: '#886128',
// //         borderWidth: 1,
// //       },
// //     ],
// //   };

// //   const chartOptions = {
// //     responsive: true,
// //     plugins: {
// //       legend: {
// //         position: 'top',
// //       },
// //       tooltip: {
// //         callbacks: {
// //           label: function(context) {
// //             return `${context.label}: ${context.raw}`;
// //           }
// //         }
// //       }
// //     },
// //     scales: {
// //       y: {
// //         beginAtZero: true,
// //         grid: {
// //           color: '#EED1A6'
// //         },
// //         ticks: {
// //           color: '#886128'
// //         }
// //       },
// //       x: {
// //         grid: {
// //           color: '#EED1A6'
// //         },
// //         ticks: {
// //           color: '#886128',
// //           maxRotation: 45,
// //           minRotation: 45
// //         }
// //       }
// //     }
// //   };

// //   // Опции для дугового графика — ограничиваем высоту
// //   const doughnutOptions = {
// //     ...chartOptions,
// //     plugins: {
// //       legend: {
// //         position: 'bottom'
// //       }
// //     },
// //     aspectRatio: 1, // Сохраняет квадратную форму
// //     maintainAspectRatio: false, // Разрешает растягивать по высоте
// //   };

// //   return (
// //     <div style={{ backgroundColor: '#FFFAF4', minHeight: '100vh' }}>
// //       <Header />

// //       {/* Отступ сверху, чтобы Header не перекрывал контент */}
// //       <div style={{ paddingTop: '70px' }}></div>

// //       <div className="container mt-4">
// //         {/* Заголовок */}
// //         <h1 className="text-center mb-4" style={{ color: '#886128', fontWeight: 'bold' }}>Личный кабинет</h1>

// //         {/* Строка "Мои проекты" + кнопка "Добавить проект" */}
// //         <div className="d-flex justify-content-between align-items-center mb-4">
// //           <span style={{ color: '#886128', fontSize: '1.2rem' }}>Мои проекты</span>
// //           <button
// //             className="btn d-flex align-items-center"
// //             onClick={() => setShowModal(true)}
// //             style={{
// //               color: '#AA8144',
// //               border: 'none',
// //               background: 'none',
// //               padding: '5px 10px',
// //               textDecoration: 'none',
// //               cursor: 'pointer',
// //               fontSize: '1.2rem'
// //             }}
// //           >
// //             <img src={plusIcon} alt="Плюс" style={{ width: '20px', marginRight: '8px' }} />
// //             Добавить проект
// //           </button>
// //         </div>

// //         {/* Таблица проектов */}
// // {/* Таблица проектов */}
// // <div className="table-responsive">
// //   <table style={{ 
// //     width: '100%',
// //     backgroundColor: '#FFF',
// //     borderCollapse: 'collapse',
// //     border: '1px solid #EED1A6',
// //     marginBottom: '1rem'
// //   }}>
// //     <thead>
// //       <tr>
// //         <th style={{ 
// //           backgroundColor: '#F9E5C8',
// //           color: '#886128',
// //           border: '1px solid #EED1A6',
// //           textAlign: 'center',
// //           verticalAlign: 'middle',
// //           padding: '12px',
// //           fontWeight: 'bold',
// //           fontSize: '16px'
// //         }}>
// //           №
// //         </th>
// //         <th style={{ 
// //           backgroundColor: '#F9E5C8',
// //           color: '#886128',
// //           border: '1px solid #EED1A6',
// //           textAlign: 'center',
// //           verticalAlign: 'middle',
// //           padding: '12px',
// //           fontWeight: 'bold',
// //           fontSize: '16px'
// //         }}>
// //           Название магазина
// //         </th>
// //         <th style={{ 
// //           backgroundColor: '#F9E5C8',
// //           color: '#886128',
// //           border: '1px solid #EED1A6',
// //           textAlign: 'center',
// //           verticalAlign: 'middle',
// //           padding: '12px',
// //           fontWeight: 'bold',
// //           fontSize: '16px'
// //         }}>
// //           Дата создания
// //         </th>
// //         <th style={{ 
// //           backgroundColor: '#F9E5C8',
// //           color: '#886128',
// //           border: '1px solid #EED1A6',
// //           textAlign: 'center',
// //           verticalAlign: 'middle',
// //           padding: '12px',
// //           fontWeight: 'bold',
// //           fontSize: '16px'
// //         }}>
// //           Категория магазина
// //         </th>
// //         <th style={{ 
// //           backgroundColor: '#F9E5C8',
// //           color: '#886128',
// //           border: '1px solid #EED1A6',
// //           textAlign: 'center',
// //           verticalAlign: 'middle',
// //           padding: '12px',
// //           fontWeight: 'bold',
// //           fontSize: '16px'
// //         }}>
// //           Опции
// //         </th>
// //       </tr>
// //     </thead>
// //     <tbody>
// //       {brands.map((brand, index) => (
// //         <tr key={brand.id} style={{ border: '1px solid #EED1A6' }}>
// //           <td style={{ 
// //             border: '1px solid #EED1A6', 
// //             color: '#886128', 
// //             textAlign: 'center', 
// //             verticalAlign: 'middle', 
// //             padding: '12px',
// //             fontSize: '15px'
// //           }}>
// //             {index + 1}
// //           </td>
// //           <td style={{ 
// //             border: '1px solid #EED1A6', 
// //             color: '#886128', 
// //             textAlign: 'center', 
// //             verticalAlign: 'middle', 
// //             padding: '12px',
// //             fontSize: '15px'
// //           }}>
// //             {brand.name}
// //           </td>
// //           <td style={{ 
// //             border: '1px solid #EED1A6', 
// //             color: '#886128', 
// //             textAlign: 'center', 
// //             verticalAlign: 'middle', 
// //             padding: '12px',
// //             fontSize: '15px'
// //           }}>
// //             {brand.createdAt}
// //           </td>
// //           <td style={{ 
// //             border: '1px solid #EED1A6', 
// //             color: '#886128', 
// //             textAlign: 'center', 
// //             verticalAlign: 'middle', 
// //             padding: '12px',
// //             fontSize: '15px'
// //           }}>
// //             {brand.category}
// //           </td>
// //           <td style={{ 
// //             border: '1px solid #EED1A6', 
// //             color: '#886128', 
// //             textAlign: 'center', 
// //             verticalAlign: 'middle', 
// //             padding: '12px',
// //             fontSize: '15px'
// //           }}>
// //             <div className="d-flex justify-content-center gap-1">
// //               <button
// //                 className="brands-edit-btn"
// //                 onClick={() => handleEditBrand(brand)}
// //                 style={{
// //                   background: 'none',
// //                   border: 'none',
// //                   color: '#886128',
// //                   display: 'flex',
// //                   alignItems: 'center',
// //                   cursor: 'pointer',
// //                   padding: '5px 10px',
// //                   fontSize: '14px'
// //                 }}
// //               >
// //                 <img
// //                   src={editIcon}
// //                   alt="Изменить"
// //                   className="brands-action-icon"
// //                   style={{ width: '16px', marginRight: '4px' }}
// //                 />
// //                 Изменить
// //               </button>
// //               <button
// //                 className="brands-delete-btn"
// //                 onClick={() => handleDeleteBrand(brand.id)}
// //                 style={{
// //                   background: 'none',
// //                   border: 'none',
// //                   color: '#886128',
// //                   cursor: 'pointer',
// //                   padding: '5px 10px',
// //                   fontSize: '14px'
// //                 }}
// //               >
// //                 <img
// //                   src={deleteIcon}
// //                   alt="Удалить"
// //                   className="brands-action-icon"
// //                   style={{ width: '16px' }}
// //                 />
// //               </button>
// //             </div>
// //           </td>
// //         </tr>
// //       ))}
// //     </tbody>
// //   </table>
// // </div>

// //         {/* Статистика */}
// //         <div className="mt-5 p-4" style={{ backgroundColor: '#F9E5C8', borderRadius: '8px' }}>
// //           <h3 className="text-center mb-4" style={{ color: '#886128' }}>СТАТИСТИКА</h3>

// //           <div className="row g-4">
// //             {/* Общая статистика */}
// //             <div className="col-lg-6">
// //               <div className="p-3" style={{ backgroundColor: '#FFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', height: '150px' }}>
// //                 <h5 className='text-center' style={{ color: '#886128' }}>Общая статистика</h5>
// //                 <div className="d-flex justify-content-between my-2">
// //                   <span>Всего магазинов:</span>
// //                   <strong style={{ color: '#886128' }}>{totalBrands}</strong>
// //                 </div>
// //                 <div className="d-flex justify-content-between my-2">
// //                   <span>Всего заказов:</span>
// //                   <strong style={{ color: '#886128' }}>{totalOrders.toLocaleString()}</strong>
// //                 </div>
// //                 <div className="d-flex justify-content-between my-2">
// //                   <span>Среднее количество заказов на магазин:</span>
// //                   <strong style={{ color: '#886128' }}>{avgOrdersPerBrand}</strong>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Топ-магазин по заказам */}
// //             <div className="col-lg-6">
// //               <div className="p-4" style={{ backgroundColor: '#FFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', height: '150px' }}>
// //                 <h5 className='text-center mb-3' style={{ color: '#886128' }}>Топ-магазин по заказам</h5>
// //                 {brands.length > 0 ? (
// //                   <>
// //                     <p style={{ marginTop: '20px' }}><strong>{topBrand.name}</strong></p>
// //                     <p>Заказов: <strong>{topBrand.orders.toLocaleString()}</strong></p>
// //                   </>
// //                 ) : (
// //                   <p>Нет данных</p>
// //                 )}
// //               </div>
// //             </div>

// //             {/* График - Заказы по магазинам */}
// //             <div className="col-lg-6">
// //               <div className="p-4" style={{ backgroundColor: '#FFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', height: '350px', display: 'flex', flexDirection: 'column' }}>
// //                 <h5 className='text-center' style={{ color: '#886128' }}>Заказы по магазинам</h5>
// //                 <div style={{ flex: 1, minHeight: 0 }}>
// //                   <Bar data={barChartData} options={chartOptions} />
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Активность магазинов (дуговой график) */}
// //             <div className="col-lg-6">
// //               <div className="p-4" style={{ backgroundColor: '#FFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', height: '350px', display: 'flex', flexDirection: 'column' }}>
// //                 <h5 className='text-center' style={{ color: '#886128' }}>Активность магазинов</h5>
// //                 <div style={{ flex: 1, minHeight: 0 }}>
// //                   <Doughnut data={doughnutChartData} options={doughnutOptions} />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Всплывающее окно добавления проекта */}
// //       {showModal && (
// //         <div className="modal-backdrop show" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}></div>
// //       )}
// //       {showModal && (
// //         <div
// //           className="modal show d-block"
// //           style={{
// //             position: 'fixed',
// //             top: '50%',
// //             left: '50%',
// //             transform: 'translate(-50%, -50%)',
// //             zIndex: 1051,
// //             backgroundColor: '#FFF',
// //             borderRadius: '8px',
// //             padding: '20px',
// //             maxWidth: '500px',
// //             width: '90%',
// //             maxHeight: '35vh',
// //             overflowY: 'auto'
// //           }}
// //         >
// //           <h5 className='text-center' style={{ color: '#886128' }}>Добавить проект</h5>
// //           <div className="mb-3">
// //             <label htmlFor="brandName" className="form-label" style={{ color: '#886128' }}>Название магазина</label>
// //             <input
// //               type="text"
// //               className="form-control"
// //               id="brandName"
// //               value={newBrandName}
// //               onChange={(e) => setNewBrandName(e.target.value)}
// //               placeholder="Введите название магазина"
// //               style={{ borderColor: '#EED1A6', color: '#886128' }}
// //             />
// //           </div>
// //           <div className="mb-3">
// //             <label htmlFor="brandCategory" className="form-label" style={{ color: '#886128' }}>Категория магазина</label>
// //             <input
// //               type="text"
// //               className="form-control"
// //               id="brandCategory"
// //               value={newBrandCategory}
// //               onChange={(e) => setNewBrandCategory(e.target.value)}
// //               placeholder="Введите категорию"
// //               style={{ borderColor: '#EED1A6', color: '#886128' }}
// //             />
// //           </div>
// //           <div className="d-flex justify-content-end">
// //             <button
// //               className="btn me-2"
// //               onClick={() => setShowModal(false)}
// //               style={{ color: '#886128', border: '1px solid #EED1A6', background: 'none' }}
// //             >
// //               Отмена
// //             </button>
// //             <button
// //               className="btn"
// //               onClick={handleAddBrand}
// //               style={{ backgroundColor: '#FFA000', color: 'white', border: 'none' }}
// //             >
// //               Готово
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default CreatorDashboard;





// src/components/CreatorDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { apiService } from '../services/api';
import plusIcon from '../assets/icon/plus-icon-brown.svg';
import editIcon from '../assets/icon/edit-icon.svg';
import deleteIcon from '../assets/icon/delete-icon.svg';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const CreatorDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectCategory, setNewProjectCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('checking');
  
  const navigate = useNavigate();

  // Данные проектов из БД
  const [projects, setProjects] = useState([]);

  // Проверяем подключение к API
  const checkAPIConnection = async () => {
    try {
      console.log('Проверяем подключение к API...');
      console.log('API URL:', apiService.CONSTRUCTOR_API_BASE);
      
      // Простая проверка доступности эндпоинта
      const testResponse = await fetch(`${apiService.CONSTRUCTOR_API_BASE}/page-designs/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).catch(err => {
        console.error('Сетевая ошибка:', err);
        return null;
      });

      if (!testResponse) {
        setConnectionStatus('disconnected');
        return false;
      }

      console.log('API Response status:', testResponse.status);
      
      if (testResponse.ok || testResponse.status === 401) {
        setConnectionStatus('connected');
        return true;
      } else {
        setConnectionStatus('disconnected');
        return false;
      }
    } catch (error) {
      console.error('Ошибка проверки подключения:', error);
      setConnectionStatus('disconnected');
      return false;
    }
  };

  // Загружаем проекты из БД
  const loadProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Проверяем подключение
      const isConnected = await checkAPIConnection();
      if (!isConnected) {
        setError('Нет подключения к серверу. Проверьте, запущен ли Django сервер на localhost:8000');
        setConnectionStatus('disconnected');
        return;
      }
      
      // Проверяем авторизацию
      if (!apiService.isAuthenticated()) {
        console.log('Пользователь не авторизован, перенаправляем на логин');
        navigate('/login');
        return;
      }
      
      console.log('Загружаем проекты...');
      
      // Загружаем дизайны из БД
      const designs = await apiService.getSavedDesigns();
      
      console.log('Полученные проекты:', designs);
      
      // Преобразуем дизайны в проекты
      const projectsData = designs.map((design, index) => ({
        id: design.id,
        number: index + 1,
        name: design.name || 'Без названия',
        createdAt: design.created_at ? new Date(design.created_at).toLocaleDateString('ru-RU') : 'Нет даты',
        updatedAt: design.updated_at ? new Date(design.updated_at).toLocaleDateString('ru-RU') : 'Нет даты',
        category: 'Дизайн страницы',
        blocksCount: Array.isArray(design.blocks) ? design.blocks.length : 0,
        orders: Math.floor(Math.random() * 1000), // Моковые данные для заказов
        textColor: design.text_color || '#000000',
        bgColor: design.bg_color || '#ffffff'
      }));
      
      setProjects(projectsData);
      setConnectionStatus('connected');
      
    } catch (error) {
      console.error('Ошибка загрузки проектов:', error);
      setError(`Ошибка загрузки: ${error.message}`);
      setConnectionStatus('error');
    } finally {
      setLoading(false);
    }
  };

  // Загружаем проекты при монтировании компонента
  useEffect(() => {
    loadProjects();
  }, []);

  // Обработчик для создания нового проекта
  const handleCreateProject = () => {
    if (!newProjectName.trim()) {
      alert('Введите название проекта');
      return;
    }
    
    // Сохраняем название в localStorage для конструктора
    localStorage.setItem('newProjectName', newProjectName);
    
    // Переходим в конструктор
    navigate('/constructor');
    setNewProjectName('');
    setNewProjectCategory('');
    setShowModal(false);
  };

  // Обработчик для редактирования проекта
  const handleEditProject = (projectId) => {
    navigate(`/constructor?load=${projectId}`);
  };

  // Обработчик для удаления проекта
  const handleDeleteProject = async (projectId, projectName) => {
    if (!window.confirm(`Вы уверены, что хотите удалить проект "${projectName}"?`)) {
      return;
    }
    
    try {
      await apiService.deleteDesign(projectId);
      alert('Проект успешно удален!');
      loadProjects(); // Перезагружаем список
    } catch (error) {
      console.error('Ошибка удаления проекта:', error);
      alert('Не удалось удалить проект');
    }
  };

  // Обработчик выхода
  const handleLogout = async () => {
    try {
      await apiService.logout();
      navigate('/login');
    } catch (error) {
      console.error('Ошибка выхода:', error);
    }
  };

  // Получаем имя пользователя
  const getUserName = () => {
    const user = apiService.getUser();
    return user?.username || 'Пользователь';
  };

  // Статистика
  const totalOrders = projects.reduce((sum, p) => sum + p.orders, 0);
  const totalProjects = projects.length;
  const totalBlocks = projects.reduce((sum, p) => sum + p.blocksCount, 0);

  // Топ-проект по заказам
  const topProject = projects.length > 0 
    ? projects.reduce((prev, current) => (prev.orders > current.orders ? prev : current), projects[0])
    : null;

  // Данные для графиков
  const barChartData = {
    labels: projects.map(p => p.name),
    datasets: [
      {
        label: 'Количество заказов',
        data: projects.map(p => p.orders),
        backgroundColor: '#FFCA28',
        borderColor: '#FFA000',
        borderWidth: 1,
      },
    ],
  };

  const doughnutChartData = {
    labels: ['Активные проекты', 'Без заказов'],
    datasets: [
      {
        data: [
          projects.filter(p => p.orders > 0).length, 
          projects.filter(p => p.orders === 0).length
        ],
        backgroundColor: ['#FFA000', '#F9E5C8'],
        borderColor: '#886128',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#EED1A6'
        },
        ticks: {
          color: '#886128'
        }
      },
      x: {
        grid: {
          color: '#EED1A6'
        },
        ticks: {
          color: '#886128',
          maxRotation: 45,
          minRotation: 45
        }
      }
    }
  };

  const doughnutOptions = {
    ...chartOptions,
    plugins: {
      legend: {
        position: 'bottom'
      }
    },
    aspectRatio: 1,
    maintainAspectRatio: false,
  };

  // Сообщение о статусе подключения
  const getConnectionMessage = () => {
    switch(connectionStatus) {
      case 'checking':
        return 'Проверка подключения к серверу...';
      case 'connected':
        return 'Сервер доступен';
      case 'disconnected':
        return 'Сервер недоступен. Запустите Django сервер на localhost:8000';
      case 'error':
        return 'Ошибка подключения к серверу';
      default:
        return '';
    }
  };

  return (
    <div style={{ backgroundColor: '#FFFAF4', minHeight: '100vh' }}>
      <Header />

      {/* Отступ сверху, чтобы Header не перекрывал контент */}
      <div style={{ paddingTop: '70px' }}></div>

      <div className="container mt-4">
        {/* Заголовок */}
        <h1 className="text-center mb-4" style={{ color: '#886128', fontWeight: 'bold' }}>Sello</h1>
        
        {/* Приветствие и выход */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <span style={{ fontSize: '1.2rem', color: '#886128' }}>
              Привет, {getUserName()}  
            </span>
            <span className="badge bg-secondary ms-2">Личный кабинет</span>
            {connectionStatus === 'connected' && (
              <span className="badge bg-success ms-2">✓ Сервер доступен</span>
            )}
          </div>
          <button 
            className="btn btn-outline-secondary"
            onClick={handleLogout}
          >
            Выйти
          </button>
        </div>

        <hr className="my-4" />

        {/* Строка "Мои проекты" + кнопка "Добавить проект" */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 style={{ color: '#886128', fontSize: '1.5rem' }}>Мои проекты</h2>
          <button
            className="btn d-flex align-items-center"
            onClick={() => setShowModal(true)}
            style={{
              color: '#AA8144',
              border: 'none',
              background: 'none',
              padding: '5px 10px',
              textDecoration: 'none',
              cursor: 'pointer',
              fontSize: '1.2rem'
            }}
          >
            <img src={plusIcon} alt="Плюс" style={{ width: '20px', marginRight: '8px' }} />
            Добавить проект
          </button>
        </div>

        {/* Информация о подключении */}
        {connectionStatus === 'disconnected' && (
          <div className="alert alert-warning">
            <strong>Внимание!</strong> {getConnectionMessage()}
            <div className="mt-2">
              <small>
                Убедитесь, что:
                <ul>
                  <li>Django сервер запущен на порту 8000</li>
                  <li>Вы находитесь по адресу: <code>http://localhost:8000</code></li>
                  <li>Попробуйте запустить: <code>python manage.py runserver</code></li>
                </ul>
              </small>
            </div>
          </div>
        )}

        {/* Таблица проектов */}
        <div className="table-responsive">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Загрузка...</span>
              </div>
              <p className="mt-3" style={{ color: '#886128' }}>
                {connectionStatus === 'checking' ? 'Проверка подключения...' : 'Загрузка проектов...'}
              </p>
            </div>
          ) : error ? (
            <div className="alert alert-danger text-center">
              <p><strong>Ошибка:</strong> {error}</p>
              <button 
                className="btn btn-outline-danger"
                onClick={loadProjects}
              >
                Попробовать снова
              </button>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-5 border rounded" style={{ borderColor: '#EED1A6' }}>
              <h4 style={{ color: '#886128' }}>У вас пока нет проектов</h4>
              <p className="text-muted mb-4">Создайте свой первый проект с помощью конструктора</p>
              <button 
                className="btn btn-primary"
                onClick={() => setShowModal(true)}
                style={{ backgroundColor: '#886128', borderColor: '#886128' }}
              >
                Создать первый проект
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
                    №
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
                    Название проекта
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
                    Дата создания
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
                    Блоков
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
                {projects.map((project, index) => (
                  <tr key={project.id} style={{ border: '1px solid #EED1A6' }}>
                    <td style={{ 
                      border: '1px solid #EED1A6', 
                      color: '#886128', 
                      textAlign: 'center', 
                      verticalAlign: 'middle', 
                      padding: '12px',
                      fontSize: '15px'
                    }}>
                      {index + 1}
                    </td>
                    <td style={{ 
                      border: '1px solid #EED1A6', 
                      color: '#886128', 
                      textAlign: 'center', 
                      verticalAlign: 'middle', 
                      padding: '12px',
                      fontSize: '15px'
                    }}>
                      <div>
                        <strong>{project.name}</strong>
                        <div className="d-flex justify-content-center mt-1">
                          <div 
                            className="me-1" 
                            style={{ 
                              backgroundColor: project.textColor,
                              width: '12px', 
                              height: '12px',
                              borderRadius: '50%',
                              border: '1px solid #ccc'
                            }} 
                            title={`Цвет текста: ${project.textColor}`}
                          />
                          <div 
                            style={{ 
                              backgroundColor: project.bgColor,
                              width: '12px', 
                              height: '12px',
                              borderRadius: '50%',
                              border: '1px solid #ccc'
                            }} 
                            title={`Цвет фона: ${project.bgColor}`}
                          />
                        </div>
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
                      {project.createdAt}
                    </td>
                    <td style={{ 
                      border: '1px solid #EED1A6', 
                      color: '#886128', 
                      textAlign: 'center', 
                      verticalAlign: 'middle', 
                      padding: '12px',
                      fontSize: '15px'
                    }}>
                      {project.category}
                    </td>
                    <td style={{ 
                      border: '1px solid #EED1A6', 
                      color: '#886128', 
                      textAlign: 'center', 
                      verticalAlign: 'middle', 
                      padding: '12px',
                      fontSize: '15px'
                    }}>
                      <span className="badge" style={{ backgroundColor: '#886128' }}>
                        {project.blocksCount}
                      </span>
                    </td>
                    <td style={{ 
                      border: '1px solid #EED1A6', 
                      color: '#886128', 
                      textAlign: 'center', 
                      verticalAlign: 'middle', 
                      padding: '12px',
                      fontSize: '15px'
                    }}>
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-sm"
                          onClick={() => handleEditProject(project.id)}
                          style={{
                            background: 'none',
                            border: '1px solid #886128',
                            color: '#886128',
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            padding: '5px 10px',
                            fontSize: '14px'
                          }}
                        >
                          <img
                            src={editIcon}
                            alt="Изменить"
                            style={{ width: '16px', marginRight: '4px' }}
                          />
                          Изменить
                        </button>
                        <button
                          className="btn btn-sm"
                          onClick={() => handleDeleteProject(project.id, project.name)}
                          style={{
                            background: 'none',
                            border: '1px solid #dc3545',
                            color: '#dc3545',
                            cursor: 'pointer',
                            padding: '5px 10px',
                            fontSize: '14px'
                          }}
                        >
                          <img
                            src={deleteIcon}
                            alt="Удалить"
                            style={{ width: '16px' }}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Статистика */}
        <div className="mt-5 p-4" style={{ backgroundColor: '#F9E5C8', borderRadius: '8px' }}>
          <h3 className="text-center mb-4" style={{ color: '#886128' }}>СТАТИСТИКА</h3>

          <div className="row g-4">
            {/* Общая статистика */}
            <div className="col-lg-6">
              <div className="p-3" style={{ backgroundColor: '#FFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', height: '150px' }}>
                <h5 className='text-center' style={{ color: '#886128' }}>Общая статистика</h5>
                <div className="d-flex justify-content-between my-2">
                  <span>Всего проектов:</span>
                  <strong style={{ color: '#886128' }}>{totalProjects}</strong>
                </div>
                <div className="d-flex justify-content-between my-2">
                  <span>Всего заказов:</span>
                  <strong style={{ color: '#886128' }}>{totalOrders.toLocaleString()}</strong>
                </div>
                <div className="d-flex justify-content-between my-2">
                  <span>Всего блоков:</span>
                  <strong style={{ color: '#886128' }}>{totalBlocks}</strong>
                </div>
              </div>
            </div>

            {/* Топ-проект по заказам */}
            <div className="col-lg-6">
              <div className="p-4" style={{ backgroundColor: '#FFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', height: '150px' }}>
                <h5 className='text-center mb-3' style={{ color: '#886128' }}>Топ-проект по заказам</h5>
                {projects.length > 0 ? (
                  <>
                    <p style={{ marginTop: '20px' }}><strong>{topProject.name}</strong></p>
                    <p>Заказов: <strong>{topProject.orders.toLocaleString()}</strong></p>
                  </>
                ) : (
                  <p style={{ color: '#886128' }}>Нет данных</p>
                )}
              </div>
            </div>

            {/* Графики показываем только если есть проекты */}
            {projects.length > 0 && (
              <>
                <div className="col-lg-6">
                  <div className="p-4" style={{ backgroundColor: '#FFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', height: '350px', display: 'flex', flexDirection: 'column' }}>
                    <h5 className='text-center' style={{ color: '#886128' }}>Заказы по проектам</h5>
                    <div style={{ flex: 1, minHeight: 0 }}>
                      <Bar data={barChartData} options={chartOptions} />
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="p-4" style={{ backgroundColor: '#FFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', height: '350px', display: 'flex', flexDirection: 'column' }}>
                    <h5 className='text-center' style={{ color: '#886128' }}>Активность проектов</h5>
                    <div style={{ flex: 1, minHeight: 0 }}>
                      <Doughnut data={doughnutChartData} options={doughnutOptions} />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Всплывающее окно создания нового проекта */}
      {showModal && (
        <div className="modal-backdrop show" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}></div>
      )}
      {showModal && (
        <div
          className="modal show d-block"
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1051,
            backgroundColor: '#FFF',
            borderRadius: '8px',
            padding: '20px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '35vh',
            overflowY: 'auto'
          }}
        >
          <h5 className='text-center' style={{ color: '#886128' }}>Создать новый проект</h5>
          <div className="mb-3">
            <label htmlFor="projectName" className="form-label" style={{ color: '#886128' }}>Название проекта</label>
            <input
              type="text"
              className="form-control"
              id="projectName"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="Введите название проекта"
              style={{ borderColor: '#EED1A6', color: '#886128' }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="projectCategory" className="form-label" style={{ color: '#886128' }}>Категория (опционально)</label>
            <input
              type="text"
              className="form-control"
              id="projectCategory"
              value={newProjectCategory}
              onChange={(e) => setNewProjectCategory(e.target.value)}
              placeholder="Введите категорию"
              style={{ borderColor: '#EED1A6', color: '#886128' }}
            />
          </div>
          <div className="d-flex justify-content-end">
            <button
              className="btn me-2"
              onClick={() => setShowModal(false)}
              style={{ color: '#886128', border: '1px solid #EED1A6', background: 'none' }}
            >
              Отмена
            </button>
            <button
              className="btn"
              onClick={handleCreateProject}
              style={{ backgroundColor: '#FFA000', color: 'white', border: 'none' }}
            >
              Создать
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatorDashboard;