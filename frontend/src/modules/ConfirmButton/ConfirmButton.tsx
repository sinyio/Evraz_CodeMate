import { Button } from "@/shared/ui/Button";
import { ButtonHTMLAttributes, FC } from "react";

interface IConfirmButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const ConfirmButton: FC<IConfirmButton> = ({
  className = "",
  ...props
}) => {
  return (
    <Button
      type="button"
      text="Подтвердить"
      variant="primary-blue"
      size="XL"
      {...props}
      className={className}
    />
  );
};
