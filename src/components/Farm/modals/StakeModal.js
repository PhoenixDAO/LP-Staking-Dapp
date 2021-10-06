import React from 'react';
import './stakeModal.css';
import Logo from'../../../assets/Logo.png'


function StakeModal({Close}) {
    return (
        <div className='stakingModal'>
            <img className='stakingModalLogo' src={Logo}></img>

            <div className='stakingModalHeading'>Stake LP Token</div>

            <div style={{display:'flex',alignItem:'center'}}>
                <div className='stakingModal-details'>STAKE</div>
                <div style={{marginLeft:'auto'}} className='stakingModal-details'>Bal: <span style={{color:'#000'}}>456,467.77 PHNX-ETH LP</span></div>
            </div>

            <div style={{display:'flex',marginTop:'10px',alignItems:'center'}}>
                <input type='number' placeholder='0.0' className='stakingModalInput'></input>
                <button className='stakingModalInputBtn'>max</button>
            </div>

            <div style={{display:'flex', alignItems:'center',marginTop:'13px'}}>
                <div className='stakingModal-details' style={{marginTop:'0px'}}>Annual ROI at current rates:</div>
                <div className='stakingModal-details' style={{marginLeft:'auto',marginTop:'0px'}}>$0.00</div>
            </div>

            <div style={{display:'flex',alignItems:'center'}}>
                <button className='farm-btn-stake-outline' style={{marginTop:'25px'}} onClick={()=>Close()}>Close</button>
                <button className='farm-btn-stake-outline stakingModalConfirm' style={{marginLeft:'auto',marginTop:'25px'}}>Confirm</button>
            </div>
            
            <div className='get-phnx-eth-lp' style={{marginTop:'25px',fontWeight:'bold',fontSize:'12px'}}>Get PHNX-ETH LP</div>

        </div>
    )
}

export default StakeModal
