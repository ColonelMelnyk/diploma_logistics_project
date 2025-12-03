import React from "react";
import { timeAgo } from "../redux/TimeAgo";

const HistoryTable = ({ history }) => {

  if (!history || history.length === 0) {
    return <p className="text-center opacity-70 mt-10">Немає записів історії</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <ul className="space-y-4">

        {history
          .slice()               // копія
          .reverse()             // нові зверху
          .map((entry, index) => (
            <li
              key={index}
              className="border rounded p-4 shadow-sm bg-white"
            >
              <p className="text-sm opacity-70 mb-2">
                {timeAgo(entry.time)}
              </p>
              {entry.type === "store" ? (
                <div>
                  <p className="font-semibold">
                    Поповнення магазину: <span className="text-blue-600">{entry.store}</span>
                  </p>

                  <p className="mt-1">
                    {Object.keys(entry.details).length === 3
                      ? "Поповнено всі категорії"
                      : `Поповнено: ${Object.keys(entry.details).join(", ")}`}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="font-semibold text-green-700">
                    Поповнення складу
                  </p>

                  <p className="mt-1 opacity-80 text-sm">
                    Додано:
                    <br /> Комп'ютери: {entry.details.computers}
                    <br /> Телефони/планшети: {entry.details.phones_tablets}
                    <br /> Аксесуари: {entry.details.accessories}
                  </p>
                </div>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default HistoryTable;
