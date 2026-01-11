// src/components/blocks/BlockBigLeftTwoSmall.jsx
import React from "react";

const BlockBigLeftTwoSmall = ({ block, onOpenModal, textColor, bgColor, onAddToCart }) => {
  const items = block.items;

  const renderCard = (item, index) => {
    if (!item) return null;
    
    return (
      <div>
        <img
          src={item.image}
          className="img-fluid"
          style={{ height: "100%", objectFit: "cover", width: "100%" }}
          alt={item.title}
        />
        <div className="small mt-1" style={{ color: textColor, fontSize: "10px" }}>
          {item.title}
        </div>
        {item.type === 'product' && (
          <>
            <div style={{ color: textColor, fontWeight: 'bold', fontSize: "10px" }}>
              {item.price}
            </div>
            <button
              className="btn btn-sm mt-1"
              style={{
                backgroundColor: '#FF6F00',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '1px 4px',
                fontSize: '8px',
                width: '100%'
              }}
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart?.(item);
              }}
            >
              В корзину
            </button>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="d-flex">
      <div style={{ width: "60%" }}>
        {items[0] ? (
          renderCard(items[0], 0)
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
            <small style={{ color: textColor || '#6c757d' }}>Большое фото</small>
          </div>
        )}
      </div>
      <div className="ms-3 d-flex flex-column" style={{ width: "40%" }}>
        <div className="mb-2" style={{ height: "95px" }}>
          {items[1] ? renderCard(items[1], 1) : (
            <div
              onClick={() => onOpenModal(1)}
              className="d-flex align-items-center justify-content-center"
              style={{
                height: "100%",
                backgroundColor: bgColor || "#f8f9fa",
                border: "1px dashed #ccc",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              <small style={{ color: textColor || '#6c757d' }}>Маленькое</small>
            </div>
          )}
        </div>
        <div style={{ height: "95px" }}>
          {items[2] ? renderCard(items[2], 2) : (
            <div
              onClick={() => onOpenModal(2)}
              className="d-flex align-items-center justify-content-center"
              style={{
                height: "100%",
                backgroundColor: bgColor || "#f8f9fa",
                border: "1px dashed #ccc",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              <small style={{ color: textColor || '#6c757d' }}>Маленькое</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlockBigLeftTwoSmall;