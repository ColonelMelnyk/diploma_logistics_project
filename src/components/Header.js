// src/components/Header.js
import React, { useState } from "react";

const Header = () => {
  // Фейковий стан користувача
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Тимчасові дані користувача
  const user = {
    nickname: "User123",
    avatar:
      "https://via.placeholder.com/40" // заглушка-аватарка
  };

  return (
    <header
      style={{
        borderBottom: "1px solid black",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      {/* Навігація */}
      <nav style={{ display: "flex", gap: "15px" }}>
        <button>Головна</button>
        <button>Сторінка 1</button>
        <button>Сторінка 2</button>
      </nav>

      {/* Перемикач теми */}
      <button>Тема</button>

      {/* Стан акаунта */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {!isLoggedIn ? (
          <button onClick={() => setIsLoggedIn(true)}>Увійти</button>
        ) : (
          <>
            <img
              src={user.avatar}
              alt="avatar"
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
            <span>{user.nickname}</span>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
