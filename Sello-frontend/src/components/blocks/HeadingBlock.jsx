// src/components/blocks/HeadingBlock.jsx
import React from "react";

const HeadingBlock = ({ block }) => {
  return <h2>{block.content || "Заголовок"}</h2>;
};

export default HeadingBlock;