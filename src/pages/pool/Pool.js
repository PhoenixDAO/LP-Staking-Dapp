import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import PoolCss from "./Pool.css";
import handsImg from "../../assets/handPic.svg";
import landingImg from "../../assets/landingScreenLogo.svg";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Web3InitAction } from "../../redux/actions/local.actions";
import { ToastMsg } from "../../components/Toast";

const Pool = () => {
  // const { account } = useWeb3React();
  const dispatch = useDispatch();
  const web3 = useSelector((state) => state.localReducer.web3);
  const web3context = useWeb3React();

  useEffect(() => {
    if (!web3context.account) {
      ToastMsg("warning", "Please connect your wallet first!");
      dispatch(Web3InitAction(web3context));
      console.log("Web3 const", web3);
    }
  }, []);

  // console.log("account in pool", account);
  return (
    <div>
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
              Connect Wallet
            </Button>
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
