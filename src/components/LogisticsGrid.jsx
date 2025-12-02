import LogisticsCard from "../LogisticsCard/LogisticsCard";
import stores from "../data_storage/StoreData";

const LogisticsGrid = ({ onOpen, onRefill }) => {
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
