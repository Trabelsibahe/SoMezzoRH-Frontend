import React from "react";
import EMPheader from "../../components/headers/emp_header";
import RRHheader from "../../components/headers/rrh_header";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Navigation from "../../components/navigation";
import "../../assets/styles/espace_sante.css"
import { Button, TextField } from "@mui/material";
import {afficherdv,ajouterdemande} from "../../actions/sante.action"
import moment from 'moment';
import { useParams } from "react-router-dom";
const style = {
    'label.Mui-focused': {
        color: '#2b2b2b;',
      },
      '.MuiOutlinedInput-root': {
        '&:hover fieldset': {
          borderColor: '#2b2b2b;',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'rgba(36, 55, 123, 0.9)',
        },
      }
    }
    

function Espace_Sante() {
  const auth = useSelector((state) => state.auth);
  const date = useSelector(state => state.sante.date);

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
  const formattedDate = moment(date).format('DD MMMM YYYY');

  const [data, setData] = useState({});
  const errors = useSelector((state) => state.errors);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setData({
      ...data,
      date: date,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(ajouterdemande(data, navigate));
  };
  
  return (
    <div className="emp_page">
      <Navigation user={CurrentUser} />
      <div className="emp_container">
        <div className="page_name">
          Pages / Mon espace{" "}
          <p style={{ fontWeight: "bold", fontSize: "14px" }}>
            Espace Santé
          </p>
        </div>
        {CurrentUser.role==="EMP" ? <EMPheader /> : <RRHheader/>}
        <div className="rrh_body">
            <p className="rrh_info">Espace Santé: Rendez-vous médicaux</p>

            <div className="espace_sante">
                <div className="espace_sante_background">
                <h3 className="espace_sante_title">La prochaine visite médicale est prévue {formattedDate}</h3>
                <form className="espace_sante_form" onSubmit={onSubmit}>
  <p className="espace_sante_formtitle">Réservez votre visite médicale dès maintenant.</p>
  <TextField onChange={onChangeHandler} name="maladie" sx={style} label="Maladie" type="text" margin="normal" autoComplete="off" required/>{" "}
  <TextField onChange={onChangeHandler} name="commentaire" sx={style} label="Commentaire" type="text"  margin="normal" autoComplete="off"/>
  <p>{" "}</p>
  <Button type="submit" className="espace_sante_btn" variant="outlined">Demander le rendez-vous</Button>
</form>

                </div>
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