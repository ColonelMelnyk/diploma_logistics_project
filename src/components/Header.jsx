import { Link } from "react-router-dom";

const Header = ({ isLoggedIn, user }) => {
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
      <nav style={{ display: "flex", gap: "15px" }}>
        <Link to="/"><button>Головна</button></Link>
        <Link to="/logistics"><button>Логістика</button></Link>
        <Link to="/history"><button>Історія операцій</button></Link>
      </nav>

      <button>Тема</button>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {!isLoggedIn ? (
          <span>Гість</span>
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
