import React from "react";
import { useSelector } from "react";
import { selectIsLoggedIn } from "../redux/AuthLogicSelectors"
import { IoIosSunny, IoIosMoon } from "react-icons/io";
import { Link } from "react-router-dom";
import { UserData } from "./UserData";
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

  const toggleTheme = () => {
    setDarkMode((prevIsDarkMode) => !prevIsDarkMode);
  };


  return (
  <nav className="flex items-center py-4 mx-4 *:mx-4 justify-between border-2 border-t-0 border-opacity-80">
      <div className="*:mx-2 flex items-center">
        <Link to="/home">
          <div className="flex">
            <button className="text-4xl font-bold text-main-yellow">
              TechSpeed
            </button>
          </div>
        </Link>
        <Link to="/logistics">
          <button className="text-[28px] opacity-80 dark:text-white">
            Логістика
          </button>
        </Link>
        <Link to="/history">
          <button className="text-[28px] opacity-80 dark:text-white">
            Звіт
          </button>
        </Link>
      </div>
      <div className="*:mx-2 flex items-center">
        {isLoggedIn ? (
          <UserData/> 
        ) : (
          <div className = "flex gap-[8px] flex-col">
          <Link to="/login">
            <button className="text-[28px] opacity-80 dark:text-white">
              Логін
            </button>
          </Link>
          <Link to="/register">
            <button className="text-[28px] opacity-80 dark:text-white">
              Реєстрація
            </button>
          </Link> 
          </div>
        )}
        <button onClick={toggleTheme}>
          {darkMode ? (
            <IoIosSunny size={32} color="white" />
          ) : (
            <IoIosMoon size={32} color="373737" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Header;