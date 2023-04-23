import React from "react";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import{ GetAllAbsence } from "../actions/absence.action"
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";




function ExpertAbsArchPage() {
  const dispatch = useDispatch();
  const absences = useSelector((state) => state.absence.absences);
  const errors = useSelector((state) => state.errors);
  useEffect(() => {
    dispatch(GetAllAbsence());
  }, [dispatch]);
  const [id, setId] = useState("");
  const [justif, setJustif] = useState("");
  const [justification, setJustification] = useState(false);
  const handleClosejustif = () => setJustification(false);
  const handleShowJustif = (absence) => {
    setId(absence._id);
    setJustif(absence.justif);
    setJustification(true);
  };


  return (
    <div className="rrh_body2">
      <p className="rrh_info">Archive d'absences</p>
      <Button sx={{ margin: "0.5em 3em" }}
            variant="outlined" href="/listabsence">Retour</Button>
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
                  </tr>
                  {absences.map((item) =>
                    item.absences.map((absence) =>
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
                            {absence.commentaire
                              ? absence.commentaire
                              : "Aucun commentaire"}
                          </td>
                          <td style={{ color: "orangered" }}>{absence.etat}</td>
                     
                        </tr>
                      
                    )
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
                      <th>État</th>
                    </tr>
                  </tbody>
                </table>
                <p style={{ textAlign: "center", padding: "1em" }}>
                  Il n'y a pas d'absence.
                </p>
              </>
            )}
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
  );
}

export default ExpertAbsArchPage;
