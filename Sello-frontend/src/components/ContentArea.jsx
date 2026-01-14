// // src/components/ContentArea.jsx
// import React, { useState } from "react";
// import BlockFourImages from "./blocks/BlockFourImages";
// import BlockSingleImageLeft from "./blocks/BlockSingleImageLeft";
// import BlockImageRightText from "./blocks/BlockImageRightText";
// import BlockTwoImages from "./blocks/BlockTwoImages";
// import BlockThreeImages from "./blocks/BlockThreeImages";
// import BlockBigLeftTwoSmall from "./blocks/BlockBigLeftTwoSmall";

// const MOCK_NEWS = [
//   {
//     id: 1,
//     title: "Новость: Вышла новая коллекция!",
//     image: "https://via.placeholder.com/300x200/4a90e2/ffffff?text=Новость",
//     text: "Мы рады представить нашу новую коллекцию осень-зима 2025.",
//   },
// ];

// const MOCK_PRODUCTS = [
//   {
//     id: 1,
//     title: "Футболка хлопковая",
//     image: "src/assets/images/t-shirt.webp",
//     description: "Удобная хлопковая футболка с принтом.",
//     price: "1 499 ₽",
//   },
//   {
//     id: 2,
//     title: "Джинсы классические",
//     image: "https://via.placeholder.com/300x200/10b981/ffffff?text=Джинсы",
//     description: "Классические джинсы из прочного денима.",
//     price: "3 299 ₽",
//   },
// ];

// const BlockControls = ({ block, blocks, setBlocks, onDeleteBlock }) => {
//   const moveUp = (e) => {
//     e.stopPropagation();
//     const idx = blocks.findIndex((b) => b.id === block.id);
//     if (idx > 0) {
//       const newBlocks = [...blocks];
//       [newBlocks[idx], newBlocks[idx - 1]] = [
//         newBlocks[idx - 1],
//         newBlocks[idx],
//       ];
//       setBlocks(newBlocks);
//     }
//   };

//   const moveDown = (e) => {
//     e.stopPropagation();
//     const idx = blocks.findIndex((b) => b.id === block.id);
//     if (idx < blocks.length - 1) {
//       const newBlocks = [...blocks];
//       [newBlocks[idx], newBlocks[idx + 1]] = [
//         newBlocks[idx + 1],
//         newBlocks[idx],
//       ];
//       setBlocks(newBlocks);
//     }
//   };

//   const handleDelete = (e) => {
//     e.stopPropagation();
//     onDeleteBlock(block.id);
//   };

//   return (
//     <div className="block-controls mb-2">
//       <span className="badge bg-secondary me-2">
//         {block.type === "heading"
//           ? "Заголовок"
//           : block.type === "textBlock"
//           ? "Текст"
//           : block.type === "button"
//           ? "Кнопка"
//           : "Блок"}
//       </span>
//       <button
//         className="btn btn-sm btn-outline-secondary me-1"
//         onClick={moveUp}
//       >
//         ↑
//       </button>
//       <button
//         className="btn btn-sm btn-outline-secondary me-1"
//         onClick={moveDown}
//       >
//         ↓
//       </button>
//       <button className="btn btn-sm btn-outline-danger" onClick={handleDelete}>
//         Удалить
//       </button>
//     </div>
//   );
// };

// const ContentArea = ({
//   blocks,
//   setBlocks,
//   onBlockClick,
//   selectedBlockId,
//   onDeleteBlock,
//   textColor,
//   bgColor,
// }) => {
//   const [modal, setModal] = useState({
//     isOpen: false,
//     blockId: null,
//     slotIndex: null, // ← индекс ячейки в блоке
//   });

//   const handleAddToCart = (item) => {
//   // Пока просто покажем alert
//   alert(`Товар "${item.title}" добавлен в корзину!`);
//   // Позже: вызов API или обновление состояния
//   };

//   const openModal = (blockId, slotIndex) => {
//     setModal({ isOpen: true, blockId, slotIndex });
//   };

//   const closeModal = () => {
//     setModal({ isOpen: false, blockId: null, slotIndex: null });
//   };

//   const selectContentType = (type) => {
//     setModal((prev) => ({ ...prev, type }));
//   };

//   const selectContentItem = (item) => {
//     const content =
//       modal.type === "news"
//         ? { type: "news", ...item }
//         : { type: "product", ...item };

//     setBlocks((prevBlocks) =>
//       prevBlocks.map((block) => {
//         if (block.id === modal.blockId) {
//           // Определяем, сколько ячеек должно быть
//           let expectedLength = 1;
//           if (block.type === "fourImages") expectedLength = 4;
//           if (block.type === "twoImages") expectedLength = 2;
//           if (block.type === "threeImages") expectedLength = 3;
//           if (block.type === "bigLeftTwoSmall") expectedLength = 3;

