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
  // getUserInfo,
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
import Web3 from "web3";
import BigNumber from "bignumber.js";
import { UNISWAP_V2_PHNX_ETH_PAIR_ADDRESS_MAINNET } from "../../contract/constant";

function Farm() {
  const dispatch = useDispatch();
  const web3context = useWeb3React();
  let [refreshCount, setRefreshCount] = useState(0);

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
  const userInfo = useSelector((state) => state.localReducer.userInfo);

  const [isStackVisible, setStackVisible] = useState(false);
  const [isUnStackVisible, setUnStackVisible] = useState(false);
  // const [allowance, setAllowance] = useState(0);
  const [pendingPHX, setPendingPHX] = useState(0);
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
  // const handleGetUserInfo = async () => {
  //   getUserInfo(contractPhnxStake, web3context, setUserInfo);
  // };
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
    // console.log("coming to handleCheckApprovalUniswapPairAction");
    dispatch(CheckApprovalUniswapPairAction(web3context, contractUniswapPair));
  };
  const handleCheckApprovalPhnxStakingAction = (setApproveStatus) => {
    // console.log("handleCheckApprovalPhnxStakingAction iiii");
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
        // await handleGetUserInfo();
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
    let fun = async (web3context) => {
      // console.log("contractPhnxStake==>", contractPhnxStake);

      if (contractPhnxStake) {
        await getPendingPHX(contractPhnxStake, web3context, setPendingPHX);
      } else {
        // console.log("web3", web3context);
        if (web3context.active) {
          dispatch(PhnxStakeContractInitAction(web3context));
        }
      }
    };
    fun(web3context);
  }, [refreshCount]);

  useEffect(() => {
    setInterval(() => {
      setRefreshCount(refreshCount++);
      // console.log(refreshCount);
    }, 5000);
  }, []);

  useEffect(() => {
    const getTotalLiquidity = async () => {
      await axios({
        url: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
        method: "post",
        data: {
          query: `
          {
            pairs(where:{id:"${UNISWAP_V2_PHNX_ETH_PAIR_ADDRESS_MAINNET}"}){
              reserveUSD
            }
          }
          `,
        },
      })
        .then((response) => {
          if (response.data) {
            // console.log(response.data, "aaa");
            setReserveUSD(parseInt(response.data.data.pairs[0]["reserveUSD"]));
          }
        })
        .catch((err) => {
          // console.error(err)
        });
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
      // console.error(e);
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

  const calculateROI = async (amount) => {
    try {
      if (amount.toFixed(16) == 0) {
        setRoi(0);
        return;
      }

      const blockInAYear = 2102400;
      const phxPerBlock = await contractPhnxStake?.methods
        ?.phxPerBlock()
        ?.call();
      const lpTokenSupplyStaking = await contractPhnxStake?.methods
        ?.lpTokenSupply()
        ?.call();

      const lpTokenSupply = await contractUniswapPair.methods
        .totalSupply()
        .call();

      let apr;
      if (lpTokenSupplyStaking == 0) {
        apr = 200;
      } else {
        apr =
          (blockInAYear * Web3.utils.fromWei(phxPerBlock)) /
          Web3.utils.fromWei(lpTokenSupplyStaking);
      }

      let rewardDebt = userInfo.rewardDebt;
      rewardDebt = Number(Web3.utils.fromWei(rewardDebt.toString()));

      const getReserves = await contractUniswapPair.methods
        .getReserves()
        .call();

      let _balance = Number(Web3.utils.toWei(amount.toFixed(4).toString()));

      _balance = new BigNumber(_balance);
      // console.log(_balance, "_balance 222222222");

      const _reserve0 = new BigNumber(getReserves._reserve0);
      const _reserve1 = new BigNumber(getReserves._reserve1);

      const _ratio = _reserve0.dividedBy(_reserve1);

      // let _token0 = _balance.pow(2).dividedBy(_ratio).squareRoot(); //this

      // let _token1 = _balance.pow(2).dividedBy(_token0);

      let _token0 = (_balance * _reserve1) / lpTokenSupply;
      let _token1 = (_balance * _reserve0) / lpTokenSupply;

      const conv = new BigNumber("1e+18");

      // console.log("staking", _token1, apr);

      // _token0 = _token0.dividedBy(conv).toString();
      _token1 = _token1 * 0.000000000000000001; //phnx this

      // console.log("staking", _token1, apr);

      let usd = PhoenixDAO_market.usd;

      let roi = _token1 * apr * usd;
      // console.log("staking", roi);

      // console.log("a", roi);
      // let reward = Number(apr) * Number(amount) - Number(rewardDebt); // Phnx rewrd in a year

      // let netProfit = Number(Number(reward) - Number(_token0));
      // let roi = Number(netProfit / _token0);

      // let usd = PhoenixDAO_market.usd;

      // let dollarValue = Number(Number(roi) * Number(usd));

      setRoi(parseFloat(roi).toFixed(3));
    } catch (e) {}
  };

  const calculateAPR = async () => {
    try {
      const blockInAYear = 2102400;
      const phxPerBlock = await contractPhnxStake?.methods
        ?.phxPerBlock()
        ?.call();

      const lpTokenSupply = await contractPhnxStake?.methods
        ?.lpTokenSupply()
        ?.call();

      if (lpTokenSupply == 0) {
        setAPR(200);
        return;
      }

      // console.log("phnxaaa", phxPerBlock);

      // console.log("phnxaaa", lpTokenSupply);

      const apr =
        (blockInAYear * Web3.utils.fromWei(phxPerBlock)) /
        Web3.utils.fromWei(lpTokenSupply);

      setAPR(parseInt(apr));
    } catch (e) {}
  };

  useEffect(() => {
    if (
      poolPosition &&
      contractPhnxStake?.methods &&
      contractUniswapPair?.methods &&
      PhoenixDAO_market
    ) {
      calculateAPR();
    }

    // console.log(userInfo.amount, "111");
  }, [poolPosition, contractPhnxStake, contractUniswapPair, PhoenixDAO_market]);

  useEffect(() => {
    if (contractUniswapPair) {
      GetTokenSupply();
    }
  }, [contractUniswapPair]);

  const GetTokenSupply = async () => {
    let ts = await contractUniswapPair.methods.totalSupply().call();
    setTokenSupply(Web3.utils.fromWei(ts));
    // console.log(TokenSupply, "aaa");
  };

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
          calculateAPR={calculateROI}
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
    </div>
  );
}

export default Farm;
