import React from 'react';
import "./farm.css";
import FarmStake from "./FarmStake/FarmStake";
import FarmHarvest from './FarmHarvest/FarmHarvest';
import { useState , useEffect } from 'react';
import { Modal } from "@mui/material";
import StakingModal from './modals/StakeModal';
import UnStakingModal from './modals/UnstakeModal';
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { abi as PhnxStakeAbi } from "../../contract/abi/PHXStakeABI.json";
import { PHNX_LP_STAKING_CONTRACT_ADDRESS_RINKEBY } from '../../contract/constant';


function Farm() {

    const[stakeNull,checkStateNull] = useState(false);
    const [isStackVisible, setStackVisible] = useState(false);
    const [isUnStackVisible, setUnStackVisible] = useState(false);

    const web3context = useWeb3React();

    const handleStackOpen = () => {
    setStackVisible(true);
    };

    const handleStackClose = () => {
    setStackVisible(false);
    };

    const handleUnStackOpen = () => {
    setUnStackVisible(true);
    };

    const handleUnStackClose = () => {
    setUnStackVisible(false);
    };

    useEffect(()=>{

        const web3 = new Web3(web3context?.library?.currentProvider);
        const contract = new web3.eth.Contract(
            PhnxStakeAbi,
            PHNX_LP_STAKING_CONTRACT_ADDRESS_RINKEBY
        );

        console.log(contract.methods);



    },[]);

    return (
        <div>
            <div className="farm-div">
               
                {   
                    stakeNull ? 
                    <FarmStake stakeModalOpen={handleStackOpen}></FarmStake> :
                    <FarmHarvest 
                    stakeModalOpen={handleStackOpen} 
                    UnstakeModalOpen={handleUnStackOpen}
                    ></FarmHarvest> 
                }
                
            </div>
            <br></br>
            <br></br>
            <br></br>


            <Modal
            open={isStackVisible}
            onClose={handleStackClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <StakingModal Close={handleStackClose}></StakingModal>

            </Modal>

            <Modal
            open={isUnStackVisible}
            onClose={handleUnStackOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <UnStakingModal Close={handleUnStackClose}></UnStakingModal>

            </Modal>


        </div>
    )
}

export default Farm
