import { FC, PropsWithChildren, useState } from "react";
import s from "./DropArea.module.css";

const DropArea: FC<PropsWithChildren> = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (event) => {
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    setIsDragging(false);
  };

  return (
    <div
      className={`${s.dropArea} ${isDragging ? s.highlight : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

export default DropArea;