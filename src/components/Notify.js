import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';


function Notify({ text, severity }) {
	
		return (
			<div className="notify2" style={{}}>
				
				<div style={{width:'100%'}}>
					{severity == 'success'?
						<CheckCircleIcon style={{height:'80px',width:'80px' , color:'#413AE2'}}/>
						:
						<InfoIcon style={{height:'80px',width:'80px' , color:'#F43C3C'}}/>
					}
				</div>
				<div style={{fontSize:'20px',fontFamily:'Aeonik',textAlign:'center',margin:'9px',marginBottom:'15px'}}>
					{text}
				</div>
			</div>
		);
	
	
}




export default Notify;
