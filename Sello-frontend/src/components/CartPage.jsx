



// // src/components/CartPage.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Header from './Header';

// // Настройка axios
// const api = axios.create({
//   baseURL: 'http://localhost:8000',
//   withCredentials: true,
// });

// api.interceptors.request.use(config => {
//   const token = localStorage.getItem('access_token') || localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [allProducts, setAllProducts] = useState([]); // Все товары из магазинов
//   const [brands, setBrands] = useState([]);
//   const [showAllProducts, setShowAllProducts] = useState(false);
//   const [selectedBrand, setSelectedBrand] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');

//   // Загрузка всех товаров, магазинов и корзины
//   useEffect(() => {
//     fetchAllProducts();
//     fetchBrands();
//     fetchCart();
//   }, []);

//   // Фильтрация товаров при изменении фильтров
//   useEffect(() => {
//     if (showAllProducts) {
//       filterProducts();
//     }
//   }, [selectedBrand, searchQuery, allProducts]);

//   // Загрузка всех товаров из магазинов пользователей
//   const fetchAllProducts = async () => {
//     try {
//       const response = await api.get('/constructor/api/sello/all-products/');
//       if (response.data.products) {
//         setAllProducts(response.data.products);
//       }
//     } catch (err) {
//       console.error('Ошибка при загрузке всех товаров:', err);
//       // Используем моковые данные при ошибке
//       setAllProducts(getMockProducts());
//     }
//   };

//   // Загрузка всех магазинов
//   const fetchBrands = async () => {
//     try {
//       const response = await api.get('/constructor/api/sello/brands/');
//       if (response.data.brands) {
//         setBrands(response.data.brands);
//       }
//     } catch (err) {
//       console.error('Ошибка при загрузке магазинов:', err);
//     }
//   };

//   // Загрузка корзины пользователя
//   const fetchCart = async () => {
//     try {
//       setLoading(true);
      
//       // 1. Загружаем товары из превью (из localStorage)
//       let previewCartItems = [];
//       try {
//         const previewCartStr = localStorage.getItem('preview_cart');
//         console.log('📦 Загружаем корзину из превью:', previewCartStr);
//         if (previewCartStr) {
//           previewCartItems = JSON.parse(previewCartStr).map(item => ({
//             id: `preview-${item.id}`,
//             product: {
//               id: item.id || `preview-${Date.now()}`,
//               name: item.name || item.title || 'Товар из превью',
//               price: item.price?.toString() || '0',
//               brand: { 
//                 name: item.brand || 'Магазин из превью',
//                 id: 'preview-shop'
//               },
//               image: item.image || 'https://via.placeholder.com/80?text=Превью',
//               description: item.description || 'Товар добавлен из предпросмотра страницы'
//             },
//             quantity: item.quantity || 1,
//             total_price: ((parseFloat(item.price) || 0) * (item.quantity || 1)).toFixed(2),
//             source: 'preview',
//             previewData: item
//           }));
//         }
//       } catch (e) {
//         console.error('Ошибка загрузки корзины из превью:', e);
//       }

//       console.log('🛒 Товары из превью:', previewCartItems);

//       // 2. Пробуем загрузить корзину из API
//       let apiCartItems = [];
//       try {
//         const response = await api.get('/api/cart/');
//         if (response.data && response.data.items) {
//           apiCartItems = response.data.items.map(item => ({
//             ...item,
//             source: 'api'
//           }));
//         }
//       } catch (cartError) {
//         console.warn('Корзина API не доступна:', cartError);
//         // Если API корзины нет, используем только товары из превью
//       }

//       console.log('🛒 Товары из API:', apiCartItems);

//       // 3. Объединяем товары из обоих источников
//       const allCartItems = [...apiCartItems, ...previewCartItems];
      
//       // 4. Объединяем дубликаты (если один товар из обоих источников)
//       const mergedItems = mergeCartItems(allCartItems);
      
//       setCartItems(mergedItems);
//       setError(null);
      
//       console.log('🛒 Итоговая корзина:', mergedItems);
//     } catch (err) {
//       console.error('Общая ошибка при загрузке корзины:', err);
//       setError('Не удалось загрузить корзину');
//       // Пробуем загрузить только из превью при ошибке
//       loadPreviewCartOnly();
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Функция для объединения товаров из разных источников
//   const mergeCartItems = (items) => {
//     const merged = {};
    
//     items.forEach(item => {
//       // Используем product.id как ключ, если нет - создаем уникальный
//       const itemId = item.product?.id || item.id;
      
//       if (merged[itemId]) {
//         // Увеличиваем количество существующего товара
//         merged[itemId].quantity += item.quantity || 1;
//         merged[itemId].total_price = (
//           parseFloat(merged[itemId].total_price) + 
//           ((parseFloat(item.product?.price) || 0) * (item.quantity || 1))
//         ).toFixed(2);
        
//         // Если есть товар из API и превью, сохраняем оба источника
//         if (item.source && !merged[itemId].sources?.includes(item.source)) {
//           merged[itemId].sources = [...(merged[itemId].sources || []), item.source];
//         }
//       } else {
//         // Добавляем новый товар
//         merged[itemId] = {
//           id: item.id,
//           product: item.product || {
//             id: itemId,
//             name: item.name || 'Неизвестный товар',
//             price: (item.price || 0).toString(),
//             brand: item.brand || { name: 'Неизвестный магазин', id: 'unknown' },
//             image: item.image || 'https://via.placeholder.com/80?text=Товар',
//             description: item.description || ''
//           },
//           quantity: item.quantity || 1,
//           total_price: ((parseFloat(item.product?.price) || parseFloat(item.price) || 0) * (item.quantity || 1)).toFixed(2),
//           source: item.source || 'unknown',
//           sources: item.source ? [item.source] : ['unknown'],
//           previewData: item.previewData
//         };
//       }
//     });
    
//     return Object.values(merged);
//   };

//   // Загрузка только корзины из превью
//   const loadPreviewCartOnly = () => {
//     try {
//       const previewCartStr = localStorage.getItem('preview_cart');
//       if (previewCartStr) {
//         const previewItems = JSON.parse(previewCartStr);
//         const formattedItems = previewItems.map(item => ({
//           id: `preview-${item.id}`,
//           product: {
//             id: item.id || `preview-${Date.now()}`,
//             name: item.name || item.title || 'Товар из превью',
//             price: item.price?.toString() || '0',
//             brand: { 
//               name: item.brand || 'Магазин из превью',
//               id: 'preview-shop'
//             },
//             image: item.image || 'https://via.placeholder.com/80?text=Превью',
//             description: item.description || 'Товар добавлен из предпросмотра страницы'
//           },
//           quantity: item.quantity || 1,
//           total_price: ((parseFloat(item.price) || 0) * (item.quantity || 1)).toFixed(2),
//           source: 'preview',
//           previewData: item
//         }));
//         setCartItems(formattedItems);
//       }
//     } catch (e) {
//       console.error('Ошибка загрузки корзины из превью:', e);
//     }
//   };

//   // Получение корзины из localStorage
//   const getCartFromLocalStorage = () => {
//     try {
//       const cartStr = localStorage.getItem('user_cart');
//       if (cartStr) {
//         return JSON.parse(cartStr);
//       }
//     } catch (e) {
//       console.error('Ошибка чтения корзины из localStorage:', e);
//     }
//     return [];
//   };

//   // Сохранение корзины в localStorage
//   const saveCartToLocalStorage = (items) => {
//     try {
//       // Сохраняем только товары из превью
//       const previewItems = items.filter(item => item.source === 'preview');
//       const simplifiedItems = previewItems.map(item => ({
//         id: item.previewData?.id || item.product.id.replace('preview-', ''),
//         name: item.product.name,
//         price: parseFloat(item.product.price),
//         quantity: item.quantity,
//         image: item.product.image,
//         brand: item.product.brand.name,
//         description: item.product.description
//       }));
      
