// // // src/components/CartPage.jsx
// // import React, { useState } from 'react';
// // import Header from './Header';

// // const CartPage = () => {
// //   // Моковые данные товаров в корзине
// //   const [cartItems, setCartItems] = useState([
// //     {
// //       id: 1,
// //       name: 'Смартфон X100',
// //       price: 29999,
// //       quantity: 1,
// //       brand: 'СуперМагазин',
// //       image: 'https://via.placeholder.com/80?text=Phone'
// //     },
// //     {
// //       id: 2,
// //       name: 'Кроссовки ProRun',
// //       price: 8999,
// //       quantity: 2,
// //       brand: 'Селло',
// //       image: 'https://via.placeholder.com/80?text=Shoes'
// //     },
// //     {
// //       id: 3,
// //       name: 'Книга "React для начинающих"',
// //       price: 1500,
// //       quantity: 3,
// //       brand: 'Магазин',
// //       image: 'https://via.placeholder.com/80?text=Book'
// //     }
// //   ]);

// //   const updateQuantity = (id, change) => {
// //     setCartItems(cartItems.map(item => {
// //       if (item.id === id) {
// //         const newQty = item.quantity + change;
// //         return newQty > 0 ? { ...item, quantity: newQty } : item;
// //       }
// //       return item;
// //     }));
// //   };

// //   const removeItem = (id) => {
// //     setCartItems(cartItems.filter(item => item.id !== id));
// //   };

// //   const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

// //   return (
// //     <div style={{ backgroundColor: '#FFFAF4', minHeight: '100vh' }}>
// //       <Header />

// //       {/* Отступ сверху */}
// //       <div style={{ paddingTop: '70px' }}></div>

// //       <div className="container mt-4">
// //         {/* Заголовок */}
// //         <h1 className="text-center mb-5" style={{ color: '#886128', fontWeight: 'bold' }}>Корзина товаров</h1>

// //         {/* Список товаров */}
// //         <div className="row g-4">
// //           {cartItems.length === 0 ? (
// //             <div className="col-12 text-center">
// //               <p style={{ color: '#886128', fontSize: '1.2rem' }}>Корзина пуста</p>
// //             </div>
// //           ) : (
// //             cartItems.map(item => (
// //               <div key={item.id} className="col-12" style={{
// //                 backgroundColor: '#FFF',
// //                 borderRadius: '8px',
// //                 padding: '15px',
// //                 boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
// //                 maxWidth: '1000px', // Ограничение ширины
// //                 margin: '0 auto'   // Центрирование
// //               }}>
// //                 <div className="d-flex align-items-center">
// //                   <img src={item.image} alt={item.name} style={{
// //                     width: '80px',
// //                     height: '80px',
// //                     objectFit: 'cover',
// //                     marginRight: '15px',
// //                     borderRadius: '8px'
// //                   }} />
// //                   <div style={{ flex: 1 }}>
// //                     <h5 style={{ color: '#886128', margin: '0' }}>{item.name}</h5>
// //                     <p style={{ color: '#886128', margin: '5px 0' }}>Магазин: {item.brand}</p>
// //                     <p style={{ color: '#886128', margin: '5px 0' }}>Цена: {item.price.toLocaleString()} ₽</p>
// //                   </div>
// //                   <div className="d-flex align-items-center" style={{ gap: '10px' }}>
// //                     <button
// //                       onClick={() => updateQuantity(item.id, -1)}
// //                       style={{
// //                         background: 'none',
// //                         border: '1px solid #EED1A6',
// //                         color: '#886128',
// //                         borderRadius: '50%',
// //                         width: '30px',
// //                         height: '30px',
// //                         display: 'flex',
// //                         justifyContent: 'center',
// //                         alignItems: 'center',
// //                         cursor: 'pointer'
// //                       }}
// //                     >
// //                       -
// //                     </button>
// //                     <span style={{ color: '#886128', fontWeight: 'bold' }}>{item.quantity}</span>
// //                     <button
// //                       onClick={() => updateQuantity(item.id, 1)}
// //                       style={{
// //                         background: 'none',
// //                         border: '1px solid #EED1A6',
// //                         color: '#886128',
// //                         borderRadius: '50%',
// //                         width: '30px',
// //                         height: '30px',
// //                         display: 'flex',
// //                         justifyContent: 'center',
// //                         alignItems: 'center',
// //                         cursor: 'pointer'
// //                       }}
// //                     >
// //                       +
// //                     </button>
// //                     <button
// //                       onClick={() => removeItem(item.id)}
// //                       style={{
// //                         background: 'none',
// //                         border: 'none',
// //                         color: '#886128',
// //                         cursor: 'pointer',
// //                         marginLeft: '10px'
// //                       }}
// //                     >
// //                       🗑️
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))
// //           )}
// //         </div>

