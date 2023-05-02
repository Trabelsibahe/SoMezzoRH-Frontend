import React from 'react'
import Navigation from "../components/navigation";
import { useSelector, useDispatch } from "react-redux";
import { Divider } from '@mui/material';

function MynotificationsPage() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();



  const CurrentUser = {
    isConnected: auth.isConnected,
    nom: auth.user.nom,
    prenom: auth.user.prenom,
    matricule: auth.user.matricule,
    role: auth.user.role,
    operation: auth.user.operation,
    active: auth.user.active
  };

  return (
    <div className='rrh_page'>
            <Navigation user={CurrentUser} />

      <div className='rrh_container'>
      <div className="page_name">
          Pages / Notifications{" "}
          <p style={{ fontWeight: "bold", fontSize: "14px" }}>
            Mes notifications
          </p>
        </div>
      <div className='rrh_body'>
        <h4 className='rrh_info'>Mes notifications</h4>
        <p className='rrh_info'>Rècent</p>
        
       <p style={{textAlign:"center"}}>No new notifications.</p>

        <Divider/>

        <p className='rrh_info'>Tout</p>

        <p style={{textAlign:"center"}}>No new notifications.</p>


      </div>
      <div style={{ padding: "2em", textAlign: "center" }}>
          <p className="welcome_footer">Tous droits réservés - SoMezzo</p>
        </div>
      </div>
    </div>
  )
}

export default MynotificationsPage