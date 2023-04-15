import "../../assets/styles/rrh.css";
import "../../assets/styles/absences.css";

import React from "react";
import Navigation from "../../components/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { GetOperaAction,GetOperAbsenceaAction } from "../../actions/operation.action";
import OperaList from "../../components/userlist/operalist_table";

function RRH_Page() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const absences = useSelector((state) => state.operation.absences);
  const errors = useSelector((state) => state.errors);
  useEffect(() => {dispatch(GetOperAbsenceaAction());}, [dispatch]);

  const Currentexpert = {
    isConnected: auth.isConnected,
    nom: auth.user.nom,
    prenom: auth.user.prenom,
    matricule: auth.user.matricule,
    role: auth.user.role,
  };



  return (
    <div className="rrh_page">
      <Navigation user={Currentexpert} />
      <div className="rrh_container">
        <div className="page_name">
          Pages / Mon espace{" "}
          <p style={{ fontWeight: "bold", fontSize: "14px" }}>
            Espace Résponsable RH Opérationnel
          </p>
        </div>

        <div className="rrh_header">Header</div>
        <div className="rrh_body">
        <p className="rrh_info">Mon opération</p>
          <OperaList/>
        </div>
        <div className="rrh_body2">
          <p className="rrh_info">Absences</p>

          <div style={{ overflowX: "auto" }}>
          { Array.isArray(absences) && absences.length > 0 ? 
          <table className="absences_table">
          <tbody>
              <tr>
                <th>Matricule</th>
                <th>Nom</th>
                <th>Prenom</th>
                <th>Type d'absence</th>
              </tr>
              {absences.map((item) => (
                item.absences.map((absence) => (
                  <tr key={absence._id}>
                  <td>{item.user.matricule}</td>
                  <td>{item.user.nom}</td>
                  <td>{item.user.prenom}</td>
                  <td>{absence.type}</td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
               :   
                <>
                <table className="absences_table">
                    <tbody>
                      <tr>
                        <th>Type d'absence</th>
                        <th>Date de debut de période d'absence</th>
                        <th>Date de fin de période d'absence</th>
                        <th>Commentaires</th>
                        <th>Status</th>
                      </tr>
                    </tbody>
                  </table><p style={{ textAlign: "center", padding:"1em" }}>Il n'y a pas d'absence.</p>
                  </>
           }
          </div>
        </div>
        <div style={{padding:"2em", textAlign:"center"}} ><p className="welcome_footer">Tous droits réservés - SoMezzo</p></div>
      </div>
    </div>
  );
}

export default RRH_Page;
