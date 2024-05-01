import React from "react";
import "../styles/modules/Resume.scss";
import "../styles/global.scss";
import "../styles/variables.scss";

interface FileDisplayProps {
  src: string;
  alt?: string;
  pdf: string;
}

const FileDisplay: React.FC<FileDisplayProps> = ({
  src,
  alt = "Displayed content",
  pdf,
}) => {
  return (
    <div className='resumeImgWrapper'>
      <a
        href={pdf}
        target='_blank'
        rel='noopener noreferrer'
      >
        <img
          className='resumeImg'
          src={src}
          alt={alt}
          style={{
            display: "block",
            margin: "auto",
          }}
        />
      </a>
    </div>
  );
};

export default FileDisplay;