//       if (simplifiedItems.length > 0) {
//         localStorage.setItem('preview_cart', JSON.stringify(simplifiedItems));
//       }
//     } catch (e) {
//       console.error('Ошибка сохранения корзины в localStorage:', e);
//     }
//   };

//   const getMockProducts = () => {
//     return [
//       {
//         id: 1,
//         name: 'Смартфон X100',
//         price: '29999.00',
//         brand: { id: 1, name: 'СуперМагазин' },
//         image: 'https://via.placeholder.com/80?text=Phone',
//         description: 'Современный смартфон с отличной камерой',
//         stock: 10
//       },
//       {
//         id: 2,
//         name: 'Кроссовки ProRun',
//         price: '8999.00',
//         brand: { id: 2, name: 'Селло' },
//         image: 'https://via.placeholder.com/80?text=Shoes',
//         description: 'Удобные кроссовки для бега',
//         stock: 25
//       },
//       {
//         id: 3,
//         name: 'Книга "React для начинающих"',
//         price: '1500.00',
//         brand: { id: 3, name: 'Магазин' },
//         image: 'https://via.placeholder.com/80?text=Book',
//         description: 'Практическое руководство по React',
//         stock: 50
//       }
//     ];
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
//         await removeItemFromCart(itemId, productId);
//       } else {
//         // Обновляем количество
//         const updatedCartItems = cartItems.map(item => 
//           item.id === itemId 
//             ? { 
//                 ...item, 
//                 quantity: newQuantity,
//                 total_price: (parseFloat(item.product.price) * newQuantity).toFixed(2)
//               }
//             : item
//         );
        
//         setCartItems(updatedCartItems);
//         saveCartToLocalStorage(updatedCartItems);
        
//         // Если товар из API, пробуем отправить на сервер
//         if (item.source === 'api') {
//           try {
//             await api.put('/api/cart/update_item/', {
//               product_id: productId,
//               quantity: newQuantity
//             });
//           } catch (apiError) {
//             console.warn('Не удалось обновить корзину на сервере:', apiError);
//           }
//         }
//       }
//     } catch (err) {
//       console.error('Ошибка при обновлении количества:', err);
//       alert('Не удалось обновить количество');
//     }
//   };

//   const removeItemFromCart = async (itemId, productId) => {
//     try {
//       const itemToRemove = cartItems.find(item => item.id === itemId);
//       const updatedCartItems = cartItems.filter(item => item.id !== itemId);
//       setCartItems(updatedCartItems);
//       saveCartToLocalStorage(updatedCartItems);
      
//       // Если товар из API, пробуем удалить на сервере
//       if (itemToRemove && itemToRemove.source === 'api') {
//         try {
//           await api.delete(`/api/cart/remove_item/?product_id=${productId}`);
//         } catch (apiError) {
//           console.warn('Не удалось удалить товар на сервере:', apiError);
//         }
//       }
//     } catch (err) {
//       console.error('Ошибка при удалении товара:', err);
//       alert('Не удалось удалить товар');
//     }
//   };

//   const removeItem = removeItemFromCart;

//   const handleCheckout = async () => {
//     try {
//       if (cartItems.length === 0) {
//         alert('Корзина пуста!');
//         return;
//       }
      
//       // Разделяем товары по источникам
//       const apiItems = cartItems.filter(item => item.source === 'api');
//       const previewItems = cartItems.filter(item => item.source === 'preview');
      
//       // Пробуем оформить заказ для товаров из API
//       if (apiItems.length > 0) {
//         try {
//           const response = await api.post('/api/cart/checkout/');
//           console.log('✅ Заказ API оформлен:', response.data);
//         } catch (apiError) {
//           console.warn('API оформления заказа не доступен:', apiError);
//         }
//       }
      
//       // Оформляем заказ для товаров из превью
//       if (previewItems.length > 0) {
//         // Создаем заказ для товаров из превью
//         const previewOrder = {
//           id: Date.now(),
//           items: previewItems,
//           total_amount: previewItems.reduce((sum, item) => sum + parseFloat(item.total_price), 0),
//           created_at: new Date().toISOString(),
//           status: 'pending',
//           source: 'preview'
//         };
        
//         // Сохраняем заказ в историю
//         const orders = JSON.parse(localStorage.getItem('user_orders') || '[]');
//         orders.push(previewOrder);
//         localStorage.setItem('user_orders', JSON.stringify(orders));
        
//         // Очищаем корзину превью
//         localStorage.removeItem('preview_cart');
//       }
      
//       // Очищаем всю корзину
//       setCartItems([]);
      
//       alert('✅ Заказ успешно оформлен! Спасибо за покупку!\n\nТовары из превью сохранены в истории заказов.');
//     } catch (err) {
//       console.error('Ошибка при оформлении заказа:', err);
//       alert('❌ Не удалось оформить заказ. Попробуйте еще раз.');
//     }
//   };

//   const totalAmount = cartItems.reduce((sum, item) => {
//     return sum + parseFloat(item.total_price || 0);
//   }, 0);

//   // Функция для добавления товара в корзину
//   const addToCart = (product) => {
//     const existingItem = cartItems.find(item => 
//       item.product.id === product.id || 
//       (item.source === 'preview' && item.product.id === `preview-${product.id}`)
//     );
    
//     if (existingItem) {
//       // Увеличиваем количество существующего товара
//       updateQuantity(existingItem.id, existingItem.product.id, 1);
//     } else {
//       // Добавляем новый товар
//       const isFromStore = product.id && !product.id.toString().includes('preview');
//       const source = isFromStore ? 'api' : 'preview';
      
//       const newItem = {
//         id: Date.now(),
//         product: {
//           id: product.id,
//           name: product.name,
//           price: product.price,
//           brand: product.brand,
//           image: product.image,
//           stock: product.stock
//         },
//         quantity: 1,
//         total_price: parseFloat(product.price || 0).toFixed(2),
//         source: source
//       };
      
//       const updatedCartItems = [...cartItems, newItem];
//       setCartItems(updatedCartItems);
//       saveCartToLocalStorage(updatedCartItems);
      
//       // Если товар из магазина, пробуем добавить на сервер
//       if (isFromStore) {
//         try {
//           api.post('/api/cart/add_item/', {
//             product_id: product.id,
//             quantity: 1
//           }).catch(e => console.warn('Не удалось добавить товар на сервер:', e));
//         } catch (e) {
//           console.warn('Ошибка при добавлении товара на сервер:', e);
//         }
//       }
//     }
    
//     alert(`✅ Товар "${product.name}" добавлен в корзину!`);
//   };

//   // Фильтрация товаров
//   const filterProducts = () => {
//     let filtered = allProducts;
    
//     if (selectedBrand !== 'all') {
//       filtered = filtered.filter(product => 
//         product.brand && product.brand.id.toString() === selectedBrand
//       );
//     }
    
//     if (searchQuery) {
//       const query = searchQuery.toLowerCase();
//       filtered = filtered.filter(product => 
//         product.name.toLowerCase().includes(query) ||
//         (product.description && product.description.toLowerCase().includes(query)) ||
//         (product.brand && product.brand.name.toLowerCase().includes(query))
//       );
//     }
    
//     return filtered;
//   };

//   const filteredProducts = showAllProducts ? filterProducts() : [];

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
//         <h1 className="text-center mb-5" style={{ color: '#886128', fontWeight: 'bold' }}>
//           🛒 Корзина товаров
//         </h1>

//         {error && (
//           <div className="alert alert-warning text-center" role="alert">
//             {error}
//           </div>
//         )}