//           // Создаём массив нужной длины, заполненный null
//           const currentItems = block.items || Array(expectedLength).fill(null);
//           const newItems = [...currentItems];

//           // Если массив короче нужного — расширяем
//           while (newItems.length < expectedLength) {
//             newItems.push(null);
//           }

//           // Обновляем только нужную ячейку
//           newItems[modal.slotIndex] = content;

//           return { ...block, items: newItems };
//         }
//         return block;
//       })
//     );
//     closeModal();
//   };

//   return (
//     <div className="constructor-content-area">
//       {blocks.length === 0 ? (
//         <div className="text-center text-muted mt-5">
//           Перетащите или добавьте блок из панели справа.
//         </div>
//       ) : (
//         blocks.map((block) => {
//           const isSelected = block.id === selectedBlockId;
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

//             case "heading":
//               BlockComponent = ({ block }) => {
//                 const initialText =
//                   typeof block.content === "string"
//                     ? block.content
//                     : "Заголовок";
//                 const [text, setText] = useState(initialText);
//                 const editableRef = React.useRef(null);

//                 const handleInput = (e) => {
//                   const newText = e.currentTarget.textContent;
//                   setText(newText);
//                 };

//                 const handleBlur = (e) => {
//                   const finalText = e.currentTarget.textContent;
//                   const newBlocks = blocks.map((b) =>
//                     b.id === block.id ? { ...b, content: finalText } : b
//                   );
//                   setBlocks(newBlocks);
//                 };

//                 const handleClick = (e) => e.stopPropagation();

//                 const updateStyle = (field, value) => {
//                   const newBlocks = blocks.map((b) =>
//                     b.id === block.id ? { ...b, [field]: value } : b
//                   );
//                   setBlocks(newBlocks);
//                 };

//                 React.useEffect(() => {
//                   if (editableRef.current) {
//                     editableRef.current.textContent = initialText;
//                   }
//                 }, [block.id]);

//                 // Применяем стили
//                 const getStyle = () => {
//                   let fontWeight = "normal";
//                   let fontStyle = "normal";
//                   if (block.fontStyle === "bold") fontWeight = "bold";
//                   else if (block.fontStyle === "italic") fontStyle = "italic";
//                   else if (block.fontStyle === "bold-italic") {
//                     fontWeight = "bold";
//                     fontStyle = "italic";
//                   }

//                   let fontSize = "16px";
//                   if (block.fontSize === "small") fontSize = "14px";
//                   else if (block.fontSize === "large") fontSize = "24px";

//                   return {
//                     border: "1px dashed #ccc",
//                     borderRadius: "4px",
//                     padding: "8px",
//                     outline: "none",
//                     minWidth: "100px",
//                     minHeight: "1.5em",
//                     margin: 0,
//                     textAlign: block.alignment || "left",
//                     color: textColor,
//                     backgroundColor: bgColor,
//                     fontSize,
//                     fontWeight,
//                     fontStyle,
//                     fontFamily: block.fontFamily,
//                   };
//                 };

//                 return (
//                   <div>
//                     <h2
//                       ref={editableRef}
//                       contentEditable
//                       suppressContentEditableWarning
//                       onInput={handleInput}
//                       onBlur={handleBlur}
//                       onClick={handleClick}
//                       style={getStyle()}
//                     />

//                     {/* Управление */}
//                     <div className="mt-2">
//                       {/* Выравнивание */}
//                       <div className="text-alignment-controls mb-2">
//                         {["left", "center", "right"].map((align) => (
//                           <button
//                             key={align}
//                             className={`btn btn-sm ${
//                               block.alignment === align ? "active" : ""
//                             }`}
//                             onClick={() => updateStyle("alignment", align)}
//                           >
//                             {align === "left"
//                               ? "←"
//                               : align === "center"
//                               ? "•"
//                               : "→"}
//                           </button>
//                         ))}
//                       </div>

//                       {/* Размер */}
//                       <div className="mb-2">
//                         <small className="me-2">Размер:</small>
//                         {["small", "medium", "large"].map((size) => (
//                           <button
//                             key={size}
//                             className={`btn btn-sm ${
//                               block.fontSize === size ? "active" : ""
//                             }`}
//                             onClick={() => updateStyle("fontSize", size)}
//                           >
//                             {size === "small"
//                               ? "мелкий"
//                               : size === "medium"
//                               ? "средний"
//                               : "крупный"}
//                           </button>
//                         ))}
//                       </div>

//                       {/* Стиль */}
//                       <div className="mb-2">
//                         <small className="me-2">Стиль:</small>
//                         {[
//                           { key: "normal", label: "обычный" },
//                           { key: "bold", label: "жирный" },
//                           { key: "italic", label: "курсив" },
//                           { key: "bold-italic", label: "ж/к" },
//                         ].map((style) => (
//                           <button
//                             key={style.key}
//                             className={`btn btn-sm ${
//                               block.fontStyle === style.key ? "active" : ""
//                             }`}
//                             onClick={() => updateStyle("fontStyle", style.key)}
//                           >
//                             {style.label}
//                           </button>
//                         ))}
//                       </div>

