import "../assets/styles/expert.css";
import React from "react";
import Navigation from "../components/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { CountProfiles, GetProfileAction } from "../actions/profile.actions";
import { useNavigate } from "react-router-dom";
import { Divider, Button } from "@mui/material";
import { GetNotificationAction } from "../actions/notification.action";
import formatDate from "../components/formatdate";

const style = {
  color: "#151582;",
  borderColor: "#151582;",

  "&:variant": {
    color: "#151582;",
  },
};

function Journal() {
  const auth = useSelector((state) => state.auth);
  const notifications = useSelector(
    (state) => state.notification.notifications
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetNotificationAction());
  }, [dispatch]);

  const CurrentUser = {
    isConnected: auth.isConnected,
    nom: auth.user.nom,
    prenom: auth.user.prenom,
    matricule: auth.user.matricule,
    role: auth.user.role,
    titre: auth.user.titre,
  };

  return (
    <div className="expert_page">
      <Navigation user={CurrentUser} />
      <div className="expert_container">
        <div className="page_name">
          Pages / Espace Expert RESPONSABLE RH METIER{" "}
          <p style={{ fontWeight: "bold", fontSize: "14px" }}>Journal</p>
        </div>
        <div className="rrh_header">
          <div className="rrh_header_titles">
            <p className="rrh_header_title">Bienvenue {CurrentUser.nom}!</p>
            <p className="rrh_header_semititle">
              Titre : {CurrentUser.titre ? CurrentUser.titre : "Aucun titre"}
            </p>
          </div>
          <Divider orientation="vertical" flexItem></Divider>
          <a className="rrh_header_navs" href="/expertrh">
            <Button variant="outlined" size="large" sx={style}>
              Espace Expert
            </Button>
          </a>
          <Divider orientation="vertical" flexItem></Divider>
          <a className="rrh_header_navs" href="/monespace/expertrh/taches">
            <Button variant="outlined" size="large" sx={style}>
              Taches
            </Button>
          </a>
          <Divider orientation="vertical" flexItem></Divider>
          <a className="rrh_header_navs" href="/monespace/expertrh/demandes">
            <Button variant="outlined" size="large" sx={style}>
              Demandes
            </Button>
          </a>
          <Divider orientation="vertical" flexItem></Divider>
          <a className="rrh_header_navs" href="/monespace/expertrh/archive">
            <Button variant="outlined" size="large" sx={style}>
              Archive
            </Button>
          </a>
          <Divider orientation="vertical" flexItem></Divider>
          <a className="rrh_header_navs" href="/monespace/expertrh/journal">
            <Button variant="outlined" size="large" sx={style}>
              Journal
            </Button>
          </a>
        </div>
        <div className="rrh_body">
          <p className="rrh_info">Journal</p>
          {notifications && notifications.length > 0 ? (
            notifications.some((item) =>
              item.notifications.some((notification) => notification)
            ) ? (
              notifications.map((item) =>
                item.notifications.map((notification) => (
                  <p className="notification_message" key={notification._id}>
                    {formatDate(notification.creationDate)}{" - "}
                    {notification.journal}
                  </p>
                ))
              )
            ) : (
              <p className="notifications_emptymsg">
                Le journal est vide.
              </p>
            )
          ) : (
            <p className="notifications_emptymsg">
              Le journal est vide.
            </p>
          )}
        </div>

        <div style={{ padding: "2em", textAlign: "center" }}>
          <p className="welcome_footer">Tous droits réservés - SoMezzo</p>
        </div>
      </div>
    </div>
  );
}

export default Journal;