//         {/* Информация о корзине */}
//         <div className="mb-4 text-center">
//           <div style={{
//             backgroundColor: '#FFF',
//             borderRadius: '12px',
//             padding: '15px',
//             boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//             maxWidth: '600px',
//             margin: '0 auto 20px'
//           }}>
//             <h4 style={{ color: '#886128', marginBottom: '15px' }}>Итоги корзины</h4>
//             <div className="row">
//               <div className="col-6">
//                 <div style={{ color: '#886128' }}>Товаров:</div>
//                 <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#FFA000' }}>
//                   {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
//                 </div>
//               </div>
//               <div className="col-6">
//                 <div style={{ color: '#886128' }}>Сумма:</div>
//                 <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#FFA000' }}>
//                   {totalAmount.toLocaleString('ru-RU', { minimumFractionDigits: 2 })} ₽
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Кнопка для просмотра всех товаров */}
//         <div className="mb-4 text-center">
//           <button
//             onClick={() => setShowAllProducts(!showAllProducts)}
//             className="btn"
//             style={{
//               backgroundColor: '#FFA000',
//               color: 'white',
//               border: 'none',
//               borderRadius: '20px',
//               padding: '10px 20px',
//               fontSize: '16px',
//               fontWeight: 'bold',
//               cursor: 'pointer',
//               marginBottom: '20px'
//             }}
//           >
//             {showAllProducts ? 'Скрыть все товары' : '🛍️ Показать все товары из магазинов'}
//           </button>
//         </div>

//         {/* Список всех товаров из магазинов */}
//         {showAllProducts && (
//           <div className="mb-5">
//             <h3 style={{ color: '#886128', marginBottom: '20px', textAlign: 'center' }}>
//               🛍️ Все товары из магазинов
//             </h3>
            
//             {/* Фильтры */}
//             <div className="row mb-4 g-3">
//               <div className="col-md-6">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="🔍 Поиск товаров..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   style={{
//                     borderColor: '#EED1A6',
//                     color: '#886128',
//                     borderRadius: '20px',
//                     padding: '10px 15px'
//                   }}
//                 />
//               </div>
//               <div className="col-md-6">
//                 <select 
//                   className="form-select" 
//                   value={selectedBrand}
//                   onChange={(e) => setSelectedBrand(e.target.value)}
//                   style={{
//                     borderColor: '#EED1A6',
//                     color: '#886128',
//                     borderRadius: '20px',
//                     padding: '10px 15px'
//                   }}
//                 >
//                   <option value="all">🏪 Все магазины</option>
//                   {brands.map(brand => (
//                     <option key={brand.id} value={brand.id}>
//                       {brand.name} ({brand.products_count || 0} товаров)
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
            
//             <div className="row g-4">
//               {filteredProducts.length === 0 ? (
//                 <div className="col-12 text-center">
//                   <p style={{ color: '#886128', fontSize: '1.1rem' }}>Товары не найдены</p>
//                   {searchQuery && (
//                     <button 
//                       className="btn btn-sm btn-outline-secondary"
//                       onClick={() => {
//                         setSearchQuery('');
//                         setSelectedBrand('all');
//                       }}
//                       style={{ 
//                         marginTop: '10px',
//                         borderRadius: '20px',
//                         borderColor: '#EED1A6',
//                         color: '#886128'
//                       }}
//                     >
//                       Сбросить фильтры
//                     </button>
//                   )}
//                 </div>
//               ) : (
//                 filteredProducts.map(product => (
//                   <div key={product.id} className="col-md-4 col-lg-3">
//                     <div className="card h-100" style={{ 
//                       borderColor: '#EED1A6',
//                       borderRadius: '12px',
//                       overflow: 'hidden',
//                       boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//                     }}>
//                       <img 
//                         src={product.image || `https://via.placeholder.com/200x150?text=${product.name.substring(0, 10)}`}
//                         className="card-img-top"
//                         alt={product.name}
//                         style={{ 
//                           height: '150px', 
//                           objectFit: 'cover',
//                           borderBottom: '1px solid #EED1A6'
//                         }}
//                       />
//                       <div className="card-body d-flex flex-column">
//                         <h6 className="card-title" style={{ color: '#886128' }}>{product.name}</h6>
//                         <p className="card-text small" style={{ color: '#886128' }}>
//                           🏪 {product.brand?.name || 'Неизвестно'}
//                         </p>
//                         <p className="card-text" style={{ color: '#886128', fontWeight: 'bold' }}>
//                           {parseFloat(product.price).toLocaleString('ru-RU')} ₽
//                         </p>
//                         <p className="card-text small" style={{ color: '#886128' }}>
//                           📦 В наличии: {product.stock || 0} шт.
//                         </p>
//                         <div className="mt-auto">
//                           <button
//                             onClick={() => addToCart(product)}
//                             disabled={!product.stock || product.stock <= 0}
//                             className="btn btn-sm w-100"
//                             style={{
//                               backgroundColor: product.stock > 0 ? '#FFA000' : '#cccccc',
//                               color: 'white',
//                               border: 'none',
//                               borderRadius: '20px',
//                               padding: '8px',
//                               cursor: product.stock > 0 ? 'pointer' : 'not-allowed',
//                               fontWeight: 'bold'
//                             }}
//                           >
//                             {product.stock > 0 ? '🛒 В корзину' : '❌ Нет в наличии'}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         )}

//         {/* Список товаров в корзине */}
//         <div className="row g-4 mb-5">
//           {cartItems.length === 0 ? (
//             <div className="col-12 text-center">
//               <div style={{
//                 backgroundColor: '#FFF',
//                 borderRadius: '12px',
//                 padding: '40px 20px',
//                 boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//                 maxWidth: '600px',
//                 margin: '0 auto'
//               }}>
//                 <div style={{ fontSize: '60px', color: '#EED1A6', marginBottom: '20px' }}>
//                   🛒
//                 </div>
//                 <p style={{ color: '#886128', fontSize: '1.3rem', marginBottom: '10px' }}>
//                   Корзина пуста
//                 </p>
//                 <p style={{ color: '#886128', marginBottom: '25px' }}>
//                   Добавьте товары из магазинов выше или перейдите в раздел покупок.
//                 </p>
//                 {!showAllProducts && (
//                   <button
//                     onClick={() => setShowAllProducts(true)}
//                     className="btn"
//                     style={{
//                       backgroundColor: '#FFA000',
//                       color: 'white',
//                       border: 'none',
//                       borderRadius: '20px',
//                       padding: '12px 24px',
//                       fontSize: '16px',
//                       fontWeight: 'bold',
//                       cursor: 'pointer'
//                     }}
//                   >
//                     🛍️ Посмотреть товары
//                   </button>
//                 )}
//               </div>
//             </div>
//           ) : (
//             cartItems.map(item => (
//               <div key={item.id} className="col-12" style={{
//                 backgroundColor: '#FFF',
//                 borderRadius: '12px',
//                 padding: '15px',
//                 boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//                 maxWidth: '1000px',
//                 margin: '0 auto',
//                 borderLeft: item.source === 'preview' ? '5px solid #FFA000' : '5px solid #886128',
//                 position: 'relative'
//               }}>
//                 {/* Индикатор источника */}
//                 {item.source === 'preview' && (
//                   <div style={{
//                     position: 'absolute',
//                     top: '10px',
//                     right: '10px',
//                     backgroundColor: '#FFA000',
//                     color: 'white',
//                     fontSize: '10px',
//                     padding: '3px 8px',
//                     borderRadius: '12px',
//                     fontWeight: 'bold'
//                   }}>
//                     📱 Из превью
//                   </div>
//                 )}
                
