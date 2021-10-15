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


export const fixedWithoutRounding = (num,decPlaces) =>{
  num = num.toString(); //If it's not already a String
  num = num.slice(0, (num.indexOf("."))+decPlaces); //With 3 exposing the hundredths place
  return(Number(num));
}