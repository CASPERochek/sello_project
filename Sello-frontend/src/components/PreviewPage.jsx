// src/components/PreviewPage.jsx
import React from "react";
import { useLocation } from "react-router-dom";

import BlockFourImages from "./blocks/BlockFourImages";
import BlockSingleImageLeft from "./blocks/BlockSingleImageLeft";
import BlockImageRightText from "./blocks/BlockImageRightText";
import BlockTwoImages from "./blocks/BlockTwoImages";
import BlockThreeImages from "./blocks/BlockThreeImages";
import BlockBigLeftTwoSmall from "./blocks/BlockBigLeftTwoSmall";

const PreviewPage = () => {
  const location = useLocation();
  const { blocks, textColor, bgColor } = location.state || {};

  if (!blocks) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        Нет данных для предпросмотра
      </div>
    );
  }

  // Вспомогательная функция для стилей текста
  const getTextStyle = (block) => {
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
      color: textColor,
      textAlign: block.alignment || "left",
      fontSize,
      fontWeight,
      fontStyle,
      fontFamily: block.fontFamily || "Arial",
      margin: "16px 0",
    };
  };

  return (
    <div
      style={{
        backgroundColor: bgColor,
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {blocks.map((block) => {
          if (block.type === "heading") {
            return (
              <h2 key={block.id} style={getTextStyle(block)}>
                {block.content}
              </h2>
            );
          }

          if (block.type === "textBlock") {
            return (
              <p key={block.id} style={getTextStyle(block)}>
                {block.content}
              </p>
            );
          }

          if (block.type === "fourImages") {
            return (
              <div key={block.id} style={{ marginBottom: "32px" }}>
                <BlockFourImages
                  block={block}
                  textColor={textColor}
                  bgColor={bgColor}
                  onAddToCart={(item) => {
                    // В предпросмотре — тоже работает
                    alert(`Товар "${item.title}" добавлен в корзину!`);
                  }}
                />
              </div>
            );
          }

          if (block.type === "button") {
            return (
              <div
                key={block.id}
                style={{ textAlign: "center", margin: "16px 0" }}
              >
                <button
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#886128",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    fontFamily: block.fontFamily || "Arial",
                  }}
                >
                  {block.content}
                </button>
              </div>
            );
          }

          // Графические блоки
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
            default:
              return null;
          }

          return (
            <div key={block.id} style={{ marginBottom: "32px" }}>
              <BlockComponent
                block={block}
                textColor={textColor}
                bgColor={bgColor}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PreviewPage;