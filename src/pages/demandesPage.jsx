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
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase } from "@mui/material";
import { SendNotificationToOneUser } from "../actions/notification.action";
import { TextField } from "@mui/material";
import Expertheader from "../components/headers/expert_header";
import Swal from 'sweetalert2';

const style = {
  color: "#151582;",
  borderColor: "#151582;",

  "&:variant": {
    color: "#151582;",
  },
};
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
  const [isRefuseModalOpen, setRefuseModalOpen] = useState(false);
  const [motif, setMotif] = useState("");
  const openRefuseModal = (absence) => {
    setId(absence._id);
    setMotif("");
    setRefuseModalOpen(true);
  };
  const closeRefuseModal = () => {
    setRefuseModalOpen(false);
    setMotif("");
  };

  const handleClosejustif = () => setJustification(false);
  const [Show_ExpertAbsArchPage, setShow_ExpertAbsArchPage] =
    React.useState(false);

  const handleShowJustif = (absence) => {
    setId(absence._id);
    setJustif(absence.justif);
    setJustification(true);
  };

  const OnChangeHandler = async (id, action, userId, motif, matricule) => {
    const data = {
      etat: action,
      motif: motif,
    };

    const notification = {
      message: `L'Expert RH a ${data.etat} votre demande d'absence.`,
      journal: `La demande d'absence de RRH sous le matricule "${matricule}" a été ${data.etat} par L'Expert RH.`
    };

    await dispatch(updateAbsence(id, data));
    await dispatch(SendNotificationToOneUser(userId, notification));
    await dispatch(GetAllAbsence());
  };

  useEffect(() => {
    dispatch(GetAllAbsence());
  }, []);

  const onClick_ExpertAbsArchPage = () => setShow_ExpertAbsArchPage(true);
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

  return (
    <div className="rrh_page">
      <Navigation user={CurrentUser} />
      <div className="rrh_container">
        <div className="page_name">
          Pages / Espace Expert RESPONSABLE RH METIER{" "}
          <p style={{ fontWeight: "bold", fontSize: "14px" }}>
            Demandes & Absences
          </p>
        </div>

        <Expertheader/>
        {Show_ExpertAbsArchPage ? (
          <ExpertAbsArchPage />
        ) : (
          <div className="rrh_body">
            <p className="rrh_info">Les demandes d'absence</p>
            <div>
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
            </div>
            <div style={{ overflowX: "auto" }}>
              {absences.length > 0 ? (
                <table className="absences_table">
                  <tbody>
                    <tr>
                      <th>Date de demande</th>
                      <th>Demandeur</th>
                      <th>Date de debut d'absence</th>
                      <th>Date de fin d'absence</th>
                      <th>Type d'absence</th>
                      <th>Justification</th>
                      <th>Commentaire</th>
                      <th>État</th>
                      <th>Actions</th>
                    </tr>
                    {filteredabsence.some((item) =>
                      item.absences.some(
                        (absence) => absence.etat === "En attente"
                      )
                    ) ? (
                      absences.map((item) =>
                        item.user.role === "RRH" ? (
                          item.absences.map((absence) =>
                            absence.etat === "En attente" ? (
                              <tr key={absence._id}>
                                <td>
                                  {new Date(
                                    absence.dateCreation
                                  ).toLocaleDateString()}
                                </td>
                                <td>
                                  ({item.user.matricule}) {item.user.nom}{" "}
                                  {item.user.prenom}
                                </td>
                                <td>
                                  {new Date(
                                    absence.dateDebut
                                  ).toLocaleDateString()}
                                </td>
                                <td>
                                  {new Date(
                                    absence.dateFin
                                  ).toLocaleDateString()}
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
                                <td style={{ color: "orangered" }}>
                                  {absence.etat}
                                </td>
                                <td>
                                <Button
  sx={{ margin: "0.5em" }}
  variant="outlined"
  color="success"
  size="small"
  onClick={() => {
    Swal.fire({
      title: 'Voulez-vous vraiment accepter cette absence?',
      showDenyButton: true,
      confirmButtonText: 'Accepter',
      denyButtonText: `Annuler`,
    }).then((result) => {
      if (result.isConfirmed) {
        OnChangeHandler(
          absence._id,
          'Accepté',
          item.user._id,
          motif,
          item.user.matricule
        );
        Swal.fire('La demande a été acceptée.', '', 'succès');
      }
    });
  }}
>
  Accepter
</Button>{" "}
<Button
  variant="outlined"
  color="error"
  size="small"
  onClick={() => {
    Swal.fire({
      title: 'Voulez-vous vraiment refuser cette absence?',
      showDenyButton: true,
      confirmButtonText: 'refuser',
      denyButtonText: `Annuler`,
    }).then((result) => {
      if (result.isConfirmed) {
        openRefuseModal(absence._id);
      }
    });
  }}
>
  Refuser
</Button>
                                  <Modal
                                    show={isRefuseModalOpen}
                                    onHide={closeRefuseModal}
                                  >
                                    <Modal.Header closeButton>
                                      <Modal.Title>
                                        Motif de refus de l'absence
                                      </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                      <TextField
                                        label="Motif de refus"
                                        value={motif}
                                        onChange={(e) =>
                                          setMotif(e.target.value)
                                        }
                                        fullWidth
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                      />
                                    </Modal.Body>
                                    <Modal.Footer>
                                      <Button
                                        variant="contained"
                                        onClick={() => {
                                          OnChangeHandler(absence._id,  "Refusé",  item.user._id, motif, item.user.matricule  );
                                          closeRefuseModal();
                                          Swal.fire("L'absence a été refusée.", 'error');
                                        }}
                                      >
                                        Soumettre
                                      </Button>
                                      <Button
                                        variant="secondary"
                                        onClick={closeRefuseModal}
                                      >
                                        Fermer
                                      </Button>
                                    </Modal.Footer>
                                  </Modal>
                                </td>
                              </tr>
                            ) : null
                          )
                        ) : ""
                      )
                    ) : (
                      <tr>
                        <td
                          colSpan="10"
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
