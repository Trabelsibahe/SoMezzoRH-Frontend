import "../assets/styles/notfound.css"
import { useDispatch, useSelector } from 'react-redux';
import Table from "react-bootstrap/Table";
import React, { useEffect ,useState} from "react";
import{ GetArchives, deleteArchive} from '../actions/archive.action'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Navigation from "../components/navigation";
import "../assets/styles/archive.css";
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';

function Archive() {
  const dispatch = useDispatch(); 
  const auth = useSelector((state) => state.auth);
  const archives = useSelector(state => state.archives.archives)
    useEffect(()=>{dispatch(GetArchives())},[dispatch]);
    const CurrentUser = {
      isConnected: auth.isConnected,
      nom: auth.user.nom,
      prenom: auth.user.prenom,
      matricule: auth.user.matricule,
      role: auth.user.role,
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
    const deleteContact = async (id) =>{
      await dispatch(deleteArchive(id))
      await dispatch(GetArchives())
      await dispatch(GetArchives())
    } 
    return (
  <div className="archive_page">
      <Navigation user={CurrentUser} />
      <div className="archive_container">
        <div className="page_name">
          Pages / Archive{" "}
        </div>   
        <div className="expert_body"  >

        <p className="expert_info">Liste des Contact</p>

 
      <InputBase className="searchbar"  placeholder="Rechercher.."   type="text"   value={search}  onChange={handleSearch}
        startAdornment={ <InputAdornment position="start"> <SearchIcon /> </InputAdornment>}  margin="normal"
        sx={{width:250}}/>

      <div style={{ overflowX: "auto" }}>
        { 
        archives && archives.length > 0 ?   <table className="absences_table">

        <tbody>
          <tr>
            <th>avatar</th>
            <th>nom</th>
            <th>prenom</th>
            <th>matricule</th>
            <th>role</th>
            <th>tel</th>
            <th>ville</th>
            <th>pays</th>
            <th>codepostal</th>
            <th>adresse</th>
            <th>email</th>
            <th>action</th>
          </tr>

          {
            filteredContacts.map( (archives, index)=>
            <tr key={index}> 
            <td><img className="archive_Avatar" src={`http://localhost:3030/${archives?.avatar}`} alt="avatar"></img></td>
            <td>{archives.user.nom}</td>
            <td>{archives.user.prenom}</td>
            <td> {archives.user.matricule}</td>
            <td>{archives.user.role} </td> 
            <td>{archives.tel}</td>
            <td>{archives.ville}</td>
            <td>{archives.pays}</td>
            <td>{archives.codepostal}</td>
            <td>{archives.adresse}</td>
            <td>{archives.email}</td>
           <td><button class="button" onClick={() => deleteContact(archives._id)} >supprimer</button></td> 
          </tr>)
          }
          
        </tbody>
      </table>
      : 'aucun contact trouver ...'
      } 
      </div>
    </div>
</div>
      </div>
    )
}
  
  export default Archive;