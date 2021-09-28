import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  // Dialog,
  // DialogTitle,
  Modal,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ComponentCss from "./componentCss.css";
import PhnxLogo from "../assets/phnxLogo.png";

const LiquidityModal = ({ isVisible, handleClose }) => {
  const [eth, setEth] = useState(0);
  const [phnx, setPhnx] = useState(0);

  const _OnChangeHandler = (val, tokenName) => {
    if (tokenName == "phnx") {
      setPhnx(val);
      // console.log(phnx, "phnx state");
    } else {
      setEth(val);
      // console.log(eth, "eth state");
    }
  };

  useEffect(() => {
    console.log("setting input value");
  }, [_OnChangeHandler]);

  return (
    <Modal
      open={isVisible}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styles.containerStyle}>
        <div style={{ padding: "20px 50px 20px 50px" }}>
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
              right: 30,
              top: 30,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div
          style={{
            height: 1,
            background: "rgba(0, 0, 0, 0.15)",
            marginLeft: 50,
            marginRight: 50,
            marginBottom: 7,
          }}
        />
        <div style={styles.dialogStyle}>
          <div style={styles.containerTip}>
            <Typography style={styles.txtTipParagraph}>
              Tip: By adding liquidity, you'll earn 0.25% of all trades on this
              pair proportional to your share of the pool. Fees are added to the
              pool, accrue in real time and can be claimed by withdrawing your
              liquidity.
            </Typography>
          </div>

          <div>
            <div style={styles.tokenContainer}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img alt="logo" style={styles.imgLogoPhnx} src={PhnxLogo} />
                <div style={styles.containerImg}>
                  <Typography style={styles.txtInput}>Input</Typography>
                  <Typography style={styles.txtPhnx}>PHNX ↓</Typography>
                </div>
              </div>
              <div style={styles.containerInput}>
                <div style={styles.divPhnxAmount}>
                  <Typography style={styles.txtInput}>
                    Available PHNX:
                  </Typography>
                  <Typography style={styles.txtAmount}>237,278 PHNX</Typography>
                </div>
                <div style={styles.wrapperInput}>
                  <TextField
                    hiddenLabel
                    id="standard-adornment-weight"
                    size="small"
                    placeholder="0.0"
                    background="rgba(195, 183, 255, 0.17);"
                    value={phnx}
                    type="number"
                    onChange={(event) =>
                      _OnChangeHandler(event.target.value, "phnx")
                    }
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

            <div style={styles.addDiv}></div>

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
                  <Typography style={styles.txtInput}>
                    Available ETH:
                  </Typography>
                  <Typography style={styles.txtAmount}>237,278 PHNX</Typography>
                </div>
                <div style={styles.wrapperInput}>
                  <TextField
                    hiddenLabel
                    id="standard-adornment-weight"
                    size="small"
                    placeholder="0.0"
                    background="rgba(195, 183, 255, 0.17)"
                    value={eth}
                    type="number"
                    onChange={(event) =>
                      _OnChangeHandler(event.target.value, "eth")
                    }
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
      </Box>
    </Modal>
  );
};

export default LiquidityModal;

const styles = {
  containerStyle: {
    position: "absolute",
    maxHeight: "95%",
    overflowY: "scroll",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: 400,
    bgcolor: "#fff",
    // border: "2px solid #000",
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
  },
  addDiv: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F3FF",
    border: "3px solid #E2E1FF",
    alignSelf: "center",
  },
  heading: {
    color: "#413AE2",
    fontWeight: 700,
    fontSize: 22,
  },
  dialogStyle: {
    padding: "10px 50px 20px 50px",
    // boxShadow: "0px 10px 80px 10px rgba(0, 0, 0, 0.06)",
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
  },
  txtTipParagraph: {
    fontSize: 13,
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
    backgroundColor: "rgba(195, 183, 255, 0.17)",
    border: "1px solid #E2E1FF",
    borderRadius: 20,
    marginTop: 15,
  },
  containerImg: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 8,
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
    width: 150,
    size: 12,
    background: "rgba(195, 183, 255, 0.17)",
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
    height: 25,
    backgroundColor: "#C3B7FF",
    borderRadius: 5,
    color: "#413AE2",
    fontSize: 10,
  },
};
