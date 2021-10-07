import React, { useEffect } from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "./utils/getLibrary";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import Router from "./routes";
import { BrowserRouter } from "react-router-dom";

// import { ToastMsg } from "./components/Toast";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <Router />
          </Web3ReactProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
};
export default App;
