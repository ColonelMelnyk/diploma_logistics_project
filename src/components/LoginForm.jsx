import { logIn } from "../redux/AuthLogic";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import styles from "../styles/LoginForm.module.css";
import Toast from "../components/Toast";

export const LoginForm = () => {
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(true);
  const [toast, setToast] = useState(null);

  function onCloseModal() {
    setOpenModal(false);
  }

  const showToast = (message, variant = "error") => {
    setToast({ message, variant });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    const email = form.elements.email.value.trim();
    const password = form.elements.password.value.trim();

    if (!email || !password) {
      showToast("Заповніть усі поля, щоб увійти в систему", "error");
      return;
    }

    try {
      await dispatch(logIn({ email, password })).unwrap();
      form.reset();
      onCloseModal();
    } catch (err) {
      showToast("Невірні дані. Перевірте пошту або пароль.", "error");
      console.error("Login error:", err);
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
        aria-label="Вхід"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onCloseModal();
        }}
      >
        <div className={styles.modal}>
          <div className={styles.header}>
            <h3 className={styles.title}>Увійдіть в систему</h3>
            <button className={styles.closeBtn} type="button" onClick={onCloseModal}>
              ✕
            </button>
          </div>

          <div className={styles.body}>
            <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
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
                  autoComplete="current-password"
                />
              </div>

              <div className={styles.actions}>
                <button className={styles.submit} type="submit">
                  Вхід
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
