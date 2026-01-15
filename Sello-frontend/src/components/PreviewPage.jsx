// // src/components/PreviewPage.jsx
// import React from "react";
// import { useLocation } from "react-router-dom";

// import BlockFourImages from "./blocks/BlockFourImages";
// import BlockSingleImageLeft from "./blocks/BlockSingleImageLeft";
// import BlockImageRightText from "./blocks/BlockImageRightText";
// import BlockTwoImages from "./blocks/BlockTwoImages";
// import BlockThreeImages from "./blocks/BlockThreeImages";
// import BlockBigLeftTwoSmall from "./blocks/BlockBigLeftTwoSmall";

// const PreviewPage = () => {
//   const location = useLocation();
//   const { blocks, textColor, bgColor } = location.state || {};

//   if (!blocks) {
//     return (
//       <div style={{ padding: "20px", textAlign: "center" }}>
//         Нет данных для предпросмотра
//       </div>
//     );
//   }

//   // Вспомогательная функция для стилей текста
//   const getTextStyle = (block) => {
//     let fontWeight = "normal";
//     let fontStyle = "normal";
//     if (block.fontStyle === "bold") fontWeight = "bold";
//     else if (block.fontStyle === "italic") fontStyle = "italic";
//     else if (block.fontStyle === "bold-italic") {
//       fontWeight = "bold";
//       fontStyle = "italic";
//     }

//     let fontSize = "16px";
//     if (block.fontSize === "small") fontSize = "14px";
//     else if (block.fontSize === "large") fontSize = "24px";

//     return {
//       color: textColor,
//       textAlign: block.alignment || "left",
//       fontSize,
//       fontWeight,
//       fontStyle,
//       fontFamily: block.fontFamily || "Arial",
//       margin: "16px 0",
//     };
//   };

//   return (
//     <div
//       style={{
//         backgroundColor: bgColor,
//         padding: "20px",
//         fontFamily: "Arial, sans-serif",
//       }}
//     >
//       <div style={{ maxWidth: "800px", margin: "0 auto" }}>
//         {blocks.map((block) => {
//           if (block.type === "heading") {
//             return (
//               <h2 key={block.id} style={getTextStyle(block)}>
//                 {block.content}
//               </h2>
//             );
//           }

//           if (block.type === "textBlock") {
//             return (
//               <p key={block.id} style={getTextStyle(block)}>
//                 {block.content}
//               </p>
//             );
//           }

//           if (block.type === "fourImages") {
//             return (
//               <div key={block.id} style={{ marginBottom: "32px" }}>
//                 <BlockFourImages
//                   block={block}
//                   textColor={textColor}
//                   bgColor={bgColor}
//                   onAddToCart={(item) => {
//                     // В предпросмотре — тоже работает
//                     alert(`Товар "${item.title}" добавлен в корзину!`);
//                   }}
//                 />
//               </div>
//             );
//           }

//           if (block.type === "button") {
//             return (
//               <div
//                 key={block.id}
//                 style={{ textAlign: "center", margin: "16px 0" }}
//               >
//                 <button
//                   style={{
//                     padding: "8px 16px",
//                     backgroundColor: "#886128",
//                     color: "white",
//                     border: "none",
//                     borderRadius: "4px",
//                     fontFamily: block.fontFamily || "Arial",
//                   }}
//                 >
//                   {block.content}
//                 </button>
//               </div>
//             );
//           }

//           // Графические блоки
//           let BlockComponent;
//           switch (block.type) {
//             case "fourImages":
//               BlockComponent = BlockFourImages;
//               break;
//             case "singleImageLeft":
//               BlockComponent = BlockSingleImageLeft;
//               break;
//             case "imageRightText":
//               BlockComponent = BlockImageRightText;
//               break;
//             case "twoImages":
//               BlockComponent = BlockTwoImages;
//               break;
//             case "threeImages":
//               BlockComponent = BlockThreeImages;
//               break;
//             case "bigLeftTwoSmall":
//               BlockComponent = BlockBigLeftTwoSmall;
//               break;
//             default:
//               return null;
//           }

//           return (
//             <div key={block.id} style={{ marginBottom: "32px" }}>
//               <BlockComponent
//                 block={block}
//                 textColor={textColor}
//                 bgColor={bgColor}
//               />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default PreviewPage;










// src/components/PreviewPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import BlockFourImages from "./blocks/BlockFourImages";
import BlockSingleImageLeft from "./blocks/BlockSingleImageLeft";
import BlockImageRightText from "./blocks/BlockImageRightText";
import BlockTwoImages from "./blocks/BlockTwoImages";
import BlockThreeImages from "./blocks/BlockThreeImages";
import BlockBigLeftTwoSmall from "./blocks/BlockBigLeftTwoSmall";

