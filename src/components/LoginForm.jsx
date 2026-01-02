import { logIn } from "../redux/AuthLogic";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import styles from "../styles/LoginForm.module.css";

export const LoginForm = () => {
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(true);
  function onCloseModal() {
    setOpenModal(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    dispatch(
      logIn({
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );

    form.reset();
    onCloseModal();
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
                required
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
                required
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
  );
};

export default LoginForm;
