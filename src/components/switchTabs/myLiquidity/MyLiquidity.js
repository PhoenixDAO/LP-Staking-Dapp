import React from "react";

import "./myLiquidity.css";
import PhnxLogo from "../../../assets/phnxLogo.png";
import EthLogo from "../../../assets/ETH1.png";
import SettingsLogo from "../../../assets/settings.png";
import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Modal } from "@mui/material";
import RemoveLiquidityModal from "../../removeLiquidityComponent/RemoveLiquidityModal";
import ConnectWallet from "../../ConnectWallet";
import {
  Button,
  // InputAdornment,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { GetPoolPositionAction } from "../../../redux/actions/contract.actions";

function MyLiquidity({ ChangeTab }) {
  const web3context = useWeb3React();
  const dispatch = useDispatch();

  const poolPosition = useSelector(
    (state) => state.contractReducer.poolPosition
  );
  const contractUniswapPair = useSelector(
    (state) => state.contractReducer.contractUniswapPair
  );

  const [isModalVisible, setModalVisible] = useState(false);

  const[ConnectWalletModalStatus,setConnectWalletModalStatus] = useState(false);

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    if (contractUniswapPair) {
      console.log('asdasdasdadasd1111111')
      dispatch(GetPoolPositionAction(web3context, contractUniswapPair));
    }
  }, [web3context.active, contractUniswapPair]);

  return (
    <div className="my-liquidity-div">
      <div className="my-liq-head">My Liquidity</div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="my-liq-sub-head">
          Remove Liquidity to recieve tokens back
        </div>
        <img
          src={SettingsLogo}
          style={{ marginLeft: "auto", height: "20px", width: "20px" }}
        ></img>
      </div>

      <div className="divider"></div>

      {

        !web3context.account ?
                
        <div>
          <br></br>

          <div className="phnx-eth">
            <p className="phnx-eth-no" style={{width:'100%',textAlign:'center',fontWeight:'400'}}>Connect Wallet.</p>
          </div>

          <Button
                variant="contained"
                size="small"
                fullWidth={true}
                style={{
                  backgroundColor: "#413AE2",
                  margin: "25px 0px 30px 0px",
                  height: 45,
                  borderRadius: 12,
                }}
                
                onClick={()=>setConnectWalletModalStatus(!ConnectWalletModalStatus)}
              >
                {"Connect Wallet"}
            </Button>

            <br></br><br></br><br></br>

            <ConnectWallet justModal={true} openModal={ConnectWalletModalStatus}></ConnectWallet>


        </div>

        :

        poolPosition == null ?
          <div>
            <br></br>

            <div className="phnx-eth">
              <p className="phnx-eth-no" style={{width:'100%',textAlign:'center',fontWeight:'400'}}>No Liquidity Found.</p>
            </div>

            <Button
                  variant="contained"
                  size="small"
                  fullWidth={true}
                  style={{
                    backgroundColor: "#413AE2",
                    margin: "25px 0px 30px 0px",
                    height: 45,
                    borderRadius: 12,
                  }}
                  onClick={() => {
                    ChangeTab("addLiquidity");
                  }}
                  
                >
                  {"Add Liquidity"}
              </Button>

              <br></br><br></br><br></br>

              <ConnectWallet justModal={true} openModal={ConnectWalletModalStatus}></ConnectWallet>


          </div>
        :
        // poolPosition !== null ?
        poolPosition.lp == 0 ?

        <div>
          <br></br>

          <div className="phnx-eth">
            <p className="phnx-eth-no" style={{width:'100%',textAlign:'center',fontWeight:'400'}}>No Liquidity Found.</p>
          </div>

          <Button
                variant="contained"
                size="small"
                fullWidth={true}
                style={{
                  backgroundColor: "#413AE2",
                  margin: "25px 0px 30px 0px",
                  height: 45,
                  borderRadius: 12,
                }}
                onClick={() => {
                  ChangeTab("addLiquidity");
                }}
                
              >
                {"Add Liquidity"}
            </Button>

            <br></br><br></br><br></br>

            <ConnectWallet justModal={true} openModal={ConnectWalletModalStatus}></ConnectWallet>


        </div>
        :

        <div>

            <div className="phnx-eth">
                    <p className="phnx-eth-no">{poolPosition.lp}</p>
                    <img src={PhnxLogo} className="phnx-eth-logo"></img>
                    <img src={EthLogo} className="phnx-eth-logo"></img>
                  </div>

                  <div className="phnx-eth-txt">PHNX/ETH</div>

                  <br />

                  <div className="pooled-item">
                    <div className="pooled-item-txt">pooled phnx</div>

                    <div style={{ display: "flex", marginLeft: "auto" }}>
                      <img src={EthLogo} className="phnx-eth-logo"></img> &nbsp;
                      <div className="pooled-item-txt">{poolPosition.phnx}</div>
                    </div>
                  </div>

                  <br />

                  <div className="pooled-item">
                    <div className="pooled-item-txt">pooled eth</div>

                    <div style={{ display: "flex", marginLeft: "auto" }}>
                      <img src={PhnxLogo} className="phnx-eth-logo"></img> &nbsp;
                      <div className="pooled-item-txt">{poolPosition.eth}</div>
                    </div>
                  </div>

                  <br />

                  <div className="pooled-item">
                    <div className="pooled-item-txt">pool share</div>

                    <div style={{ display: "flex", marginLeft: "auto" }}>
                      <div className="pooled-item-txt">{poolPosition.poolPerc}%</div>
                    </div>
                  </div>

                  <button className="remove-btn" onClick={() => {handleModalOpen()}}>
                    Remove
                  </button>

                  <button
                    className="add-liquidity-btn"
                    onClick={() => {
                      ChangeTab("addLiquidity");
                    }}
                  >
                    Add Liquidity
                  </button>

        </div>
        
      }
      {isModalVisible ? (
        <Modal
          open={isModalVisible}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <RemoveLiquidityModal ></RemoveLiquidityModal>
        </Modal>
      ) : null}
    </div>
  );
}

export default MyLiquidity;
