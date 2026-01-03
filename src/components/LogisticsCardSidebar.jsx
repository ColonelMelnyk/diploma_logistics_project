import React from "react";

const LogisticsCardSidebar = ({
  isOpen,
  onClose,
  store,
  onRefillSingle,
  onRefillAll,
}) => {
  if (!isOpen || !store) return null;
  return (
    <aside>
      <button
        type="button" onClick={onClose}>Закрити
      </button>
      <div>
        <img src={store.image} alt={store.name} />
      </div>
      <h2>{store.name}</h2>
      <p>
        <strong>Адреса:</strong>
        <br />{store.address}
      </p>
      <p>
        <strong>Контакти:</strong>
        <br />Тел: {store.phone}<br />
        Email: {store.email}
      </p>
      <div>
        <h3>Товари в магазині</h3>
        <ul>
          <li>
            <span>Комп'ютери: {store.computers}/100</span>
            <button
              onClick={() => onRefillSingle(store.id, "computers")}>Поповнити
            </button>
          </li>
          <li>
            <span>Телефони та планшети: {store.phones_tablets}/300</span>
            <button
              onClick={() => onRefillSingle(store.id, "phones_tablets")}>Поповнити
            </button>
          </li>
          <li>
            <span>Аксесуари: {store.accessories}/1000</span>
            <button 
            onClick={() => onRefillSingle(store.id, "accessories")}>Поповнити
            </button>
          </li>
        </ul>
      </div>
      <button
        type="button" onClick={() => onRefillAll(store.id)}>Поповнити всі товари
      </button>
    </aside>
  );
};

export default LogisticsCardSidebar;
