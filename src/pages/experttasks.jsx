import "../assets/styles/rrh.css";
import "../assets/styles/tasks.css";
import React from "react";
import { Box, Button, Divider, IconButton, Modal } from "@mui/material";
import Navigation from "../components/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import InsertInvitationOutlinedIcon from "@mui/icons-material/InsertInvitationOutlined";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";
import RrhAbsArchPage from "../components/rrh_AbsArch";
import Tasks from "../components/TaskComponents/tasks";
import RrhCalendar from "../components/TaskComponents/rrhcalendar";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HourglassDisabledIcon from "@mui/icons-material/HourglassDisabled";
import { GetAllChallengeExpert} from "../actions/Challenge.action";
import ExpertCalendar from "../components/TaskComponents/expertcalendar";
import Expertheader from "../components/headers/expert_header";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";

const style2 = {
  left: "58em",
  color: "#151582;",
  margin:"1.1em",
  '&:hover': {
    color: "#151582;",
  },

}

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
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    dispatch(GetAllChallengeExpert());
  }, [dispatch]);
  const [detais, setDetais] = useState(false);
  const handleClosedetais = () => setDetais(false);
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
      setDetais(true);
    }
  };

  

  const reloadPage = () => {
    window.location.reload();
  };


  return (
    <div className="rrh_page">
      <Navigation user={CurrentUser} />
      <div className="rrh_container">
        <div className="page_name">
          Pages / Mon espace{" "}
          <p style={{ fontWeight: "bold", fontSize: "14px" }}> Challenges</p>
        </div>

        <Expertheader/>

        <div className="rrh_body">
          <div className="rrh_infos">
            <p className="rrh_info"> Challenges</p>
            { !Show_RrhCalendar ?
            <Button variant="outlined" sx={style2}  size="small" startIcon={<CalendarMonthIcon />}
              onClick={onClick_ShowRRHCalendar}>Agenda </Button>
               : 
            <Button variant="outlined" sx={style2}  size="small" startIcon={<KeyboardReturnIcon/>} 
              href="/monespace/expertrh/Challenges">Retour</Button>}
          </div>

          {Show_RrhCalendar ? <ExpertCalendar/> : (
                  <div className="tasks_grid">
                  {tasks && tasks.length > 0 ? (
                    tasks.map((task, index) => (
                      <div className="tasks_grid_item" key={index}>
                        <div className="task_card">
                          <div className="task_menu">
                          <Button
                          onClick={() => handleShowdetails(task._id)}
                          style={{ color: "#151582" }}
                          startIcon={<GroupOutlinedIcon />}
                          size="small"
                        >
                          Participants
                        </Button>
                          </div>
                          <p className="task_name">({task.user.operation}) {task.titre}</p>
                          <p className="task_desc">{task.description}</p>
                          <div className="task_info">
                            <i><HelpCenterOutlinedIcon /></i>
                            <span>Priorité: {task.priorite}</span>
                          </div>{" "}
                          <div className="task_info">
                            <i><InsertInvitationOutlinedIcon /></i>
                            <span> Période: {new Date(task.dateCreation).toLocaleDateString()} - {new Date(task.dateSuppression).toLocaleDateString()}</span>
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
        <Modal open={detais} onHide={handleClosedetais}>
        <Box sx={style}>
          <ul style={{ listStyle: "none" }}>
            <h5>Participants à ce challenge:</h5>
            {participants.length > 0
              ? participants.map((participant) => (
                  <div>
                    <Divider />
                    <li key={participant.user._id}>
                      Participant(e): {participant.user.nom}{" "}
                      {participant.user.prenom}
                      <br />
                      Points de participation : {participant.participations}
                      <Divider />
                    </li>
                  </div>
                ))
              : "Aucune participation."}
          </ul>

          <Button variant="outlined" onClick={handleClosedetais}>
            Fermer
          </Button>
        </Box>
      </Modal>
        <div style={{ padding: "2em", textAlign: "center" }}>
          <p className="welcome_footer">Tous droits réservés - SoMezzo</p>
        </div>
      </div>
    </div>
  );
}

export default ExpertTasksPage;
