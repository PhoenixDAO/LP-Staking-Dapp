import React, { useState, useEffect } from "react";
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
  const [slippageVal, setSlippageVal] = useState(0.1);
  const [warningMsg, setWarningMsg] = useState(false);
  const slippageAddLiquidity = useSelector(
    (state) => state.localReducer.slippageAddLiquidity
  );
  const slippageRemoveLiquidity = useSelector(
    (state) => state.localReducer.slippageRemoveLiquidity
  );

  useEffect(() => {
    if (slippageValue) {
      setSlippageVal(slippageValue);
    }
    if (slippageValue > 0 && slippageValue < 0.1) {
      setWarningMsg(true);
    } else {
      setWarningMsg(false);
    }
  }, []);

  // useEffect(() => {
  //   if (Number(slippageVal) <= 0 || Number(slippageVal) > 1) {
  //     return;
  //   } else {
  //     if (slippageType == "add") {
  //       dispatch({
  //         type: SET_SLIPPAGE_ADD_LIQUIDITY,
  //         payload: slippageVal,
  //       });
  //     } else if (slippageType == "remove") {
  //       dispatch({
  //         type: SET_SLIPPAGE_REMOVE_LIQUIDITY,
  //         payload: slippageVal,
  //       });
  //     }
  //   }
  // }, [slippageVal]);

  const handleOnPressSetSlippage = () => {
    if (Number(slippageVal) <= 0 || Number(slippageVal) > 1) {
      return;
    } else {
      if (slippageType == "add") {
        dispatch({
          type: SET_SLIPPAGE_ADD_LIQUIDITY,
          payload: slippageVal,
        });
      } else if (slippageType == "remove") {
        dispatch({
          type: SET_SLIPPAGE_REMOVE_LIQUIDITY,
          payload: slippageVal,
        });
      }
      handlePressClose();
    }
  };

  const handleSetSlippageValue = (val) => {
    // console.log("handleOnChangeSlippageValue ", val);
    if (val < 0 || val > 1) {
      return;
    } else {
      if (val > 0 && val < 0.1) {
        setWarningMsg(true);
      } else {
        setWarningMsg(false);
      }
      setSlippageVal(
        val.toString().slice(val.toString().indexOf(".") + 1, -1).length < 15
          ? val
          : slippageVal
      );
    }
  };

  const [open, setOpen] = useState(status);
  const handleOpen = () => setOpen(true);
  const handlePressClose = () => {
    handleClose(false);
    if (slippageType == "add") {
      setSlippageVal(slippageAddLiquidity);
    } else if (slippageType == "remove") {
      setSlippageVal(slippageRemoveLiquidity);
    }
  };

  const handlePercentageInput = (e) => {
    if (e.target.value == "" || isNaN(e.target.value)) {
      handleSetSlippageValue("");
    } else if (e.target.value > 0.5) {
      handleSetSlippageValue(e.target.value);
    } else {
      handleSetSlippageValue(e.target.value);
    }
  };

  return (
    <div>
      <Modal
        open={status}
        onClose={handlePressClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="slippingLiq-div">
          <div className="">
            <div className="closeModalSlipper">
              <span className="cursorPointer">
                <CloseIcon
                  sx={{ transform: "scale(1.2)" }}
                  onClick={handlePressClose}
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
                backgroundColor: slippageVal == 0.1 ? "#413AE2" : "#eee",
                color: slippageVal == 0.1 ? "#fff" : "#000",
                marginRight: "15px",
              }}
              onClick={() => {
                handleSetSlippageValue(0.1);
              }}
            >
              0.1%
            </div>
            <div
              className="slippingLiq-ps"
              style={{
                backgroundColor: slippageVal == 0.5 ? "#413AE2" : "#eee",
                color: slippageVal == 0.5 ? "#fff" : "#000",
                marginRight: "15px",
              }}
              onClick={() => {
                handleSetSlippageValue(0.5);
              }}
            >
              0.5%
            </div>
            <div
              className="slippingLiq-ps"
              style={{
                backgroundColor: slippageVal == 1 ? "#413AE2" : "#eee",
                color: slippageVal == 1 ? "#fff" : "#000",
                marginRight: "15px",
              }}
              onClick={() => {
                handleSetSlippageValue(1);
              }}
            >
              1.0%
            </div>
            <div
              className="slippingLiq-ps"
              style={{
                backgroundColor:
                  slippageVal != 0.1 &&
                  slippageVal != 0.5 &&
                  slippageVal != 1
                    ? "#413AE2"
                    : "#eee",
                color:
                  slippageVal != 0.1 &&
                  slippageVal != 0.5 &&
                  slippageVal != 1
                    ? "#fff"
                    : "#000",
              }}
              onClick={() => {
                return;
              }}
            >
              Auto
            </div>
          </div>

          <br></br>
          <TextField
            sx={{
              borderRadius: "6px",
              "& .MuiOutlinedInput-input": {
                fontSize: "20px",
                fontWeight: "500",
              },
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
            placeholder="Enter a value, 0.1 is default value"
            value={slippageVal}
            onChange={(e) => {
              handlePercentageInput(e);
            }}
          />
          {warningMsg ? (
            <p style={{ color: "#ff0000", marginBottom: -20, marginTop: 5 }}>
              Your transaction may fail!
            </p>
          ) : null}
          <br></br>
          <br></br>

          <button
            className="slippingLiq-btn"
            disabled={
              Number(slippageVal) <= 0 || Number(slippageVal) > 1 ? true : false
            }
            onClick={handleOnPressSetSlippage}
            style={{
              backgroundColor:
                Number(slippageVal) <= 0 || Number(slippageVal) > 1
                  ? "#afafaf"
                  : "#413ae2",
              fontSize: "16px",
              height: "50px",
              fontWeight: "700",
              cursor:
                Number(slippageVal) <= 0 || Number(slippageVal) > 1
                  ? "inherit !important"
                  : "pointer",
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
