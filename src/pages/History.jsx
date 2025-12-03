import React from "react";
import { useSelector } from "react-redux";
import { selectRefillHistory } from "../redux/logisticsHistory/LogisticsHistorySelectors";
import HistoryTable from "../components/HistoryTable";

const History = () => {
  const refillHistory = useSelector(selectRefillHistory);

  return (
    <div className="pt-10 pb-20">
      <h1 className="text-center text-3xl font-bold">Історія поповнень</h1>
      <HistoryTable history={refillHistory} />
    </div>
  );
};

export default History;
