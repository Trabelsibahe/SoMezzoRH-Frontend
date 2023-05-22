import React from "react";
import EMPheader from "../../components/headers/emp_header";
import RRHheader from "../../components/headers/rrh_header";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Navigation from "../../components/navigation";
import "../../assets/styles/espace_sante.css"
import { Button, TextField } from "@mui/material";

const style = {
    'label.Mui-focused': {
        color: '#2b2b2b;',
      },
      '.MuiOutlinedInput-root': {
        '&:hover fieldset': {
          borderColor: '#2b2b2b;',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'rgba(36, 55, 123, 0.9)',
        },
      }
    }
function Espace_Sante() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const CurrentUser = {
    isConnected: auth.isConnected,
    nom: auth.user.nom,
    prenom: auth.user.prenom,
    matricule: auth.user.matricule,
    role: auth.user.role,
    operation: auth.user.operation,
    active: auth.user.active,
  };

  return (
    <div className="emp_page">
      <Navigation user={CurrentUser} />
      <div className="emp_container">
        <div className="page_name">
          Pages / Mon espace{" "}
          <p style={{ fontWeight: "bold", fontSize: "14px" }}>
            Espace Santé
          </p>
        </div>
        {CurrentUser.role==="EMP" ? <EMPheader /> : <RRHheader/>}
        <div className="rrh_body">
            <p className="rrh_info">Espace Santé: Rendez-vous médicaux</p>

            <div className="espace_sante">
                <div className="espace_sante_background">
                <h3 className="espace_sante_title">La prochaine visite médicale est prévue le 22 Juillet</h3>
                    <form className="espace_sante_form">
                        <p className="espace_sante_formtitle">Réservez votre visite médicale dès maintenant.</p>
                        <TextField sx={style} label="Maladie" type="text" margin="normal" autoComplete="off" required/>{" "}
                        <TextField sx={style} label="Commentaire" type="text"  margin="normal" autoComplete="off"/>
                        <p>{" "}</p>
                        <button className="espace_sante_btn" variant="outlined">Demander le rendez-vous</button>
                    </form>
                </div>
            </div>

        </div>
        <div style={{ padding: "2em", textAlign: "center" }}>
          <p className="welcome_footer">Tous droits réservés - SoMezzo</p>
        </div>
      </div>
    </div>
  );
}

export default Espace_Sante;
