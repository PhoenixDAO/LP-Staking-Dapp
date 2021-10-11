import Web3 from "web3";
import BigNumber from "bignumber.js";
import { Contract, ethers } from "ethers";
import { ToastMsg } from "../components/Toast";
import { abi as UniswapV2Router02ABI } from "../contract/abi/UniswapV2Router02ABI.json";
import { abi as UniswapV2PairABI } from "../contract/abi/UniswapV2PairABI.json";
import { abi as PhoenixDaoABI } from "../contract/abi/PhoenixDaoABI.json";
import { abi as PhoenixStakeABI } from "../contract/abi/PHXStakeABI.json";
import {
  PHNX_RINKEBY_TOKEN_ADDRESS,
  UNISWAP_CONTRACT_ADDRESS_RINEBY,
  //   urlInfuraMainnet,
  urlInfuraRinkeby,
  //   tokenAddressMainnet,
  tokenAddressRinkeby,
} from "../contract/constants";
import {
  ChainId,
  //   Token,
  WETH,
  Fetcher,
  Route,
} from "@uniswap/sdk";
import { PHNX_LP_STAKING_CONTRACT_ADDRESS_RINKEBY } from "../contract/constant";

const chainId = ChainId.RINKEBY;
const customHttpProvider = new ethers.providers.JsonRpcProvider(
  urlInfuraRinkeby
);

export const getDataMain = async () => {
  const phnx = await Fetcher.fetchTokenData(
    chainId,
    tokenAddressRinkeby,
    customHttpProvider
  );
  const weth = WETH[chainId];
  const pair = await Fetcher.fetchPairData(phnx, weth, customHttpProvider);
  const route = new Route([pair], weth);
  return { weth, pair, route };
};

export const supply = async (
  phnxValue,
  ethValue,
  web3context,
  contractUniswapRouter
) => {
  const web3 = new Web3(web3context?.library?.currentProvider);

  let deadline = Date.now();
  deadline += 5 * 60;

  let phnxMin = phnxValue - phnxValue * 0.1;
  let ethMin = ethValue - ethValue * 0.1;

  await contractUniswapRouter.methods
    .addLiquidityETH(
      PHNX_RINKEBY_TOKEN_ADDRESS, // address token,
      web3.utils.toWei(phnxValue.toString()), // uint amountTokenDesired,
      web3.utils.toWei(phnxMin.toString()), //uint amountTokenMin,
      web3.utils.toWei(ethMin.toString()), // uint amountETHMin
      web3context.account, //address to,
      deadline //deadline
    )
    .send({
      from: web3context.account,
      value: web3.utils.toWei(ethValue.toString()),
      gas: 190809,
    })
    .on("transactionHash", (hash) => {
      // hash of tx
      console.log("hash", hash);
    })
    .on("confirmation", function (confirmationNumber, receipt) {
      if (confirmationNumber === 2) {
        console.log("confirmationNumber", confirmationNumber);
        //   setLoading(false);
        //   setPhnxValue("");
        //   setEthValue("");
        //   setPoolShare(0);
        if (web3context.active && web3context.account) {
          getPoolPosition();
        }
      }
    })
    .on("error", function (err) {
      console.log("error", err);
      // setLoading(false);
    });
};

export const getPoolPosition = async (web3context, contractUniswapPair) => {
  const balanceOf = await contractUniswapPair.methods
    .balanceOf(web3context.account)
    .call();
  const getReserves = await contractUniswapPair.methods.getReserves().call();
  const totalSupply = await contractUniswapPair.methods.totalSupply().call();

  let _balance = new BigNumber(balanceOf);
  let _totalSupply = new BigNumber(totalSupply);
  const _reserve0 = new BigNumber(getReserves._reserve0);
  const _reserve1 = new BigNumber(getReserves._reserve1);
  const _ratio = _reserve0.dividedBy(_reserve1);

  let _poolPercentage = _balance.dividedBy(_totalSupply).multipliedBy(100);

  let _token0 = _balance.pow(2).dividedBy(_ratio).squareRoot();
  let _token1 = _balance.pow(2).dividedBy(_token0);

  const conv = new BigNumber("1e+18");

  _balance = _balance.dividedBy(conv);
  _token0 = _token0.dividedBy(conv);
  _token1 = _token1.dividedBy(conv);

  return {
    lp: _balance.toFixed(2),
    poolPerc: _poolPercentage.toFormat(6),
    eth: _token1.toFormat(6),
    phnx: _token0.toFormat(6),
  };
};

