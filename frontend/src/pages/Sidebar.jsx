import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  DirectionsBike as BikeIcon,
  Build as GearIcon,
  Photo as PhotoIcon,
  Route as RouteIcon,
  AccountCircle as AccountIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (state) => () => setOpen(state);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, to: "/dashboard" },
    { text: "Bikes", icon: <BikeIcon />, to: "/bikes" },
    { text: "Gear & Parts", icon: <GearIcon />, to: "/gear-parts" },
    { text: "Photos", icon: <PhotoIcon />, to: "/photos" },
    { text: "Trips", icon: <RouteIcon />, to: "/trips" },
    { text: "Account", icon: <AccountIcon />, to: "/account" },
  ];

  return (
    <>
      {/* HAMBURGER ICON */}
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{
          position: "absolute",
          top: 20,
          left: 20,
          fontSize: 40,
          color: "black",
          zIndex: 1300,
          display: { xs: "block", sm: "none" },
        }}
      >
        <MenuIcon fontSize="inherit" />
      </IconButton>

      {/* SIDEBAR DRAWER */}
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "70%", sm: 280 },
            background:
              "linear-gradient(130deg, rgba(120,197,244,1) 25%, rgba(5,66,103,1) 75%)",
            color: "white",
            borderTopRightRadius: "12px",
            borderBottomRightRadius: "12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: 4,
          },
        }}
      >
        {/* LOGO / HEADER */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            mb: 3,
            textAlign: "center",
            color: "white",
            textShadow: "1px 1px 4px rgba(0,0,0,0.3)",
          }}
        >
          Bike Base
        </Typography>

        {/* MENU ITEMS */}
        <List sx={{ width: "100%" }}>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              component={Link}
              to={item.to}
              onClick={toggleDrawer(false)}
              sx={{
                mx: 2,
                mb: 1,
                borderRadius: 2,
                bgcolor: "white",
                color: "black",
                "&:hover": {
                  bgcolor: "#a1d3fd",
                  transform: "scale(1.05)",
                },
                transition: "all 0.2s ease-in-out",
                boxShadow: "2px 2px 5px rgba(0,0,0,0.4)",
              }}
            >
              <ListItemIcon sx={{ color: "black", minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>

        {/* LOGOUT BUTTON */}
        <Box sx={{ mt: "auto", mb: 2 }}>
          <Button
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              "&:hover": { color: "#a1d3fd" },
            }}
          >
            Logout
          </Button>
        </Box>
      </Drawer>

      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          flexDirection: "column",
          alignItems: "center",
          width: 280,
          height: "100vh",
          background:
            "linear-gradient(130deg, rgba(120,197,244,1) 25%, rgba(5,66,103,1) 75%)",
          borderTopRightRadius: 2,
          borderBottomRightRadius: 2,
          color: "white",
          pt: 4,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            mb: 3,
            textAlign: "center",
            color: "white",
            textShadow: "1px 1px 4px rgba(0,0,0,0.3)",
          }}
        >
          Bike Base
        </Typography>

        <List sx={{ width: "100%", flexGrow: 1 }}>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              component={Link}
              to={item.to}
              sx={{
                mx: 2,
                mb: 1,
                borderRadius: 2,
                bgcolor: "white",
                color: "black",
                "&:hover": {
                  bgcolor: "#a1d3fd",
                  transform: "scale(1.05)",
                },
                transition: "all 0.2s ease-in-out",
                boxShadow: "2px 2px 5px rgba(0,0,0,0.4)",
              }}
            >
              <ListItemIcon sx={{ color: "black", minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>

        <Button
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            mb: 2,
            "&:hover": { color: "#a1d3fd" },
          }}
        >
          Logout
        </Button>
      </Box>
    </>
  );
}
