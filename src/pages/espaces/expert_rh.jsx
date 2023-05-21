import "../../assets/styles/expert.css";
import "../../assets/styles/espace_header.css";

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
const style = {
  color: "#151582;",
  borderColor: "#151582;",

  "&:variant": {
    color: "#151582;",
  },
};

function Expert_Rh_Page() {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const count = useSelector((state) => state.profiles.count.count);
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
    titre: auth.user.titre,
  };
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

        <div className="espace_header">
          <div className="espace_header_head">
            <div className="espace_header_titles">
              <p className="espace_header_title">
                Bienvenue {CurrentUser.nom}!
              </p>
              <p className="espace_header_semititle">
                Vous êtes connecté en tant que Expert RH.
              </p>
            </div>
            <div className="espace_header_cards">
              <div className="espace_header_card1">
                <span className="espace_header_cardlist">
                  <span className="espace_header_cardchild">
                    <span className="espace_header_carditem">102</span>
                    <span className="espace_header_carditem2">
                      Collaborateurs
                    </span>
                  </span>
                </span>
                <span className="espace_header_cardlist">
                  <span className="espace_header_cardchild">
                    <span className="espace_header_carditem">8</span>
                    <span className="espace_header_carditem2">
                      Opérations
                    </span>
                  </span>
                </span>
              </div>

              <div className="espace_header_card2">
              <span className="espace_header_cardlist">
                  <span className="espace_header_cardchild">
                    <span className="espace_header_carditem">10</span>
                    <span className="espace_header_carditem2">
                      Challenges
                    </span>
                  </span>
                </span>
                
              </div>
            </div>
          </div>
          <div className="espace_header_navbar">
            <a className="espace_header_navs" href="/expertrh">
              Mon espace
            </a>
            <Divider orientation="vertical" flexItem></Divider>
            <a
              className="espace_header_navs"
              href="/monespace/expertrh/Challenges"
            >
              Challenges
            </a>
            <Divider orientation="vertical" flexItem></Divider>
            <a
              className="espace_header_navs"
              href="/monespace/expertrh/demandes"
            >
              Demandes
            </a>
            <Divider orientation="vertical" flexItem></Divider>
            <a
              className="espace_header_navs"
              href="/monespace/expertrh/archive"
            >
              Archive
            </a>
            <Divider orientation="vertical" flexItem></Divider>
            <a
              className="espace_header_navs"
              href="/monespace/expertrh/journal"
            >
              Journal
            </a>
          </div>
        </div>

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
