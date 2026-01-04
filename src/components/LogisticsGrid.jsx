import LogisticsCard from "../components/LogisticsCard";
import styles from "../styles/LogisticsGrid.module.css";

const LogisticsGrid = ({ stores, onOpen, onRefill }) => {
  return (
    <ul className={styles.grid}>
      {stores.map((store) => (
        <LogisticsCard
          key={store.id}
          store={store}
          onOpen={onOpen}
          onRefill={onRefill}
        />
      ))}
    </ul>
  );
};

export default LogisticsGrid;
