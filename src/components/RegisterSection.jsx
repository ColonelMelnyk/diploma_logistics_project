import { Link } from "react-router-dom";

const RegisterSection = () => {
  return (
    <div>
      <Link to="/login">
        <button>
          Логін
        </button>
      </Link>
      <Link to="/register">
        <button>
          Реєстрація
        </button>
      </Link>
    </div>
  );
};

export default RegisterSection;
