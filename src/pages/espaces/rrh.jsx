import "../../assets/styles/rrh.css";
import "../../assets/styles/absences.css";

import React from "react";
import Navigation from "../../components/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  GetOperaAction,
  GetOperAbsenceaAction,
} from "../../actions/operation.action";
import OperaList from "../../components/userlist/operalist_table";
import { Button } from "@mui/material";
function RRH_Page() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const absences = useSelector((state) => state.operation.absences);
  const errors = useSelector((state) => state.errors);
  useEffect(() => {
    dispatch(GetOperAbsenceaAction());
  }, [dispatch]);

  const CurrentUser = {
    isConnected: auth.isConnected,
    nom: auth.user.nom,
    prenom: auth.user.prenom,
    matricule: auth.user.matricule,
    role: auth.user.role,
    operation: auth.user.operation,
    titre: auth.user.titre,
  };

  return (
    <div className="rrh_page">
      <Navigation user={CurrentUser} />
      <div className="rrh_container">
        <div className="page_name">
          Pages / Mon espace{" "}
          <p style={{ fontWeight: "bold", fontSize: "14px" }}>
            Espace Résponsable RH Opérationnel
          </p>
        </div>

        <div className="rrh_header">
          <p className="rrh_header_title">Bienvenue {CurrentUser.nom} {CurrentUser.prenom} !</p>
          <p className="rrh_header_semititle">Votre opération est : {CurrentUser.operation}</p>
        </div>
        <div className="rrh_body">
          <OperaList />
        </div>
        <div className="rrh_body2">
          <p className="rrh_info">Les demandes d'absences</p>

          <div style={{ overflowX: "auto" }}>
            {Array.isArray(absences) && absences.length > 0 ? (
              <table className="absences_table">
                <tbody>
                  <tr>
                    <th>Demandeur</th>
                    <th>Date de debut d'absence</th>
                    <th>Date de fin d'absence</th>
                    <th>Type d'absence</th>
                    <th>Justification</th>
                    <th>Commentaire</th>
                    <th>État</th>
                    <th>Actions</th>
                  </tr>
                  {absences.map((item) =>
                    item.absences.map((absence) => (
                      <tr key={absence._id}>
                        <td>
                          ({item.user.matricule}) {item.user.nom}{" "}
                          {item.user.prenom}
                        </td>
                        <td>
                          {new Date(absence.dateDebut).toLocaleDateString()}
                        </td>
                        <td>
                          {new Date(absence.dateFin).toLocaleDateString()}
                        </td>
                        <td>{absence.type}</td>
                        <td>
                        {<Button size="small" variant="outlined" sx={{color:"#151582"}}>Afficher</Button> 
                        ? <Button size="small" variant="outlined" sx={{color:"#151582"}}>Afficher</Button> : "Aucune Justification"}
                        </td>
                        <td>
                          {absence.commentaire
                            ? absence.commentaire
                            : "Aucun commentaire"}
                        </td>
                        <td style={{color:"orangered"}}>{absence.etat}</td>
                        <td><Button sx={{margin:"0.5em"}} variant="outlined" color="success" size="small">Accepter</Button>{" "}<Button variant="outlined" color="error" size="small">Refuser</Button></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            ) : (
              <>
                <table className="absences_table">
                  <tbody>
                    <tr>
                      <th>Type d'absence</th>
                      <th>Date de debut d'absence</th>
                      <th>Date de fin d'absence</th>
                      <th>Commentaire</th>
                      <th>Type d'absence</th>
                      <th>Etat</th>
                    </tr>
                  </tbody>
                </table>
                <p style={{ textAlign: "center", padding: "1em" }}>
                  Il n'y a pas d'absence.
                </p>
              </>
            )}
          </div>
        </div>
        <div style={{ padding: "2em", textAlign: "center" }}>
          <p className="welcome_footer">Tous droits réservés - SoMezzo</p>
        </div>
      </div>
    </div>
  );
}

export default RRH_Page;
