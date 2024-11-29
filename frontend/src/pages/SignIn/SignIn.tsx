import { PageLayout } from "@app/layouts/PageLayout";
import { FC } from "react";
import s from "./SignIn.module.css";
import { useUploadFile } from "@/modules/Form/api/useUploadFile";
import { AuthForm } from "@/modules/AuthForm/ui/AuthForm";
import bg from "@assets/bg.svg";

export const SignIn: FC = () => {
  const { uploadFile, isError } = useUploadFile();

  return (
    <PageLayout header={false}>
      <div className={s.signInPage}>
        <div className={s.bgImage}>
          <img src={bg} />
        </div>
        <div>
          <h1 className={s.title}>
            Добро пожаловать в <span className={s.orange}>CodeMate</span>
          </h1>
          <div className={s.formWrapper}>
            <AuthForm />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
