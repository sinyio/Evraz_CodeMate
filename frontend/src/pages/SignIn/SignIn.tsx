import { FC } from "react";
import { useUploadFile } from "@modules/UploadFileForm/api/useUploadFile";
import { AuthForm } from "@modules/AuthForm/ui/AuthForm";
import { PageLayoutWithoutHeader } from "@app/layouts/PageLayoutWithoutHeader";
import s from "./SignIn.module.css";
import bg from "@assets/bg.svg";

export const SignIn: FC = () => {
  const { uploadFile, isError } = useUploadFile();

  return (
    <PageLayoutWithoutHeader>
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
    </PageLayoutWithoutHeader>
  );
};
