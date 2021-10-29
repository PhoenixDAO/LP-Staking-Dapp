import React, { useState, useEffect } from "react";
import "./stakeModal.css";
import Logo from "../../../assets/Logo.png";
import { useWeb3React } from "@web3-react/core";
import CalculatorLogo from "../../../assets/calculator.png";
import ShareLogo from "../../../assets/share.png";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import * as STAKE_SERVICES from "../../../services/stake.services";
import BigNumber from "bignumber.js";
import {
  GetPhnxBalanceAction,
  GetPoolPositionAction,
} from "../../../redux/actions/contract.actions";
import { GetEthBalanceAction } from "../../../redux/actions/local.actions";
import { Link } from "react-router-dom";
import { fixedWithoutRounding } from "../../../utils/formatters";

function StakeModal({ Close, calculateAPR, Roi }) {
  const [lpValue, setlpValue] = useState();
  const [lpValueAct, setlpValueAct] = useState(0);
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

  const maxBigValue = new BigNumber(maxlpValue);

  const LpChange = (e,f) => {
    const inputBigValue = new BigNumber(e.target.value);
    if(inputBigValue.lt(0)){
      return;
    }
    // setlpValue(e.target.value);
    if(f===true){
      setlpValue(fixedWithoutRounding(maxlpValue,6));
      setlpValueAct(maxlpValue);
    }else{
      setlpValue(e.target.value);
      setlpValueAct(e.target.value);
    }
    if (!isNaN(e.target.value) && e.target.value != "") {
      // console.log(parseFloat(e.target.value));
      calculateAPR(parseFloat(e.target.value));
    } else {
      calculateAPR(0);
    }
  };

  useEffect(()=>{
    calculateAPR(0);
  },[])

  // useEffect(() => {
  // if (!poolPosition) {
  // dispatch(GetPoolPositionAction(web3context, contractUniswapPair));
  // }
  // console.log("Pool position already init!");
  // }, [web3context.account]);

  useEffect(() => {
    if (web3context.active && web3context.account && poolPosition) {
      setmaxlpValue(poolPosition.lp);
      // console.log("poolPosition.lp", poolPosition.lp);
    }
  }, [web3context.account, poolPosition]);

  const _handleStakeLp = async () => {
    if (lpValue > maxlpValue || lpValue === 0 || isNaN(lpValue)) {
      return;
    } else {
      try {
        await STAKE_SERVICES.stakeLp(
          web3context,
          contractPhnxStake,
          contractPhnxDao,
          lpValueAct,
          handleGetPoolPosition,
          handleGetEthBalance,
          handleGetPhnxBalance,
          setLoading,
          Close
        );
      } catch (e) {
        // console.error('error staking',e);
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
      <div className="displayFlex">
        <div className="confirmPhnxDepositeLogo">
          <img style={{ height: "32px",visibility:"hidden"}} src={Logo}></img>
        </div>
        <div className="closeModalIcon">
          <span className="cursorPointer">
            <CloseIcon onClick={() => Close()} />
          </span>
        </div>
        {/* <CloseIcon className="icon-btn" onClick={()=>Close()} sx={{transform:"scale(1.2)", marginRight:"10px",cursor:"pointer"}} /> */}
      </div>
      <div className="stakingModalHeading">Stake LP Tokens</div>

      <div style={{ display: "flex", alignItem: "center" }}>
        <div className="stakingModal-details">STAKE</div>
        <div style={{ marginLeft: "auto" }} className="stakingModal-details">
          <span>
            Bal:{" "}
            <span style={{ color: "#000", fontWeight: "600" }}>
            {maxlpValue.toString().substring(0,7)} PHNX-ETH LP
            </span>
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          marginTop: "10px",
          alignItems: "center",
          border: "solid 1px #E4E4E7",
          borderRadius: "5px",
          paddingRight: "5px",
        }}
      >
        <input
          type="number"
          placeholder="0.0"
          className="stakingModalInput"
          onChange={(e) => LpChange(e)}
          value={lpValue}
          min={0}
        />

        <button
          className="stakingModalInputBtn"
          onClick={() => {
            LpChange({
              target : {
                value: maxlpValue && fixedWithoutRounding(maxlpValue,6).toString()
              }
            },true);
            if (!isNaN(maxlpValue) && maxlpValue != "") {
              // console.log(parseFloat(maxlpValue));
              calculateAPR(parseFloat(maxlpValue));
            } else {
              calculateAPR(parseFloat(0));
            }
          }}
        >
          MAX
        </button>
      </div>

      <>
        {lpValue > 0 && lpValue <= 0.00000000000000001 ? (
          <div style={{ color: "red", paddingTop: "5px" }}>
            The entered value is too low.
          </div>
        ) : null}
      </>

      <div style={{ display: "flex", alignItems: "center", marginTop: "13px" }}>
        <div className="stakingModal-details" style={{ marginTop: "0px" }}>
          Annual ROI at current rates:
        </div>
        <div
          className="stakingModal-details"
          style={{ marginLeft: "auto", marginTop: "0px" }}
        >
          ${Roi} &nbsp;
          <img
            src={CalculatorLogo}
            style={{ height: "15px", alignSelf: "center" }}
          ></img>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
        <button
          className="farm-btn-stake-outline"
          style={{ marginTop: "25px", fontSize: "18px", height:"50px",fontWeight:"700", }}
          onClick={() => {
            calculateAPR(0);
            Close();
          }}
        >
          Close
        </button>
        <button
          className="farm-btn-stake-outline stakingModalConfirm"
          style={{
            marginLeft: "auto",
            height:"50px",
            marginTop: "25px",
            fontWeight:"700",
            fontSize: "18px",
            background:
              loading ||((maxBigValue.lt(lpValue)))||
              lpValue <= 0 ||
              lpValue <= 0.00000000000000001 ||
              isNaN(lpValue)
                ? "#ACACAC"
                : "#413AE2",
            color: "#fff",
            borderColor:
              loading ||((maxBigValue.lt(lpValue)))||
              lpValue <= 0 ||
              lpValue <= 0.00000000000000001 ||
              isNaN(lpValue)
                ? "#ACACAC"
                : "#413AE2",
          }}
          onClick={() => {
            // if((lpValue > maxlpValue) || (lpValue <= 0) || (lpValue <= 0.00000000000000001) || isNaN(lpValue)) return;
            _handleStakeLp();
          }}
          disabled={
            loading ||((maxBigValue.lt(lpValue)))||
            lpValue <= 0 ||
            lpValue <= 0.00000000000000001 ||
            isNaN(lpValue)
          }
        >
          {loading && "Confirming..."}
          {!loading && "Confirm"}
        </button>
      </div>

      <div
        className="get-phnx-eth-lp"
        style={{ marginTop: "25px", fontWeight: "bold", fontSize: "14px" }}
      >
        <Link
          to="/v2/liquidity"
          style={{ textDecoration: "none", color: "#413ae2" }}
        >
          Get PHNX-ETH LP &nbsp;
          <img src={ShareLogo} style={{ height: "12px" }}></img>
        </Link>
      </div>
    </div>
  );
}

export default StakeModal;