//                 <div className="d-flex align-items-center">
//                   <img 
//                     src={item.product.image || `https://via.placeholder.com/80?text=${item.product.name.substring(0, 5)}`} 
//                     alt={item.product.name} 
//                     style={{
//                       width: '90px',
//                       height: '90px',
//                       objectFit: 'cover',
//                       marginRight: '20px',
//                       borderRadius: '8px',
//                       border: '1px solid #EED1A6'
//                     }} 
//                   />
//                   <div style={{ flex: 1 }}>
//                     <h5 style={{ color: '#886128', margin: '0' }}>{item.product.name}</h5>
//                     <p style={{ color: '#886128', margin: '5px 0', fontSize: '0.9rem' }}>
//                       🏪 Магазин: {item.product.brand?.name || 'Неизвестно'}
//                     </p>
//                     <p style={{ color: '#886128', margin: '5px 0', fontSize: '0.9rem' }}>
//                       💰 Цена за шт: {parseFloat(item.product.price).toLocaleString('ru-RU')} ₽
//                     </p>
//                     {item.product.stock !== undefined && item.source === 'api' && (
//                       <p style={{ color: '#886128', margin: '5px 0', fontSize: '0.85rem' }}>
//                         📦 В наличии: {item.product.stock} шт.
//                       </p>
//                     )}
//                     {item.source === 'preview' && (
//                       <p style={{ color: '#FFA000', margin: '5px 0', fontSize: '0.85rem' }}>
//                         📱 Товар добавлен из предпросмотра страницы
//                       </p>
//                     )}
//                   </div>
//                   <div className="d-flex align-items-center" style={{ gap: '10px' }}>
//                     {/* Управление количеством */}
//                     <div className="d-flex align-items-center" style={{
//                       backgroundColor: '#FFF8E1',
//                       borderRadius: '25px',
//                       padding: '5px',
//                       border: '1px solid #EED1A6'
//                     }}>
//                       <button
//                         onClick={() => updateQuantity(item.id, item.product.id, -1)}
//                         disabled={item.quantity <= 1}
//                         style={{
//                           background: item.quantity <= 1 ? '#f5f5f5' : 'none',
//                           border: 'none',
//                           color: item.quantity <= 1 ? '#cccccc' : '#886128',
//                           borderRadius: '50%',
//                           width: '30px',
//                           height: '30px',
//                           display: 'flex',
//                           justifyContent: 'center',
//                           alignItems: 'center',
//                           cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer',
//                           fontWeight: 'bold',
//                           fontSize: '18px'
//                         }}
//                       >
//                         -
//                       </button>
//                       <span style={{ 
//                         color: '#886128', 
//                         fontWeight: 'bold', 
//                         minWidth: '30px', 
//                         textAlign: 'center',
//                         fontSize: '16px'
//                       }}>
//                         {item.quantity}
//                       </span>
//                       <button
//                         onClick={() => updateQuantity(item.id, item.product.id, 1)}
//                         disabled={item.product.stock !== undefined && item.quantity >= item.product.stock}
//                         style={{
//                           background: (item.product.stock !== undefined && item.quantity >= item.product.stock) ? '#f5f5f5' : 'none',
//                           border: 'none',
//                           color: (item.product.stock !== undefined && item.quantity >= item.product.stock) ? '#cccccc' : '#886128',
//                           borderRadius: '50%',
//                           width: '30px',
//                           height: '30px',
//                           display: 'flex',
//                           justifyContent: 'center',
//                           alignItems: 'center',
//                           cursor: (item.product.stock !== undefined && item.quantity >= item.product.stock) ? 'not-allowed' : 'pointer',
//                           fontWeight: 'bold',
//                           fontSize: '18px'
//                         }}
//                       >
//                         +
//                       </button>
//                     </div>
                    
//                     {/* Цена за позицию */}
//                     <div style={{ 
//                       minWidth: '100px',
//                       textAlign: 'right'
//                     }}>
//                       <div style={{ color: '#886128', fontSize: '14px' }}>Сумма:</div>
//                       <div style={{ color: '#886128', fontWeight: 'bold', fontSize: '16px' }}>
//                         {parseFloat(item.total_price).toLocaleString('ru-RU')} ₽
//                       </div>
//                     </div>
                    
//                     {/* Кнопка удаления */}
//                     <button
//                       onClick={() => removeItem(item.id, item.product.id)}
//                       style={{
//                         background: 'none',
//                         border: '1px solid #FF6F00',
//                         color: '#FF6F00',
//                         borderRadius: '50%',
//                         width: '40px',
//                         height: '40px',
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         cursor: 'pointer',
//                         marginLeft: '10px'
//                       }}
//                       title="Удалить из корзины"
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
//             borderRadius: '12px',
//             boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
//             maxWidth: '1000px',
//             margin: '0 auto 40px'
//           }}>
//             <h3 style={{ color: '#886128', textAlign: 'center', marginBottom: '25px' }}>
//               📋 Итог заказа
//             </h3>
            
//             <div className="d-flex justify-content-between align-items-center mb-4">
//               <h4 style={{ color: '#886128' }}>Итого к оплате:</h4>
//               <h2 style={{ color: '#FFA000', fontWeight: 'bold' }}>
//                 {totalAmount.toLocaleString('ru-RU', { minimumFractionDigits: 2 })} ₽
//               </h2>
//             </div>
            
//             <div className="row mb-4">
//               <div className="col-md-6">
//                 <div style={{
//                   backgroundColor: '#FFF8E1',
//                   borderRadius: '10px',
//                   padding: '15px',
//                   marginBottom: '15px'
//                 }}>
//                   <div style={{ color: '#886128', fontWeight: 'bold', marginBottom: '5px' }}>
//                     📦 Количество товаров:
//                   </div>
//                   <div style={{ color: '#886128', fontSize: '18px' }}>
//                     {cartItems.reduce((sum, item) => sum + item.quantity, 0)} шт.
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-6">
//                 <div style={{
//                   backgroundColor: '#FFF8E1',
//                   borderRadius: '10px',
//                   padding: '15px',
//                   marginBottom: '15px'
//                 }}>
//                   <div style={{ color: '#886128', fontWeight: 'bold', marginBottom: '5px' }}>
//                     🏷️ Количество позиций:
//                   </div>
//                   <div style={{ color: '#886128', fontSize: '18px' }}>
//                     {cartItems.length} шт.
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Источники товаров */}
//             <div className="mb-4">
//               <div style={{ color: '#886128', marginBottom: '10px' }}>
//                 <strong>Источники товаров:</strong>
//               </div>
//               <div className="d-flex gap-3">
//                 {cartItems.some(item => item.source === 'api') && (
//                   <span style={{
//                     backgroundColor: '#886128',
//                     color: 'white',
//                     padding: '5px 15px',
//                     borderRadius: '20px',
//                     fontSize: '14px'
//                   }}>
//                     🏪 Товары из магазинов
//                   </span>
//                 )}
//                 {cartItems.some(item => item.source === 'preview') && (
//                   <span style={{
//                     backgroundColor: '#FFA000',
//                     color: 'white',
//                     padding: '5px 15px',
//                     borderRadius: '20px',
//                     fontSize: '14px'
//                   }}>
//                     📱 Товары из превью
//                   </span>
//                 )}
//               </div>
//             </div>
            
