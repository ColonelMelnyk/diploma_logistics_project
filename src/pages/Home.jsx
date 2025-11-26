import { useState } from "react";
import Slider from "../components/Slider";
import AuthModal from "../components/AuthModal";
import StockInfo from "../components/StoreInfo";

const Home = ({ isLoggedIn, setIsLoggedIn, setUser }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <h2>Головна сторінка</h2>

      <Slider />

      {/* Кнопка бачиться тільки незалогіненому користувачу */}
      {!isLoggedIn && (
        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <button
            style={{ padding: "20px 40px", border: "1px solid black" }}
            onClick={() => setShowModal(true)}
          >
            РЕЄСТРАЦІЯ / ВХІД
          </button>
        </div>
      )}

      {showModal && (
        <AuthModal
          onClose={() => setShowModal(false)}
          setIsLoggedIn={setIsLoggedIn}
          setUser={setUser}
        />
      )}

      {/* ✅ Ця секція ТІЛЬКИ для залогіненого */}
      {isLoggedIn && <StockInfo />}
    </div>
  );
};

export default Home;
