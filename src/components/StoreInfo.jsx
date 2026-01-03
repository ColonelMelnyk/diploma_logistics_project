import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "../styles/StoreInfo.module.css";

const StoreInfo = () => {
  const userKey = useSelector((state) => state.auth?.user?.email || null);
  const warehouse = useSelector((state) =>
    userKey ? state.warehouse?.byUser?.[userKey] ?? null : null
  );

  const max = {
    computers: 700,
    phones_tablets: 2100,
    accessories: 7000,
  };

  const pct = (value, limit) => {
    if (!limit) return 0;
    const p = Math.round((value / limit) * 100);
    return Math.max(0, Math.min(100, p));
  };

  const computers = warehouse?.computers ?? 0;
  const phones_tablets = warehouse?.phones_tablets ?? 0;
  const accessories = warehouse?.accessories ?? 0;

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <h1 className={styles.brand}>TECHSPEED</h1>
        <h2 className={styles.subtitle}>Загальний статус складу</h2>

        <div className={styles.grid}>
          <div className={styles.item}>
            <p className={styles.itemTitle}>Комп&apos;ютери</p>
            <p className={styles.itemNums}>
              {computers} / {max.computers} ({pct(computers, max.computers)}%)
            </p>
            <div className={styles.progress}>
              <div
                className={styles.progressFill}
                style={{ width: `${pct(computers, max.computers)}%` }}
              />
            </div>
          </div>

          <div className={styles.item}>
            <p className={styles.itemTitle}>Телефони та планшети</p>
            <p className={styles.itemNums}>
              {phones_tablets} / {max.phones_tablets} (
              {pct(phones_tablets, max.phones_tablets)}%)
            </p>
            <div className={styles.progress}>
              <div
                className={styles.progressFill}
                style={{ width: `${pct(phones_tablets, max.phones_tablets)}%` }}
              />
            </div>
          </div>

          <div className={styles.item}>
            <p className={styles.itemTitle}>Аксесуари</p>
            <p className={styles.itemNums}>
              {accessories} / {max.accessories} ({pct(accessories, max.accessories)}%)
            </p>
            <div className={styles.progress}>
              <div
                className={styles.progressFill}
                style={{ width: `${pct(accessories, max.accessories)}%` }}
              />
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <Link to="/logistics">
            <button className={styles.linkBtn}>Логістика</button>
          </Link>
        </div>

        <p className={styles.note}>
          Дані оновлюються автоматично під час роботи системи.
        </p>
      </div>
    </section>
  );
};

export default StoreInfo;
