import "../../assets/styles/absences.css";
import "../../assets/styles/employe.css";

import React from "react";
import Navigation from "../../components/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import AddRepoPage from "../../components/add_repo";
import { Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { GetAbsence, AddAbsence } from "../../actions/absence.action";

function EmployePage() {
  const auth = useSelector((state) => state.auth);
  const absences = useSelector((state) => state.absence.absence);
  
  const dispatch = useDispatch();

  const CurrentUser = {
    isConnected: auth.isConnected,
    nom: auth.user.nom,
    prenom: auth.user.prenom,
    matricule: auth.user.matricule,
    role: auth.user.role,
  };

  const [showRepo, setRepo] = React.useState(false);
  const onClick = () => setRepo(true);

  useEffect(() => {
    dispatch(GetAbsence());
  }, [dispatch]);

  return (
    <div className="expert_page">
      <Navigation user={CurrentUser} />
      <div className="expert_container">
        <div className="page_name">
          Pages / Mon espace{" "}
          <p style={{ fontWeight: "bold", fontSize: "14px" }}>
            Espace Employé(e)
          </p>
        </div>

        {showRepo ? (
          <AddRepoPage />
        ) : (
          <div className="expert_body">
            <p className="expert_info">Congés & Absences</p>

            <div style={{ overflowX: "auto" }}>
            {absences && absences.length > 0 ? 
              <table className="absences_table">
                <tbody>
                  <tr>
                    <th>Type d'absence</th>
                    <th>Date de debut de période d'absence</th>
                    <th>Date de fin de période d'absence</th>
                    <th>Commentaires</th>
                    <th>Status</th>
                    <th>justification</th>
                  </tr>
                  {absences[0].absences.map((absence, index) => (
                <tr key={index}>
                  <td>{absence.type}</td>
                  <td>{new Date(absence.dateDebut).toLocaleDateString()}</td>
                  <td>{new Date(absence.dateFin).toLocaleDateString()}</td>
                  <td>{absence.commentaire ? absence.commentaire : "Pas de commentaires."}</td>
                  <td>{absence.etat}</td>
                  <td> <img className="profile_header_avatar" src={`http://localhost:3030/${absence?.justif}`} ></img></td>
                </tr>
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
                  </table><p style={{ textAlign: "center", padding:"1em" }}>Vous n'avez aucune absence.</p>
                  </>
              }
            </div>
            <div className="absence_bottom">
              <Button
                className="expert_add_button"
                startIcon={<AddCircleIcon />}
                variant="contained"
                sx={{ backgroundColor: "#24377b" }}
                onClick={onClick}
              >
                Ajouter un repos
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployePage;
