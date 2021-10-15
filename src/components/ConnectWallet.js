import React, { useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Modal, Stack, styled, Divider } from "@mui/material";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import {
  InjectedConnector,
  NoEthereumProviderError,
  UserRejectedRequestError,
} from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { useSelector, useDispatch } from "react-redux";
import { GetEthBalanceAction } from "../redux/actions/local.actions";
import {
  GetPhnxBalanceAction,
  GetPoolPositionAction,
  PhnxDaoContractInitAction,
  PhnxStakeContractInitAction,
  UniswapContractPairInitAction,
  UniswapContractRouterInitAction,
} from "../redux/actions/contract.actions";
import * as LOCAL_TYPES from "../redux/types/local.types";
import * as CONTRACT_TYPES from "../redux/types/contract.types";

import { injected } from "../utils/web3Connectors";
import { walletconnect, walletlink } from "../utils/web3ConnectFunctions";
import { conciseAddress } from "../utils/formatters";

import CloseIcon from "@mui/icons-material/Close";
import Logo from "../assets/Logo.png";
import coinbaseIcon from "../assets/coinbase.png";
import ledgerIcon from "../assets/ledger.png";
import metamaskIcon from "../assets/metamask.png";
import walletConnectIcon from "../assets/walletConnect.png";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import EthLogo from "../assets/ETH1.png";
import PhnxLogo from "../assets/PhnxLogo1.png";

import WalletSettings from "./walletSettings";
import axios from "axios";

const style = {
  position: "absolute",
  maxHeight: "90%",
  overflowY: "auto",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 5,
  display: "flex",
  flexDirection: "column",
  // alignItems: "center",
  borderRadius: 5,
  ["@media (max-width: 650px)"]: {
    width: "90%",
    padding: 2,
  },
};

const Item = styled("button")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
  display: "flex",
  alignItems: "center",
  backgroundColor: "transparent",
  border: "none",
  "&: hover": {
    // border: "1px solid #413AE2",
    backgroundColor: "#D3D3D3",
    borderRadius: 4,
  },
}));

