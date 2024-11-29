import { FC } from "react";
import s from "./Header.module.css";
import { Logo } from "@components/Logo";
import { showFormStore } from "@/store/showForm";
import { useScreenSize } from "@/shared/hooks/useScreenSize";

export const Header: FC = () => {
  const { isLaptop, isDesktop } = useScreenSize();

  return (
    <div className={s.header} onClick={() => showFormStore.showForm()}>
      <div className={s.headerContainer}>
        <Logo style={{ width: !isDesktop ? "180px" : "220px" }} />
        <div className={s.userInfo}>
          <div className={s.userInfoWrapepr}>
            <p className={s.userName}>Макс</p>
            <p className={s.userPosition}>Software Developer</p>
          </div>
          <div>
            <img src="" alt="Avatar" />
          </div>
        </div>
      </div>
    </div>
  );
};
