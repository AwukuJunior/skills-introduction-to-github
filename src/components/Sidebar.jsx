import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useStore from "../store/useStore";
import "./Sidebar.css";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SettingsIcon from "@mui/icons-material/Settings";
import SavingsIcon from "@mui/icons-material/Savings";
import PersonIcon from "@mui/icons-material/Person";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Sidebar = ({ open, onClose, drawerWidth = 240 }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = useStore((state) => state.user);

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/homepage"  },
    { text: "Dashboard", icon: <DashboardIcon />, path: "/homepage/dashboard" },
    {
      text: "Transactions",
      icon: <AccountBalanceIcon />,
      path: "/homepage/transactions",
    },
    {
      text: "Analytics",
      icon: <TrendingUpIcon />,
      path: "/homepage/analytics",
    },
    { text: "Tips", icon: <SavingsIcon />, path: "/homepage/tips" },
    { text: "Settings", icon: <SettingsIcon />, path: "/homepage/settings" },
    {
      text: "Saving Goals",
      icon: <SavingsIcon />,
      path: "/homepage/savingGoals",
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        open
      >
        <Box className="sidebar-box">
          <Box className="brand">
            <Avatar sx={{ backgroundColor: "#0096FF", marginRight: 2 }}>S</Avatar>
            <Typography
              variant="h6"
              sx={{ color: "#0096FF", fontWeight: "bold" }}
            >
              SmartSave
            </Typography>
          </Box>
          <Divider />
          <Typography variant="h6" className="section-title">
            Manage
          </Typography>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  className={location.pathname === item.path ? "active-link" : "" }
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Typography variant="h6" className="section-title">
            Account
          </Typography>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Avatar
                    sx={{ backgroundColor: "#0096FF", width: 32, height: 32 }}
                  >
                    <PersonIcon />
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={currentUser?.name || "User"}
                  secondary={currentUser?.username || ""}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <Box className="sidebar-box">
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box className="brand" sx={{ px: 2, pb: 2 }}>
            <Avatar sx={{ backgroundColor: "#0096FF", marginRight: 2 }}>S</Avatar>
            <Typography
              variant="h6"
              sx={{ color: "#0096FF", fontWeight: "bold" }}
            >
              SmartSave
            </Typography>
          </Box>
          <Divider />
          <Typography variant="h6" className="section-title">
            Manage
          </Typography>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  className={location.pathname === item.path ? "active-link" : "" }
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Typography variant="h6" className="section-title">
            Account
          </Typography>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Avatar
                    sx={{ backgroundColor: "#0096FF", width: 32, height: 32 }}
                  >
                    <PersonIcon />
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={currentUser?.name || "User"}
                  secondary={currentUser?.username || ""}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
