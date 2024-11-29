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
        <div className={s.signInLeft}>
          <img src={bg} />
        </div>
        <div className={s.signInRight}>
          <h1 className={s.title}>
            Добро пожаловать <br /> в{" "}
            <span className={s.orangeText}>CodeMate</span>
          </h1>
          <div className={s.formWrapper}>
            <AuthForm />
          </div>
          <span className={s.forgetPassword}>Забыли пароль?</span>
        </div>
      </div>
    </PageLayout>
  );
};
