import React , {useEffect} from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "./utils/getLibrary";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import Router from "./routes";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { ToastContainer, toast } from 'react-toastify';
import Notify from "./components/Notify";
import 'react-toastify/dist/ReactToastify.css';


// import { ToastMsg } from "./components/Toast";

const App = () => {

  // useEffect(()=>{
  //   toast(
  //     <Notify
  //       text={
  //         "Transaction successfull!\nYou can buy a ticket now."
  //       }
  //       severity='success'
  //     />,
  //     {
  //       position: "bottom-right",
  //       // autoClose: 5000,
  //       // hideProgressBar: false,
  //       // closeOnClick: true,
  //       closeButton: true,
  //       // pauseOnHover: true,
  //       // draggable: true,
  //       // progress: undefined,
  //     }
  //   );
  // });

  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <Router />
            <ToastContainer style={{ width: "400px", borderRadius:'20px',textAlign:'center'}}/>
            </Web3ReactProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
};
export default App;
