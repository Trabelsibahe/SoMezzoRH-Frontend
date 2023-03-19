import "../assets/styles/notfound.css"
import { useDispatch, useSelector } from 'react-redux';
import Table from "react-bootstrap/Table";
import { Button } from 'react-bootstrap';
import React, { useEffect ,useState} from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import{ GetProfiles, deleteAndArchiveProfile , modifierContact} from '../actions/profile.actions'
import 'bootstrap/dist/css/bootstrap.min.css';
function Admin() {
  const dispatch = useDispatch(); 
    const profiles = useSelector(state => state.profiles.profiles);
    useEffect(()=>{dispatch(GetProfiles())},[dispatch]);
    
    const [ id, setId ] = useState('');
    const [ ville, setVille ] = useState('');
    const [ pays, setPays ] = useState('');
    const [ utilisateur, setUtilisateur ] = useState('');
    const [ matricule, setMatricule ] = useState('');
    const [ role, setRole ] = useState('');
    const [ tel, setTel ] = useState('');
    const [ codepostal, setCodepostal ] = useState('');

    const [edit, setEdit] = useState(false);
    const handleCloseEdit = () => setEdit(false);
    const handleShowEdit = (id) => {
      profiles.forEach(p => {
        if (p._id === id){
         setId(p._id)
         setUtilisateur(p.user.utilisateur)
         setMatricule(p.user.matricule)
         setRole(p.user.role)
         setTel(p.tel)
         setVille(p.ville)
         setPays(p.pays)
         setCodepostal(p.codepostal)
        }
      })
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
    await dispatch(modifierContact(id,data))
    await dispatch(GetProfiles())
    await dispatch(GetProfiles())
      handleCloseEdit()
      setId('')
      setUtilisateur('')
      setMatricule('')
      setRole('')
      setTel('')
      setVille('')
      setPays('')
      setCodepostal('')
    }
    const [search, setSearch] = useState('');
    const handleSearch = (event) => {
      setSearch(event.target.value);
    }
  
    const filteredContacts = profiles.filter((profile) => {
      if (search === '') {
        return true;
      }
      if (profile.user.matricule.toLowerCase().includes(search.toLowerCase())) {
        return true;
      }
      return false;
    });

   

    return (
      <div className="Expert">

<h2>Liste des Contact</h2>
<input type="text" value={search} onChange={handleSearch} />
        {profiles && profiles.length > 0 ? <Table striped bordered hover>
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
            filteredContacts.map( (profile, index)=>
            <tr key={index}> 
           <td>{index}</td>
            <td>{profile.user.utilisateur}</td>
            <td> {profile.user.matricule}</td>
            <td>{profile.user.role} </td> 
            <td>{profile.tel}</td>
            <td>{profile.ville}</td>
            <td>{profile.pays}</td>
            <td>{profile.codepostal}</td>
            <td>
            <Button variant="success" className="me-3"  onClick={() => handleShowEdit(profile._id)}>
                modifier
              </Button>
              <Button variant="danger" >supprimer</Button>
            </td>
          </tr>)
          }
          
        </tbody>
      </Table>
      : 'aucun contact trouver ...'
      } 
    


  
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
              <Form.Control type="number" value={tel} onChange={e => setTel(e.target.value)}  placeholder="modifier le ville" />
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
    )
}
  
  export default Admin;