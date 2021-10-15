import React from "react";
import "../farmStake/farmStake.css";
import PhnxLogo from "../../../assets/PhnxLogo1.png";
import EthLogo from "../../../assets/ETH1.png";
import DropDownLogo from "../../../assets/dropdown.png";
import DropUpLogo from "../../../assets/dropup.png";
import ShareLogo from "../../../assets/share.png";
import CalculatorLogo from "../../../assets/calculator.png";
import Web3 from "web3";
import { useState } from "react";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { fixedWithoutRounding } from "../../../utils/formatters";

function FarmHarvest({
  stakeModalOpen,
  UnstakeModalOpen,
  userInfo,
  pendingPHX,
  harvestPHNX,
  reserveUSD,
  loading,
}) {
  const [showMore, setShowMore] = useState(false);

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
          200% &nbsp;<img src={CalculatorLogo}></img>
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
        <div className="farm-details-txt-right">
          {pendingPHX["0"] &&
            fixedWithoutRounding(Web3.utils.fromWei(pendingPHX["0"]), 4)}
        </div>
      </div>

      <div className="farm-details-div">
        <div className="farm-details-txt">
          <span style={{ color: "#413AE2" }}>PHNX-ETH</span> LP STAKED
        </div>
        <div className="farm-details-txt-right">
          {userInfo.amount && Web3.utils.fromWei(userInfo.amount)}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          className="farm-btn-stake-outline"
          onClick={() => UnstakeModalOpen()}
        >
          <b>-</b> UnStake PHNX-ETH LP
        </button>
        <button
          className="farm-btn-stake-outline"
          style={{ marginLeft: "auto" }}
          onClick={() => stakeModalOpen()}
        >
          <b>+</b> Stake PHNX-ETH LP
        </button>
      </div>

      <button
        className="farm-btn-stake"
        style={{ marginTop: "20px" }}
        onClick={harvestPHNX}
        disabled={loading}
      >
        {loading && <CircularProgress sx={{ color: "#fff" }} size={14} />}
        {!loading && "Harvest"}
      </button>

      <div className="get-phnx-eth-lp">
        <Link to="/liquidity">
          Get PHNX-ETH LP
          <img style={{ marginLeft: 5 }} src={ShareLogo}></img>
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

export default FarmHarvest;
