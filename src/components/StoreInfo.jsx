const StockInfo = () => {
  return (
    <div
      style={{
        border: "1px solid black",
        padding: "20px",
        marginTop: "40px",
        width: "400px",
        marginLeft: "auto",
        marginRight: "auto"
      }}
    >
      <h3>Інформація складу</h3>

      <p>До прибуття нової партії: <strong>12 днів</strong></p>
      <p>Часу з моменту останньої відправки: <strong>3 дні</strong></p>
      <p>Останній отримувач: <strong>Магазин №4, Вул. Котляревського, 85</strong></p>
      <p>Комп'ютерів на складі: <strong>150</strong></p>
      <p>Телефонів на складі: <strong>320</strong></p>
      <p>Планшетів на складі: <strong>90</strong></p>
      <p>Аксесуарів на складі: <strong>540</strong></p>
    </div>
  );
};

export default StockInfo;
