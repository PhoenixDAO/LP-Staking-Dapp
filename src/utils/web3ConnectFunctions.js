import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

export const walletconnect = new WalletConnectConnector({
  rpc: {
    1: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    4: "https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213",
  },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: 12000,
});

export const walletlink = new WalletLinkConnector({
  url: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  appName: "PhoenixDao Staking dApp",
  supportedChainIds: [1, 3, 4, 5, 42, 10, 137, 69, 420, 80001],
});
