// src/components/ConstructorPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ConstructorPanel from "./ConstructorPanel";
import ContentArea from "./ContentArea";
import { apiService } from "../services/api";

const ConstructorPage = () => {
  const [blocks, setBlocks] = useState([]);
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [textColor, setTextColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  
  // Новые состояния для работы с БД
  const [savedDesigns, setSavedDesigns] = useState([]);
  const [currentDesignId, setCurrentDesignId] = useState(null);
  const [designName, setDesignName] = useState("Мой дизайн");
  const [isLoading, setIsLoading] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Функция загрузки списка сохраненных дизайнов
  const loadSavedDesigns = async () => {
    try {
      const designs = await apiService.getSavedDesigns();
      setSavedDesigns(designs);
    } catch (error) {
      console.error("Ошибка загрузки дизайнов:", error);
    }
  };

  // Функция сохранения в БД с JSON
  const saveToDatabase = async (name = designName, isNew = true) => {
    try {
      setIsLoading(true);
      
      // Очищаем блоки от несериализуемых данных
      const cleanBlocks = blocks.map(block => {
        const cleanedBlock = { ...block };
        
        if (Array.isArray(cleanedBlock.items)) {
          cleanedBlock.items = cleanedBlock.items.map(item => {
            if (!item) return null;
            return {
              type: item.type,
              title: item.title,
              image: item.image,
              text: item.text,
              description: item.description,
              price: item.price,
            };
          });
        }
        
        delete cleanedBlock.ref;
        delete cleanedBlock.onOpenModal;
        
        return cleanedBlock;
      });
      
      const designData = {
        name: name,
        blocks: cleanBlocks,
        text_color: textColor,
        bg_color: bgColor,
      };
      
      // Создаем JSON данные для сохранения в файл
      const jsonData = {
        designName: name,
        blocks: cleanBlocks,
        textColor: textColor,
        bgColor: bgColor,
        savedAt: new Date().toISOString(),
        version: '1.0'
      };
      
      let result;
      if (isNew || !currentDesignId) {
        // Создаем новый дизайн с JSON
        result = await apiService.saveDesignWithJson(designData, jsonData);
        setCurrentDesignId(result.id);
      } else {
        // Обновляем существующий с JSON
        result = await apiService.updateDesignWithJson(currentDesignId, designData, jsonData);
      }
      
      setDesignName(name);
      alert("✅ Дизайн успешно сохранен в базе данных!");
      await loadSavedDesigns();
      setShowSaveModal(false);
      
      return result;
    } catch (error) {
      console.error("Ошибка сохранения:", error);
      alert(`❌ Ошибка сохранения: ${error.message}`);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Функция загрузки из БД
  const loadFromDatabase = async (id) => {
    try {
      setIsLoading(true);
      const design = await apiService.loadDesign(id);
      
      setBlocks(design.blocks || []);
      setTextColor(design.text_color || "#000000");
      setBgColor(design.bg_color || "#ffffff");
      setCurrentDesignId(design.id);
      setDesignName(design.name);
      
      alert("✅ Дизайн успешно загружен!");
      setShowLoadModal(false);
    } catch (error) {
      console.error("Ошибка загрузки:", error);
      alert(`❌ Ошибка загрузки: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Функция удаления дизайна
  const deleteDesign = async (id) => {
    if (!window.confirm("Вы уверены, что хотите удалить этот дизайн?")) return;
    
    try {
      await apiService.deleteDesign(id);
      
      if (id === currentDesignId) {
        setCurrentDesignId(null);
        setDesignName("Мой дизайн");
        setBlocks([]);
        setTextColor("#000000");
        setBgColor("#ffffff");
      }
      
      alert("✅ Дизайн успешно удален!");
      await loadSavedDesigns();
    } catch (error) {
      console.error("Ошибка удаления:", error);
      alert(`❌ Ошибка удаления: ${error.message}`);
    }
  };

  // Функция для скачивания JSON из БД
  const downloadJsonFromDb = async (designId) => {
    try {
      setIsLoading(true);
      await apiService.downloadDesignJson(designId);
      alert("✅ JSON файл успешно скачан из базы данных!");
    } catch (error) {
      console.error("Ошибка скачивания JSON:", error);
      alert(`❌ Ошибка скачивания: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Проверяем URL параметры для загрузки дизайна
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const loadId = searchParams.get('load');
    
    if (loadId && apiService.isAuthenticated()) {
      // Автоматически загружаем дизайн если передан параметр load
      loadFromDatabase(loadId);
    }
    
    // Загружаем сохраненные дизайны при монтировании
    loadSavedDesigns();
  }, [location]);

  const handlePreview = () => {
    navigate("/preview", {
      state: { blocks, textColor, bgColor },
    });
  };

  const addBlock = (type) => {
    let initialItems = null;
    let extraProps = {};

    if (type === "fourImages") initialItems = Array(4).fill(null);
    else if (type === "twoImages") initialItems = Array(2).fill(null);
    else if (type === "threeImages") initialItems = Array(3).fill(null);
    else if (type === "bigLeftTwoSmall") initialItems = Array(3).fill(null);
    else if (["singleImageLeft", "imageRightText"].includes(type))
      initialItems = Array(1).fill(null);
    else if (type === "heading" || type === "textBlock") {
      extraProps = {
        alignment: "left",
        fontSize: "medium",
        fontStyle: "normal",
        fontFamily: "Arial",
      };
    }

    setBlocks([
      ...blocks,
      { id: Date.now(), type, items: initialItems, ...extraProps },
    ]);
  };

  const deleteBlock = (id) => {
    setBlocks(blocks.filter((b) => b.id !== id));
    if (selectedBlockId === id) setSelectedBlockId(null);
  };

  const selectBlock = (id) => setSelectedBlockId(id);

  const setBlockContent = (blockId, content) => {
    setBlocks(blocks.map((b) => (b.id === blockId ? { ...b, content } : b)));
    setSelectedBlockId(null);
  };

  useEffect(() => {
    const sidebar = document.querySelector(".sidebar-custom");
    if (!sidebar) return;
    const observer = new MutationObserver(() => {
      setIsSidebarExpanded(sidebar.classList.contains("expanded"));
    });
    observer.observe(sidebar, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />

      <Sidebar />

      <div className="my-3 d-flex align-items-center justify-content-center">
        <img
          src="/src/assets/icon/home-icon.svg"
          alt="Главная"
          style={{ marginRight: "10px", marginTop: "100px" }}
        />
        <h3 className="main-page mb-0" style={{ color: "#886128" }}>
          ГЛАВНАЯ СТРАНИЦА
        </h3>
      </div>

      <div
        className={`constructor-layout ${
          isSidebarExpanded ? "sidebar-expanded" : ""
        }`}
      >
        <ContentArea
          blocks={blocks}
          setBlocks={setBlocks}
          onBlockClick={selectBlock}
          selectedBlockId={selectedBlockId}
          onDeleteBlock={deleteBlock}
          textColor={textColor}
          bgColor={bgColor}
        />
        <ConstructorPanel
          onAddBlock={addBlock}
          textColor={textColor}
          setTextColor={setTextColor}
          bgColor={bgColor}
          setBgColor={setBgColor}
          onPreview={handlePreview}
          blocks={blocks}
          onOpenSaveModal={() => setShowSaveModal(true)}
          onOpenLoadModal={() => setShowLoadModal(true)}
          isLoading={isLoading}
          currentDesignId={currentDesignId}
          designName={designName}
          onDownloadJson={downloadJsonFromDb}
        />
      </div>

      {/* Модалка сохранения */}
      {showSaveModal && (
        <div className="modal-overlay" onClick={() => setShowSaveModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h5>Сохранить дизайн</h5>
            <div className="mb-3">
              <label className="form-label">Название дизайна</label>
              <input
                type="text"
                className="form-control"
                value={designName}
                onChange={(e) => setDesignName(e.target.value)}
                placeholder="Введите название"
              />
            </div>
            <div className="mb-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="saveJson"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="saveJson">
                  Сохранить JSON файл в БД
                </label>
              </div>
              <small className="text-muted">
                JSON файл будет сохранен как часть проекта в базе данных
              </small>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-secondary"
                onClick={() => setShowSaveModal(false)}
                disabled={isLoading}
              >
                Отмена
              </button>
              <button
                className="btn btn-primary"
                onClick={() => saveToDatabase()}
                disabled={isLoading || !designName.trim()}
              >
                {isLoading ? "Сохранение..." : "Сохранить в БД"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модалка загрузки */}
      {showLoadModal && (
        <div className="modal-overlay" onClick={() => setShowLoadModal(false)}>
          <div className="modal-content modal-content-wide" onClick={(e) => e.stopPropagation()}>
            <h5>Загрузить сохраненный дизайн</h5>
            {savedDesigns.length === 0 ? (
              <p className="text-center py-4">Нет сохраненных дизайнов</p>
            ) : (
              <div className="design-list">
                {savedDesigns.map(design => (
                  <div key={design.id} className="design-item card mb-2">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">{design.name}</h6>
                          <small className="text-muted">
                            {new Date(design.created_at).toLocaleDateString()}
                            {design.updated_at !== design.created_at && 
                              ` (обновлен: ${new Date(design.updated_at).toLocaleDateString()})`}
                          </small>
                          <div className="mt-1">
                            <small className="badge bg-info me-1">
                              {design.blocks?.length || 0} блоков
                            </small>
                            {design.json_file_url && (
                              <small className="badge bg-success me-1">
                                JSON файл
                              </small>
                            )}
                            {design.user && (
                              <small className="badge bg-secondary">
                                {design.user}
                              </small>
                            )}
                          </div>
                        </div>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => loadFromDatabase(design.id)}
                            disabled={isLoading}
                          >
                            Загрузить
                          </button>
                          <button
                            className="btn btn-sm btn-outline-success"
                            onClick={() => downloadJsonFromDb(design.id)}
                            disabled={isLoading || !design.json_file_url}
                            title={design.json_file_url ? "Скачать JSON файл" : "JSON файл отсутствует"}
                          >
                            📥 JSON
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => deleteDesign(design.id)}
                            disabled={isLoading}
                          >
                            Удалить
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-3 text-center">
              <button
                className="btn btn-secondary"
                onClick={() => setShowLoadModal(false)}
                disabled={isLoading}
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConstructorPage;