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
import {
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import { useNavigate } from 'react-router-dom';


export default function NotificationMenu() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

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
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);


  const MyNotificationsPage = () => {
    navigate("/monespace/notifications");
    handleClose();
  }

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
          <span className="red_dot"></span>
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
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClose} sx={{whiteSpace:"initial"}}>
                      <ListItemIcon>
                        <AnnouncementIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Mark has added you to his wanted list.</ListItemText>
                      <Typography variant="body2" color="text.secondary" sx={{fontSize:"10px"}}>
                      Marquer comme lu
                      </Typography>
                    </MenuItem>

                    <MenuItem onClick={handleClose} sx={{whiteSpace:"initial"}}>
                      <ListItemIcon>
                        <AnnouncementIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>ahla cv labes alik winek chaaml chfama jdid</ListItemText>
                      <Typography variant="body2" color="text.secondary" sx={{fontSize:"10px"}}>
                      Marquer comme lu
                      </Typography>
                    </MenuItem>

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
