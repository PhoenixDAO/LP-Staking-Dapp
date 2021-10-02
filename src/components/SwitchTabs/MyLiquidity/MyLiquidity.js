import React from 'react';

import './myLiquidity.css';
import PhnxLogo from '../../../assets/phnxLogo.png';
import EthLogo from '../../../assets/ETH.png';
import SettingsLogo from '../../../assets/settings.png';


function MyLiquidity() {
    return (
        <div className='my-liquidity-div'>
        
            <div className='my-liq-head'>My Liquidity</div>
        
            <div style={{display:'flex', alignItems:'center'}}>

                <div className='my-liq-sub-head'>Remove Liquidity to recieve tokens back</div>
                <img src={SettingsLogo} style={{marginLeft:'auto',height:'20px',width:'20px'}}></img>

            </div>

            <div className='divider'></div>

            <div className='phnx-eth'>
                <p className='phnx-eth-no'>0.54321</p>
                <img src={EthLogo} className='phnx-eth-logo'></img>
                <img src={PhnxLogo} className='phnx-eth-logo'></img>
            </div>

            <div className='phnx-eth-txt'>PHNX/ETH</div>

            <br/>

            <div className='pooled-item'>

                <div className='pooled-item-txt'>pooled phnx</div>
                
                <div style={{display:'flex' , marginLeft:'auto'}}>
                    <img src={EthLogo} className='phnx-eth-logo'></img> &nbsp;
                    <div className='pooled-item-txt'>0.231</div>
                </div>

            </div>

            <br/>

            <div className='pooled-item'>

                <div className='pooled-item-txt'>pooled eth</div>

                <div style={{display:'flex' , marginLeft:'auto'}}>
                    <img src={PhnxLogo} className='phnx-eth-logo'></img> &nbsp;
                    <div className='pooled-item-txt'>0.653232</div>
                </div>

            </div>

            <br/>

            <div className='pooled-item'>

                <div className='pooled-item-txt'>pool share</div>

                <div style={{display:'flex' , marginLeft:'auto'}}>
                    <div className='pooled-item-txt'>&#60;0.01%</div>
                </div>

            </div>
            
            
            <button className='remove-btn'>Remove</button>

            <button className='add-liquidity-btn'>Add Liquidity</button>

        </div>
    )
}

export default MyLiquidity
