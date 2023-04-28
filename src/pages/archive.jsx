import "../assets/styles/notfound.css"
import { useDispatch, useSelector } from 'react-redux';
import Table from "react-bootstrap/Table";
import React, { useEffect ,useState} from "react";
import{ CountArchives, GetArchives, deleteArchive,EditArchiveAction} from '../actions/archive.action'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "../components/navigation";
import "../assets/styles/archive.css";
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import { Button, ButtonBase, Divider } from "@mui/material";
import AbsenceList from "../components/userlist/absencelist";
const style = {
  color: "#151582;",
  borderColor: "#151582;",

  '&:variant': {
    color: "#151582;",
  },

}
function Archive() {
  const dispatch = useDispatch(); 
  const auth = useSelector((state) => state.auth);
  const archives = useSelector((state) => state.archives.archives)
  const count = useSelector(state => state.archives.count.count);
  
  useEffect(()=>{dispatch(GetArchives());  
      dispatch(CountArchives());
  },
  [dispatch]);

    const CurrentUser = {
      isConnected: auth.isConnected,
      nom: auth.user.nom,
      prenom: auth.user.prenom,
      matricule: auth.user.matricule,
      role: auth.user.role,
      active: auth.user.active
    };
    const [search, setSearch] = useState('');
    const handleSearch = (event) => {
      setSearch(event.target.value);
    }


  //fonction recherche + getlist
    const filteredContacts = archives.filter((archive) => {
      if (search === '') {
        return true;
      }
      if (archive.user.matricule.toLowerCase().includes(search.toLowerCase())) {
        return true;
      }
      return false;
    });


    const RestoreUser = async (id) => {
      const archive = archives.find((archive) => archive._id === id);
      const data = {
        user: {
          nom: archive.user.nom,
          prenom: archive.user.prenom,
          matricule: archive.user.matricule,
          role: archive.user.role,
          operation: archive.user.operation,
          titre: archive.user.titre,
          active: true,
        },
        email: archive.email,
        tel: archive.tel,
        datenaiss: archive.datenaiss,
        pays: archive.pays,
        gouvernorat: archive.gouvernorat,
        ville: archive.ville,
        codepostal: archive.codepostal,
        adresse: archive.adresse,
      };
    
      await dispatch(EditArchiveAction(id, data));
      await dispatch(deleteArchive(id));
      await dispatch(GetArchives());
      await dispatch(GetArchives());

    };
    

  return (
  <div className="archive_page">
      <Navigation user={CurrentUser} />
      <div className="archive_container">
      <div className="page_name">
          Pages / Espace Expert RH Opérationnel
          <p style={{ fontWeight: "bold", fontSize: "14px" }}>
            Archive
          </p>
        </div>
        <div className="rrh_header">
          <div className="rrh_header_titles">
          <p className="rrh_header_title">Bienvenue {CurrentUser.nom}!</p>
          <p className="rrh_header_semititle">Titre : {CurrentUser.titre ? CurrentUser.titre : "Aucun titre"}</p>
          </div>
          <Divider orientation="vertical" flexItem></Divider>
            <a className="rrh_header_navs" href="/expertrh"><Button variant="outlined" size="large" sx={style}>Espace Expert</Button></a>
          <Divider orientation="vertical" flexItem></Divider>
            <a className="rrh_header_navs" href="/monespace/expertrh/taches"><Button variant="outlined" size="large" sx={style}>Taches</Button></a>
          <Divider orientation="vertical" flexItem></Divider>
          <a className="rrh_header_navs" href="/monespace/expertrh/demandes"><Button  variant="outlined" size="large" sx={style}>Demandes</Button></a>
          <Divider orientation="vertical" flexItem></Divider>
          <a className="rrh_header_navs" href="/monespace/expertrh/archive"><Button  variant="outlined" size="large" sx={style}>Archive</Button></a>
          <Divider orientation="vertical" flexItem></Divider>
        </div>


        <div className="rrh_body">
        <p className="expert_info">Liste des comptes archivés</p>

      <InputBase className="searchbar"  placeholder="Rechercher.."   type="text"   value={search}  onChange={handleSearch}
        startAdornment={ <InputAdornment position="start"> <SearchIcon /> </InputAdornment>}  margin="normal"sx={{width:250}}/>

      <div style={{ overflowX: "auto" }}>
        { 
        archives && archives.length > 0 ?   
        <table className="absences_table">

        <tbody>
          <tr>
            <th>Photo</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Matricule</th>
            <th>Role</th>
            <th>Opération</th>
            <th>Titre</th>
            <th>Email</th>
            <th>action</th>
          </tr>

          {
            filteredContacts.map( (archive, index)=>
            <tr key={index}> 
            <td><img className="archive_Avatar" src={`http://localhost:3030/${archive?.avatar}`} alt="avatar"></img></td>
            <td>{archive.user.nom}</td>
            <td>{archive.user.prenom}</td>
            <td> {archive.user.matricule}</td>
            <td>{archive.user.role} </td> 
            <td>{archive.user.operation}</td>
            <td>{archive.user.titre ? archive.user.titre : "Aucun titre"}</td>
            <td>{archive.email}</td>
           <td><button class="button" onClick={() => RestoreUser(archive._id)} >Restaurer</button></td> 
          </tr>)
          }
          
        </tbody>
      </table>
      :  <table className="absences_table">
      <tbody>
            <th>Photo</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Matricule</th>
            <th>Role</th>
            <th>Opération</th>
            <th>Titre</th>
            <th>Email</th>
            <th>action</th>
      </tbody>
    <tr>
      <td
        colSpan="10"
        style={{ textAlign: "center", padding: "1em" }}
      >
        Aucun utilisateur archivé.
      </td>
    </tr>
    </table>
      } 
      </div>
        </div>

        <div className="rrh_body">
          <AbsenceList/>
        </div>
        
        <div style={{ padding: "2em", textAlign: "center" }}>
          <p className="welcome_footer">Tous droits réservés - SoMezzo</p>
        </div>
      </div>
      </div>
    )
}
  
  export default Archive;