import * as React from "react";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";

import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";

import { Web3InitAction } from "../../redux/actions/local.actions";
import { useSelector, useDispatch } from "react-redux";
import { useWeb3React } from "@web3-react/core";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function DashboardLayout() {
  // const web3context = useWeb3React();
  // const dispatch = useDispatch();
  // React.useEffect(() => {
  //   if (web3context.active && web3context.account) {
  //     console.log("web3contrext,", web3context);
  //     dispatch(Web3InitAction(web3context));
  //   }
  // }, [web3context]);
  // React.useEffect(() => {
  //   console.log("web3 ==>", web3);
  // }, [web3context]);

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
      <DashboardSidebar
        open={open}
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Box
        // component="main"
        // sx={{ flexGrow: 1, p: 3, background: "#E5E5E5", height: "100vh" }}
        className="main-div"
      >
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
