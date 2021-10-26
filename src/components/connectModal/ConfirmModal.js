import React, { useState, useEffect } from "react";
import "./ConfirmModal.css";
import Logo from "../../assets/Logo.png";
import CloseIcon from "@mui/icons-material/Close";
import PhnxLogo from "../../assets/PhnxLogo1.png";
import EthLogo from "../../assets/ETH1.png";
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";

const ConfirmModal = ({
  transactionConfirmModal,
  setTxModalClose,
  phnx,
  eth,
  phnxethburn,
  handleRemoveLiquidity,
  slippageValue,
  handleMainClose,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const[phnxethburn,setphnxethburn] = useState(0);

  const phnxpereth = useSelector((state) => state.localReducer.phnxPerEth);
  const ethperphnx = useSelector((state) => state.localReducer.ethPerPhnx);
  // const slippageTolerance = useSelector(
  //   (state) => state.localReducer.slippageTolerance
  // );

  useEffect(() => {
    setOpen(transactionConfirmModal);
  }, [transactionConfirmModal]);

  const handleConfirm = () => {
    // if (eth == 0 || phnx == 0) {
    //   return;
    // }
    console.log("asdasddsad");
    handleRemoveLiquidity(handleMainClose);
  };

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
            <div className="add-liq-heading">YOU WILL RECEIVE</div>
            <div className="priceContainer">
              <div className="confirmModalAddPrice">
                <div className="displayFlex">
                  <div className="confirmPhnxDepositePrice fontWeight500 displayFlex">
                    <div className="currencyIconDivHeight">
                      <img src={PhnxLogo} className="CurrencyIcon"></img>
                    </div>
                    <div>PHNX</div>
                  </div>
                  <div className="confirmPhnxDeposite confirmPrice">{parseFloat(phnx).toFixed(5)}</div>
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
                  <div className="confirmPhnxDeposite confirmPrice">{parseFloat(eth).toFixed(5)}</div>
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
                  <div className="confirmPhnxDeposite confirmPhnxDepositeFontSize">
                    {parseFloat(phnxethburn).toFixed(5)}
                  </div>
                </div>
              </div>
            </div>

            <div className="add-liq-phnx-eth-det-div">
              Output is estimated. if the price changes by more than{" "}
              {slippageValue}% your transaction will revert
            </div>
            <div className="confirmModalAddPrice">
              <div className="displayFlex">
                <div className="phnxDeposite">Rates</div>
                <div className="phnxDepositePrice fontWeight400 displayInlineGrid ratesFontColor">
                  <div className="justifySelfEnd ratesFontColor">
                    1 PHNX = {ethperphnx + " "} ETH
                  </div>
                  <div className="justifySelfEnd ratesFontColor">
                    1 ETH = {phnxpereth + " "} PHNX
                  </div>
                </div>
              </div>
            </div>

            <button
              className="add-liq-btn cursorPointer"
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ConfirmModal;
