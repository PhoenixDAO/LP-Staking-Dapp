import React, { useState } from "react";
import { Modal } from "@mui/material";
import AddLiquidityComp from "../components/addLiquidityComponent";
import RemoveLiquidityComp from "./removeLiquidityComponent";

import ComponentCss from "./componentCss.css";

const LiquidityModal = ({ isVisible, handleClose, componentName }) => {
  return (
    <Modal
      open={isVisible}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {componentName === "addLiquidity" ? (
        <AddLiquidityComp
          isVisible={isVisible}
          handleClose={handleClose}
          closeBtn={true}
        />
      ) : componentName === "removeLiquidity" ? (
        <RemoveLiquidityComp
          isVisible={isVisible}
          handleClose={handleClose}
          closeBtn={true}
        />
      ) : null}
    </Modal>
  );
};

export default LiquidityModal;

// const styles = {
//   containerStyle: {
//     position: "absolute",
//     maxHeight: "90%",
//     overflowY: "scroll",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 600,
//     bgcolor: "#fff",
//     padding: 20,
//     // border: "2px solid #000",
//     borderRadius: 5,
//     boxShadow: 0,
//     p: 4,
//     ["@media (max-width: 650px)"]: {
//       width: "90%",
//       padding: 2,
//     },
//   },
// };