export const phnxDaoContractInit = (web3context) => {
  const web3 = new Web3(web3context?.library?.currentProvider);
  const contract = new web3.eth.Contract(
    PhoenixDaoABI,
    PHNX_RINKEBY_TOKEN_ADDRESS
  );
  console.log("phnxDaoContractInit service", contract);
  return contract;
};

export const phnxStakeContractInit = (web3context) => {
  const web3 = new Web3(web3context?.library?.currentProvider);
  const contract = new web3.eth.Contract(
    PhoenixStakeABI,
    PHNX_LP_STAKING_CONTRACT_ADDRESS_RINKEBY
  );
  console.log("phnxStakeContractInit service", contract);
  return contract;
};

export const uniswapV2RouterInit = async (web3context) => {
  const web3 = new Web3(web3context?.library?.currentProvider);
  const contract = new web3.eth.Contract(
    UniswapV2Router02ABI,
    UNISWAP_CONTRACT_ADDRESS_RINEBY
  );
  return contract;
};

export const uniswapV2PairInit = (web3context) => {
  const web3 = new Web3(web3context?.library?.currentProvider);
  const contract = new web3.eth.Contract(
    UniswapV2PairABI,
    "0xff8ae8805552c813d75ad6ff456dbc417bd12be6"
  );
  return contract;
};

export const getEthBalance = async (web3context) => {
  const web3 = new Web3(web3context?.library?.currentProvider);
  console.log(web3context, " getEthBalace Web3Context");
  let WeiEthBalance = await web3.eth.getBalance(web3context.account);
  let EthBalance = parseFloat(web3.utils.fromWei(WeiEthBalance, "ether"));
  console.log("EthBalance ==>", EthBalance);
  return EthBalance;
};

export const getPhnxBalance = async (web3context, contractPhnxDao) => {
  console.log("contractPhnx getPhnxBalance", contractPhnxDao);
  const web3 = new Web3(web3context?.library?.currentProvider);
  contractPhnxDao.methods
    .balanceOf(web3context.account)
    .call()
    .then((phnx) => {
      let PhnxBalance = parseFloat(web3.utils.fromWei(phnx, "ether"));
      console.log("balance phnx :" + PhnxBalance);
      return PhnxBalance;
    });
};

export const checkApproval = async (web3context, contractPhnxDao) => {
  let allowance1 = await contractPhnxDao.methods
    .allowance(web3context.account, UNISWAP_CONTRACT_ADDRESS_RINEBY)
    .call();
  console.log("allowance", allowance1);
  return allowance1;
};

export const giveApproval = async (web3context, contractPhnxDao) => {
  if (!web3context.account) {
    alert("Connect your wallet");
    return;
  }
  const web3 = new Web3(web3context?.library?.currentProvider);

  await contractPhnxDao.methods
    .approve(UNISWAP_CONTRACT_ADDRESS_RINEBY, web3.utils.toWei("10000000000"))
    .send({ from: web3context.account })
    .on("transactionHash", (hash) => {
      // hash of tx
      console.log("tx hash", hash);
    })
    .on("confirmation", function (confirmationNumber, receipt) {
      if (confirmationNumber === 2) {
        // tx confirmed
        checkApproval(web3context, contractPhnxDao);
        ToastMsg("success", "Approved successfully!");
      }
    })
    .on("error", function (err) {
      console.error(err);
    });
};
