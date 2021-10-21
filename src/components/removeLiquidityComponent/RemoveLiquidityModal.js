import React, { useState, useEffect } from "react";
import "./removeLiquidity.css";
import Logo from "../../assets/Logo.png";
import PhnxLogo from "../../assets/PhnxLogo1.png";
import EthLogo from "../../assets/ETH1.png";
import { useSelector, useDispatch } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import ConfirmModal from "../connectModal/ConfirmModal";
import TransactionProgress from "../connectModal/TransactionProgress";
import TransactionSubmitted from "../connectModal/TransactionSubmitted";
import * as POOL_SERVICES from "../../services/pool.services";
import * as STAKE_SERVICES from "../../services/stake.services";
import CloseIcon from "@mui/icons-material/Close";
import {
  GetPoolPositionAction,
  GetPhnxBalanceAction,
  CheckApprovalPhnxStakingAction,
  CheckApprovalUniswapPairAction,
} from "../../redux/actions/contract.actions";
import { GetEthBalanceAction } from "../../redux/actions/local.actions";
import { IconButton, InputAdornment, Modal, TextField } from "@mui/material";
import percentage from "../../assets/percentage.svg";

const RemoveLiquidityModaL = ({ slippageValue , allowance , giveApproval ,handleClose}) => {
  console.log(allowance,'asdasdasd')
  console.log(slippageValue,'asdasdasd')
  const web3context = useWeb3React();
  const dispatch = useDispatch();
  const phnxPerEth = useSelector((state) => state.localReducer.phnxPerEth);
  const ethPerPhnx = useSelector((state) => state.localReducer.ethPerPhnx);
  const contractUniswapPair = useSelector(
    (state) => state.contractReducer.contractUniswapPair
  );
  const contractUniswapRouter = useSelector(
    (state) => state.contractReducer.contractUniswapRouter
  );
  const poolPosition = useSelector(
    (state) => state.contractReducer.poolPosition
  );
  const contractPhnxDao = useSelector(
    (state) => state.contractReducer.contractPhnxDao
  );

  const [perEthVal, setPerEthValue] = useState(0);
  const [perPhnxVal, setPerPhnxValue] = useState(0);

  const [phnxethburn, setphnxethburn] = useState(0);
  const [selectedPercentage, setSelectedPercentage] = useState("");
  // const [allowance, setAllowance] = useState(0);

  const [transactionConfirmModal, settransactionConfirmModal] = useState(false);
  const [transactionProcessModal, settransactionProcessModal] = useState(false);
  const [transactionSubmittedModal, settransactionSubmittedModal] =
    useState(false);
  const [tranHash, settranHash] = useState("");
  const[approveStatus,setApproveStatus] = useState(false);


  useEffect(()=>{
    console.log(allowance,'aaaaa')
  })

  const handleCheckApprovalUniswapPairAction = async () => {
    console.log("coming to handleCheckApprovalUniswapPairAction");
    dispatch(CheckApprovalUniswapPairAction(web3context, contractUniswapPair,setApproveStatus));
  };
  // const handleCheckApprovalPhnxStakingAction = () => {
  //   dispatch(CheckApprovalPhnxStakingAction(web3context, contractUniswapPair,setAllowance));
  // };

  const handleGetPoolPositionAction = () => {
    dispatch(GetPoolPositionAction(web3context, contractUniswapPair));
  };
  const handleGetEthBalanceAction = () => {
    dispatch(GetEthBalanceAction(web3context));
  };
  const handleGetPhnxBalanceAction = () => {
    dispatch(GetPhnxBalanceAction(web3context, contractPhnxDao));
  };

  const _handleRemoveLiquidity = async (handleMainClose) => {
    settransactionProcessModal(true);
    try {
      await POOL_SERVICES.removeLiquidity(
        web3context,
        contractUniswapRouter,
        poolPosition,
        selectedPercentage == "" ? 10 : selectedPercentage,
        settransactionProcessModal,
        settransactionConfirmModal,
        settransactionSubmittedModal,
        handleGetPoolPositionAction,
        handleGetEthBalanceAction,
        handleGetPhnxBalanceAction,
        slippageValue,
        settranHash,
        handleMainClose
      );
      dispatch(GetPoolPositionAction(web3context, contractUniswapPair));
      dispatch(GetEthBalanceAction(web3context));
      dispatch(GetPhnxBalanceAction(web3context, contractPhnxDao));
    } catch (e) {
      console.error(e);
    }
  };

  const handlePercentageInput = (e) => {
    if (e.target.value === "" || isNaN(e.target.value)) {
      setSelectedPercentage(parseInt(0));
    } else if (e.target.value > 100) {
      setSelectedPercentage(100);
    } else {
      setSelectedPercentage(parseInt(e.target.value));
    }
  };

  const setTxModalOpen = () => {
    settransactionConfirmModal(true);
  };

  const setTxModalClose = () => {
    settransactionConfirmModal(false);
  };

  const _handleCalculateLpToken = async (amount0, amount1) => {
    try {
      await POOL_SERVICES.calculateLpToken(
        contractUniswapPair,
        amount0,
        amount1,
        setphnxethburn
      );
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!poolPosition) {
      return;
    }
    const ethValue = poolPosition.eth * (selectedPercentage / 100).toString();
    const phnxValue =
      parseFloat(poolPosition.phnx) * (selectedPercentage / 100).toString();

    setPerEthValue(ethValue);
    setPerPhnxValue(phnxValue);

    _handleCalculateLpToken(ethValue, phnxValue);
  }, [selectedPercentage, poolPosition]);

  return (
    <div className="rm-liq-div">
      <img className="rm-liq-Logo" src={Logo}></img>
      <div className="rm-liq-heading">Remove PHNX-ETH Liquidity</div>

      <div style={{cursor:'pointer',position:'absolute',right:'25px',top:'25px',padding:'5px'}}>
        <span >
          <CloseIcon onClick={handleClose} />
        </span>
      </div>

      <div className="rm-liq-ps-div">
        <div
          className="rm-liq-ps"
          style={{
            backgroundColor: selectedPercentage === 25 ? "#413AE2" : "#f2f2fd",
            color: selectedPercentage === 25 ? "#fff" : "#000",
          }}
          onClick={() => {
            setSelectedPercentage(25);
          }}
        >
          25%
        </div>
        <div
          className="rm-liq-ps"
          style={{
            backgroundColor: selectedPercentage === 50 ? "#413AE2" : "#f2f2fd",
            color: selectedPercentage === 50 ? "#fff" : "#000",
          }}
          onClick={() => {
            setSelectedPercentage(50);
          }}
        >
          50%
        </div>
        <div
          className="rm-liq-ps"
          style={{
            backgroundColor: selectedPercentage === 75 ? "#413AE2" : "#f2f2fd",
            color: selectedPercentage === 75 ? "#fff" : "#000",
          }}
          onClick={() => {
            setSelectedPercentage(75);
          }}
        >
          75%
        </div>
        <div
          className="rm-liq-ps"
          style={{
            backgroundColor: selectedPercentage === 100 ? "#413AE2" : "#f2f2fd",
            color: selectedPercentage === 100 ? "#fff" : "#000",
          }}
          onClick={() => {
            setSelectedPercentage(100);
          }}
        >
          Max
        </div>
      </div>

      <div className="rm-liq-ps-input-div">
        {/* <input
          className="rm-liq-ps-input"
          placeholder="Enter a value"
          value={selectedPercentage}
          onChange={(e) => {
            handlePercentageInput(e);
          }}
        ><img src={percentage} className="textFieldIcon"></img></input> */}
        <TextField
          sx={{
            borderRadius: "6px",
            marginBottom: "20px",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton>
                  <img src={percentage} className="textFieldIcon"></img>
                </IconButton>
              </InputAdornment>
            ),
          }}
          className="slippingLiq-ps-input"
          placeholder="Enter a value"
          value={selectedPercentage == 0 ? "" : selectedPercentage}
          onChange={(e) => {
            handlePercentageInput(e);
          }}
        ></TextField>
      </div>

      <div className="rm-liq-u-will-rec" style={{ textTransform: "uppercase" }}>
        You will recieve
      </div>

      <div className="rm-liq-phnx-eth-det-div">
        <div className="rm-liq-phnx-eth-det">
          <img src={PhnxLogo} className="rm-liq-phnx-eth-img"></img>
          <div className="rm-liq-phnx-eth-name">PHNX</div>
          <div className="rm-liq-phnx-eth-number">{perPhnxVal}</div>
        </div>

        <div style={{ height: "10px" }}></div>

        <div className="rm-liq-phnx-eth-det">
          <img src={EthLogo} className="rm-liq-phnx-eth-img"></img>
          <div className="rm-liq-phnx-eth-name">ETH</div>
          <div className="rm-liq-phnx-eth-number">{perEthVal}</div>
        </div>
      </div>

      <div className="rm-liq-phnx-eth-con-div">
        <div className="rm-liq-phnx-eth-con">
          1 PHNX = {ethPerPhnx + " "} ETH
        </div>
        <div className="rm-liq-phnx-eth-con">
          1 ETH = {phnxPerEth + " "} PHNX
        </div>
      </div>

      {allowance == 0 ? (
        <button
          className="rm-liq-btn"
          onClick={async()=>{
            if(approveStatus)return;
            setApproveStatus(true);
            await giveApproval(setApproveStatus);
            // setApproveStatus(false);
          }}
        style={{backgroundColor: approveStatus ? "#acacac" : "#413AE2"}}
          // onClick={() => setTxModalOpen()}
        >
          {

              approveStatus==false ?
              'Approve ETH-PHNX LP' :
              'Approving ETH-PHNX LP...'

          }
        </button>
      ) : selectedPercentage == 0 || selectedPercentage == "" ? (
        <button
          className="add-liq-btn cursorPointer"
          style={{ backgroundColor: "#acacac" }}
        >
          Enter Value
        </button>
      ) : (
        <button
          className="rm-liq-btn"
          onClick={() => settransactionConfirmModal(true)}
        >
          Remove
        </button>
      )}

      <div className="rm-liq-divider"></div>

      <div className="rm-liq-u-will-rec">LP TOKENS IN YOUR WALLET</div>

      <div className="rm-liq-phnx-eth-lp-div">
        <img src={PhnxLogo}></img>
        <img src={EthLogo}></img>
        <div className="rm-liq-phnx-eth-lp-sub">PHNX/ETH LP</div>
        <div className="rm-liq-phnx-eth-lp-sub-no" style={{fontWeight:'900',fontSize:'20px', color:'#1e1e22', fontFamily:'AeonikBold'}}>{poolPosition?.lp}</div>
      </div>

      <div className="rm-liq-phnx-eth-lp-div">
        <div className="rm-liq-phnx-eth-lp-sub">Pooled PHNX</div>
        <img src={PhnxLogo} style={{ marginLeft: "auto" }}></img>
        <div
          className="rm-liq-phnx-eth-lp-sub-no"
          style={{ marginLeft: "4px" }}
        >
          {poolPosition?.phnx}
        </div>
      </div>

      <div className="rm-liq-phnx-eth-lp-div">
        <div className="rm-liq-phnx-eth-lp-sub">Pooled ETH</div>
        <img src={EthLogo} style={{ marginLeft: "auto" }}></img>
        <div
          className="rm-liq-phnx-eth-lp-sub-no"
          style={{ marginLeft: "4px" }}
        >
          {poolPosition?.eth}
        </div>
      </div>

      <div className="rm-liq-phnx-eth-lp-div" style={{ marginTop: "7px" }}>
        <div className="rm-liq-phnx-eth-lp-sub">Pool Share</div>
        <div className="rm-liq-phnx-eth-lp-sub-no">
          {poolPosition.poolPerc}%
        </div>
      </div>

      <br></br>

      <ConfirmModal
        transactionConfirmModal={transactionConfirmModal}
        setTxModalClose={setTxModalClose}
        phnx={perPhnxVal}
        eth={perEthVal}
        ethPerPhnx={ethPerPhnx}
        phnxPerEth={phnxPerEth}
        phnxethburn={phnxethburn}
        handleRemoveLiquidity={_handleRemoveLiquidity}
        slippageValue={slippageValue}
        handleMainClose={handleClose}
      />
      <TransactionProgress transactionProcessModal={transactionProcessModal} />
      <TransactionSubmitted
        transactionSubmittedModal={transactionSubmittedModal}
        hash={tranHash}
      />
    </div>
  );
};

export default RemoveLiquidityModaL;
