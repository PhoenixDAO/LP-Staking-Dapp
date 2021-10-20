import React , {useState} from 'react';
import VersionModal from '../connectModal/VersionModal';
import "../../App.css";


function VersionSwitch() {

    const[modalStatus,setModalStatus] = useState(false);

    return (
        <>
            <div className="versionButtons">
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
