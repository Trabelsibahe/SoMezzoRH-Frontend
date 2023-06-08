import React, { useState } from "react";
import "../assets/styles/notification.css";
import Navigation from "../components/navigation";
import { useSelector, useDispatch } from "react-redux";
import { Button, Divider } from "@mui/material";
import { useEffect } from "react";
import {
  GetMyNotificationAction,
  SetNotificationReadaction,
} from "../actions/notification.action";
const style = {
  color: "#151582;",
  borderColor: "#151582;",
  left: "50em",

  "&:variant": {
    color: "#151582;",
  },
};
function MynotificationsPage() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const notifications = useSelector((state) => state.notification.notification);

  useEffect(() => {
    dispatch(GetMyNotificationAction());
  }, []);

  const CurrentUser = {
    isConnected: auth.isConnected,
    nom: auth.user.nom,
    prenom: auth.user.prenom,
    matricule: auth.user.matricule,
    role: auth.user.role,
    operation: auth.user.operation,
    active: auth.user.active,
  };

  const MarkAllAsRead = React.useCallback(() => {
    if (notifications) {
      notifications.forEach((notification) => {
        notification.notifications.forEach((item) => {
          dispatch(GetMyNotificationAction());
          dispatch(SetNotificationReadaction(item._id));
          dispatch(GetMyNotificationAction());
        });
      });
    }
  }, [dispatch, notifications]);

  const [read, setRead] = useState(true);

  return (
    <div className="rrh_page">
      <Navigation user={CurrentUser} />
      <div className="rrh_container">
        <div className="page_name">
          Pages / Notifications{" "}
          <p style={{ fontWeight: "bold", fontSize: "14px" }}>
            Mes notifications
          </p>
        </div>

        <div className="rrh_body">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h4 className="rrh_info">Nouvelles notifications</h4>
            {read ? (
              <Button
                sx={style}
                variant="outlined"
                size="small"
                onClick={MarkAllAsRead}
              >
                Tout marquer comme lu
              </Button>
            ) : (
              ""
            )}
          </div>

          {notifications && notifications.length > 0 ? (
            notifications.some((item) =>
              item.notifications.some(
                (notification) => notification.read === false
              )
            ) ? (
              notifications
                .flatMap((item) => item.notifications)
                .filter((notification) => notification.read === false)
                .sort(
                  (a, b) => new Date(b.creationDate) - new Date(a.creationDate)
                )
                .map((notification) => (
                  <p className="notification_message" key={notification._id}>
                    {new Date(notification.creationDate).toLocaleString()} -{" "}
                    {notification.journal}
                  </p>
                ))
            ) : (
              <p className="notifications_emptymsg">
                Aucune nouvelle notification.
              </p>
            )
          ) : (
            <p className="notifications_emptymsg">
              Aucune nouvelle notification.
            </p>
          )}

          <Divider sx={{ margin: "1em" }} />
          <h4 className="rrh_info">Anciennes notifications</h4>
          {notifications && notifications.length > 0 ? (
            notifications.some((item) =>
              item.notifications.some(
                (notification) => notification.read === true
              )
            ) ? (
              notifications
                .flatMap((item) => item.notifications)
                .filter((notification) => notification.read === true)
                .sort(
                  (a, b) => new Date(b.creationDate) - new Date(a.creationDate)
                )
                .map((notification) => (
                  <p className="notification_message" key={notification._id}>
                    {new Date(notification.creationDate).toLocaleString()} -{" "}
                    {notification.journal}
                  </p>
                ))
            ) : (
              <p className="notifications_emptymsg">
                Aucune nouvelle notification.
              </p>
            )
          ) : (
            <p className="notifications_emptymsg">
              Aucune nouvelle notification.
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

export default MynotificationsPage;
