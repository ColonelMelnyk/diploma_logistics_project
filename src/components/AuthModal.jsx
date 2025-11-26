import React, { useState } from "react";

const AuthModal = ({ onClose, setIsLoggedIn, setUser }) => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Фейковий "вхід"
    setUser({
      nickname,
      avatar: "https://via.placeholder.com/40"
    });

    setIsLoggedIn(true);
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        style={{
          background: "white",
          padding: "20px",
          border: "1px solid black",
          width: "300px"
        }}
      >
        <h3>Реєстрація / Вхід</h3>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            type="email"
            placeholder="Пошта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Логін"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Підтвердити</button>
        </form>

        <button onClick={onClose} style={{ marginTop: "10px" }}>
          Закрити
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
