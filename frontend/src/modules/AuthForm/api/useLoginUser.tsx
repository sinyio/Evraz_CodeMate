import { useMutation } from "@tanstack/react-query";
import { login } from "@api/authService/authController";
import { ILoginUser } from "@api/authService/types";

export const useLoginUser = () => {
  const { mutate } = useMutation({
    mutationFn: ({ data }: { data: ILoginUser }) => login(data),
  });

  const loginUser = (data: ILoginUser) => mutate({ data });

  return { loginUser };
};
