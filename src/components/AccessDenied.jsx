import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/AccessDenied.module.css";

const AccessDenied = ({ title, subtitle }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.icon}>🔒</div>

        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>

        <button
          className={styles.btn}
          type="button"
          onClick={() => navigate("/login")}
        >
          Увійти в систему
        </button>
      </div>
    </div>
  );
};

export default AccessDenied;
