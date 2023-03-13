import React from 'react'
import Navigation from '../components/navigation';
import {useSelector,useDispatch} from "react-redux";
import "../assets/styles/profile.css"
import { Container } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { SetProfileAction, GetProfileAction } from "../actions/profile.actions";



function ProfilePage() {

  const auth = useSelector((state) => state.auth);
  const profile = useSelector(state=>state.profiles.profile);

  const dispatch = useDispatch()
  const errors = useSelector(state=>state.errors)
  
  const CurrentProfile = {
    isConnected: auth.isConnected,
    name: auth.user.utilisateur,
    matricule : auth.user.matricule,
    role: auth.user.role,

  };

    
  useEffect(() => {
    ( () => {
      dispatch(GetProfileAction());
     })();
     }, [dispatch]);
      
  
  return (
  <div className='profile_page'>
  <Navigation user={CurrentProfile} />
  <div className="profile_container">
    <ul>
      <li>Matricule: {CurrentProfile.matricule}</li>
      <li>Nom d'utilisateur: {CurrentProfile.name}</li>
      <li>Role: {CurrentProfile.role}</li>

      <li>Teléphone: {profile.tel}</li>
      <li>Ville: {profile.ville}</li>
      <li>Pays: {profile.pays}</li>
      <li>Code Postale:{profile.codepostal}</li>
    </ul>

    </div>
  

  
  </div>
)}

export default ProfilePage