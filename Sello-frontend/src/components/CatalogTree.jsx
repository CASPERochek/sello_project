// import { useState } from "react";
// import Header from "./Header";
// import Sidebar from "./Sidebar";
// import CatalogIcon from "../assets/icon/catalog-icon.svg";
// import ellipseNullIcon from "../assets/icon/ellipse-null.svg";
// import ellipseIcon from "../assets/icon/ellipse.svg";
// import plusIconBrown from "../assets/icon/plus-icon-brown.svg";

// // Иконки для категорий
// import GroundIcon from "../assets/icon/ground-icon.svg";
// import InventoryIcon from "../assets/icon/inventory-icon.svg";
// import EquipmentIcon from "../assets/icon/equipment-icon.svg";
// import ClothesIcon from "../assets/icon/clothes-icon.svg";
// import SeedlingsIcon from "../assets/icon/seedlings-icon.svg";
// import SeedsIcon from "../assets/icon/seeds-icon.svg";
// import AgricultureTechnicIcon from "../assets/icon/agriculture-technic-icon.svg";
// import PlantProtectionIcon from "../assets/icon/plant-protection-icon.svg";
// import FertilizerIcon from "../assets/icon/fertilizer-icon.svg";
// import FarmProductIcon from "../assets/icon/farm-product-icon.svg";

// const CatalogTree = () => {
//   // Иконки для категорий
//   const categoryIcons = {
//     1: GroundIcon,
//     2: InventoryIcon,
//     3: EquipmentIcon,
//     4: ClothesIcon,
//     5: SeedlingsIcon,
//     6: SeedsIcon,
//     7: AgricultureTechnicIcon,
//     8: PlantProtectionIcon,
//     9: FertilizerIcon,
//     10: FarmProductIcon
//   };

//   // Структура категорий и подкатегорий
//   const [catalogData, setCatalogData] = useState([
//     {
//       id: 1,
//       name: "Грунты и субстраты",
//       subcategories: [
//         { id: 101, name: "Кокосовый субстрат" },
//         { id: 102, name: "Перлит/Вермикулит" },
//         { id: 103, name: "Специализированные грунты" },
//         { id: 104, name: "Торф и кора" },
//         { id: 105, name: "Универсальные грунты" },
//       ],
//     },
//     {
//       id: 2,
//       name: "Инвентарь и аксессуары",
//       subcategories: [
//         { id: 201, name: "Ручной инструмент" },
//         { id: 202, name: "Садовый инструмент" },
//         { id: 203, name: "Системы хранения" },
//         { id: 204, name: "Средства ухода" },
//         { id: 205, name: "Тележки и тачки" },
//       ],
//     },
//     {
//       id: 3,
//       name: "Оборудование для хозяйства",
//       subcategories: [
//         { id: 301, name: "Оборудование для хранения" },
//         { id: 302, name: "Оборудование для переработки" },
//         { id: 303, name: "Системы полива" },
//         { id: 304, name: "Теплицы и парники" },
//       ],
//     },
//     {
//       id: 4,
//       name: "Саженцы и Луковицы",
//       subcategories: [
//         { id: 401, name: "Виноградные сорта" },
//         { id: 402, name: "Технические сорта" },
//         { id: 403, name: "Деревья и кустарники лиственные" },
//         { id: 404, name: "Деревья и кустарники хвойные" },
//         { id: 405, name: "Луковицы и клубни весенние" },
//         { id: 406, name: "Луковицы и клубни летние" },
//         { id: 407, name: "Луковицы и клубни осенние" },
//         { id: 408, name: "Многолетние цветы" },
//         { id: 409, name: "Плодовые деревья косточковые" },
//         { id: 410, name: "Плодовые деревья семечковые" },
//         { id: 411, name: "Розы плетистые" },
//         { id: 412, name: "Розы почвопокровные" },
//         { id: 413, name: "Розы чайно-гибридные" },
//         { id: 414, name: "Аграрные кустарники" },
//       ],
//     },
//     {
//       id: 5,
//       name: "Семена",
//       subcategories: [
//         { id: 501, name: "Бобовые" },
//         { id: 502, name: "Зерновые" },
//         { id: 503, name: "Капустные" },
//         { id: 504, name: "Кормовые травы" },
//         { id: 505, name: "Корнеплоды" },
//         { id: 506, name: "Листовые и зеленые" },
//         { id: 507, name: "Масличные" },
//         { id: 508, name: "Пасленовые" },
//         { id: 509, name: "Спецкультуры" },
//         { id: 510, name: "Смеси для газона" },
//         { id: 511, name: "Тыквенные" },
//         { id: 512, name: "Фруктовые деревья" },
//         { id: 513, name: "Цветочные луковичные" },
//         { id: 514, name: "Цветы многолетние" },
//         { id: 515, name: "Цветы однолетние" },
//         { id: 516, name: "Ягоды" },
//       ],
//     },
//     {
//       id: 6,
//       name: "Одежда и Обувь",
//       subcategories: [
//         { id: 601, name: "Защитные аксессуары" },
//         { id: 602, name: "Одежда в народном стиле" },
//         { id: 603, name: "Рабочая одежда" },
//         { id: 604, name: "Специальная обувь" },
//       ],
//     },
//     {
//       id: 7,
//       name: "Сельхозтехника",
//       subcategories: [
//         { id: 701, name: "Малая техника для сада" },
//         { id: 702, name: "Малая техника для огорода" },
//         { id: 703, name: "Техника для переработки" },
//       ],
//     },
//     {
//       id: 8,
//       name: "Средства защиты растений",
//       subcategories: [
//         { id: 801, name: "Гербициды (от сорняков)" },
//         { id: 802, name: "Инсектициды (от вредителей)" },
//         { id: 803, name: "Протравители семян" },
//         { id: 804, name: "Фунгициды (от болезней)" },
//       ],
//     },
//     {
//       id: 9,
//       name: "Удобрения",
//       subcategories: [
//         { id: 901, name: "Биопрепараты" },
//         { id: 902, name: "Водорастворимые удобрения" },
//         { id: 903, name: "Кладовые удобрения" },
//         { id: 904, name: "Минеральные удобрения" },
//         { id: 905, name: "Микроудобрения" },
//         { id: 906, name: "Органические удобрения" },
//         { id: 907, name: "Стимуляторы роста" },
//       ],
//     },
//     {
//       id: 10,
//       name: "Фермерские продукты",
//       subcategories: [
//         { id: 1001, name: "Вакансии" },
//         { id: 1002, name: "Консервация" },
//         { id: 1003, name: "Молочная продукция" },
//         { id: 1004, name: "Мясо и птица" },
//         { id: 1005, name: "Сорго" },
//         { id: 1006, name: "Свежие овощи и фрукты" },
//         { id: 1007, name: "Эко-продукты" },
//       ],
//     },
//   ]);

