import React from "react";
import "./farm.css";
import FarmStake from "./farmStake/FarmStake";
import FarmHarvest from "./farmHarvest/FarmHarvest";
import { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import StakingModal from "./modals/StakeModal";
import UnStakingModal from "./modals/UnstakeModal";
import { useWeb3React } from "@web3-react/core";
import {
  giveApprovalFarming,
  harvestPHNX,
  checkApproval,
  getUserInfo,
  getPendingPHX,
} from "../../services/stake.services";
import { useSelector, useDispatch } from "react-redux";

function Farm() {
  const contractPhnxStake = useSelector((state) => state.contractPhnxStake);
  const contractUniswapPair = useSelector((state) => state.contractUniswapPair);

  const [stakeNull, checkStateNull] = useState(false);
  const [isStackVisible, setStackVisible] = useState(false);
  const [isUnStackVisible, setUnStackVisible] = useState(false);
  const [allowance, setAllowance] = useState(0);
  const [userInfo, setUserInfo] = useState({ amount: 0, rewardDebt: 0 });
  const [pendingPHX, setPendingPHX] = useState({ 0: 0, 1: 0 });

  const web3context = useWeb3React();

  const handleStackOpen = () => {
    setStackVisible(true);
  };

  const handleStackClose = () => {
    setStackVisible(false);
  };

  const handleUnStackOpen = () => {
    setUnStackVisible(true);
  };

  const handleUnStackClose = () => {
    setUnStackVisible(false);
  };

  useEffect(() => {
    if (web3context?.account && web3context?.active) {
      // const web3 = new Web3(web3context?.library?.currentProvider);
      // const phnxStakecontract = new web3.eth.Contract(
      //   PhnxStakeAbi,
      //   PHNX_LP_STAKING_CONTRACT_ADDRESS_RINKEBY
      // );
      // const pairContract = new web3.eth.Contract(
      //   UniswapV2PairABI,
      //   UNISWAP_V2_PHNX_ETH_PAIR_ADDRESS_RINKEBY
      // );
      //check lp approval
      // const checkApproval = async () => {
      //   const al = await pairContract.methods
      //     .allowance(
      //       web3context?.account,
      //       PHNX_LP_STAKING_CONTRACT_ADDRESS_RINKEBY
      //     )
      //     .call();
      //   console.log("al", al);
      //   setAllowance(al);
      // };
      // const getUserInfo = async () => {
      //   const info = await phnxStakecontract.methods
      //     .userInfo(web3context?.account)
      //     .call();
      //   console.log("info", info);
      //   setUserInfo(info);
      // };
      // const getPendingPHX = async () => {
      //   const pending = await phnxStakecontract.methods
      //     .pendingPHX(web3context?.account)
      //     .call();
      //   console.log("pending", pending);
      //   setPendingPHX(pending);
      // };
      checkApproval(contractUniswapPair, web3context, setAllowance);
      getUserInfo(contractPhnxStake, web3context, setUserInfo);
      getPendingPHX(contractPhnxStake, web3context, setPendingPHX);
    }
  }, [
    web3context?.library?.currentProvider,
    web3context?.account,
    web3context?.active,
  ]);

  //give approval for lp tokens
  const _giveApproval = async (contractPhnxStake, web3context) => {
    try {
      await giveApprovalFarming(web3context, contractUniswapPair);
    } catch (e) {
      console.error(e);
    }
    // const web3 = new Web3(web3context?.library?.currentProvider);
    // const pairContract = new web3.eth.Contract(
    //   UniswapV2PairABI,
    //   UNISWAP_V2_PHNX_ETH_PAIR_ADDRESS_RINKEBY
    // );

    // await pairContract.methods
    //   .approve(
    //     PHNX_LP_STAKING_CONTRACT_ADDRESS_RINKEBY,
    //     "1000000000000000000000000000000000000000000000000000000000000000000000000000"
    //   )
    //   .send({ from: web3context?.account })
    //   .on("transactionHash", (hash) => {
    //     // hash of tx
    //     console.log("transactionHash", hash);
    //   })
    //   .on("confirmation", function (confirmationNumber, receipt) {
    //     if (confirmationNumber === 2) {
    //       // tx confirmed
    //       console.log("confirmationNumber", confirmationNumber);
    //     }
    //   })
    //   .on("error", function (err) {
    //     console.log("err", err);
    //   });
  };

  const _harvestPHNX = async () => {
    try {
      await harvestPHNX(web3context, contractPhnxStake);
    } catch (e) {
      console.error(e);
    }
    // const web3 = new Web3(web3context?.library?.currentProvider);
    // const Contract = new web3.eth.Contract(
    //   PhnxStakeAbi,
    //   PHNX_LP_STAKING_CONTRACT_ADDRESS_RINKEBY
    // );

    // Contract.methods
    //   .deposit(web3.utils.toWei("0"))
    //   .send({ from: web3context.account })
    //   .on("transactionHash", (hash) => {
    //     // hash of tx
    //     console.log("tx hash", hash);
    //   })
    //   .on("confirmation", function (confirmationNumber, receipt) {
    //     if (confirmationNumber === 2) {
    //       // tx confirmed
    //       // checkApproval(web3context, contractPhnx);
    //       alert("success", "tx successfull!");
    //     }
    //   })
    //   .on("error", function (err) {
    //     console.error(err);
    //   });
  };

  return (
    <div>
      <div className="farm-div">
        {userInfo.amount == 0 ? (
          <FarmStake
            stakeModalOpen={handleStackOpen}
            allowance={allowance}
            giveApproval={_giveApproval}
            userInfo={userInfo}
          />
        ) : (
          <FarmHarvest
            stakeModalOpen={handleStackOpen}
            UnstakeModalOpen={handleUnStackOpen}
            userInfo={userInfo}
            pendingPHX={pendingPHX}
            harvestPHNX={_harvestPHNX}
          />
        )}
      </div>
      <br></br>
      <br></br>
      <br></br>
      <Modal
        open={isStackVisible}
        onClose={handleStackClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StakingModal Close={handleStackClose}></StakingModal>
      </Modal>
      <Modal
        open={isUnStackVisible}
        onClose={handleUnStackOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <UnStakingModal Close={handleUnStackClose}></UnStakingModal>
      </Modal>
    </div>
  );
}

export default Farm;
