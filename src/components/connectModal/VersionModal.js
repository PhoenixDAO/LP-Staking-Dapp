import React, { useState, useEffect } from "react";
import "./VersionModal.css";
import Logo from "../../assets/Logo.png";
import CloseIcon from "@mui/icons-material/Close";
import PhnxLogo from "../../assets/PhnxLogo1.png";
import EthLogo from "../../assets/ETH1.png";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Checkbox, IconButton, InputAdornment, TextField } from "@mui/material";

const VersionModal = ({ status, setStatus }) => {
  const [selectedPercentage, setSelectedPercentage] = useState(0);
  const [allowance, setAllowance] = useState(0);

  const [open, setOpen] = useState(status);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
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
        {/* <Button onClick={handleOpen}>Version Modal</Button> */}
        <Modal
          open={status}
          onClose={() => setStatus(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="version-div">
            <div className="displayFlex">
              <div className="phnxDeposite">
                <img
                  className="version-Logo"
                  style={{ visibility: "hidden" }}
                  src={Logo}
                ></img>
              </div>
              <div className="closeModalIcon">
                <span className="cursorPointer">
                  <CloseIcon onClick={() => setStatus(false)} />
                </span>
              </div>
            </div>

            <div className="VersionMainHeading">
              <div className="version-ps-div">
                V1 is no longer actively supported
              </div>
              <div style={{ color: "#73727d" }} className="versionParagraph">
                Use the V2 Staking dApp instead for better experience
              </div>
            </div>

            <Button
              sx={{
                backgroundColor: "#413AE2",
                borderColor: "#413AE2",
                color: "#fff",
                padding: "15px",
                borderRadius: "9px",
                fontWeight: "bold",
                fontSize: "16px",
                padding: "15px",
                textTransform: "inherit",
                marginBottom: "30px",
                textTransform: "inherit",
                "&:hover": {
                  backgroundColor: "#413AE2",
                  borderColor: "#413AE2",
                  boxShadow: "none",
                },
                "&:active": {
                  boxShadow: "none",
                  backgroundColor: "#413AE2",
                  borderColor: "#413AE2",
                },
              }}
              className="version-btn cursorPointer"
              onClick={() => setStatus(false)}
            >
              Go to V2 Staking dApp
            </Button>

            <div className="version-divider"></div>
            {/* <div className="priceContainer">
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
            </div> */}
            {/* 
            <div className="version-phnx-eth-det-div">
              Output is estimated. if the price changes by more than 0.1% your
              transaction will revert
            </div> */}
            <div className="displayFlex versionCheckbox">
              <div className="checkboxPadding">
                <Checkbox
                  size="small"
                  checked={checked}
                  onChange={handleChange}
                  sx={{
                    color: "#413AE2",
                    "&.Mui-checked": {
                      color: "#413AE2",
                    },
                  }}
                />
              </div>
              <div style={{ color: "#73727d" }} className="versionParagraph">
                I understand that V.1 smart contract upgrade due, service
                available but may be slightly disrupted.
              </div>
            </div>

            {/* <div className="version-phnx-eth-con-div">
        <div className="version-phnx-eth-con">1 PHNX = 0.2335 ETH</div>
        <div className="version-phnx-eth-con">1 ETH = 0.3456665 PHNX</div>
      </div> */}
            <a
              href="https://staking.phoenixdao.io/v1"
              style={{ textDecoration: "none" }}
            >
              <Button
                disabled={!checked}
                sx={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #413AE2",
                  color: "#413AE2",
                  fontWeight: "bold",
                  fontSize: "16px",
                  padding: "15px",
                  textTransform: "inherit",
                  marginBottom: "30px",
                  borderRadius: "9px",
                  "&:hover": {
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #413AE2",
                    color: "#413AE2",
                    boxShadow: "none",
                  },
                  "&:disabled": {
                    boxShadow: "none",
                    backgroundColor: "#AAAAAA",
                    borderColor: "#AAAAAA",
                    color: "#FFFFFF",
                  },
                }}
                className="version-btn cursorPointer"
                onClick={() => setStatus(false)}
              >
                Continue to V1
              </Button>
            </a>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default VersionModal;
