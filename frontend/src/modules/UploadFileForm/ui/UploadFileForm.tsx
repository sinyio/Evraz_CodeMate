import { FC, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import s from "./UploadFileForm.module.css";
import { ChooseButton } from "@modules/ChooseButton";
import { ConfirmFiles } from "@modules/ConfirmFiles";
import { Cloud } from "@components/Cloud/Cloud";
import DropArea from "@/shared/components/DropArea/DropArea";

interface IUploadFileForm {
  files: FileList | null;
}

interface UploadFileFormProps {
  onFileUpload: (file: File) => void;
}

export const UploadFileForm: FC<UploadFileFormProps> = ({ onFileUpload }) => {
  const [isFilesUploaded, setIsFilesUploaded] = useState<boolean>(false);

  const { handleSubmit, register, watch, setValue } =
    useForm<IUploadFileForm>();

  const onSubmit = (data) => onFileUpload(data.files[0]);

  const files = watch("files");

  useEffect(() => {
    if (!files) return;
    if (files.length > 3) {
      alert("Вы можете загрузить не более 3 файлов");
      setValue("files", null);
    } else {
      let allFilesValid: boolean = true;
      for (const file of files) {
        if (file.type !== "text/csv") {
          alert("Вы можете загрузить только .scv файлы");
          setValue("files", null);
          allFilesValid = false;
          break;
        }
      }
      if (allFilesValid) {
        setIsFilesUploaded(true);
      }
    }
  }, [files, setValue]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  if (isFilesUploaded) {
    return (
      <ConfirmFiles
        files={files}
        onSubmit={onSubmit}
        onCancel={() => setIsFilesUploaded(false)}
      />
    );
  }

  return (
    <DropArea>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <>
          <Cloud />
          <p className={s.text}>
            Перетащите архив с проектом или файл .py сюда
          </p>
          <input
            {...register("files")}
            className={s.input}
            type="file"
            accept=".zip, .py"
            multiple
          />
          <ChooseButton
            className={s.chooseButton}
            onClick={handleButtonClick}
          />
        </>
      </form>
    </DropArea>
  );
};
