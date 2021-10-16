import React from "react";
import "./farm.css";
import FarmStake from "./farmStake/FarmStake";
import FarmHarvest from "./farmHarvest/FarmHarvest";
import { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import StakingModal from "./modals/StakeModal";
import UnStakingModal from "./modals/UnstakeModal";
import { useWeb3React } from "@web3-react/core";
import { fixedWithoutRounding } from "../../utils/formatters";
import {
  giveApprovalFarming,
  harvestPHNX,
  checkApproval,
  getUserInfo,
  getPendingPHX,
} from "../../services/stake.services";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { GetEthBalanceAction } from "../../redux/actions/local.actions";
import {
  GetPhnxBalanceAction,
  GetPoolPositionAction,
} from "../../redux/actions/contract.actions";
import VersionSwitch from "../versionSwitch/versionSwitch";
import Web3 from "web3";

function Farm() {
  const dispatch = useDispatch();
  const web3context = useWeb3React();
  const userIsActive = useSelector((state) => state.localReducer.userIsActive);

  const contractPhnxStake = useSelector(
    (state) => state.contractReducer.contractPhnxStake
  );
  const contractUniswapPair = useSelector(
    (state) => state.contractReducer.contractUniswapPair
  );
  const contractPhnxDao = useSelector(
    (state) => state.contractReducer.contractPhnxDao
  );
  const poolPosition = useSelector(
    (state) => state.contractReducer.poolPosition
  );
  const balancePhnx = useSelector((state) => state.contractReducer.balancePhnx);

  const [stakeNull, checkStateNull] = useState(false);
  const [isStackVisible, setStackVisible] = useState(false);
  const [isUnStackVisible, setUnStackVisible] = useState(false);
  const [allowance, setAllowance] = useState(0);
  const [userInfo, setUserInfo] = useState({ amount: 0, rewardDebt: 0 });
  const [pendingPHX, setPendingPHX] = useState({ 0: 0, 1: 0 });
  const [reserveUSD, setReserveUSD] = useState(0);
  const [loading, setLoading] = useState(false);
  const [APR, setAPR] = useState(0);

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
      // getUserInfo(contractPhnxStake, web3context, setUserInfo);
      handleGetUserInfo();
      getPendingPHX(contractPhnxStake, web3context, setPendingPHX);
      handleGetPoolPosition();
    }
  }, [
    web3context?.library?.currentProvider,
    web3context?.account,
    web3context?.active,
    contractUniswapPair,
    balancePhnx,
  ]);

  useEffect(() => {
    handleGetUserInfo();
  }, [poolPosition]);
  const handleGetUserInfo = () => {
    getUserInfo(contractPhnxStake, web3context, setUserInfo);
  };

  useEffect(() => {
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

    getTotalLiquidity();
  }, []);

  //give approval for lp tokens
  const _giveApproval = async () => {
    try {
      await giveApprovalFarming(
        web3context,
        contractUniswapPair,
        handleGetPoolPosition,
        handleGetEthBalance,
        handleGetPhnxBalance
      );
    } catch (e) {
      console.error(e);
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

  const _harvestPHNX = async () => {
    try {
      await harvestPHNX(
        web3context,
        contractPhnxStake,
        contractPhnxDao,
        handleGetPoolPosition,
        handleGetEthBalance,
        handleGetPhnxBalance,
        setLoading
      );
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const calculateAPR = async () => {
      const blockInAYear = 2102400;
      const phxPerBlock = await contractPhnxStake.methods.phxPerBlock().call();
      const lpTokenSupply = await contractPhnxStake.methods
        .lpTokenSupply()
        .call();

      const apr =
        (blockInAYear * Web3.utils.fromWei(phxPerBlock)) /
        Web3.utils.fromWei(lpTokenSupply);

      const roi =
        (100 - Web3.utils.fromWei(lpTokenSupply)) /
        Web3.utils.fromWei(lpTokenSupply);

      console.log("roi", Web3.utils.fromWei(lpTokenSupply), roi * 100);

      setAPR(parseInt(apr));
    };

    if (contractPhnxStake) {
      calculateAPR();
    }
  }, [contractPhnxStake]);

  // Check if phnx earned is less than contract balance for staking
  // for unstake if phnx earned + unstaked token < contract balance of staking

  return (
    <div>
      <div className="farm-div">
        {
        !web3context.active || poolPosition==null ? (
          <FarmStake
            stakeModalOpen={handleStackOpen}
            allowance={allowance}
            giveApproval={_giveApproval}
            userInfo={userInfo}
            reserveUSD={reserveUSD}
            loading={loading}
            APR={APR}
          />
        ) : poolPosition.lp == 0 ?(
           <FarmStake
            stakeModalOpen={handleStackOpen}
            allowance={allowance}
            giveApproval={_giveApproval}
            userInfo={userInfo}
            reserveUSD={reserveUSD}
            loading={loading}
            APR={APR}
          />
        ) : (
          <FarmHarvest
            stakeModalOpen={handleStackOpen}
            UnstakeModalOpen={handleUnStackOpen}
            userInfo={userInfo}
            pendingPHX={pendingPHX}
            harvestPHNX={_harvestPHNX}
            reserveUSD={reserveUSD}
            loading={loading}
            APR={APR}
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
        <StakingModal Close={handleStackClose} />
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
      <VersionSwitch />
    </div>
  );
}

export default Farm;
