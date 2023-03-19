import "../assets/styles/expert.css";

import React from "react";
import Navigation from "../components/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { SetProfileAction, GetProfileAction } from "../actions/profile.actions";
import SearchBar from "../components/searchbar";
import UserList from "../components/userlist_table";



function Expert_Rh_Page() {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);

  const Currentexpert = {
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
    <div className="expert_page">
      <Navigation user={Currentexpert} />
      <div className="expert_container">
        <div className="page_name">
          Pages / Mon espace{" "}
          <p style={{ fontWeight: "bold", fontSize: "14px" }}>
            Espace Expert RH
          </p>
        </div>
        <div className="expert_body">
          {" "}
          <p className="expert_info">Liste des comptes</p>
          <UserList/>
        </div>
      </div>
    </div>
  );
}

export default Expert_Rh_Page;
