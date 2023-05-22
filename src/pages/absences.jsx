import "../assets/styles/absences.css";
import Navigation from "../components/navigation";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import AddRepoPage from "../components/add_repo";
import { Button, ButtonBase, Divider } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { GetAbsence, AddAbsence } from "../actions/absence.action";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";

const style = {
  color: "#151582;",
  borderColor: "#151582;",

  '&:variant': {
    color: "#151582;",
  }
}
const style2 = {
  backgroundColor: "#24377b;",
  margin:"1.1em",
  '&:hover': {
    backgroundColor: "#24377b;",
  },

}
function AbsencesPage() {

  const auth = useSelector((state) => state.auth);
  const absences = useSelector((state) => state.absence.absence);

  const dispatch = useDispatch();
  const CurrentUser = {
    isConnected: auth.isConnected,
    nom: auth.user.nom,
    prenom: auth.user.prenom,
    matricule: auth.user.matricule,
    role: auth.user.role,
    operation: auth.user.operation,
    titre: auth.user.titre,
  };

  const [justif, setJustif] = useState("");
  const [justification, setJustification] = useState(false);
  const [id, setId] = useState("");

  const handleClosejustif = () => setJustification(false);
  const handleShowJustif = (absence) => {
    setId(absence._id);
    setJustif(absence.justif);
    setJustification(true);
  };
  const reloadPage = () => {
    window.location.reload();
  };
  const [showRepo, setRepo] = React.useState(false);
  const onClick = () => setRepo(true);

  useEffect(() => {
    dispatch(GetAbsence());
  }, [dispatch]);

  return (
    <div className="rrh_page">
      <Navigation user={CurrentUser} />
      <div className="rrh_container">
        <div className="page_name">
          Pages / Mon espace{" "}
          <p style={{ fontWeight: "bold", fontSize: "14px" }}>
            Mes Absences
          </p>
        </div>
        { CurrentUser.role === "RRH" ? (
        <div className="rrh_header">
          <div className="rrh_header_titles">
          <p className="rrh_header_title">Bienvenue {CurrentUser.nom} {CurrentUser.prenom} !</p>
          <p className="rrh_header_semititle">Votre opération est : {CurrentUser.operation}</p>
          </div>
          <Divider orientation="vertical" flexItem></Divider>
            <a className="rrh_header_navs" href="/rrh"><Button variant="outlined" size="large" sx={style}>Mon équipe</Button></a>
          <Divider orientation="vertical" flexItem></Divider>
            <a className="rrh_header_navs" href="/monespace/Challenges"><Button variant="outlined" size="large" sx={style}> challenges</Button></a>
          <Divider orientation="vertical" flexItem></Divider>
            <a className="rrh_header_navs" href="/monespace/mesabsences"><Button  variant="outlined" size="large" sx={style}>Mes absences</Button></a>
          <Divider orientation="vertical" flexItem></Divider>
        </div>)
        :
        <div className="rrh_header">
          <div className="rrh_header_titles">
          <p className="rrh_header_title">Bienvenue {CurrentUser.nom} {CurrentUser.prenom} !</p>
          <p className="rrh_header_semititle">Votre opération est : {CurrentUser.operation}</p>
          </div>
          <Divider orientation="vertical" flexItem></Divider>
            <a className="rrh_header_navs" href="/emp"><Button variant="outlined" size="large" sx={style}> Challenges</Button></a>
          <Divider orientation="vertical" flexItem></Divider>
            <a className="rrh_header_navs" href="/monespace/mesdemandes"><Button variant="outlined" size="large" sx={style}>Mes demandes</Button></a>
          <Divider orientation="vertical" flexItem></Divider>
            <a className="rrh_header_navs" href="/monespace/mesabsences"><Button  variant="outlined" size="large" sx={style}>Mes absences</Button></a>
          <Divider orientation="vertical" flexItem></Divider>
        </div>
        }
          <div> 
            {showRepo ? (
              <AddRepoPage />
            ) : (
              <div className="emp_body">
                <p className="expert_info">Mes Absences</p>

                <div style={{ overflowX: "auto" }}>
                  {absences && absences.length > 0 ? (
                    <table className="absences_table">
                      <tbody>
                        <tr>
                        <th>Date de demande</th>
                          <th>Type d'absence</th>
                          <th>Date de debut de période d'absence</th>
                          <th>Date de fin de période d'absence</th>
                          <th>Commentaires</th>
                          <th>Etat</th>
                          <th>justification</th>
                        </tr>
                        {absences[0].absences.map((absence, index) => (
                          <tr key={index}>
                          <td>{new Date(absence.dateCreation).toLocaleDateString()}</td>
                            <td>{absence.type}</td>
                            <td>
                              {new Date(absence.dateDebut).toLocaleDateString()}
                            </td>
                            <td>
                              {new Date(absence.dateFin).toLocaleDateString()}
                            </td>
                            <td>
                              {absence.commentaire
                                ? absence.commentaire
                                : "Pas de commentaires."}
                            </td>
                            <td style={{ color: absence.etat === "En attente" ? "blue" : absence.etat === "Refusé" ? "red" : "green" }}>
  {absence.etat}
  {absence.etat === "Refusé" && absence.motif ? (
    <>
      <br />
      {absence.motif}
    </>
  ) : null}
</td>
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
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
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
                      <tr>
                        <td
                          colSpan="8"
                          style={{ textAlign: "center", padding: "1em" }}
                        >
                          Vous n'avez aucune absence.
                        </td>
                      </tr>
                      </table>
                  )}
                </div>
                <div className="absence_bottom">
                  <Button
                    className="expert_add_button" 
                    startIcon={<AddCircleIcon />}  variant="contained" sx={style2} onClick={onClick}> Ajouter une absence 
                  </Button>
                </div>
              </div>
            )}
            <Modal show={justification} onHide={handleClosejustif}>
              <Modal.Header closeButton>
                <Modal.Title>Justification d'absence</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {" "}
                <Card className="news_item_card">
                  <Card.Img
                    variant="top"
                    src={`http://localhost:3030/${justif}`}
                  />
                </Card>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClosejustif}>
                  Fermer
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div style={{ padding: "2em", textAlign: "center" }}>
          <p className="welcome_footer">Tous droits réservés - SoMezzo</p>
        </div>
        </div>
      </div>
  );
}

export default AbsencesPage;