// //         {/* Итого и кнопка оплаты */}
// //         {cartItems.length > 0 && (
// //           <div className="mt-4 p-4" style={{
// //             backgroundColor: '#FFF',
// //             borderRadius: '8px',
// //             boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
// //             maxWidth: '1000px', // Ограничение ширины
// //             margin: '0 auto'   // Центрирование
// //           }}>
// //             <div className="d-flex justify-content-between align-items-center">
// //               <h4 style={{ color: '#886128' }}>Итого:</h4>
// //               <h4 style={{ color: '#886128', fontWeight: 'bold' }}>{totalAmount.toLocaleString()} ₽</h4>
// //             </div>
// //             <div className="d-flex justify-content-center mt-5">
// //               <button
// //                 onClick={() => alert('Оплата успешно завершена!')}
// //                 style={{
// //                   backgroundColor: '#FFA000',
// //                   color: 'white',
// //                   border: 'none',
// //                   borderRadius: '20px',
// //                   padding: '10px 30px',
// //                   fontSize: '16px',
// //                   fontWeight: 'bold',
// //                   cursor: 'pointer'
// //                 }}
// //               >
// //                 Оплатить
// //               </button>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default CartPage;







// // src/components/CartPage.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Header from './Header';

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

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Загрузка корзины
//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const fetchCart = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get('cart/');
      
//       if (response.data.items) {
//         setCartItems(response.data.items);
//       } else {
//         setCartItems([]);
//       }
      
