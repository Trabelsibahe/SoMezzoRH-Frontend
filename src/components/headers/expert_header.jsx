import React from "react";
import "../../assets/styles/espace_header.css";
import { Button, ButtonBase, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

function Expert_header() {
  const auth = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const CurrentUser = {
    isConnected: auth.isConnected,
    nom: auth.user.nom,
    prenom: auth.user.prenom,
    matricule: auth.user.matricule,
    role: auth.user.role,
    titre: auth.user.titre,
  };

  return (
    <div className="espace_header">
      <div className="espace_header_head">
        <div className="espace_header_titles">
          <p className="espace_header_title">Bienvenue {CurrentUser.nom}!</p>
          <p className="espace_header_semititle">
            Vous êtes connecté en tant que Expert RH.
          </p>
        </div>
        <div className="espace_header_cards">
          <div className="espace_header_card1">
            <span className="espace_header_cardlist">
              <span className="espace_header_cardchild">
                <span className="espace_header_carditem">102</span>
                <span className="espace_header_carditem2">Collaborateurs</span>
              </span>
            </span>
            <span className="espace_header_cardlist">
              <span className="espace_header_cardchild">
                <span className="espace_header_carditem">8</span>
                <span className="espace_header_carditem2">Opérations</span>
              </span>
            </span>
          </div>

          <div className="espace_header_card2">
            <span className="espace_header_cardlist">
              <span className="espace_header_cardchild">
                <span className="espace_header_carditem">10</span>
                <span className="espace_header_carditem2">Challenges</span>
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
        <a className="espace_header_navs" href="/monespace/expertrh/Challenges">
          Challenges
        </a>
        <Divider orientation="vertical" flexItem></Divider>
        <a className="espace_header_navs" href="/monespace/expertrh/demandes">
          Demandes
        </a>
        <Divider orientation="vertical" flexItem></Divider>
        <a className="espace_header_navs" href="/monespace/expertrh/archive">
          Archive
        </a>
        <Divider orientation="vertical" flexItem></Divider>
        <a className="espace_header_navs" href="/monespace/expertrh/journal">
          Journal
        </a>
      </div>
    </div>
  );
}

export default Expert_header;
