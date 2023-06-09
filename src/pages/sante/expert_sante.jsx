import React, { useEffect, useState } from "react";
import Expertheader from "../../components/headers/expert_header";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navigation from "../../components/navigation";
import "../../assets/styles/espace_sante.css";
import { Button, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { BiUnderline } from "react-icons/bi";
import Modal from "react-bootstrap/Modal";
import Swal from 'sweetalert2';
import {
  afficherdv,
  ajouterdate,
  afficherdemande,
  etatrdv,
  archiverRdv,
} from "../../actions/sante.action";
import formatDate from "../../components/formatdate";
import { SendNotificationToOneUser } from "../../actions/notification.action";
import { format } from "date-fns";

const TextfieldStyle = {
  "label.Mui-focused": {
    color: "#2b2b2b",
  },
  ".MuiOutlinedInput-root:not(.date-picker)": {
    width: "110px",
    "&:hover fieldset": {
      borderColor: "#2b2b2b",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgba(36, 55, 123, 0.9)",
    },
  },
};
const DatepickerStyle = {
  "label.Mui-focused": {
    color: "#2b2b2b",
  },
  ".MuiOutlinedInput-root:not(.date-picker)": {
    "&:hover fieldset": {
      borderColor: "#2b2b2b",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgba(36, 55, 123, 0.9)",
    },
  },
};

function Expert_Sante() {
  const auth = useSelector((state) => state.auth);
  const date = useSelector((state) => state.sante.info);
  const demandes = useSelector((state) => state.sante.demandesrdv);

  const dispatch = useDispatch();
  const [data, setData] = useState();
  const navigate = useNavigate();
  const CurrentUser = {
    isConnected: auth.isConnected,
    nom: auth.user.nom,
    prenom: auth.user.prenom,
    matricule: auth.user.matricule,
    role: auth.user.role,
    operation: auth.user.operation,
    active: auth.user.active,
  };
  const [id, setId] = useState("");
  const [isRefuseModalOpen, setRefuseModalOpen] = useState(false);
  const [motif, setMotif] = useState("");
  const openRefuseModal = (demande) => {
    setId(demande._id);
    setMotif("");
    setRefuseModalOpen(true);
  };
  const closeRefuseModal = () => {
    setRefuseModalOpen(false);
    setMotif("");
  };
  useEffect(() => {
    dispatch(archiverRdv());
  }, [dispatch]);
  useEffect(() => {
    dispatch(afficherdv());
  }, [dispatch]);
  useEffect(() => {
    dispatch(afficherdemande());
  }, [dispatch]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(ajouterdate(data, navigate));
    await dispatch(afficherdemande());
  };
  const editrdv = async (id, action, userId, motif, matricule) => {
    const data = {
      etat: action,
      motif: motif,
    };
    console.log(matricule);
    const notification = {
      message: `L'Expert RH a ${data.etat} votre demande de rendez-vous médicale.`,
      journal: `La demande de rendez-vous médicale de l'employé sous le matricule "${matricule}" a été ${data.etat} par L'Expert RH.`,
    };

    await dispatch(etatrdv(id, data));
    await dispatch(SendNotificationToOneUser(userId, notification));
    await dispatch(afficherdemande());
  };

  var demandeDate = new Date(date.date);
  var options = { day: "numeric", month: "long", year: "numeric" };
  var frDate = demandeDate.toLocaleString("fr-FR", options);

  return (
    <div className="emp_page">
      <Navigation user={CurrentUser} />
      <div className="emp_container">
        <div className="page_name">
          Pages / Mon espace{" "}
          <p style={{ fontWeight: "bold", fontSize: "14px" }}>Espace Santé</p>
        </div>
        <Expertheader />
        <div className="rrh_body">
          <p className="rrh_info">Espace Santé: Rendez-vous médicaux</p>

          <div className="espace_sante">
            <div className="espace_sante_background">
              <h3 className="espace_sante_title">
                La prochaine visite médicale aura lieu le{" "}
                <span style={{ textDecoration: "underline" }}>
                  {" "}
                  <td>
                    {frDate === "Invalid Date" ? "Chargement..." : frDate}
                  </td>
                </span>
              </h3>
              <form className="espace_sante_form" onSubmit={onSubmit}>
                <p className="espace_sante_formtitle">
                  Veuillez sélectionner la date de la prochaine visite médicale.
                </p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    onChange={(date) =>
                      setData({ ...data, date: formatDate(date) })
                    }
                    sx={DatepickerStyle}
                    margin="normal"
                  />{" "}
                  <TextField
                    onChange={(event) =>
                      setData({ ...data, capacite: event.target.value })
                    }
                    sx={TextfieldStyle}
                    type="number"
                    placeholder="Capacité"
                    inputProps={{ min: 1, max: 10 }} required
                  />
                  <p> </p>
                  <button
                    type="submit"
                    className="espace_sante_btn"
                    variant="outlined"
                  >
                    Mettre à jour{" "}
                  </button>
                </LocalizationProvider>
              </form>
            </div>
          </div>
        </div>
        <div className="rrh_body2">
          <h5 className="espace_sante_notice">
            Remarque: La capacité des visites médicales des patients est limitée
            à : {date.capacite}{" "}
          </h5>
          <div style={{ overflowX: "auto" }}>
            <table className="absences_table">
              <thead>
                <tr>
                  <th>Date de demande</th>
                  <th>Demandeur</th>
                  <th>Maladie</th>
                  <th>Commentaire</th>
                  <th>État</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {demandes.length > 0 ? (
                  demandes.map((demande) =>
                    (demande.user.role === "EMP" || demande.user.role === "RRH")  ? (
                      <tr key={demande._id}>
                        <td>{new Date(demande.createdAt).toLocaleString()}</td>
                        <td>
                          {demande.user.nom} {demande.user.prenom}
                        </td>
                        <td>{demande.maladie}</td>
                        <td>
                          {demande.commentaire
                            ? demande.commentaire
                            : "Aucun commentaire"}
                        </td>
                        <td
                          style={{
                            color:
                              demande.etat === "en attente"
                                ? "blue"
                                : demande.etat === "refusé"
                                ? "red"
                                : "green",
                          }}
                        >
                          {demande.etat}
                        </td>


              {demande.etat === "en attente" ? 
              <td style={{width:"19%"}}>
                 <Button
  sx={{ margin: "0.5em" }}
  variant="outlined"
  size="small"
  onClick={async () => {
    Swal.fire({
      title: 'vous êtes sûr?',
      text: "Voulez-vous vraiment accepter ce RDV médical?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'oui, accepter'
    }).then((result) => {
      if (result.isConfirmed) {
        editrdv(demande._id, "accepté", demande.user._id, motif, demande.user.matricule);
        Swal.fire(
          'Accepté!',
          'Le rendez-vous médical a été accepté.',
          'succès'
        );
      }
    });
  }}
>
  Accepter
</Button>
<Button
  variant="outlined"
  color="error"
  size="small"
  onClick={async () => {
    Swal.fire({
      title: 'vous êtes sûr?',
      text: "Voulez-vous vraiment refuser ce RDV médical?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'oui, refuser'
    }).then((result) => {
      if (result.isConfirmed) {
        openRefuseModal(demande._id);
        Swal.fire(
          'Refusé!',
          'Le rendez-vous médical a été refusé.',
          'succès'
        );
      }
    });
  }}
>
  Refuser
</Button>
                          
                          <Modal show={isRefuseModalOpen} onHide={closeRefuseModal}  >
                            <Modal.Header closeButton>
                              <Modal.Title>
                                Motif de refus visites médicales
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <TextField
                                label="Motif de refus"
                                value={motif}
                                onChange={(e) => setMotif(e.target.value)}
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
                                  editrdv(
                                    demande._id,
                                    "refusé",
                                    demande.user._id,
                                    motif,
                                    demande.user.matricule
                                  );
                                  closeRefuseModal();
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
              </td> : (<td style={{padding:"1em"}}>Traitée</td>)}


                      </tr>
                    ) : (
                    <tr>
                      <td colSpan="8" style={{ textAlign: "center", padding: "1em" }} >Aucune demande trouvée. </td>
                    </tr>
                    )
                  )
                ) : (
                  <tr>
                  <td colSpan="8" style={{ textAlign: "center", padding: "1em" }} >Aucune demande trouvée. </td>
                </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ padding: "2em", textAlign: "center" }}>
          <p className="welcome_footer">Tous droits réservés - SoMezzo</p>
        </div>
      </div>
    </div>
  );
}

export default Expert_Sante;
