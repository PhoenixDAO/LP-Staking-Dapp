import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Modal,
  Box,
  TextField,
  // InputAdornment,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ComponentCss from "./componentCss.css";
import PhnxLogo from "../assets/phnxLogo.png";
import * as SERVICE from "../services";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { ToastMsg } from "./Toast";
const LiquidityModal = ({ isVisible, handleClose }) => {
  const [isMobile, setIsMobile] = useState(false);
  // useEffect(() => {
  //   screen.width;
  // });

  const [ethValue, setEthValue] = useState(0);
  const [phnxValue, setPhnxValue] = useState(0);

  const [ethPerPhnx, setEthPerPhnx] = useState(0);
  const [phnxPerEth, setPhnxPerEth] = useState(0);

  const [reserve0, setReserve0] = useState(0);
  const [reserve1, setReserve1] = useState(0); //phnx

  const [poolShare, setPoolShare] = useState(0);

  const [allowance, setAllowance] = useState(0);

  const [poolPosition, setPoolPosition] = useState({
    lp: 0,
    poolPerc: 0,
    eth: 0,
    phnx: 0,
  });
  const web3context = useWeb3React();

  const [loading, setLoading] = useState(false);
  const [num, setNum] = useState("");

  useEffect(() => {
    _handleGetDataMain();
  }, []);

  useEffect(() => {
    if (web3context.active && web3context.account) {
      _handleGetPoolPosition();
      _handleCheckApproval();
    }
  }, [web3context.account]);

  const _handleGetDataMain = async () => {
    try {
      let result = await SERVICE.getDataMain();
      setPhnxPerEth(result.route.midPrice.toSignificant(6));
      setEthPerPhnx(result.route.midPrice.invert().toSignificant(6));
      setReserve0(result.pair.reserveO);
      setReserve1(result.pair.reserve1.toFixed(2));
    } catch (e) {
      console.log("Error _handleGetDataMain", e);
    }
  };

  const _handleCheckApproval = async () => {
    try {
      setLoading(true);
      let result = await SERVICE.checkApproval(web3context, setAllowance);
      setAllowance(result);
    } catch (e) {
      console.log("_handleCheckApproval", e);
      ToastMsg("error", "First give approval!");
    } finally {
      setLoading(false);
    }
  };

  const _handleGetPoolPosition = async () => {
    try {
      setLoading(true);
      await SERVICE.getPoolPosition(web3context, setPoolPosition);
    } catch (e) {
      ToastMsg("error", "Couldn't get pool position!");
      console.log("Error at_handleGetPoolPosition", e);
    } finally {
      setLoading(false);
    }
  };

  const _handleGiveApproval = async () => {
    try {
      setLoading(true);
      await SERVICE.giveApproval(web3context);
      // ToastMsg("success", "Approved successfully!");
    } catch (e) {
      ToastMsg("error", "Failed to give approval!");
      console.log("Error _handleGiveApproval", e);
    } finally {
      setLoading(false);
    }
  };

  const _handleSupply = async () => {
    try {
      setLoading(true);
      await SERVICE.supply(phnxValue, ethValue, web3context);
    } catch (e) {
      ToastMsg("error", "Couldn't add liquidity");
      console.log("Error _handleSupply", e);
    } finally {
      setLoading(false);
      setPhnxValue("");
      setEthValue("");
      setPoolShare(0);
    }
  };

  const OnChangeHandler = (val, tokenName) => {
    if (tokenName === "phnx") {
      let v = parseFloat(val);
      let total = parseFloat(reserve1) + v;
      setPoolShare((v / total) * 100);
      setPhnxValue(v);
      setEthValue(parseFloat(ethPerPhnx) * v || num);
    } else {
      let v = parseFloat(val);
      let total = parseFloat(phnxPerEth) * v;
      total = total + parseFloat(reserve1);
      setPoolShare(((parseFloat(phnxPerEth) * v) / total) * 100);
      setEthValue(v);
      setPhnxValue(parseFloat(phnxPerEth) * v || num);
    }
  };

  return (
    <Modal
      open={isVisible}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styles.containerStyle} className='modal-scroll'>
        <div style={{ paddingLeft: 10 }}>
          <div style={styles.divTopHeading}>
            <p className="heading-modal">Add Liquidity</p>
            <p className="subheading-modal">
              Add liquidity to the ETH/PHNX pool <br /> and receive LP tokens
            </p>
            <button onClick={handleClose} className="icon-btn">
              <CloseIcon />
            </button>
          </div>
        </div>
        <div
          style={{
            height: 1,
            background: "rgba(0, 0, 0, 0.15)",
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 9,
          }}
        />
        <div
          className="dialog-style"
          // style={styles.dialogStyle}
        >
          <div style={styles.containerTip}>
            <Typography style={styles.txtTipParagraph}>
              Tip: By adding liquidity, you'll earn 0.25% of all trades on this
              pair proportional to your share of the pool. Fees are added to the
              pool, accrue in real time and can be claimed by withdrawing your
              liquidity.
            </Typography>
          </div>

          <div style={{ position: "relative" }}>
            <div
              className="token-container"
              // style={styles.tokenContainer}
            >
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
                <div
                  className="wrapper-input"
                  // style={styles.wrapperInput}
                >
                  <TextField
                    hiddenLabel
                    id="standard-adornment-weight"
                    size="small"
                    placeholder="0.0"
                    background="rgba(195, 183, 255, 0.17);"
                    value={phnxValue}
                    // disabled={ethPerPhnx > 0 && phnxPerEth > 0 ? false : true}
                    type="number"
                    onChange={(event) =>
                      OnChangeHandler(event.target.value, "phnx")
                    }
                    style={styles.inputStyle}
                    variant="standard"
                    InputProps={{
                      endAdornment: (
                        <IconButton style={styles.iconBtn} onClick={() => 0}>
                          MAX
                        </IconButton>
                      ),
                      disableUnderline: true,
                    }}
                  />
                </div>
              </div>
            </div>

            <div style={styles.containerAddDiv}>
              <div
                className="add-div"
                // style={styles.addDiv}
              >
                +
              </div>
            </div>

            <div
              className="token-container"
              // style={styles.tokenContainer}
            >
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
                <div
                  className="wrapper-input"
                  // style={styles.wrapperInput}
                >
                  <TextField
                    hiddenLabel
                    id="standard-adornment-weight"
                    size="small"
                    placeholder="0.0"
                    background="rgba(195, 183, 255, 0.17)"
                    value={ethValue}
                    // disabled={ethPerPhnx > 0 && phnxPerEth > 0 ? false : true}
                    type="number"
                    onChange={(event) =>
                      OnChangeHandler(event.target.value, "eth")
                    }
                    style={styles.inputStyle}
                    variant="standard"
                    InputProps={{
                      endAdornment: (
                        <IconButton style={styles.iconBtn} onClick={() => 0}>
                          MAX
                        </IconButton>
                      ),
                      disableUnderline: true,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="container-pool-share">
            <div style={styles.txtDivPhEth}>
              <Typography style={styles.txtConvDetails}>
                <b>{phnxPerEth ? phnxPerEth : "_ _"}</b> PHNX/ETH
              </Typography>
              <Typography style={styles.txtConvDetails}>
                <b>{ethPerPhnx ? ethPerPhnx : "_ _"}</b> ETH/PHNX
              </Typography>
            </div>
            <div className="pool-share">
              <Typography style={styles.txtConvDetails}>
                less than <b>{poolShare ? poolShare.toFixed(2) : "0"}%</b>
              </Typography>
              <Typography style={styles.txtConvDetails}>pool share</Typography>
            </div>
          </div>
          {/* <p>{allowance}</p> */}
          {allowance == 0 ? (
            <Button
              variant="contained"
              size="large"
              fullWidth={true}
              style={{
                ...styles.btnAddLiquidity,
                backgroundColor: loading ? "#eee" : "#413AE2",
              }}
              disabled={loading}
              onClick={_handleGiveApproval}
            >
              Approve PHNX
            </Button>
          ) : (
            <Button
              variant="contained"
              size="large"
              fullWidth={true}
              style={{
                ...styles.btnAddLiquidity,
                backgroundColor: loading ? "#eee" : "#413AE2",
              }}
              disabled={loading}
              onClick={_handleSupply}
            >
              Add Liquidity
            </Button>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default LiquidityModal;

const styles = {
  containerStyle: {
    position: "absolute",
    maxHeight: "90%",
    overflowY: "auto",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "#fff",
    padding: 20,
    // border: "2px solid #000",
    borderRadius: 5,
    boxShadow: 0,
    p: 4,
    ["@media (max-width: 650px)"]: {
      width: "90%",
      padding: 2,
    },
  },
  containerAddDiv: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    left: 0,
    right: 0,
    top: 0,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "transparent",
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
    top: "41%",
  },
  // dialogStyle: {
  //   padding: "10px 10px 0px 10px",
  // boxShadow: "0px 10px 80px 10px rgba(0, 0, 0, 0.06)",
  // },
  divTopHeading: {
    display: "flex",
    flexDirection: "column",
  },
  containerTip: {
    display: "flex",
    width: "100%",
    padding: "9px 17px",
    background:
      "linear-gradient(90deg, rgba(56, 16, 255, 0.55) 0%, rgba(255, 0, 245, 0.55) 143.12%)",
    borderRadius: 15,
    marginBottom: 10,
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
    // height: 95,
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
    // width: 150,
    size: 12,
    background: "rgba(195, 183, 255, 0.17)",
    border: "none",
    padding: "7px 8px 5px 8px",
    borderRadius: 8,
  },
  wrapperInput: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
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
    fontSize: 9,
  },
};
