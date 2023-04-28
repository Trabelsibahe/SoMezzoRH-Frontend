import "../assets/styles/absences.css";
import Navigation from "../components/navigation";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import AddDemandePage from "../components/add_demande";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { listerdemande,  } from "../actions/demande.action";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import { Button, ButtonBase, Divider } from "@mui/material";
const style = {
  color: "#151582;",
  borderColor: "#151582;",

  '&:variant': {
    color: "#151582;",
  },

}
function DemandePage() {
  const auth = useSelector((state) => state.auth);
  const demandes = useSelector((state) => state.demande.demandes);

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
  const reloadPage = () => {
    window.location.reload();
  };
  const [attestation, setAttestation] = useState("");
  const [justification, setJustification] = useState(false);
  const [id, setId] = useState("");

  const handleClosejustif = () => setJustification(false);
  const handleShowJustif = (demande) => {
    setId(demande._id);
    setAttestation(demande.attestation);
    setJustification(true);
  };

  const [showRepo, setRepo] = React.useState(false);
  const onClick = () => setRepo(true);

  useEffect(() => {
    dispatch(listerdemande());
  }, [dispatch]);


  return (
    <div className="rrh_page">
      <Navigation user={CurrentUser} />
      <div className="rrh_container">
        <div className="page_name">
          Pages / Mon espace{" "}
          <p style={{ fontWeight: "bold", fontSize: "14px" }}>
            Mes Demandes
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
            <a className="rrh_header_navs" href="/monespace/taches"><Button variant="outlined" size="large" sx={style}>Taches & challenges</Button></a>
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
            <a className="rrh_header_navs" href="/emp"><Button variant="outlined" size="large" sx={style}>Taches & Challenges</Button></a>
          <Divider orientation="vertical" flexItem></Divider>
            <a className="rrh_header_navs" href="/monespace/mesdemandes"><Button variant="outlined" size="large" sx={style}>Mes demandes</Button></a>
          <Divider orientation="vertical" flexItem></Divider>
            <a className="rrh_header_navs" href="/monespace/mesabsences"><Button  variant="outlined" size="large" sx={style}>Mes absences</Button></a>
          <Divider orientation="vertical" flexItem></Divider>
        </div>
        }
            {showRepo ? (
              <AddDemandePage />
            ) : (
              <div className="emp_body">
                <p className="expert_info">Mes Demandes</p>

                <div style={{ overflowX: "auto" }}>
                  {demandes && demandes.length > 0 ? (
                    <table className="absences_table">
                      <tbody>
                        <tr>
                          <th>Type de demande</th>
                          <th>Commentaires</th>
                          <th>Etat</th>
                          <th>Attestation or badge</th>
                        </tr>
                        {demandes.map((demande, index) => (
                          <tr key={index}>
                            <td>{demande.type}</td>
                            <td>
                              {demande.commentaire
                                ? demande.commentaire
                                : "Pas de commentaires."}
                            </td>
                            <td>{demande.etat}</td>
                            <td>
                              {demande.attestation ? (
                                <Button
                                  size="small"
                                  variant="outlined"
                                  sx={{ color: "#151582" }}
                                  onClick={() => handleShowJustif(demande)}
                                >
                                  Afficher
                                </Button>
                              ) : (
                                "Aucune attestation"
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
                            <th>Type de demande</th>
                          <th>Commentaires</th>
                          <th>Etat</th>
                          <th>Attestation or badge</th>
                          </tr>
                        </tbody>
                        <tr>
                         <td colSpan="8" style={{ textAlign: "center", padding: "1em" }} >
                         Vous n'avez aucune demande.
                         </td>
                      </tr>
                      </table>

                  )}
                </div>
                <div className="absence_bottom">
                  <Button
                    className="expert_add_button"
                    startIcon={<AddCircleIcon />}
                    variant="contained"
                    sx={{ backgroundColor: "#24377b" }}
                    onClick={onClick}>
                    Ajouter une demande
                  </Button>
                </div>
              </div>
            )}
            <Modal show={justification} onHide={handleClosejustif}>
              <Modal.Header closeButton>
                <Modal.Title>attestation or badge</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {" "}
                <Card className="news_item_card">
                  <Card.Img
                    variant="top"
                    src={`http://localhost:3030/${attestation}`}
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
        </div>
  );
}

export default DemandePage;
