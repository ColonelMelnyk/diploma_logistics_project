import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const StoreInfo = () => {
  const warehouse = useSelector((state) => state.warehouse);
  return(
     <section>
      <h1>TECHSPEED</h1>
      <h2>Загальний статус</h2>
      <div>
       <p>Комп'ютери: {warehouse.computers} / 700</p>
        <p>Телефони та планшети: {warehouse.phones_tablets} / 2100</p>
        <p>Аксесуари: {warehouse.accessories} / 7000</p>
      </div>
      <Link to="/logistics">
        <button>
           Логістика
        </button>
      </Link>
    </section>
  );
};

export default StoreInfo;