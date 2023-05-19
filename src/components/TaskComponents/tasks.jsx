import React from "react";
import { Button, IconButton } from "@mui/material";
import "../../assets/styles/tasks.css";
import InsertInvitationOutlinedIcon from "@mui/icons-material/InsertInvitationOutlined";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";
import AddIcon from "@mui/icons-material/Add";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { GetAllChallenge,supprimerChallenge } from "../../actions/Challenge.action";
import HourglassDisabledIcon from "@mui/icons-material/HourglassDisabled";

import Add_Task_Modal from "./task_modal";

function Tasks() {
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
    active: auth.user.active
  };


  useEffect(() => {
    dispatch(GetAllChallenge());
  }, [dispatch]);
  useEffect(() => {
    dispatch(supprimerChallenge());
  }, [dispatch]);


  return (
    <div>
      <div className="tasks_grid">
        {tasks && tasks.length > 0 ? (
          tasks.map((task, index) => (
            <div className="tasks_grid_item" key={index}>
              <div className="task_card">
                <div className="task_menu">
                  <IconButton size="small">
                    <MoreHorizTwoToneIcon />
                  </IconButton>
                </div>
                <p className="task_name">{task.titre}</p>
                <p className="task_desc">{task.description}</p>
                <div className="task_info">
                  <i><HelpCenterOutlinedIcon /></i>
                  <span>Priorité: {task.priorite}</span>
                </div>{" "}
                <div className="task_info">
                  <i>
                    <InsertInvitationOutlinedIcon />
                  </i>
                  <span> Période: {new Date(task.dateCreation).toLocaleDateString()} - {new Date(task.dateSuppression).toLocaleDateString()}</span>
                </div>
                <div></div>
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
        {CurrentUser.role === "RRH" ? 
        <div className="tasks_grid_item"> <Add_Task_Modal /></div>
        :    "" }
      </div>
    </div>
  );
}

export default Tasks;
