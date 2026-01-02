 import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import selectRefillHistory  from "../redux/LogisticsHistorySelectors";

const LogisticsInfo = ({ warehouse, stores }) => {

  const refillHistory = useSelector(selectRefillHistory);

  //const lastEntry = refillHistory.at(-1);

  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000); // або 60000
    return () => clearInterval(t);
  }, []);

  const lastStoreRefill = [...refillHistory]
    .reverse()
    .find((entry) => entry.type === "store");

  const msLeft = warehouse.nextArrival - now;
  const minutesLeft = Math.max(0, Math.floor(msLeft / 60000));

  return (
    <section>
      <h1>TECHSPEED</h1>
      <h2>Загальний статус</h2>

      <div>
        <p>Комп'ютери: {warehouse.computers} / 700</p>
        <p>Телефони та планшети: {warehouse.phones_tablets} / 2100</p>
        <p>Аксесуари: {warehouse.accessories} / 7000</p>
      </div>

      <div>
        <p>
          Час з останнього прибуття на склад:{" "}
          {warehouse.lastArrival ?? "немає даних"}
        </p>

        <p>Час до наступного прибуття: {minutesLeft} хв</p>

        <p>
          Час з останньої відправки у магазин:{" "}
          {lastStoreRefill ? new Date(lastStoreRefill.time).toLocaleTimeString() : "немає даних"}
        </p>

        <p>
          Останній поповнений магазин:{" "}
          {lastStoreRefill ? lastStoreRefill.store : "немає даних"}
        </p>
      </div>

      <div>
        <h3>Магазини</h3>
        <ul>
          {stores.map((store) => (
            <li key={store.id}>
              <a href={`/logistics/store/${store.id}`}>
                {store.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default LogisticsInfo;

