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
  const [user, setUser] = useState(null);
  
  const navigate = useNavigate();

  // Данные проектов из БД
  const [projects, setProjects] = useState([]);

  // Проверяем подключение к API
  const checkAPIConnection = async () => {
    try {
      console.log('Проверяем подключение к API...');
      console.log('Base URL:', apiService.CONSTRUCTOR_API_BASE);
      console.log('Full designs URL:', `${apiService.CONSTRUCTOR_API_BASE}/designs/`);
      
      const isConnected = await apiService.checkConnection();
      
      if (isConnected) {
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
      
      console.log('Base URL для загрузки:', apiService.CONSTRUCTOR_API_BASE);
      
      // Проверяем авторизацию
      if (!apiService.isAuthenticated()) {
        console.log('Пользователь не авторизован, перенаправляем на логин');
        navigate('/login');
        return;
      }
      
      // Получаем пользователя
      const userData = apiService.getUser();
      setUser(userData);
      
      console.log('Загружаем проекты...');
      
      // Пробуем загрузить обычные дизайны
      let designs = [];
      try {
        designs = await apiService.getSavedDesigns();
        console.log('Полученные проекты через getSavedDesigns:', designs);
      } catch (designsError) {
        console.error('Ошибка при загрузке designs:', designsError);
        
        // Пробуем загрузить мои дизайны
        try {
          designs = await apiService.getMyDesigns();
          console.log('Полученные проекты через getMyDesigns:', designs);
        } catch (myDesignsError) {
          console.error('Ошибка при загрузке my designs:', myDesignsError);
          throw new Error('Не удалось загрузить проекты ни с одного эндпоинта');
        }
      }
      
      if (!Array.isArray(designs)) {
        console.error('Ожидался массив проектов, получено:', typeof designs, designs);
        setError('Некорректный формат данных от сервера');
        setProjects([]);
        return;
      }
      
      // Преобразуем дизайны в проекты
      const projectsData = designs.map((design, index) => ({
        id: design.id || index + 1,
        number: index + 1,
        name: design.name || 'Без названия',
        createdAt: design.created_at ? new Date(design.created_at).toLocaleDateString('ru-RU') : 
                  (design.createdAt ? new Date(design.createdAt).toLocaleDateString('ru-RU') : 'Нет даты'),
        updatedAt: design.updated_at ? new Date(design.updated_at).toLocaleDateString('ru-RU') : 
                  (design.updatedAt ? new Date(design.updatedAt).toLocaleDateString('ru-RU') : 'Нет даты'),
        category: design.metadata?.category || design.category || 'Дизайн страницы',
        blocksCount: design.blocks_count || design.blocksCount || 
                    (Array.isArray(design.blocks) ? design.blocks.length : 0),
        orders: Math.floor(Math.random() * 1000), // Моковые данные для заказов
        textColor: design.text_color || design.textColor || '#000000',
        bgColor: design.bg_color || design.bgColor || '#ffffff',
        isPublic: design.is_public || design.isPublic || false
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
  const handleCreateProject = async () => {
    if (!newProjectName.trim()) {
      alert('Введите название проекта');
      return;
    }
    
    try {
      // Создаем проект в базе данных через API
      const designData = {
        name: newProjectName,
        blocks: [], // Пустой массив блоков при создании
        text_color: '#000000',
        bg_color: '#ffffff',
        version: '1.0',
        is_public: false,
        metadata: {
          category: newProjectCategory || 'Проект',
          created_from: 'dashboard'
        }
      };
      
      console.log('Создаем проект с данными:', designData);
      
      const newDesign = await apiService.createDesign(designData);
      
      console.log('Проект создан:', newDesign);
      
      alert('Проект успешно создан!');
      
      // Очищаем форму
      setNewProjectName('');
      setNewProjectCategory('');
      setShowModal(false);
      
      // Перезагружаем список проектов
      loadProjects();
      
    } catch (error) {
      console.error('Ошибка создания проекта:', error);
      alert(`Не удалось создать проект: ${error.message}`);
    }
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
      alert(`Не удалось удалить проект: ${error.message}`);
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
    return user?.username || 'Пользователь';
  };

  // Статистика
  const totalOrders = projects.reduce((sum, p) => sum + p.orders, 0);
  const totalProjectsCount = projects.length;
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
        return 'Сервер недоступен';
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
            {connectionStatus === 'disconnected' && (
              <span className="badge bg-warning ms-2">⚠ Сервер недоступен</span>
            )}
            {connectionStatus === 'error' && (
              <span className="badge bg-danger ms-2">✗ Ошибка подключения</span>
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

        {/* Отладочная панель */}
        <div className="alert alert-secondary mb-3">
          <h5 className="mb-2">🔧 Отладочная информация</h5>
          <div className="row">
            <div className="col-md-6">
              <small>
                <strong>API URL:</strong> <code>{apiService.CONSTRUCTOR_API_BASE}</code><br/>
                <strong>Designs endpoint:</strong> <code>{apiService.CONSTRUCTOR_API_BASE}/designs/</code><br/>
                <strong>My designs endpoint:</strong> <code>{apiService.CONSTRUCTOR_API_BASE}/designs/my/</code>
              </small>
            </div>
            <div className="col-md-6">
              <small>
                <strong>Статус:</strong> <span className={`badge ${connectionStatus === 'connected' ? 'bg-success' : connectionStatus === 'disconnected' ? 'bg-warning' : 'bg-danger'}`}>
                  {connectionStatus}
                </span><br/>
                <strong>Авторизация:</strong> <span className={`badge ${apiService.isAuthenticated() ? 'bg-success' : 'bg-danger'}`}>
                  {apiService.isAuthenticated() ? 'Есть' : 'Нет'}
                </span><br/>
                <strong>Проектов:</strong> <span className="badge bg-info">{projects.length}</span>
              </small>
            </div>
          </div>
          <div className="mt-2">
            <button 
              className="btn btn-sm btn-outline-secondary me-2"
              onClick={() => {
                console.log('Проверяем URL вручную...');
                window.open(`${apiService.CONSTRUCTOR_API_BASE}/designs/`, '_blank');
              }}
            >
              Проверить URL в новой вкладке
            </button>
            <button 
              className="btn btn-sm btn-outline-secondary"
              onClick={checkAPIConnection}
            >
              Проверить подключение
            </button>
          </div>
        </div>

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
              <h5>Ошибка загрузки проектов</h5>
              <p><strong>Сообщение:</strong> {error}</p>
              <div className="mt-3">
                <button 
                  className="btn btn-outline-danger me-2"
                  onClick={loadProjects}
                >
                  Попробовать снова
                </button>
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    // Используем моковые данные
                    const mockData = apiService.getMockDesigns();
                    const projectsData = mockData.map((design, index) => ({
                      id: design.id,
                      number: index + 1,
                      name: design.name,
                      createdAt: new Date(design.created_at).toLocaleDateString('ru-RU'),
                      updatedAt: new Date(design.updated_at).toLocaleDateString('ru-RU'),
                      category: design.metadata.category,
                      blocksCount: design.blocks_count,
                      orders: Math.floor(Math.random() * 1000),
                      textColor: design.text_color,
                      bgColor: design.bg_color,
                      isPublic: design.is_public
                    }));
                    setProjects(projectsData);
                    setError(null);
                  }}
                >
                  Использовать демо-данные
                </button>
              </div>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-5 border rounded" style={{ borderColor: '#EED1A6' }}>
              <h4 style={{ color: '#886128' }}>У вас пока нет проектов</h4>
              <p className="text-muted mb-4">Создайте свой первый проект с помощью конструктора</p>
              <button 
                className="btn btn-primary me-2"
                onClick={() => setShowModal(true)}
                style={{ backgroundColor: '#886128', borderColor: '#886128' }}
              >
                Создать первый проект
              </button>
              <button 
                className="btn btn-outline-secondary"
                onClick={loadProjects}
              >
                Обновить список
              </button>
            </div>
          ) : (
            <div>
              <div className="alert alert-success mb-3">
                Найдено проектов: <strong>{projects.length}</strong>
              </div>
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
                            {project.isPublic && (
                              <span className="badge bg-info ms-1" style={{ fontSize: '10px' }}>Публичный</span>
                            )}
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
            </div>
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
                  <strong style={{ color: '#886128' }}>{totalProjectsCount}</strong>
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
            <label htmlFor="projectName" className="form-label" style={{ color: '#886128' }}>Название проекта*</label>
            <input
              type="text"
              className="form-control"
              id="projectName"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="Введите название проекта"
              style={{ borderColor: '#EED1A6', color: '#886128' }}
              required
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
              disabled={!newProjectName.trim()}
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









