import React from "react";
import Navigation from "../components/navigation";
import { useSelector, useDispatch } from "react-redux";
import "../assets/styles/profile.css";
import { useEffect, useState } from "react";
import {GetProfileAction, EditMyProfileAction} from "../actions/profile.actions";
import { Divider, Input, Skeleton, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import altAvatar from "../assets/images/avatar.avif"
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import formatDate from "../components/formatdate";
import { Navigate } from "react-router-dom";
import { sendNotificationToExperts } from "../actions/notification.action";
import somezzologo from "../assets/images/icone.png";
import Swal from 'sweetalert2';

const style = {
  color: "#151582;",
  borderColor: "#151582;",

  '&:variant': {
    color: "#151582;",
  },

}

function ProfilePage() {
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profiles.profile);
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);

  const CurrentProfile = {
    isConnected: auth.isConnected,
    nom: auth.user.nom,
    prenom: auth.user.prenom,
    matricule: auth.user.matricule,
    role: auth.user.role,
    operation: auth.user.operation,
    titre: auth.user.titre,
    active: auth.user.active,

  };


  const [ nom, setNom ] = useState('');
  const [ prenom, setPrenom ] = useState('');
  const [ operation, setOperation ] = useState('');
  const [ titre, setTitre ] = useState('');
  const [ gouvernorat, setGouvernorat ] = useState('');
  const [ ville, setVille ] = useState('');
  const [ datenaiss, setDatenaiss ] = useState('');
  const [ adresse, setAdresse ] = useState('');
  const [ pays, setPays ] = useState('');
  const [ matricule, setMatricule ] = useState('');
  const [ role, setRole ] = useState('');
  const [ tel, setTel ] = useState('');
  const [ codepostal, setCodepostal ] = useState('');
  const [ email, setEmail ] = useState('');
  const [avatar, setAvatar] = useState('null');
  const [id, setId] = useState('');

  //handleshowedit
  const handleShowEdit = (profile) => {
    const { user, tel, ville, pays, codepostal,email,avatar,gouvernorat,adresse,datenaiss } = profile || {};

    if (user) {
      setNom(user.nom);
      setPrenom(user.prenom)
      setMatricule(user.matricule);
      setRole(user.role);
      setOperation(user.operation);
      setTitre(user.titre)
      setId(user._id);
      setEmail(user.email);

    }

    setTel(tel);
    setVille(ville);
    setPays(pays);
    setCodepostal(codepostal);
    setAvatar(avatar);
    setGouvernorat(gouvernorat);
    setAdresse(adresse);
    setDatenaiss(datenaiss);
  };

  // useeffect
  const [profileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    if (profile) {
      handleShowEdit(profile);
      setProfileLoaded(true);
    }
  }, [profile, profileLoaded]);

