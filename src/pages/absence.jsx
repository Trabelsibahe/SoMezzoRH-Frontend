import Table from 'react-bootstrap/Table';
import React, { useEffect ,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../components/navigation";
import "../assets/styles/absence.css";
import { GetAbsence,AddAbsence} from "../actions/absence.action";
import Button from 'react-bootstrap/Button';


function Absence() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const absences = useSelector((state) => state.absence.absence);
    const errors = useSelector(state => state.errors)
    
    useEffect(() => {dispatch(GetAbsence());}, []);  
    const CurrentProfile = {
      isConnected: auth.isConnected,
      nom: auth.user.nom,
      prenom: auth.user.prenom,
      matricule: auth.user.matricule,
      role: auth.user.role,
    };
  
    const [showForm, setShowForm] = useState(false);
    const toggleForm = () => {setShowForm(!showForm);};

    const [form, setForm] = useState({});
  
    const handleSubmit = async(e) => {
      e.preventDefault(); 
      await dispatch(AddAbsence(form)); 
      await dispatch(GetAbsence()); 
       };
  
    return (
      <div className="absence_page">
        <Navigation user={CurrentProfile} />
        <div className="absence_container">
          <div className="page_name">
            Pages / Congés{" "}
            <p style={{ fontWeight: "bold", fontSize: "14px" }}>Congés</p>
            <Button onClick={toggleForm}>Ajouter un congé</Button>
            {showForm && (
              <form onSubmit={handleSubmit}>
                <label>
                  Type :<input type="text"name="type" value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value }) } />
                </label><br/>
                <label>
                  Date de début :<input type="date" name="dateDebut" value={form.dateDebut} onChange={(event) => setForm({ ...form, dateDebut: event.target.value }) }/>
                </label>
                <br/>
                <label>
                  Date de fin :<input type="date" name="dateFin" value={form.dateFin} onChange={(event) => setForm({ ...form, dateFin: event.target.value }) }/>
                </label>
                <br/>
                <label>
                  Commentaire :<input type="text" name="commentaire" value={form.commentaire} onChange={(event) => setForm({ ...form, commentaire: event.target.value }) }/>
                </label>
                <br/>
                <button type="submit" onClick={handleSubmit}>Ajouter</button>
              </form>
            )}
            {absences && absences.length > 0 ? <Table striped bordered hover>
            <thead>
              <tr>
                <th>type</th>
                <th>date de début</th>
                <th>date de fin </th>
                <th>commentaire</th>
                <th>etat</th>
              </tr>
            </thead>
            <tbody>
              {absences[0].absences.map((absence, index) => (
                <tr key={index}>
                  <td>{absence.type}</td>
                  <td>{new Date(absence.dateDebut).toLocaleDateString()}</td>
                  <td>{new Date(absence.dateFin).toLocaleDateString()}</td>
                  <td>{absence.commentaire}</td>
                  <td>{absence.etat}</td>
                </tr>
              ))}
            </tbody>
          </Table>
    : 'aucun congés'
    }
 </div>
</div>
</div>

)}
  export default Absence;