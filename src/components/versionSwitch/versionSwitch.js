import React , {useState} from 'react';
import VersionModal from '../connectModal/VersionModal';


function VersionSwitch() {

    const[modalStatus,setModalStatus] = useState(false);

    return (
        <>
            <div style={{cursor:'pointer',position:'fixed',display:'flex',bottom:'20px',left:'100px',backgroundColor:'#fff',borderRadius:'7px',padding:'2px'}}>
                <div style={{backgroundColor:'#fff',padding:'5px 15px',color:'#000',borderRadius:'7px'}} onClick={()=>setModalStatus(!modalStatus)}>
                    V1
                </div>
                <div style={{backgroundColor:'#413AE2',padding:'5px 15px',color:'#fff',borderRadius:'7px'}}>
                    V2
                </div>
            </div>
            <VersionModal status={modalStatus} setStatus={setModalStatus}/>
        </>
    )
}

export default VersionSwitch
