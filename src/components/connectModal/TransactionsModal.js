import React from 'react';
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../../assets/Logo.png";
import Check from "../../assets/tick.png";
import Share from "../../assets/share.png";
import Modal from "@mui/material/Modal";
import "./ConfirmModal.css";
import "./transactionsModal.css";




function TransactionsModal({status,changeStatus}) {
    return (

        <Modal
            open={status}
            onClose={()=>changeStatus(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
          
            <div className="rm-liq-div" style={{marginBottom:'30px',padding:'35px'}}>
         
          <img className="rm-liq-Logo" src={Logo}></img> <br></br>
          <div className="rm-liq-heading" style={{fontSize:'30px',marginTop:'20px'}}>Transaction history</div>
    
          <div
            style={{
              cursor: "pointer",
              position: "absolute",
              right: "25px",
              top: "25px",
              padding: "5px",
            }}
          >
            <span>
              <CloseIcon onClick={()=>changeStatus(false)} />
            </span>
          </div>
    

            <div className='transactions-div'>


              <div className='trans-div-child'>
                
                <div><img src={Check} style={{height:'fit-Content'}}></img></div>

                <div>Unstaked! Your earnings has been harvested to your wallet</div>
                
                <div style={{marginLeft:'auto'}}><img src={Share} style={{height:'fit-Content'}}></img></div>

              </div>

              <div className='trans-divider'></div>

              <div className='trans-div-child'>
                
                <div><img src={Check} style={{height:'fit-Content'}}></img></div>

                <div>Unstaked! Your earnings has been harvested to your wallet</div>
                
                <div style={{marginLeft:'auto'}}><img src={Share} style={{height:'fit-Content'}}></img></div>

              </div>

              <div className='trans-divider'></div>

              <div className='trans-div-child'>
                
                <div><img src={Check} style={{height:'fit-Content'}}></img></div>

                <div>Unstaked! Your earnings has been harvested to your wallet</div>
                
                <div style={{marginLeft:'auto'}}><img src={Share} style={{height:'fit-Content'}}></img></div>

              </div>

              <div className='trans-divider'></div>

              <div className='trans-div-child'>
                
                <div><img src={Check} style={{height:'fit-Content'}}></img></div>

                <div>Unstaked! Your earnings has been harvested to your wallet</div>
                
                <div style={{marginLeft:'auto'}}><img src={Share} style={{height:'fit-Content'}}></img></div>

              </div>

              <div className='trans-divider'></div>

              <div className='trans-div-child'>
                
                <div><img src={Check} style={{height:'fit-Content'}}></img></div>

                <div>Unstaked! Your earnings has been harvested to your wallet</div>
                
                <div style={{marginLeft:'auto'}}><img src={Share} style={{height:'fit-Content'}}></img></div>

              </div>

              <div className='trans-divider'></div>


              <div className='trans-div-child'>
                
                <div><img src={Check} style={{height:'fit-Content'}}></img></div>

                <div>Unstaked! Your earnings has been harvested to your wallet</div>
                
                <div style={{marginLeft:'auto'}}><img src={Share} style={{height:'fit-Content'}}></img></div>

              </div>

              <div className='trans-divider'></div>


              <div className='trans-div-child'>
                
                <div><img src={Check} style={{height:'fit-Content'}}></img></div>

                <div>Unstaked! Your earnings has been harvested to your wallet</div>
                
                <div style={{marginLeft:'auto'}}><img src={Share} style={{height:'fit-Content'}}></img></div>

              </div>

              <div className='trans-divider'></div>


              <div className='trans-div-child'>
                
                <div><img src={Check} style={{height:'fit-Content'}}></img></div>

                <div>Unstaked! Your earnings has been harvested to your wallet</div>
                
                <div style={{marginLeft:'auto'}}><img src={Share} style={{height:'fit-Content'}}></img></div>

              </div>

              <div style={{height:'30px',width:'100%'}}></div>

            </div>


           
        </div>

        
        </Modal>
      );
}

export default TransactionsModal
