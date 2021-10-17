import React, { useState, useEffect } from "react";
import "./farmStake.css";
import PhnxLogo from "../../../assets/PhnxLogo1.png";
import EthLogo from "../../../assets/ETH1.png";
import DropDownLogo from "../../../assets/dropdown.png";
import DropUpLogo from "../../../assets/dropup.png";
import ShareLogo from "../../../assets/share.png";
import CalculatorLogo from "../../../assets/calculator.png";
import { Link } from "react-router-dom";
import ConnectWallet from "../../ConnectWallet";
import { useWeb3React } from "@web3-react/core";
import { useSelector } from "react-redux";
import Web3 from "web3";


function FarmStake({
  stakeModalOpen,
  allowance,
  giveApproval,
  userInfo,
  reserveUSD,
  APR,
}) {

  const [approveStatus,setApproveStatus] = useState(false);
  const handleApproval = async () =>{
      setApproveStatus(true);
      await giveApproval();
      setApproveStatus(false);
  }

  console.log('allowance1:',allowance);
  const web3context = useWeb3React();
  //   const userIsActive = useSelector((state) => state.localReducer.userIsActive);
  //  nsole.log(userIsActive, "userIsActive");
  //   });
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
            style={{ marginLeft: "-17px" }}
            alt="PhnxLogo"
          ></img>
        </div>
        <div style={{ marginLeft: "auto", fontWeight: "bold" }}>PHNX/ETH</div>
      </div>

      <div className="farm-details-div">
        <div className="farm-details-txt">APR</div>
        <div className="farm-details-txt-right">
          {APR}% &nbsp;
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
          {userInfo.amount && Web3.utils.fromWei(userInfo.amount)}
        </div>
      </div>
      {web3context.active ? (
        
        allowance != 0 ? (
          <button className="farm-btn-stake" onClick={stakeModalOpen}>
            Stake LP
          </button>
        ) : (
          <button className="farm-btn-stake" onClick={approveStatus==false ? handleApproval : null} style={{backgroundColor: approveStatus==false ? '#413ae2' : '#AAAAAA', }}>
           {approveStatus==false ? 'Approve' : 'Approving...'}
          </button>
        )
      ) : (
        <button
          variant="contained"
          size="small"
          fullWidth={true}
          className="farm-btn-stake"
          onClick={() => setConnectWalletModalStatus(!ConnectWalletModalStatus)}
        >
          {"Connect Wallet"}
        </button>
      )}

      <ConnectWallet justModal={true} openModal={ConnectWalletModalStatus} />

      <div className="get-phnx-eth-lp">
        <Link to="/liquidity" style={{textDecoration:'none' ,color:'#413ae2'}}>
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
            <div className="farm-details-txt-right" style={{color:'#000'}}>${reserveUSD.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
          </div>

          <div className="farm-details-div">
            <div className="farm-details-txt">
              <span style={{ color: "#413AE2" }}>
                <a
                  target="_blank"
                  href="https://github.com/XORD-one/phoenix-LP-staking-contract"
                  style={{textDecoration:'none' ,color:'#413ae2'}}
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
                  style={{textDecoration:'none' ,color:'#413ae2'}}
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

export default FarmStake;
