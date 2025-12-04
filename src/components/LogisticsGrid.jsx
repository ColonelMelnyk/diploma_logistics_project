import LogisticsCard from "../components/LogisticsCard";

const LogisticsGrid = ({ stores, onOpen, onRefill }) => {
  return (
    <ul>
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
