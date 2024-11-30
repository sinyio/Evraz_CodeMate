import { FC, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import s from "./UploadFileForm.module.css";
import { ChooseButton } from "@modules/ChooseButton";
import { ConfirmFiles } from "@modules/ConfirmFiles";
import { Cloud } from "@ui/Cloud";
import { DropArea } from "@components/DropArea";

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

  const onSubmit = (data) => {
    onFileUpload(data.files[0]);
  };

  const files = watch("files");

  useEffect(() => {
    if (!files) return;

    let allFilesValid: boolean = true;

    for (const file of files) {
      console.log(file.type);
      if (
        file.type !== "application/zip" &&
        file.type !== "application/x-zip-compressed"
      ) {
        alert("Вы можете загрузить только .zip архив");
        setValue("files", null);
        allFilesValid = false;
        break;
      }
    }
    if (allFilesValid) {
      setIsFilesUploaded(true);
    }
  }, [files, setValue]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      {isFilesUploaded ? (
        <ConfirmFiles
          files={files}
          onSubmit={onSubmit}
          onCancel={() => setIsFilesUploaded(false)}
        />
      ) : (
        <>
          <div className={s.formWrapper}>
            <DropArea>
              <div className={s.formInner}>
                <Cloud />
                <p className={s.text}>
                  Перетащите архив <br /> с проектом сюда, <br /> чтобы его
                  проанализировать
                </p>
                <input
                  {...register("files")}
                  className={s.input}
                  type="file"
                  accept=".zip"
                />
                <ChooseButton
                  className={s.chooseButton}
                  onClick={handleButtonClick}
                />
              </div>
            </DropArea>
          </div>
        </>
      )}
    </form>
  );
};
