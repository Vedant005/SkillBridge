import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Freelancer from "./pages/Freelancer";
import Client from "./pages/ClientExplore";

function App() {
  return (
    <div>
      <Navbar />
      <div className="pt-16"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gigs" element={<Freelancer />} />
        <Route path="/talent" element={<Client />} />
      </Routes>
    </div>
  );
}

export default App;
