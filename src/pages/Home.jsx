import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/AuthLogicSelectors";
import { useLocation } from "react-router-dom";
import HomeBanner from "../components/HomeBanner";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import HomeInfo from "../components/HomeInfo";
import StoreInfo from "../components/StoreInfo";

const Home = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();
  const showLogin = location.pathname === "/login";
  const showRegister = location.pathname === "/register";
  return (
    <section>
      <HomeBanner />
      <HomeInfo />
      { isLoggedIn && <StoreInfo />
      }
      {showLogin && <LoginForm />}
      {showRegister && <RegisterForm />}
    </section>
  );
};

export default Home;
