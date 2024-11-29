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
      text="Выберите файлы"
      variant="primary-blue"
      size="XL"
      {...props}
      className={className}
    />
  );
};
