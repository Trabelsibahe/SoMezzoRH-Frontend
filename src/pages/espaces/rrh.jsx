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
import Swal from "sweetalert2";
import { SendNotificationToOneUser } from "../../actions/notification.action";
import OperaList from "../../components/userlist/operalist_table";
import { Button, ButtonBase, Divider } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import RrhAbsArchPage from "../../components/rrh_AbsArch";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase } from "@mui/material";
import { TextField } from "@mui/material";
import RRHheader from "../../components/headers/rrh_header";
import { useNavigate } from "react-router-dom";

const style = {
  color: "#151582;",
  borderColor: "#151582;",

  "&:variant": {
    color: "#151582;",
  },
};

function RRH_Page() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const absences = useSelector((state) => state.operation.absences);
  const navigate = useNavigate();

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
    setMotif(""); // Réinitialiser le motif de refus
  };
  const [Show_RrhAbsArchPage, setShow_RrhAbsArchPage] = React.useState(false);
  const handleClosejustif = () => setJustification(false);

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
      message: `le Résponsable RH a ${data.etat} votre demande d'absence.`,
      journal: `La demande d'absence sous le matricule "${matricule}" a été ${data.etat} par Le responsable RH opérationnel ${CurrentUser.operation}.`,
    };

    await dispatch(updateAbsence(id, data));
    await dispatch(SendNotificationToOneUser(userId, notification));
    await dispatch(GetOperAbsenceAction());
    await dispatch(GetOperAbsenceAction());
  };

  useEffect(() => {
    dispatch(GetOperAbsenceAction());
    if (!CurrentUser.isConnected) {
      navigate("/login");
    } else if (CurrentUser.role !== "RRH") {
      navigate("/erreur");
    }
  }, []);

  const onClick_RrhAbsArchPage = () => setShow_RrhAbsArchPage(true);
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
          Pages / Mon espace{" "}
          <p style={{ fontWeight: "bold", fontSize: "14px" }}>
            Espace Résponsable RH Opérationnel
          </p>
        </div>

        <RRHheader />

        <div className="rrh_body">
          <OperaList />
        </div>
        {Show_RrhAbsArchPage ? (
          <RrhAbsArchPage />
        ) : (
          <div className="rrh_body2">
            <p className="rrh_info">Les demandes d'absences</p>
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
            <Button
              onClick={onClick_RrhAbsArchPage}
              sx={{ margin: "0.5em -25em" }}
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
                        item.absences.map(
                          (absence) =>
                            absence.etat === "En attente" && (
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
                                    onClick={() => {
                                      Swal.fire({
                                        title:
                                          "Voulez-vous vraiment accepter cette absence?",
                                        showDenyButton: true,
                                        confirmButtonText: "Accepter",
                                        denyButtonText: `Annuler`,
                                      }).then((result) => {
                                        if (result.isConfirmed) {
                                          OnChangeHandler(
                                            absence._id,
                                            "Accepté",
                                            item.user._id,
                                            motif,
                                            item.user.matricule
                                          );
                                          Swal.fire(
                                            "La demande a eté acceptée.",
                                            "",
                                            "succès"
                                          );
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
                                        title:
                                          "Voulez-vous vraiment refuser cette absence?",
                                        showDenyButton: true,
                                        confirmButtonText: "Refuser",
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
                                        Motif de refus l'absence
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
                                          OnChangeHandler(
                                            absence._id,
                                            "Refusé",
                                            item.user._id,
                                            motif,
                                            item.user.matricule
                                          );
                                          closeRefuseModal();
                                          Swal.fire(
                                            "La demande a été refusée."
                                          );
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
                            )
                        )
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
                      colSpan="10"
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