//   // Состояния
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedSubcategory, setSelectedSubcategory] = useState(null);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [newSubcategoryName, setNewSubcategoryName] = useState("");
//   const [editSubcategoryName, setEditSubcategoryName] = useState("");

//   // Функция для выбора категории
//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//     setSelectedSubcategory(null);
//     setEditSubcategoryName("");
//   };

//   // Функция для выбора подкатегории
//   const handleSubcategoryClick = (subcategory) => {
//     setSelectedSubcategory(subcategory);
//     setEditSubcategoryName(subcategory.name);
//   };

//   // Функция для добавления новой подкатегории
//   const handleAddSubcategory = () => {
//     if (!selectedCategory || !newSubcategoryName.trim()) return;

//     const newSubcategory = {
//       id: Date.now(),
//       name: newSubcategoryName.trim()
//     };

//     const updatedCatalogData = catalogData.map(category => {
//       if (category.id === selectedCategory.id) {
//         return {
//           ...category,
//           subcategories: [...category.subcategories, newSubcategory]
//         };
//       }
//       return category;
//     });

//     setCatalogData(updatedCatalogData);
    
//     // Обновляем выбранную категорию
//     const updatedCategory = {
//       ...selectedCategory,
//       subcategories: [...selectedCategory.subcategories, newSubcategory]
//     };
//     setSelectedCategory(updatedCategory);
    
//     setNewSubcategoryName("");
//     setShowAddModal(false);
//   };

//   // Функция для редактирования подкатегории
//   const handleEditSubcategory = () => {
//     if (!selectedSubcategory || !editSubcategoryName.trim()) return;

//     const updatedCatalogData = catalogData.map(category => {
//       if (category.id === selectedCategory.id) {
//         return {
//           ...category,
//           subcategories: category.subcategories.map(sub => 
//             sub.id === selectedSubcategory.id 
//               ? { ...sub, name: editSubcategoryName.trim() }
//               : sub
//           )
//         };
//       }
//       return category;
//     });

