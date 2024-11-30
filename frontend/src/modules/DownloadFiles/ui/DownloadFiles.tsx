import { FC } from "react";
import s from "./DownloadFiles.module.css";
import fileIcon from "@assets/icons/file.svg";
import { DownloadButton } from "@/modules/DownloadButton";

export const DownloadFiles: FC = () => {
  const fileArray = [
    {
      name: "file1",
    },
    {
      name: "file2",
    },
    {
      name: "file3",
    },
  ];

  return (
    <div className={s.downloadFiles}>
      <ul className={s.fileList}>
        {fileArray.map((file, index) => (
          <li className={s.fileItem} key={index}>
            <img className={s.fileIcon} src={fileIcon} alt="Icon" />
            <span className={s.fileName}>{file.name}</span>
          </li>
        ))}
      </ul>
      <DownloadButton />
    </div>
  );
};
