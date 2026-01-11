// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";

// // Импортируем иконки
// import HomeIcon from "../assets/icon/home-icon.svg";
// import NewsIcon from "../assets/icon/news-icon.svg";
// import BrandsIcon from "../assets/icon/brands-icon.svg";
// import ProductsIcon from "../assets/icon/products-icon.svg";
// import UsersIcon from "../assets/icon/users-icon.svg";
// import CatalogIcon from "../assets/icon/catalog-icon.svg";

// const Sidebar = () => {
//   const [isHovered, setIsHovered] = useState(false);
//   const location = useLocation();

//   const menuItems = [
//     { path: "/", label: "Главная страница", icon: HomeIcon },
//     { path: "/news", label: "Новости", icon: NewsIcon },
//     { path: "/brands", label: "Бренды", icon: BrandsIcon },
//     { path: "/products", label: "Товары", icon: ProductsIcon },
//     { path: "/users", label: "Пользователи", icon: UsersIcon },
//     { path: "/catalog", label: "Дерево каталога", icon: CatalogIcon },
//   ];

//   // Если иконки не загружаются, используем текстовые замены
//   const getIconContent = (label) => {
//     const iconMap = {
//       'Главная страница': '🏠',
//       'Новости': '📰',
//       'Бренды': '🏷️',
//       'Товары': '📦',
//       'Пользователи': '👥',
//       'Дерево каталога': '🌳'
//     };
    
//     return iconMap[label] || '📌';
//   };

//   return (
//     <div 
//       className="sidebar-custom"
//       style={{
//         width: isHovered ? '200px' : '60px',
//         height: 'auto',
//         backgroundColor: '#FFF',
//         border: '1px solid #EEE',
//         borderRadius: '12px',
//         position: 'fixed',
//         left: '20px',
//         top: '80px',
//         zIndex: 1000,
//         overflow: 'hidden',
//         transition: 'all 0.3s ease',
//         boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
//       }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Меню навигации - сразу начинается с первой иконки */}
//       <div 
//         className="sidebar-menu"
//         style={{ 
//           padding: '12px',
//         }}
//       >
//         {menuItems.map((item) => (
//           <Link
//             key={item.path}
//             to={item.path}
//             className="sidebar-menu-item"
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               textDecoration: 'none',
//               padding: isHovered ? '10px 12px' : '10px 0',
//               marginBottom: '6px',
//               color: location.pathname === item.path ? '#AA8144' : '#333',
//               backgroundColor: location.pathname === item.path ? '#FFF4E5' : 'transparent',
//               borderRadius: '8px',
//               transition: 'all 0.2s ease',
//               justifyContent: isHovered ? 'flex-start' : 'center',
//               minHeight: '40px',
//             }}
//             onMouseEnter={(e) => {
//               if (location.pathname !== item.path) {
//                 e.currentTarget.style.backgroundColor = '#FFF9F0';
//               }
//             }}
//             onMouseLeave={(e) => {
//               if (location.pathname !== item.path) {
//                 e.currentTarget.style.backgroundColor = 'transparent';
//               }
//             }}
//           >
//             <div style={{
//               width: '28px',
//               height: '28px',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               marginRight: isHovered ? '12px' : '0',
//               flexShrink: 0,
//               transition: 'margin-right 0.3s ease',
//               backgroundColor: location.pathname === item.path ? '#FFE082' : '#FFF4E5',
//               borderRadius: '6px',
//             }}>
//               {item.icon ? (
//                 <img 
//                   src={item.icon} 
//                   alt={item.label}
//                   style={{ 
//                     width: '18px', 
//                     height: '18px',
//                   }}
//                 />
//               ) : (
//                 <span style={{ fontSize: '16px' }}>
//                   {getIconContent(item.label)}
//                 </span>
//               )}
//             </div>
            
//             {isHovered && (
//               <span style={{
//                 fontSize: '14px',
//                 fontWeight: location.pathname === item.path ? '600' : '500',
//                 opacity: isHovered ? 1 : 0,
//                 transition: 'opacity 0.2s ease',
//                 whiteSpace: 'nowrap',
//                 color: location.pathname === item.path ? '#AA8144' : '#333',
//               }}>
//                 {item.label}
//               </span>
//             )}
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;



import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Импортируем иконки
import HomeIcon from "../assets/icon/home-icon.svg";
import NewsIcon from "../assets/icon/news-icon.svg";
import BrandsIcon from "../assets/icon/brands-icon.svg";
import ProductsIcon from "../assets/icon/products-icon.svg";
import UsersIcon from "../assets/icon/users-icon.svg";
import CatalogIcon from "../assets/icon/catalog-icon.svg";

const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Главная страница", icon: HomeIcon },
    { path: "/news", label: "Новости", icon: NewsIcon },
    { path: "/brands", label: "Бренды", icon: BrandsIcon },
    { path: "/products", label: "Товары", icon: ProductsIcon },
    { path: "/users", label: "Пользователи", icon: UsersIcon },
    { path: "/catalog", label: "Дерево каталога", icon: CatalogIcon },
  ];

  const getIconContent = (label) => {
    const iconMap = {
      'Главная страница': '🏠',
      'Новости': '📰',
      'Бренды': '🏷️',
      'Товары': '📦',
      'Пользователи': '👥',
      'Дерево каталога': '🌳'
    };
    return iconMap[label] || '📌';
  };

  return (
    <div 
      className="sidebar-custom"
      style={{
        width: isHovered ? '220px' : '60px', // ← чуть шире
        height: 'auto',
        backgroundColor: '#F9E5C8', // ← фон сайдбара
        border: 'none', // ← убираем рамку, если не нужна
        borderRadius: '12px',
        position: 'fixed',
        
        top: '100px',
        zIndex: 1000,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="sidebar-menu"
        style={{ 
          padding: '12px',
        }}
      >
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="sidebar-menu-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              padding: isHovered ? '10px 12px' : '10px 0',
              
              color: location.pathname === item.path ? '#886128' : '#886128', // ← текст всегда #886128
              backgroundColor: location.pathname === item.path ? '#FFFAF4' : 'transparent', // ← активная кнопка
              borderRadius: '8px',
              transition: 'all 0.2s ease',
              justifyContent: isHovered ? 'flex-start' : 'center',
              minHeight: '30px',
            }}
            onMouseEnter={(e) => {
              if (location.pathname !== item.path) {
                e.currentTarget.style.backgroundColor = '#FFF4E5';
              }
            }}
            onMouseLeave={(e) => {
              if (location.pathname !== item.path) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <div style={{
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: isHovered ? '12px' : '0',
              flexShrink: 0,
              transition: 'margin-right 0.3s ease',
              backgroundColor: location.pathname === item.path ? '#FFF4E5' : '#F9E5C8',
              borderRadius: '6px',
            }}>
              {item.icon ? (
                <img 
                  src={item.icon} 
                  alt={item.label}
                  style={{ 
                    width: '20px', 
                    height: '20px',
                  }}
                />
              ) : (
                <span style={{ fontSize: '16px' }}>
                  {getIconContent(item.label)}
                </span>
              )}
            </div>
            
            {isHovered && (
              <span style={{
                fontSize: '15px', // ← чуть крупнее
                fontWeight: location.pathname === item.path ? '600' : '500',
                opacity: 1,
                whiteSpace: 'nowrap',
                color: '#886128', // ← цвет текста
              }}>
                {item.label}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;