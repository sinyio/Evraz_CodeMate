import { FC } from "react";
import s from "./DownloadFiles.module.css";
import { DownloadButton } from "@/modules/DownloadButton";
import { Pdf } from "@/shared/ui/Pdf";

export const DownloadFiles: FC = ({ fileUrl }) => {
  return (
    <div className={s.downloadFiles}>
      <ul className={s.fileList}>
        <li className={s.fileItem}>
          <Pdf />
          <span className={s.fileName}>Отчет</span>
        </li>
      </ul>
      <a href={fileUrl}>
        <DownloadButton />
      </a>
    </div>
  );
};
