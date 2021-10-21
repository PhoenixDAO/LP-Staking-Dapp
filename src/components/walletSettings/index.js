import React from "react";
import "./wallet.css";
import ShareLogo from "../../assets/share.png";
import copyIcon from "../../assets/copyIcon.svg";
import {
  MenuItem,
  Menu,
  Modal,
  Typography,
  Box,
  Stack,
  TextField,
  InputAdornment,
  Button,
  IconButton,
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import EthLogo from "../../assets/ETH1.png";
import PhnxLogo from "../../assets/PhnxLogo1.png";
import LogoutIcon from "@mui/icons-material/Logout";
import { useWeb3React } from "@web3-react/core";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Logo from "../../assets/Logo.png";
import CloseIcon from "@mui/icons-material/Close";
import redirectIcon from "../../assets/redirectIcon.png";
import { CopyToClipboard } from "react-copy-to-clipboard";
// import { ToastMsg } from "../Toast";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Notify from "../Notify";
import { Link } from "react-router-dom";

const style = {
  greyBalance:{
    color: "#4E4E55",
  },
  address:{
    "& .Mui-disabled.Mui-disabled":{
      color: "black !important",
    }
  }
};

export default function WalletSettings({
  anchorEl,
  open2,
  handleClose2,
  deactivateWallet,
}) {
  const web3context = useWeb3React();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const balancePhnx = useSelector((state) => state.contractReducer.balancePhnx);
  const balanceEth = useSelector((state) => state.localReducer.balanceEth);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="add-liq-div">
          <div className="displayFlex">
            <div className="confirmPhnxDepositeLogo">
              <img className="add-liq-Logo" src={Logo}></img>
            </div>
            <div className="closeModalIcon">
              <span className="cursorPointer">
                <CloseIcon onClick={handleClose} />
              </span>
            </div>
          </div>

          <br />
          <Typography
            variant="h5"
            component="h2"
            color="primary"
            sx={{ color: "#413ae2", fontWeight: "bold" }}
          >
            Wallet
          </Typography>
          <br />
          <Typography sx={{marginBottom:"10px"}} variant="body2" component="h2">
            YOUR ADDRESS
          </Typography>
          <TextField
            id="outlined-basic"
            fullWidth
            variant="outlined"
            disabled
            value={web3context?.account}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <CopyToClipboard
                    text={web3context?.account}
                    onCopy={() => {
                      toast(
                        <Notify
                          text={("success", "Copied to clipboard 😃.")}
                          severity="success"
                        />,
                        {
                          position: "bottom-right",
                        }
                      );
                    }}
                  >
                    <IconButton>
                      {/* <ContentCopyIcon sx={{color:"black"}} />*/}
                      <img src={copyIcon} />
                    </IconButton>
                  </CopyToClipboard>
                </InputAdornment>
              ),
            }}
          />
          <br />
          <br />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={1.5}
          >
            <Typography id="modal-modal-title" variant="body1" component="h2" style={{color:"#4E4E55"}}>
              PHNX BALANCE
            </Typography>
            <div className="rm-liq-phnx-eth-det">
          <img src={PhnxLogo} style={{  height:"20px",
             width: "20px", marginRight:"5px"}}></img>
          <div style={style.greyBalance}>{balancePhnx}</div>
        </div>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography id="modal-modal-title" variant="body1" component="h2" style={{color:"#4E4E55"}}>
              ETH BALANCE
            </Typography>
            <div className="rm-liq-phnx-eth-det">
          <img src={EthLogo} style={{  height:"20px",
  width: "20px", marginRight:"5px"}}></img>
          <div style={style.greyBalance}>{balanceEth}</div>
        </div>
          </Stack>
          <br />
          <div >
        <Link to="/liquidity" style={{textDecoration:'none' ,color:'#413ae2'}} onClick={handleClose}>
          Get PHNX-ETH LP &nbsp;
          <img src={ShareLogo}></img>
        </Link>
      </div>
          <br />

          <button
            className="add-liq-btn cursorPointer"
            onClick={() => {
              deactivateWallet();
              handleClose();
            }}
          >
            Disconnect Wallet
          </button>
        </div>
      </Modal>

      <Menu
        anchorEl={anchorEl}
        open={open2}
        onClose={handleClose2}
        onClick={handleClose2}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              // right: 60,
              width: 13,
              height: 13,
              left: 0,
              right: 0,
              marginLeft: "auto",
              marginRight: "auto",
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
              // border: "2px solid red",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleOpen} style={{margin:'7px 5px',fontSize:'18px'}}>
          <AccountBalanceWalletIcon sx={{ mr: 1, color:"#73727D" }}/>
          <span style={{color:"#4E4E55"}}>
          Wallet
          </span>
        </MenuItem>
        <MenuItem style={{margin:'7px 5px',fontSize:'18px'}}>
          <CompareArrowsIcon sx={{ mr: 1 , color:"#73727D"}} />
          <span style={{color:"#4E4E55"}}>
          Transactions
          </span>
        </MenuItem>
        <MenuItem sx={{ color: "#F43C3C" }} onClick={deactivateWallet} style={{margin:'7px 5px',fontSize:'18px'}}>
          <LogoutIcon sx={{ mr: 1 }} />
          Disconnect
        </MenuItem>
      </Menu>
    </div>
  );
}
