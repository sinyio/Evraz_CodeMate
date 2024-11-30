import { FC } from "react";
import s from "./ConfirmFiles.module.css";
import { ConfirmButton } from "@modules/ConfirmButton";
import { CancelButton } from "@modules/CancelButton";
import { IConfirmFiles } from "../model/types";
import { Zip } from "@/shared/ui/Zip";

export const ConfirmFiles: FC<IConfirmFiles> = ({
  files,
  onSubmit,
  onCancel,
}) => {
  const fileArray = Array.from(files);

  return (
    <div className={s.confirmFiles}>
      <ul className={s.fileList}>
        {fileArray.map((file, index) => (
          <li className={s.fileItem} key={index}>
            <Zip />
            <span className={s.fileName}>{file.name}</span>
          </li>
        ))}
      </ul>
      <div className={s.buttonsWrapper}>
        <ConfirmButton type="submit" onSubmit={onSubmit} />
        <CancelButton onClick={onCancel} />
      </div>
    </div>
  );
};
