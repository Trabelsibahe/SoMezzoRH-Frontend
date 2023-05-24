import React, { useEffect, useState } from "react";
import Expertheader from "../../components/headers/expert_header";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navigation from "../../components/navigation";
import "../../assets/styles/espace_sante.css";
import { Button, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { BiUnderline } from "react-icons/bi";
import {
  afficherdv,
  afficherdemande,
} from "../../actions/sante.action";
import formatDate from "../../components/formatdate";
import { SendNotificationToOneUser } from "../../actions/notification.action";
import { format } from "date-fns";

const style = {
  "label.Mui-focused": {
    color: "#2b2b2b;",
  },
  ".MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#2b2b2b;",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgba(36, 55, 123, 0.9)",
    },
  },
};

function Archive_Sante() {
  const auth = useSelector((state) => state.auth);
  const date = useSelector((state) => state.sante.date);
  const demandesrdv = useSelector((state) => state.sante.demandesrdv);

  const dispatch = useDispatch();
  const [data, setData] = useState();
  const navigate = useNavigate();
  const CurrentUser = {
    isConnected: auth.isConnected,
    nom: auth.user.nom,
    prenom: auth.user.prenom,
    matricule: auth.user.matricule,
    role: auth.user.role,
    operation: auth.user.operation,
    active: auth.user.active,
  };

  useEffect(() => {
    dispatch(afficherdv());
  }, [dispatch]);
  useEffect(() => {
    dispatch(afficherdemande());
  }, [dispatch]);



    
  var demandeDate = new Date(date);
  var options = { day: 'numeric', month: 'long', year: 'numeric' };
  var frDate = demandeDate.toLocaleString('fr-FR', options);
  return (
    <div >
          <p className="rrh_info">Historique des Rendez-vous médicaux</p>
      
          <div style={{ overflowX: "auto" }}>
            <table className="absences_table">
              <thead>
                <tr>
                  <th>Date de demande</th>
                  <th>Demandeur</th>
                  <th>Maladie</th>
                  <th>Commentaire</th>
                  <th>État</th>
                </tr>
              </thead>
              <tbody>
  {(demandesrdv ?? []).length > 0 ? (
    demandesrdv.map((demanderdv) =>
      demanderdv.user.role === "EMP" ? (
        <tr key={demanderdv._id}>
          <td>{new Date(demanderdv.createdAt).toLocaleString()}</td>
          <td>{demanderdv.user.nom} {demanderdv.user.prenom}</td>
          <td>{demanderdv.maladie}</td>
          <td>{demanderdv.commentaire ? demanderdv.commentaire : "Aucun commentaire"}</td>
          <td style={{ color: demanderdv.etat === "en attente" ? "blue" : demanderdv.etat === "refusé" ? "red" : "green" }}>
            {demanderdv.etat}
            {demanderdv.etat === "refusé" && demanderdv.motif ? (
              <>
                <br />
                {demanderdv.motif}
              </>
            ) : null}
          </td>
        </tr>
      ) : (
        ""
      )
    )
  ) : (
    <tr>
      <td>Aucune demande</td>
    </tr>
  )}
</tbody>

            </table>
          </div>
      
     
    </div>
  );
}

export default Archive_Sante;
