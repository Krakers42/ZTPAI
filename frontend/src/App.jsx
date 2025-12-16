import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Bikes from "./pages/Bikes.jsx";
import BikeDetail from "./pages/AddBike.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Sidebar from "./components/layouts/Sidebar.jsx";
import PageLayout from "./components/layouts/PageLayout.jsx";
import GearParts from "./pages/GearParts.jsx";
import Trips from "./pages/Trips.jsx";
import Photos from "./pages/Photos.jsx";
import Account from "./pages/Account.jsx";
import RequireGuest from "./components/auth/RequireGuest.jsx";
import RequireAuth from "./components/auth/RequireAuth.jsx";

function App() {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      "/": "Login | BikeBase",
      "/login": "Login | BikeBase",
      "/register": "Register | BikeBase",
      "/dashboard": "Dashboard | BikeBase",
      "/bikes": "Bikes | BikeBase",
      "/add-bike": "Add bike | BikeBase",
      "/trips": "Trips | BikeBase",
      "/photos": "Photos | BikeBase",
      "/account": "Account | BikeBase",
      "/gear-parts": "Gear&parts | BikeBase",
      "/forgot-password": "Password recovery | BikeBase",
    };

    document.title = titles[location.pathname] || "BikeBase";
  }, [location.pathname]);

  return (
    <Routes>

      {/* PUBLIC */}
      <Route element={<RequireGuest />}>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* PROTECTED */}
      <Route element={<RequireAuth />}>
        <Route path="/bikes" element={<Bikes />} />
        <Route path="/bikes/:id" element={<BikeDetail />} />
        <Route path="/add-bike" element={<BikeDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/page-layout" element={<PageLayout />} />
        <Route path="/gear-parts" element={<GearParts />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/account" element={<Account />} />
      </Route>

    </Routes>
  );
}

export default App;
