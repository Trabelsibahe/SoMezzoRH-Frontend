import React from "react";
import "../../assets/styles/absencelist.css";
import {
  listerdemandeExpert,
  updateBadge,
  updateAttestation,
  updateRDv,
} from "../../actions/demande.action";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { Box, InputBase, Modal } from "@mui/material";
import Modals from "react-bootstrap/Modal";
import InputAdornment from "@mui/material/InputAdornment";
import "@mui/icons-material/OutlinedFlag";
import "@mui/icons-material/CheckCircleOutline";
import Form from "react-bootstrap/Form";
import { Button } from "@mui/material";
import { SendNotificationToOneUser } from "../../actions/notification.action";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #151582",
  boxShadow: 24,
  textAlign: "center",
  p: 4,
  width: "100%",
  maxWidth: "500px",
  margin: "0 auto",
  padding: "20px",
};
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
  const [userId, setUserId] = useState("");
  const [etat, setEtat] = useState("");
  const [show, setShow] = useState(false);
  const [isCalendrierlOpen, setCalendrierlOpen] = useState(false);
  const [rdv, setRdv] = useState("");
  const openCalendrierModal = (demande) => {
    setId(demande._id);
    setRdv("");
    setCalendrierlOpen(true);
  };
  const closeCalendrierModal = () => {
    setCalendrierlOpen(false);
    setRdv("");
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseEdit = () => setEdit(false);

  const handleShowEdit = (demande, action, userId, matricule) => {
    setId(demande._id);
    setEtat(demande.etat);
    editetat(action, userId, matricule);
    setEdit(true);
  };
  let action = "";
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    if (edit) {
      editetat(action);
    }
  }, [edit, action]);

  const editetat = async (action, userId, matricule) => {
    let newEtat = action;
    const data = {
      etat: "Accordé",
    };
    const notification = {
      message: "l'Expert RH a accordé votre Badge",
      journal: `La demande de badge sous le matricule "${matricule}" a été accordée.`,
    };
    await dispatch(updateBadge(id, data));
    await dispatch(SendNotificationToOneUser(userId, notification));
    await dispatch(listerdemandeExpert());
    handleCloseEdit();
    setEtat(newEtat);
  };

  const [att, setAtt] = useState(false);
  const handleCloseAtt = () => setAtt(false);

  const handleShowAtt = (id, userId) => {
    demandes.forEach((demande) => {
      if (demande._id === id) {
        setId(demande._id);
        setAttestation(demande.attestation);
        setUserId(userId);
      }
    });
    setAtt(true);
  };

  const [error, setError] = useState("");

  const editattestation = async (matricule) => {
    const data = new FormData();
    setAttestation("");
    data.append("attestation", attestation);
    if (attestation === "" || attestation === undefined) {
      setError("Veuillez charger l'attestation.");
    } else {
      data.append("etat", "Accordé");

      const notification = {
        message: "l'Expert RH a accordé votre Attestation.",
        journal: `La demande d'attestation sous le matricule "${matricule}" a été accordée.`,
      };

      await dispatch(updateAttestation(id, data));
      await dispatch(SendNotificationToOneUser(userId, notification));
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
    if (demande.createdAt.toLowerCase().includes(search.toLowerCase())) {
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
      <p className="rrh_info">
        Les demandes d'attestations ou des badges 
      </p>
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
              <th>Date de demande</th>
              <th>Demandeur</th>
              <th>Type de demande</th>
              <th>Commentaire</th>
              <th>État</th>
              <th>Actions</th>
            </tr>
            {filteredemande.some(() =>
              demandes.some((demande) => demande.etat === "en attente")
            ) ? (
              demandes.map(
                (demande) =>
                  demande.etat === "en attente" && (
                    <tr key={demande._id}>
                      <td>
                        {new Date(demande.createdAt).toLocaleDateString()}
                      </td>

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
                          <Button
                            variant="outlined"
                            color="success"
                            size="small"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Voulez-vous vraiment accorder ce badge?"
                                )
                              ) {
                                handleShowEdit(
                                  demande,
                                  "Accordé",
                                  demande.user._id,
                                  demande.user.matricule
                                );
                              }
                            }}
                          >
                            Accorder
                          </Button>
                        ) :  (
                          <Button
                            variant="outlined"
                            color="success"
                            size="small"
                            onClick={() =>
                              handleShowAtt(demande._id, demande.user._id)
                            }
                          >
                            Accorder
                          </Button>
                        )}
                        <Modal open={att} onClose={handleCloseAtt}>
                          <form>
                            <Box sx={style}>
                              <h5 style={{ textAlign: "center" }}>
                                Veuillez charger une attestation
                              </h5>
                              <input
                                type="file"
                                accept="image/*"
                                name="attestation"
                                onChange={(e) =>
                                  setAttestation(e.target.files[0])
                                }
                              />
                              <p style={{ color: "red", textAlign: "center" }}>
                                {error}
                              </p>
                              <Button
                                variant="secondary"
                                onClick={handleCloseAtt}
                              >
                                Annuler
                              </Button>
                              <Button
                                variant="outlined"
                                onClick={() =>
                                  editattestation(demande.user.matricule)
                                }
                              >
                                Accorder
                              </Button>
                            </Box>
                          </form>
                        </Modal>
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
    </div>
  );
}

export default DemandesList;
