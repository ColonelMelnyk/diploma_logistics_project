import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/AuthLogicSelectors"
import { IoIosSunny, IoIosMoon } from "react-icons/io";
import { Link } from "react-router-dom";
import UserData from "./UserData";
import RegisterSection from "./RegisterSection"
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
  <nav>
      <div>
        <Link to="/home">
          <div>
            <button>
              TechSpeed
            </button>
          </div>
        </Link>
        <Link to="/logistics">
          <button>
            Логістика
          </button>
        </Link>
        <Link to="/history">
          <button>
            Звіт
          </button>
        </Link>
      </div>
      <div>
        {isLoggedIn ? (
          <UserData/> 
        ) : (
          <div>
          <RegisterSection/>
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