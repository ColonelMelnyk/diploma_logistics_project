import React from "react";

const LogisticsCardSidebar = ({
  isOpen,
  onClose,
  store,
  onRefillSingle,
  onRefillAll
}) => {
  if (!store) return null; // якщо магазин не вибрано

  // Додаємо базові (не стилізовані) класи для slide-in справа:
  const sidebarStyle = {
    position: "fixed",
    top: 0,
    right: isOpen ? 0 : "-400px", // робить появу справа
    width: "400px",
    height: "100vh",
    background: "#fff",
    transition: "right 0.3s ease-in-out",
    overflowY: "auto",
    padding: "20px",
    borderLeft: "1px solid #ccc",
    zIndex: 1000
  };

  return (
    <aside style={sidebarStyle}>
      {/* Кнопка закриття */}
      <button type="button" onClick={onClose}>
        Закрити
      </button>

      {/* Зображення магазину */}
      <div>
        <img src={store.image} alt={store.name} width="100%" />
      </div>

      {/* Назва магазину */}
      <h2>{store.name}</h2>

      {/* Адреса магазину */}
      <p>
        <strong>Адреса:</strong><br />
        {store.address}
      </p>

      {/* Контакти магазину */}
      <p>
        <strong>Контакти:</strong><br />
        Тел: {store.phone}<br />
        Email: {store.email}
      </p>

      {/* Список товарів */}
      <div>
        <h3>Товари в магазині</h3>

        <ul>

          <li>
            Комп'ютери: {store.computers}/100
            <button onClick={() => onRefillSingle(store.id, "computers")}>
              Поповнити
            </button>
          </li>

          <li>
            Телефони та планшети: {store.phones_tablets}/300
            <button onClick={() => onRefillSingle(store.id, "phones_tablets")}>
              Поповнити
            </button>
          </li>

          <li>
            Аксесуари: {store.accessories}/1000
            <button onClick={() => onRefillSingle(store.id, "accessories")}>
              Поповнити
            </button>
          </li>

        </ul>
      </div>

      {/* Поповнення всіх трьох товарів */}
      <button
        type="button"
        onClick={() => onRefillAll(store.id)}
      >
        Поповнити всі товари
      </button>
    </aside>
  );
};

export default LogisticsCardSidebar;
