import React, { useState, useEffect } from "react";
import { Button, Typography, Box, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ComponentCss from "../componentCss.css";
import PhnxLogo from "../../assets/phnxLogo.png";
import EthLogo from "../../assets/ETH1.png";
import downArrow from "../../assets/downArrow.svg";
import blueDownArrow from "../../assets/blueDownArrow.svg";
import plusLiquidity from "../../assets/plusLiquidity.svg";
import * as SERVICE from "../../services/pool.services";
import { useWeb3React } from "@web3-react/core";
import {
  GetPoolPositionAction,
  GetPhnxBalanceAction,
  PhnxDaoContractInitAction,
  CheckApprovalPhnxDaoAction,
} from "../../redux/actions/contract.actions";
import {
  GetEthBalanceAction,
  GetMainDataAction,
} from "../../redux/actions/local.actions";
import { useSelector, useDispatch } from "react-redux";
import ConnectWallet from "../ConnectWallet";
import ConnectModal from "../connectModal/ConnectModal";
import TransactionProgress from "../connectModal/TransactionProgress";
import TransactionSubmitted from "../connectModal/TransactionSubmitted";
import SlippingTolerance from "../connectModal/SlippingTolerance";
import SettingsLogo from "../../assets/settings.png";

const LiquidityModal = ({ isVisible, handleClose, closeBtn }) => {
  const [ethValue, setEthValue] = useState("");
  const [phnxValue, setPhnxValue] = useState("");

  const [slippageModal, setSlippageModal] = useState(false);
  const [slippageValue, setSlippageValue] = useState(1);

  const [poolShare, setPoolShare] = useState(0);

  const[approveStatus,setApproveStatus] = useState(false);

  // const [allowance, setAllowance] = useState(0);

  const dispatch = useDispatch();
  const web3context = useWeb3React();
  const phnxPerEth = useSelector((state) => state.localReducer.phnxPerEth);
  const allowance = useSelector((state) => state.contractReducer.allowancePhnxDao);

  const ethPerPhnx = useSelector((state) => state.localReducer.ethPerPhnx);
  const reserve0 = useSelector((state) => state.localReducer.reserve0);
  const reserve1 = useSelector((state) => state.localReducer.reserve1);
  const balancePhnx = useSelector((state) => state.contractReducer.balancePhnx);
  const balanceEth = useSelector((state) => state.localReducer.balanceEth);
  const poolPosition = useSelector(
    (state) => state.contractReducer.poolPosition
  );
  const contractUniswapPair = useSelector(
    (state) => state.contractReducer.contractUniswapPair
  );
  const contractUniswapRouter = useSelector(
    (state) => state.contractReducer.contractUniswapRouter
  );
  const contractPhnxDao = useSelector(
    (state) => state.contractReducer.contractPhnxDao
  );

  const [loading, setLoading] = useState(false);
  const [num, setNum] = useState("");

  const [ConnectWalletModalStatus, setConnectWalletModalStatus] =
    useState(false);
  const [transactionConfirmModal, settransactionConfirmModal] = useState(false);
  const [transactionProcessModal, settransactionProcessModal] = useState(false);
  const [transactionSubmittedModal, settransactionSubmittedModal] =
    useState(false);
  const [tranHash, settranHash] = useState("");

  useEffect(() => {
    _handleGetDataMain();
  }, []);

  useEffect(() => {
    if (web3context.active && web3context.account) {
      handleGetPoolPosition();
      handleCheckApprovalPhnxDaoAction();
    }
  }, [web3context.active, web3context.account, contractUniswapPair]);

  useEffect(() => {
    if (web3context) {
      GetBalances();
    }
  }, [web3context, contractPhnxDao]);

  const _handleGetDataMain = async () => {
    dispatch(GetMainDataAction());
  };
  const handleGetPoolPosition = () => {
    dispatch(GetPoolPositionAction(web3context, contractUniswapPair));
  };
  const handleGetEthBalance = () => {
    dispatch(GetEthBalanceAction(web3context));
  };
  const handleGetPhnxBalance = () => {
    dispatch(GetPhnxBalanceAction(web3context, contractPhnxDao));
  };
  // This will be replaced with allowance state
  const handleCheckApprovalPhnxDaoAction = async () => {
    dispatch(CheckApprovalPhnxDaoAction(web3context, contractPhnxDao));
  };

  const handleGiveApprovalPhnxDao = async () => {
    try {
      await SERVICE.giveApprovalPhnxDao(
        web3context,
        contractPhnxDao,
        handleGetPoolPosition,
        handleGetEthBalance,
        handleGetPhnxBalance,
        handleCheckApprovalPhnxDaoAction
      );
    } catch (e) {
      console.error("Error handleGiveApprovalPhnxDao", e);
    }
  };

  const _handleSupply = async () => {
    try {
      setLoading(true);
      settransactionConfirmModal(false);
      settransactionProcessModal(true);
      await SERVICE.supply(
        phnxValue,
        ethValue,
        web3context,
        contractUniswapRouter,
        settransactionProcessModal,
        settransactionSubmittedModal,
        handleGetPoolPosition,
        handleGetEthBalance,
        handleGetPhnxBalance,
        settranHash,
        slippageValue
      );
      dispatch(GetPoolPositionAction(web3context, contractUniswapPair));
      await GetBalances();
    } catch (e) {
      console.error("Error _handleSupply", e);
    } finally {
      setLoading(false);
      setPhnxValue("");
      setEthValue("");
      setPoolShare(0);
    }
  };
  var reg = new RegExp("^[0-9]+$");
 
  const OnChangeHandler = (val, tokenName) => {
    if (tokenName === "phnx") {
      let v = parseFloat(val);
      let test = reg.test(val);
      if (!test && val.length != 0) return;
      if (val < -1) {
        return;
      }
      let total = parseFloat(reserve1) + v;
      console.log("res" + reserve1);
      setPoolShare(((v / total) * 100).toFixed(3));
      setPhnxValue(v);
      setEthValue(parseFloat(ethPerPhnx) * v || num);
    } else if (tokenName === "eth") {
      let v = parseFloat(val);
      let total = parseFloat(phnxPerEth) * v;
      total = total + parseFloat(reserve1);
      console.log("v", poolShare);

      setPoolShare((((parseFloat(phnxPerEth) * v) / total) * 100).toFixed(3));
      setEthValue(v);
      setPhnxValue(parseFloat(phnxPerEth) * v || num);
    } else {
      return;
    }
  };

  const GetBalances = async () => {
    if (contractPhnxDao) {
      dispatch(GetEthBalanceAction(web3context));
      dispatch(GetPhnxBalanceAction(web3context, contractPhnxDao));
    } else {
      dispatch(PhnxDaoContractInitAction(web3context));
    }
  };

  const setTxModalOpen = () => {
    settransactionConfirmModal(true);
  };

  const setTxModalClose = () => {
    settransactionConfirmModal(false);
  };
  return (
    <Box sx={styles.containerStyle} className="modal-scroll">
      <div className="addLiquidityBox">
      <div style={{marginBottom:"10px"}}>
        <div style={styles.divTopHeading}>
          <p className="heading-modal">Add Liquidity</p>
          <p className="subheading-modal" style={{ display: "flex", marginBottom:"10px" }}>
            Add liquidity to the ETH/PHNX pool <br /> and receive LP tokens
            <img
              onClick={() => setSlippageModal(!slippageModal)}
              src={SettingsLogo}
              style={{
                marginLeft: "auto",
                height: "20px",
                width: "20px",
                cursor: "pointer",
              }}
            ></img>
          </p>

          {closeBtn ? (
            <button onClick={handleClose} className="icon-btn">
              <CloseIcon />
            </button>
          ) : null}
        </div>
      </div>
      <div
        style={{
          height: 1,
          background: "rgba(0, 0, 0, 0.15)",
          marginBottom:"10px"
        }}
      />
      <div className="dialog-style" >
        <div style={styles.containerTip}>
          <Typography style={styles.txtTipParagraph}>
            <b>Tip:</b> By adding liquidity, you'll earn 0.25% of all trades on this
            pair proportional to your share of the pool. Fees are added to the
            pool, accrue in real time and can be claimed by withdrawing your
            liquidity.
          </Typography>
        </div>
        <div style={{ position: "relative" }}>
          <div className="token-container">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <img alt="logo" style={styles.imgLogoPhnx} src={PhnxLogo} />
              <div style={styles.containerImg}>
                <Typography style={styles.txtInput}>Input</Typography>
                <Typography style={styles.txtPhnx}>
                  PHNX <img src={blueDownArrow} style={styles.downArrow}></img>
                </Typography>
              </div>
            </div>
            <div style={styles.containerInput}>
              <div style={styles.divPhnxAmount}>
                <Typography style={styles.txtInput}>Available PHNX:</Typography>
                <Typography style={styles.txtAmount}>
                  {balancePhnx ? `${balancePhnx}` : "0.0"} PHNX
                </Typography>
              </div>
              <div className="wrapper-input">
                <TextField
                  hiddenLabel
                  id="standard-adornment-weight"
                  size="small"
                  placeholder="0.0"
                  background="rgba(195, 183, 255, 0.17);"
                  value={phnxValue}
                  type="number"
                  onChange={(event) => {
                    OnChangeHandler(event.target.value, "phnx");
                  }}
                  style={styles.inputStyle}
                  variant="standard"
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        style={styles.iconBtn}
                        onClick={() => {
                          OnChangeHandler(balancePhnx, "phnx");
                        }}
                      >
                        MAX
                      </IconButton>
                    ),
                    inputProps: {
                      min: 0,
                    },
                    disableUnderline: true,
                  }}
                />
              </div>
            </div>
          </div>

          <div style={styles.containerAddDiv}>
            <div className="add-div">
              <img src={plusLiquidity}></img>
            </div>
          </div>

          <div className="token-container">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <img alt="logo" style={styles.imgLogoPhnx} src={EthLogo} />
              <div style={styles.containerImg}>
                <Typography style={styles.txtInput}>Input</Typography>
                <Typography style={{ ...styles.txtPhnx, color: "#454A75" }}>
                  ETH <img src={downArrow} style={styles.downArrow}></img>
                </Typography>
              </div>
            </div>
            <div style={styles.containerInput}>
              <div style={styles.divPhnxAmount}>
                <Typography style={styles.txtInput}>Available ETH:</Typography>
                <Typography style={styles.txtAmount}>
                  {balanceEth ? `${balanceEth}` : "0.0"} ETH
                </Typography>
              </div>
              <div className="wrapper-input">
                <TextField
                  hiddenLabel
                  id="standard-adornment-weight"
                  size="small"
                  placeholder="0.0"
                  background="rgba(195, 183, 255, 0.17)"
                  value={ethValue}
                  type="number"
                  onChange={(event) => {
                    OnChangeHandler(event.target.value, "eth");
                  }}
                  style={styles.inputStyle}
                  className="liq-tab-inputs"
                  variant="standard"
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        style={styles.iconBtn}
                        onClick={() => {
                          OnChangeHandler(balanceEth, "eth");
                        }}
                      >
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
              {phnxPerEth ? phnxPerEth : "0.0"} PHNX / ETH
            </Typography>
            <Typography style={styles.txtConvDetails}>
              {ethPerPhnx ? ethPerPhnx : "0.0"} ETH / PHNX
            </Typography>
          </div>
          <div className="pool-share">
            <Typography style={styles.txtConvDetails}>
              {isNaN(poolShare) ? "0.00" : poolShare + "%"}
            </Typography>
            <Typography style={styles.txtConvDetails}>pool share</Typography>
          </div>
        </div>
        {web3context.active == false ? (
          <Button
            variant="contained"
            size="small"
            fullWidth={true}
            style={{
              ...styles.btnAddLiquidity,
            }}
            onClick={() =>
              setConnectWalletModalStatus(!ConnectWalletModalStatus)
            }
          >
            {"Connect Wallet"}
          </Button>
        ) : allowance != 0 ? (
          <Button
            variant="contained"
            size="small"
            fullWidth={true}
            style={{
              ...styles.btnAddLiquidity,
              backgroundColor:
                loading ||
                phnxValue > balancePhnx ||
                ethValue > balanceEth ||
                phnxValue === 0 ||
                ethValue === 0 ||
                phnxValue == "" ||
                ethValue == ""
                  ? "#acacac"
                  : "#413AE2",
            }}
            disabled={
              loading ||
              phnxValue > balancePhnx ||
              ethValue > balanceEth ||
              phnxValue === 0 ||
              ethValue === 0 ||
              phnxValue == "" ||
              ethValue == ""
            }
            onClick={setTxModalOpen}
          >
            {phnxValue === "" ||
            ethValue === "" ||
            phnxValue == 0 ||
            ethValue == 0
              ? "Enter an amount"
              : phnxValue > balancePhnx || ethValue > balanceEth
              ? "Insufficient Balance"
              : "Add Liquidity"}
          </Button>
        ) : (
          <Button
            variant="contained"
            size="large"
            fullWidth={true}
            style={{
              ...styles.btnAddLiquidity,
              backgroundColor: loading || approveStatus ? "#acacac" : "#413AE2",
              textTransform: "capitalize",
            }}
            disabled={loading}
            onClick={async()=>{
              setApproveStatus(true);
              await handleGiveApprovalPhnxDao();
              setApproveStatus(false);
              }
            }
          >

            {

              approveStatus==false ?
              'Approve PHNX' :
              'Approving PHNX...'

            }

          </Button>
        )}
      </div>

      <ConnectWallet
        justModal={true}
        openModal={ConnectWalletModalStatus}
      ></ConnectWallet>
      <ConnectModal
        transactionConfirmModal={transactionConfirmModal}
        setTxModalClose={setTxModalClose}
        _handleSupply={_handleSupply}
        phnxValue={phnxValue}
        ethValue={ethValue}
        poolShare={poolShare}
        phnxPerEth={phnxPerEth}
        ethPerPhnx={ethPerPhnx}
      ></ConnectModal>
      <SlippingTolerance
        status={slippageModal}
        handleClose={setSlippageModal}
        setSlippageValue={setSlippageValue}
      />

      <TransactionProgress transactionProcessModal={transactionProcessModal}>
        {" "}
      </TransactionProgress>
      <TransactionSubmitted
        transactionSubmittedModal={transactionSubmittedModal}
        hash={tranHash}
      ></TransactionSubmitted>
      </div>
    </Box>
  );
};

