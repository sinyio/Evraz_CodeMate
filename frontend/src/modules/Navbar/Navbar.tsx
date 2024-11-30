import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { NavItem } from "./types";

export const Navbar = () => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState<string>(location.pathname);

  useEffect(() => {
    setActiveIndex(location.pathname);
  }, [location.pathname]);

  const router = useNavigate();

  const handleClick = (item: NavItem) => {
    setActiveIndex(item.id);
    router(item.link);
  };

  const navItems: NavItem[] = [
    {
      id: "/",
      title: "проверка",
      link: "/",
    },
    {
      id: "/history",
      title: "история",
      link: "/history",
    },
  ];

  return (
    <div className={styles.nav}>
      {navItems.map((item) => (
        <div
          key={item.id}
          className={`${styles.navItem} ${
            activeIndex === item.id ? styles.active : ""
          }`}
          onClick={() => handleClick(item)}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
};
