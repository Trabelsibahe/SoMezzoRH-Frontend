import "../../assets/styles/absences.css";
import "../../assets/styles/employe.css";

import React from "react";
import Navigation from "../../components/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { SetProfileAction, GetProfileAction } from "../../actions/profile.actions";
import AddRepoPage from "../../components/add_repo"
import { Button } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';

function EmployePage() {
  const auth = useSelector((state) => state.auth);

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
      dispatch(GetProfileAction());
    })();
  }, [dispatch]);


  const [showRepo, setRepo] = React.useState(false)
  const onClick = () => setRepo(true)

  
// https://support.payfit.com/fr/conges-payes-dun-stagiaire/?fbclid=IwAR2_ZOxbHMsJlBP6cKkXnAtV9ov4Hu2vOzEiCC7F9tSyfz28hg35PgGU8zg

  return (
    <div className="expert_page">
      <Navigation user={Currentexpert} />
      <div className="expert_container">
      <div className="page_name">
          Pages / Mon espace{" "}
          <p style={{ fontWeight: "bold", fontSize: "14px" }}>
            Espace Employé(e)
          </p>
        </div>

        { showRepo ? <AddRepoPage /> : 
        <div className="expert_body"  >
          <p className="expert_info">Congés & Absences</p>

        <div style={{overflowX:"auto"}}>
          <table className="absences_table">
            <tbody>
             <tr>
              <th>Type d'absence</th>
              <th>Date de debut de période d'absence</th>
              <th>Date de fin de période d'absence</th>
              <th>Commentaires</th>
              <th>Status</th>

            </tr>
            <tr>
              <td>To be filled</td>
              <td>To be filled</td>
              <td>To be filled</td>
              <td>To be filled</td>
              <td>En attente</td>
            </tr>
            <tr>
              <td>To be filled</td>
              <td>To be filled</td>
              <td>To be filled</td>
              <td>To be filled</td>
              <td>En attente</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div className="absence_bottom">
            <Button className="expert_add_button" startIcon={<AddCircleIcon />} variant="contained" sx={{backgroundColor:"#24377b"}} onClick={onClick}>Ajouter un repos</Button>
          </div>
        </div>
        }
      </div>
    </div>
  );
}

export default EmployePage;
