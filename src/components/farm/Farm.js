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
import { useSelector } from "react-redux";
import axios from "axios";

function Farm() {
  const contractPhnxStake = useSelector(
    (state) => state.contractReducer.contractPhnxStake
  );
  const contractUniswapPair = useSelector(
    (state) => state.contractReducer.contractUniswapPair
  );

  const [stakeNull, checkStateNull] = useState(false);
  const [isStackVisible, setStackVisible] = useState(false);
  const [isUnStackVisible, setUnStackVisible] = useState(false);
  const [allowance, setAllowance] = useState(0);
  const [userInfo, setUserInfo] = useState({ amount: 0, rewardDebt: 0 });
  const [pendingPHX, setPendingPHX] = useState({ 0: 0, 1: 0 });
  const [reserveUSD, setReserveUSD] = useState(0);

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
    if (
      web3context?.account &&
      web3context?.active &&
      contractUniswapPair &&
      contractPhnxStake
    ) {
      checkApproval(contractUniswapPair, web3context, setAllowance);
      getUserInfo(contractPhnxStake, web3context, setUserInfo);
      getPendingPHX(contractPhnxStake, web3context, setPendingPHX);
    }
  }, [
    web3context?.library?.currentProvider,
    web3context?.account,
    web3context?.active,
    contractUniswapPair,
  ]);

  useEffect(() => {
    getTotalLiquidity();
  }, []);

  const getTotalLiquidity = async () => {
    await axios({
      url: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
      method: "post",
      data: {
        query: `
        {
          pairs(where:{id:"0xdfe317f907ca9bf6202cddec3def756438a3b3f7"}){
            reserveUSD
          }
        }
				`,
      },
    })
      .then((response) => {
        if (response.data) {
          setReserveUSD(parseInt(response.data.data.pairs[0]["reserveUSD"]));
        }
      })
      .catch((err) => console.error(err));
  };

  //give approval for lp tokens
  const _giveApproval = async () => {
    try {
      await giveApprovalFarming(web3context, contractUniswapPair);
    } catch (e) {
      console.error(e);
    }
  };

  const _harvestPHNX = async () => {
    try {
      await harvestPHNX(web3context, contractPhnxStake);
    } catch (e) {
      console.error(e);
    }
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
            reserveUSD={reserveUSD}
          />
        ) : (
          <FarmHarvest
            stakeModalOpen={handleStackOpen}
            UnstakeModalOpen={handleUnStackOpen}
            userInfo={userInfo}
            pendingPHX={pendingPHX}
            harvestPHNX={_harvestPHNX}
            reserveUSD={reserveUSD}
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
        <UnStakingModal
          Close={handleUnStackClose}
          userInfo={userInfo}
        ></UnStakingModal>
      </Modal>
    </div>
  );
}

export default Farm;
