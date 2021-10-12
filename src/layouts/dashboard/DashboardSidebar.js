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
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import HomeLogo from "../../assets/home.png";
import DropLogo from "../../assets/drop.png";
import FarmLogo from "../../assets/farm.png";
import TelegramLogo from "../../assets/telegram.png";
import TwitterLogo from "../../assets/twitter.png";
import GithubLogo from "../../assets/github.png";

import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import { drawerWidth } from "./constants";
import { useState, useEffect } from "react";

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
    cT = window.location.href.split("/")[3];
    if (cT === "home") {
      setCurrentTab(0);
    } else if (cT === "liquidity") {
      setCurrentTab(1);
    } else if (cT === "farm") {
      setCurrentTab(2);
    }
  });

  useEffect(()=>{
    setSocialIcon(open)
  },[open])

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={()=>{
          handleDrawerClose();
          setSocialIcon(false)
          }}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {["home", "liquidity", "farm"].map((text, index) => (
          <ListItem
            button
            key={text}
            component={Link}
            to={`/${text}`}
            className={index === currentTab ? "current-tab" : null}
          >
            <ListItemIcon>
              <img
                src={index === 0 ? HomeLogo : index === 1 ? DropLogo : FarmLogo}
                style={{ height: "18px", marginLeft: "5px" }}
                alt="icon"
              ></img>
            </ListItemIcon>
            <ListItemText primary={capitalizeFirstLetter(text)} />
          </ListItem>
        ))}
      </List>

      {
        SocialIcon ?

        <div style={{position:'absolute',bottom:'100px',display:'flex',justifyContent:'space-around',alignItem:'center',width:'100%',padding:'0px 30px'}}>

          <a href="https://t.me/PHNXDAO" target='_blank'>
            <img src={TelegramLogo} style={{height:'22px'}}></img>
          </a>

          <a href="https://twitter.com/phnxdao" target='_blank'>
          <img src={TwitterLogo}  style={{height:'22px'}}></img>
          </a>

          <a href="https://github.com/XORD-one/phoenixdao-lp-staking-dapp" target='_blank'>
          <img src={GithubLogo}   style={{height:'22px'}}></img>
          </a>
  
  
        </div>

        :

        null

      }
      
    </Drawer>
  );
};

export default DashboardSidebar;
