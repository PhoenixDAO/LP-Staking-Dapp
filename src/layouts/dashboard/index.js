import * as React from "react";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";

import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function DashboardLayout() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <DashboardNavbar open={open} handleDrawerOpen={handleDrawerOpen} />
      <DashboardSidebar open={open} handleDrawerClose={handleDrawerClose} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, background: "#E5E5E5", height: "100vh" }}
      >
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
