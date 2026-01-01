import { Link } from "react-router-dom";
import styles from "../styles/RegisterSection.module.css";

const RegisterSection = () => {
  return (
    <div className={styles.wrap}>
      <Link className={styles.link} to="/login">
        <button className={styles.btn} type="button">
          Логін
        </button>
      </Link>

      <Link className={styles.link} to="/register">
        <button className={`${styles.btn} ${styles.primary}`} type="button">
          Реєстрація
        </button>
      </Link>
    </div>
  );
};

export default RegisterSection;
