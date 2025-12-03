import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Logistics from "./pages/Logistics";
import History from "./pages/History";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="logistics" element={<Logistics />} />
        <Route path="history" element={<History />} />
      </Route>
    </Routes>
  );
}

export default App;
