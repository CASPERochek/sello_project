// src/components/blocks/ButtonBlock.jsx
import React from "react";

const ButtonBlock = ({ block }) => {
  return (
    <button className="btn btn-primary">
      {block.content || "Кнопка"}
    </button>
  );
};

export default ButtonBlock;