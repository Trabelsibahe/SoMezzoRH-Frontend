import React, { useState } from "react";
import { Button, IconButton } from "@mui/material";
import "../../assets/styles/tasks.css";
import InsertInvitationOutlinedIcon from "@mui/icons-material/InsertInvitationOutlined";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";
import AddIcon from "@mui/icons-material/Add";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { GetAllChallenge,supprimerChallenge,participerChallenge,ListerOperationparticiper } from "../../actions/Challenge.action";
import HourglassDisabledIcon from "@mui/icons-material/HourglassDisabled";
import Add_Task_Modal from "./task_modal";
import Modal from "react-bootstrap/Modal";
import NavDropdown from 'react-bootstrap/NavDropdown';

import { Tune } from "@mui/icons-material";
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
  const [id, setId] = useState("");
  const [participants, setParticipants] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    dispatch(GetAllChallenge());
  }, [dispatch]);
  useEffect(() => {
    dispatch(supprimerChallenge());
  }, [dispatch]);
  const Pariciper = (challengeId) => {
    const data = {
      participer: "oui",
    };
    dispatch(participerChallenge(challengeId, data, CurrentUser.id));
    setShowMenu(false); // Ferme le menu après le clic
  };
  const [detais, setDetais] = useState(false);
  const handleClosedetais = () => setDetais(false);
  const handleShowdetais = (id) => {
    const task = tasks.find((task) => task._id === id);
    if (task) {
      const taskParticipants = task.participantsIds.map((participant) => ({
        user: {
          _id: participant.user._id,
          matricule: participant.user.matricule,
          nom: participant.user.nom,
          prenom: participant.user.prenom,
        },
        participations: participant.participations,
      }));
  
      setParticipants(taskParticipants);
      setDetais(true);
    }
  };
  
  return (
    <div>
      <div className="tasks_grid">
        {tasks && tasks.length > 0 ? (
          tasks.map((task, index) => (
            <div className="tasks_grid_item" key={index}>
              <div className="task_card">
                <div className="task_menu">
                <NavDropdown
  menuVariant="claire"
  title="participation"
  className="sidebar_item"
  onClick={() => setShowMenu(index)}
  style={{ color: '#151582' }}
>                  {showMenu === index && (
                    <div className="menu">
                      {CurrentUser.role === "RRH" ? (
                        <NavDropdown.Item  onClick={() => handleShowdetais(task._id)} >Détail</NavDropdown.Item>
                      ) : (
                        <NavDropdown.Item onClick={() => Pariciper(task._id)}>Participer</NavDropdown.Item>
                      )}
                    </div>
                  )}
             </NavDropdown>

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
      <Modal show={detais} onHide={handleClosedetais}>
  <Modal.Header closeButton>
    <Modal.Title>Les points des participants</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <ul>
      {participants &&
        participants.map((participant) => (
          <li key={participant.user._id}>
            Utilisateur : {participant.user.nom} {participant.user.prenom} de matricule {participant.user.matricule}
            <br />
            Points de participation : {participant.participations}
          </li>
        ))}
    </ul>
  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={handleClosedetais}>
      Annuler
    </Button>
  </Modal.Footer>
</Modal>


    </div>
  );
}

export default Tasks;
