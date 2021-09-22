import Router from "./routes";
import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "./utils/getLibrary";

export default function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Router />
    </Web3ReactProvider>
  );
}