//                       {/* Шрифт */}
//                       <div>
//                         <small className="me-2">Шрифт:</small>
//                         {[
//                           "Arial",
//                           "Georgia",
//                           "Verdana",
//                           "Tahoma",
//                           "Courier New",
//                         ].map((font) => (
//                           <button
//                             key={font}
//                             className={`btn btn-sm ${
//                               block.fontFamily === font ? "active" : ""
//                             }`}
//                             onClick={() => updateStyle("fontFamily", font)}
//                             style={{ fontFamily: font }}
//                           >
//                             Aa
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               };
//               break;

//             case "textBlock":
//               BlockComponent = ({ block }) => {
//                 const initialText =
//                   typeof block.content === "string"
//                     ? block.content
//                     : "Текстовый блок";
//                 const [text, setText] = useState(initialText);
//                 const editableRef = React.useRef(null);

//                 const handleInput = (e) => {
//                   const newText = e.currentTarget.textContent;
//                   setText(newText);
//                 };

//                 const handleBlur = (e) => {
//                   const finalText = e.currentTarget.textContent;
//                   const newBlocks = blocks.map((b) =>
//                     b.id === block.id ? { ...b, content: finalText } : b
//                   );
//                   setBlocks(newBlocks);
//                 };

//                 const handleClick = (e) => e.stopPropagation();

//                 const updateStyle = (field, value) => {
//                   const newBlocks = blocks.map((b) =>
//                     b.id === block.id ? { ...b, [field]: value } : b
//                   );
//                   setBlocks(newBlocks);
//                 };

//                 React.useEffect(() => {
//                   if (editableRef.current) {
//                     editableRef.current.textContent = initialText;
//                   }
//                 }, [block.id]);

//                 // Применяем стили
//                 const getStyle = () => {
//                   let fontWeight = "normal";
//                   let fontStyle = "normal";
//                   if (block.fontStyle === "bold") fontWeight = "bold";
//                   else if (block.fontStyle === "italic") fontStyle = "italic";
//                   else if (block.fontStyle === "bold-italic") {
//                     fontWeight = "bold";
//                     fontStyle = "italic";
//                   }

//                   let fontSize = "16px";
//                   if (block.fontSize === "small") fontSize = "14px";
//                   else if (block.fontSize === "large") fontSize = "24px";

//                   return {
//                     border: "1px dashed #ccc",
//                     borderRadius: "4px",
//                     padding: "8px",
//                     outline: "none",
//                     minWidth: "100px",
//                     minHeight: "1.5em",
//                     margin: 0,
//                     textAlign: block.alignment || "left",
//                     color: textColor,
//                     backgroundColor: bgColor,
//                     fontSize,
//                     fontWeight,
//                     fontStyle,
//                     fontFamily: block.fontFamily,
//                   };
//                 };

//                 return (
//                   <div>
//                     <p
//                       ref={editableRef}
//                       contentEditable
//                       suppressContentEditableWarning
//                       onInput={handleInput}
//                       onBlur={handleBlur}
//                       onClick={handleClick}
//                       style={getStyle()}
//                     />

//                     {/* Управление */}
//                     <div className="mt-2">
//                       {/* Выравнивание */}
//                       <div className="text-alignment-controls mb-2">
//                         {["left", "center", "right"].map((align) => (
//                           <button
//                             key={align}
//                             className={`btn btn-sm ${
//                               block.alignment === align ? "active" : ""
//                             }`}
//                             onClick={() => updateStyle("alignment", align)}
//                           >
//                             {align === "left"
//                               ? "←"
//                               : align === "center"
//                               ? "•"
//                               : "→"}
//                           </button>
//                         ))}
//                       </div>

//                       {/* Размер */}
//                       <div className="mb-2">
//                         <small className="me-2">Размер:</small>
//                         {["small", "medium", "large"].map((size) => (
//                           <button
//                             key={size}
//                             className={`btn btn-sm ${
//                               block.fontSize === size ? "active" : ""
//                             }`}
//                             onClick={() => updateStyle("fontSize", size)}
//                           >
//                             {size === "small"
//                               ? "мелкий"
//                               : size === "medium"
//                               ? "средний"
//                               : "крупный"}
//                           </button>
//                         ))}
//                       </div>

//                       {/* Стиль */}
//                       <div className="mb-2">
//                         <small className="me-2">Стиль:</small>
//                         {[
//                           { key: "normal", label: "обычный" },
//                           { key: "bold", label: "жирный" },
//                           { key: "italic", label: "курсив" },
//                           { key: "bold-italic", label: "ж/к" },
//                         ].map((style) => (
//                           <button
//                             key={style.key}
//                             className={`btn btn-sm ${
//                               block.fontStyle === style.key ? "active" : ""
//                             }`}
//                             onClick={() => updateStyle("fontStyle", style.key)}
//                           >
//                             {style.label}
//                           </button>
//                         ))}
//                       </div>

