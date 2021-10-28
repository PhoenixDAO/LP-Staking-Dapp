import React from "react";
import "./wallet.css";
import ShareLogo from "../../assets/share.png";
import { ETHERSCAN_ACCOUNT_LINK_RINKBY } from "../../contract/constant";
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
  greyBalance: {
    color: "#4E4E55",
  },
  address: {
    "& .Mui-disabled.Mui-disabled": {
      color: "black !important",
    },
  },
};

export default function WalletSettings({
  anchorEl,
  open2,
  handleClose2,
  deactivateWallet,
  setTransactionModalStatus,
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
              <img className="add-liq-Logo" style={{visibility:"hidden"}} src={Logo}></img>
            </div>
            <div className="closeModalIcon">
              <span className="cursorPointer">
                <CloseIcon
                  sx={{ transform: "scale(1.2)" }}
                  onClick={handleClose}
                />
              </span>
            </div>
          </div>

{/* <button onClick={handleClose}> */}
              {/* <CloseIcon className="icon-btn" onClick={handleClose} sx={{transform:"scale(1.2)", marginRight:"10px",cursor:"pointer"}} /> */}
            {/* </button> */}
          {/* <br /> */}
          <Typography
            variant="h5"
            component="h2"
            color="primary"
            sx={{ color: "#413ae2", fontWeight: "bold", fontSize:"26px" }}
          >
            Wallet
          </Typography>
          <br />
          <Typography
            sx={{ marginBottom: "10px", color: "#4E4E55" }}
            variant="body2"
            component="h2"
          >
            YOUR ADDRESS
          </Typography>
          <TextField
            id="outlined-basic"
            fullWidth
            variant="outlined"
            disabled
            sx={{ marginBottom: "38px", "& .MuiOutlinedInput-input":{letterSpacing:"0.5px", fontWeight:"500", fontSize:"20px"} }}
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
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={1.8}
          >
            <Typography
              id="modal-modal-title"
              variant="body1"
              component="h2"
              style={{ color: "#4E4E55", fontWeight:"500" }}
            >
              PHNX BALANCE
            </Typography>
            <div className="rm-liq-phnx-eth-det">
              <img
                src={PhnxLogo}
                style={{ height: "20px", width: "20px", marginRight: "5px", fontWeight:"500" }}
              ></img>
              <div style={style.greyBalance}>{balancePhnx}</div>
            </div>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              id="modal-modal-title"
              variant="body1"
              component="h2"
              style={{ color: "#4E4E55", fontWeight:"500" }}
            >
              ETH BALANCE
            </Typography>
            <div className="rm-liq-phnx-eth-det">
              <img
                src={EthLogo}
                style={{ height: "20px", width: "20px", marginRight: "5px", fontWeight:"500" }}
              ></img>
              <div style={style.greyBalance}>{balanceEth}</div>
            </div>
          </Stack>
          <br />
          <div>
            <a
              target="_blank"
              href={`${ETHERSCAN_ACCOUNT_LINK_RINKBY}${web3context.account}`}
              style={{
                textDecoration: "none",
                color: "#413ae2",
                cursor: "pointer",
              }}
            >
              <div className="displayFlex etherScan">
                <div className="cursorPointer">
                  <a
                    href={ETHERSCAN_ACCOUNT_LINK_RINKBY + web3context.account}
                    rel="external nofollow noopener"
                    target="_blank"
                    style={{ textDecoration: "none", color: "#413AE2" }}
                  >
                    View on Etherscan
                  </a>
                </div>
                <div className="openTabPadding  cursorPointer">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.5 2.5V4H1.75V12.25H10V8.5H11.5V13C11.5 13.1989 11.421 13.3897 11.2803 13.5303C11.1397 13.671 10.9489 13.75 10.75 13.75H1C0.801088 13.75 0.610322 13.671 0.46967 13.5303C0.329018 13.3897 0.25 13.1989 0.25 13V3.25C0.25 3.05109 0.329018 2.86032 0.46967 2.71967C0.610322 2.57902 0.801088 2.5 1 2.5H5.5ZM13.75 0.25V7L10.9045 4.15525L6.40525 8.65525L5.34475 7.59475L9.844 3.09475L7 0.25H13.75Z"
                      fill="#413AE2"
                    />
                  </svg>
                </div>
              </div>
            </a>
          </div>
          <br />

          <button
            className="walletDisconnect cursorPointer"
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
        <MenuItem
          onClick={handleOpen}
          style={{ margin: "7px 5px", fontSize: "18px" }}
        >
          <AccountBalanceWalletIcon sx={{ mr: 1, color: "#73727D" }} />
          <span style={{ color: "#4E4E55" }}>Wallet</span>
        </MenuItem>
        <MenuItem
          style={{ margin: "7px 5px", fontSize: "18px" }}
          onClick={() => {
            setTransactionModalStatus(true);
          }}
        >
          <CompareArrowsIcon sx={{ mr: 1, color: "#73727D" }} />
          <span style={{ color: "#4E4E55" }}>Transactions</span>
        </MenuItem>
        <MenuItem
          sx={{ color: "#F43C3C" }}
          onClick={deactivateWallet}
          style={{ margin: "7px 5px", fontSize: "18px" }}
        >
          <LogoutIcon sx={{ mr: 1 }} />
          Disconnect
        </MenuItem>
      </Menu>
    </div>
  );
}
