import { FC } from "react";
import { LayoutProps } from "./types";

export const Layout: FC<LayoutProps> = ({ children, header, footer }) => {
  return (
    <div>
      {header && header}
      {children}
      {footer && footer}
    </div>
  );
};
