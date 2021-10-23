import React, { useState } from "react";
import "./SlippingTolerance.css";
import CloseIcon from "@mui/icons-material/Close";
import percentage from "../../assets/percentage.svg";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { IconButton, InputAdornment, Modal, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  SET_SLIPPAGE_ADD_LIQUIDITY,
  SET_SLIPPAGE_REMOVE_LIQUIDITY,
} from "../../redux/types/local.types";

const SlippingTolerance = ({
  status,
  handleClose,
  slippageValue,
  slippageType,
}) => {
  const dispatch = useDispatch();
  // const slippageAddLiquidity = useSelector(
  //   (state) => state.localReducer.slippageAddLiquidity
  // );
  // const slippageRemoveLiquidity = useSelector(
  //   (state) => state.localReducer.slippageRemoveLiquidity
  // );

  const handleSlippageValue = (val) => {
    if (val < 0 || val > 1) {
      return;
    }
    if (slippageType == "add") {
      dispatch({
        type: SET_SLIPPAGE_ADD_LIQUIDITY,
        payload: val,
      });
    } else if (slippageType == "remove") {
      dispatch({
        type: SET_SLIPPAGE_REMOVE_LIQUIDITY,
        payload: val,
      });
    }
  };

  const [open, setOpen] = useState(status);
  const handleOpen = () => setOpen(true);

  const handlePercentageInput = (e) => {
    if (e.target.value === "" || isNaN(e.target.value)) {
      handleSlippageValue("");
    } else if (e.target.value > 0.5) {
      handleSlippageValue(e.target.value);
    } else {
      handleSlippageValue(e.target.value);
    }
  };

  return (
    <div>
      <Modal
        open={status}
        onClose={() => handleClose(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="slippingLiq-div">
          <div className="">
            <div className="closeModalSlipper">
              <span className="cursorPointer">
                <CloseIcon
                  sx={{ transform: "scale(1.2)" }}
                  onClick={() => handleClose(false)}
                />
              </span>
            </div>
          </div>
          <div className="slippingLiq-heading">
            <div>Slippage Tolerance</div>{" "}
            <div style={{ height: "20px", marginLeft: "10px" }}>
              <InfoOutlinedIcon sx={{ color: "black" }} />
            </div>
          </div>

          <div className="slippingLiq-ps-div">
            <div
              className="slippingLiq-ps"
              style={{
                backgroundColor: slippageValue === 0.1 ? "#413AE2" : "#eee",
                color: slippageValue === 0.1 ? "#fff" : "#000",
                marginRight: "15px",
              }}
              onClick={() => {
                // setSelectedPercentage(0.1);
                handleSlippageValue(0.1);
              }}
            >
              0.1%
            </div>
            <div
              className="slippingLiq-ps"
              style={{
                backgroundColor: slippageValue === 0.5 ? "#413AE2" : "#eee",
                color: slippageValue === 0.5 ? "#fff" : "#000",
                marginRight: "15px",
              }}
              onClick={() => {
                // setSelectedPercentage(0.5);
                handleSlippageValue(0.5);
              }}
            >
              0.5%
            </div>
            <div
              className="slippingLiq-ps"
              style={{
                backgroundColor: slippageValue === 1 ? "#413AE2" : "#eee",
                color: slippageValue === 1 ? "#fff" : "#000",
                marginRight: "15px",
              }}
              onClick={() => {
                // setSelectedPercentage(1);
                handleSlippageValue(1);
              }}
            >
              1.0%
            </div>
            <div
              className="slippingLiq-ps"
              style={{
                backgroundColor:
                  slippageValue != 0.1 &&
                  slippageValue != 0.5 &&
                  slippageValue != 1
                    ? "#413AE2"
                    : "#eee",
                color:
                  slippageValue != 0.1 &&
                  slippageValue != 0.5 &&
                  slippageValue != 1
                    ? "#fff"
                    : "#000",
              }}
              onClick={() => {
                // setSelectedPercentage(100);
                // dispatch({
                //   type: SET_SLIPPAGE_VALUE,
                //   payload: "50",
                // });
                // handleSlippageValue(5)
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
                    <img src={percentage} className="textFieldIcon" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            className="slippingLiq-ps-input"
            placeholder="Enter a value, default value is 1"
            // value={selectedPercentage}
            value={slippageValue}
            onChange={(e) => {
              handlePercentageInput(e);
            }}
          />
          {/* </div> */}
          <br></br>
          <br></br>

          <button
            className="slippingLiq-btn"
            disabled={slippageValue == ""}
            onClick={() => handleClose(false)}
            style={{
              backgroundColor: slippageValue == "" ? "#afafaf" : "#413ae2",
              cursor: slippageValue == "" ? "inherit !important" : "pointer",
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
