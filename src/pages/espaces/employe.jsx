import "../../assets/styles/employe.css";

import React from "react";
import Navigation from "../../components/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Button, ButtonBase, Divider } from "@mui/material";
import Tasks from "../../components/TaskComponents/tasks";
import RrhCalendar from "../../components/TaskComponents/rrhcalendar";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const style = {
  color: "#151582;",
  borderColor: "#151582;",

  '&:variant': {
    color: "#151582;",
  },

}
const style2 = {
  left: "58em",
  color: "#151582;",
  margin:"1.1em",
  '&:hover': {
    color: "#151582;",
  },

}
function EmployePage() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const CurrentUser = {
    isConnected: auth.isConnected,
    nom: auth.user.nom,
    prenom: auth.user.prenom,
    matricule: auth.user.matricule,
    role: auth.user.role,
    operation: auth.user.operation,
    active: auth.user.active
  };
  const [Show_RrhCalendar, setShow_RrhCalendar] = React.useState(false);

  const onClick_ShowRRHCalendar = () => setShow_RrhCalendar(true);


  
  const reloadPage = () => {
    window.location.reload();
  };

  return (

    <div className="emp_page">
      <Navigation user={CurrentUser} />
      <div className="emp_container">
        <div className="page_name">
          Pages / Mon espace{" "}
          <p style={{ fontWeight: "bold", fontSize: "14px" }}>
            Espace Employé(e)
          </p>
        </div>
        <div className="rrh_header">
          <div className="rrh_header_titles">
          <p className="rrh_header_title">Bienvenue {CurrentUser.nom} {CurrentUser.prenom} !</p>
          <p className="rrh_header_semititle">Votre opération est : {CurrentUser.operation}</p>
          </div>
          <Divider orientation="vertical" flexItem></Divider>
            <a className="rrh_header_navs" href="/emp"><Button variant="outlined" size="large" sx={style}>Taches & challenges</Button></a>
          <Divider orientation="vertical" flexItem></Divider>
            <a className="rrh_header_navs" href="/monespace/mesdemandes"><Button variant="outlined" size="large" sx={style}>Mes demandes</Button></a>
          <Divider orientation="vertical" flexItem></Divider>
          <a className="rrh_header_navs" href="/monespace/mesabsences"><Button  variant="outlined" size="large" sx={style}>Mes absences</Button></a>
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
              onClick={reloadPage}>Retour</Button>}
          </div>


          {Show_RrhCalendar ? <RrhCalendar/> : <Tasks />}
        </div>



        <div style={{ padding: "2em", textAlign: "center" }}>
          <p className="welcome_footer">Tous droits réservés - SoMezzo</p>
        </div>
      </div>

    </div>
    
  );
}

export default EmployePage;
