import React from "react";
import EMPheader from "../components/headers/emp_header";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Navigation from "../components/navigation";

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
            Espace Employé(e)
          </p>
        </div>
        <EMPheader />
      </div>
    </div>
  );
}

export default Espace_Sante;
