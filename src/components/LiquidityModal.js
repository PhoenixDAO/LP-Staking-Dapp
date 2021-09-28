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
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import {
  InjectedConnector,
  NoEthereumProviderError,
  UserRejectedRequestError,
} from "@web3-react/injected-connector";
import Web3 from "web3";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { injected } from "../utils/web3Connectors";
import { walletconnect } from "../utils/web3ConnectFunctions";
import { abi as UniswapV2Router02ABI } from "../contract/abi/UniswapV2Router02ABI.json";
import { abi as UniswapV2PairABI } from "../contract/abi/UniswapV2PairABI.json";
import { abi as PhoenixDaoABI } from "../contract/abi/PhoenixDaoABI.json";
import {
  PHNX_RINKEBY_TOKEN_ADDRESS,
  UNISWAP_CONTRACT_ADDRESS_RINEBY,
  urlInfuraMainnet,
  urlInfuraRinkeby,
  tokenAddressMainnet,
  tokenAddressRinkeby,
} from "../contract/constants";
import {
  ChainId,
  Token,
  WETH,
  Fetcher,
  Route,
  Trade,
  TokenAmount,
  TradeType,
  FACTORY_ADDRESS,
  INIT_CODE_HASH,
  Pair,
  CurrencyAmount,
  Currency,
} from "@uniswap/sdk";
import { pack, keccak256 } from "@ethersproject/solidity";
import { getCreate2Address } from "@ethersproject/address";
import { ethers } from "ethers";
import BigNumber from "bignumber.js";

const customHttpProvider = new ethers.providers.JsonRpcProvider(
  urlInfuraRinkeby
);
const chainId = ChainId.RINKEBY;

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
    getDataMain();
  }, []);

  useEffect(() => {
    if (web3context.active && web3context.account) {
      getPoolPosition();
      checkApproval();
    }
  }, [web3context.account]);

  const getDataMain = async () => {
    const phnx = await Fetcher.fetchTokenData(
      chainId,
      tokenAddressRinkeby,
      customHttpProvider
    );
    const weth = WETH[chainId];
    const pair = await Fetcher.fetchPairData(phnx, weth, customHttpProvider);
    const route = new Route([pair], weth);

    setPhnxPerEth(route.midPrice.toSignificant(6));
    setEthPerPhnx(route.midPrice.invert().toSignificant(6));

    setReserve0(pair.reserveO);
    setReserve1(pair.reserve1.toFixed(2));
  };

  const checkApproval = async () => {
    const web3 = new Web3(web3context?.library?.currentProvider);
    const contract = new web3.eth.Contract(
      PhoenixDaoABI,
      PHNX_RINKEBY_TOKEN_ADDRESS
    );
    let allowance1 = await contract.methods
      .allowance(web3context.account, UNISWAP_CONTRACT_ADDRESS_RINEBY)
      .call();
    console.log("allowance", allowance1);
    setAllowance(allowance1);
  };

  const getPoolPosition = async () => {
    const web3 = new Web3(web3context?.library?.currentProvider);
    const uniswapV2PairContract = new web3.eth.Contract(
      UniswapV2PairABI,
      "0xff8ae8805552c813d75ad6ff456dbc417bd12be6"
    );
    const balanceOf = await uniswapV2PairContract.methods
      .balanceOf(web3context.account)
      .call();
    const getReserves = await uniswapV2PairContract.methods
      .getReserves()
      .call();
    const totalSupply = await uniswapV2PairContract.methods
      .totalSupply()
      .call();

    let _balance = new BigNumber(balanceOf);
    let _totalSupply = new BigNumber(totalSupply);
    const _reserve0 = new BigNumber(getReserves._reserve0);
    const _reserve1 = new BigNumber(getReserves._reserve1);
    const _ratio = _reserve0.dividedBy(_reserve1);

    let _poolPercentage = _balance.dividedBy(_totalSupply).multipliedBy(100);

    let _token0 = _balance.pow(2).dividedBy(_ratio).squareRoot();
    let _token1 = _balance.pow(2).dividedBy(_token0);

    const conv = new BigNumber("1e+18");

    _balance = _balance.dividedBy(conv);
    _token0 = _token0.dividedBy(conv);
    _token1 = _token1.dividedBy(conv);

    setPoolPosition({
      lp: _balance.toFixed(2),
      poolPerc: _poolPercentage.toFormat(6),
      eth: _token1.toFormat(6),
      phnx: _token0.toFormat(6),
    });
  };

  const giveApproval = async () => {
    const web3 = new Web3(web3context?.library?.currentProvider);

    const contract = new web3.eth.Contract(
      PhoenixDaoABI,
      PHNX_RINKEBY_TOKEN_ADDRESS
    );

    contract.methods
      .approve(UNISWAP_CONTRACT_ADDRESS_RINEBY, web3.utils.toWei("10000000000"))
      .send({ from: web3context.account })
      .on("transactionHash", (hash) => {
        // hash of tx
        console.log("tx hash", hash);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        if (confirmationNumber === 2) {
          // tx confirmed
          checkApproval();
        }
      })
      .on("error", function (err) {});
  };

  const supply = async () => {
    setLoading(true);
    const web3 = new Web3(web3context?.library?.currentProvider);
    const uniswapContract = new web3.eth.Contract(
      UniswapV2Router02ABI,
      UNISWAP_CONTRACT_ADDRESS_RINEBY
    );
    console.log(uniswapContract.methods);
    let deadline = Date.now();
    deadline += 5 * 60;

    let phnxMin = phnxValue - phnxValue * 0.1;
    let ethMin = ethValue - ethValue * 0.1;

    await uniswapContract.methods
      .addLiquidityETH(
        PHNX_RINKEBY_TOKEN_ADDRESS, // address token,
        web3.utils.toWei(phnxValue.toString()), // uint amountTokenDesired,
        web3.utils.toWei(phnxMin.toString()), //uint amountTokenMin,
        web3.utils.toWei(ethMin.toString()), // uint amountETHMin
        web3context.account, //address to,
        deadline //deadline
      )
      .send({
        from: web3context.account,
        value: web3.utils.toWei(ethValue.toString()),
        gas: 190809,
      })
      .on("transactionHash", (hash) => {
        // hash of tx
        console.log("hash", hash);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        if (confirmationNumber === 2) {
          console.log("confirmationNumber", confirmationNumber);
          setLoading(false);
          setPhnxValue("");
          setEthValue("");
          setPoolShare(0);
          if (web3context.active && web3context.account) {
            getPoolPosition();
          }
        }
      })
      .on("error", function (err) {
        console.log("error", err);
        setLoading(false);
      });
  };

  const _OnChangeHandler = (val, tokenName) => {
    if (tokenName == "phnx") {
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
                    value={ethValue}
                    // disabled={ethPerPhnx > 0 && phnxPerEth > 0 ? false : true}
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
            onClick={allowance == 1 ? supply : giveApproval}
          >
            {allowance == 1 ? "Add Liquidity" : "Approve PHNX"}
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
