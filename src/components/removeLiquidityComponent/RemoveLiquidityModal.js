import React from "react";
import "./removeLiquidity.css";
import { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import RemoveLiquidityComponent from "./index";

const RemoveLiquidityModaL = () => {

  const [selectedPercentage,setSelectedPercentage] = useState(0);

  return (
    <div className='rm-liq-div'>
       <img className='rm-liq-Logo' src={Logo}></img>
      <div className='rm-liq-heading'>Remove PHNX-ETH Liquidity</div>

      <div className='rm-liq-ps-div'>

        <div className='rm-liq-ps' style={{backgroundColor: selectedPercentage===25 ? '#413AE2' : '#eee', color: selectedPercentage===25 ? '#fff' : '#000'}} onClick={()=>{setSelectedPercentage(25)}}>25%</div>
        <div className='rm-liq-ps' style={{backgroundColor: selectedPercentage===50 ? '#413AE2' : '#eee', color: selectedPercentage===50 ? '#fff' : '#000'}} onClick={()=>{setSelectedPercentage(50)}}>50%</div>
        <div className='rm-liq-ps' style={{backgroundColor: selectedPercentage===75 ? '#413AE2' : '#eee', color: selectedPercentage===75 ? '#fff' : '#000'}} onClick={()=>{setSelectedPercentage(75)}}>75%</div>
        <div className='rm-liq-ps' style={{backgroundColor: selectedPercentage===100 ? '#413AE2' : '#eee', color: selectedPercentage===100 ? '#fff' : '#000'}} onClick={()=>{setSelectedPercentage(100)}}>Max</div>

      </div>

      <div className='rm-liq-ps-input-div'>
        <input className='rm-liq-ps-input' placeholder='Enter a value'></input>
      </div>

      <div className='rm-liq-u-will-rec'>You will recieve</div>

      <div className='rm-liq-phnx-eth-det-div'>
       
        <div className='rm-liq-phnx-eth-det'>
          <img src={PhnxLogo} className='rm-liq-phnx-eth-img'></img>
          <div className='rm-liq-phnx-eth-name'>PHNX</div>
          <div className='rm-liq-phnx-eth-number'>0.653232</div>
        </div>

        <div style={{height:'10px'}}></div>

        <div className='rm-liq-phnx-eth-det'>
          <img src={EthLogo} className='rm-liq-phnx-eth-img'></img>
          <div className='rm-liq-phnx-eth-name'>ETH</div>
          <div className='rm-liq-phnx-eth-number'>0.231</div>
        </div>

      </div>

      <div className='rm-liq-phnx-eth-con-div'>

          <div className='rm-liq-phnx-eth-con'>1 PHNX = 0.2335 ETH</div>
          <div className='rm-liq-phnx-eth-con'>1 ETH = 0.3456665 PHNX</div>

      </div>

    </div>
  )const [selectedPercentage,setSelectedPercentage] = useState(0);

  return (
    <div className='rm-liq-div'>
       <img className='rm-liq-Logo' src={Logo}></img>
      <div className='rm-liq-heading'>Remove PHNX-ETH Liquidity</div>

      <div className='rm-liq-ps-div'>

        <div className='rm-liq-ps' style={{backgroundColor: selectedPercentage===25 ? '#413AE2' : '#eee', color: selectedPercentage===25 ? '#fff' : '#000'}} onClick={()=>{setSelectedPercentage(25)}}>25%</div>
        <div className='rm-liq-ps' style={{backgroundColor: selectedPercentage===50 ? '#413AE2' : '#eee', color: selectedPercentage===50 ? '#fff' : '#000'}} onClick={()=>{setSelectedPercentage(50)}}>50%</div>
        <div className='rm-liq-ps' style={{backgroundColor: selectedPercentage===75 ? '#413AE2' : '#eee', color: selectedPercentage===75 ? '#fff' : '#000'}} onClick={()=>{setSelectedPercentage(75)}}>75%</div>
        <div className='rm-liq-ps' style={{backgroundColor: selectedPercentage===100 ? '#413AE2' : '#eee', color: selectedPercentage===100 ? '#fff' : '#000'}} onClick={()=>{setSelectedPercentage(100)}}>Max</div>

      </div>

      <div className='rm-liq-ps-input-div'>
        <input className='rm-liq-ps-input' placeholder='Enter a value'></input>
      </div>

      <div className='rm-liq-u-will-rec'>You will recieve</div>

      <div className='rm-liq-phnx-eth-det-div'>
       
        <div className='rm-liq-phnx-eth-det'>
          <img src={PhnxLogo} className='rm-liq-phnx-eth-img'></img>
          <div className='rm-liq-phnx-eth-name'>PHNX</div>
          <div className='rm-liq-phnx-eth-number'>0.653232</div>
        </div>

        <div style={{height:'10px'}}></div>

        <div className='rm-liq-phnx-eth-det'>
          <img src={EthLogo} className='rm-liq-phnx-eth-img'></img>
          <div className='rm-liq-phnx-eth-name'>ETH</div>
          <div className='rm-liq-phnx-eth-number'>0.231</div>
        </div>

      </div>

      <div className='rm-liq-phnx-eth-con-div'>

          <div className='rm-liq-phnx-eth-con'>1 PHNX = 0.2335 ETH</div>
          <div className='rm-liq-phnx-eth-con'>1 ETH = 0.3456665 PHNX</div>

      </div>

    </div>
  )
};

export default RemoveLiquidityModaL;
