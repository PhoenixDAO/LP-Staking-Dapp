import React , {useState,useEffect} from "react";
import './removeLiquidity.css';
import Logo from'../../assets/Logo.png';
import PhnxLogo from "../../assets/PhnxLogo1.png";
import EthLogo from "../../assets/ETH1.png";
import { useSelector, useDispatch } from "react-redux";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import BigNumber from "bignumber.js";
import { UNISWAP_V2_PHNX_ETH_PAIR_ADDRESS_RINKEBY } from "../../contract/constant";
import { abi } from "../../contract/abi/UniswapV2PairABI.json";
import { abi as abi2} from "../../contract/abi/UniswapV2Router02ABI.json"




const RemoveLiquidityModaL = () => {
  
  const [selectedPercentage,setSelectedPercentage] = useState(0);
  const [allowance,setAllowance] = useState(0);
  const contract = useSelector((state) => state.contractReducer.contractUniswapPair);
  const contract1 = useSelector((state) => state.contractReducer.contractUniswapRouter);

  const web3context = useWeb3React();

  const [poolPosition, setPoolPosition] = useState({
    lp: 0,
    poolPerc: 0,
    eth: 0,
    phnx: 0,
  });

  const checkApproval = async () => {

    if(contract){
      console.log(contract);

      const web3 = new Web3(web3context?.library?.currentProvider);
      
      let allowance1 = await contract.methods
        .allowance(web3context.account, "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D")
        .call();
      console.log("allowance", allowance1);
      setAllowance(allowance1);
    }
    
  };

  const giveApproval = async () => {

    contract.methods
      .approve("0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", Web3.utils.toWei("1000000000000000000000000000000000000000000000000000"))
      .send({ from: web3context.account })
      .on("transactionHash", (hash) => {
        // hash of tx
        console.log("tx hash", hash);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        if (confirmationNumber === 2) {
          // tx confirmed
          checkApproval();
        }
      })
      .on("error", function (err) {});
  };

  const removeLiquidity = async () => {
    
    console.log(contract1);
    let deadline = Date.now();
    deadline += 20 * 60;

    const ethValue = poolPosition.eth;
    const phnxValue = poolPosition.phnx;
    let phnxMin = phnxValue - phnxValue * 0.2;
    let ethMin = ethValue - ethValue * 0.2;

    console.log((poolPosition.lp*(selectedPercentage/100)).toString());
    console.log(phnxMin.toString());
    console.log(ethMin.toString());


    await contract1.methods
      .removeLiquidityETH(
        "0xfe1b6abc39e46cec54d275efb4b29b33be176c2a", // address token,
        Web3.utils.toWei((poolPosition.lp*(selectedPercentage/100)).toString(), "ether"), //LP token
        Web3.utils.toWei(phnxMin.toString()), //uint amountTokenMin,
        Web3.utils.toWei(ethMin.toString()), // uint amountETHMin
        web3context.account, //address to,
        deadline //deadline
      )
      .send({
        from: web3context.account,
      })
      .on("transactionHash", (hash) => {
        // hash of tx
        console.log("hash", hash);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        if (confirmationNumber === 2) {
          console.log("confirmationNumber", confirmationNumber);
          // setLoading(false);
          // setPhnxValue("");
          // setEthValue("");
          // setPoolShare(0);
          if (web3context.active && web3context.account) {
            // getPoolPosition();
          }
        }
      })
      .on("error", function (err) {
        console.log("error", err);
      });
  };



  useEffect(() => {
   checkApproval(); 
  },[contract])

  useEffect(() => {
    if (web3context.active && web3context.account) {
      getPoolPosition();
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



  const handlePercentageInput = (e) => {

    if(e.target.value === '' || isNaN(e.target.value)) {
      setSelectedPercentage(parseInt(0))
    }else if(e.target.value > 100){
      setSelectedPercentage(100)
    }else{
      setSelectedPercentage(parseInt(e.target.value))
    }

  }

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
        <input className='rm-liq-ps-input' placeholder='Enter a value' value={selectedPercentage} onChange={(e)=>{handlePercentageInput(e)}}></input>
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

      { allowance === 0 ? 
        
        <button className='rm-liq-btn'  onClick={()=>giveApproval()}>
          Approve PHNX
        </button>

        :

        <button className='rm-liq-btn' onClick={()=>removeLiquidity()}>
          Remove Liquidity
        </button>
      
       }
      

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
