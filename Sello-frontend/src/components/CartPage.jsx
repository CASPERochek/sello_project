// // src/components/CartPage.jsx
// import React, { useState } from 'react';
// import Header from './Header';

// const CartPage = () => {
//   // Моковые данные товаров в корзине
//   const [cartItems, setCartItems] = useState([
//     {
//       id: 1,
//       name: 'Смартфон X100',
//       price: 29999,
//       quantity: 1,
//       brand: 'СуперМагазин',
//       image: 'https://via.placeholder.com/80?text=Phone'
//     },
//     {
//       id: 2,
//       name: 'Кроссовки ProRun',
//       price: 8999,
//       quantity: 2,
//       brand: 'Селло',
//       image: 'https://via.placeholder.com/80?text=Shoes'
//     },
//     {
//       id: 3,
//       name: 'Книга "React для начинающих"',
//       price: 1500,
//       quantity: 3,
//       brand: 'Магазин',
//       image: 'https://via.placeholder.com/80?text=Book'
//     }
//   ]);

//   const updateQuantity = (id, change) => {
//     setCartItems(cartItems.map(item => {
//       if (item.id === id) {
//         const newQty = item.quantity + change;
//         return newQty > 0 ? { ...item, quantity: newQty } : item;
//       }
//       return item;
//     }));
//   };

//   const removeItem = (id) => {
//     setCartItems(cartItems.filter(item => item.id !== id));
//   };

//   const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   return (
//     <div style={{ backgroundColor: '#FFFAF4', minHeight: '100vh' }}>
//       <Header />

//       {/* Отступ сверху */}
//       <div style={{ paddingTop: '70px' }}></div>

//       <div className="container mt-4">
//         {/* Заголовок */}
//         <h1 className="text-center mb-5" style={{ color: '#886128', fontWeight: 'bold' }}>Корзина товаров</h1>

//         {/* Список товаров */}
//         <div className="row g-4">
//           {cartItems.length === 0 ? (
//             <div className="col-12 text-center">
//               <p style={{ color: '#886128', fontSize: '1.2rem' }}>Корзина пуста</p>
//             </div>
//           ) : (
//             cartItems.map(item => (
//               <div key={item.id} className="col-12" style={{
//                 backgroundColor: '#FFF',
//                 borderRadius: '8px',
//                 padding: '15px',
//                 boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//                 maxWidth: '1000px', // Ограничение ширины
//                 margin: '0 auto'   // Центрирование
//               }}>
//                 <div className="d-flex align-items-center">
//                   <img src={item.image} alt={item.name} style={{
//                     width: '80px',
//                     height: '80px',
//                     objectFit: 'cover',
//                     marginRight: '15px',
//                     borderRadius: '8px'
//                   }} />
//                   <div style={{ flex: 1 }}>
//                     <h5 style={{ color: '#886128', margin: '0' }}>{item.name}</h5>
//                     <p style={{ color: '#886128', margin: '5px 0' }}>Магазин: {item.brand}</p>
//                     <p style={{ color: '#886128', margin: '5px 0' }}>Цена: {item.price.toLocaleString()} ₽</p>
//                   </div>
//                   <div className="d-flex align-items-center" style={{ gap: '10px' }}>
//                     <button
//                       onClick={() => updateQuantity(item.id, -1)}
//                       style={{
//                         background: 'none',
//                         border: '1px solid #EED1A6',
//                         color: '#886128',
//                         borderRadius: '50%',
//                         width: '30px',
//                         height: '30px',
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         cursor: 'pointer'
//                       }}
//                     >
//                       -
//                     </button>
//                     <span style={{ color: '#886128', fontWeight: 'bold' }}>{item.quantity}</span>
//                     <button
//                       onClick={() => updateQuantity(item.id, 1)}
//                       style={{
//                         background: 'none',
//                         border: '1px solid #EED1A6',
//                         color: '#886128',
//                         borderRadius: '50%',
//                         width: '30px',
//                         height: '30px',
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         cursor: 'pointer'
//                       }}
//                     >
//                       +
//                     </button>
//                     <button
//                       onClick={() => removeItem(item.id)}
//                       style={{
//                         background: 'none',
//                         border: 'none',
//                         color: '#886128',
//                         cursor: 'pointer',
//                         marginLeft: '10px'
//                       }}
//                     >
//                       🗑️
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Итого и кнопка оплаты */}
//         {cartItems.length > 0 && (
//           <div className="mt-4 p-4" style={{
//             backgroundColor: '#FFF',
//             borderRadius: '8px',
//             boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//             maxWidth: '1000px', // Ограничение ширины
//             margin: '0 auto'   // Центрирование
//           }}>
//             <div className="d-flex justify-content-between align-items-center">
//               <h4 style={{ color: '#886128' }}>Итого:</h4>
//               <h4 style={{ color: '#886128', fontWeight: 'bold' }}>{totalAmount.toLocaleString()} ₽</h4>
//             </div>
//             <div className="d-flex justify-content-center mt-5">
//               <button
//                 onClick={() => alert('Оплата успешно завершена!')}
//                 style={{
//                   backgroundColor: '#FFA000',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '20px',
//                   padding: '10px 30px',
//                   fontSize: '16px',
//                   fontWeight: 'bold',
//                   cursor: 'pointer'
//                 }}
//               >
//                 Оплатить
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CartPage;







// src/components/CartPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';

