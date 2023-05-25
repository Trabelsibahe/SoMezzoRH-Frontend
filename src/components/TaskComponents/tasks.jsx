import React, { useState } from "react";
import { Box, Button, Divider, FormControlLabel, FormGroup, IconButton, Modal, Switch } from "@mui/material";
import "../../assets/styles/tasks.css";
import InsertInvitationOutlinedIcon from "@mui/icons-material/InsertInvitationOutlined";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";
import AddIcon from "@mui/icons-material/Add";
import { useSelector, useDispatch } from "react-redux";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import { useEffect } from "react";
import {
  GetAllChallenge,
  supprimerChallenge,
  participerChallenge,
  ListerOperationparticiper,
  updateChallenge,
} from "../../actions/Challenge.action";
import HourglassDisabledIcon from "@mui/icons-material/HourglassDisabled";
import Add_Task_Modal from "./task_modal";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FormControl } from "react-bootstrap";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #151582",
  boxShadow: 24,
  p: 4,
  width: "100%",
  maxWidth: "500px",
  margin: "0 auto",
  padding: "20px",
};
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
    active: auth.user.active,
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
    setShowMenu(false);
  };

  const [details, setDetails] = useState(false);
  const handleClosedetails = () => setDetails(false);
  const handleShowdetails = (id) => {
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
      setDetails(true);
    }
  };

  const [valide, setValide] = useState(false);
  const [pid, setPid] = useState("");

  const handleSwitchChange = (event, id) => {
    setPid(id);
    console.log(pid);
    setValide(event.target.checked);
    console.log(valide)
  }
  
  const onSubmit = (event, id) => {
    event.preventDefault();
    const data = {
      valide: valide,
    };
    dispatch(updateChallenge(id, data));
  };

  return (
    <div>
      <div className="tasks_grid">
        {tasks && tasks.length > 0 ? (
          tasks.map((task, index) => (
            <div className="tasks_grid_item" key={index}>
              <div className="task_card">
                <div className="task_menu">
                  {
                    <div className="menu">
                      {CurrentUser.role === "RRH" ? (
                        <Button
                          onClick={() => handleShowdetails(task._id)}
                          style={{ color: "#151582" }}
                          startIcon={<GroupOutlinedIcon />}
                          size="small"
                        >
                          Participants
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            if (
                              window.confirm(
                                "Voulez vous vraiment participer à ce challenge?"
                              )
                            )
                              Pariciper(task._id);
                          }}
                          style={{ color: "#151582" }}
                          startIcon={<GroupOutlinedIcon />}
                          size="small"
                        >
                          Participer
                        </Button>
                      )}
                    </div>
                  }
                </div>
                <p className="task_name">{task.titre}</p>
                <p className="task_desc">{task.description}</p>
                <div className="task_info">
                  <i>
                    <HelpCenterOutlinedIcon />
                  </i>
                  <span>Priorité: {task.priorite}</span>
                </div>{" "}
                <div className="task_info">
                  <i>
                    <InsertInvitationOutlinedIcon />
                  </i>
                  <span>
                    {" "}
                    Période: {new Date(
                      task.dateCreation
                    ).toLocaleDateString()}{" "}
                    - {new Date(task.dateSuppression).toLocaleDateString()}
                  </span>
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
        {CurrentUser.role === "RRH" ? (
          <div className="tasks_grid_item">
            {" "}
            <Add_Task_Modal />
          </div>
        ) : (
          ""
        )}
      </div>

      <Modal open={details} onClose={handleClosedetails}>
        <Box sx={style}>
          <ul style={{ listStyle: "none" }}>
            <h5>Participants à ce challenge:</h5>
            {participants.length > 0 ? (
              participants.map((participant) => (
                <div key={participant.user._id}>
                  <Divider />
                  <li>
                    Participant(e): {participant.user.nom}{" "}
                    {participant.user.prenom}
                    <br />
                    Points de participation: {participant.participations}
                    <form>
                      <FormGroup>
                    <FormControlLabel                  
                        value={participant.user._id}
                        control={<Switch
                            checked={valide === true}
                            onChange={() => handleSwitchChange(participant.user._id)}
                            />}
                        label={"Valide: "}
                             />
                  </FormGroup>
                      <Divider />
                    </form>
                  </li>
                </div>
              ))
            ) : (
              <p>Aucune participation.</p>
            )}
          </ul>
          <Button variant="outlined" onClick={handleClosedetails}>
            Fermer
          </Button>{" "}
        </Box>
      </Modal>
    </div>
  );
}

export default Tasks;