//     setCatalogData(updatedCatalogData);
    
//     // Обновляем выбранную подкатегорию
//     const updatedSubcategory = {
//       ...selectedSubcategory,
//       name: editSubcategoryName.trim()
//     };
//     setSelectedSubcategory(updatedSubcategory);
    
//     // Обновляем выбранную категорию
//     const updatedCategory = updatedCatalogData.find(cat => cat.id === selectedCategory.id);
//     setSelectedCategory(updatedCategory);
//   };

//   // Функция для удаления подкатегории
//   const handleDeleteSubcategory = () => {
//     if (!selectedSubcategory) return;

//     const updatedCatalogData = catalogData.map(category => {
//       if (category.id === selectedCategory.id) {
//         return {
//           ...category,
//           subcategories: category.subcategories.filter(sub => sub.id !== selectedSubcategory.id)
//         };
//       }
//       return category;
//     });

//     setCatalogData(updatedCatalogData);
    
//     // Обновляем выбранную категорию
//     const updatedCategory = updatedCatalogData.find(cat => cat.id === selectedCategory.id);
//     setSelectedCategory(updatedCategory);
    
//     // Сбрасываем выбранную подкатегорию
//     setSelectedSubcategory(null);
//     setEditSubcategoryName("");
//   };

//   return (
//     <div className="catalog-page-container">
//       <Header />
//       <div className="main-content-wrapper">
//         <Sidebar />
//         <div className="catalog-content-main">
//           {/* Заголовок страницы */}
//           <div className="container-fluid py-3 px-0">
//             <div className="row align-items-center justify-content-center mb-4">
//               <div className="col-auto">
//                 <div className="d-flex align-items-center justify-content-center">
//                   <img 
//                     src={CatalogIcon} 
//                     alt="Дерево каталога" 
//                     className="me-3" 
//                     style={{ width: "40px", height: "40px" }}
//                   />
//                   <h2 className="catalog-main-title text-center mb-0">ДЕРЕВО КАТАЛОГА</h2>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="container-fluid py-4 px-0">
//             <div className="row gx-5">
//               {/* Левая колонка - Главные категории */}
//               <div className="col-md-4">
//                 <div className="categories-table">
//                   <div className="p-0">
//                     <ul className="list-group list-group-flush">
//                       {catalogData.map((category) => (
//                         <li
//                           key={category.id}
//                           className={`list-group-item category-item ${
//                             selectedCategory?.id === category.id ? "selected-category" : ""
//                           }`}
//                           onClick={() => handleCategoryClick(category)}
//                         >
//                           <img
//                             src={categoryIcons[category.id]}
//                             alt={category.name}
//                             className="me-3 category-icon"
//                           />
//                           <span className="category-name">{category.name}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               </div>

//               {/* Центральная колонка - Подкатегории */}
//               <div className="col-md-3">
//                 {selectedCategory ? (
//                   <div className="subcategories-table">
//                     <div className="subcategories-header p-3">
//                       <h5 className="text-center mb-0">Подкатегории</h5>
//                     </div>
//                     <div className="subcategories-list">
//                       <ul className="list-group list-group-flush">
//                         {selectedCategory.subcategories.map((sub, index) => (
//                           <li
//                             key={sub.id}
//                             className={`list-group-item subcategory-item ${
//                               selectedSubcategory?.id === sub.id ? "selected-subcategory" : ""
//                             } ${index % 2 === 0 ? 'odd-row' : 'even-row'}`}
//                             onClick={() => handleSubcategoryClick(sub)}
//                           >
//                             <img
//                               src={selectedSubcategory?.id === sub.id ? ellipseIcon : ellipseNullIcon}
//                               alt=""
//                               className="me-2 subcategory-icon"
//                             />
//                             <span className="subcategory-name">{sub.name}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                     <div className="add-subcategory-btn-container">
//                       <button
//                         className="btn add-subcategory-btn w-100 d-flex align-items-center justify-content-center"
//                         onClick={() => setShowAddModal(true)}
//                       >
//                         <img src={plusIconBrown} alt="+" className="me-2" />
//                         Добавить подкатегорию
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="d-flex flex-column align-items-center justify-content-center h-100 py-5 categories-placeholder">
//                     <p className="text-muted">Выберите категорию слева</p>
//                   </div>
//                 )}
//               </div>

