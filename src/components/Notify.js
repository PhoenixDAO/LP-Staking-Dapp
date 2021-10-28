import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from '@mui/icons-material/Error';

function Notify({ text, severity }) {
  return (
    <div className="notify2" style={{borderRadius:"9px"}}>
      <div style={{ width: "100%" }}>
        {severity == "success" ? (
          <CheckCircleIcon
            style={{ height: "60px", width: "60px", color: "#413AE2" }}
          />
        ) : (
          <ErrorIcon
            style={{ height: "60px", width: "60px", color: "#F43C3C" }}
          />
        )}
      </div>
      <div
        style={{
          fontSize: "16px",
          fontFamily: "Aeonik",
          textAlign: "center",
          margin: "9px",
          marginBottom: "15px",
          color:"#000"
        }}
      >
        {text}
      </div>
    </div>
  );
}

export default Notify;
