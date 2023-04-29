import "../assets/styles/rrh.css";

import React from "react";
import Navigation from "../components/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import InsertInvitationOutlinedIcon from "@mui/icons-material/InsertInvitationOutlined";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";
import {Button, ButtonBase, Divider, IconButton } from "@mui/material";
import RrhAbsArchPage from "../components/rrh_AbsArch";
import Tasks from "../components/TaskComponents/tasks";
import RrhCalendar from "../components/TaskComponents/rrhcalendar";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HourglassDisabledIcon from "@mui/icons-material/HourglassDisabled";
import { GetAllTaskExpert} from "../actions/task.action";

const style2 = {
  left: "58em",
  color: "#151582;",
  margin:"1.1em",
  '&:hover': {
    color: "#151582;",
  },

}

const style = {
  color: "#151582;",
  borderColor: "#151582;",

  '&:variant': {
    color: "#151582;",
  },

}
function ExpertTasksPage() {

  
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const tasks = useSelector((state) => state.task.tasks);

  const CurrentUser = {
    isConnected: auth.isConnected,
    nom: auth.user.nom,
    prenom: auth.user.prenom,
    matricule: auth.user.matricule,
    role: auth.user.role,
    operation: auth.user.operation,
    titre: auth.user.titre,
  };

  const [id, setId] = useState("");
  const [justif, setJustif] = useState("");
  const [justification, setJustification] = useState(false);
  const [Show_RrhAbsArchPage, setShow_RrhAbsArchPage] = React.useState(false);
  const [Show_RrhCalendar, setShow_RrhCalendar] = React.useState(false);

  const onClick_ShowRRHCalendar = () => setShow_RrhCalendar(true);

  useEffect(() => {
    dispatch(GetAllTaskExpert());
  }, [dispatch]);


  

  const reloadPage = () => {
    window.location.reload();
  };


  return (
    <div className="rrh_page">
      <Navigation user={CurrentUser} />
      <div className="rrh_container">
        <div className="page_name">
          Pages / Mon espace{" "}
          <p style={{ fontWeight: "bold", fontSize: "14px" }}>Taches & Challenges</p>
        </div>

        <div className="rrh_header">
          <div className="rrh_header_titles">
          <p className="rrh_header_title">Bienvenue {CurrentUser.nom}!</p>
          <p className="rrh_header_semititle">Titre : {CurrentUser.titre ? CurrentUser.titre : "Aucun titre"}</p>
          </div>
          <Divider orientation="vertical" flexItem></Divider>
            <a className="rrh_header_navs" href="/expertrh"><Button variant="outlined" size="large" sx={style}>Espace Expert</Button></a>
          <Divider orientation="vertical" flexItem></Divider>
            <a className="rrh_header_navs" href="/monespace/expertrh/taches"><Button variant="outlined" size="large" sx={style}>Taches</Button></a>
          <Divider orientation="vertical" flexItem></Divider>
          <a className="rrh_header_navs" href="/monespace/expertrh/demandes"><Button  variant="outlined" size="large" sx={style}>Demandes</Button></a>
          <Divider orientation="vertical" flexItem></Divider>
          <a className="rrh_header_navs" href="/monespace/expertrh/archive"><Button  variant="outlined" size="large" sx={style}>Archive</Button></a>
          <Divider orientation="vertical" flexItem></Divider>
        </div>

        <div className="rrh_body">
          <div className="rrh_infos">
            <p className="rrh_info">Taches & Challenges</p>
            { !Show_RrhCalendar ?
            <Button variant="outlined" sx={style2}  size="small" startIcon={<CalendarMonthIcon />}
              onClick={onClick_ShowRRHCalendar}>Agenda </Button>
               : 
            <Button variant="outlined" sx={style2}  size="small" startIcon={<KeyboardReturnIcon/>} 
              href="/monespace/expertrh/taches">Retour</Button>}
          </div>

          {Show_RrhCalendar ? <RrhCalendar/> : (
                  <div className="tasks_grid">
                  {tasks && tasks.length > 0 ? (
                    tasks.map((task, index) => (
                      <div className="tasks_grid_item" key={index}>
                        <div className="task_card">
                          <div className="task_menu"><IconButton size="small"><MoreHorizTwoToneIcon /></IconButton>
                          </div>
                          <p className="task_name">({task.user.operation}) {task.titre}</p>
                          <p className="task_desc">{task.description}</p>
                          <div className="task_info">
                            <i><HelpCenterOutlinedIcon /></i>
                            <span>Priorité: {task.priorite}</span>
                          </div>{" "}
                          <div className="task_info">
                            <i><InsertInvitationOutlinedIcon /></i>
                            <span> Date: {new Date(task.dateCreation).toLocaleDateString()} - {new Date(task.dateSuppression).toLocaleDateString()}</span>
                          </div>

                          </div>
                        </div>
                    ))
                  ) : (
                    <div className="tasks_grid_item">
                      <div className="task_add_card">
                        <p></p>
                        <HourglassDisabledIcon className="task_add_icon" />
                        <p></p>
                        <p className="task_add_name">
                          Il n'y a aucune tâche pour le moment.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
          )}
        </div>

        <div style={{ padding: "2em", textAlign: "center" }}>
          <p className="welcome_footer">Tous droits réservés - SoMezzo</p>
        </div>
      </div>
    </div>
  );
}

export default ExpertTasksPage;
