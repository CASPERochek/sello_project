// src/components/blocks/BlockFourImages.jsx
import React from "react";

const BlockFourImages = ({ block, onOpenModal, textColor, bgColor, onAddToCart }) => {
  const items = block.items;

  return (
    <div className="d-flex justify-content-between">
      {items.map((item, i) => (
        <div key={i} style={{ width: "24%" }}>
          {item ? (
            <div>
              <img
                src={item.image}
                className="img-fluid"
                style={{ height: "100px", objectFit: "cover", width: "100%" }}
                alt={item.title}
              />
              <div className="small mt-1" style={{ color: textColor, backgroundColor: bgColor, padding: "2px" }}>
                {item.title}
              </div>
              {item.type === 'product' && (
                <>
                  <div style={{ color: textColor, fontWeight: 'bold', backgroundColor: bgColor, padding: "2px" }}>
                    {item.price}
                  </div>
                  <button
                    className="btn btn-sm mt-1"
                    style={{
                      backgroundColor: '#FF6F00',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '2px 6px',
                      fontSize: '10px',
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
              {item.type === 'news' && (
                <p className="small mt-1" style={{ color: textColor, margin: 0 }}>
                  {item.text}
                </p>
              )}
            </div>
          ) : (
            <div
              onClick={() => onOpenModal(i)}
              className="d-flex align-items-center justify-content-center"
              style={{
                height: "100px",
                backgroundColor: bgColor || "#f8f9fa",
                border: "1px dashed #ccc",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              <small className="text-muted" style={{ color: textColor || '#6c757d' }}>
                Выбрать
              </small>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BlockFourImages;