// Настройка axios
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

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка корзины
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await api.get('cart/');
      
      if (response.data.items) {
        setCartItems(response.data.items);
      } else {
        setCartItems([]);
      }
      
      setError(null);
    } catch (err) {
      console.error('Ошибка при загрузке корзины:', err);
      setError('Не удалось загрузить корзину');
      // Используем моковые данные при ошибке
      setCartItems(getMockCartItems());
    } finally {
      setLoading(false);
    }
  };

  const getMockCartItems = () => {
    return [
      {
        id: 1,
        product: {
          id: 1,
          name: 'Смартфон X100',
          price: '29999.00',
          brand: { name: 'СуперМагазин' },
          image: 'https://via.placeholder.com/80?text=Phone'
        },
        quantity: 1,
        total_price: '29999.00'
      },
      {
        id: 2,
        product: {
          id: 2,
          name: 'Кроссовки ProRun',
          price: '8999.00',
          brand: { name: 'Селло' },
          image: 'https://via.placeholder.com/80?text=Shoes'
        },
        quantity: 2,
        total_price: '17998.00'
      },
      {
        id: 3,
        product: {
          id: 3,
          name: 'Книга "React для начинающих"',
          price: '1500.00',
          brand: { name: 'Магазин' },
          image: 'https://via.placeholder.com/80?text=Book'
        },
        quantity: 3,
        total_price: '4500.00'
      }
    ];
  };

  const updateQuantity = async (itemId, productId, change) => {
    try {
      const item = cartItems.find(item => item.id === itemId);
      const newQuantity = item.quantity + change;
      
      if (newQuantity <= 0) {
        // Удаляем товар
        await api.delete(`cart/remove_item/?product_id=${productId}`);
        setCartItems(prev => prev.filter(item => item.id !== itemId));
      } else {
        // Обновляем количество
        const response = await api.put('cart/update_item/', {
          product_id: productId,
          quantity: newQuantity
        });
        
        setCartItems(prev => 
          prev.map(item => 
            item.id === itemId 
              ? { ...item, quantity: newQuantity, total_price: response.data.total_price }
              : item
          )
        );
      }
    } catch (err) {
      console.error('Ошибка при обновлении количества:', err);
      alert(err.response?.data?.error || 'Не удалось обновить количество');
    }
  };

  const removeItem = async (itemId, productId) => {
    try {
      await api.delete(`cart/remove_item/?product_id=${productId}`);
      setCartItems(prev => prev.filter(item => item.id !== itemId));
    } catch (err) {
      console.error('Ошибка при удалении товара:', err);
      alert(err.response?.data?.error || 'Не удалось удалить товар');
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await api.post('cart/checkout/');
      alert('Оплата успешно завершена!');
      setCartItems([]);
    } catch (err) {
      console.error('Ошибка при оформлении заказа:', err);
      alert(err.response?.data?.error || 'Не удалось оформить заказ');
    }
  };

  const totalAmount = cartItems.reduce((sum, item) => {
    return sum + parseFloat(item.total_price || 0);
  }, 0);

  if (loading) {
    return (
      <div style={{ backgroundColor: '#FFFAF4', minHeight: '100vh' }}>
        <Header />
        <div style={{ paddingTop: '70px' }}></div>
        <div className="container mt-4 d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#FFFAF4', minHeight: '100vh' }}>
      <Header />

      {/* Отступ сверху */}
      <div style={{ paddingTop: '70px' }}></div>

      <div className="container mt-4">
        {/* Заголовок */}
        <h1 className="text-center mb-5" style={{ color: '#886128', fontWeight: 'bold' }}>Корзина товаров</h1>

        {error && (
          <div className="alert alert-warning text-center" role="alert">
            {error}
          </div>
        )}

        {/* Список товаров */}
        <div className="row g-4">
          {cartItems.length === 0 ? (
            <div className="col-12 text-center">
              <p style={{ color: '#886128', fontSize: '1.2rem' }}>Корзина пуста</p>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="col-12" style={{
                backgroundColor: '#FFF',
                borderRadius: '8px',
                padding: '15px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                maxWidth: '1000px',
                margin: '0 auto'
              }}>
                <div className="d-flex align-items-center">
                  <img 
                    src={item.product.image || `https://via.placeholder.com/80?text=${item.product.name.substring(0, 5)}`} 
                    alt={item.product.name} 
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                      marginRight: '15px',
                      borderRadius: '8px'
                    }} 
                  />
                  <div style={{ flex: 1 }}>
                    <h5 style={{ color: '#886128', margin: '0' }}>{item.product.name}</h5>
                    <p style={{ color: '#886128', margin: '5px 0' }}>
                      Магазин: {item.product.brand?.name || 'Неизвестно'}
                    </p>
                    <p style={{ color: '#886128', margin: '5px 0' }}>
                      Цена: {parseFloat(item.product.price).toLocaleString('ru-RU')} ₽
                    </p>
                  </div>
                  <div className="d-flex align-items-center" style={{ gap: '10px' }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.product.id, -1)}
                      style={{
                        background: 'none',
                        border: '1px solid #EED1A6',
                        color: '#886128',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      -
                    </button>
                    <span style={{ color: '#886128', fontWeight: 'bold' }}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.product.id, 1)}
                      style={{
                        background: 'none',
                        border: '1px solid #EED1A6',
                        color: '#886128',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id, item.product.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#886128',
                        cursor: 'pointer',
                        marginLeft: '10px'
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Итого и кнопка оплаты */}
        {cartItems.length > 0 && (
          <div className="mt-4 p-4" style={{
            backgroundColor: '#FFF',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            <div className="d-flex justify-content-between align-items-center">
              <h4 style={{ color: '#886128' }}>Итого:</h4>
              <h4 style={{ color: '#886128', fontWeight: 'bold' }}>
                {totalAmount.toLocaleString('ru-RU')} ₽
              </h4>
            </div>
            <div className="d-flex justify-content-center mt-5">
              <button
                onClick={handleCheckout}
                style={{
                  backgroundColor: '#FFA000',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '10px 30px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Оплатить
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;