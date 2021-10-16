import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import PoolCss from "./Pool.css";
import handsImg from "../../assets/handPic.svg";
import landingImg from "../../assets/landingScreenLogo.svg";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
// import { Web3InitAction } from "../../redux/actions/local.actions";
// import { ToastMsg } from "../../components/Toast";
import Notify from "../../components/Notify";
import ConnectWallet from "../../components/ConnectWallet";
import { Link } from "react-router-dom";
import ConnectModal from "../../components/connectModal/ConnectModal";
import TransactionSubmitted from "../../components/connectModal/TransactionSubmitted";
import TransactionProgress from "../../components/connectModal/TransactionProgress";
import ConfirmModal from "../../components/connectModal/ConfirmModal";
import SlippingTolerance from "../../components/connectModal/SlippingTolerance";
import VersionModal from "../../components/connectModal/VersionModal";
import VersionSwitch from "../../components/versionSwitch/versionSwitch";

const Pool = () => {
  const { account, active } = useWeb3React();
  // const dispatch = useDispatch();
  const balanceEth = useSelector((state) => state.localReducer.balanceEth);

  return (
    <div>
      <div className="container-div">
        <div className="gradient-div">
          {
            account?<p className="connect-wallet-txt">
            You currently do not have any LP Token, add liquidity to the ETH/PHNX pool on Uniswap to get some.
          </p>:
          <p className="connect-wallet-txt">
          Connect your wallet to provide liquidity and start earning
          PHNX tokens
        </p>
          }
          
          <img src={handsImg} className="img-hands" />
        </div>
        {/* <p>{balanceEth}</p> */}
        <div className="container-div2">
          <div className="connect-wallet-div">
            <p className="phnx-heading">PhoenixDAO LP Staking</p>
            <p className="phnx-subheading">
              Stake ETH/PHNX LP Tokens and earn <br />
              rewards in PHNX
            </p>

            {account && active ? (
              <Link to="/liquidity" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  size="large"
                  // fullWidth={true}
                  style={{
                    ...styles.btnCollectWallet,
                    // backgroundColor: loading ? "#eee" : "#413AE2",
                  }}
                  // disabled={loading}
                  // onClick={_handleSupply}
                >
                  Get PHNX/ETH LP Token
                </Button>
              </Link>
            ) : (
              <ConnectWallet landingScreenBtn={true} />
            )}
          </div>

          <img className="img-landing-logo" src={landingImg} />
        </div>
        
      </div>
    </div>
  );
};

export default Pool;

const styles = {
  btnCollectWallet: {
    backgroundColor: "#413AE2",
    marginTop: 10,
    fontSize: 15,
  },
};
