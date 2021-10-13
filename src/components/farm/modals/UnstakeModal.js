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
import CalculatorLogo from "../../../assets/calculator.png";
import ShareLogo from "../../../assets/share.png";
import { useSelector, useDispatch } from "react-redux";
import * as STAKE_SERVICES from "../../../services/stake.services";
import {
  GetPhnxBalanceAction,
  GetPoolPositionAction,
} from "../../../redux/actions/contract.actions";
import { GetEthBalanceAction } from "../../../redux/actions/local.actions";
import { Link } from "react-router-dom";

function UnStakeModal({ Close, userInfo }) {
  const [lpValue, setlpValue] = useState(0.0);
  const [maxlpValue, setmaxlpValue] = useState(0.0);

  const web3context = useWeb3React();
  const dispatch = useDispatch();
  const poolPosition = useSelector(
    (state) => state.contractReducer.poolPosition
  );
  const contractPhnxStake = useSelector(
    (state) => state.contractReducer.contractPhnxStake
  );
  const contractPhnxDao = useSelector(
    (state) => state.contractReducer.contractPhnxDao
  );
  const contractUniswapPair = useSelector(
    (state) => state.contractReducer.contractUniswapPair
  );

  const LpChange = (e) => {
    setlpValue(parseFloat(e.target.value));
  };

  useEffect(() => {
    // if (!poolPosition) {
    dispatch(GetPoolPositionAction(web3context, contractUniswapPair));
    // }
    // console.log("Pool position already init!");
  }, [web3context.account]);

  useEffect(() => {
    if (web3context.active && web3context.account && poolPosition) {
      // setmaxlpValue(poolPosition.lp);
      setmaxlpValue(Web3.utils.fromWei(userInfo.amount));
      console.log("poolPosition.lp", poolPosition.lp);
    }
  }, [web3context.account, poolPosition]);

  const _handleUnstakeLp = async () => {
    if (lpValue > maxlpValue || lpValue === 0 || isNaN(lpValue)) {
      return;
    } else {
      try {
        await STAKE_SERVICES.unStakeLp(web3context, contractPhnxStake, lpValue);
        dispatch(GetEthBalanceAction(web3context));
        dispatch(GetPhnxBalanceAction(web3context, contractPhnxDao));
        dispatch(GetPoolPositionAction(web3context, contractUniswapPair));
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="stakingModal">
      <img className="stakingModalLogo" src={Logo} alt="Logo"></img>

      <div className="stakingModalHeading">UnStake LP Tokens</div>

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
          Max
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
          $0.00 &nbsp;<img src={CalculatorLogo}></img>
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
            _handleUnstakeLp();
          }}
        >
          Confirm
        </button>
      </div>

      <div
        className="get-phnx-eth-lp"
        style={{ marginTop: "25px", fontWeight: "bold", fontSize: "12px" }}
      >
        <Link to="/liquidity">
          Get PHNX-ETH LP
          <img src={ShareLogo}></img>
        </Link>
      </div>
    </div>
  );
}

export default UnStakeModal;