export default function ConnectWallet({
  landingScreenBtn,
  justModal,
  openModal,
}) {
  const dispatch = useDispatch();
  const web3context = useWeb3React();
  const [reserveUSD, setReserveUSD] = useState(0);
  const contractPhnxDao = useSelector(
    (state) => state.contractReducer.contractPhnxDao
  );
  const contractUniswapPair = useSelector(
    (state) => state.contractReducer.contractUniswapPair
  );

  useEffect(() => {
    if (web3context.account && web3context.active) {
      dispatch(PhnxDaoContractInitAction(web3context));
      dispatch(PhnxStakeContractInitAction(web3context));
      dispatch(UniswapContractPairInitAction(web3context));
      dispatch(UniswapContractRouterInitAction(web3context));
    }
  }, [web3context]);

  useEffect(() => {
    dispatch(GetEthBalanceAction(web3context));
    dispatch(GetPhnxBalanceAction(web3context, contractPhnxDao));
  }, [contractPhnxDao, web3context.active]);

  const balanceEth = useSelector((state) => state.localReducer.balanceEth);
  const balancePhnx = useSelector((state) => state.contractReducer.balancePhnx);
  const poolPosition = useSelector(
    (state) => state.contractReducer.poolPosition
  );

  const { account, active, connector, deactivate, library, chainId } =
    web3context;

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open2 = Boolean(anchorEl);
  const handleClick2 = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl(null);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (justModal == true) {
      if (openModal == true) {
        handleOpen();
      } else {
        handleClose();
      }
    }
  }, [openModal]);

  const activateWallet = useCallback(
    async (connector, onClose = () => {}) => {
      if (
        connector instanceof WalletConnectConnector &&
        connector.walletConnectProvider?.wc?.uri
      ) {
        connector.walletConnectProvider = undefined;
      }
      try {
        let result = await web3context.activate(
          connector
            ? connector
            : new InjectedConnector({
                supportedChainIds: [1, 4],
              }),
          undefined,
          true
        );
        handleClose();
        dispatch({ type: LOCAL_TYPES.CONNECT_USER });
        // ToastMsg("success", "You are connected to mainnet");
      } catch (e) {
        const err = getErrorMessage(e);
        // ToastMsg("error", err);
        console.error("ERROR activateWallet -> ", err);
      }
    },
    [web3context]
  );

  const deactivateWallet = async () => {
    await deactivate();
    console.log(web3context, "deactivateWallet", active);
    if (connector instanceof WalletConnectConnector) {
      await connector.close();
    }
    if (connector instanceof WalletLinkConnector) {
      await connector.close();
    }

    // ToastMsg("warning", "Wallet disconnected");
    setTimeout(() => {
      dispatch({
        type: LOCAL_TYPES.RESET_ALL_LOCAL_REDUCER,
      });
      dispatch({
        type: CONTRACT_TYPES.RESET_ALL_CONTRACT_REDUCER,
      });
      // dispatch({ type: LOCAL_TYPES.DISCONNECT_USER });
    }, 500);
    // onSuccess();
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

  useEffect(() => {
    const getTotalLiquidity = async () => {
      await axios({
        url: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
        method: "post",
        data: {
          query: `
          {
            pairs(where:{id:"0xdfe317f907ca9bf6202cddec3def756438a3b3f7"}){
              reserveUSD
            }
          }
          `,
        },
      })
        .then((response) => {
          if (response.data) {
            console.log(parseInt(response.data.data.pairs[0]["reserveUSD"]));
            setReserveUSD(parseInt(response.data.data.pairs[0]["reserveUSD"]));
          }
        })
        .catch((err) => console.error(err));
    };
    getTotalLiquidity();
  }, []);

  // useEffect(()=>{
  //   if(poolPosition1==null) return;
  //   setEthBalance(poolPosition1.eth);
  //   setPhnxBalance(poolPosition1.phnx);
  // },[poolPosition1])
  useEffect(() => {
    if (contractUniswapPair && web3context.account) {
      dispatch(GetPoolPositionAction(web3context, contractUniswapPair));
    }
  }, [balanceEth, balancePhnx, contractUniswapPair, web3context.account]);

  return (
    <div style={{ width: "fit-content" }}>
      {active && account && justModal != true ? (
        <button
          className="connect-wallet-btn balance-btn"
          style={{ border: "none" }}
        >
          <div
            style={{
              display: "flex",
              alignItem: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={PhnxLogo}
              alt="PhnxLogo"
              className="connect-wallet-btn-img"
            ></img>
            $
            {poolPosition != null
              ? parseFloat(poolPosition.poolPerc) *
                (parseFloat(reserveUSD) / 100)
              : "0.00"}
          </div>
        </button>
      ) : null}

      {landingScreenBtn != true ? <>&nbsp; &nbsp;</> : null}

      {active && account && justModal != true ? (
        <button className="connect-wallet-btn balance-btn">
          <div
            style={{
              display: "flex",
              alignItem: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={EthLogo}
              alt="EthLogo"
              className="connect-wallet-btn-img"
            ></img>
            {balanceEth}
            &nbsp; | &nbsp;
            <img
              src={PhnxLogo}
              alt="PhnxLogo"
              className="connect-wallet-btn-img"
            ></img>
            {balancePhnx}
          </div>
        </button>
      ) : null}

      {landingScreenBtn != true ? <>&nbsp; &nbsp;</> : null}

      {justModal == true ? null : (
        <button
          onClick={(e) => {
            !active && !account ? handleOpen() : handleClick2(e);
          }}
          className={
            landingScreenBtn === true
              ? "connect-wallet-btn connect-wallet-btn-reverse"
              : "connect-wallet-btn"
          }
        >
          {active && account ? (
            <div
              style={{
                display: "flex",
                alignItem: "center",
                justifyContent: "center",
              }}
            >
              {" "}
              <img
                src={EthLogo}
                alt="EthLogo"
                className="connect-wallet-btn-img"
              ></img>{" "}
              {conciseAddress(account)}{" "}
            </div>
          ) : (
            "Connect Wallet"
          )}
        </button>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal-scroll">
          <button onClick={handleClose} className="icon-btn">
            <CloseIcon />
          </button>
          <Stack sx={{ mt: 5, alignItems: "center" }}>
            <img src={Logo} alt="logo" width="192px" height="54px" />
          </Stack>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            color="primary"
            sx={{ mt: 3 }}
            align="center"
          >
            Connect to your wallet
          </Typography>
          <Stack spacing={2} sx={{ mt: 5 }}>
            <Item
              onClick={() =>
                !active &&
                !(connector instanceof InjectedConnector) &&
                activateWallet(injected)
              }
            >
              <img src={metamaskIcon} alt="logo" />
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ ml: 3,textAlign: "left"  }}
              >
                Metamask
              </Typography>
              <ArrowRightAltIcon
                sx={{ ml: "auto"}}
                fontSize="large"
                color="primary"
              />
            </Item>
            <Divider />
            <Item
              onClick={() => {
                !active &&
                  !(connector instanceof WalletConnectConnector) &&
                  activateWallet(walletconnect);
              }}
            >
              <img src={walletConnectIcon} alt="logo" />
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ ml: 3 }}
              >
                Wallet Connect
              </Typography>
              <ArrowRightAltIcon
                sx={{ ml: "auto" }}
                fontSize="large"
                color="primary"
              />
            </Item>
            <Divider />
            <Item
              onClick={() => {
                !active &&
                  !(connector instanceof WalletLinkConnector) &&
                  activateWallet(walletlink);
              }}
            >
              <img src={coinbaseIcon} alt="logo" />
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ ml: 3 }}
              >
                Coinbase Wallet
              </Typography>
              <ArrowRightAltIcon
                sx={{ ml: "auto" }}
                fontSize="large"
                color="primary"
              />
            </Item>
            <Divider />
            <Item>
              <img src={ledgerIcon} alt="logo" />
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ ml: 3 }}
              >
                Ledger
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  ml: "auto",
                  color: "#ED2020",
                  background: "#FAEBEB",
                  px: "7px",
                  py: "3px",
                  borderRadius: "30px",
                }}
              >
                COMING SOON
              </Typography>
            </Item>
          </Stack>

          <Typography
            id="modal-modal-title"
            variant="p"
            component="p"
            align="center"
            sx={{ mt: 4}}
          >
            By connecting, I accept PhoenixDAO’s{" "}
            <Link to="/terms" onClick={handleClose}>
              {" "}
              Terms of service{" "}
            </Link>
          </Typography>
        </Box>
      </Modal>
      <WalletSettings
        anchorEl={anchorEl}
        open2={open2}
        handleClose2={handleClose2}
        deactivateWallet={deactivateWallet}
      />
    </div>
  );
}
