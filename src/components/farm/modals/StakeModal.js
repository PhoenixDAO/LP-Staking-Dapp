import React, { useState, useEffect } from "react";
import "./stakeModal.css";
import Logo from "../../../assets/Logo.png";
import { useWeb3React } from "@web3-react/core";
import CalculatorLogo from "../../../assets/calculator.png";
import ShareLogo from "../../../assets/share.png";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import * as STAKE_SERVICES from "../../../services/stake.services";
import {
  GetPhnxBalanceAction,
  GetPoolPositionAction,
} from "../../../redux/actions/contract.actions";
import { GetEthBalanceAction } from "../../../redux/actions/local.actions";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

function StakeModal({ Close, calculateAPR, Roi }) {
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
    // if (lpValue > maxlpValue) {
    //   return;
    // }

    setlpValue(e.target.value);

    if (!isNaN(e.target.value) && e.target.value != "") {
      console.log(parseFloat(e.target.value));
      calculateAPR(parseFloat(e.target.value));
    } else {
      calculateAPR(0);
    }
    // }
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
      console.log("poolPosition.lp", poolPosition.lp);
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
        <div className="displayFlex">
              <div className="confirmPhnxDepositeLogo">
                <img style={{height:"32px"}} src={Logo}></img>
              </div>
              <div className="closeModalIcon">
                <span className="cursorPointer">
                  <CloseIcon onClick={() => Close()} />
                </span>
              </div>
            </div>
      <div className="stakingModalHeading">Stake LP Tokens</div>

      <div style={{ display: "flex", alignItem: "center" }}>
        <div className="stakingModal-details">STAKE</div>
        <div style={{ marginLeft: "auto" }} className="stakingModal-details">
          <span>
            Bal: <span style={{ color: "#000", fontWeight:"600" }}>{maxlpValue} PHNX-ETH LP</span>
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
        ></input>

        <button
          className="stakingModalInputBtn"
          onClick={() => {
            setlpValue(maxlpValue);
            if (!isNaN(maxlpValue) && maxlpValue != "") {
              console.log(parseFloat(maxlpValue));
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
      {
        lpValue>0 && lpValue <= 0.00000000000000001 ? 
        <div style={{color:'red',paddingTop:'5px'}}>The entered value is too low.</div> : null
      }
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
          style={{ marginTop: "25px",
        fontSize:"16px" }}
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
              // if((lpValue > maxlpValue) || (lpValue <= 0) || (lpValue <= 0.00000000000000001) || isNaN(lpValue)) return;
            _handleStakeLp();
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
        <Link
          to="/liquidity"
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
