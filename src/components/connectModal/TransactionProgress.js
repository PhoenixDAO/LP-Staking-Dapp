import React, { useState, useEffect } from "react";
import "./TransactionProgress.css";
import Logo from "../../assets/Logo.png";
import metamask from "../../assets/metamask.svg";
import fire from "../../assets/fire.gif";
import CloseIcon from "@mui/icons-material/Close";
import PhnxLogo from "../../assets/PhnxLogo1.png";
import EthLogo from "../../assets/ETH1.png";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const TransactionProgress = ({ transactionProcessModal }) => {
  const [open, setOpen] = useState(transactionProcessModal);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setOpen(transactionProcessModal);
  }, [transactionProcessModal]);

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
        {/* <Button onClick={handleOpen}>Transaction Progress</Button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="transaction-liq-div">
            <div className="displayFlex">
              <div className="phnxDeposite">
                <img className="transaction-liq-Logo" style={{visibility:"hidden"}} src={Logo}></img>
              </div>
              <div className="closeModalIcon">
                <span className="cursorPointer">
                  <CloseIcon onClick={handleClose} />
                </span>
              </div>
            </div>
            {/* <CloseIcon className="icon-btn" onClick={handleClose} sx={{transform:"scale(1.2)", marginRight:"10px",cursor:"pointer"}} /> */}
            <div className="transactionProgressMarginBottom">
              <div className="transactionSubmittedCheck">
                <img src={fire} className="transactionFireCheckIcon"></img>
              </div>
              <div className="transactionSubmitted">
                Transaction in progress
              </div>

              <div className=" transactionProgress">
                <div>Confirm this transaction on your wallet</div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default TransactionProgress;
