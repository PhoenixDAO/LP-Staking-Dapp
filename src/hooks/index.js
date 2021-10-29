import React, { useState, useEffect } from "react";
import Web3 from "web3";
import BigNumber from "bignumber.js";
import { ethers } from "ethers";
// import { ToastMsg } from "../components/Toast";
import { abi as UniswapV2Router02ABI } from "../contract/abi/UniswapV2Router02ABI.json";
import { abi as UniswapV2PairABI } from "../contract/abi/UniswapV2PairABI.json";
import { abi as PhoenixDaoABI } from "../contract/abi/PhoenixDaoABI.json";
import {
  PHNX_RINKEBY_TOKEN_ADDRESS,
  URL_INFURA_RINKEBY,
} from "../contract/constant";
import {
  ChainId,
  //   Token,
  WETH,
  Fetcher,
  Route,
  //   Trade,
  //   TokenAmount,
  //   TradeType,
  //   FACTORY_ADDRESS,
  //   INIT_CODE_HASH,
  //   Pair,
  //   CurrencyAmount,
  //   Currency,
} from "@uniswap/sdk";
import { useWeb3React } from "@web3-react/core";

const chainId = ChainId.RINKEBY;
const customHttpProvider = new ethers.providers.JsonRpcProvider(
  URL_INFURA_RINKEBY
);

const initialState = {
  account: "",
  contract: null,
  web3: null,
  phoenixDaoContract: null,
  uniswapV2PairContract: null,
  uniswapV2Router02Contract: null,
  count: 0,
};

export const usePoolControl = () => {
  const web3context = useWeb3React();
  const [values, setValues] = useState(initialState);

  useEffect(() => {
    const init = async () => {
      // console.log("init");
      const web3 = new Web3(web3context?.library?.currentProvider);
      const contract = new web3.eth.Contract(
        PhoenixDaoABI,
        PHNX_RINKEBY_TOKEN_ADDRESS
      );
      setValues({
        ...values,
        web3,
        phoenixDaoContract: contract,
        count: Math.random(),
      });
    };

    init();
    getDataMain();
  }, [web3context]);

  // console.log("values", values);

  const getDataMain = async () => {
    const phnx = await Fetcher.fetchTokenData(
      chainId,
      PHNX_RINKEBY_TOKEN_ADDRESS,
      customHttpProvider
    );
    const weth = WETH[chainId];
    const pair = await Fetcher.fetchPairData(phnx, weth, customHttpProvider);
    const route = new Route([pair], weth);
    // console.log(weth, pair, route);

    return { weth, pair, route };
  };

  return {
    values,
    getDataMain,
  };
};
