import React from 'react';
import "./farm.css";
import FarmStake from "./FarmStake/FarmStake";
import FarmHarvest from './FarmHarvest/FarmHarvest';
import { useState } from 'react';
import { Modal } from "@mui/material";
import StakingModal from './modals/StakeModal';
import UnStakingModal from './modals/UnstakeModal';

function Farm() {

    const[stakeNull,checkStateNull] = useState(true);
    const [isStackVisible, setStackVisible] = useState(false);
    const [isUnStackVisible, setUnStackVisible] = useState(false);


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