//               {/* Правая колонка - Редактирование и Удаление */}
//               <div className="col-md-5">
//                 {selectedSubcategory ? (
//                   <div className="edit-delete-container">
//                     <div className="edit-section mb-4 p-4 text-center">
//                       <h5 className="text-dark-brown mb-3">Редактировать подкатегорию</h5>
//                       <div className="mb-3">
//                         <label className="form-label">Измените название подкатегории:</label>
//                         <input
//                           type="text"
//                           className="form-control text-center"
//                           placeholder="Введите название..."
//                           value={editSubcategoryName}
//                           onChange={(e) => setEditSubcategoryName(e.target.value)}
//                         />
//                       </div>
//                       <div className="text-center">
//                         <button
//                           className="btn edit-btn"
//                           onClick={handleEditSubcategory}
//                         >
//                           Сохранить
//                         </button>
//                       </div>
//                     </div>

//                     <div className="spacing"></div>

//                     <div className="delete-section p-4 text-center">
//                       <h5 className="text-dark-brown mb-3">Удалить подкатегорию</h5>
//                       <div className="mb-3">
//                         <label className="form-label">Название подкатегории:</label>
//                         <div className="selected-subcategory-display p-2 bg-white rounded">
//                           {selectedSubcategory.name}
//                         </div>
//                       </div>
//                       <div className="text-center">
//                         <button
//                           className="btn delete-btn"
//                           onClick={handleDeleteSubcategory}
//                         >
//                           Удалить
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="d-flex flex-column align-items-center justify-content-center h-100 py-5 categories-placeholder">
//                     <p className="text-muted">Выберите подкатегорию слева</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Модальное окно для добавления подкатегории */}
//           {showAddModal && (
//             <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
//               <div className="modal-content-wrapper" onClick={(e) => e.stopPropagation()}>
//                 <div className="add-subcategory-modal">
//                   <div className="modal-header text-center">
//                     <h5 className="modal-title w-100">Добавить подкатегорию</h5>
//                     <button
//                       type="button"
//                       className="btn-close"
//                       onClick={() => setShowAddModal(false)}
//                     ></button>
//                   </div>
//                   <div className="modal-body">
//                     <div className="mb-3">
//                       <label className="form-label text-center w-100">Название подкатегории:</label>
//                       <input
//                         type="text"
//                         className="form-control text-center"
//                         placeholder="Введите название..."
//                         value={newSubcategoryName}
//                         onChange={(e) => setNewSubcategoryName(e.target.value)}
//                         onKeyPress={(e) => e.key === 'Enter' && handleAddSubcategory()}
//                       />
//                     </div>
//                   </div>
//                   <div className="modal-footer justify-content-center">
//                     <button
//                       type="button"
//                       className="btn done-btn"
//                       onClick={handleAddSubcategory}
//                       disabled={!newSubcategoryName.trim()}
//                     >
//                       Готово
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CatalogTree;







import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import CatalogIcon from "../assets/icon/catalog-icon.svg";
import ellipseNullIcon from "../assets/icon/ellipse-null.svg";
import ellipseIcon from "../assets/icon/ellipse.svg";
import plusIconBrown from "../assets/icon/plus-icon-brown.svg";

// Иконки для категорий
import GroundIcon from "../assets/icon/ground-icon.svg";
import InventoryIcon from "../assets/icon/inventory-icon.svg";
import EquipmentIcon from "../assets/icon/equipment-icon.svg";
import ClothesIcon from "../assets/icon/clothes-icon.svg";
import SeedlingsIcon from "../assets/icon/seedlings-icon.svg";
import SeedsIcon from "../assets/icon/seeds-icon.svg";
import AgricultureTechnicIcon from "../assets/icon/agriculture-technic-icon.svg";
import PlantProtectionIcon from "../assets/icon/plant-protection-icon.svg";
import FertilizerIcon from "../assets/icon/fertilizer-icon.svg";
import FarmProductIcon from "../assets/icon/farm-product-icon.svg";

