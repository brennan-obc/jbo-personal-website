import React /* , { useState } */ from "react";

interface FileDisplayProps {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
}

const FileDisplay: React.FC<FileDisplayProps> = ({
  src,
  alt = "Displayed content",
  width = "100%",
  height = "100%",
}) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: width,
        height: height,
        display: "block",
        margin: "auto",
      }}
    />
  );
};

export default FileDisplay;
