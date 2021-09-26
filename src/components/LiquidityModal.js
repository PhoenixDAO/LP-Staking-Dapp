import React, { useState } from "react";
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  TextField,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const LiquidityModal = ({ isVisible, handleClose }) => {
  // const [open, setOpen] = useState(true);
  // const [scroll, setScroll] = useState("body");

  return (
    <Dialog
      open={isVisible}
      onClose={handleClose}
      scroll={"body"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      style={styles.dialogStyle}
    >
      <DialogTitle
        style={{ padding: "30px 50px 20px 50px" }}
        id="scroll-dialog-title"
      >
        <div style={styles.divTopHeading}>
          <Typography style={styles.heading} variant="h6">
            Add Liquidity
          </Typography>
          <Typography variant="caption">
            Add liquidity to the ETH/PHNX pool <br /> and receive LP tokens
          </Typography>
        </div>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <div
        style={{
          borderTop: "1.5px solid rgba(0,0,0,0.1)",
          marginLeft: 50,
          marginRight: 50,
          marginBottom: 7,
        }}
      />
      <div style={styles.dialogStyle}>
        {/* <DialogContent dividers={scroll === "body"}> */}
        <div style={styles.containerTip}>
          <Typography style={styles.txtTipParagraph}>
            Tip: By adding liquidity, you'll earn 0.25% of all trades on this
            pair proportional to your share of the pool. Fees are added to the
            pool, accrue in real time and can be claimed by withdrawing your
            liquidity.
          </Typography>
        </div>
        {/* Phnx */}
        <div style={styles.tokenContainer}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <img
              alt="logo"
              style={styles.imgLogoPhnx}
              src="https://s2.coinmarketcap.com/static/img/coins/200x200/5674.png"
            />
            <div style={styles.containerImg}>
              <Typography variant="caption">Input</Typography>
              <Typography style={styles.txtPhnx}>PHNX ↓</Typography>
            </div>
          </div>
          <div style={styles.containerInput}>
            <div style={styles.divPhnxAmount}>
              <Typography variant="caption">Available PHNX:</Typography>
              <Typography style={styles.txtAmount}>237,278 PHNX</Typography>
            </div>
            <div style={styles.wrapperInput}>
              <TextField
                id="outlined-basic"
                label="PHNX"
                variant="outlined"
                size="small"
                placeholder="0"
                // onChange={(event)=> setValue(event.target.value)}
                style={styles.inputStyle}
              />
              <Button variant="contained" style={styles.btnMax}>
                MAX
              </Button>
            </div>
          </div>
        </div>

        {/* Eth */}
        <div style={styles.tokenContainer}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <img
              alt="logo"
              style={styles.imgLogoPhnx}
              src="https://us.123rf.com/450wm/irrrina/irrrina2103/irrrina210300014/165752199-ethereum-vector-cryptocurrency-icon-isolated-on-white-background-.jpg?ver=6"
            />
            <div style={styles.containerImg}>
              <Typography variant="caption">Input</Typography>
              <Typography style={{ ...styles.txtPhnx, color: "#gray" }}>
                ETH ↓
              </Typography>
            </div>
          </div>
          <div style={styles.containerInput}>
            <div style={styles.divPhnxAmount}>
              <Typography variant="caption">Available PHNX:</Typography>
              <Typography style={styles.txtAmount}>237,278 PHNX</Typography>
            </div>
            <div style={styles.wrapperInput}>
              <TextField
                id="outlined-basic"
                label="PHNX"
                variant="outlined"
                size="small"
                placeholder="0"
                // onChange={(event)=> setValue(event.target.value)}
                style={styles.inputStyle}
              />
              <Button variant="contained" style={styles.btnMax}>
                MAX
              </Button>
            </div>
          </div>
        </div>

        <div style={styles.containerPoolShare}>
          <div style={styles.txtDivPhEth}>
            <Typography variant="caption">32,456 PHNX/ETH</Typography>
            <Typography variant="caption">0.004 ETH/PHNX</Typography>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Typography variant="caption">less than 0.01%</Typography>
            <Typography variant="caption">pool share</Typography>
          </div>
        </div>

        <Button
          variant="contained"
          size="large"
          fullWidth={true}
          style={styles.btnAddLiquidity}
          onClick={handleClose}
        >
          Add Liquidity
        </Button>
      </div>
    </Dialog>
  );
};

export default LiquidityModal;

const styles = {
  heading: {
    color: "#413AE2",
    fontWeight: "bold",
  },
  dialogStyle: {
    padding: "10px 50px 20px 50px",
    // backgroundColor:"#bbb"
  },
  divTopHeading: {
    display: "flex",
    flexDirection: "column",
  },
  containerTip: {
    display: "flex",
    width: "100%",
    padding: "15px 10px 15px 15px",
    background:
      "linear-gradient(90deg, rgba(56, 16, 255, 0.55) 0%, rgba(255, 0, 245, 0.55) 143.12%)",
    borderRadius: 15,
    // margin: "0px 30px 0px 30px",
  },
  txtTipParagraph: {
    // fontWeight: "bold",
    fontSize: 12,
    lineHeight: "150%",
    color: "#FFFFFF",
  },
  btnAddLiquidity: {
    backgroundColor: "#413AE2",
    margin: "15px 0px 30px 0px",
    height: 50,
  },
  tokenContainer: {
    display: "flex",
    flexDirection: "row",
    alignItem: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: "15px 10px 15px 15px",
    backgroundColor: "#eee",
    borderRadius: 15,
    marginTop: 15,
  },
  containerImg: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 8,
    // backgroundColor:"yellow"
  },
  imgLogoPhnx: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  txtPhnx: {
    fontSize: 16,
    fontWeight: "bold",
    color: "blue",
  },
  containerInput: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  txtAmount: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 5,
  },
  divPhnxAmount: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  inputStyle: {
    // fontSize: 12,
    // height: 15,
    // backgroundColor: "red",
    width: 110,
    size: 12,
  },
  wrapperInput: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  btnMax: {
    backgroundColor: "#413AE2",
    padding: "3px 2px 3px 2px",
    marginLeft: 5,
  },
  containerPoolShare: {
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#eee",
    padding: "15px 10px 15px 15px",
    marginTop: 15,
    border: "1px solid rgba(0,0,0,0.1)",
  },
  txtDivPhEth: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
  },
};
