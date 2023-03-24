import React from "react";
import Navigation from "../components/navigation";
import { useSelector, useDispatch } from "react-redux";
import "../assets/styles/profile.css";
import { useEffect, useState } from "react";
import { SetProfileAction, GetProfileAction ,modifierprofile} from "../actions/profile.actions";
import Avatar from "../assets/images/avatar.avif";
import { fontWeight } from "@mui/system";
import { Button } from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

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
  const [ ville, setVille ] = useState('');
  const [ pays, setPays ] = useState('');
  const [ utilisateur, setUtilisateur ] = useState('');
  const [ matricule, setMatricule ] = useState('');
  const [ role, setRole ] = useState('');
  const [ tel, setTel ] = useState('');
  const [ codepostal, setCodepostal ] = useState('');

  const [edit, setEdit] = useState(false);
  const handleCloseEdit = () => setEdit(false);
  const handleShowEdit = (profile) => {
    const { user, tel, ville, pays, codepostal } = profile;
  
    setUtilisateur(user.utilisateur);
    setMatricule(user.matricule);
    setRole(user.role);
    setTel(tel);
    setVille(ville);
    setPays(pays);
    setCodepostal(codepostal);
  
    setEdit(true);
  }
  const editContact = async () => {
  const data = {
    user :{
      utilisateur,
      matricule,
      role },
    tel,
    ville,
    pays,
    codepostal
  }
  await dispatch(modifierprofile(data))
  await dispatch(GetProfileAction())
  await dispatch(GetProfileAction())

    handleCloseEdit()
    setUtilisateur('')
    setMatricule('')
    setRole('')
    setTel('')
    setVille('')
    setPays('')
    setCodepostal('')
  }
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
              <ul><p className="profile_att">Ville: </p> <p className="profile_value">{profile.ville}</p></ul>
              <ul><p className="profile_att">Code Postal: </p> <p className="profile_value">{profile.codepostal}</p></ul>
              <ul><p className="profile_att">Role: </p> <p className="profile_value">{CurrentProfile.role}</p></ul>
              <ul>      <Button variant="success" className="me-3"  onClick={() => handleShowEdit(profile)}>
                modifier
              </Button></ul>
      

              </div>
          </div>
          <div className="profile_body_2">sssss</div>
        </div>
      </div>
         {/** pop up edit */}
         <Modal show={edit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier un Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Utilisateur</Form.Label>
              <Form.Control type="text"  value={utilisateur} onChange={e => setUtilisateur(e.target.value)} placeholder="modifier le nom" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>matricule</Form.Label>
              <Form.Control type="text" value={matricule} onChange={e => setMatricule(e.target.value)}  placeholder="modifier le matricule" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Role</Form.Label>
              <Form.Control type="text" value={role} onChange={e => setRole(e.target.value)}  placeholder="modifier le role" />
            </Form.Group>

         
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>tel</Form.Label>
              <Form.Control type="text" value={tel} onChange={e => setTel(e.target.value)}  placeholder="modifier le numero" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Ville</Form.Label>
              <Form.Control type="text" value={ville} onChange={e => setVille(e.target.value)}  placeholder="modifier le ville" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Pays</Form.Label>
              <Form.Control type="text" value={pays} onChange={e => setPays(e.target.value)}  placeholder="modifier le pays" />
            </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Code postal</Form.Label>
              <Form.Control type="text" value={codepostal} onChange={e => setCodepostal(e.target.value)}  placeholder="modifier le code postal" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button variant="primary" onClick={editContact}>
            Modifier
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProfilePage;
