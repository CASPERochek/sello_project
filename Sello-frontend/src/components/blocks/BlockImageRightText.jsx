// src/components/blocks/BlockImageRightText.jsx
import React from "react";

const BlockImageRightText = ({ block, onOpenModal, textColor, bgColor, onAddToCart }) => {
  const items = block.items;

  return (
    <div className="d-flex align-items-center justify-content-between">
      {/* Первая пара */}
      <div style={{ width: "20%" }}>
        {items[0] ? (
          <img
            src={items[0].image}
            className="img-fluid"
            style={{ height: "150px", objectFit: "cover", width: "100%" }}
            alt={items[0].title}
          />
        ) : (
          <div
            onClick={() => onOpenModal(0)}
            className="d-flex align-items-center justify-content-center"
            style={{
              height: "150px",
              backgroundColor: bgColor || "#f8f9fa",
              border: "1px dashed #ccc",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            <small style={{ color: textColor || '#6c757d' }}>Фото</small>
          </div>
        )}
      </div>
      <div className="ms-3" style={{ width: "25%" }}>
        {items[0] ? (
          <>
            <h5 style={{ color: textColor, margin: "0 0 6px 0" }}>{items[0].title}</h5>
            <p className="small" style={{ color: textColor, margin: "0 0 6px 0" }}>
              {items[0].type === 'news' ? items[0].text : items[0].description}
            </p>
            {items[0].type === 'product' && (
              <>
                <strong style={{ color: textColor, display: "block", marginBottom: "6px" }}>
                  {items[0].price}
                </strong>
                <button
                  style={{
                    backgroundColor: '#FF6F00',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    fontSize: '12px',
                    width: '100%'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart?.(items[0]);
                  }}
                >
                  В корзину
                </button>
              </>
            )}
          </>
        ) : (
          <div
            onClick={() => onOpenModal(0)}
            className="d-flex align-items-center justify-content-center"
            style={{
              height: "150px",
              backgroundColor: bgColor || "#f8f9fa",
              border: "1px dashed #ccc",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            <small style={{ color: textColor || '#6c757d' }}>Контент</small>
          </div>
        )}
      </div>

      {/* Вторая пара */}
      <div style={{ width: "20%" }}>
        {items[1] ? (
          <img
            src={items[1].image}
            className="img-fluid"
            style={{ height: "150px", objectFit: "cover", width: "100%" }}
            alt={items[1].title}
          />
        ) : (
          <div
            onClick={() => onOpenModal(1)}
            className="d-flex align-items-center justify-content-center"
            style={{
              height: "150px",
              backgroundColor: bgColor || "#f8f9fa",
              border: "1px dashed #ccc",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            <small style={{ color: textColor || '#6c757d' }}>Фото</small>
          </div>
        )}
      </div>
      <div className="ms-3" style={{ width: "25%" }}>
        {items[1] ? (
          <>
            <h5 style={{ color: textColor, margin: "0 0 6px 0" }}>{items[1].title}</h5>
            <p className="small" style={{ color: textColor, margin: "0 0 6px 0" }}>
              {items[1].type === 'news' ? items[1].text : items[1].description}
            </p>
            {items[1].type === 'product' && (
              <>
                <strong style={{ color: textColor, display: "block", marginBottom: "6px" }}>
                  {items[1].price}
                </strong>
                <button
                  style={{
                    backgroundColor: '#FF6F00',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    fontSize: '12px',
                    width: '100%'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart?.(items[1]);
                  }}
                >
                  В корзину
                </button>
              </>
            )}
          </>
        ) : (
          <div
            onClick={() => onOpenModal(1)}
            className="d-flex align-items-center justify-content-center"
            style={{
              height: "150px",
              backgroundColor: bgColor || "#f8f9fa",
              border: "1px dashed #ccc",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            <small style={{ color: textColor || '#6c757d' }}>Контент</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockImageRightText;