import React from "react";
import EMPheader from "../../components/headers/emp_header";
import RRHheader from "../../components/headers/rrh_header";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Navigation from "../../components/navigation";
import "../../assets/styles/espace_sante.css";
import { Button, InputAdornment, TextField } from "@mui/material";
import { afficherdv, ajouterdemande, MesRDV } from "../../actions/sante.action";
import { format } from "date-fns";
import CommentTwoToneIcon from "@mui/icons-material/CommentTwoTone";
import HealingTwoToneIcon from "@mui/icons-material/HealingTwoTone";
import { useParams } from "react-router-dom";
import formatDate from "../../components/formatdate";
const style = {
  "label.Mui-focused": {
    color: "#2b2b2b;",
  },
  ".MuiOutlinedInput-root": {
    width: "210px",
    "&:hover fieldset": {
      borderColor: "#2b2b2b;",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgba(36, 55, 123, 0.9)",
    },
  },
};

function Espace_Sante() {
  const auth = useSelector((state) => state.auth);
  const date = useSelector((state) => state.sante.info);
  const demandes = useSelector((state) => state.sante.demande);

  const dispatch = useDispatch();

  const CurrentUser = {
    isConnected: auth.isConnected,
    nom: auth.user.nom,
    prenom: auth.user.prenom,
    matricule: auth.user.matricule,
    role: auth.user.role,
    operation: auth.user.operation,
    active: auth.user.active,
  };
  useEffect(() => {
    dispatch(afficherdv());
  }, [dispatch]);
  useEffect(() => {
    dispatch(MesRDV());
  }, [dispatch]);

  const [data, setData] = useState({});
  const errors = useSelector((state) => state.errors);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setData({
      ...data,
      date: date.date,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(ajouterdemande(data, navigate));
    console.log(data);
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
        {CurrentUser.role === "EMP" ? <EMPheader /> : <RRHheader />}
        <div className="rrh_body">
          <p className="rrh_info">Espace Santé: Rendez-vous médicaux</p>

          <div className="espace_sante">
            <div className="espace_sante_background">
              <h3 className="espace_sante_title">
                La prochaine visite médicale est prévue le{" "}
                {frDate === "Invalid Date" ? "Chargement..." : frDate}
              </h3>
              <form className="espace_sante_form" onSubmit={onSubmit}>
                <p className="espace_sante_formtitle">
                  Réservez votre visite médicale dès maintenant.
                </p>
                <TextField
                  onChange={onChangeHandler}
                  name="maladie"
                  sx={style}
                  label="Maladie"
                  type="text"
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <HealingTwoToneIcon sx={{ color: "#2b2b2b" }} />
                    ),
                  }}
                  autoComplete="off"
                  required
                />{" "}
                <TextField
                  onChange={onChangeHandler}
                  name="commentaire"
                  sx={style}
                  label="Commentaire"
                  InputProps={{
                    endAdornment: (
                      <CommentTwoToneIcon sx={{ color: "#2b2b2b" }} />
                    ),
                  }}
                  type="text"
                  margin="normal"
                  autoComplete="off"
                />
                <p> </p>
                <button
                  type="submit"
                  className="espace_sante_btn"
                  variant="outlined"
                >
                  Demander le rendez-vous
                </button>
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
                  <th>Date de rendez-vous</th>
                  <th>Maladie</th>
                  <th>Commentaire</th>
                  <th>État</th>
                </tr>
              </thead>
              <tbody>
                {demandes && demandes.length > 0 ? (
                  demandes.map((demande) => (
                    <tr key={demande._id}>
                      <td>{new Date(demande.createdAt).toLocaleString()}</td>
                      <td>{format(new Date(demande.date), "dd MMMM yyyy")}</td>
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
                        {demande.etat === "refusé" && demande.motif ? (
                          <>
                            <br />
                            {demande.motif}
                          </>
                        ) : null}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      style={{ textAlign: "center", padding: "1em" }}
                    >
                      Aucune demande trouvée.{" "}
                    </td>
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

export default Espace_Sante;
