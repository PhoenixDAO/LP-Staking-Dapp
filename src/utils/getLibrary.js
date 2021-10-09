import { Web3Provider } from "@ethersproject/providers";
import Web3 from "web3";

// export const getLibrary = (provider) => {
//   const library = new Web3Provider(provider);
//   library.pollingInterval = 8000;
//   console.log(library, "library");
//   return library;
// };

export const getLibrary = (provider) => {
  return new Web3(provider);
};
