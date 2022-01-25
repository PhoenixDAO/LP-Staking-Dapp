import Web3 from "web3";
import BigNumber from "bignumber.js";

export const conciseAddress = (address) => {
  if (Web3.utils.isAddress(address)) {
    return `${address.slice(0, 6)}...${address.slice(
      address.length - 4,
      address.length
    )}`;
  }
  return "-";
};

export const fixedWithoutRounding = (num,decPlaces) =>{
  num = num.toString(); 
  num = num.slice(0, (num.indexOf("."))+decPlaces); 
  return(Number(num));
}
