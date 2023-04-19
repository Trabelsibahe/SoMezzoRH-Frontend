import "../../assets/styles/rrh.css";

import { updateAbsence } from "../../actions/absence.action";

import React from "react";
import Navigation from "../../components/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { FaFileArchive } from "react-icons/fa";

import {
  GetOperaAction,
  GetOperAbsenceAction,
} from "../../actions/operation.action";

import OperaList from "../../components/userlist/operalist_table";
import { Button } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import RrhAbsArchPage from "../../components/rrh_AbsArch";

function RRH_Page() {
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
  const handleClosejustif = () => setJustification(false);

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
    await dispatch(GetOperAbsenceAction());
    await dispatch(GetOperAbsenceAction());
  };

  useEffect(() => {
    dispatch(GetOperAbsenceAction());
  }, []);

  const onClick_RrhAbsArchPage = () => setShow_RrhAbsArchPage(true);

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
          <p className="rrh_header_title">
            Bienvenue {CurrentUser.nom} {CurrentUser.prenom} !
          </p>
          <p className="rrh_header_semititle">
            Votre opération est : {CurrentUser.operation}
          </p>
        </div>
        <div className="rrh_body">
          <OperaList />
        </div>
        {Show_RrhAbsArchPage ? (
          <RrhAbsArchPage />
        ) : (
          <div className="rrh_body2">
            <p className="rrh_info">Les demandes d'absences</p>
            <Button
              onClick={onClick_RrhAbsArchPage}
              sx={{ margin: "0.5em 3em" }}
              variant="outlined"
              startIcon={<FaFileArchive />}
            >
              Archive
            </Button>
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
                            )
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
        )}
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

export default RRH_Page;
