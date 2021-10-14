import React from "react";
import "./farmStake.css";
import PhnxLogo from "../../../assets/PhnxLogo1.png";
import EthLogo from "../../../assets/ETH1.png";
import DropDownLogo from "../../../assets/dropdown.png";
import DropUpLogo from "../../../assets/dropup.png";
import ShareLogo from "../../../assets/share.png";
import CalculatorLogo from "../../../assets/calculator.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import ConnectWallet from "../../ConnectWallet";
import { useWeb3React } from "@web3-react/core";

function FarmStake({
  stakeModalOpen,
  allowance,
  giveApproval,
  userInfo,
  reserveUSD,
}) {
  const web3context = useWeb3React();

  const [showMore, setShowMore] = useState(false);
  const [ConnectWalletModalStatus, setConnectWalletModalStatus] =
    useState(false);

  return (
    <div>
      <div className="farm-heading">Farm</div>
      <div className="farm-sub-heading">Stake LP Tokens to earn</div>

      <div className="farm-divider"></div>

      <div className="farm-phnx-eth">
        <div>
          <img src={EthLogo} className="farm-phnx-eth-logo" alt="EthLogo"></img>
          <img
            src={PhnxLogo}
            className="farm-phnx-eth-logo"
            style={{ marginLeft: "-15px" }}
            alt="PhnxLogo"
          ></img>
        </div>
        <div style={{ marginLeft: "auto", fontWeight: "bold" }}>PHNX/ETH</div>
      </div>

      <div className="farm-details-div">
        <div className="farm-details-txt">APR</div>
        <div className="farm-details-txt-right">
          200% &nbsp;
          <img style={{ height: "16px" }} src={CalculatorLogo} />
        </div>
      </div>

      <div className="farm-details-div">
        <div className="farm-details-txt">EARN</div>
        <div className="farm-details-txt-right">PHNX + fees</div>
      </div>

      <div className="farm-details-div">
        <div className="farm-details-txt">
          <span style={{ color: "#413AE2" }}>PHNX</span> EARNED
        </div>
        <div className="farm-details-txt-right">0.000</div>
      </div>

      <div className="farm-details-div">
        <div className="farm-details-txt">
          <span style={{ color: "#413AE2" }}>PHNX-ETH</span> LP STAKED
        </div>
        <div className="farm-details-txt-right">
          {userInfo.amount && userInfo.amount}
        </div>
      </div>

      {web3context.active == false ? (
        <button
          variant="contained"
          size="small"
          fullWidth={true}
          className="farm-btn-stake"
          onClick={() => setConnectWalletModalStatus(!ConnectWalletModalStatus)}
        >
          {"Connect Wallet"}
        </button>
      ) : allowance != 0 ? (
        <button className="farm-btn-stake" onClick={stakeModalOpen}>
          Stake LP
        </button>
      ) : (
        <button className="farm-btn-stake" onClick={giveApproval}>
          Approve LP
        </button>
      )}

      <ConnectWallet
        justModal={true}
        openModal={ConnectWalletModalStatus}
      ></ConnectWallet>

      <div className="get-phnx-eth-lp">
        <Link to="/liquidity">
          Get PHNX-ETH LP
          <img src={ShareLogo}></img>
        </Link>
      </div>

      <div className="farm-divider"></div>

      {showMore === false ? (
        <div
          className="get-phnx-eth-lp"
          onClick={() => setShowMore(true)}
          style={{ cursor: "pointer" }}
        >
          See More <img src={DropDownLogo} alt="DropDownLogo"></img>
        </div>
      ) : (
        <div>
          <div
            className="get-phnx-eth-lp"
            onClick={() => setShowMore(false)}
            style={{ cursor: "pointer" }}
          >
            Hide Details <img src={DropUpLogo} alt="DropUpLogo"></img>
          </div>

          <div className="farm-details-div">
            <div className="farm-details-txt">Total Liquidity</div>
            <div className="farm-details-txt-right">${reserveUSD}</div>
          </div>

          <div className="farm-details-div">
            <div className="farm-details-txt">
              <span style={{ color: "#413AE2" }}>
                <a
                  target="_blank"
                  href="https://github.com/XORD-one/phoenix-LP-staking-contract"
                >
                  View Contract
                </a>
              </span>
            </div>
          </div>

          <div className="farm-details-div">
            <div className="farm-details-txt">
              <span style={{ color: "#413AE2" }}>
                <a
                  target="_blank"
                  href=" https://v2.info.uniswap.org/pair/0xdfe317f907ca9bf6202cddec3def756438a3b3f7"
                >
                  See Pair Info
                </a>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FarmStake;
