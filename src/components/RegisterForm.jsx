import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, initStoreImagesForUser } from "../redux/AuthLogic";
import styles from "../styles/RegisterForm.module.css";
import Toast from "../components/Toast";

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(true);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  function onCloseModal() {
    setOpenModal(false);
    if (window.history.length > 1) navigate(-1);
    else navigate("/home");
  };

  const showToast = (message, variant = "error") => {
    setToast({ message, variant });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const password = form.elements.password.value.trim();

    if (!name || !email || !password) {
      showToast("Заповніть усі поля, щоб зареєструвати акаунт", "error");
      return;
    }

    try {
      const data = await dispatch(register({ name, email, password })).unwrap();

      form.reset();
      onCloseModal();

      const userKey = data?.user?.email || email;

      dispatch(initStoreImagesForUser({ userKey }))
        .unwrap()
        .then(() => {
        })
        .catch((err) => {
          console.error("Init images error:", err);
        });
    } catch (err) {
      showToast("Не вдалося зареєструвати акаунт. Спробуйте ще раз.", "error");
      console.error("Register error:", err);
    }
  };

  useEffect(() => {
    if (!openModal) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onCloseModal();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openModal]);

  if (!openModal) return null;

  return (
    <>
      <Toast
        message={toast?.message || ""}
        variant={toast?.variant || "error"}
        onClose={() => setToast(null)}
      />

      <div
        className={styles.backdrop}
        role="dialog"
        aria-modal="true"
        aria-label="Реєстрація"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onCloseModal();
        }}
      >
        <div className={styles.modal}>
          <div className={styles.header}>
            <h3 className={styles.title}>Реєстрація в системі</h3>
            <button className={styles.closeBtn} type="button" onClick={onCloseModal}>
              ✕
            </button>
          </div>

          <div className={styles.body}>
            <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
              <div className={styles.field}>
                <label className={styles.label} htmlFor="name">
                  Логін
                </label>
                <input
                  className={styles.input}
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="username"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="email">
                  Пошта
                </label>
                <input
                  className={styles.input}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  autoComplete="email"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="password">
                  Пароль
                </label>
                <input
                  className={styles.input}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                />
              </div>

              <div className={styles.actions}>
                <button className={styles.submit} type="submit">
                  Реєстрація
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
