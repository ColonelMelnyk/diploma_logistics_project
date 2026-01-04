import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/LogisticsCardSidebar.module.css";

const CAP = {
  computers: 100,
  phones_tablets: 300,
  accessories: 1000,
};

const CLOSE_MS = 220;

const pct = (value, limit) => {
  if (!limit) return 0;
  const p = Math.round((value / limit) * 100);
  return Math.max(0, Math.min(100, p));
};

const LogisticsCardSidebar = ({
  isOpen,
  onClose,
  store,
  onRefillSingle,
  onRefillAll,
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isOpen && store) {
      setShouldRender(true);
      setIsClosing(false);
      return;
    }

    if (!isOpen) {
      setShouldRender(false);
      setIsClosing(false);
    }
  }, [isOpen, store]);

  useEffect(() => {
    if (!shouldRender) return;

    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const onKeyDown = (e) => {
      if (e.key === "Escape") requestClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRender]);

  useEffect(() => {
    return () => window.clearTimeout(timerRef.current);
  }, []);

  const requestClose = () => {
    if (isClosing) return;

    setIsClosing(true);
    window.clearTimeout(timerRef.current);

    timerRef.current = window.setTimeout(() => {
      setShouldRender(false);
      setIsClosing(false);
      onClose(); 
    }, CLOSE_MS);
  };

  if (!shouldRender || !store) return null;

  return (
    <div
      className={`${styles.backdrop} ${isClosing ? styles.backdropClosing : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={`Магазин: ${store.name}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) requestClose();
      }}
    >
      <aside className={`${styles.panel} ${isClosing ? styles.panelClosing : ""}`}>
        <div className={styles.header}>
          <div className={styles.titleWrap}>
            <h2 className={styles.title}>{store.name}</h2>
            <p className={styles.sub}>{store.address}</p>
          </div>

          <button
            className={styles.closeBtn}
            type="button"
            onClick={requestClose}
            aria-label="Закрити"
          >
            ✕
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.media}>
            <img className={styles.img} src={store.image} alt={store.name} />
          </div>

          <div className={styles.block}>
            <h3 className={styles.blockTitle}>Контакти</h3>
            <div className={styles.kv}>
              <div className={styles.kvItem}>
                <span className={styles.k}>Телефон</span>
                <span className={styles.v}>{store.phone}</span>
              </div>
              <div className={styles.kvItem}>
                <span className={styles.k}>Email</span>
                <span className={styles.v}>{store.email}</span>
              </div>
            </div>
          </div>

          <div className={styles.block}>
            <h3 className={styles.blockTitle}>Товари в магазині</h3>

            <ul className={styles.stockList}>
              <li className={styles.stockItem}>
                <div className={styles.stockTop}>
                  <p className={styles.stockName}>Комп&apos;ютери</p>
                  <p className={styles.stockNums}>
                    {store.computers} / {CAP.computers} ({pct(store.computers, CAP.computers)}%)
                  </p>
                </div>
                <div className={styles.progress}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${pct(store.computers, CAP.computers)}%` }}
                  />
                </div>
                <div className={styles.rowActions}>
                  <button
                    className={styles.btn}
                    type="button"
                    onClick={() => onRefillSingle(store.id, "computers")}
                  >
                    Поповнити
                  </button>
                </div>
              </li>

              <li className={styles.stockItem}>
                <div className={styles.stockTop}>
                  <p className={styles.stockName}>Телефони та планшети</p>
                  <p className={styles.stockNums}>
                    {store.phones_tablets} / {CAP.phones_tablets} (
                    {pct(store.phones_tablets, CAP.phones_tablets)}%)
                  </p>
                </div>
                <div className={styles.progress}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${pct(store.phones_tablets, CAP.phones_tablets)}%` }}
                  />
                </div>
                <div className={styles.rowActions}>
                  <button
                    className={styles.btn}
                    type="button"
                    onClick={() => onRefillSingle(store.id, "phones_tablets")}
                  >
                    Поповнити
                  </button>
                </div>
              </li>

              <li className={styles.stockItem}>
                <div className={styles.stockTop}>
                  <p className={styles.stockName}>Аксесуари</p>
                  <p className={styles.stockNums}>
                    {store.accessories} / {CAP.accessories} (
                    {pct(store.accessories, CAP.accessories)}%)
                  </p>
                </div>
                <div className={styles.progress}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${pct(store.accessories, CAP.accessories)}%` }}
                  />
                </div>
                <div className={styles.rowActions}>
                  <button
                    className={styles.btn}
                    type="button"
                    onClick={() => onRefillSingle(store.id, "accessories")}
                  >
                    Поповнити
                  </button>
                </div>
              </li>
            </ul>

            <div className={styles.footer}>
              <button
                className={`${styles.btn} ${styles.primary}`}
                type="button"
                onClick={() => onRefillAll(store.id)}
              >
                Поповнити всі товари
              </button>
            </div>

            <p className={styles.note}>
              Підказка: натисни <b>Esc</b> або клікни по фону, щоб закрити.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default LogisticsCardSidebar;
