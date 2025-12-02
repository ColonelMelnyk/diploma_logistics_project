 import React from "react";
 import stores from "../data_storage/StoreData"; 

const LogisticsInfo = () => {
  return (
    <section>
      <h1>TECHSPEED</h1>
      <h2>Загальний статус</h2>
      <div>
        <p>Комп'ютери: PLACEHOLDER / PLACEHOLDER</p>
        <p>Телефони та планшети: PLACEHOLDER / PLACEHOLDER</p>
        <p>Аксесуари: PLACEHOLDER / PLACEHOLDER</p>
      </div>
      <div>
        <p>Час з останнього прибуття товарів на склад: PLACEHOLDER</p>
        <p>Час до наступного прибуття товарів на склад: PLACEHOLDER</p>
        <p>Час з останньої відправки товарів у магазин: PLACEHOLDER</p>
        <p>Останній поповнений магазин: PLACEHOLDER</p>
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
