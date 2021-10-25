import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import PoolCss from "./Pool.css";
import handsImg from "../../assets/handPic.svg";
import landingImg from "../../assets/landingScreenLogo.svg";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import ConnectWallet from "../../components/ConnectWallet";
import { Link } from "react-router-dom";

const Pool = () => {
  const { account, active } = useWeb3React();
  // const dispatch = useDispatch();
  const balanceEth = useSelector((state) => state.localReducer.balanceEth);

  return (
    <div>
      <div className="container-div">
        <div className="gradient-div" style={{ fontWeight: "bold" }}>
          {account ? (
            <p className="connect-wallet-txt">
              You currently do not have any LP Token,{" "}
              <Link
                to="/liquidity"
                style={{ textDecoration: "none", color: "#413AE2" }}
              >
                add
              </Link>{" "}
              liquidity to the ETH/PHNX pool on Uniswap to get some.
            </p>
          ) : (
            <p className="connect-wallet-txt">
              Connect your wallet to provide liquidity and start earning PHNX
              tokens
            </p>
          )}

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
              <Link to="/v2/liquidity" style={{ textDecoration: "none" }}>
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
    borderRadius:"9px",
    padding:"10px 24px",
    textTransform:"capitalize"
  },
};
