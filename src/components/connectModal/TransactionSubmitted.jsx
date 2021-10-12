import React, { useState, useEffect } from "react";
import "./TransactionSubmitted.css";
import Logo from "../../assets/Logo.png";
import metamask from "../../assets/metamask.svg";
import transactionSumittedCheck from "../../assets/transactionSumittedCheck.svg";
import CloseIcon from "@mui/icons-material/Close";
import PhnxLogo from "../../assets/PhnxLogo1.png";
import EthLogo from "../../assets/ETH1.png";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const TransactionSubmitted = ({transactionSubmittedModal}) => {
  const [selectedPercentage, setSelectedPercentage] = useState(0);
  const [allowance, setAllowance] = useState(0);

  const [open, setOpen] = useState(transactionSubmittedModal);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(()=>{
    setOpen(transactionSubmittedModal)
  },[transactionSubmittedModal]);

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
        {/* <Button onClick={handleOpen}>Transaction Submitted</Button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="transaction-liq-div">
            <div className="displayFlex">
              <div className="phnxDeposite">
                <img className="transaction-liq-Logo" src={Logo}></img>
              </div>
              <div className="closeModalIcon">
              <span className="cursorPointer">
                <CloseIcon onClick={handleClose} />
                </span>
              </div>
            </div>
            <div className="">
              <div className="transactionSubmittedCheck">
                <img
                  src={transactionSumittedCheck}
                  className="transactionSubmittedCheckIcon"
                ></img>
              </div>
              <div className="transactionSubmitted">Transaction Submitted</div>

              <div className="displayFlex bscScan">
                <div className="cursorPointer">View on BscScan</div>
                <div className="openTabPadding  cursorPointer">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.5 2.5V4H1.75V12.25H10V8.5H11.5V13C11.5 13.1989 11.421 13.3897 11.2803 13.5303C11.1397 13.671 10.9489 13.75 10.75 13.75H1C0.801088 13.75 0.610322 13.671 0.46967 13.5303C0.329018 13.3897 0.25 13.1989 0.25 13V3.25C0.25 3.05109 0.329018 2.86032 0.46967 2.71967C0.610322 2.57902 0.801088 2.5 1 2.5H5.5ZM13.75 0.25V7L10.9045 4.15525L6.40525 8.65525L5.34475 7.59475L9.844 3.09475L7 0.25H13.75Z"
                      fill="#413AE2"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="transaction-liq-phnx-eth-det-div cursorPointer">
              <div className="displayFlex metamaskIconCenter">
                <div>Add PHNX-LP to Metamask </div>
                <div>
                  <img src={metamask} className="metamaskIcon"></img>
                </div>
              </div>
            </div>

            {/* <div className="transaction-liq-phnx-eth-con-div">
        <div className="transaction-liq-phnx-eth-con">1 PHNX = 0.2335 ETH</div>
        <div className="transaction-liq-phnx-eth-con">1 ETH = 0.3456665 PHNX</div>
      </div> */}
            <div className="transactionCloseButton">
              <button className="transaction-liq-btn cursorPointer" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default TransactionSubmitted;