//       setError(null);
//     } catch (err) {
//       console.error('Ошибка при загрузке корзины:', err);
//       setError('Не удалось загрузить корзину');
//       // Используем моковые данные при ошибке
//       setCartItems(getMockCartItems());
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getMockCartItems = () => {
//     return [
//       {
//         id: 1,
//         product: {
//           id: 1,
//           name: 'Смартфон X100',
//           price: '29999.00',
//           brand: { name: 'СуперМагазин' },
//           image: 'https://via.placeholder.com/80?text=Phone'
//         },
//         quantity: 1,
//         total_price: '29999.00'
//       },
//       {
//         id: 2,
//         product: {
//           id: 2,
//           name: 'Кроссовки ProRun',
//           price: '8999.00',
//           brand: { name: 'Селло' },
//           image: 'https://via.placeholder.com/80?text=Shoes'
//         },
//         quantity: 2,
//         total_price: '17998.00'
//       },
//       {
//         id: 3,
//         product: {
//           id: 3,
//           name: 'Книга "React для начинающих"',
//           price: '1500.00',
//           brand: { name: 'Магазин' },
//           image: 'https://via.placeholder.com/80?text=Book'
//         },
//         quantity: 3,
//         total_price: '4500.00'
//       }
//     ];
//   };

//   const updateQuantity = async (itemId, productId, change) => {
//     try {
//       const item = cartItems.find(item => item.id === itemId);
//       const newQuantity = item.quantity + change;
      
//       if (newQuantity <= 0) {
//         // Удаляем товар
//         await api.delete(`cart/remove_item/?product_id=${productId}`);
//         setCartItems(prev => prev.filter(item => item.id !== itemId));
//       } else {
//         // Обновляем количество
//         const response = await api.put('cart/update_item/', {
//           product_id: productId,
//           quantity: newQuantity
//         });
        
//         setCartItems(prev => 
//           prev.map(item => 
//             item.id === itemId 
//               ? { ...item, quantity: newQuantity, total_price: response.data.total_price }
//               : item
//           )
//         );
//       }
//     } catch (err) {
//       console.error('Ошибка при обновлении количества:', err);
//       alert(err.response?.data?.error || 'Не удалось обновить количество');
//     }
//   };

//   const removeItem = async (itemId, productId) => {
//     try {
//       await api.delete(`cart/remove_item/?product_id=${productId}`);
//       setCartItems(prev => prev.filter(item => item.id !== itemId));
//     } catch (err) {
//       console.error('Ошибка при удалении товара:', err);
//       alert(err.response?.data?.error || 'Не удалось удалить товар');
//     }
//   };

//   const handleCheckout = async () => {
//     try {
//       const response = await api.post('cart/checkout/');
//       alert('Оплата успешно завершена!');
//       setCartItems([]);
//     } catch (err) {
//       console.error('Ошибка при оформлении заказа:', err);
//       alert(err.response?.data?.error || 'Не удалось оформить заказ');
//     }
//   };

//   const totalAmount = cartItems.reduce((sum, item) => {
//     return sum + parseFloat(item.total_price || 0);
//   }, 0);

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
//         <h1 className="text-center mb-5" style={{ color: '#886128', fontWeight: 'bold' }}>Корзина товаров</h1>

//         {error && (
//           <div className="alert alert-warning text-center" role="alert">
//             {error}
//           </div>
//         )}

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
//                 maxWidth: '1000px',
//                 margin: '0 auto'
//               }}>
//                 <div className="d-flex align-items-center">
//                   <img 
//                     src={item.product.image || `https://via.placeholder.com/80?text=${item.product.name.substring(0, 5)}`} 
//                     alt={item.product.name} 
//                     style={{
//                       width: '80px',
//                       height: '80px',
//                       objectFit: 'cover',
//                       marginRight: '15px',
//                       borderRadius: '8px'
//                     }} 
//                   />
//                   <div style={{ flex: 1 }}>
//                     <h5 style={{ color: '#886128', margin: '0' }}>{item.product.name}</h5>
//                     <p style={{ color: '#886128', margin: '5px 0' }}>
//                       Магазин: {item.product.brand?.name || 'Неизвестно'}
//                     </p>
//                     <p style={{ color: '#886128', margin: '5px 0' }}>
//                       Цена: {parseFloat(item.product.price).toLocaleString('ru-RU')} ₽
//                     </p>
//                   </div>
//                   <div className="d-flex align-items-center" style={{ gap: '10px' }}>
//                     <button
//                       onClick={() => updateQuantity(item.id, item.product.id, -1)}
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
//                       onClick={() => updateQuantity(item.id, item.product.id, 1)}
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
//                       onClick={() => removeItem(item.id, item.product.id)}
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
//             maxWidth: '1000px',
//             margin: '0 auto'
//           }}>
//             <div className="d-flex justify-content-between align-items-center">
//               <h4 style={{ color: '#886128' }}>Итого:</h4>
//               <h4 style={{ color: '#886128', fontWeight: 'bold' }}>
//                 {totalAmount.toLocaleString('ru-RU')} ₽
//               </h4>
//             </div>
//             <div className="d-flex justify-content-center mt-5">
//               <button
//                 onClick={handleCheckout}
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
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token') || localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allProducts, setAllProducts] = useState([]); // Все товары из магазинов
  const [brands, setBrands] = useState([]);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Загрузка всех товаров, магазинов и корзины
  useEffect(() => {
    fetchAllProducts();
    fetchBrands();
    fetchCart();
  }, []);

  // Фильтрация товаров при изменении фильтров
  useEffect(() => {
    if (showAllProducts) {
      filterProducts();
    }
  }, [selectedBrand, searchQuery, allProducts]);

  // Загрузка всех товаров из магазинов пользователей
  const fetchAllProducts = async () => {
    try {
      const response = await api.get('/constructor/api/sello/all-products/');
      if (response.data.products) {
        setAllProducts(response.data.products);
      }
    } catch (err) {
      console.error('Ошибка при загрузке всех товаров:', err);
      // Используем моковые данные при ошибке
      setAllProducts(getMockProducts());
    }
  };

  // Загрузка всех магазинов
  const fetchBrands = async () => {
    try {
      const response = await api.get('/constructor/api/sello/brands/');
      if (response.data.brands) {
        setBrands(response.data.brands);
      }
    } catch (err) {
      console.error('Ошибка при загрузке магазинов:', err);
    }
  };

  // Загрузка корзины пользователя
  const fetchCart = async () => {
    try {
      setLoading(true);
      // Пробуем загрузить корзину из API
      let cartData = [];
      
      try {
        const response = await api.get('/api/cart/');
        if (response.data && response.data.items) {
          cartData = response.data.items;
        }
      } catch (cartError) {
        console.warn('Корзина API не доступна, используем localStorage:', cartError);
        // Если API корзины нет, используем localStorage
        cartData = getCartFromLocalStorage();
      }
      
      // Обогащаем данные товаров из allProducts
      const enrichedCartItems = cartData.map(cartItem => {
        const productInfo = allProducts.find(p => p.id === cartItem.product_id) || 
                          allProducts.find(p => p.id === cartItem.product?.id);
        
        if (productInfo) {
          return {
            ...cartItem,
            product: {
              id: productInfo.id,
              name: productInfo.name || 'Неизвестный товар',
              price: productInfo.price || '0',
              brand: productInfo.brand || { name: 'Неизвестный магазин' },
              image: productInfo.image,
              description: productInfo.description,
              stock: productInfo.stock
            },
            total_price: (parseFloat(productInfo.price || 0) * (cartItem.quantity || 1)).toFixed(2)
          };
        }
        
        return cartItem;
      });
      
      setCartItems(enrichedCartItems);
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

  // Получение корзины из localStorage
  const getCartFromLocalStorage = () => {
    try {
      const cartStr = localStorage.getItem('user_cart');
      if (cartStr) {
        return JSON.parse(cartStr);
      }
    } catch (e) {
      console.error('Ошибка чтения корзины из localStorage:', e);
    }
    return [];
  };

  // Сохранение корзины в localStorage
  const saveCartToLocalStorage = (items) => {
    try {
      const simplifiedItems = items.map(item => ({
        product_id: item.product.id,
        quantity: item.quantity
      }));
      localStorage.setItem('user_cart', JSON.stringify(simplifiedItems));
    } catch (e) {
      console.error('Ошибка сохранения корзины в localStorage:', e);
    }
  };

  const getMockProducts = () => {
    return [
      {
        id: 1,
        name: 'Смартфон X100',
        price: '29999.00',
        brand: { id: 1, name: 'СуперМагазин' },
        image: 'https://via.placeholder.com/80?text=Phone',
        description: 'Современный смартфон с отличной камерой',
        stock: 10
      },
      {
        id: 2,
        name: 'Кроссовки ProRun',
        price: '8999.00',
        brand: { id: 2, name: 'Селло' },
        image: 'https://via.placeholder.com/80?text=Shoes',
        description: 'Удобные кроссовки для бега',
        stock: 25
      },
      {
        id: 3,
        name: 'Книга "React для начинающих"',
        price: '1500.00',
        brand: { id: 3, name: 'Магазин' },
        image: 'https://via.placeholder.com/80?text=Book',
        description: 'Практическое руководство по React',
        stock: 50
      }
    ];
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
        await removeItemFromCart(itemId, productId);
      } else {
        // Обновляем количество
        const updatedCartItems = cartItems.map(item => 
          item.id === itemId 
            ? { 
                ...item, 
                quantity: newQuantity,
                total_price: (parseFloat(item.product.price) * newQuantity).toFixed(2)
              }
            : item
        );
        
        setCartItems(updatedCartItems);
        saveCartToLocalStorage(updatedCartItems);
        
        // Пробуем отправить на сервер
        try {
          await api.put('/api/cart/update_item/', {
            product_id: productId,
            quantity: newQuantity
          });
        } catch (apiError) {
          console.warn('Не удалось обновить корзину на сервере:', apiError);
        }
      }
    } catch (err) {
      console.error('Ошибка при обновлении количества:', err);
      alert('Не удалось обновить количество');
    }
  };

  const removeItemFromCart = async (itemId, productId) => {
    try {
      const updatedCartItems = cartItems.filter(item => item.id !== itemId);
      setCartItems(updatedCartItems);
      saveCartToLocalStorage(updatedCartItems);
      
      // Пробуем удалить на сервере
      try {
        await api.delete(`/api/cart/remove_item/?product_id=${productId}`);
      } catch (apiError) {
        console.warn('Не удалось удалить товар на сервере:', apiError);
      }
    } catch (err) {
      console.error('Ошибка при удалении товара:', err);
      alert('Не удалось удалить товар');
    }
  };

  const removeItem = removeItemFromCart;

  const handleCheckout = async () => {
    try {
      // Пробуем оформить заказ через API
      try {
        const response = await api.post('/api/cart/checkout/');
        alert('Оплата успешно завершена!');
        setCartItems([]);
        saveCartToLocalStorage([]);
      } catch (apiError) {
        console.warn('API оформления заказа не доступен, используем локальную логику:', apiError);
        
        // Локальная логика оформления заказа
        if (cartItems.length === 0) {
          alert('Корзина пуста!');
          return;
        }
        
        // Проверяем наличие товаров
        const outOfStockItems = cartItems.filter(item => 
          item.product.stock < item.quantity
        );
        
        if (outOfStockItems.length > 0) {
          alert(`Следующие товары недоступны в нужном количестве:\n${
            outOfStockItems.map(item => `${item.product.name} (осталось: ${item.product.stock})`).join('\n')
          }`);
          return;
        }
        
        // Создаем заказ
        const order = {
          id: Date.now(),
          items: cartItems,
          total_amount: totalAmount,
          created_at: new Date().toISOString(),
          status: 'completed'
        };
        
        // Сохраняем заказ в историю
        const orders = JSON.parse(localStorage.getItem('user_orders') || '[]');
        orders.push(order);
        localStorage.setItem('user_orders', JSON.stringify(orders));
        
        // Очищаем корзину
        setCartItems([]);
        saveCartToLocalStorage([]);
        
        alert('Заказ успешно оформлен! Спасибо за покупку!');
      }
    } catch (err) {
      console.error('Ошибка при оформлении заказа:', err);
      alert('Не удалось оформить заказ. Попробуйте еще раз.');
    }
  };

  const totalAmount = cartItems.reduce((sum, item) => {
    return sum + parseFloat(item.total_price || 0);
  }, 0);

  // Функция для добавления товара в корзину
  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.product.id === product.id);
    
    if (existingItem) {
      // Увеличиваем количество существующего товара
      updateQuantity(existingItem.id, product.id, 1);
    } else {
      // Добавляем новый товар
      const newItem = {
        id: Date.now(),
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          brand: product.brand,
          image: product.image,
          stock: product.stock
        },
        quantity: 1,
        total_price: parseFloat(product.price || 0).toFixed(2)
      };
      
      const updatedCartItems = [...cartItems, newItem];
      setCartItems(updatedCartItems);
      saveCartToLocalStorage(updatedCartItems);
      
      // Пробуем добавить на сервер
      try {
        api.post('/api/cart/add_item/', {
          product_id: product.id,
          quantity: 1
        }).catch(e => console.warn('Не удалось добавить товар на сервер:', e));
      } catch (e) {
        console.warn('Ошибка при добавлении товара на сервер:', e);
      }
    }
    
    alert(`Товар "${product.name}" добавлен в корзину!`);
  };

  // Фильтрация товаров
  const filterProducts = () => {
    let filtered = allProducts;
    
    if (selectedBrand !== 'all') {
      filtered = filtered.filter(product => 
        product.brand && product.brand.id.toString() === selectedBrand
      );
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        (product.description && product.description.toLowerCase().includes(query)) ||
        (product.brand && product.brand.name.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  };

  const filteredProducts = showAllProducts ? filterProducts() : [];

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

        {/* Кнопка для просмотра всех товаров */}
        <div className="mb-4 text-center">
          <button
            onClick={() => setShowAllProducts(!showAllProducts)}
            className="btn"
            style={{
              backgroundColor: '#FFA000',
              color: 'white',
              border: 'none',
              borderRadius: '20px',
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginBottom: '20px'
            }}
          >
            {showAllProducts ? 'Скрыть все товары' : 'Показать все товары из магазинов'}
          </button>
        </div>

        {/* Список всех товаров из магазинов */}
        {showAllProducts && (
          <div className="mb-5">
            <h3 style={{ color: '#886128', marginBottom: '20px' }}>Все товары из магазинов</h3>
            
            {/* Фильтры */}
            <div className="row mb-4 g-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    borderColor: '#EED1A6',
                    color: '#886128'
                  }}
                />
              </div>
              <div className="col-md-6">
                <select 
                  className="form-select" 
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  style={{
                    borderColor: '#EED1A6',
                    color: '#886128'
                  }}
                >
                  <option value="all">Все магазины</option>
                  {brands.map(brand => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name} ({brand.products_count || 0} товаров)
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="row g-4">
              {filteredProducts.length === 0 ? (
                <div className="col-12 text-center">
                  <p style={{ color: '#886128' }}>Товары не найдены</p>
                  {searchQuery && (
                    <button 
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedBrand('all');
                      }}
                      style={{ marginTop: '10px' }}
                    >
                      Сбросить фильтры
                    </button>
                  )}
                </div>
              ) : (
                filteredProducts.map(product => (
                  <div key={product.id} className="col-md-4 col-lg-3">
                    <div className="card h-100" style={{ borderColor: '#EED1A6' }}>
                      <img 
                        src={product.image || `https://via.placeholder.com/200x150?text=${product.name.substring(0, 10)}`}
                        className="card-img-top"
                        alt={product.name}
                        style={{ height: '150px', objectFit: 'cover' }}
                      />
                      <div className="card-body d-flex flex-column">
                        <h6 className="card-title" style={{ color: '#886128' }}>{product.name}</h6>
                        <p className="card-text small" style={{ color: '#886128' }}>
                          Магазин: {product.brand?.name || 'Неизвестно'}
                        </p>
                        <p className="card-text" style={{ color: '#886128', fontWeight: 'bold' }}>
                          {parseFloat(product.price).toLocaleString('ru-RU')} ₽
                        </p>
                        <p className="card-text small" style={{ color: '#886128' }}>
                          В наличии: {product.stock || 0} шт.
                        </p>
                        <div className="mt-auto">
                          <button
                            onClick={() => addToCart(product)}
                            disabled={!product.stock || product.stock <= 0}
                            className="btn btn-sm w-100"
                            style={{
                              backgroundColor: product.stock > 0 ? '#FFA000' : '#cccccc',
                              color: 'white',
                              border: 'none',
                              borderRadius: '20px',
                              cursor: product.stock > 0 ? 'pointer' : 'not-allowed'
                            }}
                          >
                            {product.stock > 0 ? 'В корзину' : 'Нет в наличии'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Список товаров в корзине */}
        <div className="row g-4">
          {cartItems.length === 0 ? (
            <div className="col-12 text-center">
              <p style={{ color: '#886128', fontSize: '1.2rem' }}>Корзина пуста</p>
              <p style={{ color: '#886128' }}>
                Добавьте товары из магазинов выше или перейдите в раздел покупок.
              </p>
              {!showAllProducts && (
                <button
                  onClick={() => setShowAllProducts(true)}
                  className="btn mt-3"
                  style={{
                    backgroundColor: '#FFA000',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '10px 20px',
                    cursor: 'pointer'
                  }}
                >
                  Посмотреть товары
                </button>
              )}
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
                    {item.product.stock !== undefined && (
                      <p style={{ color: '#886128', margin: '5px 0', fontSize: '0.9rem' }}>
                        В наличии: {item.product.stock} шт.
                      </p>
                    )}
                  </div>
                  <div className="d-flex align-items-center" style={{ gap: '10px' }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.product.id, -1)}
                      disabled={item.quantity <= 1}
                      style={{
                        background: item.quantity <= 1 ? '#f5f5f5' : 'none',
                        border: '1px solid #EED1A6',
                        color: item.quantity <= 1 ? '#cccccc' : '#886128',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer'
                      }}
                    >
                      -
                    </button>
                    <span style={{ color: '#886128', fontWeight: 'bold', minWidth: '30px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.product.id, 1)}
                      disabled={item.product.stock !== undefined && item.quantity >= item.product.stock}
                      style={{
                        background: (item.product.stock !== undefined && item.quantity >= item.product.stock) ? '#f5f5f5' : 'none',
                        border: '1px solid #EED1A6',
                        color: (item.product.stock !== undefined && item.quantity >= item.product.stock) ? '#cccccc' : '#886128',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: (item.product.stock !== undefined && item.quantity >= item.product.stock) ? 'not-allowed' : 'pointer'
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
                      title="Удалить из корзины"
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
                {totalAmount.toLocaleString('ru-RU', { minimumFractionDigits: 2 })} ₽
              </h4>
            </div>
            <div className="mt-3">
              <p style={{ color: '#886128', fontSize: '0.9rem' }}>
                Количество товаров: {cartItems.reduce((sum, item) => sum + item.quantity, 0)} шт.
              </p>
              <p style={{ color: '#886128', fontSize: '0.9rem' }}>
                Количество позиций: {cartItems.length} шт.
              </p>
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

        {/* Информация о магазинах */}
        <div className="mt-5">
          <h3 style={{ color: '#886128', marginBottom: '20px' }}>Магазины на сайте</h3>
          <div className="row g-4">
            {brands.length === 0 ? (
              <div className="col-12 text-center">
                <p style={{ color: '#886128' }}>Магазины не найдены</p>
              </div>
            ) : (
              brands.map(brand => (
                <div key={brand.id} className="col-md-4 col-lg-3">
                  <div className="card h-100" style={{ borderColor: '#EED1A6' }}>
                    <div className="card-body text-center d-flex flex-column">
                      <h5 style={{ color: '#886128' }}>{brand.name}</h5>
                      <p style={{ color: '#886128', fontSize: '0.9rem' }}>
                        Создатель: {brand.created_by || 'Неизвестно'}
                      </p>
                      <p style={{ color: '#886128', fontSize: '0.9rem' }}>
                        Товаров: {brand.products_count || 0}
                      </p>
                      <div className="mt-auto">
                        <button
                          onClick={() => {
                            setShowAllProducts(true);
                            setSelectedBrand(brand.id.toString());
                          }}
                          className="btn btn-sm w-100"
                          style={{
                            backgroundColor: '#FFA000',
                            color: 'white',
                            border: 'none',
                            borderRadius: '20px',
                            padding: '5px 15px',
                            cursor: 'pointer'
                          }}
                        >
                          Посмотреть товары
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
