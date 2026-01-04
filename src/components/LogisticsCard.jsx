import styles from "../styles/LogisticsCard.module.css";

const LogisticsCard = ({ store, onOpen, onRefill }) => {
  return (
    <li>
      <article className={styles.card}>
        <div className={styles.media}>
          <img className={styles.img} src={store.image} alt={store.name} />
        </div>

        <div className={styles.body}>
          <h3 className={styles.title}>{store.name}</h3>

          <p className={styles.meta}>
            Комп&apos;ютери: {store.computers} <br />
            Планшети і телефони: {store.phones_tablets} <br />
            Аксесуари: {store.accessories}
          </p>

          <div className={styles.actions}>
            <button className={styles.btn} type="button" onClick={() => onOpen(store.id)}>
              Відкрити
            </button>
            <button
              className={`${styles.btn} ${styles.primary}`}
              type="button"
              onClick={() => onRefill(store.id)}
            >
              Поповнити
            </button>
          </div>
        </div>
      </article>
    </li>
  );
};

export default LogisticsCard;
