import React, { useState } from "react";
import "./SlippingTolerance.css";
import CloseIcon from "@mui/icons-material/Close";
import percentage from "../../assets/percentage.svg";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { IconButton, InputAdornment, Modal, TextField } from "@mui/material";

const SlippingTolerance = ({ status, handleClose, setSlippageValue }) => {
  const [selectedPercentage, setSelectedPercentage] = useState("");

  const [open, setOpen] = useState(status);
  const handleOpen = () => setOpen(true);

  const handlePercentageInput = (e) => {
    if (e.target.value === "" || isNaN(e.target.value)) {
      setSelectedPercentage("");
      setSlippageValue(parseInt(1));
    } else if (e.target.value > 50) {
      setSelectedPercentage(50);
      setSlippageValue(50);
    } else {
      setSelectedPercentage(parseInt(e.target.value));
      setSlippageValue(parseInt(e.target.value));
    }
  };

  return (
    <div>
    {/* <Button onClick={handleOpen}>Slipping Tolerance</Button> */}
    <Modal
      open={status}
      onClose={()=>handleClose(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
    <div className="slippingLiq-div">
      <div className="">
              <div className="closeModalSlipper">
                <span className="cursorPointer">
                  <CloseIcon sx={{transform:"scale(1.2)"}} onClick={()=>handleClose(false)} />
                </span>
              </div>
            </div>
      <div className="slippingLiq-heading"><div>Slippage Tolerance</div> <div style={{height:"20px",marginLeft:"10px"}}><InfoOutlinedIcon sx={{color:"black"}} /></div></div>

      <div className="slippingLiq-ps-div">
        <div
          className="slippingLiq-ps"
          style={{
            backgroundColor: selectedPercentage === 5 ? "#413AE2" : "#eee",
            color: selectedPercentage === 5 ? "#fff" : "#000",
            marginRight:"15px"
          }}
          onClick={() => {
            setSelectedPercentage(5);
            setSlippageValue(5);
          }}
        >
          5%
        </div>
        <div
          className="slippingLiq-ps"
          style={{
            backgroundColor: selectedPercentage === 10 ? "#413AE2" : "#eee",
            color: selectedPercentage === 10 ? "#fff" : "#000",
            marginRight:"15px"
          }}
          onClick={() => {
            setSelectedPercentage(10);
            setSlippageValue(10);
          }}
        >
          10%
        </div>
        <div
          className="slippingLiq-ps"
          style={{
            backgroundColor: selectedPercentage === 20 ? "#413AE2" : "#eee",
            color: selectedPercentage === 20 ? "#fff" : "#000",
            marginRight:"15px"
          }}
          onClick={() => {
            setSelectedPercentage(20);
            setSlippageValue(20);
          }}
        >
          20%
        </div>
        <div
          className="slippingLiq-ps"
          style={{
            backgroundColor: selectedPercentage != 5 && selectedPercentage != 10 && selectedPercentage != 20 ? "#413AE2" : "#eee",
            color: selectedPercentage != 5 && selectedPercentage != 10 && selectedPercentage != 20 ? "#fff" : "#000",
          }}
          onClick={() => {
            // setSelectedPercentage(10);
          }}
        >
          Auto
        </div>
      </div>

          <br></br>
          {/* <div className="slippingLiq-ps-input-div"> */}
          <TextField
            sx={{
              borderRadius: "6px",
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton>
                    <img src={percentage} className="textFieldIcon"></img>
                  </IconButton>
                </InputAdornment>
              ),
            }}
            className="slippingLiq-ps-input"
            placeholder="Enter a value"
            value={selectedPercentage}
            onChange={(e) => {
              handlePercentageInput(e);
            }}
          ></TextField>
          {/* </div> */}
          <br></br>
          <br></br>

          <button
            className="slippingLiq-btn"
            disabled={selectedPercentage == ""}
            onClick={() => handleClose(false)}
            style={{
              backgroundColor: selectedPercentage == "" ? "#afafaf" : "#413ae2",
              cursor: selectedPercentage == "" ? "inherit !important" : "pointer"
            }}
          >
            Set Slippage
          </button>

          <br></br>
        </div>
      </Modal>
    </div>
  );
};

export default SlippingTolerance;
