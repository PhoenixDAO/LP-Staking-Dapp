import React, { useEffect, useState } from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "./utils/getLibrary";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import Router from "./routes";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    let pass = window.prompt("Enter Password.");
    if (pass == "xordphnx") {
      setVerified(true);
    }
  },[]);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Web3ReactProvider getLibrary={getLibrary}>
            {verified ? <Router /> : null}
            <ToastContainer
              style={{
                width: "400px",
                borderRadius: "20px",
                textAlign: "center",
              }}
            />
          </Web3ReactProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
};
export default App;
