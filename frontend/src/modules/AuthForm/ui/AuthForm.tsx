import { Button } from "@/shared/ui/Button";
import { FC } from "react";
import { useForm } from "react-hook-form";
import s from "./AuthForm.module.css";
import { useLoginUser } from "../api/useLoginUser";

interface AuthForm {
  username: string;
  password: string;
}

export const AuthForm: FC = () => {
  const { handleSubmit, register } = useForm<AuthForm>();

  const { loginUser } = useLoginUser();

  const submit = (data: AuthForm) => {
    loginUser(data);
  };

  return (
    <>
      <form
        className={s.form}
        onSubmit={handleSubmit(submit)}
        autoComplete="off"
      >
        <input
          placeholder="Логин"
          className={s.input}
          {...register("username")}
        />
        <input
          type="password"
          placeholder="Пароль"
          className={s.input}
          {...register("password")}
        />
        <Button text="Войти" style={{ textAlign: "left" }} />
      </form>
    </>
  );
};
