import Navigation from "../navigation";
import "../../assets/styles/absencelist.css";
import { GetAllAbsence } from "../../actions/absence.action";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';

function AbsenceList() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const absences = useSelector((state) => state.absence.absences);

  useEffect(() => {dispatch(GetAllAbsence());}, [dispatch]);

  const CurrentProfile = {
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

    //fonction recherche
    const filteredabsence= absences.filter((absence) => {
      if (search === '') {
        return true;
      }
      if (absence.user.matricule.toLowerCase().includes(search.toLowerCase())) {
        return true;
      }
      return false;
    });

  return (
    <div className="absencelist_page">
      <Navigation user={CurrentProfile} />
      <div className="absencelist_container">
        <div className="page_name">
          Pages / List des Congés{" "}
          <p style={{ fontWeight: "bold", fontSize: "14px" }}>List des Congés</p>
          <InputBase className="searchbar"  placeholder="Rechercher.."   type="text"   value={search}  onChange={handleSearch}
        startAdornment={ <InputAdornment position="start"> <SearchIcon /> </InputAdornment>}  margin="normal"
        sx={{width:250}}/>

           { absences && absences.length > 0 ? 
          <table className="absences_table">
          <tbody>
              <tr>
                <th>Titulaire</th>
                <th>Type d'absence</th>
                <th>Date de début</th>
                <th>Date de fin</th>
                <th>Commentaire</th>
                <th>Status</th>
              </tr>
              {filteredabsence.map((item) => (
                item.absences.map((absence) => (
                  <tr key={absence._id}>
                  <td>{item.user.matricule}</td>
                  <td>{absence.type}</td>
                  <td>{new Date(absence.dateDebut).toLocaleDateString()}</td>
                  <td>{new Date(absence.dateFin).toLocaleDateString()}</td>
                  <td>{absence.commentaire ? absence.commentaire : "Pas de commentaires."}</td>
                  <td>{absence.etat}</td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
               :   
                <>
                <table className="absences_table">
                    <tbody>
                      <tr>
                        <th>Type d'absence</th>
                        <th>Date de debut de période d'absence</th>
                        <th>Date de fin de période d'absence</th>
                        <th>Commentaires</th>
                        <th>Status</th>
                      </tr>
                    </tbody>
                  </table><p style={{ textAlign: "center", padding:"1em" }}>Il n'y a pas d'absence.</p>
                  </>
           }
        </div>
      </div>
    </div>
  );
}

export default AbsenceList;
