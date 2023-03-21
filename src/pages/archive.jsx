import "../assets/styles/notfound.css"
import { useDispatch, useSelector } from 'react-redux';
import Table from "react-bootstrap/Table";
import React, { useEffect ,useState} from "react";
import{ GetArchives, deleteArchive} from '../actions/archive.action'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

function Archive() {
  const dispatch = useDispatch(); 
    const archives = useSelector(state => state.archives.archives)

    /*const CurrentProfile = {
      matricule : profiles.user.matricule,  
    };*/

    useEffect(()=>{dispatch(GetArchives())},[]);
    
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
      <div className="Expert">

<h2>Liste des Contact</h2>
<input type="text" value={search} onChange={handleSearch} />
        { 
        archives && archives.length > 0 ? <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>utilisateur</th>
            <th>matricule</th>
            <th>role</th>
            <th>tel</th>
            <th>ville</th>
            <th>pays</th>
            <th>codepostal</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>

          {
            filteredContacts.map( (archives, index)=>
            <tr key={index}> 
           <td>{index}</td>
            <td>{archives.user.utilisateur}</td>
            <td> {archives.user.matricule}</td>
            <td>{archives.user.role} </td> 
            <td>{archives.tel}</td>
            <td>{archives.ville}</td>
            <td>{archives.pays}</td>
            <td>{archives.codepostal}</td>
           <td><Button variant="danger" onClick={() => deleteContact(archives._id)} >supprimer</Button></td> 
          </tr>)
          }
          
        </tbody>
      </Table>
      : 'aucun contact trouver ...'
      } 
    

      </div>
    )
}
  
  export default Archive;