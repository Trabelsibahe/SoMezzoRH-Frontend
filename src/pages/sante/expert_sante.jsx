import React, { useEffect, useState } from "react";
import Expertheader from "../../components/headers/expert_header";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navigation from "../../components/navigation";
import "../../assets/styles/espace_sante.css"
import { Button, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { BiUnderline } from "react-icons/bi";
import {afficherdv,ajouterdate} from "../../actions/sante.action"
import moment from 'moment';
import formatDate from "../../components/formatdate";
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



function Expert_Sante() {
  const auth = useSelector((state) => state.auth);
  const date = useSelector(state => state.sante.date);

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
  useEffect(() => {
    dispatch(afficherdv());
  }, [dispatch]);
  const formattedDate = moment(date).format('DD-MM-YYYY')
  //moment.tz.setDefault('America/Los_Angeles')
  const onChangeHandler = (formattedDate) => {
    setData({
      ...data,
      date: formattedDate,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(data)
    dispatch(ajouterdate(data, navigate));
    
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
        <Expertheader/>
        <div className="rrh_body">
            <p className="rrh_info">Espace Santé: Rendez-vous médicaux</p>

            <div className="espace_sante">
                <div className="espace_sante_background">
                <h3 className="espace_sante_title">La prochaine visite médicale aura lieu le 
                <span style={{textDecoration:"underline"}}> {formattedDate}</span></h3>
                <form className="espace_sante_form" onSubmit={onSubmit}>
                        <p className="espace_sante_formtitle">Veuillez sélectionner la date de la prochaine visite médicale.</p>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker  
                        onChange={(date) =>
                      setData({ ...data, date: formatDate(date) })
                    }sx={style} margin="normal"  />
                       <TextField sx={style} type="number" placeholder="Capacité" InputProps={{ inputProps: { min: 1, max: 1000 } }}/>
                        <p>{" "}</p>
                        <button type="submit" className="espace_sante_btn" variant="outlined">Mettre à jour</button>
                        </LocalizationProvider>
                    </form>
                </div>
            </div>
        </div>
        <div className="rrh_body2">
          <h5 className="espace_sante_notice">Remarque: La capacité des visites médicales des patients est limitée à : 5 </h5>
          <div style={{ overflowX: "auto" }}>
          <table className="absences_table">
          <tbody>
                        <tr>
                        <th>Date de demande</th>
                          <th>Demandeur</th>
                          <th>Maladie</th>
                          <th>Commentaire</th>
                          <th>Etat</th>
                          <th>Action</th>
                        </tr>
                        <tr>
                          <td>23/05/2023 8h</td>
                          <td>Trabelsi Baha</td>
                          <td>Grippe</td>
                          <td>Aucune Commentaire</td>
                          <td style={{ }}> En attente</td>
                          <td><Button sx={{ margin: "0.5em" }} variant="outlined" size="small" >Accepter </Button>{" "}
                              <Button variant="outlined" color="error" size="small"onClick={() => {  }}>Refuser</Button>
                          </td>
                        </tr>
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
