import React, { useEffect } from 'react';
import "../assets/styles/inactive.css";
import textelogobleu from "../assets/images/textelogobleu.png";
import { Logout } from "../actions/auth.actions";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from 'react-bootstrap';


function InactivePage() {
  const auth = useSelector((state) => state.auth);

  const navigate = useNavigate();
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

  const LogoutHandler = () => {
    dispatch(Logout())
    navigate("/login");
  };

  useEffect(() => {
      if (!CurrentUser.isConnected) {
        navigate("/login")
      }
      }, []);

  
  return (
    <div className="inactive">
    <img className="logoblue"  alt="logogblue "src={textelogobleu}></img>
  <div className="inactive_container">
    <h2>Votre compte est bloqué.</h2>
    <h5>Si vous pensez qu'il s'agit d'une erreur, veuillez contacter l'administration.</h5>
    <button onClick={LogoutHandler}>Se déconnecter</button>
  </div>
  </div>
  )
}

export default InactivePage;
