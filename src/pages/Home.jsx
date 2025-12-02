import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/AuthLogicSelectors";

import { HomeBanner } from "../components/HomeBanner";
import { HomeInfo } from "../components/HomeInfo";
import { StoreInfo } from "../components/StoreInfo";

const Home = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <section>
      <HomeBanner />
      <HomeInfo />
      {isLoggedIn && <StoreInfo />}
    </section>
  );
};

export default Home;
