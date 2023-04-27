import React from "react";
import Navigation from "../navigation";
import "../../assets/styles/absencelist.css";
import { listerdemandeExpert,updateDemande ,updateAttestation} from "../../actions/demande.action";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import { BsFillFileTextFill } from "react-icons/bs";
import '@mui/icons-material/OutlinedFlag';
import '@mui/icons-material/CheckCircleOutline';
import Form from "react-bootstrap/Form";

function DemandeList() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const demandes = useSelector((state) => state.demande.demandes);

  useEffect(() => {dispatch(listerdemandeExpert());}, [dispatch]);
  const CurrentProfile = {
    isConnected: auth.isConnected,
    nom: auth.user.nom,
    prenom: auth.user.prenom,
    matricule: auth.user.matricule,
    role: auth.user.role,
  };
  const [ id, setId ] = useState('');
  const [attestation,setAttestation]= useState('');
  const [etat, setEtat] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseEdit = () => setEdit(false);
  const handleShowEdit = (demande, action)   => {
    setId(demande._id);
    setEtat(demande.etat);
    editetat(action);
    setEdit(true);
  }
  let action = '';
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    if (edit) {
      editetat(action);
    }
  }, [edit, action]);
  const editetat = async (action) => {
    let newEtat = action;
    if (action === "en cour") {
      newEtat = "En cour";
    } else {  newEtat = "Traiter";}
    console.log(newEtat)
        const data = {
      etat: newEtat
    }
    await dispatch(updateDemande(id, data));
    await dispatch(listerdemandeExpert());
    handleCloseEdit();
    setEtat(newEtat);
  }
  const [att, setAtt] = useState(false);
  const handleCloseAtt = () => setAtt(false);
  const handleShowAtt = (id) => {
    demandes.forEach(demande => {
      if (demande._id == id){
       setId(demande._id)
       setAttestation(demande.attestation)
      }
    })
    setAtt(true);  
  }
  const editattestation = async () => {
  const data = new FormData();
    data.append("attestation", attestation);
    data.etat = "Traiter";
    await dispatch(updateAttestation(id,data))
    await dispatch(listerdemandeExpert())
    await dispatch(listerdemandeExpert())
    handleCloseAtt()
    setAttestation('')
  }
return (
  <div className="absencelist_page">
    <Navigation user={CurrentProfile} />
    <div className="absencelist_container">
      <div className="page_name">
        Pages / Demande{" "}
        <p style={{ fontWeight: "bold", fontSize: "14px" }}>Liste demande de Badge ou Attestation </p>
         { demandes && demandes.length > 0 ? 
        <table className="absences_table">
        <tbody>
            <tr>
              <th>Demandeur</th>
              <th>Type de demande</th>
              <th>Commentaire</th>
              <th>État</th>
              <th>Attestation</th>
              <th>Actions</th>
            </tr>
            {demandes.map((demande) =>
            (demande.etat ==="Réception" || demande.etat==="En cour") ?(
                  <tr key={demande._id}>
      <td>
        ({demande.user.matricule}) {demande.user.nom} {demande.user.prenom}
      </td>
      <td>{demande.type}</td>
      <td>
        {demande.commentaire ? demande.commentaire : "Aucun commentaire"}
      </td>
      <td style={{ color: "orangered" }}>{demande.etat}</td>
      <td>
      {demande.type === "Attestation" ?(
    <Button  color="error"  size="small" sx={{width:"40%", textAlign:"center", margin:"0.5em -0.8em"}} onClick={() => handleShowAtt(demande._id)}> Ajouter
     </Button>) : ("Attestation seulement")}
      </td>
     
      <td>
        <Button variant="outlined" color="error" size="small" 
         onClick={() => handleShowEdit(demande, "en cour")}>
          En cour
        </Button>
        {demande.type === "Badge" ?(
        <Button variant="outlined" color="error" size="small" 
         onClick={() => handleShowEdit(demande, "traiter")}>
          Traiter
        </Button>): null}
      </td>
    </tr>
            ) : null
)
}
          </tbody>
        </table>
             :   
              <>
              <table className="absences_table">
                  <tbody>
                    <tr>
                    <th>Demandeur</th>
                   <th>Type de demande</th>
                   <th>Commentaire</th>
              <th>État</th>
              <th>Attestation</th>
              <th>Actions</th>
                    </tr>
                  </tbody>
                </table><p style={{ textAlign: "center", padding:"1em" }}>Il n'y a pas d'absence.</p>
                </>
         }
      </div>
      <Modal show={att} onHide={handleCloseAtt}>
          <Modal.Header closeButton>
            <Modal.Title>Ajouter une Attestation </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <Form>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Charger une Attestation</Form.Label>
                <Form.Control
                  type="file"
                  name="attestation"
                  onChange={(e) => setAttestation(e.target.files[0])}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" >
              Annuler
            </Button>
            <Button variant="primary" onClick={editattestation}>
              Publier
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  </div>
);
}


export default DemandeList;
