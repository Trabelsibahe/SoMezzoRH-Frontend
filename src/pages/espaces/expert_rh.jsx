import "../../assets/styles/expert.css";

import React from "react";
import Navigation from "../../components/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { SetProfileAction, GetProfileAction } from "../../actions/profile.actions";
import UserList  from "../../components/userlist/userlist_table";
import RegisterPage from "../../components/register"
import { Button } from "@mui/material";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PageFooter from "../../components/footer";

function Expert_Rh_Page() {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);

  const Currentexpert = {
    isConnected: auth.isConnected,
    nom: auth.user.nom,
    prenom: auth.user.prenom,
    matricule: auth.user.matricule,
    role: auth.user.role,
  };

  useEffect(() => {
    (() => {
      dispatch(GetProfileAction());
    })();
  }, [dispatch]);


  const [showRegister, setRegister] = React.useState(false)
  const onClick = () => setRegister(true)


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
            <Button className="expert_add_button" startIcon={<PersonAddAlt1Icon />} variant="outlined" onClick={onClick}>Ajouter un compte</Button>
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
