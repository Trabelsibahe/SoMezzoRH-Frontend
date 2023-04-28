import React from "react";
import Navigation from "../navigation";
import "../../assets/styles/absencelist.css";
import {listerdemandeExpert,} from "../../actions/demande.action";
  import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import { BsFillFileTextFill } from "react-icons/bs";
import "@mui/icons-material/OutlinedFlag";
import "@mui/icons-material/CheckCircleOutline";

function DemandeArchiveList() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const demandes = useSelector((state) => state.demande.demandes);

  useEffect(() => {
    dispatch(listerdemandeExpert());
  }, [dispatch]);
  const CurrentProfile = {
    isConnected: auth.isConnected,
    nom: auth.user.nom,
    prenom: auth.user.prenom,
    matricule: auth.user.matricule,
    role: auth.user.role,
  };
  const [search, setSearch] = useState("");
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  //fonction recherche
  const filteredemande = demandes.filter((demande) => {
    if (search === "") {
      return true;
    }
    if (demande.user.matricule.toLowerCase().includes(search.toLowerCase())) {
      return true;
    }
    if (demande.user.nom.toLowerCase().includes(search.toLowerCase())) {
      return true;
    }
    if (demande.user.prenom.toLowerCase().includes(search.toLowerCase())) {
      return true;
    }
    if (demande.type.toLowerCase().includes(search.toLowerCase())) {
      return true;
    }
    return false;
  });
  const [attestation, setAttestation] = useState("");
  const [justification, setJustification] = useState(false);
  const [id, setId] = useState("");
  const handleClosejustif = () => setJustification(false);
  const handleShowJustif = (demande) => {
    setId(demande._id);
    setAttestation(demande.attestation);
    setJustification(true);
  };


  return (
    <div>
        <p className="expert_info">Historique des demande Attestation ou Badge</p>
      <InputBase
        className="searchbar"
        placeholder="Rechercher.."
        type="text"
        value={search}
        onChange={handleSearch}
        startAdornment={
          <InputAdornment position="start">
            {" "}
            <SearchIcon />{" "}
          </InputAdornment>
        }
        margin="normal"
        sx={{ width: 250 }}
      />
      <div style={{ overflowX: "auto" }}>
        {demandes && demandes.length > 0 ? (
          <table className="absences_table">
            <tbody>
              <tr>
                <th>Demandeur</th>
                <th>Type de demande</th>
                <th>Commentaires</th>
                <th>Etat</th>
                <th>Attestation or badge</th>
              </tr>
              {filteredemande.map((demande) =>
                    <tr key={demande._id}>
                      <td>
                        ({demande.user.matricule}) {demande.user.nom}{" "}
                        {demande.user.prenom}
                      </td>
                      <td>{demande.type}</td>
                      <td>
                        {demande.commentaire
                          ? demande.commentaire
                          : "Aucun commentaire"}
                      </td>
                      <td style={{ color: "orangered" }}>{demande.etat}</td>
                      <td>
                        {(demande.attestation && demande.type==="Attestation") ? (
                          <Button
                            size="small"
                            variant="outlined"
                            sx={{ color: "#151582" }}
                            onClick={() => handleShowJustif(demande)}
                          >
                            Afficher
                          </Button>
                        ) : (
                          "Aucune Attestation"
                        )}
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
                <th>Demandeur</th>
                <th>Type de demande</th>
                <th>Commentaires</th>
                <th>Etat</th>
                <th>Attestation or badge</th>
                </tr>
              </tbody>
            </table>
            <p style={{ textAlign: "center", padding: "1em" }}>
              Il n'y a pas de demande
            </p>
          </>
        )}{" "}
      </div>

      <Modal show={justification} onHide={handleClosejustif}>
        <Modal.Header closeButton>
          <Modal.Title>Attestation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Card className="news_item_card">
            <Card.Img variant="top" src={`http://localhost:3030/${attestation}`} />
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

export default DemandeArchiveList;