//                       {/* Шрифт */}
//                       <div>
//                         <small className="me-2">Шрифт:</small>
//                         {[
//                           "Arial",
//                           "Georgia",
//                           "Verdana",
//                           "Tahoma",
//                           "Courier New",
//                         ].map((font) => (
//                           <button
//                             key={font}
//                             className={`btn btn-sm ${
//                               block.fontFamily === font ? "active" : ""
//                             }`}
//                             onClick={() => updateStyle("fontFamily", font)}
//                             style={{ fontFamily: font }}
//                           >
//                             Aa
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               };
//               break;

//             case "button":
//               BlockComponent = ({ block }) => {
//                 const initialText =
//                   typeof block.content === "string" ? block.content : "Кнопка";
//                 const [text, setText] = useState(initialText);

//                 const handleInput = (e) => {
//                   const newText = e.target.innerText;
//                   const newBlocks = blocks.map((b) =>
//                     b.id === block.id ? { ...b, content: newText } : b
//                   );
//                   setBlocks(newBlocks);
//                 };

//                 return (
//                   <div className="text-center">
//                     <button
//                       className="btn btn-primary"
//                       contentEditable
//                       suppressContentEditableWarning
//                       onInput={handleInput}
//                     >
//                       {text}
//                     </button>
//                   </div>
//                 );
//               };
//               break;

//             default:
//               BlockComponent = () => <div>Неизвестный блок</div>;
//           }

//           return (
//             <div
//               key={block.id}
//               className={`mb-4 p-3 border rounded ${
//                 isSelected ? "border-primary shadow-sm" : ""
//               }`}
//               onClick={() => onBlockClick(block.id)}
//             >
//               <BlockControls
//                 block={block}
//                 blocks={blocks}
//                 setBlocks={setBlocks}
//                 onDeleteBlock={onDeleteBlock}
//               />
//               <BlockComponent
//                 block={block}
//                 onOpenModal={(slotIndex) => openModal(block.id, slotIndex)}
//                 textColor={textColor}
//                 bgColor={bgColor}
//                 onAddToCart={handleAddToCart}
//               />
//             </div>
//           );
//         })
//       )}

//       {/* МОДАЛЬНОЕ ОКНО */}
//       {modal.isOpen && (
//         <div className="modal-overlay">
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <h5>Выберите тип контента</h5>

//             {modal.type == null ? (
//               <div className="d-flex gap-3">
//                 <button
//                   className="btn btn-outline-primary"
//                   onClick={() => selectContentType("news")}
//                 >
//                   Новость
//                 </button>
//                 <button
//                   className="btn btn-outline-success"
//                   onClick={() => selectContentType("product")}
//                 >
//                   Товар
//                 </button>
//               </div>
//             ) : modal.type === "news" ? (
//               <div>
//                 <h6>Выберите новость</h6>
//                 {MOCK_NEWS.map((item) => (
//                   <div
//                     key={item.id}
//                     className="p-2 border rounded mb-2 clickable-item"
//                     onClick={() => selectContentItem(item)}
//                   >
//                     <img
//                       src={item.image}
//                       alt={item.title}
//                       className="img-fluid mb-1"
//                       style={{ height: "60px", objectFit: "cover" }}
//                     />
//                     <strong>{item.title}</strong>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div>
//                 <h6>Выберите товар</h6>
//                 {MOCK_PRODUCTS.map((item) => (
//                   <div
//                     key={item.id}
//                     className="p-2 border rounded mb-2 clickable-item"
//                     onClick={() => selectContentItem(item)}
//                   >
//                     <img
//                       src={item.image}
//                       alt={item.title}
//                       className="img-fluid mb-1"
//                       style={{ height: "60px", objectFit: "cover" }}
//                     />
//                     <strong>{item.title}</strong> — {item.price}
//                   </div>
//                 ))}
//               </div>
//             )}

//             <button className="btn btn-secondary mt-3" onClick={closeModal}>
//               Отмена
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ContentArea;











// src/components/ContentArea.jsx
import React, { useState, useEffect } from "react";
import BlockFourImages from "./blocks/BlockFourImages";
import BlockSingleImageLeft from "./blocks/BlockSingleImageLeft";
import BlockImageRightText from "./blocks/BlockImageRightText";
import BlockTwoImages from "./blocks/BlockTwoImages";
import BlockThreeImages from "./blocks/BlockThreeImages";
import BlockBigLeftTwoSmall from "./blocks/BlockBigLeftTwoSmall";
import { apiService } from "../services/api";

