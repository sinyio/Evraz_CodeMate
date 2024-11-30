import { FC, useEffect } from "react";
import { AuthForm } from "@modules/AuthForm/ui/AuthForm";
import { PageLayoutWithoutHeader } from "@app/layouts/PageLayoutWithoutHeader";
import s from "./SignIn.module.css";
import bg from "@assets/bg.svg";
import { useAuthToken } from "@/shared/hooks/useAuthToken";
import { useLoginUser } from "@/modules/AuthForm/api/useLoginUser";
import { useNavigate } from "react-router-dom";

export const SignIn: FC = () => {
  const { loginUser, isError, isPending } = useLoginUser();
  const { addAccessToken, getAccessToken } = useAuthToken();
  const router = useNavigate();

  useEffect(() => {
    if (!isPending && !isError && getAccessToken()) {
      router("/");
    }
  }, [isPending, isError, getAccessToken, router]);

  const onSubmit = async (data) => {
    const token = await loginUser(data);
    addAccessToken(token);
  };

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
            <AuthForm onSubmit={onSubmit} />
          </div>
          <span className={s.forgetPassword}>Забыли пароль?</span>
        </div>
      </div>
    </PageLayoutWithoutHeader>
  );
};
