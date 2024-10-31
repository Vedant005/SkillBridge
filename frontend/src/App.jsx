import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Freelancer from "./pages/Freelancer";
import Client from "./pages/ClientExplore";
import About from "./pages/About";
import Login from "./pages/Login";
import ClientSignup from "./pages/Signup";
import SetProfilePage from "./pages/setProfile";

function App() {
  return (
    <div>
      <Navbar />
      <div className="pt-16"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gigs" element={<Freelancer />} />
        <Route path="/talent" element={<Client />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<ClientSignup />} />
        <Route path="/setProfile" element={<SetProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
