import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Logistics from "./pages/Logistics"
import History from "./pages/History"

function App() {
  return (
    <Router>
      <main>
      <Header/>
      <Routes>
        <Route path = "/Home" element = {<Home/>}/>
        <Route path = "/logistics" element = {<Logistics/>}/>
        <Route path = "/history" element = {<History/>}/>
      </Routes>
      <Footer/>
      </main>
    </Router>
    
  );
}

export default App;
