import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { Layout } from "./components/Layout";
import Home from "./pages/Home"
//import Logistics from "./pages/Logistics"
import History from "./pages/History"

function App() {
  return (
    <Router>
      <main>
      <Routes>
         <Route path="/" element={<Layout/>}/>
        <Route path = "/Home" element = {<Home/>}/>
       {
       // <Route path = "/logistics" element = {<Logistics/>}/> 
       } 
        <Route path = "/history" element = {<History/>}/>
      </Routes>
      </main>
    </Router>
    
  );
}

export default App;
