import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/AuthLogicSelectors";
import RegisterSection from "./RegisterSection";
import { NavLink } from "react-router-dom";

import styles from "../styles/HomeBanner.module.css";
import bgImage from "../images/Background_image_1.gif";

const HomeBanner = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <section
      className={styles.banner}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className={styles.content}>
        <NavLink
          to="/logistics"
          className={({ isActive }) =>
            `${styles.centerLink} ${isActive ? styles.active : ""}`
          }
        >
          ЛОГІСТИЧНИЙ ЦЕНТР
        </NavLink>

        {!isLoggedIn && (
          <div className={styles.register}>
            <RegisterSection />
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeBanner;
