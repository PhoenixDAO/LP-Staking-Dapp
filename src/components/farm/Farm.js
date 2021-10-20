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
import {
  phnxStakeContractInit,
  giveApprovalUniswapPair,
} from "../../services/pool.services";
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
  // const [allowance, setAllowance] = useState(0);
  const [userInfo, setUserInfo] = useState({ amount: 0, rewardDebt: 0 });
  const [pendingPHX, setPendingPHX] = useState({ 0: 0, 1: 0 });
  const [reserveUSD, setReserveUSD] = useState(0);
  const [loading, setLoading] = useState(false);
  const [APR, setAPR] = useState(0);
  const [PhoenixDAO_market, setPhoenixDAO_market] = useState(null);

  const [Roi, setRoi] = useState(0);

  const [TokenSupply, setTokenSupply] = useState(0);

  const allowance = useSelector(
    (state) => state.contractReducer.allowancePhnxStaking
  );

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
  const handleCheckApprovalPhnxStakingAction = (setApproveStatus) => {
    console.log("handleCheckApprovalPhnxStakingAction iiii");
    dispatch(
      CheckApprovalPhnxStakingAction(
        web3context,
        contractUniswapPair,
        setApproveStatus
      )
    );
  };

  useEffect(() => {
    if (contractUniswapPair && web3context.active) {
      handleCheckApprovalPhnxStakingAction();
    }
  }, [contractUniswapPair, web3context.active]);

  // This f() to be called on give approval button

  // have to put on a button handleGiveApprovalPhnxStakingAction
  const handleGiveApprovalPhnxStakingAction = async (setApproveStatus) => {
    try {
      await giveApprovalPhnxStaking(
        web3context,
        contractUniswapPair,
        handleGetPoolPositionAction,
        handleGetEthBalanceAction,
        handleGetPhnxBalanceAction,
        handleCheckApprovalPhnxStakingAction,
        setApproveStatus
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
  }, [poolPosition, balancePhnx]);

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
            console.log(response.data, "aaa");
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

  const calculateAPR = async (amt, f) => {
    if ((amt.toFixed(4) == 0 || amt == "") && f) {
      setRoi(0);
      return;
    }

    const blockInAYear = 2102400;
    const phxPerBlock = await contractPhnxStake?.methods?.phxPerBlock()?.call();
    const lpTokenSupply = await contractPhnxStake?.methods
      ?.lpTokenSupply()
      ?.call();

    const apr =
      (blockInAYear * Web3.utils.fromWei(phxPerBlock)) /
      Web3.utils.fromWei(lpTokenSupply);

    console.log(apr, "apr.");

    let amount = amt; //will get from user onChange
    console.log(amount, "amount1111");

    let rewardDebt = userInfo.rewardDebt;
    rewardDebt = Number(Web3.utils.fromWei(rewardDebt.toString()));
    console.log(rewardDebt, "rewardDebt1111");

    const getReserves = await contractUniswapPair.methods.getReserves().call();
    console.log(getReserves, "getReserves getReserves");

    let _balance =
      Number(Web3.utils.toWei(amount.toFixed(4).toString())) +
      Number(userInfo.amount);
    console.log(
      "_balance _balance",
      Number(Web3.utils.toWei(amount.toFixed(4).toString())),
      "userInfo.amount userInfo.amount",
      Number(userInfo.amount)
    );
    console.log(_balance, "_balance 111111111");

    _balance = new BigNumber(_balance);
    console.log(_balance, "_balance 222222222");

    const _reserve0 = new BigNumber(getReserves._reserve0);
    const _reserve1 = new BigNumber(getReserves._reserve1);
    const _ratio = _reserve0.dividedBy(_reserve1);

    let _token0 = _balance.pow(2).dividedBy(_ratio).squareRoot();
    let _token1 = _balance.pow(2).dividedBy(_token0);
    const conv = new BigNumber("1e+18");

    _token0 = _token0.dividedBy(conv).toString(); //phnx

    let reward = apr * amount - rewardDebt;

    let netProfit = Number(reward - _token0);
    console.log(netProfit, "netprofit");
    let roi = Number((netProfit / _token0) * 100);
    console.log(roi, "roi");

    // let usd = PhoenixDAO_market ? PhoenixDAO_market.usd : 0;

    let usd = PhoenixDAO_market.usd;

    console.log(usd, "usd");
    console.log(roi, "roi");

    let dollarValue = Number(roi * usd);

    console.log("dollarValue", dollarValue);

    if (f) {
      setRoi(parseInt(dollarValue));
    }
    console.log(apr, "123");
    setAPR(parseInt(apr));
  };

  useEffect(() => {
    if (
      poolPosition &&
      contractPhnxStake?.methods &&
      contractUniswapPair?.methods &&
      PhoenixDAO_market
    ) {
      calculateAPR(poolPosition.lp, false);
    }

    console.log(userInfo.amount, "111");
  }, [poolPosition, contractPhnxStake, contractUniswapPair, PhoenixDAO_market]);

  useEffect(() => {
    if (contractUniswapPair) {
      GetTokenSupply();
    }
  }, [contractUniswapPair]);

  const GetTokenSupply = async () => {
    let ts = await contractUniswapPair.methods.totalSupply().call();
    setTokenSupply(Web3.utils.fromWei(ts));
    console.log(TokenSupply, "aaa");
  };

  // useEffect(() => {

  //   if (contractPhnxStake?.methods && contractUniswapPair?.methods) {
  //     calculateAPR();
  //   }
  // }, [contractPhnxStake, contractUniswapPair, web3context.active]);

  // Check if phnx earned is less than contract balance for staking
  // for unstake if phnx earned + unstaked token < contract balance of staking

  return (
    <div>
      <div
        className="farm-div"
        style={{ boxShadow: "0px 10px 80px 10px rgb(0, 0, 0, 0.06)" }}
      >
        {!web3context.active || poolPosition == null || userInfo == null ? (
          <FarmStake
            stakeModalOpen={handleStackOpen}
            allowance={allowance}
            giveApproval={handleGiveApprovalPhnxStakingAction}
            userInfo={userInfo}
            reserveUSD={reserveUSD}
            loading={loading}
            APR={APR}
          />
        ) : userInfo.amount == 0 ? (
          <FarmStake
            stakeModalOpen={handleStackOpen}
            allowance={allowance}
            giveApproval={handleGiveApprovalPhnxStakingAction}
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
            UsdRate={PhoenixDAO_market ? PhoenixDAO_market.usd : 0}
            TokenSupply={TokenSupply}
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
        <StakingModal
          Close={handleStackClose}
          calculateAPR={calculateAPR}
          Roi={Roi}
        />
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
