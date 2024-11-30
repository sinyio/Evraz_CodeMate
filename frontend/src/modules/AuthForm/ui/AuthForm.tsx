import { Button } from "@/shared/ui/Button";
import { FC } from "react";
import { useForm } from "react-hook-form";
import s from "./AuthForm.module.css";

interface AuthForm {
  login: string;
  password: string;
}

export const AuthForm: FC = () => {
  const { handleSubmit, register } = useForm<AuthForm>();

  const submit = (data: AuthForm) => {
    console.log(data);
  };

  return (
    <>
      <form
        className={s.form}
        onSubmit={handleSubmit(submit)}
        autoComplete="off"
      >
        <input placeholder="Логин" className={s.input} {...register("login")} />
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
