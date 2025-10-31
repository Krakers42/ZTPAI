import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Bikes from "./pages/Bikes";
import BikeDetail from "./pages/BikeDetail";

function App() {
  return (
    <Router>
      <nav style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/bikes">Bikes</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/bikes" element={<Bikes />} />
        <Route path="/bikes/:id" element={<BikeDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
