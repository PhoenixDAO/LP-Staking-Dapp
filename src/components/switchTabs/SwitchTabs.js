import React from "react";
import { useState } from "react";

import "./SwitchTabs.css";
import LiquidityModal from "../addLiquidityComponent";
import MyLiquidity from "./myLiquidity/MyLiquidity";
import VersionSwitch from "../versionSwitch/versionSwitch";

function SwitchTabs() {
  const [currentTab, setCurrentTab] = useState("addLiquidity");

  const ChangeTab = (tab) => {
    if (tab === "addLiquidity") {
      setCurrentTab("addLiquidity");
    } else {
      setCurrentTab("myLiquidity");
    }
  };

  return (
    <div>
    <div style={{ paddingBottom: "50px" }}>
      <div className="switch-tabs-div">
        <div
          onClick={() => ChangeTab("addLiquidity")}
          className="switch-tabs-btns"
          style={{
            background: currentTab === "addLiquidity" ? "#413AE2" : "#fff",
            color: currentTab === "addLiquidity" ? "#fff" : "#73727D",
          }}
        >
          Add Liquidity
        </div>
        <div
          onClick={() => ChangeTab("myLiquidity")}
          className="switch-tabs-btns"
          style={{
            background: currentTab === "myLiquidity" ? "#413AE2" : "#fff",
            color: currentTab === "myLiquidity" ? "#fff" : "#73727D",
          }}
        >
          My Liquidity
        </div>
      </div>

      {currentTab === "addLiquidity" ? (
        <div className="liq-modal-res">
          <div>
            <LiquidityModal componentName="addLiquidity" closeBtn={false} />
          </div>
        </div>
      ) : (
        <MyLiquidity ChangeTab={ChangeTab} />
      )}
    </div>

    </div>
  );
}

export default SwitchTabs;
