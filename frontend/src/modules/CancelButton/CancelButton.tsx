import { Button } from "@/shared/ui/Button";
import { ButtonHTMLAttributes, FC } from "react";

interface IChooseButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const CancelButton: FC<IChooseButton> = ({
  className = "",
  ...props
}) => {
  return (
    <Button
      type="button"
      text="Отменить"
      variant="primary-gold"
      size="XL"
      {...props}
      className={className}
    />
  );
};
