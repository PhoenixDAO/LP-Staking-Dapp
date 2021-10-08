import React, { useState, useEffect } from "react";
import {
  Modal,
  // InputAdornment,
} from "@mui/material";
import AddLiquidityComp from "../components/addLiquidityComponent";
import RemoveLiquidityComp from "./removeLiquidityComponent";

import ComponentCss from "./componentCss.css";

const LiquidityModal = ({ isVisible, handleClose }) => {
  const [isMobile, setIsMobile] = useState(false);
  return (
    <Modal
      open={isVisible}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <AddLiquidityComp
        isVisible={isVisible}
        handleClose={handleClose}
        closeBtn={true}
      />
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