const CatalogTree = () => {
  // Иконки для категорий
  const categoryIcons = {
    1: GroundIcon,
    2: InventoryIcon,
    3: EquipmentIcon,
    4: ClothesIcon,
    5: SeedlingsIcon,
    6: SeedsIcon,
    7: AgricultureTechnicIcon,
    8: PlantProtectionIcon,
    9: FertilizerIcon,
    10: FarmProductIcon
  };

  // Структура категорий и подкатегорий
  const [catalogData, setCatalogData] = useState([
    {
      id: 1,
      name: "Грунты и субстраты",
      subcategories: [
        { id: 101, name: "Кокосовый субстрат" },
        { id: 102, name: "Перлит/Вермикулит" },
        { id: 103, name: "Специализированные грунты" },
        { id: 104, name: "Торф и кора" },
        { id: 105, name: "Универсальные грунты" },
      ],
    },
    {
      id: 2,
      name: "Инвентарь и аксессуары",
      subcategories: [
        { id: 201, name: "Ручной инструмент" },
        { id: 202, name: "Садовый инструмент" },
        { id: 203, name: "Системы хранения" },
        { id: 204, name: "Средства ухода" },
        { id: 205, name: "Тележки и тачки" },
      ],
    },
    {
      id: 3,
      name: "Оборудование для хозяйства",
      subcategories: [
        { id: 301, name: "Оборудование для хранения" },
        { id: 302, name: "Оборудование для переработки" },
        { id: 303, name: "Системы полива" },
        { id: 304, name: "Теплицы и парники" },
      ],
    },
    {
      id: 4,
      name: "Саженцы и Луковицы",
      subcategories: [
        { id: 401, name: "Виноградные сорта" },
        { id: 402, name: "Технические сорта" },
        { id: 403, name: "Деревья и кустарники лиственные" },
        { id: 404, name: "Деревья и кустарники хвойные" },
        { id: 405, name: "Луковицы и клубни весенние" },
        { id: 406, name: "Луковицы и клубни летние" },
        { id: 407, name: "Луковицы и клубни осенние" },
        { id: 408, name: "Многолетние цветы" },
        { id: 409, name: "Плодовые деревья косточковые" },
        { id: 410, name: "Плодовые деревья семечковые" },
        { id: 411, name: "Розы плетистые" },
        { id: 412, name: "Розы почвопокровные" },
        { id: 413, name: "Розы чайно-гибридные" },
        { id: 414, name: "Аграрные кустарники" },
      ],
    },
    {
      id: 5,
      name: "Семена",
      subcategories: [
        { id: 501, name: "Бобовые" },
        { id: 502, name: "Зерновые" },
        { id: 503, name: "Капустные" },
        { id: 504, name: "Кормовые травы" },
        { id: 505, name: "Корнеплоды" },
        { id: 506, name: "Листовые и зеленые" },
        { id: 507, name: "Масличные" },
        { id: 508, name: "Пасленовые" },
        { id: 509, name: "Спецкультуры" },
        { id: 510, name: "Смеси для газона" },
        { id: 511, name: "Тыквенные" },
        { id: 512, name: "Фруктовые деревья" },
        { id: 513, name: "Цветочные луковичные" },
        { id: 514, name: "Цветы многолетние" },
        { id: 515, name: "Цветы однолетние" },
        { id: 516, name: "Ягоды" },
      ],
    },
    {
      id: 6,
      name: "Одежда и Обувь",
      subcategories: [
        { id: 601, name: "Защитные аксессуары" },
        { id: 602, name: "Одежда в народном стиле" },
        { id: 603, name: "Рабочая одежда" },
        { id: 604, name: "Специальная обувь" },
      ],
    },
    {
      id: 7,
      name: "Сельхозтехника",
      subcategories: [
        { id: 701, name: "Малая техника для сада" },
        { id: 702, name: "Малая техника для огорода" },
        { id: 703, name: "Техника для переработки" },
      ],
    },
    {
      id: 8,
      name: "Средства защиты растений",
      subcategories: [
        { id: 801, name: "Гербициды (от сорняков)" },
        { id: 802, name: "Инсектициды (от вредителей)" },
        { id: 803, name: "Протравители семян" },
        { id: 804, name: "Фунгициды (от болезней)" },
      ],
    },
    {
      id: 9,
      name: "Удобрения",
      subcategories: [
        { id: 901, name: "Биопрепараты" },
        { id: 902, name: "Водорастворимые удобрения" },
        { id: 903, name: "Кладовые удобрения" },
        { id: 904, name: "Минеральные удобрения" },
        { id: 905, name: "Микроудобрения" },
        { id: 906, name: "Органические удобрения" },
        { id: 907, name: "Стимуляторы роста" },
      ],
    },
    {
      id: 10,
      name: "Фермерские продукты",
      subcategories: [
        { id: 1001, name: "Вакансии" },
        { id: 1002, name: "Консервация" },
        { id: 1003, name: "Молочная продукция" },
        { id: 1004, name: "Мясо и птица" },
        { id: 1005, name: "Сорго" },
        { id: 1006, name: "Свежие овощи и фрукты" },
        { id: 1007, name: "Эко-продукты" },
      ],
    },
  ]);

  // Состояния
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSubcategoryName, setNewSubcategoryName] = useState("");
  const [editSubcategoryName, setEditSubcategoryName] = useState("");

  // Функция для выбора категории
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
    setEditSubcategoryName("");
  };

  // Функция для выбора подкатегории
  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setEditSubcategoryName(subcategory.name);
  };

  // Функция для добавления новой подкатегории
  const handleAddSubcategory = () => {
    if (!selectedCategory || !newSubcategoryName.trim()) return;

    const newSubcategory = {
      id: Date.now(),
      name: newSubcategoryName.trim()
    };

    const updatedCatalogData = catalogData.map(category => {
      if (category.id === selectedCategory.id) {
        return {
          ...category,
          subcategories: [...category.subcategories, newSubcategory]
        };
      }
      return category;
    });

    setCatalogData(updatedCatalogData);
    
    // Обновляем выбранную категорию
    const updatedCategory = {
      ...selectedCategory,
      subcategories: [...selectedCategory.subcategories, newSubcategory]
    };
    setSelectedCategory(updatedCategory);
    
    setNewSubcategoryName("");
    setShowAddModal(false);
  };

  // Функция для редактирования подкатегории
  const handleEditSubcategory = () => {
    if (!selectedSubcategory || !editSubcategoryName.trim()) return;

    const updatedCatalogData = catalogData.map(category => {
      if (category.id === selectedCategory.id) {
        return {
          ...category,
          subcategories: category.subcategories.map(sub => 
            sub.id === selectedSubcategory.id 
              ? { ...sub, name: editSubcategoryName.trim() }
              : sub
          )
        };
      }
      return category;
    });

    setCatalogData(updatedCatalogData);
    
    // Обновляем выбранную подкатегорию
    const updatedSubcategory = {
      ...selectedSubcategory,
      name: editSubcategoryName.trim()
    };
    setSelectedSubcategory(updatedSubcategory);
    
    // Обновляем выбранную категорию
    const updatedCategory = updatedCatalogData.find(cat => cat.id === selectedCategory.id);
    setSelectedCategory(updatedCategory);
  };

  // Функция для удаления подкатегории
  const handleDeleteSubcategory = () => {
    if (!selectedSubcategory) return;

    const updatedCatalogData = catalogData.map(category => {
      if (category.id === selectedCategory.id) {
        return {
          ...category,
          subcategories: category.subcategories.filter(sub => sub.id !== selectedSubcategory.id)
        };
      }
      return category;
    });

    setCatalogData(updatedCatalogData);
    
    // Обновляем выбранную категорию
    const updatedCategory = updatedCatalogData.find(cat => cat.id === selectedCategory.id);
    setSelectedCategory(updatedCategory);
    
    // Сбрасываем выбранную подкатегорию
    setSelectedSubcategory(null);
    setEditSubcategoryName("");
  };

  return (
    <div className="catalog-page-container">
      <Header />
      <div className="container-fluid p-0">
        <div className="row g-0">
          {/* Sidebar */}
          <div className="col-auto" style={{ width: '70px', flexShrink: 0 }}>
            <Sidebar />
          </div>
          
          {/* Main Content */}
          <div className="col" style={{ overflowX: 'hidden' }}>
            <div className="catalog-content-main">
              {/* Заголовок страницы */}
              <div className="container-fluid py-3 px-0">
                <div className="row align-items-center justify-content-center mb-4">
                  <div className="col-auto">
                    <div className="d-flex align-items-center justify-content-center">
                      <img 
                        src={CatalogIcon} 
                        alt="Дерево каталога" 
                        className="me-3" 
                        style={{ width: "40px", height: "40px" }}
                      />
                      <h2 className="catalog-main-title text-center mb-0">ДЕРЕВО КАТАЛОГА</h2>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container-fluid py-4 px-0">
                <div className="row gx-5">
                  {/* Левая колонка - Главные категории */}
                  <div className="col-md-4">
                    <div className="categories-table">
                      <div className="p-0">
                        <ul className="list-group list-group-flush">
                          {catalogData.map((category) => (
                            <li
                              key={category.id}
                              className={`list-group-item category-item ${
                                selectedCategory?.id === category.id ? "selected-category" : ""
                              }`}
                              onClick={() => handleCategoryClick(category)}
                            >
                              <img
                                src={categoryIcons[category.id]}
                                alt={category.name}
                                className="me-3 category-icon"
                              />
                              <span className="category-name">{category.name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Центральная колонка - Подкатегории */}
                  <div className="col-md-3">
                    {selectedCategory ? (
                      <div className="subcategories-table">
                        <div className="subcategories-header p-3">
                          <h5 className="text-center mb-0">Подкатегории</h5>
                        </div>
                        <div className="subcategories-list">
                          <ul className="list-group list-group-flush">
                            {selectedCategory.subcategories.map((sub, index) => (
                              <li
                                key={sub.id}
                                className={`list-group-item subcategory-item ${
                                  selectedSubcategory?.id === sub.id ? "selected-subcategory" : ""
                                } ${index % 2 === 0 ? 'odd-row' : 'even-row'}`}
                                onClick={() => handleSubcategoryClick(sub)}
                              >
                                <img
                                  src={selectedSubcategory?.id === sub.id ? ellipseIcon : ellipseNullIcon}
                                  alt=""
                                  className="me-2 subcategory-icon"
                                />
                                <span className="subcategory-name">{sub.name}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="add-subcategory-btn-container">
                          <button
                            className="btn add-subcategory-btn w-100 d-flex align-items-center justify-content-center"
                            onClick={() => setShowAddModal(true)}
                          >
                            <img src={plusIconBrown} alt="+" className="me-2" />
                            Добавить подкатегорию
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="d-flex flex-column align-items-center justify-content-center h-100 py-5 categories-placeholder">
                        <p className="text-muted">Выберите категорию слева</p>
                      </div>
                    )}
                  </div>

                  {/* Правая колонка - Редактирование и Удаление */}
                  <div className="col-md-5">
                    {selectedSubcategory ? (
                      <div className="edit-delete-container">
                        <div className="edit-section mb-4 p-4 text-center">
                          <h5 className="text-dark-brown mb-3">Редактировать подкатегорию</h5>
                          <div className="mb-3">
                            <label className="form-label">Измените название подкатегории:</label>
                            <input
                              type="text"
                              className="form-control text-center"
                              placeholder="Введите название..."
                              value={editSubcategoryName}
                              onChange={(e) => setEditSubcategoryName(e.target.value)}
                            />
                          </div>
                          <div className="text-center">
                            <button
                              className="btn edit-btn"
                              onClick={handleEditSubcategory}
                            >
                              Сохранить
                            </button>
                          </div>
                        </div>

                        <div className="spacing"></div>

                        <div className="delete-section p-4 text-center">
                          <h5 className="text-dark-brown mb-3">Удалить подкатегорию</h5>
                          <div className="mb-3">
                            <label className="form-label">Название подкатегории:</label>
                            <div className="selected-subcategory-display p-2 bg-white rounded">
                              {selectedSubcategory.name}
                            </div>
                          </div>
                          <div className="text-center">
                            <button
                              className="btn delete-btn"
                              onClick={handleDeleteSubcategory}
                            >
                              Удалить
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="d-flex flex-column align-items-center justify-content-center h-100 py-5 categories-placeholder">
                        <p className="text-muted">Выберите подкатегорию слева</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Модальное окно для добавления подкатегории */}
              {showAddModal && (
                <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
                  <div className="modal-content-wrapper" onClick={(e) => e.stopPropagation()}>
                    <div className="add-subcategory-modal">
                      <div className="modal-header text-center">
                        <h5 className="modal-title w-100">Добавить подкатегорию</h5>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={() => setShowAddModal(false)}
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="mb-3">
                          <label className="form-label text-center w-100">Название подкатегории:</label>
                          <input
                            type="text"
                            className="form-control text-center"
                            placeholder="Введите название..."
                            value={newSubcategoryName}
                            onChange={(e) => setNewSubcategoryName(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddSubcategory()}
                          />
                        </div>
                      </div>
                      <div className="modal-footer justify-content-center">
                        <button
                          type="button"
                          className="btn done-btn"
                          onClick={handleAddSubcategory}
                          disabled={!newSubcategoryName.trim()}
                        >
                          Готово
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogTree;


