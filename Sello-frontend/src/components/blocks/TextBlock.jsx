// src/components/blocks/TextBlock.jsx
import React from "react";

const TextBlock = ({ block }) => {
  return <p>{block.content || "Текстовый блок. Здесь можно написать любой текст."}</p>;
};

export default TextBlock;