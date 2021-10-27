import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import PoolCss from "./Pool.css";
import handsImg from "../../assets/handPic.svg";
import landingImg from "../../assets/landingScreenLogo.svg";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import ConnectWallet from "../../components/ConnectWallet";
import { Link } from "react-router-dom";
import { UNISWAP_V2_PHNX_ETH_PAIR_ADDRESS_MAINNET } from "../../contract/constant";
import { fixedWithoutRounding } from "../../utils/formatters";
import axios from "axios";
import millify from "millify";

const Pool = () => {
  const { account, active } = useWeb3React();
  // const dispatch = useDispatch();
  const [reserveUSD, setReserveUSD] = useState(0);
  const balanceEth = useSelector((state) => state.localReducer.balanceEth);
  const poolPosition = useSelector(
    (state) => state.contractReducer.poolPosition
  );
  const [lpValue, setlpValue] = useState(0.0);
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
  useEffect(()=>{
    if(active && account && poolPosition){
      setlpValue(poolPosition.lp);
    }
  },[account,poolPosition]);

  return (
    <div>
      {console.log("lp tokens: ", lpValue)}
      <div className="container-div">
        <div className="gradient-div" style={{ fontWeight: "bold" }}>
          {account ? (
            // <p className="connect-wallet-txt">
            //   {(lpValue != 0)?`You have ${fixedWithoutRounding(lpValue,6)} Lp Token`:"You currently do not have any LP Token"},{" "}
            //   <Link
            //     to="/liquidity"
            //     style={{ textDecoration: "none", color: "#413AE2" }}
            //   >
            //     add
            //   </Link>{" "}
            //   liquidity to the ETH/PHNX pool on Uniswap to get some.
            // </p>
            <div className="connect-wallet-txt">
              <div style={{  }} className="cardContent">
                <span className="yourStakeHeading">Your Stake</span>
                <div className="pricesAlignment">
                  <div>
                    <p
                      className="cardPara"
                    >
                      &#36;
                      {poolPosition != null
                        ? lpValue==0?"0.00":millify(
                            fixedWithoutRounding(
                              parseFloat(poolPosition.poolPerc) *
                                (parseFloat(reserveUSD) / 100),
                              4
                            ),
                            {
                              precision: 3,
                              lowercase: true,
                            }
                          )
                        : "0.00"}
                    </p>
                  </div>

                  <div style={{ alignSelf: "center" }}>
                    &nbsp;
                    <p
                      style={{
                        color: "#000000",
                        fontSize: "18px",
                        padding: "0px",
                        margin: "0px",
                        marginLeft: "10px",
                      }}
                    >
                      ({lpValue==0?"0.00":
                    millify(fixedWithoutRounding(lpValue, 6), {
                        precision: 3,
                        lowercase: true,
                      })}{" "}
                      PHNX-ETH LP)
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
