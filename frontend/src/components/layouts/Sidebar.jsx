import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import useSidebarStyles from "../../styles/SidebarStyles.js";
import { logout } from "../../services/authService.js";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const styles = useSidebarStyles();

  const toggleDrawer = (state) => () => setOpen(state);

  const handleLogout = async () => {
    try {
      await logout();
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

  const renderMenuItems = () =>
    menuItems.map((item) => (
      <ListItemButton
        key={item.text}
        component={Link}
        to={item.to}
        onClick={toggleDrawer(false)}
        sx={styles.menuItem}
      >
        <ListItemIcon sx={styles.menuItemIcon}>{item.icon}</ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItemButton>
    ));

  return (
    <>
      {/* Hamburger for mobile */}
      <IconButton onClick={toggleDrawer(true)} sx={styles.hamburger}>
        <MenuIcon fontSize="inherit" />
      </IconButton>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)} sx={styles.drawer}>
        <Typography sx={styles.logo}>Bike Base</Typography>
        <List sx={{ width: "100%" }}>{renderMenuItems()}</List>
        <Box sx={styles.logoutBox}>
          <Button startIcon={<LogoutIcon />} onClick={handleLogout} sx={styles.logoutButton}>
            Logout
          </Button>
        </Box>
      </Drawer>

      {/* Sidebar for desktop */}
      <Box sx={styles.sidebar}>
        <Typography sx={styles.logo}>Bike Base</Typography>
        <List sx={{ width: "100%", flexGrow: 1 }}>{renderMenuItems()}</List>
        <Button startIcon={<LogoutIcon />} onClick={handleLogout} sx={styles.logoutButtonDesktop}>
          Logout
        </Button>
      </Box>
    </>
  );
}
