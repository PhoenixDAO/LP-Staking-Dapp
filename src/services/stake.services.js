import Web3 from "web3";
import BigNumber from "bignumber.js";
import { Contract, ethers } from "ethers";
import { ToastMsg } from "../components/Toast";
import { abi as UniswapV2Router02ABI } from "../contract/abi/UniswapV2Router02ABI.json";
import { abi as UniswapV2PairABI } from "../contract/abi/UniswapV2PairABI.json";
import { abi as PhoenixDaoABI } from "../contract/abi/PhoenixDaoABI.json";
import { abi as PhoenixStakeABI } from "../contract/abi/PHXStakeABI.json";
import {
  PHNX_LP_STAKING_CONTRACT_ADDRESS_RINKEBY,
  UNISWAP_V2_PHNX_ETH_PAIR_ADDRESS_RINKEBY,
} from "../contract/constant";

export const giveApprovalFarming = async (web3context, contractUniswapPair) => {
  const web3 = new Web3(web3context?.library?.currentProvider);
  //   const pairContract = new web3.eth.Contract(
  //     UniswapV2PairABI,
  //     UNISWAP_V2_PHNX_ETH_PAIR_ADDRESS_RINKEBY
  //   );

  await contractUniswapPair.methods
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

export const harvestPHNX = async (web3context, contractPhnxStake) => {
  const web3 = new Web3(web3context?.library?.currentProvider);
  //   const Contract = new web3.eth.Contract(
  //     PhnxStakeAbi,
  //     PHNX_LP_STAKING_CONTRACT_ADDRESS_RINKEBY
  //   );

  contractPhnxStake.methods
    .deposit(web3.utils.toWei("0"))
    .send({ from: web3context.account })
    .on("transactionHash", (hash) => {
      // hash of tx
      console.log("tx hash", hash);
    })
    .on("confirmation", function (confirmationNumber, receipt) {
      if (confirmationNumber === 2) {
        // tx confirmed
        // checkApproval(web3context, contractPhnx);
        alert("success", "tx successfull!");
      }
    })
    .on("error", function (err) {
      console.error(err);
    });
};

export const checkApproval = async (
  contractUniswapPair,
  web3context,
  setAllowance
) => {
  const al = await contractUniswapPair.methods
    .allowance(web3context?.account, PHNX_LP_STAKING_CONTRACT_ADDRESS_RINKEBY)
    .call();
  console.log("al", al);
  setAllowance(al);
};

export const getUserInfo = async (
  contractPhnxStake,
  web3context,
  setUserInfo
) => {
  const info = await contractPhnxStake.methods
    .userInfo(web3context?.account)
    .call();
  console.log("info", info);
  setUserInfo(info);
};

export const getPendingPHX = async (
  contractPhnxStake,
  web3context,
  setPendingPHX
) => {
  const pending = await contractPhnxStake.methods
    .pendingPHX(web3context?.account)
    .call();
  console.log("pending", pending);
  setPendingPHX(pending);
};
