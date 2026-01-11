// src/components/blocks/BlockSingleImageLeft.jsx
import React from "react";

const BlockSingleImageLeft = ({ block, onOpenModal, textColor, bgColor, onAddToCart }) => {
  const item = block.items?.[0];

  return (
    <div className="d-flex">
      <div style={{ width: "40%" }}>
        {item ? (
          <img
            src={item.image}
            className="img-fluid"
            style={{ height: "200px", objectFit: "cover", width: "100%" }}
            alt={item.title}
          />
        ) : (
          <div
            onClick={() => onOpenModal(0)}
            className="d-flex align-items-center justify-content-center"
            style={{
              height: "200px",
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
      <div className="ms-3" style={{ width: "60%" }}>
        {item ? (
          <>
            <h5 style={{ color: textColor, margin: "0 0 8px 0" }}>{item.title}</h5>
            <p className="small" style={{ color: textColor, margin: "0 0 8px 0" }}>
              {item.type === 'news' ? item.text : item.description}
            </p>
            {item.type === 'product' && (
              <>
                <strong style={{ color: textColor, display: "block", marginBottom: "8px" }}>
                  {item.price}
                </strong>
                <button
                  style={{
                    backgroundColor: '#FF6F00',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '6px 12px',
                    fontSize: '14px',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart?.(item);
                  }}
                >
                  Добавить в корзину
                </button>
              </>
            )}
          </>
        ) : (
          <div
            onClick={() => onOpenModal(0)}
            className="d-flex align-items-center justify-content-center"
            style={{
              height: "200px",
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

export default BlockSingleImageLeft;