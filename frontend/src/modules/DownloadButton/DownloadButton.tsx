import { Button } from "@/shared/ui/Button";
import { ButtonHTMLAttributes, FC } from "react";

interface IDownloadButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const DownloadButton: FC<IDownloadButton> = ({
  className = "",
  ...props
}) => {
  return (
    <Button
      type="button"
      text="Скачать файлы"
      variant="primary-blue"
      size="XL"
      {...props}
      className={className}
    />
  );
};