const PreviewPage = () => {
  const location = useLocation();
  const { blocks, textColor, bgColor } = location.state || {};

  // Локальное состояние для корзины
  const [cartItems, setCartItems] = useState([]);

  // Загружаем корзину из localStorage при монтировании
  useEffect(() => {
    const savedCart = localStorage.getItem('preview_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Ошибка загрузки корзины:', e);
      }
    }
  }, []);

  // Сохраняем корзину в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('preview_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  if (!blocks) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        Нет данных для предпросмотра
      </div>
    );
  }

  // Функция добавления товара в корзину
  const addToCart = (item) => {
    // Проверяем, есть ли уже такой товар в корзине
    const existingItemIndex = cartItems.findIndex(
      cartItem => cartItem.id === item.id
    );

    if (existingItemIndex >= 0) {
      // Увеличиваем количество существующего товара
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
      alert(`Количество товара "${item.title}" увеличено!`);
    } else {
      // Добавляем новый товар
      const newCartItem = {
        id: item.id || Date.now(),
        name: item.title || 'Без названия',
        price: item.price ? parseFloat(item.price) : 0,
        quantity: 1,
        image: item.image || 'https://via.placeholder.com/80?text=Товар',
        brand: item.brand || 'Магазин',
        description: item.description || '',
        fromPreview: true // Флаг, что товар из превью
      };
      
      setCartItems([...cartItems, newCartItem]);
      alert(`Товар "${item.title}" добавлен в корзину!`);
    }

    // Показываем общее количество товаров в корзине
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0) + 1;
    console.log(`В корзине: ${totalItems} товаров`);
  };

  // Вспомогательная функция для стилей текста
  const getTextStyle = (block) => {
    let fontWeight = "normal";
    let fontStyle = "normal";
    if (block.fontStyle === "bold") fontWeight = "bold";
    else if (block.fontStyle === "italic") fontStyle = "italic";
    else if (block.fontStyle === "bold-italic") {
      fontWeight = "bold";
      fontStyle = "italic";
    }

    let fontSize = "16px";
    if (block.fontSize === "small") fontSize = "14px";
    else if (block.fontSize === "large") fontSize = "24px";

    return {
      color: textColor,
      textAlign: block.alignment || "left",
      fontSize,
      fontWeight,
      fontStyle,
      fontFamily: block.fontFamily || "Arial",
      margin: "16px 0",
    };
  };

  return (
    <div
      style={{
        backgroundColor: bgColor,
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
        position: "relative"
      }}
    >
      {/* Индикатор корзины в правом верхнем углу */}
      <div style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        backgroundColor: "#886128",
        color: "white",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        cursor: "pointer",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
      }}
      onClick={() => {
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        alert(`В корзине: ${totalItems} товаров\n\nПерейдите на страницу корзины, чтобы увидеть детали.`);
      }}
      title="Перейти в корзину"
      >
        <div>
          <div style={{ fontSize: "12px", textAlign: "center" }}>Корзина</div>
          <div style={{ fontSize: "18px", fontWeight: "bold" }}>
            {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {blocks.map((block) => {
          if (block.type === "heading") {
            return (
              <h2 key={block.id} style={getTextStyle(block)}>
                {block.content}
              </h2>
            );
          }

          if (block.type === "textBlock") {
            return (
              <p key={block.id} style={getTextStyle(block)}>
                {block.content}
              </p>
            );
          }

          if (block.type === "fourImages") {
            return (
              <div key={block.id} style={{ marginBottom: "32px" }}>
                <BlockFourImages
                  block={block}
                  textColor={textColor}
                  bgColor={bgColor}
                  onAddToCart={addToCart} // Передаем функцию добавления в корзину
                />
              </div>
            );
          }

          if (block.type === "button") {
            return (
              <div
                key={block.id}
                style={{ textAlign: "center", margin: "16px 0" }}
              >
                <button
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#886128",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    fontFamily: block.fontFamily || "Arial",
                    cursor: "pointer"
                  }}
                >
                  {block.content}
                </button>
              </div>
            );
          }

          // Графические блоки
          let BlockComponent;
          switch (block.type) {
            case "fourImages":
              BlockComponent = BlockFourImages;
              break;
            case "singleImageLeft":
              BlockComponent = BlockSingleImageLeft;
              break;
            case "imageRightText":
              BlockComponent = BlockImageRightText;
              break;
            case "twoImages":
              BlockComponent = BlockTwoImages;
              break;
            case "threeImages":
              BlockComponent = BlockThreeImages;
              break;
            case "bigLeftTwoSmall":
              BlockComponent = BlockBigLeftTwoSmall;
              break;
            default:
              return null;
          }

          return (
            <div key={block.id} style={{ marginBottom: "32px" }}>
              <BlockComponent
                block={block}
                textColor={textColor}
                bgColor={bgColor}
                onAddToCart={addToCart} // Передаем функцию добавления в корзину всем блокам
              />
            </div>
          );
        })}
      </div>

      {/* Кнопка перехода в корзину внизу страницы */}
      {cartItems.length > 0 && (
        <div style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000
        }}>
          <button
            onClick={() => {
              // Сохраняем корзину и переходим на страницу корзины
              localStorage.setItem('preview_cart', JSON.stringify(cartItems));
              window.location.href = '/cart';
            }}
            style={{
              backgroundColor: "#FFA000",
              color: "white",
              border: "none",
              borderRadius: "25px",
              padding: "12px 24px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}
          >
            <span>🛒</span>
            <span>Перейти в корзину ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} товаров)</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default PreviewPage;