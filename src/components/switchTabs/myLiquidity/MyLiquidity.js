import React from "react";

import "./myLiquidity.css";
import PhnxLogo from "../../../assets/phnxLogo.png";
import EthLogo from "../../../assets/ETH1.png";
import SettingsLogo from "../../../assets/settings.png";
import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { UNISWAP_V2_PHNX_ETH_PAIR_ADDRESS_RINKEBY } from "../../../contract/constant";
import { abi } from "../../../contract/abi/UniswapV2PairABI.json";
import BigNumber from "bignumber.js";
import { Modal } from "@mui/material";
import RemoveLiquidityModal from "../../removeLiquidityComponent/RemoveLiquidityModal";
import ConnectWallet from "../../ConnectWallet";
import {
  Button,
  // InputAdornment,
} from "@mui/material";

function MyLiquidity({ ChangeTab }) {
  const [poolPosition, setPoolPosition] = useState({
    lp: 0,
    poolPerc: 0,
    eth: 0,
    phnx: 0,
  });

  const [isModalVisible, setModalVisible] = useState(false);

  const[ConnectWalletModalStatus,setConnectWalletModalStatus] = useState(false);

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const web3context = useWeb3React();
  useEffect(() => {
    if (web3context.active && web3context.account) {
      getPoolPosition();
      //   checkApproval();
      //   calculateLpToken(0.95904, 99.8915);
    }
  }, [web3context.account]);

  const getPoolPosition = async () => {
    const web3 = new Web3(web3context?.library?.currentProvider);
    const uniswapV2PairContract = new web3.eth.Contract(
      abi,
      UNISWAP_V2_PHNX_ETH_PAIR_ADDRESS_RINKEBY
    );
    const balanceOf = await uniswapV2PairContract.methods
      .balanceOf(web3context.account)
      .call();
    const getReserves = await uniswapV2PairContract.methods
      .getReserves()
      .call();
    const totalSupply = await uniswapV2PairContract.methods
      .totalSupply()
      .call();

    let _balance = new BigNumber(balanceOf);
    // console.log("_balance", _balance);
    let _totalSupply = new BigNumber(totalSupply);
    const _reserve0 = new BigNumber(getReserves._reserve0);
    const _reserve1 = new BigNumber(getReserves._reserve1);
    const _ratio = _reserve0.dividedBy(_reserve1);

    let _poolPercentage = _balance.dividedBy(_totalSupply).multipliedBy(100);

    let _token0 = _balance.pow(2).dividedBy(_ratio).squareRoot();
    let _token1 = _balance.pow(2).dividedBy(_token0);

    const conv = new BigNumber("1e+18");

    _balance = _balance.dividedBy(conv);
    _token0 = _token0.dividedBy(conv);
    _token1 = _token1.dividedBy(conv);

    setPoolPosition({
      lp: _balance.toFixed(2),
      poolPerc: _poolPercentage.toFormat(6),
      eth: _token1.toFormat(6),
      phnx: _token0.toFormat(6),
    });
  };

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


        {
          isModalVisible ? 
          
          <Modal
            open={isModalVisible}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
           
           <RemoveLiquidityModal></RemoveLiquidityModal>

          </Modal>
          
          : null

          
        }

        



    </div>
  );
}

export default MyLiquidity;
