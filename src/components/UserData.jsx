import { logOut } from "../redux/AuthLogic";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/AuthLogicSelectors";
import { useNavigate } from "react-router-dom";
import { persistor } from "../redux/Store";
import styles from "../styles/UserData.module.css";

const UserData = () => {
  const dispatch = useDispatch();
  const { email, name } = useSelector(selectUser);
  const navigate = useNavigate();

  return (
    <div className={styles.wrap}>
      <div className={styles.meta}>
        <p className={styles.name}>User: {name}</p>
        <p className={styles.email}>Mail: {email}</p>
      </div>

      <button
        className={styles.logout}
        type="button"
        onClick={async () => {
          dispatch(logOut());
          await persistor.flush();
          navigate("/home");
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default UserData;
