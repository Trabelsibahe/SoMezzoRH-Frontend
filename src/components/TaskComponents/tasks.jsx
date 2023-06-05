import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  Modal,
  Switch,
} from "@mui/material";
import Swal from 'sweetalert2';
import "../../assets/styles/tasks.css";
import InsertInvitationOutlinedIcon from "@mui/icons-material/InsertInvitationOutlined";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";
import AddIcon from "@mui/icons-material/Add";
import { useSelector, useDispatch } from "react-redux";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import RedeemIcon from '@mui/icons-material/Redeem';
import { useEffect } from "react";
import {
  GetAllChallenge,
  supprimerChallenge,
  participerChallenge,
  ListerOperationparticiper,
  updateChallenge,
  updateTotale,
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
    id: auth.user && auth.user.id, // Check if auth.user is defined before accessing its 'id' property
    nom: auth.user && auth.user.nom,
    prenom: auth.user && auth.user.prenom,
    matricule: auth.user && auth.user.matricule,
    role: auth.user && auth.user.role,
    operation: auth.user && auth.user.operation,
    active: auth.user && auth.user.active,
  };
  const [id, setId] = useState("");
  const [participants, setParticipants] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [details, setDetails] = useState(false);
  const [detailsEMP, setDetailsEMP] = useState(false);
  const [valide, setValide] = useState([]);

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

  const handleClosedetails = () => setDetails(false);
  const handleClosedetailsEMP = () => setDetailsEMP(false);

  const handleShowdetails = (taskId) => {
    const task = tasks.find((task) => task._id === taskId);
    if (task) {
      const taskParticipants = task.participantsIds.map((participant) => ({
        user: {
          _id: participant.user._id,
          matricule: participant.user.matricule,
          nom: participant.user.nom,
          prenom: participant.user.prenom,
        },
        participations: participant.participations,
        valide: participant.valide || false,
        total: participant.total,
      }));

      const initialValide = taskParticipants.map((participant) => ({
        userId: participant.user._id,
        value: participant.valide || false,
        total: participant.total,
      }));

      setId(taskId);
      setParticipants(taskParticipants);
      setValide(initialValide);
      setDetails(true);
    }
  };
  const handleShowdetailsEMP = (taskId, CurrentUser) => {
    const task = tasks.find((task) => task._id === taskId);
    if (task && task.participantsIds) {
      const taskParticipants = task.participantsIds
        .filter(
          (participant) =>
            participant.user && participant.user._id === CurrentUser.id
        )
        .map((participant) => ({
          user: {
            _id: participant.user._id,
            matricule: participant.user.matricule,
            nom: participant.user.nom,
            prenom: participant.user.prenom,
          },
          participations: participant.participations,
          total: participant.total,
        }));

      const initialValide = taskParticipants.map((participant) => ({
        userId: participant.user._id,
        total: participant.total,
      }));

      setId(taskId);
      setParticipants(taskParticipants);
      setValide(initialValide);
      setDetailsEMP(true);
    }
  };

  const handleSwitchChange = (event, userId) => {
    const updatedValide = valide.map((item) => {
      if (item.userId === userId) {
        return {
          userId: item.userId,
          value: event.target.checked,
          total: item.total,
        };
      }
      return item;
    });
    setValide(updatedValide);
  };

  const onSubmit = (event, id) => {
    event.preventDefault();
    const data = {
      participants: valide.map((item) => ({
        userId: item.userId,
        valide: item.value,
        total: item.total,
      })),
    };

    dispatch(updateTotale(id, data));
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
                        <div>
                    <Button
  onClick={() => {
    Swal.fire({
      title: 'vous êtes sûr?',
      text: "Voulez-vous vraiment participer à ce challenge?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, participer!'
    }).then((result) => {
      if (result.isConfirmed) {
        Pariciper(task._id);
        Swal.fire(
          'participé!',
          'Vous avez participé avec succès au challenge.',
          'succès'
        );
      }
    });
  }}
  style={{ color: "#151582" }}
  startIcon={<GroupOutlinedIcon />}
  size="small"
>
  Participer
</Button>{" "}
                          <Button
                            onClick={() =>
                              handleShowdetailsEMP(task._id, CurrentUser)
                            }
                            style={{ color: "#151582" }}
                            startIcon={<RedeemIcon />}
                            size="small"
                          >
                            Bénéfices
                          </Button>
                        </div>
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
                </div>
                <div className="task_info">
                  <i>
                    <InsertInvitationOutlinedIcon />
                  </i>
                  <span>
                    Période: {new Date(
                      task.dateCreation
                    ).toLocaleDateString()}{" "}
                    - {new Date(task.dateSuppression).toLocaleDateString()}
                  </span>
                </div>
                <div className="task_info">
                  <i>
                    <RedeemIcon />
                  </i>
                  <span>Prime: {task.prime} DT</span>
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
                    <br />
                    total de ce Participant(e) {participant.total}
                    <form>
                      <FormGroup>
                        <FormControlLabel
                          value={participant.user._id}
                          control={
                            <Switch
                              checked={
                                valide.find(
                                  (item) => item.userId === participant.user._id
                                )?.value || false
                              }
                              onChange={(event) =>
                                handleSwitchChange(event, participant.user._id)
                              }
                            />
                          }
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
          <Button variant="outlined" onClick={(event) => onSubmit(event, id)}>
            Valider
          </Button>
        </Box>
      </Modal>
      <Modal open={detailsEMP} onClose={handleClosedetailsEMP}>
        <Box sx={style}>
          <ul style={{ listStyle: "none" }}>
            <h5>Mes Bénéfices </h5>
            {participants.length > 0 ? (
              participants.map((participant) => (
                <div key={participant.user._id}>
                  <Divider />
                  <li>
                    Points de participation: {participant.participations}
                    <br />
                    Mes totale de Bénéfices {participant.total}
                    <form>
                      <Divider />
                    </form>
                  </li>
                </div>
              ))
            ) : (
              <p>Vous n'avez pas participé .</p>
            )}
          </ul>
          <Button variant="outlined" onClick={handleClosedetailsEMP}>
            Fermer
          </Button>{" "}
        </Box>
      </Modal>
    </div>
  );
}

export default Tasks;
