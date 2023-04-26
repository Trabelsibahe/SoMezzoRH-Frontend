import "../../assets/styles/employe.css";

import React from "react";
import Navigation from "../../components/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { GetAbsence, AddAbsence } from "../../actions/absence.action";
import AbsencesPage from "../absences";
import { Navigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function EmployePage() {
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

    <div className="emp_page">
      <Navigation user={CurrentUser} />
      <div className="emp_container">
        <div className="page_name">
          Pages / Mon espace{" "}
          <p style={{ fontWeight: "bold", fontSize: "14px" }}>
            Espace Employé(e)
          </p>
        </div>
        <div className="emp_header">
          <p className="emp_header_title">
            Bienvenue {CurrentUser.nom} {CurrentUser.prenom} !
          </p>
          <p className="emp_header_semititle">
            Votre opération est : {CurrentUser.operation}
          </p>
        </div>

        <div className="emp_body">
          <Button href="/absences">Mes absences</Button>
        </div>
        <div className="emp_body">
          <Button href="/demande">Mes demandes</Button>
        </div>
        <div style={{ padding: "2em", textAlign: "center" }}>
          <p className="welcome_footer">Tous droits réservés - SoMezzo</p>
        </div>
      </div>

    </div>
    
  );
}

export default EmployePage;
