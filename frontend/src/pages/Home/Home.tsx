import { PageLayout } from "@app/layouts/PageLayout";
import { FC } from "react";
import s from "./Home.module.css";
import { Form } from "@/modules/Form";
import { useUploadFile } from "@/modules/Form/api/useUploadFile";
import { DownloadFiles } from "@/modules/DownloadFiles";
import { showFormStore } from "@store/showForm";
import { observer } from "mobx-react-lite";

export const Home: FC = observer(() => {
  const { uploadFile, isError } = useUploadFile();

  const { isShowForm } = showFormStore;

  const handleUploadFile = (file: File) => uploadFile(file);
  return (
    <PageLayout>
      <div className={s.homePage}>
        <h1 className={s.title}>
          Добро пожаловать в <span className={s.orangeText}>CodeMate</span>
        </h1>
        <div className={s.formWrapper}>
          {isShowForm ? (
            <Form onFileUpload={handleUploadFile} />
          ) : (
            <DownloadFiles />
          )}
          {}
        </div>
      </div>
    </PageLayout>
  );
});