// edit function
const editUser = async () => {
  const data = new FormData();
  data.append('tel', tel);
  data.append('ville', ville);
  data.append('pays', pays);
  data.append('codepostal', codepostal);
  data.append('email', email);   
  data.append('gouvernorat', gouvernorat);   
  data.append('adresse', adresse);    
  data.append('datenaiss',datenaiss);    
  data.append('avatar', avatar);

  // Ajouter les attributs de l'utilisateur directement dans l'objet FormData
  data.append('nom', nom);
  data.append('prenom', prenom);  
  data.append('matricule', matricule);
  data.append('role', role);
  data.append('operation',operation);
  data.append('titre',titre);
  data.append("id", id);
  
  const notification = {
    journal: `Le titulaire du compte sous le matricule "${matricule}" a modifié son profil.`
  };

  await dispatch(EditMyProfileAction(data));
  await dispatch(sendNotificationToExperts(notification));
  await dispatch(GetProfileAction());
  await dispatch(GetProfileAction());
  await dispatch(GetProfileAction());
  await dispatch(GetProfileAction());
};

  return (
    <div className="profile_page">
      <Navigation user={CurrentProfile} />
      <div className="profile_container">

        <div className="page_name">
          Pages / Profil
          <p style={{ fontWeight: "bold", fontSize: "14px" }}>Mon Profil</p>
        </div>

        <div className="profile_header">
          {profile.avatar ? <img className="profile_header_avatar" alt="" src={`http://localhost:3030/${profile?.avatar}`} ></img>
          : (<img className="profile_header_avatar" alt="" src={altAvatar} ></img>)
        }
          <div className="profile_header_content">
            { nom && prenom ? <p className="profile_header_p1">{nom}{" "}{prenom}</p>
            : (
            <div className="profile_header_p1">
            <Skeleton animation="wave" width={150} height={20} />
            <Skeleton animation="wave" width={70} height={10} />
            </div>)
          }

            <p className="profile_header_p2">
              {role === 'EXPERT' ? ("RESPONSABLE RH METIER / EXPERT RH") : role === "EMP" ? ("EMPLOYÉ") : 
               role === "RRH" ? ("RESPONSABLE RH OPÉRATIONNEL") : null }</p>
          </div>
          <a className="profile_notf" href="/monespace/notifications">Mes notifications</a>
        </div>
        
        <div className="profile_body">
        <form>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <div className="profile_body_1">
            <p className="profile_info">Mes informations</p>

            <div className="profile_list">
             <TextField sx={{"& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "black"}}} className="profile_item" margin="normal" value={matricule} onChange={e => setMatricule(e.target.value)} size="small" label="Matricule" disabled/>
             <TextField className="profile_item" margin="normal" value={email} onChange={e => setEmail(e.target.value)}  size="small" label="Email"
             />
             </div>

             <div className="profile_list">
             <TextField className="profile_item" margin="normal" value={pays} onChange={e => setPays(e.target.value)} size="small" label="Pays"/>{" "}
             <TextField className="profile_item" margin="normal" value={gouvernorat} onChange={e => setGouvernorat(e.target.value)} size="small"  label="Gouvernorat"/>
             </div>

             <div className="profile_list">
             <TextField className="profile_item" margin="normal" value={ville} onChange={e => setVille(e.target.value)} size="small" label="Ville"/>{" "}
             <TextField className="profile_item" margin="normal" value={codepostal} onChange={e => setCodepostal(e.target.value)} size="small"  label="Code postale"/>
             </div>

             <div className="profile_list">
             <TextField className="profile_item2" multiline rows={2} margin="normal" value={adresse} onChange={e => setAdresse(e.target.value)} size="small" label="Adresse"/>{" "}
             </div>
          </div>
          </Box>
          </form>


          <div className="profile_body_2">
        
          <div className="profile_list">
          <label for="file" class="label-file"><CloudUploadOutlinedIcon fontSize="large" /> Changer votre avatar</label>
          <input id="file" className="input-file" type="file" onChange={(e) => setAvatar(e.target.files[0])} accept="image/png, image/jpeg, image/avif"/>
          </div>
                    
          <div className="profile_list">
             <TextField className="profile_item" margin="normal" type="number" value={tel} onChange={e => setTel(e.target.value)} size="small" label="Numéro de téléphone"/>{" "}
             <TextField className="profile_item3" margin="normal" type="date" value={formatDate(datenaiss)} onChange={e => setDatenaiss(e.target.value)} size="small"  label="Date de naissance"  />
             </div>

          <div className="profile_list">
             <TextField disabled sx={{"& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "black"}}}  className="profile_item" margin="normal" value={operation} onChange={e => setOperation(e.target.value)} size="small" label="Opération"/>{" "}
             <TextField disabled sx={{"& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "black"}}}  className="profile_item" margin="normal" value={titre} onChange={e => setTitre(e.target.value)} size="small" label="Titre"/>
          </div>

          {/*<div className="profile_list">
          <TextField className="profile_item" margin="normal" value={ville} onChange={e => setVille(e.target.value)} size="small" label="Vacant"/>{" "}
             <TextField className="profile_item" margin="normal" value={codepostal} onChange={e => setCodepostal(e.target.value)} size="small"  label="Vacant"/>
        </div>*/}
          

          <div className="profile_button"> 
          <Button
  style={{ backgroundColor: "#24377b", width: "50%" }}
  variant="contained"
  startIcon={<EditTwoToneIcon />}
  onClick={() => {
    Swal.fire({
      title: 'Voulez vous vraiment modifier votre profil?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Modifier'
    }).then((result) => {
      if (result.isConfirmed) {
        editUser();
        Swal.fire(
          'Votre profil a été modifié.',
        );
      } else {
        window.location.reload();
      }
    });
  }}
>
  modifier
</Button>

          </div>
          </div>
          
        </div>
        <div className="newsletter_footer">
            <p>Tous droits réservés - SoMezzo</p>
          </div>
      </div>
    </div>

  );
}

export default ProfilePage;
