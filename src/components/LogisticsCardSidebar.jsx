import React from "react";

const LogisticsCardSidebar = ({
  isOpen,
  onClose,
  store,
  onRefillSingle,
  onRefillAll,
}) => {
  if (!store) return null;

  return (
    <aside
      className={`fixed top-0 right-0 h-screen w-[400px] bg-white border-l border-gray-300 z-[1000] overflow-y-auto p-5 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        type="button"
        onClick={onClose}
        className="mb-4 inline-flex items-center justify-center rounded border border-gray-400 px-3 py-1 text-sm hover:bg-gray-100"
      >
        Закрити
      </button>

      <div className="mb-4">
        <img src={store.image} alt={store.name} className="w-full h-auto" />
      </div>

      <h2 className="mb-2 text-xl font-semibold">{store.name}</h2>

      <p className="mb-2 text-sm">
        <strong>Адреса:</strong>
        <br />
        {store.address}
      </p>

      <p className="mb-4 text-sm">
        <strong>Контакти:</strong>
        <br />
        Тел: {store.phone}
        <br />
        Email: {store.email}
      </p>

      <div className="mb-4">
        <h3 className="mb-2 font-semibold">Товари в магазині</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center justify-between gap-2">
            <span>
              Комп'ютери: {store.computers}/100
            </span>
            <button
              onClick={() => onRefillSingle(store.id, "computers")}
              className="rounded border border-gray-400 px-2 py-1 text-xs hover:bg-gray-100"
            >
              Поповнити
            </button>
          </li>

          <li className="flex items-center justify-between gap-2">
            <span>
              Телефони та планшети: {store.phones_tablets}/300
            </span>
            <button
              onClick={() => onRefillSingle(store.id, "phones_tablets")}
              className="rounded border border-gray-400 px-2 py-1 text-xs hover:bg-gray-100"
            >
              Поповнити
            </button>
          </li>

          <li className="flex items-center justify-between gap-2">
            <span>
              Аксесуари: {store.accessories}/1000
            </span>
            <button
              onClick={() => onRefillSingle(store.id, "accessories")}
              className="rounded border border-gray-400 px-2 py-1 text-xs hover:bg-gray-100"
            >
              Поповнити
            </button>
          </li>
        </ul>
      </div>

      <button
        type="button"
        onClick={() => onRefillAll(store.id)}
        className="w-full rounded border border-gray-700 px-3 py-2 text-sm font-semibold hover:bg-gray-100"
      >
        Поповнити всі товари
      </button>
    </aside>
  );
};

export default LogisticsCardSidebar;
