import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Logistics from "./pages/Logistics";
import History from "./pages/History";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "./redux/AuthLogic";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) dispatch(refreshUser());
  }, [dispatch, token]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Home />} />
        <Route path="register" element={<Home />} />
        <Route path="logistics" element={<Logistics />} />
        <Route path="history" element={<History />} />
      </Route>
    </Routes>
  );
}

export default App;
