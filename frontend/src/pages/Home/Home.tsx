import { PageLayout } from "@app/layouts/PageLayout";
import { FC } from "react";
import s from "./Home.module.css";
import { UploadFileForm } from "@/modules/UploadFileForm";
import { useUploadFile } from "@/modules/UploadFileForm/api/useUploadFile";
import { DownloadFiles } from "@/modules/DownloadFiles";
import { showFormStore } from "@store/showForm";
import { observer } from "mobx-react-lite";
import { Error } from "@ui/Error";
import { Loader } from "@/shared/ui/Loader";

export const Home: FC = observer(() => {
  const { uploadFile, isError, isSuccess, isPending } = useUploadFile();

  const { isShowForm } = showFormStore;

  const handleUploadFile = (file: File) => uploadFile(file);

  return (
    <PageLayout>
      <div className={s.homePage}>
        <div className={s.formWrapper}>
          {isShowForm && !isPending && (
            <UploadFileForm onFileUpload={handleUploadFile} />
          )}
          {isSuccess && !isError && <DownloadFiles />}
          {isError && !isShowForm && <Error />}
          {isPending && <Loader />}
        </div>
      </div>
    </PageLayout>
  );
});
