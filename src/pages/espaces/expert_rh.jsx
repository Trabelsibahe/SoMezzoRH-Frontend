import "../../assets/styles/expert.css";

import React from "react";
import Navigation from "../../components/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { CountProfiles, GetProfileAction } from "../../actions/profile.actions";
import UserList  from "../../components/userlist/userlist_table";
import RegisterPage from "../../components/register"
import { Button, ButtonBase, Divider } from "@mui/material";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PageFooter from "../../components/footer";
import Archive from "../../pages/archive";
import { useNavigate } from 'react-router-dom';
import { FaFileArchive } from "react-icons/fa";
const style = {
  color: "#151582;",
  borderColor: "#151582;",

  '&:variant': {
    color: "#151582;",
  },

}

function Expert_Rh_Page() {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const count = useSelector(state => state.profiles.count.count);
  const errors = useSelector((state) => state.errors);
  useEffect(() => {
    dispatch(GetProfileAction());
    dispatch(CountProfiles());
  }, [dispatch]);


  const CurrentUser = {
    isConnected: auth.isConnected,
    nom: auth.user.nom,
    prenom: auth.user.prenom,
    matricule: auth.user.matricule,
    role: auth.user.role,
    titre: auth.user.titre
  };
  const [showRegister, setRegister] = React.useState(false)
  const onClick = () => setRegister(true)

  const [showarchive, setArchive] = React.useState(false)
  const onClickArchive = () => {
    navigate('/monespace/expertrh/archive');
  };
  return (
    <div className="expert_page">
      <Navigation user={CurrentUser} />
      <div className="expert_container">
      <div className="page_name">
          Pages / Mon espace{" "}
          <p style={{ fontWeight: "bold", fontSize: "14px" }}>
            Espace Expert RH
          </p>
        </div>
        <div className="rrh_header">
          <div className="rrh_header_titles">
          <p className="rrh_header_title">Bienvenue {CurrentUser.nom}!</p>
          <p className="rrh_header_semititle">Titre : {CurrentUser.titre ? CurrentUser.titre : "Aucun titre"}</p>
          </div>
          <Divider orientation="vertical" flexItem></Divider>
            <a className="rrh_header_navs" href="/expertrh"><Button variant="outlined" size="large" sx={style}>Espace Expert</Button></a>
          <Divider orientation="vertical" flexItem></Divider>
            <a className="rrh_header_navs" href="/monespace/expertrh/taches"><Button variant="outlined" size="large" sx={style}>Taches</Button></a>
          <Divider orientation="vertical" flexItem></Divider>
          <a className="rrh_header_navs" href="/monespace/expertrh/demandes"><Button  variant="outlined" size="large" sx={style}>Demandes</Button></a>
          <Divider orientation="vertical" flexItem></Divider>
          <a className="rrh_header_navs" href="/monespace/expertrh/archive"><Button  variant="outlined" size="large" sx={style}>Archive</Button></a>
          <Divider orientation="vertical" flexItem></Divider>


        </div>
        { showRegister ? <RegisterPage /> : 
        <div className="rrh_body"  >
          <p className="rrh_info">Liste des comptes </p>

          <div className="expert_menu">
          <Button className="expert_add_button" startIcon={<PersonAddAlt1Icon />} variant="outlined" onClick={onClick}>Ajouter un compte</Button> {" "}
          <Button className="expert_add_button" startIcon={<FaFileArchive />} variant="outlined" onClick={onClickArchive}>Voir Archive</Button> 
          </div>
          <UserList/>
        </div>
        }
        <div style={{ padding: "2em", textAlign: "center" }}>
          <p className="welcome_footer">Tous droits réservés - SoMezzo</p>
        </div>
      </div>
    </div>
  );
}

export default Expert_Rh_Page;
