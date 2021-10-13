import Web3 from "web3";
import { toast } from "react-toastify";
import Notify from "../components/Notify";

import {
  PHNX_LP_STAKING_CONTRACT_ADDRESS_RINKEBY,
  UNISWAP_V2_PHNX_ETH_PAIR_ADDRESS_RINKEBY,
} from "../contract/constant";

export const giveApprovalFarming = async (
  web3context,
  contractUniswapPair,
  handleGetPoolPosition,
  handleGetEthBalance,
  handleGetPhnxBalance
) => {
  //   const web3 = new Web3(web3context?.library?.currentProvider);
  if (web3context && contractUniswapPair) {
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
      .on("confirmation", async function (confirmationNumber, receipt) {
        if (confirmationNumber === 2) {
          // tx confirmed
          console.log("confirmationNumber", confirmationNumber);
        }
        await handleGetPoolPosition;
        await handleGetEthBalance;
        await handleGetPhnxBalance;
      })
      .on("error", function (err) {
        console.log("err", err);
      });
  } else {
    throw "Invalid credentials of giveApprovalFarming";
  }
};

export const harvestPHNX = async (
  web3context,
  contractPhnxStake,
  handleGetPoolPosition,
  handleGetEthBalance,
  handleGetPhnxBalance,
  setLoading
) => {
  if (web3context && contractPhnxStake) {
    setLoading(true);
    const web3 = new Web3(web3context?.library?.currentProvider);
    await contractPhnxStake.methods
      .deposit(web3.utils.toWei("0"))
      .send({ from: web3context.account })
      .on("transactionHash", (hash) => {
        // hash of tx
        console.log("tx hash", hash);
        toast(
          <Notify
            text={"Transaction in Progress 😃, you'll be notified soon."}
            severity="success"
          />,
          {
            position: "bottom-right",
          }
        );
      })
      .on("confirmation", async function (confirmationNumber, receipt) {
        if (confirmationNumber === 1) {
          // tx confirmed
          setLoading(false);
          toast(
            <Notify text={"Transaction Successful 🚀"} severity="success" />,
            {
              position: "bottom-right",
            }
          );
        }
        await handleGetPoolPosition;
        await handleGetEthBalance;
        await handleGetPhnxBalance;
      })
      .on("error", function (err) {
        // throw err;
        setLoading(false);
        toast(
          <Notify
            text={"Transaction Rejected 😔. Try again later."}
            severity="error"
          />,
          {
            position: "bottom-right",
          }
        );
      });
  } else {
    throw "Invalid credentials of harvestPHNX";
  }
};

export const checkApproval = async (
  contractUniswapPair,
  web3context,
  setAllowance
) => {
  if (contractUniswapPair && web3context && setAllowance) {
    const al = await contractUniswapPair.methods
      .allowance(web3context?.account, PHNX_LP_STAKING_CONTRACT_ADDRESS_RINKEBY)
      .call();
    console.log("al", al);
    setAllowance(al);
  } else {
    throw "Invalid credentials of checkApproval STAKE-SERVICES";
  }
};

export const getUserInfo = async (
  contractPhnxStake,
  web3context,
  setUserInfo
) => {
  console.log("Wroking getUserInfooo");
  if (contractPhnxStake && web3context && setUserInfo) {
    const info = await contractPhnxStake.methods
      .userInfo(web3context?.account)
      .call();
    console.log("info", info);
    setUserInfo(info);
  } else {
    throw "Invalid credentials of getUserInfo";
  }
};

export const getPendingPHX = async (
  contractPhnxStake,
  web3context,
  setPendingPHX
) => {
  console.log(
    contractPhnxStake + "==> contractPhnxStake",
    web3context + "==> web3context",
    setPendingPHX + "==> setPendingPHX"
  );
  if (contractPhnxStake && web3context && setPendingPHX) {
    const pending = await contractPhnxStake.methods
      .pendingPHX(web3context?.account)
      .call();
    console.log("pending", pending);
    setPendingPHX(pending);
  } else {
    throw "Invalid credentials of getPendingPHX";
  }
};

export const stakeLp = async (
  web3context,
  contractPhnxStake,
  lpValue,
  handleGetPoolPosition,
  handleGetEthBalance,
  handleGetPhnxBalance,
  setLoading,
  Close
) => {
  const web3 = new Web3(web3context?.library?.currentProvider);
  setLoading(true);

  await contractPhnxStake.methods
    .deposit(web3.utils.toWei(lpValue.toString()))
    .send({ from: web3context.account })
    .on("transactionHash", (hash) => {
      // hash of tx
      console.log("tx hash", hash);
      toast(
        <Notify
          text={"Transaction in Progress 😃, you'll be notified soon."}
          severity="success"
        />,
        {
          position: "bottom-right",
        }
      );
    })
    .on("confirmation", async function (confirmationNumber, receipt) {
      if (confirmationNumber === 1) {
        // tx confirmed
        setLoading(false);
        Close();
        toast(
          <Notify text={"Transaction Successful 🚀"} severity="success" />,
          {
            position: "bottom-right",
          }
        );
      }
      await handleGetPoolPosition;
      await handleGetEthBalance;
      await handleGetPhnxBalance;
    })
    .on("error", function (err) {
      // throw err;
      setLoading(false);
      toast(
        <Notify
          text={"Transaction Rejected 😔. Try again later."}
          severity="error"
        />,
        {
          position: "bottom-right",
        }
      );
    });
};

export const unStakeLp = async (
  web3context,
  contractPhnxStake,
  lpValue,
  handleGetPoolPosition,
  handleGetEthBalance,
  handleGetPhnxBalance,
  setLoading,
  Close
) => {
  const web3 = new Web3(web3context?.library?.currentProvider);
  setLoading(true);

  await contractPhnxStake.methods
    .withdraw(web3.utils.toWei(lpValue.toString()))
    .send({ from: web3context.account })
    .on("transactionHash", (hash) => {
      // hash of tx
      console.log("tx hash", hash);
      toast(
        <Notify
          text={"Transaction in Progress 😃, you'll be notified soon."}
          severity="success"
        />,
        {
          position: "bottom-right",
        }
      );
    })
    .on("confirmation", async function (confirmationNumber, receipt) {
      if (confirmationNumber === 1) {
        // tx confirmed
        setLoading(false);
        Close();
        toast(
          <Notify text={"Transaction Successful 🚀"} severity="success" />,
          {
            position: "bottom-right",
          }
        );
      }
      await handleGetPoolPosition;
      await handleGetEthBalance;
      await handleGetPhnxBalance;
    })
    .on("error", function (err) {
      // throw err;
      setLoading(false);
      toast(
        <Notify
          text={"Transaction Rejected 😔. Try again later."}
          severity="error"
        />,
        {
          position: "bottom-right",
        }
      );
    });
};
