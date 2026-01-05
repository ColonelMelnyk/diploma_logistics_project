import { useEffect, useRef, useState } from "react";
import styles from "../styles/Toast.module.css";

const Toast = ({ message, variant = "error", duration = 2600, onClose }) => {
  const [closing, setClosing] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!message) return;

    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setClosing(true);
      window.setTimeout(() => {
        setClosing(false);
        onClose?.();
      }, 180);
    }, duration);

    return () => window.clearTimeout(timerRef.current);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className={styles.wrap} aria-live="polite" aria-atomic="true">
      <div
        className={`${styles.toast} ${styles[variant]} ${
          closing ? styles.closing : ""
        }`}
        role="status"
      >
        <span className={styles.dot} />
        <span className={styles.text}>{message}</span>

        <button
          className={styles.close}
          type="button"
          aria-label="Закрити повідомлення"
          onClick={() => {
            setClosing(true);
            window.setTimeout(() => {
              setClosing(false);
              onClose?.();
            }, 180);
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Toast;
