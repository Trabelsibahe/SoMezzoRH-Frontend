import "../../assets/styles/expert.css";

import React from "react";
import Navigation from "../../components/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { CountProfiles, GetProfileAction } from "../../actions/profile.actions";
import UserList from "../../components/userlist/userlist_table";
import RegisterPage from "../../components/register";
import { Button, ButtonBase, Divider } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useNavigate } from "react-router-dom";
import Expertheader from "../../components/headers/expert_header";


function Expert_Rh_Page() {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const count = useSelector((state) => state.profiles.count.count);
  const errors = useSelector((state) => state.errors);

  const CurrentUser = {
    isConnected: auth.isConnected,
    nom: auth.user.nom,
    prenom: auth.user.prenom,
    matricule: auth.user.matricule,
    role: auth.user.role,
    titre: auth.user.titre,
  };

  useEffect(() => {
    dispatch(GetProfileAction());
    dispatch(CountProfiles());
      if (!CurrentUser.isConnected) {
        navigate("/login")
      }
  }, [dispatch]);


  const [showRegister, setRegister] = React.useState(false);
  const onClick = () => setRegister(true);

  const [showarchive, setArchive] = React.useState(false);
  const onClickArchive = () => {
    navigate("/monespace/expertrh/archive");
  };



  return (
    <div className="expert_page">
      <Navigation user={CurrentUser} />

      <div className="expert_container">
        <div className="page_name">
          Pages / Mon espace{" "}
          <p style={{ fontWeight: "bold", fontSize: "14px" }}>
            Espace Expert RESPONSABLE RH METIER
          </p>
        </div>

        <Expertheader/>
        
        {showRegister ? (
          <RegisterPage />
        ) : (
          <div className="rrh_body">
            <p className="rrh_info">Liste des comptes </p>

            <div className="expert_menu">
              <Button
                className="expert_add_button"
                startIcon={<PersonAddAlt1Icon />}
                variant="outlined"
                onClick={onClick}
              >
                Ajouter un compte
              </Button>{" "}
            </div>
            <UserList />
          </div>
        )}
        <div style={{ padding: "2em", textAlign: "center" }}>
          <p className="welcome_footer">Tous droits réservés - SoMezzo</p>
        </div>
      </div>

    </div>
  );
}

export default Expert_Rh_Page;
