import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import selectRefillHistory from "../redux/LogisticsHistorySelectors";
import styles from "../styles/LogisticsInfo.module.css";

const MAX = {
  computers: 700,
  phones_tablets: 2100,
  accessories: 7000,
};

const STORE_MAX = {
  computers: 100,
  phones_tablets: 300,
  accessories: 1000,
};

const pct = (value, limit) => {
  if (!limit) return 0;
  const p = Math.round((value / limit) * 100);
  return Math.max(0, Math.min(100, p));
};

const clamp = (n) => Math.max(0, Math.min(100, n));

const LogisticsInfo = ({ warehouse, stores }) => {
  const refillHistory = useSelector(selectRefillHistory);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const lastStoreRefill = [...refillHistory]
    .reverse()
    .find((entry) => entry.type === "store");

  const msLeft = (warehouse?.nextArrival ?? 0) - now;
  const minutesLeft = Math.max(0, Math.floor(msLeft / 60000));
  const secondsLeft = Math.max(0, Math.floor((msLeft % 60000) / 1000));

  const computers = warehouse?.computers ?? 0;
  const phones = warehouse?.phones_tablets ?? 0;
  const accessories = warehouse?.accessories ?? 0;

  const lastArrival = warehouse?.lastArrival ?? "немає даних";
  const lastDispatchTime = lastStoreRefill
    ? new Date(lastStoreRefill.time).toLocaleTimeString()
    : "немає даних";
  const lastDispatchStore = lastStoreRefill ? lastStoreRefill.store : "немає даних";

  // ✅ Таблиця станів магазинів
  const storesStatus = useMemo(() => {
    return (stores ?? []).map((s) => {
      const fillC = pct(s.computers ?? 0, STORE_MAX.computers);
      const fillP = pct(s.phones_tablets ?? 0, STORE_MAX.phones_tablets);
      const fillA = pct(s.accessories ?? 0, STORE_MAX.accessories);

      const avg = clamp(Math.round((fillC + fillP + fillA) / 3));

      let kind = "warn";
      let label = "Неповний";

      if (avg === 0) {
        kind = "bad";
        label = "Порожній";
      } else if (avg === 100) {
        kind = "ok";
        label = "Повний";
      }

      return { id: s.id, name: s.name, avg, kind, label };
    });
  }, [stores]);

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <div className={styles.top}>
          <div>
            <h1 className={styles.brand}>TECHSPEED</h1>
            <h2 className={styles.subtitle}>Загальний статус</h2>
          </div>

          <div className={styles.badges}>
            <div className={styles.badge}>
              <span className={styles.badgeLabel}>Наступне прибуття:</span>
              <span>
                {minutesLeft}хв {secondsLeft}с
              </span>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.block}>
            <h3 className={styles.blockTitle}>Склад</h3>

            <ul className={styles.stockList}>
              <li className={styles.stockItem}>
                <div className={styles.stockTop}>
                  <p className={styles.stockName}>Комп&apos;ютери</p>
                  <p className={styles.stockNums}>
                    {computers} / {MAX.computers} ({pct(computers, MAX.computers)}%)
                  </p>
                </div>
                <div className={styles.progress}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${pct(computers, MAX.computers)}%` }}
                  />
                </div>
              </li>

              <li className={styles.stockItem}>
                <div className={styles.stockTop}>
                  <p className={styles.stockName}>Телефони та планшети</p>
                  <p className={styles.stockNums}>
                    {phones} / {MAX.phones_tablets} ({pct(phones, MAX.phones_tablets)}%)
                  </p>
                </div>
                <div className={styles.progress}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${pct(phones, MAX.phones_tablets)}%` }}
                  />
                </div>
              </li>

              <li className={styles.stockItem}>
                <div className={styles.stockTop}>
                  <p className={styles.stockName}>Аксесуари</p>
                  <p className={styles.stockNums}>
                    {accessories} / {MAX.accessories} ({pct(accessories, MAX.accessories)}%)
                  </p>
                </div>
                <div className={styles.progress}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${pct(accessories, MAX.accessories)}%` }}
                  />
                </div>
              </li>
            </ul>

            <p className={styles.note}>Дані оновлюються автоматично під час роботи системи.</p>
          </div>

          <div className={styles.block}>
            <h3 className={styles.blockTitle}>Останні події</h3>

            <ul className={styles.metaList}>
              <li className={styles.metaItem}>
                <span className={styles.metaLabel}>Час останнього прибуття на склад</span>
                <span className={styles.metaValue}>{lastArrival}</span>
              </li>

              <li className={styles.metaItem}>
                <span className={styles.metaLabel}>Час останньої відправки у магазин</span>
                <span className={styles.metaValue}>{lastDispatchTime}</span>
              </li>

              <li className={styles.metaItem}>
                <span className={styles.metaLabel}>Останній поповнений магазин</span>
                <span className={styles.metaValue}>{lastDispatchStore}</span>
              </li>
            </ul>

            <h3 className={styles.blockTitle} style={{ marginTop: 14 }}>
              Стан магазинів
            </h3>

            <div className={styles.storeTable}>
              <div className={styles.storeHead}>
                <div>Магазин</div>
                <div>Заповненість</div>
                <div style={{ textAlign: "right" }}>Статус</div>
              </div>

              {storesStatus.map((s) => (
                <div className={styles.storeRow} key={s.id}>
                  <div className={styles.storeName}>{s.name}</div>
                  <div className={styles.storeFill}>{s.avg}%</div>

                  <div className={`${styles.storeBadge} ${styles[s.kind]}`}>
                    <span className={styles.storeDot} />
                    <span>{s.label}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className={styles.note}>
              Порожній = 0%, Повний = 100%, інакше — Неповний.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogisticsInfo;
