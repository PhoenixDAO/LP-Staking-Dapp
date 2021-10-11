import React , {useState,useEffect} from "react";
import './removeLiquidity.css';
import Logo from'../../assets/Logo.png';
import PhnxLogo from "../../assets/PhnxLogo1.png";
import EthLogo from "../../assets/ETH1.png";
import { useSelector, useDispatch } from "react-redux";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import Web3 from "web3";



const RemoveLiquidityModaL = () => {
  
  const [selectedPercentage,setSelectedPercentage] = useState(0);
  const [allowance,setAllowance] = useState(0);
  const contract = useSelector((state) => state.contractReducer.contractUniswapPair);
  const web3context = useWeb3React();

  const checkApproval = async () => {

    console.log(contract);

    const web3 = new Web3(web3context?.library?.currentProvider);
    
    let allowance1 = await contract.methods
      .allowance(web3context.account, "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D")
      .call();
    console.log("allowance", allowance1);
    setAllowance(allowance1);

  };

  useEffect(() => {
   checkApproval(); 
  })


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

      <button className='rm-liq-btn'>
        Approve PHNX
      </button>

      <div className="rm-liq-divider"></div>

      <div className='rm-liq-u-will-rec'>LP TOKENS IN YOUR WALLET</div>

      <div className="rm-liq-phnx-eth-lp-div">
          <img src={PhnxLogo}></img>
          <img src={EthLogo}></img>
          <div className="rm-liq-phnx-eth-lp-sub">PHNX/ETH LP</div>
          <div className="rm-liq-phnx-eth-lp-sub-no">0.54321</div>
      </div>

      <div className="rm-liq-phnx-eth-lp-div">
        <div className="rm-liq-phnx-eth-lp-sub">Pooled PHNX</div>
        <img src={EthLogo} style={{marginLeft:'auto'}}></img>
        <div className="rm-liq-phnx-eth-lp-sub-no" style={{marginLeft:'4px'}}>0.231</div>
      </div>

      <div className="rm-liq-phnx-eth-lp-div">
        <div className="rm-liq-phnx-eth-lp-sub">Pooled ETH</div>
        <img src={PhnxLogo} style={{marginLeft:'auto'}}></img>
        <div className="rm-liq-phnx-eth-lp-sub-no" style={{marginLeft:'4px'}}>0.2653232</div>
      </div>

      <div className="rm-liq-phnx-eth-lp-div" style={{marginTop:'7px'}}>
        <div className="rm-liq-phnx-eth-lp-sub">Pooled Share</div>
        <div className="rm-liq-phnx-eth-lp-sub-no" >0.01%</div>
      </div>

      <br></br>


    </div>
  )
}

export default RemoveLiquidityModaL;
