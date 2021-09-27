import React, { useState } from "react";
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  TextField,
  InputAdornment,
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
          <Typography style={styles.heading}>Add Liquidity</Typography>
          <Typography style={styles.headigAddLiq}>
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
          // borderTop: "1.5px solid rgba(0,0,0,0.1)",
          height: 1,
          background: "rgba(0, 0, 0, 0.15)",
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
              <Typography style={styles.txtInput}>Input</Typography>
              <Typography style={styles.txtPhnx}>PHNX ↓</Typography>
            </div>
          </div>
          <div style={styles.containerInput}>
            <div style={styles.divPhnxAmount}>
              <Typography style={styles.txtInput}>Available PHNX:</Typography>
              <Typography style={styles.txtAmount}>237,278 PHNX</Typography>
            </div>
            <div style={styles.wrapperInput}>
              <TextField
                hiddenLabel
                id="standard-adornment-weight"
                size="small"
                placeholder="0.0"
                background="rgba(195, 183, 255, 0.17);"
                // onChange={(event)=> setValue(event.target.value)}
                style={styles.inputStyle}
                InputProps={{
                  endAdornment: (
                    <IconButton style={styles.iconBtn} onClick={() => 0}>
                      MAX
                    </IconButton>
                  ),
                }}
              />
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
              <Typography style={styles.txtInput}>Input</Typography>
              <Typography style={{ ...styles.txtPhnx, color: "#454A75" }}>
                ETH ↓
              </Typography>
            </div>
          </div>
          <div style={styles.containerInput}>
            <div style={styles.divPhnxAmount}>
              <Typography style={styles.txtInput}>Available ETH:</Typography>
              <Typography style={styles.txtAmount}>237,278 PHNX</Typography>
            </div>
            <div style={styles.wrapperInput}>
              <TextField
                hiddenLabel
                id="standard-adornment-weight"
                size="small"
                placeholder="0.0"
                background="rgba(195, 183, 255, 0.17);"
                // onChange={(event)=> setValue(event.target.value)}
                style={styles.inputStyle}
                InputProps={{
                  endAdornment: (
                    <IconButton style={styles.iconBtn} onClick={() => 0}>
                      MAX
                    </IconButton>
                  ),
                }}
              />
              {/* <Button variant="contained" style={styles.btnMax}>
                MAX
              </Button> */}
            </div>
          </div>
        </div>

        <div style={styles.containerPoolShare}>
          <div style={styles.txtDivPhEth}>
            <Typography style={styles.txtConvDetails}>
              32,456 PHNX/ETH
            </Typography>
            <Typography style={styles.txtConvDetails}>
              0.004 ETH/PHNX
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Typography style={styles.txtConvDetails}>
              less than 0.01%
            </Typography>
            <Typography style={styles.txtConvDetails}>pool share</Typography>
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
    fontWeight: 700,
    fontSize: 22,
  },
  dialogStyle: {
    padding: "10px 50px 20px 50px",
    boxShadow: "0px 10px 80px 10px rgba(0, 0, 0, 0.06)",
    // marginBottom: 10,
    // borderRadius: 20,
  },
  headigAddLiq: {
    color: "#5F5F5F",
    fontSize: 16,
  },
  divTopHeading: {
    display: "flex",
    flexDirection: "column",
  },
  containerTip: {
    display: "flex",
    width: "100%",
    padding: "18px 15px 18px 22px",
    background:
      "linear-gradient(90deg, rgba(56, 16, 255, 0.55) 0%, rgba(255, 0, 245, 0.55) 143.12%)",
    borderRadius: 15,
    marginBottom: 20,
    // margin: "0px 30px 0px 30px",
  },
  txtTipParagraph: {
    // fontWeight: "bold",
    fontSize: 13,
    // lineHeight: 19,
    color: "#FFFFFF",
  },
  btnAddLiquidity: {
    backgroundColor: "#413AE2",
    margin: "25px 0px 30px 0px",
    height: 55,
    borderRadius: 12,
  },
  tokenContainer: {
    display: "flex",
    flexDirection: "row",
    alignItem: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: "15px 10px 15px 15px",
    // backgroundColor: "#eee",
    backgroundColor: "rgba(195, 183, 255, 0.17)",
    border: "1px solid #E2E1FF",
    borderRadius: 20,
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
    color: "#413AE2",
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
    width: 150,
    size: 12,
    background: "rgba(195, 183, 255, 0.17)",
    // border: "0px solid red",
  },
  wrapperInput: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  containerPoolShare: {
    borderRadius: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    // backgroundColor: "#eee",
    padding: "15px 10px 15px 15px",
    marginTop: 15,
    border: "1px solid #E2E1FF",
  },
  txtDivPhEth: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  txtConvDetails: {
    fontSize: 16,
    fontWeight: 500,
    color: "#62688F",
  },
  txtInput: {
    color: "#707070",
    fontSize: 13,
  },
  iconBtn: {
    // width: 50,
    height: 25,
    backgroundColor: "#C3B7FF",
    borderRadius: 5,
    color: "#413AE2",
    fontSize: 10,
  },
};
