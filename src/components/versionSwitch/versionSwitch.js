import React, { useState } from "react";
import VersionModal from "../connectModal/VersionModal";
import "../../App.css";

const VersionSwitch = ({ isSidebarOpen }) => {
  const [modalStatus, setModalStatus] = useState(false);

  return (
    <>
      <div className="versionButtons">
        {isSidebarOpen && (
          <div
            className="versionSingleButton"
            style={{
              backgroundColor: "#fff",
              color: "#000",
              "@media (max-width:500px)": {
                padding: "5px 15px",
              },
            }}
            onClick={() => setModalStatus(!modalStatus)}
          >
            V1
          </div>
        )}
        <div
          className="versionSingleButton"
          style={{
            backgroundColor: "#413AE2",
            color: "#fff",
            "@media (max-width:500px)": {
              padding: "5px 15px",
            },
          }}
          onClick={() => setModalStatus(!modalStatus)}
        >
          V2
        </div>
      </div>
      <VersionModal status={modalStatus} setStatus={setModalStatus} />
    </>
  );
};

export default VersionSwitch;
