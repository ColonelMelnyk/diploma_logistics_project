import { Link } from "react-router-dom";

const RegisterSection = () => {
  return (
    <div className="flex gap-[8px] flex-col">
      <Link to="/login">
        <button className="text-[28px] opacity-80 dark:text-white">
          Логін
        </button>
      </Link>
      <Link to="/register">
        <button className="text-[28px] opacity-80 dark:text-white">
          Реєстрація
        </button>
      </Link>
    </div>
  );
};

export default RegisterSection;
