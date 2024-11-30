import { Button } from "@/shared/ui/Button";
import { FC } from "react";
import { useForm } from "react-hook-form";
import s from "./AuthForm.module.css";

interface AuthForm {
  username: string;
  password: string;
}

export const AuthForm: FC = ({ onSubmit }) => {
  const { handleSubmit, register } = useForm<AuthForm>();

  return (
    <>
      <form
        className={s.form}
        onSubmit={handleSubmit(onSubmit)}
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
        <Button text="Войти" size="full" style={{ textAlign: "left" }} />
      </form>
    </>
  );
};
