import React, { useState} from "react";
import "./SlippingTolerance.css";
import CloseIcon from "@mui/icons-material/Close";
import percentage from "../../assets/percentage.svg";

import { Button, IconButton, InputAdornment, Modal, TextField } from "@mui/material";

const SlippingTolerance = () => {
  const [selectedPercentage, setSelectedPercentage] = useState(0);
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePercentageInput = (e) => {
    if (e.target.value === "" || isNaN(e.target.value)) {
      setSelectedPercentage(parseInt(0));
    } else if (e.target.value > 100) {
      setSelectedPercentage(100);
    } else {
      setSelectedPercentage(parseInt(e.target.value));
    }
  };

  return (
    <div>
    <Button onClick={handleOpen}>Slipping Tolerance</Button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
    <div className="slippingLiq-div">
    <div className="">
              <div className="closeModalSlipper">
                <span className="cursorPointer">
                  <CloseIcon onClick={handleClose} />
                </span>
              </div>
            </div>
      <div className="slippingLiq-heading">Slipping Tolerance</div>

      <div className="slippingLiq-ps-div">
        <div
          className="slippingLiq-ps"
          style={{
            backgroundColor: selectedPercentage === 25 ? "#413AE2" : "#eee",
            color: selectedPercentage === 25 ? "#fff" : "#000",
          }}
          onClick={() => {
            setSelectedPercentage(25);
          }}
        >
          25%
        </div>
        <div
          className="slippingLiq-ps"
          style={{
            backgroundColor: selectedPercentage === 50 ? "#413AE2" : "#eee",
            color: selectedPercentage === 50 ? "#fff" : "#000",
          }}
          onClick={() => {
            setSelectedPercentage(50);
          }}
        >
          50%
        </div>
        <div
          className="slippingLiq-ps"
          style={{
            backgroundColor: selectedPercentage === 75 ? "#413AE2" : "#eee",
            color: selectedPercentage === 75 ? "#fff" : "#000",
          }}
          onClick={() => {
            setSelectedPercentage(75);
          }}
        >
          75%
        </div>
        <div
          className="slippingLiq-ps"
          style={{
            backgroundColor: selectedPercentage === 100 ? "#413AE2" : "#eee",
            color: selectedPercentage === 100 ? "#fff" : "#000",
          }}
          onClick={() => {
            setSelectedPercentage(100);
          }}
        >
          Auto
        </div>
      </div>

      <div className="slippingLiq-ps-input-div">
        <TextField
        sx={{
          borderRadius:"6px",
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton>
                <img src={percentage} className="textFieldIcon"></img>
              </IconButton>
            </InputAdornment>
          )
        }}
          className="slippingLiq-ps-input"
          placeholder="Enter a value"
          value={selectedPercentage}
          onChange={(e) => {
            handlePercentageInput(e);
          }}
        ></TextField>
      </div>

        <button className="slippingLiq-btn" >
          Set Slippage
        </button>
        

      <br></br>
    </div>
    </Modal>
    </div>
  );
};

export default SlippingTolerance;
