import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/AuthLogicSelectors";
import { IoIosSunny, IoIosMoon } from "react-icons/io";
import { NavLink, Link } from "react-router-dom";
import UserData from "./UserData";
import RegisterSection from "./RegisterSection";
import { ReactComponent as LogoIcon } from "../images/sprites/logo-2.svg";
import styles from "../styles/Header.module.css";

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [darkMode, setDarkMode] = React.useState(
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((p) => !p);

  const linkClass = ({ isActive }) =>
    `${styles.link} ${isActive ? styles.active : ""}`;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <LogoIcon className={styles.logo} aria-hidden="true" />
          <Link to="/home" className={styles.brand}>
            Tech<span className={styles.brandAccent}>Speed</span>
          </Link>

          <nav className={styles.nav}>
            <NavLink to="/logistics" className={linkClass}>
             LOGISTICS
            </NavLink>
            <NavLink to="/history" className={linkClass}>
              HISTORY
            </NavLink>
          </nav>
        </div>

        <div className={styles.right}>
          {isLoggedIn ? <UserData /> : <RegisterSection />}

          <button type="button" className={styles.themeBtn} onClick={toggleTheme} aria-label="Toggle theme">
            {darkMode ? <IoIosSunny size={22} /> : <IoIosMoon size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
