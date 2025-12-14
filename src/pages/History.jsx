import React from "react";
import { useSelector } from "react-redux";
import HistoryTable from "../components/HistoryTable";

const History = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
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
      <HistoryTable />
    </section>
  );
};

export default History;
