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

import * as LOCAL_TYPES from "../redux/types/local.types";
import * as CONTRACT_TYPES from "../redux/types/contract.types";

import { injected } from "../utils/web3Connectors";
import { walletconnect, walletlink } from "../utils/web3ConnectFunctions";
import { conciseAddress, fixedWithoutRounding } from "../utils/formatters";
import millify from "millify";
import { UNISWAP_V2_PHNX_ETH_PAIR_ADDRESS_MAINNET } from "../contract/constant";

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
import { toast } from "react-toastify";
import Notify from "./Notify";
import TransactionsModal from "../components/connectModal/TransactionsModal";

import Web3 from "web3";

const style = {
  modalBox: {
    overflowY: "auto",
    borderRadius: "20px",
    padding: "40px",
  },
  modal: {
    position: "absolute",
    maxHeight: "90%",
    padding: "0px",
    overflowY: "hidden",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    borderRadius: 5,
    ["@media (max-width: 650px)"]: {
      width: "90%",
    },
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

  const [TransactionModalStatus, setTransactionModalStatus] = useState(false);

  const contractPhnxDao = useSelector(
    (state) => state.contractReducer.contractPhnxDao
  );

  useEffect(() => {
    let preWallet = window.localStorage.getItem("previousWallet");
    if (preWallet != null) {
      if (preWallet == "metaMask") {
        activateWallet(injected);
      } else if (preWallet == "coinBase") {
        // activateWallet(walletlink);
        // deactivateWallet(true);

        window.localStorage.removeItem(
          "-walletlink:https://www.walletlink.org:version"
        );
        window.localStorage.removeItem(
          "-walletlink:https://www.walletlink.org:session:id"
        );
        window.localStorage.removeItem(
          "-walletlink:https://www.walletlink.org:session:secret"
        );
        window.localStorage.removeItem(
          "-walletlink:https://www.walletlink.org:session:linked"
        );
        window.localStorage.removeItem(
          "-walletlink:https://www.walletlink.org:walletUsername"
        );
        window.localStorage.removeItem(
          "-walletlink:https://www.walletlink.org:DefaultChainId"
        );
        window.localStorage.removeItem(
          "-walletlink:https://www.walletlink.org:Addresses"
        );

        window.localStorage.removeItem(
          "-walletlink:https://www.walletlink.org:IsStandaloneSigning"
        );
      } else if (preWallet == "walletConnect") {
        activateWallet(walletconnect);
      }
    }
  }, []);

  const balanceEth = useSelector((state) => state.localReducer.balanceEth);
  const balancePhnx = useSelector((state) => state.contractReducer.balancePhnx);
  const poolPosition = useSelector(
    (state) => state.contractReducer.poolPosition
  );

  const { account, active, connector, deactivate, library, chainId } =
    web3context;

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const [transactionsData, setTransactionsData] = useState();

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
                // supportedChainIds: [1, 4],
                supportedChainIds: [1],
              }),
          undefined,
          true
        );

        console.log("aaa", result);

        // console.log(result);

        handleClose();
        dispatch({ type: LOCAL_TYPES.CONNECT_USER });
        // ToastMsg("success", "You are connected to mainnet");
      } catch (e) {
        window.localStorage.setItem("previousWallet", "");
        console.log("aaa", e.Error);

        // await connector.close();

        const err = getErrorMessage(e);

        // console.log("aaa11111111111111111", e.code);

        if (e.code == 4001) {
          console.log("aaa11111111111111111", err);
          window.localStorage.removeItem(
            "-walletlink:https://www.walletlink.org:version"
          );
          window.localStorage.removeItem(
            "-walletlink:https://www.walletlink.org:session:id"
          );
          window.localStorage.removeItem(
            "-walletlink:https://www.walletlink.org:session:secret"
          );
          window.localStorage.removeItem(
            "-walletlink:https://www.walletlink.org:session:linked"
          );
          window.localStorage.removeItem(
            "-walletlink:https://www.walletlink.org:walletUsername"
          );
          window.localStorage.removeItem(
            "-walletlink:https://www.walletlink.org:DefaultChainId"
          );
          window.localStorage.removeItem(
            "-walletlink:https://www.walletlink.org:Addresses"
          );

          window.localStorage.removeItem(
            "-walletlink:https://www.walletlink.org:IsStandaloneSigning"
          );
        }

        console.error("ERROR activateWallet -> ", err);
        toast(<Notify text={err} severity="success" />, {
          position: "bottom-right",
        });
      }
    },
    [web3context]
  );

  const deactivateWallet = async (flag) => {
    window.localStorage.setItem("previousWallet", "");
    console.log("aaaa", connector);
    await deactivate();
    console.log(web3context, "deactivateWallet", active);
    if (connector instanceof WalletConnectConnector) {
      console.log("aaaaaaaaa1");
      await connector.close();
    }

    if (connector instanceof WalletLinkConnector) {
      console.log("aaaaaaaaa2");

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
    }, 200);
    // onSuccess();
  };

  const getErrorMessage = (e) => {
    if (e instanceof UnsupportedChainIdError) {
      return "You are connected to wrong network 😔, Connect to Ethereum Mainnet.";
    } else if (e instanceof NoEthereumProviderError) {
      return (
        <span>
          {" "}
          No Wallet Found please install{" "}
          <a
            href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
            target="_blank"
          >
            Metamask
          </a>{" "}
        </span>
      );
    } else if (e instanceof UserRejectedRequestError) {
      return "Wallet Connection Rejected 😔, Try Again!";
    } else if (e.code === -32002) {
      return "Wallet Connection Request Pending";
    } else {
      return "An Error Occurred ";
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
            pairs(where:{id:"${UNISWAP_V2_PHNX_ETH_PAIR_ADDRESS_MAINNET}"}){
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

  useEffect(() => {
    if (!account) {
      return;
    }
    const getTotalLiquidity = async () => {
      await axios({
        url: "https://api.thegraph.com/subgraphs/name/hammadghazi/phoenix",
        method: "post",
        data: {
          query: `
          {
            users(where:{owner:"${account}"} orderBy:time orderDirection:desc){
              amount0,
              amount1,
              type,
              owner,
              time,
              id
            }
          }
          `,
        },
      })
        .then((response) => {
          console.log("transactions", response.data.data.users);
          setTransactionsData(response.data.data.users);
        })
        .catch((err) => console.error(err));
    };
    getTotalLiquidity();
  }, [account]);

  return (
    <div
      style={{ width: "fit-content", display: "flex", alignItems: "center" }}
    >
      {active && account && justModal != true ? (
        <div className="usdBalance">
          <img
            src={PhnxLogo}
            alt="PhnxLogo"
            className="dollarBalanceBtnImg"
          ></img>
          <span
            style={{
              display: "flex",
              alignItem: "center",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "700",
              color: "black",
              fontSize: "16px",
            }}
          >
            $
            {poolPosition != null
              ? fixedWithoutRounding(
                  parseFloat(poolPosition.poolPerc) *
                    (parseFloat(reserveUSD) / 100),
                  4
                )
              : "0.00"}
          </span>
        </div>
      ) : null}

      {landingScreenBtn != true ? <>&nbsp; &nbsp;</> : null}

      {active && account && justModal != true ? (
        <button className="balance-wallet-btn balance-btn">
          <div
            style={{
              display: "flex",
              alignItem: "center",
              justifyContent: "center",
              fontWeight: "700",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={PhnxLogo}
                alt="PhnxLogo"
                className="connect-wallet-btn-img"
              ></img>

              {millify(balancePhnx, {
                precision: 3,
                lowercase: true,
              })}
            </div>
            &nbsp;
            <div style={{ display: "flex", alignItems: "center" }}>
              <svg
                width="4"
                height="18"
                viewBox="0 0 2 21"
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 0L1 21" stroke="#000000" />
              </svg>
            </div>
            &nbsp;
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={EthLogo}
                alt="EthLogo"
                className="connect-wallet-btn-img"
              ></img>
              {millify(balanceEth, {
                precision: 3,
                lowercase: true,
              })}
            </div>
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
              : "connect-wallet-modal-btn connect-wallet-btn"
          }
          style={{ borderRadius: landingScreenBtn ? "" : "9px" }}
        >
          {active && account ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                paddingInline: "10px",
                fontWeight: "700",
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
        <Box sx={style.modal} className="modal-scroll">
          <div style={style.modalBox}>
            <CloseIcon
              className="icon-btn"
              onClick={handleClose}
              sx={{
                transform: "scale(1.2)",
                marginRight: "25px",
                marginTop: "15px",
                "@media (max-width:500px)": {
                  marginRight: "15px",
                  marginTop: "05px",
                },
                cursor: "pointer",
              }}
            />
            {/* <Stack sx={{ mt: 5, alignItems: "center" }}>
              <img src={Logo} alt="logo" width="192px" height="54px" />
            </Stack> */}
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              color="primary"
              sx={{
                color: "#413AE2",
                fontWeight: "bolder",
                fontSize: "24px",
                marginTop: "20px",
              }}
              align="center"
              className="connectWalletMsg"
            >
              Connect to your wallet
            </Typography>
            <Stack spacing={2} sx={{ mt: 5 }}>
              <Item
                onClick={async () => {
                  !active &&
                    !(connector instanceof InjectedConnector) &&
                    activateWallet(injected);

                  window.localStorage.setItem("previousWallet", "metaMask");
                }}
              >
                <img src={metamaskIcon} alt="logo" className="walletImg" />
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{ ml: 3, textAlign: "left" }}
                  className="connectWalletModalText"
                >
                  Metamask
                </Typography>
                <ArrowRightAltIcon
                  sx={{ ml: "auto" }}
                  fontSize="large"
                  color="primary"
                />
              </Item>
              <Divider style={{ marginTop: "5px" }} />
              <Item
                style={{ marginTop: "5px", textAlign: "left" }}
                onClick={async () => {
                  !active &&
                    !(connector instanceof WalletConnectConnector) &&
                    activateWallet(walletconnect);

                  window.localStorage.setItem(
                    "previousWallet",
                    "walletConnect"
                  );
                }}
              >
                <img src={walletConnectIcon} alt="logo" className="walletImg" />
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{ ml: 3 }}
                  className="connectWalletModalText"
                >
                  Wallet Connect
                </Typography>
                <ArrowRightAltIcon
                  sx={{ ml: "auto" }}
                  fontSize="large"
                  color="primary"
                />
              </Item>
              <Divider style={{ marginTop: "5px" }} />
              <Item
                style={{ marginTop: "5px", textAlign: "left" }}
                onClick={async () => {
                  !active &&
                    !(connector instanceof WalletLinkConnector) &&
                    activateWallet(walletlink);

                  window.localStorage.setItem("previousWallet", "coinBase");
                }}
              >
                <img src={coinbaseIcon} alt="logo" className="walletImg" />
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{ ml: 3 }}
                  className="connectWalletModalText"
                >
                  Coinbase Wallet
                </Typography>
                <ArrowRightAltIcon
                  sx={{ ml: "auto" }}
                  fontSize="large"
                  color="primary"
                />
              </Item>
              <Divider style={{ marginTop: "5px" }} />

              <Item style={{ marginTop: "5px", textAlign: "left" }}>
                <img src={ledgerIcon} alt="logo" className="walletImg" />
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{ ml: 3 }}
                  className="connectWalletModalText"
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
                  className="comingSoon"
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
              sx={{
                mt: 4,
                fontSize: "medium",
                "@media (max-width:420px)": {
                  fontSize: "12px",
                },
                "@media (max-width:350px)": {
                  fontSize: "9px",
                },
              }}
            >
              By connecting, I accept PhoenixDAO’s{" "}
              <Link to="/v2/terms" onClick={handleClose}>
                {" "}
                Terms of service{" "}
              </Link>
            </Typography>
          </div>
        </Box>
      </Modal>
      <WalletSettings
        anchorEl={anchorEl}
        open2={open2}
        handleClose2={handleClose2}
        deactivateWallet={deactivateWallet}
        setTransactionModalStatus={setTransactionModalStatus}
      />

      <TransactionsModal
        status={TransactionModalStatus}
        changeStatus={setTransactionModalStatus}
        transactions={transactionsData}
      ></TransactionsModal>
    </div>
  );
}
