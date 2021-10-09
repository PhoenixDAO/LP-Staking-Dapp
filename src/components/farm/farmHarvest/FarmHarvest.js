import React from "react";
import "../farmStake/farmStake.css";
import PhnxLogo from "../../../assets/PhnxLogo1.png";
import EthLogo from "../../../assets/ETH1.png";
import DropDownLogo from "../../../assets/dropdown.png";
import DropUpLogo from "../../../assets/dropup.png";
import Web3 from "web3";

import { useState } from "react";

function FarmHarvest({
  stakeModalOpen,
  UnstakeModalOpen,
  userInfo,
  pendingPHX,
  harvestPHNX,
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
        <div className="farm-details-txt-right">200%</div>
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
          {pendingPHX["0"] && Web3.utils.fromWei(pendingPHX["0"])}
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
          {" "}
          UnStake
        </button>
        <button
          className="farm-btn-stake-outline"
          style={{ marginLeft: "auto" }}
          onClick={() => stakeModalOpen()}
        >
          {" "}
          Stake
        </button>
      </div>

      <button
        className="farm-btn-stake"
        style={{ marginTop: "20px" }}
        onClick={harvestPHNX}
      >
        Harvest
      </button>

      <div className="get-phnx-eth-lp">Get PHNX-ETH LP</div>

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
            <div className="farm-details-txt-right">$540.023</div>
          </div>

          <div className="farm-details-div">
            <div className="farm-details-txt">
              <span style={{ color: "#413AE2" }}>View Contract</span>
            </div>
          </div>

          <div className="farm-details-div">
            <div className="farm-details-txt">
              <span style={{ color: "#413AE2" }}>See Pair Info</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FarmHarvest;
