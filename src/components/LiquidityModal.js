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
import {
  // InjectedConnector,
  NoEthereumProviderError,
  UserRejectedRequestError,
} from "@web3-react/injected-connector";
// import Web3 from "web3";
// import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
// import { injected } from "../utils/web3Connectors";
// import { walletconnect } from "../utils/web3ConnectFunctions";
// import {
//   PHNX_RINKEBY_TOKEN_ADDRESS,
//   UNISWAP_CONTRACT_ADDRESS_RINEBY,
//   urlInfuraMainnet,
//   urlInfuraRinkeby,
//   tokenAddressMainnet,
//   tokenAddressRinkeby,
// } from "../contract/constants";
// import { pack, keccak256 } from "@ethersproject/solidity";
// import { getCreate2Address } from "@ethersproject/address";
// import { ethers } from "ethers";
// import BigNumber from "bignumber.js";

// const customHttpProvider = new ethers.providers.JsonRpcProvider(
//   urlInfuraRinkeby
// );
// const chainId = ChainId.RINKEBY;

const LiquidityModal = ({ isVisible, handleClose }) => {
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
      await SERVICE.checkApproval(web3context, setAllowance);
    } catch (e) {
      console.log("_handleCheckApproval", e);
    }
  };

  const _handleGetPoolPosition = async () => {
    try {
      setLoading(true);
      await SERVICE.getPoolPosition(web3context, setPoolPosition);
    } catch (e) {
      console.log("Error at_handleGetPoolPosition", e);
    } finally {
      setLoading(false);
    }
  };

  const _handleGiveApproval = async () => {
    try {
      await SERVICE.giveApproval(web3context);
    } catch (e) {
      console.log("Error _handleGiveApproval", e);
    }
  };

  const _handleSupply = async () => {
    try {
      setLoading(true);
      await SERVICE.supply(phnxValue, ethValue, web3context);
    } catch (e) {
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

  const getErrorMessage = (e) => {
    if (e instanceof UnsupportedChainIdError) {
      return "Unsupported Network";
    } else if (e instanceof NoEthereumProviderError) {
      return "No Wallet Found";
    } else if (e instanceof UserRejectedRequestError) {
      return "Wallet Connection Rejected";
    } else if (e.code === -32002) {
      return "Wallet Connection Request Pending";
    } else {
      return "An Error Occurred";
    }
  };

  return (
    <Modal
      open={isVisible}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styles.containerStyle}>
        <div
        // style={{ padding: "20px 50px 20px 50px" }}
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
                    value={phnxValue}
                    // disabled={ethPerPhnx > 0 && phnxPerEth > 0 ? false : true}
                    type="number"
                    onChange={(event) =>
                      OnChangeHandler(event.target.value, "phnx")
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
                    value={ethValue}
                    // disabled={ethPerPhnx > 0 && phnxPerEth > 0 ? false : true}
                    type="number"
                    onChange={(event) =>
                      OnChangeHandler(event.target.value, "eth")
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
                {phnxPerEth} PHNX/ETH
              </Typography>
              <Typography style={styles.txtConvDetails}>
                {ethPerPhnx} ETH/PHNX
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
                less than {poolShare}%
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
            // disabled={
            //   allowance == 0 && web3context.active && web3context.account
            //     ? false
            //     : true
            // }
            // disabled={
            //   web3context.active &&
            //   web3context.account &&
            //   ethValue &&
            //   phnxValue &&
            //   !loading
            //     ? false
            //     : true
            // }
            onClick={allowance === 1 ? _handleSupply : _handleGiveApproval}
          >
            {allowance === 1 ? "Add Liquidity" : "Approve PHNX"}
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
    boxShadow: 0,
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
