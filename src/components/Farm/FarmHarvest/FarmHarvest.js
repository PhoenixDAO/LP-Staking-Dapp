import React from 'react';
import "../FarmStake/farmStake.css";
import PhnxLogo from '../../../assets/phnxLogo.png';
import EthLogo from '../../../assets/ETH.png';
import DropDownLogo from '../../../assets/dropdown.png';
import DropUpLogo from '../../../assets/dropup.png';

import {useState} from 'react';

function FarmHarvest({stakeModalOpen,UnstakeModalOpen}) {

    const[showMore,setShowMore]=useState(false);
    

    return (
        <div>
            
            <div className='farm-heading'>Farm</div>
            <div className='farm-sub-heading'>Stake LP Tokens to earn</div>
            
            <div className='farm-divider'></div>

            <div className='farm-phnx-eth'>
                <div>
                    <img src={EthLogo} className='farm-phnx-eth-logo'></img>
                    <img src={PhnxLogo} className='farm-phnx-eth-logo' style={{marginLeft:'-15px'}}></img>
                </div>
                <div style={{marginLeft:'auto',fontWeight:'bold'}}>PHNX/ETH</div>
            </div>


            <div className='farm-details-div'>
                <div className='farm-details-txt'>APR</div>
                <div className='farm-details-txt-right'>200%</div>
            </div>

            <div className='farm-details-div'>
                <div className='farm-details-txt'>EARN</div>
                <div className='farm-details-txt-right'>PHNX + fees</div>
            </div>

            <div className='farm-details-div'>
                <div className='farm-details-txt'><span style={{color:'#413AE2'}}>PHNX</span> EARNED</div>
                <div className='farm-details-txt-right'>0.000</div>
            </div>

            <div className='farm-details-div'>
                <div className='farm-details-txt'><span style={{color:'#413AE2'}}>PHNX-ETH</span> LP STAKED</div>
                <div className='farm-details-txt-right'>0.000</div>
            </div>

            <div style={{display:'flex',alignItems:'center'}}>
                <button className='farm-btn-stake-outline' onClick={()=>UnstakeModalOpen()}> - Remove Liquidity</button>
                <button className='farm-btn-stake-outline' style={{marginLeft:'auto'}} onClick={()=>stakeModalOpen()}> + Add Liquidity</button>
            </div>

            <button className='farm-btn-stake' style={{marginTop:'20px'}}>Harvest</button>

            <div className='get-phnx-eth-lp'>Get PHNX-ETH LP</div>

            <div className='farm-divider'></div>

            {
                showMore === false ?

                    <div className='get-phnx-eth-lp' onClick={()=>setShowMore(true)} style={{cursor:'pointer'}} >See More <img src={DropDownLogo} ></img></div>

                :

                <div>

                    <div className='get-phnx-eth-lp' onClick={()=>setShowMore(false)} style={{cursor:'pointer'}} >Hide Details <img src={DropUpLogo}></img></div>
                    
                    <div className='farm-details-div'>
                        <div className='farm-details-txt'>Total Liquidity</div>
                        <div className='farm-details-txt-right'>$540.023</div>
                    </div>

                    <div className='farm-details-div'>
                        <div className='farm-details-txt'><span style={{color:'#413AE2'}}>View Contract</span></div>
                        
                    </div>

                    <div className='farm-details-div'>
                        <div className='farm-details-txt'><span style={{color:'#413AE2'}}>See Pair Info</span></div>
                        
                    </div>

                </div>


                
            }

            


        </div>
    )
}

export default FarmHarvest