//             <div className="d-flex justify-content-center mt-5">
//               <button
//                 onClick={handleCheckout}
//                 style={{
//                   backgroundColor: '#FFA000',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '25px',
//                   padding: '15px 40px',
//                   fontSize: '18px',
//                   fontWeight: 'bold',
//                   cursor: 'pointer',
//                   boxShadow: '0 4px 15px rgba(255, 160, 0, 0.3)',
//                   transition: 'all 0.3s ease'
//                 }}
//                 onMouseEnter={(e) => {
//                   e.target.style.backgroundColor = '#FF8C00';
//                   e.target.style.transform = 'translateY(-2px)';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.backgroundColor = '#FFA000';
//                   e.target.style.transform = 'translateY(0)';
//                 }}
//               >
//                 💳 Перейти к оплате
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Информация о магазинах */}
//         <div className="mt-5 mb-5">
//           <h3 style={{ color: '#886128', marginBottom: '20px', textAlign: 'center' }}>
//             🏪 Магазины на сайте
//           </h3>
//           <div className="row g-4">
//             {brands.length === 0 ? (
//               <div className="col-12 text-center">
//                 <div style={{
//                   backgroundColor: '#FFF',
//                   borderRadius: '12px',
//                   padding: '30px',
//                   boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//                 }}>
//                   <p style={{ color: '#886128', fontSize: '1.1rem' }}>Магазины не найдены</p>
//                 </div>
//               </div>
//             ) : (
//               brands.map(brand => (
//                 <div key={brand.id} className="col-md-4 col-lg-3">
//                   <div className="card h-100" style={{ 
//                     borderColor: '#EED1A6',
//                     borderRadius: '12px',
//                     boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//                     transition: 'transform 0.3s ease'
//                   }}
//                   onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
//                   onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//                   >
//                     <div className="card-body text-center d-flex flex-column">
//                       <h5 style={{ color: '#886128' }}>🏪 {brand.name}</h5>
//                       <p style={{ color: '#886128', fontSize: '0.9rem' }}>
//                         👤 Создатель: {brand.created_by || 'Неизвестно'}
//                       </p>
//                       <p style={{ color: '#886128', fontSize: '0.9rem' }}>
//                         📦 Товаров: {brand.products_count || 0}
//                       </p>
//                       <div className="mt-auto">
//                         <button
//                           onClick={() => {
//                             setShowAllProducts(true);
//                             setSelectedBrand(brand.id.toString());
//                           }}
//                           className="btn btn-sm w-100"
//                           style={{
//                             backgroundColor: '#FFA000',
//                             color: 'white',
//                             border: 'none',
//                             borderRadius: '20px',
//                             padding: '8px',
//                             cursor: 'pointer',
//                             fontWeight: 'bold'
//                           }}
//                         >
//                           🛍️ Посмотреть товары
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
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

  // Загрузка корзины при монтировании
  useEffect(() => {
    fetchCart();
  }, []);

  // Загрузка всех товаров и магазинов при показе раздела
  useEffect(() => {
    if (showAllProducts) {
      fetchAllProducts();
      fetchBrands();
    }
  }, [showAllProducts]);

  // Загрузка всех товаров - ИСПРАВЛЕННЫЙ ЗАПРОС
  const fetchAllProducts = async () => {
    try {
      console.log('🔄 Загружаем все товары...');
      
      // Пробуем разные эндпоинты для товаров
      const endpoints = [
        '/constructor/api/sello/all-products/',
        '/api/products/',
        '/sello/api/products/',
        '/api/tovar/all/'
      ];
      
      let productsData = [];
      
      for (const endpoint of endpoints) {
        try {
          const response = await api.get(endpoint);
          console.log(`Пробуем эндпоинт товаров ${endpoint}:`, response.data);
          
          if (response.data && (response.data.products || response.data.results || Array.isArray(response.data))) {
            productsData = response.data.products || response.data.results || response.data;
            console.log(`✅ Нашли товары через ${endpoint}:`, productsData.length);
            break;
          }
        } catch (err) {
          console.log(`❌ Эндпоинт товаров ${endpoint} не доступен:`, err.message);
          continue;
        }
      }
      
      if (productsData.length > 0) {
        // Форматируем товары согласно структуре таблицы sello_tovar_product
        const formattedProducts = productsData.map(product => ({
          id: product.id,
          name: product.name || 'Без названия',
          price: product.price || '0',
          brand: product.brand || { 
            id: product.brand_id || 0,
            name: product.brand_name || 'Неизвестный магазин' 
          },
          image: product.image || `https://via.placeholder.com/200x150?text=${(product.name || 'Товар').substring(0, 10)}`,
          description: product.description || '',
          category: product.category || product.main_category || '',
          stock: product.quantity || product.stock || 0,
          color: product.color || '',
          created_by: product.created_by || null
        }));
        
        setAllProducts(formattedProducts);
        console.log(`✅ Загружено ${formattedProducts.length} товаров`);
      } else {
        console.warn('Не удалось загрузить товары, используем моковые данные');
        setAllProducts(getMockProducts());
      }
    } catch (err) {
      console.error('Ошибка при загрузке всех товаров:', err);
      setAllProducts(getMockProducts());
    }
  };

  // Загрузка всех магазинов - ИСПРАВЛЕННЫЙ ЗАПРОС
  const fetchBrands = async () => {
    try {
      console.log('🔄 Загружаем магазины...');
      
      // Пробуем разные эндпоинты для магазинов
      const endpoints = [
        '/constructor/api/sello/brands/',
        '/api/brands/',
        '/sello/api/brands/',
        '/sello/api/shops/',
        '/api/shops/'
      ];
      
      let brandsData = [];
      
      for (const endpoint of endpoints) {
        try {
          const response = await api.get(endpoint);
          console.log(`Пробуем эндпоинт магазинов ${endpoint}:`, response.data);
          
          if (response.data && (response.data.brands || response.data.results || Array.isArray(response.data))) {
            brandsData = response.data.brands || response.data.results || response.data;
            console.log(`✅ Нашли магазины через ${endpoint}:`, brandsData.length);
            break;
          }
        } catch (err) {
          console.log(`❌ Эндпоинт магазинов ${endpoint} не доступен:`, err.message);
          continue;
        }
      }
      
      if (brandsData.length > 0) {
        // Форматируем магазины согласно структуре таблицы sello_brand
        const formattedBrands = brandsData.map(brand => ({
          id: brand.id,
          name: brand.name || 'Неизвестный магазин',
          created_by: brand.created_by || brand.created_by_id || brand.creator || 'Неизвестно',
          products_count: brand.products_count || 0,
          category: brand.category || '',
          country: brand.country || '',
          description: brand.description || '',
          logo: brand.logo || ''
        }));
        
        setBrands(formattedBrands);
        console.log(`✅ Загружено ${formattedBrands.length} магазинов`);
      } else {
        console.warn('Не удалось загрузить магазины, используем моковые данные');
        setBrands(getMockBrands());
      }
    } catch (err) {
      console.error('Ошибка при загрузке магазинов:', err);
      setBrands(getMockBrands());
    }
  };

  // Загрузка корзины пользователя
  const fetchCart = async () => {
    try {
      setLoading(true);
      
      // 1. Загружаем товары из превью (из localStorage)
      let previewCartItems = [];
      try {
        const previewCartStr = localStorage.getItem('preview_cart');
        console.log('📦 Загружаем корзину из превью:', previewCartStr);
        if (previewCartStr) {
          const parsedItems = JSON.parse(previewCartStr);
          previewCartItems = parsedItems.map(item => ({
            id: `preview-${item.id || Date.now()}`,
            product: {
              id: item.id || `preview-${Date.now()}`,
              name: item.name || item.title || 'Товар из превью',
              price: item.price?.toString() || '0',
              brand: { 
                id: 'preview-shop',
                name: item.brand || 'Магазин из превью'
              },
              image: item.image || 'https://via.placeholder.com/80?text=Превью',
              description: item.description || 'Товар добавлен из предпросмотра страницы'
            },
            quantity: item.quantity || 1,
            total_price: ((parseFloat(item.price) || 0) * (item.quantity || 1)).toFixed(2),
            source: 'preview',
            previewData: item
          }));
        }
      } catch (e) {
        console.error('Ошибка загрузки корзины из превью:', e);
      }

      console.log('🛒 Товары из превью:', previewCartItems.length);

      // 2. Пробуем загрузить корзину из API
      let apiCartItems = [];
      try {
        const endpoints = [
          '/api/cart/',
          '/sello/api/cart/',
          '/cart/'
        ];
        
        for (const endpoint of endpoints) {
          try {
            const response = await api.get(endpoint);
            if (response.data && response.data.items) {
              apiCartItems = response.data.items.map(item => ({
                ...item,
                source: 'api'
              }));
              console.log(`✅ Корзина загружена из ${endpoint}`);
              break;
            }
          } catch (apiError) {
            console.log(`❌ Корзина API ${endpoint} не доступна:`, apiError.message);
            continue;
          }
        }
      } catch (cartError) {
        console.warn('Все API корзины не доступны:', cartError);
      }

      console.log('🛒 Товары из API:', apiCartItems.length);

      // 3. Объединяем товары из обоих источников
      const allCartItems = [...apiCartItems, ...previewCartItems];
      
      // 4. Объединяем дубликаты
      const mergedItems = mergeCartItems(allCartItems);
      
      setCartItems(mergedItems);
      setError(null);
      
      console.log('🛒 Итоговая корзина:', mergedItems.length, 'позиций');
    } catch (err) {
      console.error('Общая ошибка при загрузке корзины:', err);
      setError('Не удалось загрузить корзину');
      // Пробуем загрузить только из превью при ошибке
      loadPreviewCartOnly();
    } finally {
      setLoading(false);
    }
  };

  // Функция для объединения товаров из разных источников
  const mergeCartItems = (items) => {
    const merged = {};
    
    items.forEach(item => {
      const itemId = item.product?.id || item.id;
      
      if (merged[itemId]) {
        merged[itemId].quantity += item.quantity || 1;
        merged[itemId].total_price = (
          parseFloat(merged[itemId].total_price) + 
          ((parseFloat(item.product?.price) || 0) * (item.quantity || 1))
        ).toFixed(2);
        
        if (item.source && !merged[itemId].sources?.includes(item.source)) {
          merged[itemId].sources = [...(merged[itemId].sources || []), item.source];
        }
      } else {
        merged[itemId] = {
          id: item.id,
          product: item.product || {
            id: itemId,
            name: item.name || 'Неизвестный товар',
            price: (item.price || 0).toString(),
            brand: item.brand || { id: 'unknown', name: 'Неизвестный магазин' },
            image: item.image || 'https://via.placeholder.com/80?text=Товар',
            description: item.description || ''
          },
          quantity: item.quantity || 1,
          total_price: ((parseFloat(item.product?.price) || parseFloat(item.price) || 0) * (item.quantity || 1)).toFixed(2),
          source: item.source || 'unknown',
          sources: item.source ? [item.source] : ['unknown'],
          previewData: item.previewData
        };
      }
    });
    
    return Object.values(merged);
  };

  // Загрузка только корзины из превью
  const loadPreviewCartOnly = () => {
    try {
      const previewCartStr = localStorage.getItem('preview_cart');
      if (previewCartStr) {
        const previewItems = JSON.parse(previewCartStr);
        const formattedItems = previewItems.map(item => ({
          id: `preview-${item.id || Date.now()}`,
          product: {
            id: item.id || `preview-${Date.now()}`,
            name: item.name || item.title || 'Товар из превью',
            price: item.price?.toString() || '0',
            brand: { 
              id: 'preview-shop',
              name: item.brand || 'Магазин из превью'
            },
            image: item.image || 'https://via.placeholder.com/80?text=Превью',
            description: item.description || 'Товар добавлен из предпросмотра страницы'
          },
          quantity: item.quantity || 1,
          total_price: ((parseFloat(item.price) || 0) * (item.quantity || 1)).toFixed(2),
          source: 'preview',
          previewData: item
        }));
        setCartItems(formattedItems);
      }
    } catch (e) {
      console.error('Ошибка загрузки корзины из превью:', e);
    }
  };

  // Моковые данные для магазинов
  const getMockBrands = () => {
    return [
      {
        id: 1,
        name: 'СуперМагазин',
        created_by: 'admin',
        products_count: 15,
        category: 'Электроника',
        description: 'Лучшие гаджеты по низким ценам'
      },
      {
        id: 2,
        name: 'Селло',
        created_by: 'seller1',
        products_count: 8,
        category: 'Одежда и обувь',
        description: 'Модная одежда и обувь'
      },
      {
        id: 3,
        name: 'Книжный мир',
        created_by: 'booklover',
        products_count: 25,
        category: 'Книги',
        description: 'Книги для всех возрастов'
      }
    ];
  };

  // Моковые данные для товаров
  const getMockProducts = () => {
    return [
      {
        id: 1,
        name: 'Смартфон X100',
        price: '29999.00',
        brand: { id: 1, name: 'СуперМагазин' },
        image: 'https://via.placeholder.com/200x150?text=Смартфон',
        description: 'Современный смартфон с отличной камерой',
        stock: 10,
        category: 'Электроника'
      },
      {
        id: 2,
        name: 'Кроссовки ProRun',
        price: '8999.00',
        brand: { id: 2, name: 'Селло' },
        image: 'https://via.placeholder.com/200x150?text=Кроссовки',
        description: 'Удобные кроссовки для бега',
        stock: 25,
        category: 'Обувь'
      },
      {
        id: 3,
        name: 'Книга "React для начинающих"',
        price: '1500.00',
        brand: { id: 3, name: 'Книжный мир' },
        image: 'https://via.placeholder.com/200x150?text=Книга',
        description: 'Практическое руководство по React',
        stock: 50,
        category: 'Книги'
      },
      {
        id: 4,
        name: 'Ноутбук UltraBook',
        price: '54999.00',
        brand: { id: 1, name: 'СуперМагазин' },
        image: 'https://via.placeholder.com/200x150?text=Ноутбук',
        description: 'Мощный ноутбук для работы и игр',
        stock: 5,
        category: 'Электроника'
      },
      {
        id: 5,
        name: 'Джинсы Classic',
        price: '3999.00',
        brand: { id: 2, name: 'Селло' },
        image: 'https://via.placeholder.com/200x150?text=Джинсы',
        description: 'Классические джинсы',
        stock: 30,
        category: 'Одежда'
      }
    ];
  };

  // Обновление количества товара
  const updateQuantity = async (itemId, productId, change) => {
    try {
      const item = cartItems.find(item => item.id === itemId);
      const newQuantity = item.quantity + change;
      
      if (newQuantity <= 0) {
        await removeItemFromCart(itemId, productId);
      } else {
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
        
        if (item.source === 'api') {
          try {
            await api.put('/api/cart/update_item/', {
              product_id: productId,
              quantity: newQuantity
            });
          } catch (apiError) {
            console.warn('Не удалось обновить корзину на сервере:', apiError);
          }
        }
      }
    } catch (err) {
      console.error('Ошибка при обновлении количества:', err);
      alert('Не удалось обновить количество');
    }
  };

  // Удаление товара из корзины
  const removeItemFromCart = async (itemId, productId) => {
    try {
      const itemToRemove = cartItems.find(item => item.id === itemId);
      const updatedCartItems = cartItems.filter(item => item.id !== itemId);
      setCartItems(updatedCartItems);
      saveCartToLocalStorage(updatedCartItems);
      
      if (itemToRemove && itemToRemove.source === 'api') {
        try {
          await api.delete(`/api/cart/remove_item/?product_id=${productId}`);
        } catch (apiError) {
          console.warn('Не удалось удалить товар на сервере:', apiError);
        }
      }
    } catch (err) {
      console.error('Ошибка при удалении товара:', err);
      alert('Не удалось удалить товар');
    }
  };

  const removeItem = removeItemFromCart;

  // Сохранение корзины в localStorage
  const saveCartToLocalStorage = (items) => {
    try {
      const previewItems = items.filter(item => item.source === 'preview');
      const simplifiedItems = previewItems.map(item => ({
        id: item.previewData?.id || item.product.id.replace('preview-', ''),
        name: item.product.name,
        price: parseFloat(item.product.price),
        quantity: item.quantity,
        image: item.product.image,
        brand: item.product.brand.name,
        description: item.product.description
      }));
      
      if (simplifiedItems.length > 0) {
        localStorage.setItem('preview_cart', JSON.stringify(simplifiedItems));
      }
    } catch (e) {
      console.error('Ошибка сохранения корзины в localStorage:', e);
    }
  };

  // Оформление заказа
  const handleCheckout = async () => {
    try {
      if (cartItems.length === 0) {
        alert('Корзина пуста!');
        return;
      }
      
      const apiItems = cartItems.filter(item => item.source === 'api');
      const previewItems = cartItems.filter(item => item.source === 'preview');
      
      if (apiItems.length > 0) {
        try {
          const response = await api.post('/api/cart/checkout/');
          console.log('✅ Заказ API оформлен:', response.data);
        } catch (apiError) {
          console.warn('API оформления заказа не доступен:', apiError);
        }
      }
      
      if (previewItems.length > 0) {
        const previewOrder = {
          id: Date.now(),
          items: previewItems,
          total_amount: previewItems.reduce((sum, item) => sum + parseFloat(item.total_price), 0),
          created_at: new Date().toISOString(),
          status: 'pending',
          source: 'preview'
        };
        
        const orders = JSON.parse(localStorage.getItem('user_orders') || '[]');
        orders.push(previewOrder);
        localStorage.setItem('user_orders', JSON.stringify(orders));
        localStorage.removeItem('preview_cart');
      }
      
      setCartItems([]);
      
      alert('✅ Заказ успешно оформлен! Спасибо за покупку!\n\nТовары из превью сохранены в истории заказов.');
    } catch (err) {
      console.error('Ошибка при оформлении заказа:', err);
      alert('❌ Не удалось оформить заказ. Попробуйте еще раз.');
    }
  };

  // Добавление товара в корзину
  const addToCart = (product) => {
    const existingItem = cartItems.find(item => 
      item.product.id === product.id || 
      (item.source === 'preview' && item.product.id === `preview-${product.id}`)
    );
    
    if (existingItem) {
      updateQuantity(existingItem.id, existingItem.product.id, 1);
    } else {
      const isFromStore = product.id && !product.id.toString().includes('preview');
      const source = isFromStore ? 'api' : 'preview';
      
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
        total_price: parseFloat(product.price || 0).toFixed(2),
        source: source
      };
      
      const updatedCartItems = [...cartItems, newItem];
      setCartItems(updatedCartItems);
      saveCartToLocalStorage(updatedCartItems);
      
      if (isFromStore) {
        try {
          api.post('/api/cart/add_item/', {
            product_id: product.id,
            quantity: 1
          }).catch(e => console.warn('Не удалось добавить товар на сервер:', e));
        } catch (e) {
          console.warn('Ошибка при добавлении товара на сервер:', e);
        }
      }
    }
    
    alert(`✅ Товар "${product.name}" добавлен в корзину!`);
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
        (product.brand && product.brand.name.toLowerCase().includes(query)) ||
        (product.category && product.category.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  };

  const filteredProducts = showAllProducts ? filterProducts() : [];

  // Общая сумма корзины
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
      <div style={{ paddingTop: '70px' }}></div>

      <div className="container mt-4">
        <h1 className="text-center mb-5" style={{ color: '#886128', fontWeight: 'bold' }}>
          🛒 Корзина товаров
        </h1>

        {error && (
          <div className="alert alert-warning text-center" role="alert">
            {error}
          </div>
        )}

        {/* Информация о корзине */}
        <div className="mb-4 text-center">
          <div style={{
            backgroundColor: '#FFF',
            borderRadius: '12px',
            padding: '15px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            maxWidth: '600px',
            margin: '0 auto 20px'
          }}>
            <h4 style={{ color: '#886128', marginBottom: '15px' }}>Итоги корзины</h4>
            <div className="row">
              <div className="col-6">
                <div style={{ color: '#886128' }}>Товаров:</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#FFA000' }}>
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </div>
              </div>
              <div className="col-6">
                <div style={{ color: '#886128' }}>Сумма:</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#FFA000' }}>
                  {totalAmount.toLocaleString('ru-RU', { minimumFractionDigits: 2 })} ₽
                </div>
              </div>
            </div>
          </div>
        </div>

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
            {showAllProducts ? 'Скрыть все товары' : '🛍️ Показать все товары из магазинов'}
          </button>
        </div>

        {/* Список всех товаров из магазинов */}
        {showAllProducts && (
          <div className="mb-5">
            <h3 style={{ color: '#886128', marginBottom: '20px', textAlign: 'center' }}>
              🛍️ Все товары из магазинов
            </h3>
            
            {/* Фильтры */}
            <div className="row mb-4 g-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="🔍 Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    borderColor: '#EED1A6',
                    color: '#886128',
                    borderRadius: '20px',
                    padding: '10px 15px'
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
                    color: '#886128',
                    borderRadius: '20px',
                    padding: '10px 15px'
                  }}
                >
                  <option value="all">🏪 Все магазины</option>
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
                  <p style={{ color: '#886128', fontSize: '1.1rem' }}>Товары не найдены</p>
                  {searchQuery && (
                    <button 
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedBrand('all');
                      }}
                      style={{ 
                        marginTop: '10px',
                        borderRadius: '20px',
                        borderColor: '#EED1A6',
                        color: '#886128'
                      }}
                    >
                      Сбросить фильтры
                    </button>
                  )}
                </div>
              ) : (
                filteredProducts.map(product => (
                  <div key={product.id} className="col-md-4 col-lg-3">
                    <div className="card h-100" style={{ 
                      borderColor: '#EED1A6',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}>
                      <img 
                        src={product.image || `https://via.placeholder.com/200x150?text=${(product.name || 'Товар').substring(0, 10)}`}
                        className="card-img-top"
                        alt={product.name}
                        style={{ 
                          height: '150px', 
                          objectFit: 'cover',
                          borderBottom: '1px solid #EED1A6'
                        }}
                      />
                      <div className="card-body d-flex flex-column">
                        <h6 className="card-title" style={{ color: '#886128' }}>{product.name}</h6>
                        <p className="card-text small" style={{ color: '#886128' }}>
                          🏪 {product.brand?.name || 'Неизвестно'}
                        </p>
                        <p className="card-text" style={{ color: '#886128', fontWeight: 'bold' }}>
                          {parseFloat(product.price).toLocaleString('ru-RU')} ₽
                        </p>
                        <p className="card-text small" style={{ color: '#886128' }}>
                          📦 В наличии: {product.stock || 0} шт.
                        </p>
                        {product.category && (
                          <p className="card-text small" style={{ color: '#886128' }}>
                            📁 Категория: {product.category}
                          </p>
                        )}
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
                              padding: '8px',
                              cursor: product.stock > 0 ? 'pointer' : 'not-allowed',
                              fontWeight: 'bold'
                            }}
                          >
                            {product.stock > 0 ? '🛒 В корзину' : '❌ Нет в наличии'}
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
        <div className="row g-4 mb-5">
          {cartItems.length === 0 ? (
            <div className="col-12 text-center">
              <div style={{
                backgroundColor: '#FFF',
                borderRadius: '12px',
                padding: '40px 20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                <div style={{ fontSize: '60px', color: '#EED1A6', marginBottom: '20px' }}>
                  🛒
                </div>
                <p style={{ color: '#886128', fontSize: '1.3rem', marginBottom: '10px' }}>
                  Корзина пуста
                </p>
                <p style={{ color: '#886128', marginBottom: '25px' }}>
                  Добавьте товары из магазинов выше или перейдите в раздел покупок.
                </p>
                {!showAllProducts && (
                  <button
                    onClick={() => setShowAllProducts(true)}
                    className="btn"
                    style={{
                      backgroundColor: '#FFA000',
                      color: 'white',
                      border: 'none',
                      borderRadius: '20px',
                      padding: '12px 24px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    🛍️ Посмотреть товары
                  </button>
                )}
              </div>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="col-12" style={{
                backgroundColor: '#FFF',
                borderRadius: '12px',
                padding: '15px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                maxWidth: '1000px',
                margin: '0 auto',
                borderLeft: item.source === 'preview' ? '5px solid #FFA000' : '5px solid #886128',
                position: 'relative'
              }}>
                {item.source === 'preview' && (
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: '#FFA000',
                    color: 'white',
                    fontSize: '10px',
                    padding: '3px 8px',
                    borderRadius: '12px',
                    fontWeight: 'bold'
                  }}>
                    📱 Из превью
                  </div>
                )}
                
                <div className="d-flex align-items-center">
                  <img 
                    src={item.product.image || `https://via.placeholder.com/80?text=${(item.product.name || 'Товар').substring(0, 5)}`} 
                    alt={item.product.name} 
                    style={{
                      width: '90px',
                      height: '90px',
                      objectFit: 'cover',
                      marginRight: '20px',
                      borderRadius: '8px',
                      border: '1px solid #EED1A6'
                    }} 
                  />
                  <div style={{ flex: 1 }}>
                    <h5 style={{ color: '#886128', margin: '0' }}>{item.product.name}</h5>
                    <p style={{ color: '#886128', margin: '5px 0', fontSize: '0.9rem' }}>
                      🏪 Магазин: {item.product.brand?.name || 'Неизвестно'}
                    </p>
                    <p style={{ color: '#886128', margin: '5px 0', fontSize: '0.9rem' }}>
                      💰 Цена за шт: {parseFloat(item.product.price).toLocaleString('ru-RU')} ₽
                    </p>
                    {item.product.stock > 0 && item.source === 'api' && (
                      <p style={{ color: '#886128', margin: '5px 0', fontSize: '0.85rem' }}>
                        📦 В наличии: {item.product.stock} шт.
                      </p>
                    )}
                    {item.source === 'preview' && (
                      <p style={{ color: '#FFA000', margin: '5px 0', fontSize: '0.85rem' }}>
                        📱 Товар добавлен из предпросмотра страницы
                      </p>
                    )}
                  </div>
                  <div className="d-flex align-items-center" style={{ gap: '10px' }}>
                    <div className="d-flex align-items-center" style={{
                      backgroundColor: '#FFF8E1',
                      borderRadius: '25px',
                      padding: '5px',
                      border: '1px solid #EED1A6'
                    }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.product.id, -1)}
                        disabled={item.quantity <= 1}
                        style={{
                          background: item.quantity <= 1 ? '#f5f5f5' : 'none',
                          border: 'none',
                          color: item.quantity <= 1 ? '#cccccc' : '#886128',
                          borderRadius: '50%',
                          width: '30px',
                          height: '30px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer',
                          fontWeight: 'bold',
                          fontSize: '18px'
                        }}
                      >
                        -
                      </button>
                      <span style={{ 
                        color: '#886128', 
                        fontWeight: 'bold', 
                        minWidth: '30px', 
                        textAlign: 'center',
                        fontSize: '16px'
                      }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.product.id, 1)}
                        disabled={item.product.stock !== undefined && item.quantity >= item.product.stock}
                        style={{
                          background: (item.product.stock !== undefined && item.quantity >= item.product.stock) ? '#f5f5f5' : 'none',
                          border: 'none',
                          color: (item.product.stock !== undefined && item.quantity >= item.product.stock) ? '#cccccc' : '#886128',
                          borderRadius: '50%',
                          width: '30px',
                          height: '30px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          cursor: (item.product.stock !== undefined && item.quantity >= item.product.stock) ? 'not-allowed' : 'pointer',
                          fontWeight: 'bold',
                          fontSize: '18px'
                        }}
                      >
                        +
                      </button>
                    </div>
                    
                    <div style={{ 
                      minWidth: '100px',
                      textAlign: 'right'
                    }}>
                      <div style={{ color: '#886128', fontSize: '14px' }}>Сумма:</div>
                      <div style={{ color: '#886128', fontWeight: 'bold', fontSize: '16px' }}>
                        {parseFloat(item.total_price).toLocaleString('ru-RU')} ₽
                      </div>
                    </div>
                    
                    <button
                      onClick={() => removeItem(item.id, item.product.id)}
                      style={{
                        background: 'none',
                        border: '1px solid #FF6F00',
                        color: '#FF6F00',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
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
            borderRadius: '12px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
            maxWidth: '1000px',
            margin: '0 auto 40px'
          }}>
            <h3 style={{ color: '#886128', textAlign: 'center', marginBottom: '25px' }}>
              📋 Итог заказа
            </h3>
            
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 style={{ color: '#886128' }}>Итого к оплате:</h4>
              <h2 style={{ color: '#FFA000', fontWeight: 'bold' }}>
                {totalAmount.toLocaleString('ru-RU', { minimumFractionDigits: 2 })} ₽
              </h2>
            </div>
            
            <div className="row mb-4">
              <div className="col-md-6">
                <div style={{
                  backgroundColor: '#FFF8E1',
                  borderRadius: '10px',
                  padding: '15px',
                  marginBottom: '15px'
                }}>
                  <div style={{ color: '#886128', fontWeight: 'bold', marginBottom: '5px' }}>
                    📦 Количество товаров:
                  </div>
                  <div style={{ color: '#886128', fontSize: '18px' }}>
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)} шт.
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div style={{
                  backgroundColor: '#FFF8E1',
                  borderRadius: '10px',
                  padding: '15px',
                  marginBottom: '15px'
                }}>
                  <div style={{ color: '#886128', fontWeight: 'bold', marginBottom: '5px' }}>
                    🏷️ Количество позиций:
                  </div>
                  <div style={{ color: '#886128', fontSize: '18px' }}>
                    {cartItems.length} шт.
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <div style={{ color: '#886128', marginBottom: '10px' }}>
                <strong>Источники товаров:</strong>
              </div>
              <div className="d-flex gap-3">
                {cartItems.some(item => item.source === 'api') && (
                  <span style={{
                    backgroundColor: '#886128',
                    color: 'white',
                    padding: '5px 15px',
                    borderRadius: '20px',
                    fontSize: '14px'
                  }}>
                    🏪 Товары из магазинов
                  </span>
                )}
                {cartItems.some(item => item.source === 'preview') && (
                  <span style={{
                    backgroundColor: '#FFA000',
                    color: 'white',
                    padding: '5px 15px',
                    borderRadius: '20px',
                    fontSize: '14px'
                  }}>
                    📱 Товары из превью
                  </span>
                )}
              </div>
            </div>
            
            <div className="d-flex justify-content-center mt-5">
              <button
                onClick={handleCheckout}
                style={{
                  backgroundColor: '#FFA000',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  padding: '15px 40px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(255, 160, 0, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#FF8C00';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#FFA000';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                💳 Перейти к оплате
              </button>
            </div>
          </div>
        )}

        {/* Информация о магазинах */}
        <div className="mt-5 mb-5">
          <h3 style={{ color: '#886128', marginBottom: '20px', textAlign: 'center' }}>
            🏪 Магазины на сайте
          </h3>
          <div className="row g-4">
            {brands.length === 0 ? (
              <div className="col-12 text-center">
                <div style={{
                  backgroundColor: '#FFF',
                  borderRadius: '12px',
                  padding: '30px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                  <p style={{ color: '#886128', fontSize: '1.1rem' }}>Магазины не найдены</p>
                </div>
              </div>
            ) : (
              brands.map(brand => (
                <div key={brand.id} className="col-md-4 col-lg-3">
                  <div className="card h-100" style={{ 
                    borderColor: '#EED1A6',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <div className="card-body text-center d-flex flex-column">
                      <h5 style={{ color: '#886128' }}>🏪 {brand.name}</h5>
                      <p style={{ color: '#886128', fontSize: '0.9rem' }}>
                        👤 Создатель: {brand.created_by || 'Неизвестно'}
                      </p>
                      {brand.category && (
                        <p style={{ color: '#886128', fontSize: '0.9rem' }}>
                          📁 Категория: {brand.category}
                        </p>
                      )}
                      <p style={{ color: '#886128', fontSize: '0.9rem' }}>
                        📦 Товаров: {brand.products_count || 0}
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
                            padding: '8px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                          }}
                        >
                          🛍️ Посмотреть товары
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