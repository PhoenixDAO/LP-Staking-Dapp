import React from "react";
import "./farm.css";
import FarmStake from "./farmStake/FarmStake";
import FarmHarvest from "./farmHarvest/FarmHarvest";
import { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import StakingModal from "./modals/StakeModal";
import UnStakingModal from "./modals/UnstakeModal";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { abi as PhnxStakeAbi } from "../../contract/abi/PHXStakeABI.json";
import { abi as UniswapV2PairABI } from "../../contract/abi/UniswapV2PairABI.json";
import {
  PHNX_LP_STAKING_CONTRACT_ADDRESS_RINKEBY,
  UNISWAP_V2_PHNX_ETH_PAIR_ADDRESS_RINKEBY,
} from "../../contract/constant";

function Farm() {
  const [stakeNull, checkStateNull] = useState(false);
  const [isStackVisible, setStackVisible] = useState(false);
  const [isUnStackVisible, setUnStackVisible] = useState(false);
  const [allowance, setAllowance] = useState(0);

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
      const web3 = new Web3(web3context?.library?.currentProvider);
      const phnxStakecontract = new web3.eth.Contract(
        PhnxStakeAbi,
        PHNX_LP_STAKING_CONTRACT_ADDRESS_RINKEBY
      );

      const pairContract = new web3.eth.Contract(
        UniswapV2PairABI,
        UNISWAP_V2_PHNX_ETH_PAIR_ADDRESS_RINKEBY
      );

      //check lp approval
      const checkApproval = async () => {
        const al = await pairContract.methods
          .allowance(
            web3context?.account,
            PHNX_LP_STAKING_CONTRACT_ADDRESS_RINKEBY
          )
          .call();
        console.log("al", al);
        setAllowance(al);
      };

      checkApproval();
    }
  }, [
    web3context?.library?.currentProvider,
    web3context?.account,
    web3context?.active,
  ]);

  //give approval for lp tokens
  const giveApproval = async () => {
    const web3 = new Web3(web3context?.library?.currentProvider);
    const pairContract = new web3.eth.Contract(
      UniswapV2PairABI,
      UNISWAP_V2_PHNX_ETH_PAIR_ADDRESS_RINKEBY
    );

    await pairContract.methods
      .approve(
        PHNX_LP_STAKING_CONTRACT_ADDRESS_RINKEBY,
        "1000000000000000000000000000000000000000000000000000000000000000000000000000"
      )
      .send({ from: web3context?.account })
      .on("transactionHash", (hash) => {
        // hash of tx
        console.log("transactionHash", hash);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        if (confirmationNumber === 2) {
          // tx confirmed
          console.log("confirmationNumber", confirmationNumber);
        }
      })
      .on("error", function (err) {
        console.log("err", err);
      });
  };

  return (
    <div>
      <div className="farm-div">
        {stakeNull ? (
          <FarmStake
            stakeModalOpen={handleStackOpen}
            allowance={allowance}
            giveApproval={giveApproval}
          ></FarmStake>
        ) : (
          <FarmHarvest
            stakeModalOpen={handleStackOpen}
            UnstakeModalOpen={handleUnStackOpen}
          ></FarmHarvest>
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
