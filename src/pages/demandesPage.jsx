import "../assets/styles/rrh.css";
import React from "react";
import Navigation from "../components/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { FaFileArchive } from "react-icons/fa";
import { GetAllAbsence, updateAbsence } from "../actions/absence.action";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import ExpertAbsArchPage from "../components/expert_AbsArch";
import DemandeList from "../components/userlist/demandeslist";
import { Button, ButtonBase, Divider } from "@mui/material";
const style = {
  color: "#151582;",
  borderColor: "#151582;",

  '&:variant': {
    color: "#151582;",
  },

}
function ExpertDemandesPage() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const absences = useSelector((state) => state.absence.absences);

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
  const handleClosejustif = () => setJustification(false);
  const [Show_ExpertAbsArchPage, setShow_ExpertAbsArchPage] =
    React.useState(false);

  const handleShowJustif = (absence) => {
    setId(absence._id);
    setJustif(absence.justif);
    setJustification(true);
  };

  const OnChangeHandler = async (id, action) => {
    const data = {
      etat: action,
    };
    await dispatch(updateAbsence(id, data));
    await dispatch(GetAllAbsence());
    await dispatch(GetAllAbsence());
  };

  useEffect(() => {
    dispatch(GetAllAbsence());
  }, []);

  const onClick_ExpertAbsArchPage = () => setShow_ExpertAbsArchPage(true);

  return (
    <div className="rrh_page">
      <Navigation user={CurrentUser} />
      <div className="rrh_container">
        <div className="page_name">
          Pages / Espace Expert RH Opérationnel{" "}
          <p style={{ fontWeight: "bold", fontSize: "14px" }}>
            Demandes & Absences
          </p>
        </div>
        <div className="rrh_header">
          <div className="rrh_header_titles">
          <p className="rrh_header_title">Bienvenue {CurrentUser.nom}!</p>
          <p className="rrh_header_semititle">Titre : {CurrentUser.titre ? CurrentUser.titre : "Aucun titre"}</p>
          </div>
          <Divider orientation="vertical" flexItem></Divider>
            <a className="rrh_header_navs" href="/expertrh"><Button variant="outlined" size="large" sx={style}>Espace Expert</Button></a>
          <Divider orientation="vertical" flexItem></Divider>
            <a className="rrh_header_navs" href="/monespace/expertrh/taches"><Button variant="outlined" size="large" sx={style}>Taches</Button></a>
          <Divider orientation="vertical" flexItem></Divider>
          <a className="rrh_header_navs" href="/monespace/expertrh/demandes"><Button  variant="outlined" size="large" sx={style}>Demandes</Button></a>
          <Divider orientation="vertical" flexItem></Divider>
          <a className="rrh_header_navs" href="/monespace/expertrh/archive"><Button  variant="outlined" size="large" sx={style}>Archive</Button></a>
          <Divider orientation="vertical" flexItem></Divider>
        </div>
        {Show_ExpertAbsArchPage ? (
          <ExpertAbsArchPage />
        ) : (
          <div className="rrh_body">
            <p className="rrh_info">Absences</p>
            <div><Button onClick={onClick_ExpertAbsArchPage} sx={{ margin: "0.5em 3em" }} variant="outlined" startIcon={<FaFileArchive />}  >
              Archive
            </Button>
            </div>
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
                        item.absences.map((absence) =>
                          absence.etat === "En attente" &&
                          item.user.role === "RRH" ? (
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
                                  onClick={() =>
                                    OnChangeHandler(absence._id, "Accepté")
                                  }
                                >
                                  Accepter
                                </Button>{" "}
                                <Button
                                  variant="outlined"
                                  color="error"
                                  size="small"
                                  onClick={() =>
                                    OnChangeHandler(absence._id, "Refusé")
                                  }
                                >
                                  Refuser
                                </Button>
                              </td>
                            </tr>
                          ) : null
                        )
                      )
                    ) : (
                      <tr>
                        <td
                          colSpan="8"
                          style={{ textAlign: "center", padding: "1em" }}
                        >
                          Il n'y a pas d'absence en attente.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : (
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
                    <tr>
                        <td
                          colSpan="8"
                          style={{ textAlign: "center", padding: "1em" }}
                        >
                          Il n'y a pas d'absence en attente.
                        </td>
                      </tr>
                  </table>
              )}
            </div>
          </div>
        )}

        <DemandeList />

        <div style={{ padding: "2em", textAlign: "center" }}>
          <p className="welcome_footer">Tous droits réservés - SoMezzo</p>
        </div>


        <Modal show={justification} onHide={handleClosejustif}>
          <Modal.Header closeButton>
            <Modal.Title>Justification d'absence</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <Card className="news_item_card">
              <Card.Img variant="top" src={`http://localhost:3030/${justif}`} />
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClosejustif}>
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default ExpertDemandesPage;
