import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import HistoryTable from "../components/HistoryTable";
import selectRefillHistory from "../redux/LogisticsHistorySelectors";
import AccessDenied from "../components/AccessDenied";
const History = () => {
  useEffect(() => {
    document.title = "TechSpeed — History";
  }, []);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const history = useSelector(selectRefillHistory);

  if (!isLoggedIn) {
    return (
      <AccessDenied
        title="Доступ заборонено"
        subtitle="Будь ласка, увійдіть у систему, щоб отримати доступ до центру керування логістикою"
      />
    );
  }

  return (
    <section>
      <HistoryTable history={history} />
    </section>
  );
};

export default History;
