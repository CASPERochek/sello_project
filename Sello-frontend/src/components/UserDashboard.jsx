// src/components/UserDashboard.jsx
import React, { useState } from 'react';
import Header from './Header';
import connectIcon from '../assets/icon/connect-icon.svg';

const UserDashboard = () => {
  const [cartItems, setCartItems] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterCreator, setFilterCreator] = useState('');

  // Моковые данные для доступных магазинов
  const availableBrands = [
    { id: 1, name: 'СуперМагазин', creator: 'Иван', category: 'Электроника' },
    { id: 2, name: 'Селло', creator: 'Аноним', category: 'Одежда' },
    { id: 3, name: 'Магазин', creator: 'Павел', category: 'Книги' },
    { id: 4, name: 'Товары для сада', creator: 'ПетяТоп', category: 'Садоводство' },
    { id: 5, name: 'Новый магазин', creator: 'Фермер', category: 'Продукты' },
    { id: 6, name: 'Лучший магазин', creator: 'Ваня П', category: 'Обувь' },
    { id: 7, name: 'Продажа тракторов', creator: 'Топитоп', category: 'Сельхозтехника' },
    { id: 8, name: 'Новый магазин', creator: 'Человек', category: 'Разное' },
    { id: 9, name: 'Лучший из лучших', creator: 'Пппппп', category: 'Эксклюзив' },
    { id: 10, name: 'Интересные товары', creator: 'Павел', category: 'Хобби' },
    { id: 11, name: 'Селоло', creator: 'Рустам', category: 'Одежда' },
    { id: 12, name: 'Магазин у дома', creator: 'Галина', category: 'Продукты' },
  ];

  // Получаем уникальные категории для фильтра
  const uniqueCategories = Array.from(new Set(availableBrands.map(b => b.category)));
  // Получаем уникальных создателей для фильтра
  const uniqueCreators = Array.from(new Set(availableBrands.map(b => b.creator)));

  // Фильтрация магазинов
  const filteredBrands = availableBrands.filter(brand => {
    const categoryMatch = !filterCategory || brand.category === filterCategory;
    const creatorMatch = !filterCreator || brand.creator === filterCreator;
    return categoryMatch && creatorMatch;
  });

  const handleConnect = (brand) => {
    alert(`Вы подключились к магазину: ${brand.name}`);
    window.location.href = '/cart';
  };

  return (
    <div style={{ backgroundColor: '#FFFAF4', minHeight: '100vh' }}>
      <Header />

      {/* Отступ сверху */}
      <div style={{ paddingTop: '70px' }}></div>

      <div className="container mt-4">
        {/* Заголовок */}
        <h1 className="text-center mb-4" style={{ color: '#886128', fontWeight: 'bold' }}>Личный кабинет</h1>

        {/* Фильтры - два на одной строке */}
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
          <div style={{ flex: '1 1 calc(50% - 10px)' }}>
            <label style={{ color: '#886128', fontSize: '1rem', display: 'block', marginBottom: '5px' }}>Категория магазина:</label>
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
          </div>

          <div style={{ flex: '1 1 calc(50% - 10px)' }}>
            <label style={{ color: '#886128', fontSize: '1rem', display: 'block', marginBottom: '5px' }}>Создатель магазина:</label>
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

        {/* Надпись "Доступные магазины" */}
        <div className="mb-4">
          <span style={{ color: '#886128', fontSize: '1.2rem' }}>Доступные магазины</span>
        </div>

        {/* Таблица доступных магазинов */}
        <div className="table-responsive">
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
                  Создатель
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
                  Категория магазина
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
              {filteredBrands.map((brand, index) => (
                <tr key={brand.id} style={{ border: '1px solid #EED1A6' }}>
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
                    {brand.name}
                  </td>
                  <td style={{
                    border: '1px solid #EED1A6',
                    color: '#886128',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    padding: '12px',
                    fontSize: '15px'
                  }}>
                    {brand.creator}
                  </td>
                  <td style={{
                    border: '1px solid #EED1A6',
                    color: '#886128',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    padding: '12px',
                    fontSize: '15px'
                  }}>
                    {brand.category}
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
                        width: '150px', // Шире, чем было (было 120px)
                        margin: '0 auto', // Центрирование в ячейке
                        transition: 'all 0.3s ease',
                        minWidth: '150px' // Минимальная ширина
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
        </div>

        {/* Кнопка "Перейти в корзину" */}
        <div className="d-flex justify-content-center mt-4">
          <button
            onClick={() => window.location.href = '/cart'}
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