import Web3 from "web3";
import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import { fixedWithoutRounding } from "../utils/formatters";
import { abi as UniswapV2Router02ABI } from "../contract/abi/UniswapV2Router02ABI.json";
import { abi as UniswapV2PairABI } from "../contract/abi/UniswapV2PairABI.json";
import { abi as PhoenixDaoABI } from "../contract/abi/PhoenixDaoABI.json";
import { abi as PhoenixStakeABI } from "../contract/abi/PHXStakeABI.json";
import {
  PHNX_RINKEBY_TOKEN_ADDRESS,
  CONTRACT_ADDRESS_UniswapV2Router02,
  URL_INFURA_RINKEBY,
  UNISWAP_V2_PHNX_ETH_PAIR_ADDRESS_RINKEBY,
} from "../contract/constant";
import { ChainId, WETH, Fetcher, Route } from "@uniswap/sdk";
import { PHNX_LP_STAKING_CONTRACT_ADDRESS_RINKEBY } from "../contract/constant";
import { toast } from "react-toastify";
import Notify from "../components/Notify";

const chainId = ChainId.RINKEBY;
const customHttpProvider = new ethers.providers.JsonRpcProvider(
  URL_INFURA_RINKEBY
);

export const getDataMain = async () => {
  // console.log("asdadasdaaaaaaaaaaa");
  const phnx = await Fetcher.fetchTokenData(
    chainId,
    PHNX_RINKEBY_TOKEN_ADDRESS,
    customHttpProvider
  );
  const weth = WETH[chainId];
  const pair = await Fetcher.fetchPairData(phnx, weth, customHttpProvider);
  const route = new Route([pair], weth);
  // console.log(pair.reserve1.toFixed(2), "pairrrrrrrgdfgdfgdfgr");
  return { weth, pair, route };
};

