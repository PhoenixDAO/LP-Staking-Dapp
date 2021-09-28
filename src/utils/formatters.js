import Web3 from "web3";

export const conciseAddress = (address) => {
  if (Web3.utils.isAddress(address)) {
    return `${address.slice(0, 6)}...${address.slice(
      address.length - 4,
      address.length
    )}`;
  }
  return "-";
};
