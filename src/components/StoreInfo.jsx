import { Link } from "react-router-dom";
const StoreInfo = () => {
  return(
     <section>
      <h1>TECHSPEED</h1>
      <h2>Загальний статус</h2>
      <div>
        <p>Комп'ютери: PLACEHOLDER / PLACEHOLDER</p>
        <p>Телефони та планшети: PLACEHOLDER / PLACEHOLDER</p>
        <p>Аксесуари: PLACEHOLDER / PLACEHOLDER</p>
      </div>
      <Link to="/logistics">
        <button className="text-[28px] opacity-80 dark:text-white">
           Логістика
        </button>
      </Link>
    </section>
  );
};

export default StoreInfo;