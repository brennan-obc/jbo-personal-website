import React, { useState } from "react";

interface FileDisplayProps {
  src: string;
  type: "image" | "pdf";
  width?: string;
  height?: string;
}

const FileDisplay: React.FC<FileDisplayProps> = ({
  src,
  type,
  width = "100%",
  height = "100%",
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  const renderContent = () => {
    switch (type) {
      case "image":
        return (
          <img
            src={src}
            alt='Displayed content'
            style={{
              width: isFullscreen ? "100vw" : width,
              height: isFullscreen ? "100vh" : height,
            }}
          />
        );
      case "pdf":
        return (
          <iframe
            src={src}
            style={{
              width: isFullscreen ? "100vw" : width,
              height: isFullscreen ? "100vh" : height,
            }}
            frameBorder='0'
            title='PDF content'
          ></iframe>
        );
      default:
        return <p>Unsupported file type</p>;
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: isFullscreen ? "100vw" : width,
        height: isFullscreen ? "100vh" : height,
      }}
    >
      {renderContent()}
      <button
        onClick={toggleFullscreen}
        style={{ position: "absolute", top: "10px", right: "10px" }}
      >
        {isFullscreen ? "Exit Fullscreen" : "Go Fullscreen"}
      </button>
    </div>
  );
};

export default FileDisplay;
