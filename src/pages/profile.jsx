import React from "react";
import Navigation from "../components/navigation";
import { useSelector, useDispatch } from "react-redux";
import "../assets/styles/profile.css";
import { useEffect, useState } from "react";
import { SetProfileAction, GetProfileAction } from "../actions/profile.actions";
import Avatar from "../assets/images/avatar.avif";
import { fontWeight } from "@mui/system";

import Table from '@mui/material/Table';

function ProfilePage() {
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profiles.profile);

  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);

  const CurrentProfile = {
    isConnected: auth.isConnected,
    name: auth.user.utilisateur,
    matricule: auth.user.matricule,
    role: auth.user.role,
  };

  useEffect(() => {
    (() => {
      dispatch(GetProfileAction());
    })();
  }, [dispatch]);

  return (
    <div className="profile_page">
      <Navigation user={CurrentProfile} />
      <div className="profile_container">
        <div className="page_name">
          Pages / Profil
          <p style={{ fontWeight: "bold", fontSize: "14px" }}>Mon Profil</p>
        </div>
        <div className="profile_header">
          <img
            className="profile_header_avatar"
            alt="avatar"
            src={Avatar}
          ></img>
          <div className="profile_header_content">
            <p className="profile_header_p1">Trabelsi Bahe eddine</p>
            <p className="profile_header_p2">RESPONSABLE RH OPERATIONNEL</p>
          </div>
        </div>
        <div className="profile_body">

          <div className="profile_body_1">
            <p className="profile_info">Mes informations</p>
            
            <div className="profile_list">

              <ul><p className="profile_att">Matricule:</p> <p className="profile_value">{CurrentProfile.matricule}</p></ul>
              <ul><p className="profile_att">Nom d'utilisateur: </p> <p className="profile_value">{CurrentProfile.name}</p></ul>
              <ul><p className="profile_att">Telephone:</p> <p className="profile_value">{profile.tel}</p></ul>
              <ul><p className="profile_att">Pays: </p> <p className="profile_value">{profile.pays}</p></ul>
              <ul><p className="profile_att">Role: </p> <p className="profile_value">{CurrentProfile.role}</p></ul>

      

              </div>
          </div>
          <div className="profile_body_2">sssss</div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
