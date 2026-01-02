import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../redux/AuthLogic";
import styles from "../styles/RegisterForm.module.css";

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(true);
  function onCloseModal() {
    setOpenModal(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    dispatch(
      register({
        name: form.elements.name.value,
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
                required
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
                autoComplete="new-password"
                required
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
  );
};

export default RegisterForm;
