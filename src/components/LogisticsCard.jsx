const LogisticsCard = ({ store, onOpen, onRefill }) => {
  return (
    <li>
      <article>
        <div>
          <img src={store.image} alt={store.name} width="360" />
        </div>
        <div>
          <h3>{store.name}</h3>
          <p>
            Комп'ютери: {store.computers} | 
            Планшети і телефони: {store.phones_tablets} | 
            Аксесуари: {store.accessories}
          </p>
          <button type="button" onClick={() => onOpen(store.id)}>
            Відкрити
          </button>
          <button type="button" onClick={() => onRefill(store.id)}>
            Поповнити
          </button>
        </div>
      </article>
    </li>
  );
};

export default LogisticsCard;
