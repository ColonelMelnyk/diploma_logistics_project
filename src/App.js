import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Logistics from "./pages/Logistics";
import Backlog from "./pages/Backlog";
import Footer from './components/Footer';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} user={user} />

      <main style={{ padding: "20px" }}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setUser={setUser}
              />
            }
          />
          <Route path="/logistics" element={<Logistics />} />
          <Route path="/backlog" element={<Backlog />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
