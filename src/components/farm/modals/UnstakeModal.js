import React, { useState, useEffect } from "react";
import "./stakeModal.css";
import Logo from "../../../assets/Logo.png";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { UNISWAP_V2_PHNX_ETH_PAIR_ADDRESS_RINKEBY } from "../../../contract/constant";
import { abi } from "../../../contract/abi/UniswapV2PairABI.json";
import { abi as StakeABI } from "../../../contract/abi/PHXStakeABI.json";
import { PHNX_LP_STAKING_CONTRACT_ADDRESS_RINKEBY } from "../../../contract/constant";

import BigNumber from "bignumber.js";

function UnStakeModal({ Close }) {
  const [lpValue, setlpValue] = useState(0.0);
  const [maxlpValue, setmaxlpValue] = useState(0.0);

  const web3context = useWeb3React();
  const [poolPosition, setPoolPosition] = useState({
    lp: 0,
    poolPerc: 0,
    eth: 0,
    phnx: 0,
  });

  const LpChange = (e) => {
    setlpValue(parseFloat(e.target.value));
  };

  useEffect(() => {
    if (web3context.active && web3context.account) {
      getPoolPosition();
    }
  }, [web3context.account]);

  const getPoolPosition = async () => {
    const web3 = new Web3(web3context?.library?.currentProvider);
    const uniswapV2PairContract = new web3.eth.Contract(
      abi,
      UNISWAP_V2_PHNX_ETH_PAIR_ADDRESS_RINKEBY
    );
    const balanceOf = await uniswapV2PairContract.methods
      .balanceOf(web3context.account)
      .call();
    const getReserves = await uniswapV2PairContract.methods
      .getReserves()
      .call();
    const totalSupply = await uniswapV2PairContract.methods
      .totalSupply()
      .call();

    let _balance = new BigNumber(balanceOf);
    // console.log("_balance", _balance);
    let _totalSupply = new BigNumber(totalSupply);
    const _reserve0 = new BigNumber(getReserves._reserve0);
    const _reserve1 = new BigNumber(getReserves._reserve1);
    const _ratio = _reserve0.dividedBy(_reserve1);

    let _poolPercentage = _balance.dividedBy(_totalSupply).multipliedBy(100);

    let _token0 = _balance.pow(2).dividedBy(_ratio).squareRoot();
    let _token1 = _balance.pow(2).dividedBy(_token0);

    const conv = new BigNumber("1e+18");

    _balance = _balance.dividedBy(conv);
    _token0 = _token0.dividedBy(conv);
    _token1 = _token1.dividedBy(conv);

    setPoolPosition({
      lp: _balance.toFixed(2),
      poolPerc: _poolPercentage.toFormat(6),
      eth: _token1.toFormat(6),
      phnx: _token0.toFormat(6),
    });

    setmaxlpValue(_balance.toFixed(2));
  };

  const UnStakeLp = () => {
    if (lpValue > maxlpValue || lpValue === 0 || isNaN(lpValue)) {
      return;
    }

    const web3 = new Web3(web3context?.library?.currentProvider);
    const Contract = new web3.eth.Contract(
      StakeABI,
      PHNX_LP_STAKING_CONTRACT_ADDRESS_RINKEBY
    );

    console.log(lpValue);

    Contract.methods
      .withdraw(web3.utils.toWei(lpValue.toString()))
      .send({ from: web3context.account })
      .on("transactionHash", (hash) => {
        // hash of tx
        console.log("tx hash", hash);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        if (confirmationNumber === 2) {
          // tx confirmed
          // checkApproval(web3context, contractPhnx);
          alert("success", "Approved successfully!");
        }
      })
      .on("error", function (err) {
        console.error(err);
      });
  };

  return (
    <div className="stakingModal">
      <img className="stakingModalLogo" src={Logo}></img>

      <div className="stakingModalHeading">UnStake LP Token</div>

      <div style={{ display: "flex", alignItem: "center" }}>
        <div className="stakingModal-details">STAKE</div>
        <div style={{ marginLeft: "auto" }} className="stakingModal-details">
          Bal: <span style={{ color: "#000" }}>{maxlpValue} PHNX-ETH LP</span>
        </div>
      </div>

      <div style={{ display: "flex", marginTop: "10px", alignItems: "center" }}>
        <input
          type="number"
          placeholder="0.0"
          className="stakingModalInput"
          onChange={(e) => LpChange(e)}
          value={lpValue}
        ></input>
        <button
          className="stakingModalInputBtn"
          onClick={() => {
            setlpValue(maxlpValue);
          }}
        >
          max
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", marginTop: "13px" }}>
        <div className="stakingModal-details" style={{ marginTop: "0px" }}>
          Annual ROI at current rates:
        </div>
        <div
          className="stakingModal-details"
          style={{ marginLeft: "auto", marginTop: "0px" }}
        >
          $0.00
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          className="farm-btn-stake-outline"
          style={{ marginTop: "25px" }}
          onClick={() => Close()}
        >
          Close
        </button>
        <button
          className="farm-btn-stake-outline stakingModalConfirm"
          style={{
            marginLeft: "auto",
            marginTop: "25px",
            background:
              (lpValue > maxlpValue) | (lpValue === 0) | isNaN(lpValue)
                ? "#ACACAC"
                : "#413AE2",
            color: "#fff",
            borderColor:
              (lpValue > maxlpValue) | (lpValue === 0) | isNaN(lpValue)
                ? "#ACACAC"
                : "#413AE2",
          }}
          onClick={() => {
            UnStakeLp();
          }}
        >
          Confirm
        </button>
      </div>

      <div
        className="get-phnx-eth-lp"
        style={{ marginTop: "25px", fontWeight: "bold", fontSize: "12px" }}
      >
        Get PHNX-ETH LP
      </div>
    </div>
  );
}

export default UnStakeModal;
