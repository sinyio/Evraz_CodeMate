import { Button } from "@/shared/ui/Button";
import { ButtonHTMLAttributes, FC } from "react";

interface IChooseButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const ChooseButton: FC<IChooseButton> = ({
  className = "",
  ...props
}) => {
  return (
    <Button
      type="button"
      text="Выберите файл"
      variant="orange"
      size="XL"
      {...props}
      className={className}
    />
  );
};
