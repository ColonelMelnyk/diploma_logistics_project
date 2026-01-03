import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import HistoryTable from "../components/HistoryTable";
import selectRefillHistory from "../redux/LogisticsHistorySelectors";

const History = () => {
  useEffect(() => {
    document.title = "TechSpeed — History";
  }, []);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const history = useSelector(selectRefillHistory);

  if (!isLoggedIn) {
    return (
      <section>
        <h2>Доступ заборонено</h2>
        <p>Будь ласка, увійдіть у систему, щоб переглянути звіт про поповнення.</p>
      </section>
    );
  }

  return (
    <section>
      <HistoryTable history={history} />
    </section>
  );
};

export default History;
