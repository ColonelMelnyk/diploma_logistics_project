import React from "react";
import { timeAgo } from "../redux/TimeAgo";

const HistoryTable = ({ history }) => {

  if (!history || history.length === 0) {
    return <p>Немає записів історії</p>;
  }

  return (
    <div >
      <ul>
        {history
          .slice()              
          .reverse()             
          .map((entry, index) => (
            <li
              key={index}
            >
              <p>
                {timeAgo(entry.time)}
              </p>
              {entry.type === "store" ? (
                <div>
                  <p>
                    Поповнення магазину: <span>{entry.store}</span>
                  </p>

                  <p>
                    {Object.keys(entry.details).length === 3
                      ? "Поповнено всі категорії"
                      : `Поповнено: ${Object.keys(entry.details).join(", ")}`}
                  </p>
                </div>
              ) : (
                <div>
                  <p>
                    Поповнення складу
                  </p>

                  <p>
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
