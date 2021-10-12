import React, { useState, useEffect } from "react";
import "./ConnectModal.css";
import Logo from "../../assets/Logo.png";
import CloseIcon from "@mui/icons-material/Close";
import PhnxLogo from "../../assets/PhnxLogo1.png";
import EthLogo from "../../assets/ETH1.png";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const ConnectModal = ({transactionConfirmModal,_handleSupply }) => {

  const [open, setOpen] = useState(transactionConfirmModal);
  const handleClose = () => {setOpen(false)};

  useEffect(()=>{
    setOpen(transactionConfirmModal)
  },[transactionConfirmModal]);

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
        {/* <Button onClick={handleOpen}>Connect Modal</Button> */}
        <Modal
          open={open}
          onClose={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="add-liq-div">
            <div className="displayFlex">
              <div className="phnxDeposite">
                <img className="add-liq-Logo" src={Logo}></img>
              </div>
              <div className="closeModalIcon">
              <span className="cursorPointer">
                <CloseIcon onClick={handleClose} />
                </span>
              </div>
            </div>
            <div className="add-liq-heading">YOU WILL RECIEVE</div>

            <div className="add-liq-ps-div">
              0.54321
              <span className="iconMargin">
                <img src={PhnxLogo} className="add-liq-phnx-eth-img"></img>
                <img
                  src={EthLogo}
                  className="add-liq-phnx-eth-img iconLeftMargin"
                ></img>
              </span>
            </div>

            <div className="textRecieve">PHNX/ETH Pool tokens</div>
            <div className="add-liq-divider"></div>
            <div className="priceContainer">
              <div className="addPrice">
                <div className="displayFlex">
                  <div className="phnxDeposite">PHNX Deposited</div>
                  <div className="phnxDepositePrice fontWeight500 displayFlex">
                    <div>
                      <img
                        src={PhnxLogo}
                        className="phnxDepositePriceImage"
                      ></img>
                    </div>
                    <div>0.0653232</div>
                  </div>
                </div>
              </div>
              <div className="addPrice">
                <div className="displayFlex">
                  <div className="phnxDeposite">ETH Deposited</div>
                  <div className="phnxDepositePrice fontWeight500 displayFlex">
                    <div>
                      <img
                        src={EthLogo}
                        className="phnxDepositePriceImage"
                      ></img>
                    </div>
                    <div>0.231</div>
                  </div>
                </div>
              </div>
              <div className="addPrice">
                <div className="displayFlex">
                  <div className="phnxDeposite">Rates</div>
                  <div className="phnxDepositePrice fontWeight400 displayInlineGrid ratesFontColor">
                    <div className="justifySelfEnd ratesFontColor">
                      1 PHNX = 0.2335 ETH
                    </div>
                    <div className="justifySelfEnd ratesFontColor">
                      1 ETH = 0.3456665 PHNX
                    </div>
                  </div>
                </div>
              </div>
              <div className="addPrice">
                <div className="displayFlex">
                  <div className="phnxDeposite">Pool Share</div>
                  <div className="phnxDepositePrice displayFlex">
                    0.000000346%
                  </div>
                </div>
              </div>
            </div>

            <div className="add-liq-phnx-eth-det-div">
              Output is estimated. if the price changes by more than 0.1% your
              transaction will revert
            </div>

            {/* <div className="add-liq-phnx-eth-con-div">
        <div className="add-liq-phnx-eth-con">1 PHNX = 0.2335 ETH</div>
        <div className="add-liq-phnx-eth-con">1 ETH = 0.3456665 PHNX</div>
      </div> */}

            <button className="add-liq-btn cursorPointer" onClick={()=>{
              _handleSupply();
              }
              }>Add Liquidity</button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ConnectModal;
