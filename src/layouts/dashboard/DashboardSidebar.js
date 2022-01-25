import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import {
  Drawer as MuiDrawer,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import VersionSwitch from "../../components/versionSwitch/versionSwitch";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeLogo from "../../assets/home.png";
import Logo from "../../assets/Logo.png";
import DropLogo from "../../assets/drop.png";
import FarmLogo from "../../assets/farm.png";
import TelegramLogo from "../../assets/telegram.png";
import TwitterLogo from "../../assets/twitter.png";
import GithubLogo from "../../assets/github.png";
import { drawerWidth } from "./constants";
import CloseIcon from "@mui/icons-material/Close";
import ConnectWallet from "../../components/ConnectWallet";

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const DashboardSidebar = ({ open, handleDrawerClose }) => {
  const theme = useTheme();

  const [currentTab, setCurrentTab] = useState(0);
  let cT;
  const [SocialIcon, setSocialIcon] = useState(false);

  useEffect(() => {
    // console.log("routing:", window.location.href.split("/"));
    cT = window.location.href.split("/")[4];
    if (cT === "home") {
      setCurrentTab(0);
    } else if (cT === "liquidity") {
      setCurrentTab(1);
    } else if (cT === "farm") {
      setCurrentTab(2);
    }
  });

  useEffect(() => {
    setSocialIcon(open);
  }, [open]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      className={SocialIcon ? "sideBarFullScreen" : "sideBarFullScreenClose"}
      sx={{
        "@media (min-width:500px)": {
          "& .MuiPaper-root": {
            maxWidth: "200px",
          },
          "& .MuiDrawer-docked .MuiDrawer-paper": {
            maxWidth: "200px",
          },
        },
      }}
    >
      <div className="navCloseHeader">
        <DrawerHeader>
          <IconButton
            onClick={() => {
              handleDrawerClose();
              setSocialIcon(false);
            }}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
      </div>
      <div style={{ display: "flex" }}>
        <img src={Logo} alt="" className="navBar-Logo"></img>
        <div className="navCloseHeaderCross" style={{ marginLeft: "auto" }}>
          <DrawerHeader>
            <IconButton
              onClick={() => {
                handleDrawerClose();
                setSocialIcon(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </DrawerHeader>
        </div>
      </div>

      <br></br>

      <div
        className="smallScreenConnectBtn"
        style={{
          width: "fit-content",
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center",
        }}
      >
        <ConnectWallet landingScreenBtn={true} />
      </div>
      {/* <Divider /> */}
      <List className={"navIconsList"}>
        {["home", "liquidity", "farm"].map((text, index) => (
          <div
            className={
              index === currentTab
                ? "current-tab Navbar-Mobile-Screen"
                : "no-current-tab Navbar-Mobile-Screen"
            }
          >
            <ListItem
              button
              key={text}
              component={Link}
              to={`/v2/${text}`}
              style={{
                color: "#73727D",
                fontWeight: "500",
                marginBottom: "20px",
              }}
              onClick={() => {
                if (window.innerWidth < 500) {
                  handleDrawerClose();
                  setSocialIcon(false);
                }
              }}
            >
              <div className="minWidth">
                <ListItemIcon>
                  <img
                    src={
                      index === 0 ? HomeLogo : index === 1 ? DropLogo : FarmLogo
                    }
                    style={{ height: "20px", marginLeft: "5px" }}
                    alt="icon"
                  ></img>
                </ListItemIcon>
              </div>

              <ListItemText
                sx={{
                  "& .MuiListItemText-primary": {
                    fontWeight: "900",
                  },
                }}
                primary={capitalizeFirstLetter(text)}
              />
            </ListItem>
          </div>
        ))}
      </List>
      <div className="social-icons-sidebar1">
        <VersionSwitch isSidebarOpen={open} />
      </div>
      {SocialIcon ? (
        <div className="social-icons-sidebar">
          <a href="https://t.me/PHNXDAO" target="_blank">
            <img src={TelegramLogo}></img>
          </a>

          <a href="https://twitter.com/phnxdao" target="_blank">
            <img src={TwitterLogo}></img>
          </a>

          <a
            href="https://github.com/PhoenixDAO/LP-Staking-Dapp/tree/main"
            target="_blank"
          >
            <img src={GithubLogo}></img>
          </a>
        </div>
      ) : null}
    </Drawer>
  );
};

export default DashboardSidebar;
