import React from "react";
import Navigation from "../navigation";
import "../../assets/styles/absencelist.css";
import { GetAllAbsence, updateAbsence } from "../../actions/absence.action";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { Button } from '@mui/material';
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import { BsFillFileTextFill } from "react-icons/bs";
import "@mui/icons-material/OutlinedFlag";
import "@mui/icons-material/CheckCircleOutline";

function AbsenceList() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const absences = useSelector((state) => state.absence.absences);

  useEffect(() => {
    dispatch(GetAllAbsence());
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
  const filteredabsence = absences.filter((absence) => {
    if (search === "") {
      return true;
    }
    if (absence.user.matricule.toLowerCase().includes(search.toLowerCase())) {
      return true;
    }
    if (absence.user.nom.toLowerCase().includes(search.toLowerCase())) {
      return true;
    }
    if (absence.user.prenom.toLowerCase().includes(search.toLowerCase())) {
      return true;
    }
    return false;
  });
  
  
  
  
  const [id, setId] = useState("");
  const [justif, setJustif] = useState("");
  const [etat, setEtat] = useState("");
  const [justification, setJustification] = useState(false);
  const handleClosejustif = () => setJustification(false);
  const handleShowJustif = (absence) => {
    setId(absence._id);
    setJustif(absence.justif);
    setJustification(true);
  };
  let action = "";
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    if (edit) {
      editetat(action);
    }
  }, [edit, action]);
  const handleCloseEdit = () => setEdit(false);

  const handleShowEdit = (absence, action) => {
    setId(absence._id);
    setEtat(absence.etat);
    editetat(action);
    setEdit(true);
  };

  const editetat = async (action) => {
    let newEtat = etat;
    if (action === "accepter") {
      newEtat = "accepter";
    } else {
      newEtat = "refuser";
    }

    const data = {
      etat: newEtat,
    };
    await dispatch(updateAbsence(id, data));
    await dispatch(GetAllAbsence());
    handleCloseEdit();
    setEtat(newEtat);
  };
  return (
    <div>
        <p className="expert_info">Historique des absences</p>
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
        {absences && absences.length > 0 ? (
          <table className="absences_table">
            <tbody>
              <tr>
                <th>Demandeur</th>
                <th>Type d'absence</th>
                <th>Date de début</th>
                <th>Date de fin</th>
                <th>Commentaire</th>
                <th>État</th>
                <th>Justification</th>
              </tr>
              {filteredabsence.map((item) =>
                item.absences.map((absence) =>
                    <tr key={absence._id}>
                      <td>
                        ({item.user.matricule}) {item.user.nom}{" "}
                        {item.user.prenom}
                      </td>
                      <td>{absence.type}</td>
                      <td>
                        {new Date(absence.dateDebut).toLocaleDateString()}
                      </td>
                      <td>{new Date(absence.dateFin).toLocaleDateString()}</td>
                      <td>
                        {absence.commentaire
                          ? absence.commentaire
                          : "Aucun commentaire"}
                      </td>
                      <td style={{ color: "orangered" }}>{absence.etat}</td>
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
                )
              )}
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
                <tr>
                   <td colSpan="8" style={{ textAlign: "center", padding: "1em" }}>
                  Aucune absence trouvé.
                   </td>
                </tr>
              </tbody>
            </table>
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

export default AbsenceList;
