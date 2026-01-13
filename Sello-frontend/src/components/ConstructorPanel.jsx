import React, { useState } from "react";
import { apiService } from "../services/api";

const blockPreviews = {
  fourImages: "/src/assets/images/four-images.svg",
  singleImageLeft: "/src/assets/images/single-image.svg",
  imageRightText: "/src/assets/images/image-right-text.svg",
  twoImages: "/src/assets/images/two-images.svg",
  threeImages: "/src/assets/images/three-images.svg",
  bigLeftTwoSmall: "/src/assets/images/big-left-two-small.svg",
};

const ConstructorPanel = ({
  onAddBlock,
  textColor,
  setTextColor,
  bgColor,
  setBgColor,
  onPreview,
  blocks,
  onOpenSaveModal,
  onOpenLoadModal,
  isLoading,
  currentDesignId,
  designName,
  onDownloadJson,
}) => {
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);

  const blockTypes = [
    { id: "fourImages", name: "4 изображения" },
    { id: "singleImageLeft", name: "Изображение слева" },
    { id: "imageRightText", name: "Текст + изображение" },
    { id: "twoImages", name: "2 изображения" },
    { id: "threeImages", name: "3 изображения" },
    { id: "bigLeftTwoSmall", name: "Большое + 2 маленьких" },
  ];

  const additionalElements = [
    { id: "heading", label: "+ Добавить заголовок" },
    { id: "textBlock", label: "+ Добавить текстовый блок" },
    { id: "button", label: "+ Добавить кнопку" },
  ];

