import "../../assets/styles/rrh.css";

import React from "react";
import Navigation from "../../components/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Button } from "@mui/material";
import RrhAbsArchPage from "../../components/rrh_AbsArch";
import Tasks from "../../components/TaskComponents/tasks";
import RrhCalendar from "../../components/TaskComponents/rrhcalendar";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { hover } from "@testing-library/user-event/dist/hover";

const style = {
  left: "74em",
  color: "#151582;",
  margin:"1em",
  '&:hover': {
    color: "#151582;",
  },

}
function ExpertRH2() {

  
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const absences = useSelector((state) => state.operation.absences);

  const CurrentUser = {
    isConnected: auth.isConnected,
    nom: auth.user.nom,
    prenom: auth.user.prenom,
    matricule: auth.user.matricule,
    role: auth.user.role,
    operation: auth.user.operation,
    titre: auth.user.titre,
  };

  const [id, setId] = useState("");
  const [justif, setJustif] = useState("");
  const [justification, setJustification] = useState(false);
  const [Show_RrhAbsArchPage, setShow_RrhAbsArchPage] = React.useState(false);
  const [Show_RrhCalendar, setShow_RrhCalendar] = React.useState(false);

  const onClick_ShowRRHCalendar = () => setShow_RrhCalendar(true);

  const handleShowJustif = (absence) => {
    setId(absence._id);
    setJustif(absence.justif);
    setJustification(true);
  };

  return (
    <div className="rrh_page">
      <Navigation user={CurrentUser} />
      <div className="rrh_container">
        <div className="page_name">
          Pages / Mon espace{" "}
          <p style={{ fontWeight: "bold", fontSize: "14px" }}>Espace RRH 2</p>
        </div>

        <div className="rrh_header">
          <p className="rrh_header_title">
            Bienvenue {CurrentUser.nom} {CurrentUser.prenom} !
          </p>
          <p className="rrh_header_semititle">
            Votre opération est : {CurrentUser.operation}
          </p>
        </div>

        <div className="rrh_body">
        <p className="rrh_info">Taches & Challenges opérationnelles</p>
          <div >
            { !Show_RrhCalendar ?
            <Button variant="outlined" sx={style}  size="small" startIcon={<CalendarMonthIcon />}
              onClick={onClick_ShowRRHCalendar}>Agenda </Button>
               : 
            <Button variant="outlined" sx={style}  size="small" startIcon={<KeyboardReturnIcon/>} 
              href="/rrh2">Retour</Button>}
          </div>


          {Show_RrhCalendar ? <RrhCalendar/> : <Tasks />}
        </div>

        {Show_RrhAbsArchPage ? (
          <RrhAbsArchPage />
        ) : (
          <div className="rrh_body2">
            <p className="rrh_info">Mes taches</p>

            <div style={{ overflowX: "auto" }}>
              {absences.length > 0 ? (
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
                    {absences.some((item) =>
                      item.absences.some(
                        (absence) => absence.etat === "En attente"
                      )
                    ) ? (
                      absences.map((item) =>
                        item.absences.map(
                          (absence) =>
                            absence.etat === "En attente" && (
                              <tr key={absence._id}>
                                <td>
                                  ({item.user.matricule}) {item.user.nom}{" "}
                                  {item.user.prenom}
                                </td>
                                <td>
                                  {" "}
                                  {new Date(
                                    absence.dateDebut
                                  ).toLocaleDateString()}{" "}
                                </td>
                                <td>
                                  {" "}
                                  {new Date(
                                    absence.dateFin
                                  ).toLocaleDateString()}{" "}
                                </td>
                                <td>{absence.type}</td>
                                <td>
                                  {absence.justif ? (
                                    <Button
                                      size="small"
                                      variant="outlined"
                                      sx={{ color: "#151582" }}
                                      onClick={() => handleShowJustif(absence)}
                                    >
                                      Afficher
                                    </Button>
                                  ) : (
                                    "Aucune Justification"
                                  )}
                                </td>
                                <td>
                                  {" "}
                                  {absence.commentaire
                                    ? absence.commentaire
                                    : "Aucun commentaire"}{" "}
                                </td>
                                <td style={{ color: "orangered" }}>
                                  {absence.etat}
                                </td>
                                <td>
                                  <Button
                                    sx={{ margin: "0.5em" }}
                                    variant="outlined"
                                    color="success"
                                    size="small"
                                  >
                                    Accepter
                                  </Button>{" "}
                                  <Button
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                  >
                                    Refuser
                                  </Button>
                                </td>
                              </tr>
                            )
                        )
                      )
                    ) : (
                      <tr>
                        <td
                          colSpan="8"
                          style={{ textAlign: "center", padding: "1em" }}
                        >
                          Il n'y a pas de demande.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : (
                <>
                  <table className="absences_table">
                    <tbody>
                      <tr>
                        <th>Type de demande</th>
                        <th>Date de debut de demande</th>
                        <th>Date de fin de demande</th>
                        <th>Commentaire</th>
                        <th>Type d'absence</th>
                        <th>Etat</th>
                      </tr>
                    </tbody>
                  </table>
                  <p style={{ textAlign: "center", padding: "1em" }}>
                    Il n'y a pas du demandes.
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        <div style={{ padding: "2em", textAlign: "center" }}>
          <p className="welcome_footer">Tous droits réservés - SoMezzo</p>
        </div>
      </div>
    </div>
  );
}

export default ExpertRH2;
