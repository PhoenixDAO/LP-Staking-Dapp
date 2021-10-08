import React from "react";
import "./removeLiquidity.css";
import { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import RemoveLiquidityComponent from "./index";

const RemoveLiquidityModAL = () => {
  const [isVsible, setIsVisible] = useState(false);

  const handleOpen = () => {
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div>
      <Modal
        open={isVsible}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <RemoveLiquidityComponent Close={handleClose} />
      </Modal>
    </div>
  );
};

export default Farm;
