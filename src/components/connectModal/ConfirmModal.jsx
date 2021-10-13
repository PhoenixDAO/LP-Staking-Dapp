import React, { useState, useEffect } from "react";
import "./ConfirmModal.css";
import Logo from "../../assets/Logo.png";
import CloseIcon from "@mui/icons-material/Close";
import PhnxLogo from "../../assets/PhnxLogo1.png";
import EthLogo from "../../assets/ETH1.png";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import Web3 from "web3";


const ConfirmModal = ({transactionConfirmModal,setTxModalClose,phnx,eth,phnxethburn,removeLiquidity}) => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const[phnxethburn,setphnxethburn] = useState(0);

  const phnxpereth = useSelector(
    (state) => state.localReducer.phnxPerEth
  );

  const ethperphnx = useSelector(
    (state) => state.localReducer.ethPerPhnx
  );


  useEffect(()=>{
    setOpen(transactionConfirmModal);
  },[transactionConfirmModal])


  // const calculateLpToken = async (amount0, amount1) => {
  //   console.log(amount0, amount1);

  //   if (!uniswapV2PairContract || !amount0 || !amount1) {
  //     return;
  //   }

  //   const getReserves = await uniswapV2PairContract.methods
  //     .getReserves()
  //     .call();
  //   const _totalSupply = await uniswapV2PairContract.methods
  //     .totalSupply()
  //     .call();

  //   const _reserve0 = getReserves._reserve0;
  //   const _reserve1 = getReserves._reserve1;

  //   amount0 = Web3.utils.toWei(amount0.toString());
  //   amount1 = Web3.utils.toWei(amount1.toString());

  //   const liquidity = Math.min(
  //     (amount0 * _totalSupply) / _reserve0,
  //     (amount1 * _totalSupply) / _reserve1
  //   );
  //   setphnxethburn(Web3.utils.fromWei(liquidity.toString(), "ether"));
  // };


  // useState(()=>{
  //   setphnxethburn('Calculating...')
  //   calculateLpToken(eth,phnx)
  // },[phnx,eth])

  const handleConfirm = () =>{
    if(eth==0 || phnx==0){
      return;
    }

    removeLiquidity();
    
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <div>
        {/* <Button onClick={handleOpen}>Confirm Modal</Button> */}
        <Modal
          open={transactionConfirmModal}
          onClose={setTxModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          
          <div className="add-liq-div">
            <div className="displayFlex">
              <div className="confirmPhnxDepositeLogo">
                <img className="add-liq-Logo" src={Logo}></img>
              </div>
              <div className="closeModalIcon">
                <span className="cursorPointer">
                  <CloseIcon onClick={setTxModalClose} />
                </span>
              </div>
            </div>
            <div className="add-liq-heading">YOU WILL RECIEVE</div>
            <div className="priceContainer">
              <div className="confirmModalAddPrice">
                <div className="displayFlex">
                  <div className="confirmPhnxDepositePrice fontWeight500 displayFlex">
                    <div className="currencyIconDivHeight">
                      <img src={PhnxLogo} className="CurrencyIcon"></img>
                    </div>
                    <div>PHNX</div>
                  </div>
                  <div className="confirmPhnxDeposite confirmPrice">{phnx}</div>
                </div>
              </div>
              <div className="confirmModalAddPrice">
                <div className="displayFlex">
                  <div className="confirmPhnxDepositePrice fontWeight500 displayFlex">
                    <div className="currencyIconDivHeight">
                      <img src={EthLogo} className="CurrencyIcon"></img>
                    </div>
                    <div>ETH</div>
                  </div>
                  <div className="confirmPhnxDeposite confirmPrice">{eth}</div>
                </div>
              </div>
              <div className="confirmModalAddPrice">
                <div className="displayFlex">
                  <div className="confirmPhnxDepositePrice fontWeight500 displayFlex">
                    <div className="confirmPhnxDepositePriceImageDiv">
                      <span className="burnedCurrencyImages">
                        <img
                          src={PhnxLogo}
                          className="confirmPhnxDepositePriceImage"
                        ></img>
                        <img
                          src={EthLogo}
                          className="confirmPhnxDepositePriceImage"
                        ></img>
                      </span>
                    </div>
                    <div>PHNX-ETH BURNED</div>
                  </div>
                  <div className="confirmPhnxDeposite confirmPhnxDepositeFontSize">{phnxethburn}</div>
                </div>
              </div>
            </div>

            <div className="add-liq-phnx-eth-det-div">
              Output is estimated. if the price changes by more than 0.1% your
              transaction will revert
            </div>
            <div className="confirmModalAddPrice">
              <div className="displayFlex">
                <div className="phnxDeposite">Rates</div>
                <div className="phnxDepositePrice fontWeight400 displayInlineGrid ratesFontColor">
                  <div className="justifySelfEnd ratesFontColor">
                    1 PHNX = {ethperphnx+' '} ETH
                  </div>
                  <div className="justifySelfEnd ratesFontColor">
                    1 ETH = {phnxpereth+' '} PHNX
                  </div>
                </div>
              </div>
            </div>

            <button className="add-liq-btn cursorPointer" onClick={handleConfirm} >Confirm</button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ConfirmModal;
