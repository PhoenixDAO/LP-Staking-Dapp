import React from "react";
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
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
        {/* <Box sx={style}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <img src={Logo} alt="logo" width="93px" height="25px" />
            <IconButton onClick={handleClose}>
              <CloseIcon fontSize="medium" />
            </IconButton>
          </Stack>
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
          <Typography variant="body2" component="h2">
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
                      ToastMsg("success", "Copied to clipboard");
                    }}
                  >
                    <IconButton>
                      <ContentCopyIcon />
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
          >
            <Typography id="modal-modal-title" variant="body1" component="h2">
              PHNX BALANCE
            </Typography>
            <Typography id="modal-modal-description">{balancePhnx}</Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography id="modal-modal-title" variant="body1" component="h2">
              ETH BALANCE
            </Typography>
            <Typography id="modal-modal-description">{balanceEth}</Typography>
          </Stack>
          <br />
          <Typography
            variant="body2"
            component="h2"
            color="primary"
            sx={{ color: "#413ae2", fontWeight: "bold" }}
          >
            View on Etherscan <img src={redirectIcon} alt="redirectIcon" />
          </Typography>
          <br />
          <Button
            fullWidth
            variant="outlined"
            onClick={() => {
              deactivateWallet();
              handleClose();
            }}
            sx={{
              height: "50px",
              backgroundColor: "#fff",
              color: "#413ae2",
              borderColor: "#413ae2",
              "&: hover": {
                color: "#fff",
                backgroundColor: "#413ae2",
              },
            }}
          >
            Disconnect Wallet
          </Button>
        </Box> */}
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
          <Typography variant="body2" component="h2">
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
                          text={"success", "Copied to clipboard 😃."}
                          severity="success"
                        />,
                        {
                          position: "bottom-right",
                        }
                      );
                    }}
                  >
                    <IconButton>
                      <ContentCopyIcon />
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
          >
            <Typography id="modal-modal-title" variant="body1" component="h2">
              PHNX BALANCE
            </Typography>
            <Typography id="modal-modal-description">{balancePhnx}</Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography id="modal-modal-title" variant="body1" component="h2">
              ETH BALANCE
            </Typography>
            <Typography id="modal-modal-description">{balanceEth}</Typography>
          </Stack>
          <br />
          <Typography
            variant="body2"
            component="h2"
            color="primary"
            sx={{ color: "#413ae2", fontWeight: "bold" }}
          >
            View on Etherscan <img src={redirectIcon} alt="redirectIcon" />
          </Typography>
          <br />



            <button className="add-liq-btn cursorPointer"  onClick={() => {
              deactivateWallet();
              handleClose();
            }}>Disconnect Wallet</button>
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
        <MenuItem onClick={handleOpen}>
          <AccountBalanceWalletIcon sx={{ mr: 1 }} />
          Wallet
        </MenuItem>
        <MenuItem>
          <CompareArrowsIcon sx={{ mr: 1 }} />
          Transactions
        </MenuItem>
        <MenuItem sx={{ color: "#F43C3C" }} onClick={deactivateWallet}>
          <LogoutIcon sx={{ mr: 1 }} />
          Disconnect
        </MenuItem>
      </Menu>
    </div>
  );
}
