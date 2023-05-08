import React from "react";
import Navigation from "../components/navigation";
import { useSelector, useDispatch } from "react-redux";
import { Divider } from "@mui/material";
import { useEffect } from "react";
import { GetMyNotificationAction } from "../actions/notification.action";
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
          <h4 className="rrh_info">Mes notifications</h4>
          <p className="rrh_info">Récent</p>
          {notifications && notifications.length > 0 ? (
  notifications.map((notification) => notification.read === false) ? (
    notifications.map((item) =>
      item.notifications.map((notification) =>
        notification.read === false && (
          <p key={notification._id}>{notification.message}</p>
        )
      )
    )
  ) : (
    <p style={{ textAlign: "center" }}>No new notifications.</p>
  )
) : (
  <p style={{ textAlign: "center" }}>No new notifications.</p>
)}

          <Divider />
          <p className="rrh_info">Tout</p>
          {notifications && notifications.length > 0 ? (
            notifications.some((notification) => notification.read === true) ? (
              notifications.map(
                (notification) =>
                  notification.read === true && (
                    <p key={notification._id}>{notification.message} </p>
                  )
              )
            ) : (
              <p style={{ textAlign: "center" }}>No new notifications.</p>
            )
          ) : (
            <p style={{ textAlign: "center" }}>No new notifications.</p>
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
