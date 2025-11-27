import React from "react";
import logo from './logo.svg';
import './App.css';

import Header from "./components/Header";
import Logistics from "./pages/Logistics";
import History from "./pages/History";

function App() {
  return (
    <Router>
      <Header />

      <main style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/logistics" element={<Logistics />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
