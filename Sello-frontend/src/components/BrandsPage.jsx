import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

import BrandsIcon from "../assets/icon/brands-icon.svg";
import EditIcon from "../assets/icon/edit-icon.svg";
import DeleteIcon from "../assets/icon/delete-icon.svg";
import PlusIcon from "../assets/icon/plus-icon.svg";
import PlusImageIcon from "../assets/icon/plus-image-icon.svg";

const BrandsPage = () => {
  const [isAddingBrand, setIsAddingBrand] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    category: "",
    logo: null,
    description: "",
  });

  const [brands, setBrands] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFormData((prev) => ({ ...prev, logo: e.target.files[0] }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingBrand) {
      setBrands(
        brands.map((brand) =>
          brand.id === editingBrand.id ? { ...brand, ...formData } : brand
        )
      );
      setEditingBrand(null);
    } else {
      const newBrand = {
        id: Date.now(),
        ...formData,
      };
      setBrands([...brands, newBrand]);
    }

    setFormData({
      name: "",
      country: "",
      category: "",
      logo: null,
      description: "",
    });
    setIsAddingBrand(false);
  };

  const handleDeleteBrand = (id) => {
    setBrands(brands.filter((brand) => brand.id !== id));
  };

  const handleEditBrand = (brand) => {
    setEditingBrand(brand);
    setFormData({
      name: brand.name,
      country: brand.country,
      category: brand.category,
      logo: brand.logo || null,
      description: brand.description,
    });
    setIsAddingBrand(true);
  };

  {
    /* Если в режиме добавления/редактирования — показываем форму */
  }
  if (isAddingBrand) {
    return (
      <div className="brands-page-container">
        <Header />
        <div className="main-content-wrapper">
          <Sidebar />
          <main className="brands-content-main">
            <div className="container-fluid p-4">
              <div className="d-flex justify-content-center align-items-center mb-4">
                <img
                  src={BrandsIcon}
                  alt="Бренды"
                  className="brands-title-icon me-2"
                />
                <h2 className="brands-main-title text-center">БРЕНДЫ</h2>
              </div>

              <h3 className="brands-subtitle mb-4 ms-4">
                {editingBrand ? "Редактировать бренд" : "Добавить новый бренд"}
              </h3>

              {/* Форма */}
              <form onSubmit={handleSubmit} className="brands-form">
                <div className="row align-items-start d-flex justify-content-between">
                  <div className="col-md-3">
                    <label className="form-label">
                      {editingBrand
                        ? "Изменить название бренда:"
                        : "Название бренда:"}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Введите название..."
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Страна:</label>
                    <select
                      className="form-select"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Выберите</option>
                      <option value="Россия">Россия</option>
                      <option value="США">США</option>
                      <option value="Германия">Германия</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Категория бренда:</label>
                    <select
                      className="form-select"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Выберите</option>
                      <option value="Электроника">Электроника</option>
                      <option value="Одежда">Одежда</option>
                      <option value="Продукты">Продукты</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3 mt-4">
                  <label className="form-label">
                    {editingBrand ? "Изменить логотип:" : "Добавить логотип:"}
                  </label>
                  <div className="d-flex align-items-center">
                    <button
                      type="button"
                      className="btn brands-file-btn d-flex align-items-center"
                      onClick={() =>
                        document.getElementById("logoInput").click()
                      }
                    >
                      <img
                        src={PlusImageIcon}
                        alt="Прикрепить"
                        className="brands-file-icon me-2"
                      />
                      Прикрепить изображение
                    </button>
                    <input
                      id="logoInput"
                      type="file"
                      accept="image/*"
                      className="brands-file-input"
                      onChange={handleFileChange}
                    />
                    <span className="brands-file-name text-muted ms-2">
                      {formData.logo
                        ? formData.logo.name
                        : "Медиафайлы не выбраны"}
                    </span>
                  </div>
                </div>

                <div className="mb-5 mt-5">
                  <label className="form-label">
                    {editingBrand ? "Изменить описание:" : "Описание бренда:"}
                  </label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="5"
                    placeholder="Введите описание..."
                  ></textarea>
                </div>

                {/* Кнопки в зависимости от режима */}
                {editingBrand ? (
                  // В режиме редактирования - кнопка "Сохранить" в правом углу
                  <div className="d-flex justify-content-end">
                    <button
                      type="submit"
                      className="btn btn-primary px-4 brands-submit-btn"
                    >
                      Сохранить
                    </button>
                  </div>
                ) : (
                  // В режиме добавления - кнопка "Готово" посередине
                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-primary px-5 brands-submit-btn"
                    >
                      Готово
                    </button>
                  </div>
                )}
              </form>
            </div>
          </main>
        </div>
      </div>
    );
  }

  {
    /* Иначе — показываем список брендов */
  }
  return (
    <div className="brands-page-container">
      <Header />
      <div className="main-content-wrapper">
        <Sidebar />
        <main className="brands-content-main">
          <div className="container-fluid p-4">
            {/* Заголовок "Бренды" с иконкой по центру */}
            <div className="brands-header d-flex align-items-center justify-content-center mb-4">
              <img
                src={BrandsIcon}
                alt="Бренды"
                className="brands-title-icon me-3"
              />
              <h2 className="brands-main-title">БРЕНДЫ</h2>
            </div>

            {/* Форма фильтрации */}
            <div className="brands-filter-section p-3 rounded mb-4">
              <div className="row g-3 d-flex align-items-center justify-content-around">
                <div className="col-md-3">
                  <label className="form-label">Название бренда:</label>
                  <select
                    className="form-select"
                    style={{
                      borderRadius: "8px",
                      borderColor: "#AA8144",
                    }}
                  >
                    <option>Выберите</option>
                    {brands.map((brand) => (
                      <option key={brand.id}>{brand.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label">Страна:</label>
                  <select
                    className="form-select"
                    style={{
                      borderRadius: "8px",
                      borderColor: "#AA8144",
                    }}
                  >
                    <option>Выберите</option>
                    <option>Россия</option>
                    <option>США</option>
                    <option>Германия</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label">Категория товаров:</label>
                  <select
                    className="form-select"
                    style={{
                      borderRadius: "8px",
                      borderColor: "#AA8144",
                    }}
                  >
                    <option>Выберите</option>
                    <option>Электроника</option>
                    <option>Одежда</option>
                    <option>Продукты</option>
                  </select>
                </div>
              </div>
              <div className="brands-filter-actions mt-3 d-flex align-items-center justify-content-between">
                <button
                  className="btn brands-add-btn d-flex align-items-center justify-content-center"
                  onClick={() => setIsAddingBrand(true)}
                  style={{
                    borderRadius: "20px",
                    marginLeft: "45px",
                  }}
                >
                  <img
                    src={PlusIcon}
                    alt="Добавить"
                    style={{
                      width: "18px",
                      height: "18px",
                      marginRight: "10px",
                    }}
                  />
                  Добавить бренд
                </button>
                <button
                  className="btn btn-primary brands-search-btn"
                  style={{ marginRight: "45px" }}
                >
                  Поиск
                </button>
              </div>
            </div>

            {/* Таблица брендов */}
            <div className="brands-table-container">
              <table className="brands-table">
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Название бренда</th>
                    <th>Страна</th>
                    <th>Категория</th>
                    <th>Опции</th>
                  </tr>
                </thead>
                <tbody>
                  {brands.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4 brands-empty">
                        Нет брендов. Нажмите "+ Добавить бренд".
                      </td>
                    </tr>
                  ) : (
                    brands.map((brand, index) => (
                      <tr key={brand.id} className="brands-table-row">
                        <td className="brands-table-cell">{index + 1}</td>
                        <td className="brands-table-cell">
                          <img
                            src={
                              brand.logo
                                ? URL.createObjectURL(brand.logo)
                                : "https://via.placeholder.com/24x24?text=logo"
                            }
                            alt="Логотип"
                            className="brands-logo me-2"
                          />
                          {brand.name}
                        </td>
                        <td className="brands-table-cell">{brand.country}</td>
                        <td className="brands-table-cell">{brand.category}</td>
                        <td className="brands-table-cell brands-actions">
                          {/* Обёртка для выравнивания по центру */}
                          <div className="d-flex justify-content-center gap-1">
                            <button
                              className="brands-edit-btn"
                              onClick={() => handleEditBrand(brand)}
                            >
                              <img
                                src={EditIcon}
                                alt="Изменить"
                                className="brands-action-icon"
                              />
                              &nbsp;Изменить
                            </button>
                            <button
                              className="brands-delete-btn"
                              onClick={() => handleDeleteBrand(brand.id)}
                            >
                              <img
                                src={DeleteIcon}
                                alt="Удалить"
                                className="brands-action-icon"
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BrandsPage;