const ContentArea = ({
  blocks,
  setBlocks,
  onBlockClick,
  selectedBlockId,
  onDeleteBlock,
  textColor,
  bgColor,
}) => {
  const [modal, setModal] = useState({
    isOpen: false,
    blockId: null,
    slotIndex: null,
    contentType: null, // 'products' или 'news'
    loading: false,
    searchQuery: "",
    selectedCategory: "all"
  });
  
  const [selloProducts, setSelloProducts] = useState([]);
  const [selloNews, setSelloNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [contentLoading, setContentLoading] = useState(false);

  // Загружаем товары и новости при открытии модалки
  useEffect(() => {
    if (modal.isOpen && modal.contentType) {
      loadContentData();
    }
  }, [modal.isOpen, modal.contentType, modal.selectedCategory, modal.searchQuery]);

  const loadContentData = async () => {
    try {
      setModal(prev => ({ ...prev, loading: true }));
      setContentLoading(true);
      
      const filters = {
        search: modal.searchQuery || '',
        category: modal.selectedCategory !== 'all' ? modal.selectedCategory : '',
        limit: 50
      };
      
      if (modal.contentType === 'products') {
        const products = await apiService.getSelloProducts(filters);
        setSelloProducts(products || []);
        
        // Получаем категории из всех товаров
        const allCategories = [...new Set(products
          .filter(p => p.category)
          .map(p => p.category))];
        setCategories(['all', ...allCategories]);
        
      } else if (modal.contentType === 'news') {
        const news = await apiService.getSelloNews(filters);
        setSelloNews(news || []);
        
        // Получаем категории из всех новостей
        const allCategories = [...new Set(news
          .filter(n => n.category)
          .map(n => n.category))];
        setCategories(['all', ...allCategories]);
      }
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
      // Используем моковые данные при ошибке
      if (modal.contentType === 'products') {
        setSelloProducts(apiService.getMockProducts());
        setCategories(['all', 'Одежда', 'Электроника']);
      } else {
        setSelloNews(apiService.getMockNews());
        setCategories(['all', 'Новости']);
      }
    } finally {
      setModal(prev => ({ ...prev, loading: false }));
      setContentLoading(false);
    }
  };

  const openModal = (blockId, slotIndex) => {
    setModal({ 
      isOpen: true, 
      blockId, 
      slotIndex, 
      contentType: null,
      loading: false,
      searchQuery: "",
      selectedCategory: "all"
    });
    setSelloProducts([]);
    setSelloNews([]);
    setCategories(['all']);
  };

  const closeModal = () => {
    setModal({ 
      isOpen: false, 
      blockId: null, 
      slotIndex: null,
      contentType: null,
      loading: false,
      searchQuery: "",
      selectedCategory: "all"
    });
  };

  const selectContentType = (type) => {
    setModal(prev => ({ ...prev, contentType: type }));
  };

  const selectContentItem = (item) => {
    const content = {
      type: modal.contentType === 'products' ? 'product' : 'news',
      ...item
    };

    setBlocks((prevBlocks) =>
      prevBlocks.map((block) => {
        if (block.id === modal.blockId) {
          let expectedLength = 1;
          if (block.type === "fourImages") expectedLength = 4;
          if (block.type === "twoImages") expectedLength = 2;
          if (block.type === "threeImages") expectedLength = 3;
          if (block.type === "bigLeftTwoSmall") expectedLength = 3;

          const currentItems = block.items || Array(expectedLength).fill(null);
          const newItems = [...currentItems];
          while (newItems.length < expectedLength) {
            newItems.push(null);
          }
          newItems[modal.slotIndex] = content;
          return { ...block, items: newItems };
        }
        return block;
      })
    );
    closeModal();
  };

  const handleSearchChange = (e) => {
    setModal(prev => ({ ...prev, searchQuery: e.target.value }));
  };

  const handleCategoryChange = (e) => {
    setModal(prev => ({ ...prev, selectedCategory: e.target.value }));
  };

  const handleAddToCart = async (item) => {
    try {
      // Добавляем товар в корзину через API
      // Здесь нужно реализовать метод addToCart в apiService
      // Пока просто показываем сообщение
      alert(`Товар "${item.title}" добавлен в корзину!`);
    } catch (error) {
      console.error('Ошибка добавления в корзину:', error);
      alert('Не удалось добавить товар в корзину');
    }
  };

  return (
    <div className="constructor-content-area">
      {blocks.length === 0 ? (
        <div className="text-center text-muted mt-5">
          Перетащите или добавьте блок из панели справа.
        </div>
      ) : (
        blocks.map((block) => {
          const isSelected = block.id === selectedBlockId;
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

            case "heading":
              BlockComponent = ({ block }) => {
                const initialText =
                  typeof block.content === "string"
                    ? block.content
                    : "Заголовок";
                const [text, setText] = useState(initialText);
                const editableRef = React.useRef(null);

                const handleInput = (e) => {
                  const newText = e.currentTarget.textContent;
                  setText(newText);
                };

                const handleBlur = (e) => {
                  const finalText = e.currentTarget.textContent;
                  const newBlocks = blocks.map((b) =>
                    b.id === block.id ? { ...b, content: finalText } : b
                  );
                  setBlocks(newBlocks);
                };

                const handleClick = (e) => e.stopPropagation();

                const updateStyle = (field, value) => {
                  const newBlocks = blocks.map((b) =>
                    b.id === block.id ? { ...b, [field]: value } : b
                  );
                  setBlocks(newBlocks);
                };

                React.useEffect(() => {
                  if (editableRef.current) {
                    editableRef.current.textContent = initialText;
                  }
                }, [block.id]);

                // Применяем стили
                const getStyle = () => {
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
                    border: "1px dashed #ccc",
                    borderRadius: "4px",
                    padding: "8px",
                    outline: "none",
                    minWidth: "100px",
                    minHeight: "1.5em",
                    margin: 0,
                    textAlign: block.alignment || "left",
                    color: textColor,
                    backgroundColor: bgColor,
                    fontSize,
                    fontWeight,
                    fontStyle,
                    fontFamily: block.fontFamily,
                  };
                };

                return (
                  <div>
                    <h2
                      ref={editableRef}
                      contentEditable
                      suppressContentEditableWarning
                      onInput={handleInput}
                      onBlur={handleBlur}
                      onClick={handleClick}
                      style={getStyle()}
                    />

                    {/* Управление */}
                    <div className="mt-2">
                      {/* Выравнивание */}
                      <div className="text-alignment-controls mb-2">
                        {["left", "center", "right"].map((align) => (
                          <button
                            key={align}
                            className={`btn btn-sm ${
                              block.alignment === align ? "active" : ""
                            }`}
                            onClick={() => updateStyle("alignment", align)}
                          >
                            {align === "left"
                              ? "←"
                              : align === "center"
                              ? "•"
                              : "→"}
                          </button>
                        ))}
                      </div>

                      {/* Размер */}
                      <div className="mb-2">
                        <small className="me-2">Размер:</small>
                        {["small", "medium", "large"].map((size) => (
                          <button
                            key={size}
                            className={`btn btn-sm ${
                              block.fontSize === size ? "active" : ""
                            }`}
                            onClick={() => updateStyle("fontSize", size)}
                          >
                            {size === "small"
                              ? "мелкий"
                              : size === "medium"
                              ? "средний"
                              : "крупный"}
                          </button>
                        ))}
                      </div>

                      {/* Стиль */}
                      <div className="mb-2">
                        <small className="me-2">Стиль:</small>
                        {[
                          { key: "normal", label: "обычный" },
                          { key: "bold", label: "жирный" },
                          { key: "italic", label: "курсив" },
                          { key: "bold-italic", label: "ж/к" },
                        ].map((style) => (
                          <button
                            key={style.key}
                            className={`btn btn-sm ${
                              block.fontStyle === style.key ? "active" : ""
                            }`}
                            onClick={() => updateStyle("fontStyle", style.key)}
                          >
                            {style.label}
                          </button>
                        ))}
                      </div>

                      {/* Шрифт */}
                      <div>
                        <small className="me-2">Шрифт:</small>
                        {[
                          "Arial",
                          "Georgia",
                          "Verdana",
                          "Tahoma",
                          "Courier New",
                        ].map((font) => (
                          <button
                            key={font}
                            className={`btn btn-sm ${
                              block.fontFamily === font ? "active" : ""
                            }`}
                            onClick={() => updateStyle("fontFamily", font)}
                            style={{ fontFamily: font }}
                          >
                            Aa
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              };
              break;

            case "textBlock":
              BlockComponent = ({ block }) => {
                const initialText =
                  typeof block.content === "string"
                    ? block.content
                    : "Текстовый блок";
                const [text, setText] = useState(initialText);
                const editableRef = React.useRef(null);

                const handleInput = (e) => {
                  const newText = e.currentTarget.textContent;
                  setText(newText);
                };

                const handleBlur = (e) => {
                  const finalText = e.currentTarget.textContent;
                  const newBlocks = blocks.map((b) =>
                    b.id === block.id ? { ...b, content: finalText } : b
                  );
                  setBlocks(newBlocks);
                };

                const handleClick = (e) => e.stopPropagation();

                const updateStyle = (field, value) => {
                  const newBlocks = blocks.map((b) =>
                    b.id === block.id ? { ...b, [field]: value } : b
                  );
                  setBlocks(newBlocks);
                };

                React.useEffect(() => {
                  if (editableRef.current) {
                    editableRef.current.textContent = initialText;
                  }
                }, [block.id]);

                // Применяем стили
                const getStyle = () => {
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
                    border: "1px dashed #ccc",
                    borderRadius: "4px",
                    padding: "8px",
                    outline: "none",
                    minWidth: "100px",
                    minHeight: "1.5em",
                    margin: 0,
                    textAlign: block.alignment || "left",
                    color: textColor,
                    backgroundColor: bgColor,
                    fontSize,
                    fontWeight,
                    fontStyle,
                    fontFamily: block.fontFamily,
                  };
                };

                return (
                  <div>
                    <p
                      ref={editableRef}
                      contentEditable
                      suppressContentEditableWarning
                      onInput={handleInput}
                      onBlur={handleBlur}
                      onClick={handleClick}
                      style={getStyle()}
                    />

                    {/* Управление */}
                    <div className="mt-2">
                      {/* Выравнивание */}
                      <div className="text-alignment-controls mb-2">
                        {["left", "center", "right"].map((align) => (
                          <button
                            key={align}
                            className={`btn btn-sm ${
                              block.alignment === align ? "active" : ""
                            }`}
                            onClick={() => updateStyle("alignment", align)}
                          >
                            {align === "left"
                              ? "←"
                              : align === "center"
                              ? "•"
                              : "→"}
                          </button>
                        ))}
                      </div>

                      {/* Размер */}
                      <div className="mb-2">
                        <small className="me-2">Размер:</small>
                        {["small", "medium", "large"].map((size) => (
                          <button
                            key={size}
                            className={`btn btn-sm ${
                              block.fontSize === size ? "active" : ""
                            }`}
                            onClick={() => updateStyle("fontSize", size)}
                          >
                            {size === "small"
                              ? "мелкий"
                              : size === "medium"
                              ? "средний"
                              : "крупный"}
                          </button>
                        ))}
                      </div>

                      {/* Стиль */}
                      <div className="mb-2">
                        <small className="me-2">Стиль:</small>
                        {[
                          { key: "normal", label: "обычный" },
                          { key: "bold", label: "жирный" },
                          { key: "italic", label: "курсив" },
                          { key: "bold-italic", label: "ж/к" },
                        ].map((style) => (
                          <button
                            key={style.key}
                            className={`btn btn-sm ${
                              block.fontStyle === style.key ? "active" : ""
                            }`}
                            onClick={() => updateStyle("fontStyle", style.key)}
                          >
                            {style.label}
                          </button>
                        ))}
                      </div>

                      {/* Шрифт */}
                      <div>
                        <small className="me-2">Шрифт:</small>
                        {[
                          "Arial",
                          "Georgia",
                          "Verdana",
                          "Tahoma",
                          "Courier New",
                        ].map((font) => (
                          <button
                            key={font}
                            className={`btn btn-sm ${
                              block.fontFamily === font ? "active" : ""
                            }`}
                            onClick={() => updateStyle("fontFamily", font)}
                            style={{ fontFamily: font }}
                          >
                            Aa
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              };
              break;

            case "button":
              BlockComponent = ({ block }) => {
                const initialText =
                  typeof block.content === "string" ? block.content : "Кнопка";
                const [text, setText] = useState(initialText);

                const handleInput = (e) => {
                  const newText = e.target.innerText;
                  const newBlocks = blocks.map((b) =>
                    b.id === block.id ? { ...b, content: newText } : b
                  );
                  setBlocks(newBlocks);
                };

                return (
                  <div className="text-center">
                    <button
                      className="btn btn-primary"
                      contentEditable
                      suppressContentEditableWarning
                      onInput={handleInput}
                    >
                      {text}
                    </button>
                  </div>
                );
              };
              break;

            default:
              BlockComponent = () => <div>Неизвестный блок</div>;
          }

          return (
            <div
              key={block.id}
              className={`mb-4 p-3 border rounded ${
                isSelected ? "border-primary shadow-sm" : ""
              }`}
              onClick={() => onBlockClick(block.id)}
            >
              <BlockControls
                block={block}
                blocks={blocks}
                setBlocks={setBlocks}
                onDeleteBlock={onDeleteBlock}
              />
              <BlockComponent
                block={block}
                onOpenModal={(slotIndex) => openModal(block.id, slotIndex)}
                textColor={textColor}
                bgColor={bgColor}
                onAddToCart={handleAddToCart}
              />
            </div>
          );
        })
      )}

      {/* МОДАЛЬНОЕ ОКНО С ПОИСКОМ И ФИЛЬТРАЦИЕЙ */}
      {modal.isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content modal-content-large" onClick={(e) => e.stopPropagation()}>
            <h5>Выберите контент</h5>
            
            {/* Шапка с поиском и фильтрами */}
            {modal.contentType && (
              <div className="modal-header-controls mb-3">
                <div className="row g-2">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Поиск..."
                      value={modal.searchQuery}
                      onChange={handleSearchChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <select
                      className="form-select form-select-sm"
                      value={modal.selectedCategory}
                      onChange={handleCategoryChange}
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>
                          {cat === 'all' ? 'Все категории' : cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <button 
                      className="btn btn-sm btn-outline-secondary w-100"
                      onClick={loadContentData}
                      disabled={modal.loading}
                    >
                      {modal.loading ? '...' : 'Обновить'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Выбор типа контента */}
            {modal.contentType == null ? (
              <div className="d-flex gap-3 justify-content-center">
                <button
                  className="btn btn-outline-primary btn-lg"
                  onClick={() => selectContentType('news')}
                >
                  📰 Новости
                </button>
                <button
                  className="btn btn-outline-success btn-lg"
                  onClick={() => selectContentType('products')}
                >
                  🛒 Товары
                </button>
              </div>
            ) : modal.contentType === 'news' ? (
              <div>
                <h6>Выберите новость</h6>
                {contentLoading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Загрузка...</span>
                    </div>
                  </div>
                ) : selloNews.length === 0 ? (
                  <p className="text-center py-3">Новости не найдены</p>
                ) : (
                  <div className="content-grid">
                    {selloNews.map((item) => (
                      <div
                        key={item.id}
                        className="content-item card mb-2"
                        onClick={() => selectContentItem(item)}
                      >
                        <div className="row g-0">
                          <div className="col-4">
                            <img
                              src={item.image || 'https://via.placeholder.com/150x100?text=Новость'}
                              alt={item.title}
                              className="img-fluid rounded-start"
                              style={{ height: '100px', objectFit: 'cover' }}
                            />
                          </div>
                          <div className="col-8">
                            <div className="card-body p-2">
                              <h6 className="card-title mb-1">{item.title}</h6>
                              <p className="card-text small text-muted mb-0">
                                {item.content?.substring(0, 100)}...
                              </p>
                              {item.category && item.category !== 'Без категории' && (
                                <span className="badge bg-secondary mt-1">
                                  {item.category}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h6>Выберите товар</h6>
                {contentLoading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-success" role="status">
                      <span className="visually-hidden">Загрузка...</span>
                    </div>
                  </div>
                ) : selloProducts.length === 0 ? (
                  <p className="text-center py-3">Товары не найдены</p>
                ) : (
                  <div className="content-grid">
                    {selloProducts.map((item) => (
                      <div
                        key={item.id}
                        className="content-item card mb-2"
                        onClick={() => selectContentItem(item)}
                      >
                        <div className="row g-0">
                          <div className="col-4">
                            <img
                              src={item.image || 'https://via.placeholder.com/150x100?text=Товар'}
                              alt={item.title}
                              className="img-fluid rounded-start"
                              style={{ height: '100px', objectFit: 'cover' }}
                            />
                          </div>
                          <div className="col-8">
                            <div className="card-body p-2">
                              <div className="d-flex justify-content-between">
                                <h6 className="card-title mb-1">{item.title}</h6>
                                <strong className="text-primary">{item.price}</strong>
                              </div>
                              <p className="card-text small text-muted mb-1">
                                {item.description?.substring(0, 80)}...
                              </p>
                              {item.category && item.category !== 'Без категории' && (
                                <span className="badge bg-info">
                                  {item.category}
                                </span>
                              )}
                              <div className="mt-2">
                                <button 
                                  className="btn btn-sm btn-outline-success"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddToCart(item);
                                  }}
                                >
                                  В корзину
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="mt-3 text-center">
              <button className="btn btn-secondary" onClick={closeModal}>
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// BlockControls компонент
const BlockControls = ({ block, blocks, setBlocks, onDeleteBlock }) => {
  const moveUp = (e) => {
    e.stopPropagation();
    const idx = blocks.findIndex((b) => b.id === block.id);
    if (idx > 0) {
      const newBlocks = [...blocks];
      [newBlocks[idx], newBlocks[idx - 1]] = [
        newBlocks[idx - 1],
        newBlocks[idx],
      ];
      setBlocks(newBlocks);
    }
  };

  const moveDown = (e) => {
    e.stopPropagation();
    const idx = blocks.findIndex((b) => b.id === block.id);
    if (idx < blocks.length - 1) {
      const newBlocks = [...blocks];
      [newBlocks[idx], newBlocks[idx + 1]] = [
        newBlocks[idx + 1],
        newBlocks[idx],
      ];
      setBlocks(newBlocks);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDeleteBlock(block.id);
  };

  return (
    <div className="block-controls mb-2">
      <span className="badge bg-secondary me-2">
        {block.type === "heading"
          ? "Заголовок"
          : block.type === "textBlock"
          ? "Текст"
          : block.type === "button"
          ? "Кнопка"
          : "Блок"}
      </span>
      <button
        className="btn btn-sm btn-outline-secondary me-1"
        onClick={moveUp}
      >
        ↑
      </button>
      <button
        className="btn btn-sm btn-outline-secondary me-1"
        onClick={moveDown}
      >
        ↓
      </button>
      <button className="btn btn-sm btn-outline-danger" onClick={handleDelete}>
        Удалить
      </button>
    </div>
  );
};

export default ContentArea;
