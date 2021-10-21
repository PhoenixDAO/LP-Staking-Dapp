import React, { useState } from "react";
import "../farmStake/farmStake.css";
import PhnxLogo from "../../../assets/PhnxLogo1.png";
import EthLogo from "../../../assets/ETH1.png";
import DropDownLogo from "../../../assets/dropdown.png";
import DropUpLogo from "../../../assets/dropup.png";
import ShareLogo from "../../../assets/share.png";
import CalculatorLogo from "../../../assets/calculator.png";
import Web3 from "web3";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { Button } from "@mui/material";

function FarmHarvest({
  stakeModalOpen,
  UnstakeModalOpen,
  userInfo,
  pendingPHX,
  harvestPHNX,
  reserveUSD,
  loading,
  APR,
  UsdRate,
  TokenSupply,
}) {
  const [showMore, setShowMore] = useState(false);
  const web3context = useWeb3React();

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
            style={{ marginLeft: "-17px" }}
            alt="PhnxLogo"
          ></img>
        </div>
        <div style={{ marginLeft: "auto", fontWeight: "bolder",fontSize:"18px" ,color:"#1E1E22"}}>PHNX/ETH</div>
      </div>
      <div className="farm-details-div">
        <div className="farm-details-txt">APR</div>
        <div className="farm-details-txt-right">

<span style={{color:"#73727D"}}>
          {web3context.active ? APR : "--- "}% </span> &nbsp;
          <img src={CalculatorLogo}></img>

        </div>
      </div>
      <div className="farm-details-div">
        <div className="farm-details-txt">EARN</div>
        <div className="farm-details-txt-right" style={{color:"#73727D"}}>PHNX + fees</div>
      </div>
      <div className="farm-details-div">
        <div className="farm-details-txt">
          <span style={{ color: "#413AE2" }}>PHNX</span> EARNED
        </div>
        <div className="farm-details-txt-right">

          <span style={{ fontWeight: "bolder", color: "#4E4E55" }}>
            {pendingPHX["0"] &&
              // fixedWithoutRounding(Web3.utils.fromWei(pendingPHX["0"]), 4)
              parseFloat(Web3.utils.fromWei(pendingPHX["0"])).toFixed(6)}
          </span>

        </div>
      </div>
      <div className="farm-details-div" style={{ marginTop: "1px" }}>
        <div className="farm-details-txt-right">
          <span
            style={{ fontSize: "14px", fontWeight: "100", color: "#4E4E55" }}
          >
            {pendingPHX["0"] &&
              // fixedWithoutRounding(Web3.utils.fromWei(pendingPHX["0"]), 4)
              (
                parseFloat(Web3.utils.fromWei(pendingPHX["0"])) * UsdRate
              ).toFixed(3) + " USD"}
          </span>
        </div>
      </div>
      <div className="farm-details-div">
        <div className="farm-details-txt">
          <span style={{ color: "#413AE2" }}>PHNX-ETH</span> LP STAKED
        </div>
        <div className="farm-details-txt-right">
          <span style={{ fontWeight: "bolder", color: "#4E4E55" }}>
            {userInfo.amount &&
              parseFloat(Web3.utils.fromWei(userInfo.amount)).toFixed(6)}
          </span>
        </div>
      </div>
      <div className="farm-details-div" style={{ marginTop: "1px" }}>
        <div className="farm-details-txt-right">
          <span
            style={{ fontSize: "14px", fontWeight: "100", color: "#4E4E55" }}
          >
            {
              // (userInfo.amount && (parseFloat(Web3.utils.fromWei(userInfo.amount))*(reserveUSD/TokenSupply))).toFixed(4) + 'USD'
              (
                parseFloat(reserveUSD / TokenSupply) *
                (userInfo.amount
                  ? parseFloat(Web3.utils.fromWei(userInfo.amount))
                  : 0)
              ).toFixed(3) + " USD"
            }
          </span>
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

        style={{ marginTop: "20px" , backgroundColor: loading ? '#acacac' : '#413ae2', fontSize:"18px" }}

        onClick={harvestPHNX}
        disabled={loading}
      >
        {loading && "Harvesting..."}
        {!loading && "Harvest"}
      </button>
      <br></br> <br></br>
      <div className="get-phnx-eth-lp">
        <Link
          to="/liquidity"
          style={{ textDecoration: "none", color: "#413ae2" }}
        >
          Get PHNX-ETH LP &nbsp;
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
            <div className="farm-details-txt-right" style={{ color: "#000" }}>
              ${reserveUSD.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </div>
          </div>

          <div className="farm-details-div">
            <div className="farm-details-txt">
              <span style={{ color: "#413AE2" }}>
                <a
                  target="_blank"
                  href="https://github.com/XORD-one/phoenix-LP-staking-contract"
                  style={{ textDecoration: "none", color: "#413ae2" }}
                >
                  View Contract&nbsp;
                  <img src={ShareLogo}></img>
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
                  style={{ textDecoration: "none", color: "#413ae2" }}
                >
                  See Pair Info&nbsp;
                  <img src={ShareLogo}></img>
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
