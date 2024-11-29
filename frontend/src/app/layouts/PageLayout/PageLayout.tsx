import { FC } from "react";
import { Layout } from "../Layout";
import { PageLayoutProps } from "./types";
import { Header } from "@/modules/Header";
import s from "./PageLayout.module.css";

export const PageLayout: FC<PageLayoutProps> = ({ children, ...props }) => {
  return (
    <Layout {...props} header={<Header />}>
      <div className={s.container}>{children}</div>
    </Layout>
  );
};