// src/components/ConstructorPanel.jsx - ОБНОВЛЕННАЯ handleSaveToFile

  const handleSaveToFile = async () => {
    try {
      if (!blocks || !Array.isArray(blocks)) {
        alert("Ошибка: нет данных для сохранения.");
        return;
      }

      const cleanBlocks = blocks.map(block => {
        let cleanedBlock = { ...block };

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

      const data = {
        designName: designName || "Мой дизайн",
        blocks: cleanBlocks,
        textColor: textColor || "#000000",
        bgColor: bgColor || "#ffffff",
        metadata: {
          savedAt: new Date().toISOString(),
          version: '1.0',
          savedFrom: "constructor_frontend"
        }
      };

      // Если есть текущий дизайн и пользователь авторизован, предлагаем сохранить в БД
      if (currentDesignId && apiService.isAuthenticated()) {
        if (window.confirm("У вас есть сохраненный дизайн. Обновить его в базе данных?")) {
          try {
            const designData = {
              name: designName || "Мой дизайн",
              blocks: cleanBlocks,
              text_color: textColor,
              bg_color: bgColor,
              metadata: {
                ...data.metadata,
                savedAsFile: true
              }
            };
            await apiService.updateDesign(currentDesignId, designData);
            alert("✅ Дизайн обновлен в БД!");
          } catch (dbError) {
            console.warn("Не удалось обновить в БД:", dbError);
            alert(`⚠ Не удалось обновить в БД: ${dbError.message}`);
          }
        }
      }

      // Скачиваем файл
      const dataStr = JSON.stringify(data, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `дизайн-${designName || 'страница'}-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      alert("✅ Файл успешно скачан!");
    } catch (err) {
      console.error("Ошибка при сохранении:", err);
      alert(`❌ Ошибка: ${err.message}`);
    }
  };

  return (
    <div className="constructor-panel">
      <h5 className="mb-3 text-center">Конструктор</h5>

      {/* Блоки контента */}
      <div className="mb-4">
        <h6 className="mb-2 text-center">Блоки контента</h6>
        <div className="block-preview-grid">
          {blockTypes.map((block) => (
            <div
              key={block.id}
              className="block-preview-item"
              onClick={() => onAddBlock(block.id)}
              title={block.name}
            >
              <img
                src={blockPreviews[block.id]}
                alt={block.name}
                className="block-preview-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/src/assets/images/placeholder.svg";
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Текстовые элементы */}
      <div className="mb-4">
        {additionalElements.map((el) => (
          <button
            key={el.id}
            className="btn btn-outline-secondary w-100 mb-2"
            onClick={() => onAddBlock(el.id)}
          >
            {el.label}
          </button>
        ))}
      </div>

      {/* Кнопки оформления */}
      <div className="mb-4">
        <h6 className="mb-4 text-center">Оформление</h6>
        <div className="d-grid gap-2">
          <button
            className="btn btn-outline-secondary text-start d-flex justify-content-between align-items-center"
            onClick={() => setShowTextColorPicker(true)}
          >
            <span>Цвет текста</span>
            <div 
              className="color-preview" 
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: textColor,
                border: "1px solid #ccc",
                borderRadius: "3px"
              }}
            />
          </button>
          <button
            className="btn btn-outline-secondary text-start d-flex justify-content-between align-items-center"
            onClick={() => setShowBgColorPicker(true)}
          >
            <span>Цвет фона</span>
            <div 
              className="color-preview" 
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: bgColor,
                border: "1px solid #ccc",
                borderRadius: "3px"
              }}
            />
          </button>
        </div>
      </div>

      {/* Кнопка предпросмотра */}
      <div>
        <button 
          className="btn btn-outline-secondary w-100 mb-3"
          onClick={onPreview}
          disabled={blocks.length === 0}
          title={blocks.length === 0 ? "Добавьте хотя бы один блок" : "Предпросмотр дизайна"}
        >
          👁️ Предпросмотр
        </button>
      </div>

      {/* Кнопки работы с БД */}
      <div className="mt-4 border-top pt-3">
        <h6 className="mb-3 text-center">Работа с базой данных</h6>
        
        <button
          className="btn btn-primary w-100 mb-2 d-flex align-items-center justify-content-center gap-2"
          onClick={onOpenSaveModal}
          disabled={isLoading || blocks.length === 0}
          title={blocks.length === 0 ? "Добавьте хотя бы один блок" : "Сохранить дизайн в базу данных"}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm" />
              Сохранение...
            </>
          ) : (
            <>
              💾 Сохранить в БД
            </>
          )}
        </button>
        
        <button
          className="btn btn-outline-primary w-100 mb-2 d-flex align-items-center justify-content-center gap-2"
          onClick={onOpenLoadModal}
          disabled={isLoading}
          title="Загрузить сохраненные дизайны"
        >
          📂 Загрузить из БД
        </button>
        
        {currentDesignId && (
          <>
            <button
              className="btn btn-outline-success w-100 mb-2 d-flex align-items-center justify-content-center gap-2"
              onClick={() => onDownloadJson && onDownloadJson(currentDesignId)}
              disabled={isLoading}
              title="Скачать JSON файл из базы данных"
            >
              📥 Скачать JSON из БД
            </button>
            
            <div className="alert alert-info small mb-2 p-2">
              <small>
                Текущий дизайн: <strong>{designName}</strong> (ID: {currentDesignId})
              </small>
            </div>
          </>
        )}
        
        <button
          className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2"
          onClick={handleSaveToFile}
          disabled={blocks.length === 0}
          title={blocks.length === 0 ? "Добавьте хотя бы один блок" : "Скачать дизайн как JSON файл"}
        >
          ⬇️ Скачать JSON файл
        </button>
      </div>

      {/* Модалка выбора цвета */}
      {(showTextColorPicker || showBgColorPicker) && (
        <div
          className="modal-overlay"
          onClick={() => {
            setShowTextColorPicker(false);
            setShowBgColorPicker(false);
          }}
        >
          <div
            className="modal-content modal-content-narrow"
            onClick={(e) => e.stopPropagation()}
          >
            <h5 className="mb-3">{showTextColorPicker ? "Выберите цвет текста" : "Выберите цвет фона"}</h5>
            
            <input
              type="color"
              value={showTextColorPicker ? textColor : bgColor}
              onChange={(e) => {
                if (showTextColorPicker) setTextColor(e.target.value);
                else setBgColor(e.target.value);
              }}
              style={{
                width: "100%",
                height: "60px",
                border: "2px solid #ddd",
                borderRadius: "8px",
                cursor: "pointer",
                marginBottom: "15px"
              }}
            />
            
            <div className="d-flex align-items-center mb-3">
              <span className="me-2">Текущий цвет:</span>
              <div 
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: showTextColorPicker ? textColor : bgColor,
                  border: "1px solid #999",
                  borderRadius: "4px"
                }}
              />
              <code className="ms-2">
                {showTextColorPicker ? textColor : bgColor}
              </code>
            </div>
            
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-secondary flex-grow-1"
                onClick={() => {
                  if (showTextColorPicker) setTextColor("#000000");
                  else setBgColor("#ffffff");
                }}
              >
                Сбросить
              </button>
              <button
                className="btn btn-primary flex-grow-1"
                onClick={() => {
                  setShowTextColorPicker(false);
                  setShowBgColorPicker(false);
                }}
              >
                Применить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConstructorPanel;





