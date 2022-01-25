import React from "react";
import { styled } from "@mui/material/styles";
import { AppBar as MuiAppBar, Toolbar, IconButton, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import menuHamburger from "../../assets/menuHamburger.svg";
import Logo from "../../assets/Logo.png";
import { drawerWidth } from "./constants";
import ConnectWallet from "../../components/ConnectWallet";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  background: "#FFFFFF",
}));

const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const DashboardNavbar = ({ open, handleDrawerOpen }) => {
  return (
    <AppBar
      position="fixed"
      open={open}
      className="hello"
      style={{ boxShadow: "10px 0px 7px 2px rgb(0, 0, 0, 0.1)" }}
      sx={{
        width: open ? "calc(100% - 200px) !important" : "100%",
      }}
    >
      <Toolbar>
        <div className="menuBtnNavbar">
          <IconButton
            // color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              ...(open && { display: "none" }),
            }}
          >
            {/* <MenuIcon /> */}
            <img src={menuHamburger} style={{ margin: "2px" }}></img>
          </IconButton>
        </div>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          className="appBarFlex"
        >
          <Item sx={{ "@media (min-width:450px)": { marginLeft: "50px" } }}>
            <img src={Logo} className="navLogo" alt="logo" />
          </Item>
          <Item>
            <div className="navBarConnectWalletButton">
              <ConnectWallet landingScreenBtn={false} />
            </div>
          </Item>
        </Stack>

        <div className="menuBtnNavbar1">
          <IconButton
            // color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              ...(open && { display: "none" }),
            }}
          >
            {/* <MenuIcon /> */}
            <img src={menuHamburger} style={{ margin: "2px" }}></img>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardNavbar;