export default LiquidityModal;

const styles = {
  containerStyle: {
    position: "absolute",
    maxHeight: "100%",
    overflowY: "hidden",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "#fff",
    padding: 0,
    
    // border: "2px solid #000",
    borderRadius: 4,
    boxShadow: 0,
    ["@media (max-width: 650px)"]: {
      width:" 98%",
      padding: "0px",
      overflowY: "hidden",
    },
  },
  downArrow: {
    height: "10px",
    width: "14px",
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
    top: "50%",
    transform: "translateY(-50%)",
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
    padding: "18px 15px",
    background:
      "linear-gradient(90deg, rgba(56, 16, 255, 0.55) 0%, rgba(255, 0, 245, 0.55) 143.12%)",
    borderRadius: 15,
    // marginBottom: 20,
  },
  txtTipParagraph: {
    fontSize: 15,
    color: "#FFFFFF",
  },
  btnAddLiquidity: {
    backgroundColor: "#413AE2",
    margin: "25px 0px 0px 0px",
    height: 45,
    borderRadius: 12,
    textTransform: "capitalize",
    fontSize: 18,
    color:'#fff'
    

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
  modalBox:{
    padding: 40,
    "@media (max-width: 650px)": {
      overflow: "auto",
      height: "85vh",
      padding: "16px",
    },
  },
  txtAmount: {
    fontSize: 18,
    fontWeight: "900",
    marginLeft: 5,
  },
  divPhnxAmount: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  inputStyle: {
    // width: 150,
    size: 20,
    background: "rgba(195, 183, 255, 0.17)",
    border: "none",
    padding: "7px 8px 5px 8px",
    borderRadius: 8,
    fontWeight: 700,
    marginTop: 5,
    ["@media (max-width: 650px)"]: {
      width: "100%",
    },
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
    fontSize: 15,
  },
  iconBtn: {
    height: 25,
    backgroundColor: "#C3B7FF",
    borderRadius: 5,
    color: "#413AE2",
    fontSize: 9,
  },
};
