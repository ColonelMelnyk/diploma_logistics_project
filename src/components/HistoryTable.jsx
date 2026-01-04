import React from "react";
import { timeAgo } from "../redux/TimeAgo";
import styles from "../styles/HistoryTable.module.css";

const fmtDetails = (details) => {
  if (!details) return "—";
  const keys = Object.keys(details);

  if ("computers" in details || "phones_tablets" in details || "accessories" in details) {
    const c = details.computers ?? 0;
    const p = details.phones_tablets ?? 0;
    const a = details.accessories ?? 0;
    return `Комп'ютери: ${c}, Телефони/планшети: ${p}, Аксесуари: ${a}`;
  }

  if (keys.length === 0) return "—";
  if (keys.length === 3) return "Поповнено всі категорії";

  const k = keys[0];
  const label =
    k === "computers"
      ? "Комп'ютери"
      : k === "phones_tablets"
      ? "Телефони/планшети"
      : k === "accessories"
      ? "Аксесуари"
      : k;

  return `Поповнено: ${label} (+${details[k]})`;
};

const HistoryTable = ({ history }) => {
  const rows = (history ?? []).slice().reverse();

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Історія подій</h2>
            <p className={styles.sub}>
              Поповнення складу та відправки в магазини (останнє зверху)
            </p>
          </div>

          <div className={styles.count}>
            Записів: <span>{rows.length}</span>
          </div>
        </div>

        {rows.length === 0 ? (
          <div className={styles.empty}>Немає записів історії</div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>Коли</th>
                  <th className={styles.th}>Тип</th>
                  <th className={styles.th}>Обʼєкт</th>
                  <th className={styles.th}>Деталі</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((entry, index) => {
                  const isStore = entry.type === "store";
                  const when = timeAgo(entry.time);
                  const exact = new Date(entry.time).toLocaleString();

                  return (
                    <tr className={styles.row} key={`${entry.time}-${index}`}>
                      <td className={styles.td}>
                        <div title={exact}>{when}</div>
                        <div className={styles.details}>{exact}</div>
                      </td>

                      <td className={styles.td}>
                        <span
                          className={`${styles.badge} ${
                            isStore ? styles.badgeStore : styles.badgeWarehouse
                          }`}
                        >
                          {isStore ? "Магазин" : "Склад"}
                        </span>
                      </td>

                      <td className={styles.td}>
                        {isStore ? (
                          <div>
                            <div>{entry.store}</div>
                            <div className={styles.details}>Відправка / поповнення</div>
                          </div>
                        ) : (
                          <div>
                            <div>Центральний склад</div>
                            <div className={styles.details}>Прибуття поставки</div>
                          </div>
                        )}
                      </td>

                      <td className={styles.td}>
                        <div>{fmtDetails(entry.details)}</div>
                        <div className={styles.details}>
                          <span className={styles.muted}>ID:</span>{" "}
                          {entry.type}-{String(entry.time).slice(-6)}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default HistoryTable;
