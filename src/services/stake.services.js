import Web3 from "web3";
import {
  PHNX_LP_STAKING_CONTRACT_ADDRESS_RINKEBY,
  UNISWAP_V2_PHNX_ETH_PAIR_ADDRESS_RINKEBY,
} from "../contract/constant";

export const giveApprovalFarming = async (web3context, contractUniswapPair) => {
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
      .on("confirmation", function (confirmationNumber, receipt) {
        if (confirmationNumber === 2) {
          // tx confirmed
          console.log("confirmationNumber", confirmationNumber);
        }
      })
      .on("error", function (err) {
        console.log("err", err);
      });
  } else {
    throw "Invalid credentials of giveApprovalFarming";
  }
};

export const harvestPHNX = async (web3context, contractPhnxStake) => {
  if (web3context && contractPhnxStake) {
    const web3 = new Web3(web3context?.library?.currentProvider);
    await contractPhnxStake.methods
      .deposit(web3.utils.toWei("0"))
      .send({ from: web3context.account })
      .on("transactionHash", (hash) => {
        // hash of tx
        console.log("tx hash", hash);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        if (confirmationNumber === 2) {
          // tx confirmed
          // checkApproval(contractUniswapPair, web3context, setAllowance);
          alert("success", "tx successfull!");
        }
      })
      .on("error", function (err) {
        console.error(err);
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

export const stakeLp = async (web3context, contractPhnxStake, lpValue) => {
  const web3 = new Web3(web3context?.library?.currentProvider);

  await contractPhnxStake.methods
    .deposit(web3.utils.toWei(lpValue.toString()))
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
      throw err;
    });
};
