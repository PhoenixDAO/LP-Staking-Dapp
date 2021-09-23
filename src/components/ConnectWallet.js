import * as React from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  Stack,
  styled,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../assets/Logo.png";
import coinbaseIcon from "../assets/coinbase.png";
import ledgerIcon from "../assets/ledger.png";
import metamaskIcon from "../assets/metamask.png";
import walletConnectIcon from "../assets/walletConnect.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: 2,
};

const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  display: "flex",
  alignItems: "center",
}));

export default function ConnectWallet() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined">
        Connect Wallet
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CloseIcon sx={{ ml: "auto" }} fontSize="large" />

          <img src={Logo} alt="logo" />

          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            color="primary"
          >
            Connect to your wallet
          </Typography>

          <Stack spacing={2}>
            <Item>
              <img src={metamaskIcon} alt="logo" />
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Metamask
              </Typography>
            </Item>
            <Divider />
            <Item>
              <img src={walletConnectIcon} alt="logo" />
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Wallet Connect
              </Typography>
            </Item>
            <Divider />
            <Item>
              <img src={coinbaseIcon} alt="logo" />
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Coinbase Wallet
              </Typography>
            </Item>
            <Divider />
            <Item>
              <img src={ledgerIcon} alt="logo" />
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Ledger
              </Typography>
            </Item>
          </Stack>

          <Typography id="modal-modal-title" variant="p" component="p">
            By connecting, I accept PhoenixDAO’s Terms of service
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
