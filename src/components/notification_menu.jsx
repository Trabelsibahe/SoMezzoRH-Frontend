import * as React from "react";
import "../assets/styles/notification.css";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetMyNotificationAction } from "../actions/notification.action";
import { Divider, IconButton, ListItemIcon } from "@mui/material";
import { ListItemText, Typography } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import { useNavigate } from "react-router-dom";
import { NotificationAdd, Notifications } from "@mui/icons-material";

export default function NotificationMenu() {

  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notification.notification);
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);


  useEffect(() => {
    dispatch(GetMyNotificationAction());
  }, [dispatch]);


  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);


  const MyNotificationsPage = () => {
    navigate("/monespace/notifications");
    handleClose();
  };

  const [dot, setDot] = React.useState();
  
  const DotHandler = React.useCallback(() => {
    if (notifications) {
      notifications.forEach(notification => {
        if (notification.read === false) {
          return setDot("red_dot");
        }
      });
    }
  }, [notifications]);
  
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
    DotHandler();
  }, [open, DotHandler]);

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <IconButton
          size="large"
          sx={{ color: "black" }}
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <NotificationsNoneIcon />
          <span className={dot}></span>
        </IconButton>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper sx={{ width: 280, maxWidth: "100%" }}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open}   id="composition-menu" aria-labelledby="composition-button" onKeyDown={handleListKeyDown}>
                  {notifications && notifications.length > 0 ? (
  notifications.map((notification) => notification.read === false) ? (
    notifications.map((item) =>
      item.notifications.map((notification) =>
        notification.read === false && (
          <MenuItem
            key={notification._id}
            onClick={handleClose}
            sx={{ whiteSpace: "initial" }}
          >
            <ListItemIcon>
              <AnnouncementIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{notification.message}</ListItemText>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "10px" }}
            >
              Marquer comme lu
            </Typography>
          </MenuItem>
        )
      )
    )
  ) : (
    <MenuItem sx={{ whiteSpace: "initial", textAlign: "center" }} onClick={handleClose}>
      <ListItemText>Vous n'avez aucune nouvelle notification.</ListItemText>
    </MenuItem>
  )
) : " "}

                    <Divider />
                    <MenuItem onClick={MyNotificationsPage}>
                      <ListItemText>Voir tout...</ListItemText>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
}
