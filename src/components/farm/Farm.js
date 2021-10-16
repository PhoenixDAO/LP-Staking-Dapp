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
  harvestPHNX,
  getUserInfo,
  getPendingPHX,
  giveApprovalPhnxStaking,
} from "../../services/stake.services";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { GetEthBalanceAction } from "../../redux/actions/local.actions";
import {
  GetPhnxBalanceAction,
  GetPoolPositionAction,
  PhnxStakeContractInitAction,
  CheckApprovalUniswapPairAction,
  CheckApprovalPhnxStakingAction,
} from "../../redux/actions/contract.actions";
import VersionSwitch from "../versionSwitch/versionSwitch";
import Web3 from "web3";
import { phnxStakeContractInit,giveApprovalUniswapPair } from "../../services/pool.services";
import BigNumber from "bignumber.js";

function Farm() {
  const dispatch = useDispatch();
  const web3context = useWeb3React();
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

  const [isStackVisible, setStackVisible] = useState(false);
  const [isUnStackVisible, setUnStackVisible] = useState(false);
  const [allowance, setAllowance] = useState(0);
  const [userInfo, setUserInfo] = useState({ amount: 0, rewardDebt: 0 });
  const [pendingPHX, setPendingPHX] = useState({ 0: 0, 1: 0 });
  const [reserveUSD, setReserveUSD] = useState(0);
  const [loading, setLoading] = useState(false);
  const [APR, setAPR] = useState(0);
  const [PhoenixDAO_market, setPhoenixDAO_market] = useState(null);

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
  const handleGetUserInfo = async () => {
    getUserInfo(contractPhnxStake, web3context, setUserInfo);
  };
  const handleGetPoolPositionAction = async () => {
    dispatch(GetPoolPositionAction(web3context, contractUniswapPair));
  };
  const handleGetEthBalanceAction = async () => {
    dispatch(GetEthBalanceAction(web3context));
  };
  const handleGetPhnxBalanceAction = async () => {
    dispatch(GetPhnxBalanceAction(web3context, contractPhnxDao));
  };
  const handleCheckApprovalUniswapPairAction = async () => {
    console.log("coming to handleCheckApprovalUniswapPairAction");
    dispatch(CheckApprovalUniswapPairAction(web3context, contractUniswapPair));
  };
  const handleCheckApprovalPhnxStakingAction = () => {
    console.log("handleCheckApprovalPhnxStakingAction iiii");
    dispatch(CheckApprovalPhnxStakingAction(web3context, contractUniswapPair));
  };

  useEffect(() => {
    if (contractUniswapPair && web3context.active) {
      handleCheckApprovalPhnxStakingAction();
    }
  }, [contractUniswapPair, web3context.active]);

  // This f() to be called on give approval button
  const handleGiveApprovalUniswapPair = async () => {
    await giveApprovalUniswapPair(
      web3context,
      contractUniswapPair,
      handleGetPoolPositionAction,
      handleGetEthBalanceAction,
      handleGetPhnxBalanceAction,
      handleCheckApprovalUniswapPairAction
    );
  };

  // have to put on a button handleGiveApprovalPhnxStakingAction
  const handleGiveApprovalPhnxStakingAction = async () => {
    try {
      await giveApprovalPhnxStaking(
        web3context,
        contractUniswapPair,
        handleGetPoolPositionAction,
        handleGetEthBalanceAction,
        handleGetPhnxBalanceAction,
        handleCheckApprovalPhnxStakingAction
      );
    } catch (e) {
      console.error(e, "err in handleGiveApprovalPhnxStakingAction");
    }
  };

  useEffect(() => {
    if (
      web3context?.account &&
      web3context?.active &&
      contractUniswapPair &&
      contractPhnxStake
    ) {
      (async () => {
        dispatch(PhnxStakeContractInitAction(web3context));
        await handleCheckApprovalUniswapPairAction();
        await handleGetUserInfo();
        await getPendingPHX(contractPhnxStake, web3context, setPendingPHX);
        await handleGetPoolPositionAction();
      })();
    }
  }, [
    web3context?.library?.currentProvider,
    web3context?.account,
    web3context?.active,
    contractUniswapPair,
    balancePhnx,
  ]);

  useEffect(() => {
    if (
      web3context?.account &&
      web3context?.active &&
      contractUniswapPair &&
      contractPhnxStake
    ) {
      handleGetUserInfo();
    }
  }, [poolPosition]);

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

  const _harvestPHNX = async () => {
    try {
      await harvestPHNX(
        web3context,
        contractPhnxStake,
        contractPhnxDao,
        handleGetPoolPositionAction,
        handleGetEthBalanceAction,
        handleGetPhnxBalanceAction,
        setLoading
      );
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=phoenixdao&vs_currencies=usd&include_market_cap=true&include_24hr_change=ture&include_last_updated_at=ture`
      );
      const data = await response.json();
      if (data) {
        setPhoenixDAO_market(data.phoenixdao);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const calculateAPR = async () => {
      const blockInAYear = 2102400;
      const phxPerBlock = await contractPhnxStake?.methods
        ?.phxPerBlock()
        ?.call();
      const lpTokenSupply = await contractPhnxStake?.methods
        ?.lpTokenSupply()
        ?.call();

      const apr =
        (blockInAYear * Web3.utils.fromWei(phxPerBlock)) /
        Web3.utils.fromWei(lpTokenSupply);

      let amount = 3.671; //will get from user onChange

      let rewardDebt = userInfo.rewardDebt;
      rewardDebt = Web3.utils.fromWei(rewardDebt.toString());

      const getReserves = await contractUniswapPair.methods
        .getReserves()
        .call();

      let _balance = new BigNumber(Web3.utils.toWei(amount.toString()));
      const _reserve0 = new BigNumber(getReserves._reserve0);
      const _reserve1 = new BigNumber(getReserves._reserve1);
      const _ratio = _reserve0.dividedBy(_reserve1);

      let _token0 = _balance.pow(2).dividedBy(_ratio).squareRoot();
      let _token1 = _balance.pow(2).dividedBy(_token0);
      const conv = new BigNumber("1e+18");

      _token0 = _token0.dividedBy(conv).toString(); //phnx
      // _token1 = _token1.dividedBy(conv);

      let reward = apr * amount - rewardDebt;
      let netProfit = reward - _token0;
      let roi = (netProfit / _token0) * 100;

      let usd = PhoenixDAO_market.usd;
      let dollarValue = roi * usd;

      console.log("dollarValue", dollarValue);

      console.log(
        "apr",
        apr,
        "amount",
        amount,
        "rewardDebt",
        rewardDebt,
        "netProfit",
        netProfit,
        "_token0",
        _token0,
        "roi",
        roi
      );

      setAPR(parseInt(apr));
    };

    if (contractPhnxStake?.methods && contractUniswapPair?.methods) {
      calculateAPR();
    }
  }, [contractPhnxStake, contractUniswapPair, web3context.active]);

  // Check if phnx earned is less than contract balance for staking
  // for unstake if phnx earned + unstaked token < contract balance of staking

  return (
    <div>
      <div className="farm-div">
        {!web3context.active || poolPosition == null ? (
          <FarmStake
            stakeModalOpen={handleStackOpen}
            allowance={allowance}
            giveApproval={handleGiveApprovalUniswapPair}
            userInfo={userInfo}
            reserveUSD={reserveUSD}
            loading={loading}
            APR={APR}
          />
        ) : poolPosition.lp == 0 ? (
          <FarmStake
            stakeModalOpen={handleStackOpen}
            allowance={allowance}
            giveApproval={handleGiveApprovalUniswapPair}
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
        <UnStakingModal Close={handleUnStackClose} userInfo={userInfo} />
      </Modal>
      <VersionSwitch />
    </div>
  );
}

export default Farm;
