import React from "react";
import "../../assets/styles/absencelist.css";
import {listerdemandeExpert, updateBadge, updateAttestation} from "../../actions/demande.action";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Modal from "react-bootstrap/Modal";
import "@mui/icons-material/OutlinedFlag";
import "@mui/icons-material/CheckCircleOutline";
import Form from "react-bootstrap/Form";
import { Button } from '@mui/material';

function DemandesList() {
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

  const [id, setId] = useState("");
  const [attestation, setAttestation] = useState("");
  const [etat, setEtat] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseEdit = () => setEdit(false);


  const handleShowEdit = (demande, action) => {
    setId(demande._id);
    setEtat(demande.etat);
    editetat(action);
    setEdit(true);
  };


  let action = "";
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    if (edit) {
      editetat(action);
    }
  }, [edit, action]);

  const editetat = async (action) => {
    let newEtat = action;
    if (action === "Accordé") {
      newEtat = "Accordé";
    }
    const data = {
      etat: "Accordé",
    };
    await dispatch(updateBadge(id, data));
    await dispatch(listerdemandeExpert());
    handleCloseEdit();
    setEtat(newEtat);
  };
  const [att, setAtt] = useState(false);
  const handleCloseAtt = () => setAtt(false);
  const handleShowAtt = (id) => {
    demandes.forEach((demande) => {
      if (demande._id === id) {
        setId(demande._id);
        setAttestation(demande.attestation);
      }
    });
    setAtt(true);
  };
  const [error, setError] = useState("");
  const editattestation = async () => {
    const data = new FormData();
    data.append("attestation", attestation);
    if (attestation === undefined) {
      setError("Veuillez charger l'attestation.");
    } else {
      data.etat = "Accordé";
      await dispatch(updateAttestation(id, data));
      await dispatch(listerdemandeExpert());
      await dispatch(listerdemandeExpert());
      handleCloseAtt();
      setAttestation("");
    }
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



  return (
    <div className="rrh_body2">
      <p className="rrh_info">Les demandes d'attestations et badges</p>
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
      {demandes && demandes.length > 0 ? (
        <table className="absences_table">
          <tbody>
            <tr>
              <th>Demandeur</th>
              <th>Type de demande</th>
              <th>Commentaire</th>
              <th>État</th>
              <th>Actions</th>
            </tr>
            {filteredemande.some(() =>
              demandes.some((demande) => demande.etat === "Réception")
            ) ? (
              demandes.map((demande) => demande.etat === "Réception" && (
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
                          {demande.type === "Badge" ? ( 
                          <Button variant="outlined"  color="success" size="small"  onClick={() => handleShowEdit(demande, "Accordé")}>Accorder</Button>
                          ) : (<Button variant="outlined" color="success" size="small" onClick={() => handleShowAtt(demande._id)}>Accorder</Button>)}
                        </td>
                      </tr>
                    )
                )
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "1em" }}>
                  Pas de demandes en liste d'attente.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <table className="absences_table">
          <tbody>
            <tr>
              <th>Demandeur</th>
              <th>Type de demande</th>
              <th>Commentaire</th>
              <th>État</th>
              <th>Actions</th>
            </tr>
            <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "1em" }}>
                  Pas de demandes en liste d'attente.
                </td>
              </tr>
            </tbody>
        </table>
      )}
      <Modal show={att} onHide={handleCloseAtt}>
        <Modal.Header closeButton>
          <Modal.Title>Accorder l'attestation </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Charger l'attestation</Form.Label>
              <input
                type="file"  accept="image/*"
                name="attestation"
                onChange={(e) => setAttestation(e.target.files[0])}/>
            </Form.Group>
            <p style={{color:"red", textAlign:"center"}}>{error}</p>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAtt}>Annuler</Button>
          <Button variant="primary" onClick={editattestation}>
            Accorder
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DemandesList;
