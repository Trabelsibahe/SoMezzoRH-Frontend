import "../assets/styles/expert.css";
import "../assets/styles/journal.css";

import React from "react";
import Navigation from "../components/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Divider, Button } from "@mui/material";
import { GetNotificationAction } from "../actions/notification.action";
import formatDate from "../components/formatdate";
import Expertheader from "../components/headers/expert_header";

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
        <Expertheader/>
        <div className="journal_body">
          <p className="rrh_info">Journal</p>
          {notifications && notifications.length > 0 ? (
            notifications.some((item) =>
              item.notifications.some((notification) => notification)
            ) ? (
              <>
              {notifications
                .flatMap((item) => item.notifications)
                .filter((notification) => notification.journal)
                .sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate))
                .map((notification) => (
                  <p className="notification_message" key={notification._id}>
                    {new Date(notification.creationDate).toLocaleString()} - {notification.journal}
                  </p>
                ))}
            </>
            
            ) : (
              <p className="notifications_emptymsg">Le journal est vide.</p>
            )
          ) : (
            <p className="notifications_emptymsg">Le journal est vide.</p>
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
