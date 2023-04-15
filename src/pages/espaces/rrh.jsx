import "../../assets/styles/rrh.css";
import "../../assets/styles/absences.css";

import React from "react";
import Navigation from "../../components/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { GetOperaAction } from "../../actions/operation.action";
import OperaList from "../../components/userlist/operalist_table";

function RRH_Page() {
  const auth = useSelector((state) => state.auth);
  const opera = useSelector((state) => state.operation.operation);

  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);

  const Currentexpert = {
    isConnected: auth.isConnected,
    nom: auth.user.nom,
    prenom: auth.user.prenom,
    matricule: auth.user.matricule,
    role: auth.user.role,
  };

  useEffect(() => {
    (() => {
      dispatch(GetOperaAction());
    })();
  }, [dispatch]);

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
          <p className="rrh_info">Congés & Absences</p>

          <div style={{ overflowX: "auto" }}>
            {opera && opera.length > 0 ? (
              <table className="absences_table">
                <tbody>
                  <tr>
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Email</th>
                    <th>Operation</th>
                  </tr>
                  {opera.map((operaItem, index) => (
                    <tr key={index}>
                      <td>{operaItem.user.nom}</td>
                      <td>{operaItem.user.prenom}</td>
                      <td>{operaItem.email}</td>
                      <td>{operaItem.user.operation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              "Aucune Opera trouvée..."
            )}
          </div>
        </div>
        <div style={{padding:"2em", textAlign:"center"}} ><p className="welcome_footer">Tous droits réservés - SoMezzo</p></div>
      </div>
    </div>
  );
}

export default RRH_Page;
