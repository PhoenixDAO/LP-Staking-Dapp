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
import { CircularProgress } from "@mui/material";

function UnStakeModal({ Close, userInfo }) {

  const [lpValue, setlpValue] = useState();
  const [maxlpValue, setmaxlpValue] = useState(0.0);
  const [loading, setLoading] = useState(false);

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
    setlpValue(e.target.value);
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
        await STAKE_SERVICES.unStakeLp(
          web3context,
          contractPhnxStake,
          contractPhnxDao,
          lpValue,
          handleGetPoolPosition,
          handleGetEthBalance,
          handleGetPhnxBalance,
          setLoading,
          Close
        );
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleGetPoolPosition = () => {
    dispatch(GetPoolPositionAction(web3context, contractUniswapPair));
  };
  const handleGetEthBalance = () => {
    dispatch(GetEthBalanceAction(web3context));
  };
  const handleGetPhnxBalance = () => {
    dispatch(GetPhnxBalanceAction(web3context, contractPhnxDao));
  };

  return (
    <div className="stakingModal">
      <img className="stakingModalLogo" src={Logo} alt="Logo"></img>

      <div className="stakingModalHeading">UnStake LP Tokens</div>

      <div style={{ display: "flex", alignItem: "center" }}>
        <div className="stakingModal-details">STAKE</div>
        <div style={{ marginLeft: "auto" }} className="stakingModal-details">
         <span> Bal: {" "}<span style={{ color: "#000" }}>{maxlpValue} PHNX-ETH LP</span></span>
        </div>
      </div>

      <div style={{ display: "flex", marginTop: "10px", alignItems: "center" , border:'solid 1px #E4E4E7' ,borderRadius:'5px',paddingRight:'5px'}}>
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
          MAX
        </button>
      </div>


      <>
      {
        lpValue>0 && lpValue <= 0.00000000000000001 ? 
        <div style={{color:'red',paddingTop:'5px'}}>The entered value is too low.</div> : null
      }
      </>



      {/* <div style={{ display: "flex", alignItems: "center", marginTop: "13px" }}>
        <div className="stakingModal-details" style={{ marginTop: "0px" }}>
          Annual ROI at current rates:
        </div>
        <div
          className="stakingModal-details"
          style={{ marginLeft: "auto", marginTop: "0px" }}
        >
          $0.00 &nbsp;<img src={CalculatorLogo}></img>
        </div>
      </div> */}

      <div style={{ display: "flex", alignItems: "center" ,marginTop:"20px"}}>
        <button
          className="farm-btn-stake-outline"
          style={{ marginTop: "25px",
        fontSize:"16px" }}
          onClick={() => Close()}
        >
          Close
        </button>
        <button
          className="farm-btn-stake-outline stakingModalConfirm"
          style={{
            marginLeft: "auto",
            marginTop: "25px",
            fontSize:"16px",
            background:
            loading || (lpValue > maxlpValue) || (lpValue <= 0) || (lpValue <= 0.00000000000000001) || isNaN(lpValue)
                ? "#ACACAC"
                : "#413AE2",
            color: "#fff",
            borderColor:
            loading || (lpValue > maxlpValue) || (lpValue <= 0) || (lpValue <= 0.00000000000000001) || isNaN(lpValue)
                ? "#ACACAC"
                : "#413AE2",
          }}
          onClick={() => {
            _handleUnstakeLp();
          }}
          disabled={loading || (lpValue > maxlpValue) || (lpValue <= 0) || (lpValue <= 0.00000000000000001) || isNaN(lpValue)}
        >
          {loading && "Confirming..."}
          {!loading && "Confirm"}
        </button>
      </div>

      <div
        className="get-phnx-eth-lp"
        style={{ marginTop: "25px", fontWeight: "bold", fontSize: "14px" }}
      >
        <Link to="/liquidity" style={{textDecoration:'none',color:'#413ae2'}}>
          Get PHNX-ETH LP{" "} &nbsp;
          <img src={ShareLogo}  style={{height:"12px"}}></img>
        </Link>
      </div>
    </div>
  );
}

export default UnStakeModal;
