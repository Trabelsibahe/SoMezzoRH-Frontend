import "../../assets/styles/expert.css";

import React from "react";
import Navigation from "../../components/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { CountProfiles, GetProfileAction } from "../../actions/profile.actions";
import UserList  from "../../components/userlist/userlist_table";
import RegisterPage from "../../components/register"
import { Button } from "@mui/material";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PageFooter from "../../components/footer";
import Archive from "../../pages/archive";
import { useNavigate } from 'react-router-dom';
import { FaFileArchive } from "react-icons/fa";

function Expert_Rh_Page() {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const count = useSelector(state => state.profiles.count.count);
  const errors = useSelector((state) => state.errors);
  useEffect(() => {
    dispatch(GetProfileAction());
    dispatch(CountProfiles());
  }, [dispatch]);
  const Currentexpert = {
    isConnected: auth.isConnected,
    nom: auth.user.nom,
    prenom: auth.user.prenom,
    matricule: auth.user.matricule,
    role: auth.user.role,
  };
  const [showRegister, setRegister] = React.useState(false)
  const onClick = () => setRegister(true)

  const [showarchive, setArchive] = React.useState(false)
  const onClickArchive = () => {
    navigate('/archive');
  };
  return (
    <div className="expert_page">
      <Navigation user={Currentexpert} />
      <div className="expert_container">
      <div className="page_name">
          Pages / Mon espace{" "}
          <p style={{ fontWeight: "bold", fontSize: "14px" }}>
            Espace Expert RH
          </p>
        </div>

        { showRegister ? <RegisterPage /> : 
        
        <div className="expert_body"  >
          <p className="expert_info">Liste des comptes </p>

          <div className="expert_menu">
          <p>Nombre des employés : {count}</p>
          <Button className="expert_add_button" startIcon={<PersonAddAlt1Icon />} variant="outlined" onClick={onClick}>Ajouter un compte</Button> {" "}
          <Button className="expert_add_button" startIcon={<FaFileArchive />} variant="outlined" onClick={onClickArchive}>Voir Archive</Button> 
          </div>

          <UserList/>
        </div>
        }
      </div>
      <PageFooter/>
    </div>
  );
}

export default Expert_Rh_Page;
