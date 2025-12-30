import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/AuthLogicSelectors";
import RegisterSection from "./RegisterSection";

const HomeBanner = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div>
      <div>
        <h1>
          TECHSPEED LOGISTIC SYSTEM
        </h1>
        <button type="button" name="login">
          ЛОГІСТИЧНИЙ ЦЕНТР
        </button>
        {!isLoggedIn && (
          <div>
            <RegisterSection />
          </div>
        )}

      </div>
    </div>
  );
};

export default HomeBanner;