export const supply = async (
  phnxValue,
  ethValue,
  web3context,
  contractUniswapRouter,
  settransactionProcessModal,
  settransactionSubmittedModal,
  handleGetPoolPosition,
  handleGetEthBalance,
  handleGetPhnxBalance,
  settranHash,
  slippageValue
) => {
  const web3 = new Web3(web3context?.library?.currentProvider);

  let deadline = Date.now();
  deadline += 5 * 60;

  let phnxMin = phnxValue - phnxValue * (slippageValue / 100);
  let ethMin = ethValue - ethValue * (slippageValue / 100);

  await contractUniswapRouter.methods
    .addLiquidityETH(
      PHNX_RINKEBY_TOKEN_ADDRESS, // address token,
      web3.utils.toWei(phnxValue.toFixed(5).toString()), // uint amountTokenDesired,
      web3.utils.toWei(phnxMin.toFixed(5).toString()), //uint amountTokenMin,
      web3.utils.toWei(ethMin.toFixed(5).toString()), // uint amountETHMin
      web3context.account, //address to,
      deadline //deadline
    )
    .send({
      from: web3context.account,
      value: web3.utils.toWei(ethValue.toFixed(16).toString()),
      gas: 190809,
    })
    .on("transactionHash", (hash) => {
      // hash of tx

      // toast(
      //   <Notify
      //     text={"Transaction in Progress 😃, you'll be notified soon."}
      //     severity="success"
      //   />,
      //   {
      //     position: "bottom-right",
      //   }
      // );
      settranHash(hash);

      console.log("hash", hash);
    })
    .on("confirmation", async function (confirmationNumber, receipt) {
      if (confirmationNumber === 0) {
        // settransactionProcessModal(false);
        // settransactionSubmittedModal(true);
        toast(
          <Notify text={"Transaction Successful 🚀"} severity="success" />,
          {
            position: "bottom-right",
          }
        );

        await handleGetPoolPosition();
        await handleGetEthBalance();
        await handleGetPhnxBalance();

        settransactionProcessModal(false);
        settransactionSubmittedModal(true);

        console.log("confirmationNumber", confirmationNumber);
      }
    })
    .on("error", function (err) {
      toast(
        <Notify
          text={"Transaction Rejected 😔. Try again later."}
          severity="error"
        />,
        {
          position: "bottom-right",
        }
      );

      settransactionProcessModal(false);

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

  // console.log('balance:',_balance.toFixed(18).toString(),'poolPerc:',fixedWithoutRounding(_poolPercentage,18).toString(),'eth:',_token1.toString(),'phnx',_token0.toString());

  console.log(_balance.toString(), "lp1");

  // const web3 = new Web3(web3context?.library?.currentProvider);

  console.log(parseFloat(_balance, 18), "lp");
  console.log(fixedWithoutRounding(_balance, 20), "lp");

  // const value= await Web3.utils.fromWei(_balance.toString());
  //   console.log(value,"lpposition");

  return {
    lp: _balance.toString(), //.toFixed(2),
    poolPerc: fixedWithoutRounding(_poolPercentage, 18),
    eth: fixedWithoutRounding(_token1, 18),
    phnx: fixedWithoutRounding(_token0, 18),
  };
};

export const phnxDaoContractInit = async (web3context) => {
  const web3 = new Web3(web3context?.library?.currentProvider);
  const contract = new web3.eth.Contract(
    PhoenixDaoABI,
    PHNX_RINKEBY_TOKEN_ADDRESS
  );
  return contract;
};

export const phnxStakeContractInit = async (web3context) => {
  let contract;
  if (web3context.active) {
    const web3 = new Web3(web3context?.library?.currentProvider);
    contract = new web3.eth.Contract(
      PhoenixStakeABI,
      PHNX_LP_STAKING_CONTRACT_ADDRESS_RINKEBY
    );
  } else {
    const web3 = new Web3(URL_INFURA_RINKEBY);
    contract = new web3.eth.Contract(
      PhoenixStakeABI,
      PHNX_LP_STAKING_CONTRACT_ADDRESS_RINKEBY
    );
    console.log("phnxStakeContractInit service", contract);
  }
  return contract;
};

export const uniswapV2RouterInit = async (web3context) => {
  const web3 = new Web3(web3context?.library?.currentProvider);
  const contract = new web3.eth.Contract(
    UniswapV2Router02ABI,
    CONTRACT_ADDRESS_UniswapV2Router02
  );
  return contract;
};

export const uniswapV2PairInit = (web3context) => {
  const web3 = new Web3(web3context?.library?.currentProvider);
  const contract = new web3.eth.Contract(
    UniswapV2PairABI,
    UNISWAP_V2_PHNX_ETH_PAIR_ADDRESS_RINKEBY
  );
  return contract;
};

export const getEthBalance = async (web3context) => {
  const web3 = new Web3(web3context?.library?.currentProvider);
  let WeiEthBalance = await web3.eth.getBalance(web3context.account);
  // console.log(web3.utils.fromWei(WeiEthBalance, "ether"),'asdasdasd');
  let EthBalance = fixedWithoutRounding(
    web3.utils.fromWei(WeiEthBalance, "ether"),
    4
  );
  // console.log(EthBalance,'aaa')
  return EthBalance;
  // .toFixed(2);
};

export const getPhnxBalance = async (web3context, contractPhnxDao) => {
  if (web3context && contractPhnxDao) {
    let PhnxBalance = await contractPhnxDao.methods
      .balanceOf(web3context?.account)
      .call();

    // console.log("Service getPhnxBalance ==>>", PhnxBalance);
    return fixedWithoutRounding(Number(Web3.utils.fromWei(PhnxBalance)), 4);
    // .toFixed(2);
  } else {
    throw "Invalid arguments for getPhnxBalance";
  }
};

export const checkApprovalPhnxDao = async (
  web3context,
  contractPhnxDao,
  setApproveStatus
) => {
  let allowance1 = await contractPhnxDao.methods
    .allowance(web3context.account, CONTRACT_ADDRESS_UniswapV2Router02)
    .call();
  console.log("preworking", setApproveStatus);

  if (setApproveStatus) {
    console.log("working", setApproveStatus);
    setApproveStatus(false);
  }
  console.log("allowance checkApprovalPhnxDao", allowance1);
  return allowance1;
};

export const giveApprovalPhnxDao = async (
  web3context,
  contractPhnxDao,
  handleGetPoolPosition,
  handleGetEthBalance,
  handleGetPhnxBalance,
  handleCheckApprovalPhnxDaoAction,
  setApproveStatus
) => {
  console.log(setApproveStatus, "aaa1");
  if (!web3context.account) {
    alert("Connect your wallet");
    return;
  }

  const web3 = new Web3(web3context?.library?.currentProvider);

  //before add liquidity
  await contractPhnxDao.methods
    .approve(
      CONTRACT_ADDRESS_UniswapV2Router02,
      web3.utils.toWei("10000000000")
    )
    .send({ from: web3context.account })
    .on("transactionHash", (hash) => {
      // hash of tx
      console.log("tx hash", hash);
    })
    .on("confirmation", async function (confirmationNumber, receipt) {
      if (confirmationNumber === 0) {
        // tx confirmed

        // checkApprovalPhnxDao(web3context, contractPhnxDao);
        // ToastMsg("success", "Approved successfully!");
        await handleGetPoolPosition();
        await handleGetEthBalance();
        await handleGetPhnxBalance();
        await handleCheckApprovalPhnxDaoAction(setApproveStatus);
      }
    })
    .on("error", function (err) {
      console.error(err);
      setApproveStatus(false);
    });
};

export const checkApprovalUniswapPair = async (
  web3context,
  contractUniswapPair,
  setAllowance,
  setApproveStatus
) => {
  if (contractUniswapPair) {
    // console.log("contractUniswapPair", contractUniswapPair);
    let allowance1 = await contractUniswapPair.methods
      .allowance(web3context.account, CONTRACT_ADDRESS_UniswapV2Router02)
      .call();
    console.log("allowance11", allowance1);

    setAllowance(allowance1);

    if (setApproveStatus) {
      setApproveStatus(false);
    }

    return allowance1;
  } else {
    if (setApproveStatus) {
      setApproveStatus(false);
    }
    throw "contractUniswapPair not initialized!";
  }
};

//give approval before remove liquidity
export const giveApprovalUniswapPair = async (
  web3context,
  contractUniswapPair,
  handleGetPoolPosition,
  handleGetEthBalance,
  handleGetPhnxBalance,
  handleCheckApprovalUniswapPairAction,
  setAllowance,
  setApproveStatus
) => {
  if (contractUniswapPair && web3context) {
    await contractUniswapPair.methods
      .approve(
        CONTRACT_ADDRESS_UniswapV2Router02,
        Web3.utils.toWei("1000000000000000000000000000000000000000000000000000")
      )
      .send({ from: web3context.account })
      .on("transactionHash", (hash) => {
        // hash of tx
        console.log("tx hash", hash);
      })
      .on("confirmation", async function (confirmationNumber, receipt) {
        if (confirmationNumber === 0) {
          await handleCheckApprovalUniswapPairAction(
            setAllowance,
            setApproveStatus
          );
          // tx confirmed
          // await checkApprovalUniswapPair(
          //   web3context,
          //   contractUniswapPair,
          //   setAllowance
          // );
          await handleGetPoolPosition();
          await handleGetEthBalance();
          await handleGetPhnxBalance();
          // setApproveStatus(false);
        }
      })
      .on("error", function (err) {
        console.error(err);
        setApproveStatus(false);
      });
  } else {
    throw "contractUniswapPair not initialized! @giveApprovalUniswapPair";
    return;
  }
};

export const removeLiquidity = async (
  web3context,
  contractUniswapRouter,
  poolPosition,
  selectedPercentage,
  settransactionProcessModal,
  settransactionConfirmModal,
  settransactionSubmittedModal,
  handleGetPoolPosition,
  handleGetEthBalance,
  handleGetPhnxBalance,
  slippageValue,
  settranHash,
  handleMainClose
) => {
  if (web3context && contractUniswapRouter && poolPosition) {
    let deadline = Date.now();
    deadline += 20 * 60;

    console.log(poolPosition.lp, "dgf");

    let phnxMin;
    let ethMin;
    let finalPoolPosition;
    console.log("Slippage at remove=> ", slippageValue);

    if (selectedPercentage == 100) {
      phnxMin = fixedWithoutRounding(
        (poolPosition.phnx - poolPosition.phnx * (slippageValue / 100)).toFixed(
          19
        ),
        18
      ).toFixed(18);
      ethMin = fixedWithoutRounding(
        (poolPosition.eth - poolPosition.eth * (slippageValue / 100)).toFixed(
          19
        ),
        18
      ).toFixed(18);

      // finalPoolPosition = fixedWithoutRounding(poolPosition.lp.toFixed(19),19).toFixed(18).toString();
      finalPoolPosition = poolPosition.lp;
    } else {
      let ethValue = fixedWithoutRounding(
        poolPosition.eth * (selectedPercentage / 100),
        18
      ).toString();
      let phnxValue = fixedWithoutRounding(
        poolPosition.phnx * (selectedPercentage / 100),
        18
      ).toString();

      phnxMin = fixedWithoutRounding(
        (phnxValue - phnxValue * (slippageValue / 100)).toFixed(19),
        18
      ).toFixed(18);
      ethMin = fixedWithoutRounding(
        (ethValue - ethValue * (slippageValue / 100)).toFixed(19),
        18
      ).toFixed(18);

      // finalPoolPosition = fixedWithoutRounding((poolPosition.lp * (selectedPercentage / 100)).toFixed(19),19).toFixed(18).toString();
      finalPoolPosition = (
        fixedWithoutRounding(poolPosition.lp, 18) *
        (selectedPercentage / 100)
      ).toString();

      finalPoolPosition = finalPoolPosition.slice(
        0,
        finalPoolPosition.indexOf(".") + 18
      );
    }

    // finalPoolPosition =BigNumber(finalPoolPosition);
    console.log("hiASasASa");
    console.log(finalPoolPosition, "Hiiiii ==>");

    await contractUniswapRouter.methods
      .removeLiquidityETH(
        PHNX_RINKEBY_TOKEN_ADDRESS, // address token,
        Web3.utils.toWei(finalPoolPosition, "ether"), //LP token
        Web3.utils.toWei(phnxMin.toString()), //uint amountTokenMin,
        Web3.utils.toWei(ethMin.toString()), // uint amountETHMin
        web3context.account, //address to,
        deadline //deadline
      )
      .send({
        from: web3context.account,
      })
      .on("transactionHash", (hash) => {
        // hash of tx

        // toast(
        //   <Notify
        //     text={"Transaction in Progress 😃, you'll be notified soon."}
        //     severity="success"
        //   />,
        //   {
        //     position: "bottom-right",
        //   }
        // );
        settranHash(hash);
        settransactionConfirmModal(false);

        console.log("hash", hash);
      })
      .on("confirmation", async function (confirmationNumber, receipt) {
        if (confirmationNumber === 0) {
          toast(
            <Notify text={"Transaction Successful 🚀"} severity="success" />,
            {
              position: "bottom-right",
            }
          );

          console.log("confirmationNumber", confirmationNumber);

          await handleGetPoolPosition();
          await handleGetEthBalance();
          await handleGetPhnxBalance();
          settransactionProcessModal(false);
          settransactionSubmittedModal(true);
          // handleMainClose(false);

          if (web3context.active && web3context.account) {
            // getPoolPosition();
          }
        }
      })
      .on("error", function (err) {
        settransactionProcessModal(false);
        handleMainClose(false);

        toast(
          <Notify
            text={"Transaction Rejected 😔. Try again later."}
            severity="error"
          />,
          {
            position: "bottom-right",
          }
        );

        throw err;
      });
  } else {
    throw "undefined arguments!";
  }
};

export const calculateLpToken = async (
  contractUniswapPair,
  amount0,
  amount1,
  setphnxethburn
) => {
  if (!contractUniswapPair || !amount0 || !amount1) {
    return;
  }
  console.log("1");

  const getReserves = await contractUniswapPair.methods.getReserves().call();
  const _totalSupply = await contractUniswapPair.methods.totalSupply().call();
  console.log("12");

  const _reserve0 = getReserves._reserve0;
  const _reserve1 = getReserves._reserve1;
  console.log("123");

  console.log(
    fixedWithoutRounding(amount1.toFixed(20), 18).toFixed(20).toString(),
    "amount1"
  );
  console.log("1234");

  amount0 = Web3.utils.toWei(
    fixedWithoutRounding(parseFloat(amount0).toFixed(19), 18).toString()
  );
  amount1 = Web3.utils.toWei(
    fixedWithoutRounding(amount1.toFixed(20), 18).toFixed(18).toString()
  );

  const liquidity = Math.min(
    (amount0 * _totalSupply) / _reserve0,
    (amount1 * _totalSupply) / _reserve1
  );
  console.log(liquidity, "1234");
  console.log(setphnxethburn, "aaa");
  console.log(fixedWithoutRounding(liquidity, 18).toString(), "ether");
  setphnxethburn(
    Web3.utils.fromWei(fixedWithoutRounding(liquidity, 18).toString(), "ether")
  );
};
