// src/components/blocks/BlockPreview.jsx
import React from "react";

const BlockPreview = ({ type }) => {
  const getImagePath = () => {
    switch (type) {
      case "fourImages":
        return "/src/assets/images/four-images.png";
      case "singleImageLeft":
        return "/src/assets/images/single-image-left.png";
      case "imageRightText":
        return "/src/assets/images/image-right-text.png";
      case "twoImages":
        return "/src/assets/images/two-images.png";
      case "threeImages":
        return "/src/assets/images/three-images.png";
      case "bigLeftTwoSmall":
        return "/src/assets/images/big-left-two-small.png";
      default:
        return "/src/assets/images/placeholder.png";
    }
  };

  return (
    <img
      src={getImagePath()}
      alt={type}
      className="img-fluid"
      style={{ maxHeight: "100px", objectFit: "contain" }}
    />
  );
};

export default BlockPreview;