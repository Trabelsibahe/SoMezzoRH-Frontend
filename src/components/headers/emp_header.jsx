import React from "react";
import "../../assets/styles/espace_header.css";
import { Button, ButtonBase, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {CountProfiles} from "../../actions/profile.actions"
import {CountOperation,Countchallenge,countmesparticipation,countmestotal } from "../../actions/operation.action"


function EMPheader() {
  const auth = useSelector((state) => state.auth);
  const count1 = useSelector((state) => state.operation.count.count);
  const count2 = useSelector((state) => state.operation.countch.operationChallengesCount);
  const count3 = useSelector((state) => state.operation.countparemp.participationSum);
  const count4 = useSelector((state) => state.operation.counttotal.totalSum);


  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(CountProfiles());
    dispatch(CountOperation());
    dispatch(Countchallenge());
    dispatch(countmesparticipation());
    dispatch(countmestotal());
  }, [dispatch]);

  const CurrentUser = {
    isConnected: auth.isConnected,
    nom: auth.user.nom,
    prenom: auth.user.prenom,
    matricule: auth.user.matricule,
    role: auth.user.role,
    titre: auth.user.titre,
    operation: auth.user.operation
  };

  return (
    <div className="espace_header">
      <div className="espace_header_head">
        <div className="espace_header_titles">
        <p className="espace_header_title">
              Bienvenue {CurrentUser.nom} {CurrentUser.prenom}!
            </p>
            <p className="espace_header_semititle">
            Votre opération est {CurrentUser.operation}.
            </p>
        </div>
        <div className="espace_header_cards">
          <div className="espace_header_card1">
            <span className="espace_header_cardlist">
              <span className="espace_header_cardchild">
                <span className="espace_header_carditem">{count2 ? count2 : "0"}</span>
                <span className="espace_header_carditem2">Challenges</span>
              </span>
            </span>
            <span className="espace_header_cardlist">
              <span className="espace_header_cardchild">
                <span className="espace_header_carditem">{count3 ? count3 : "0"}</span>
                <span className="espace_header_carditem2">Participations</span>
              </span>
            </span>
          </div>

          <div className="espace_header_card2">
            <span className="espace_header_cardlist">
              <span className="espace_header_cardchild">
                <span className="espace_header_carditem">{count4 ? count4+"DT" : "0DT"}</span>
                <span className="espace_header_carditem2">gagnés</span>
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="espace_header_navbar">
        <a className="espace_header_navs" href="/emp">
          Challenges
        </a>
        <Divider orientation="vertical" flexItem></Divider>
        <a className="espace_header_navs" href="/monespace/mesdemandes">
          Mes demandes
        </a>
        <Divider orientation="vertical" flexItem></Divider>
        <a className="espace_header_navs" href="/monespace/mesabsences">
          Mes absences
        </a>
        <Divider orientation="vertical" flexItem></Divider>
        <a className="espace_header_navs" href="/monespace/santé">
          Espace santé
        </a>
      </div>
    </div>
  );
}

export default EMPheader;
