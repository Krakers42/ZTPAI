import { Routes, Route } from "react-router-dom";
import Bikes from "./pages/Bikes.jsx";
import BikeDetail from "./pages/AddBike.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Sidebar from "./pages/Sidebar.jsx";
import PageLayout from "./pages/PageLayout.jsx";

function App() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/bikes" element={<Bikes />} />
      <Route path="/bikes/:id" element={<BikeDetail />} />
      <Route path="/add-bike" element={<BikeDetail />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/sidebar" element={<Sidebar />} />
      <Route path="/page-layout" element={<PageLayout />} />
    </Routes>
  );
}

export default App;
