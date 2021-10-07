import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import PoolCss from "./Pool.css";
import handsImg from "../../assets/handPic.svg";
import landingImg from "../../assets/landingScreenLogo.svg";
import { Button } from "@mui/material";
import Notify from "../../components/Notify";
import ConnectWallet from "../../components/ConnectWallet";

// import { ToastMsg } from "../components/Toast";

const Pool = () => {
  const { account, active } = useWeb3React();

  console.log("account in pool", account);
  return (
    <div>
      {/* <Notify text={'Transection Successful'} ></Notify> */}
      {/* <h1>Pool {account} </h1> */}
      <div className="container-div">
        <div className="gradient-div">
          <p className="connect-wallet-txt">
            Connect your wallet to provide liquidity <br /> and start earning
            PHNX tokens
          </p>
          <img src={handsImg} className="img-hands" />
        </div>
        <div className="container-div2">
          <div className="connect-wallet-div">
            <p className="phnx-heading">PhoenixDAO LP Staking</p>
            <p className="phnx-subheading">
              Stake ETH/PHNX LP Tokens and earn <br />
              rewards in PHNX
            </p>

            {account && active ? (
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
            ) : (
              <ConnectWallet />
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
    fontSize: 12,
  },
};
