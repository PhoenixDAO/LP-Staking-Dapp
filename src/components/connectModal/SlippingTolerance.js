import React, { useState} from "react";
import "./SlippingTolerance.css";
import CloseIcon from "@mui/icons-material/Close";
import percentage from "../../assets/percentage.svg";

import { Button, IconButton, InputAdornment, Modal, TextField } from "@mui/material";

const SlippingTolerance = ({status,handleClose,setSlippageValue}) => {
 
  const [selectedPercentage, setSelectedPercentage] = useState('');
  
  const [open, setOpen] = useState(status);
  const handleOpen = () => setOpen(true);

  const handlePercentageInput = (e) => {
    if (e.target.value === "" || isNaN(e.target.value)) {
      setSelectedPercentage('');
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
                  <CloseIcon onClick={()=>handleClose(false)} />
                </span>
              </div>
            </div>
      <div className="slippingLiq-heading">Slippage Tolerance</div>

      <div className="slippingLiq-ps-div">
        <div
          className="slippingLiq-ps"
          style={{
            backgroundColor: selectedPercentage === 5 ? "#413AE2" : "#eee",
            color: selectedPercentage === 5 ? "#fff" : "#000",
          }}
          onClick={() => {
            setSelectedPercentage(5);
          }}
        >
          5%
        </div>
        <div
          className="slippingLiq-ps"
          style={{
            backgroundColor: selectedPercentage === 10 ? "#413AE2" : "#eee",
            color: selectedPercentage === 10 ? "#fff" : "#000",
          }}
          onClick={() => {
            setSelectedPercentage(10);
          }}
        >
          10%
        </div>
        <div
          className="slippingLiq-ps"
          style={{
            backgroundColor: selectedPercentage === 20 ? "#413AE2" : "#eee",
            color: selectedPercentage === 20 ? "#fff" : "#000",
          }}
          onClick={() => {
            setSelectedPercentage(20);
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
      {/* </div> */}
      <br></br><br></br>

        <button className="slippingLiq-btn" onClick={()=>handleClose(false)} style={{backgroundColor: selectedPercentage==''? '#afafaf' : '#413ae2'}}>
          Set Slippage
        </button>
        

      <br></br>
    </div>
    </Modal>
    </div>
  );
};

export default SlippingTolerance;
