
import axios from 'axios'
import { santeConstants } from '../actions/constantes';
import Swal from 'sweetalert2';

export const afficherdv = () => dispatch => {
    axios.get("http://127.0.0.1:3030/api/date/afficher")
      .then(res => {
        dispatch({
          type: santeConstants.GET_DATE,
          payload: res.data
        })
      })
      .catch(err => {
        dispatch({
          type: santeConstants.GET_DATE_FAILURE,
          payload: err.response.data
        })
      });
  }
  export const ajouterdemande = (data) => {
    return async dispatch => {
      dispatch({ type: santeConstants.ADD_DEMANDE_REQUEST })
      try {
        const res = await axios.post(`http://127.0.0.1:3030/api/rdv/add`, data)
        if (res.status === 200) {
          dispatch({
            type: santeConstants.ADD_ADEMANDE_SUCCESS,
            payload: { createddemande: res.data }
          })
          window.location.reload()
          Swal.fire('Demande visite médicale ajoutée.')
  
        }
      } catch (err) {
        dispatch({
          type: santeConstants.ADD_DEMANDE_FAILURE,
          payload: err.response.data
        })
      }
    }
  }
  export const ajouterdate = (data) => {
    return async (dispatch) => {
      dispatch({ type: santeConstants.ADD_DATE_REQUEST });
      try {
        const res = await axios.post('http://127.0.0.1:3030/api/date/add', data);
        if (res.status === 200) {
          dispatch({
            type: santeConstants.ADD_DATE_SUCCESS,
            payload: res.data 
          });
          window.location.reload();
         Swal.fire('Date de visite médicale ajoutée.')
        }
      } catch (err) {
        dispatch({
          type: santeConstants.ADD_DATE_FAILURE,
          payload: err.response.data
        });
      }
    };
  };
  export const afficherdemande = () => {
    return async dispatch => {
      dispatch({ type: santeConstants.GET_ALL_DEMANDERDV_REQUEST })
      try {
        const res = await axios.get('http://127.0.0.1:3030/api/demande/afficher')
        if (res.status === 200) {
          dispatch({
            type: santeConstants.GET_ALL_DEMANDERDV,
            payload: res.data,
          })     
     
        }
      } catch (error) {
        dispatch({
          type: santeConstants.DEMANDE_ERRORS,
          payload: { error: error.response }
        })
  
      }
    }
  }
  export const etatrdv = (id, data) => dispatch => {
    axios.post(`http://127.0.0.1:3030/api/date/etat/${id}`, data)
      .then((res) => {
        dispatch({
          type: santeConstants.GET_DATE,
          payload: res.data
        })
      })
      .catch((err) => {
        if (err.response && err.response.status === 403 && err.response.data.message === "Le nombre maximum d'utilisateurs acceptés a été atteint") {
          alert("Le nombre maximum d'utilisateurs acceptés a été atteint");
        } else {
          alert("Une erreur est survenue lors de la modification de la rdv");
        }
      });
  };
  export const MesRDV = () => dispatch => {
    axios.get("http://127.0.0.1:3030/api/rdv/afficher")
      .then(res => {
        dispatch({
          type: santeConstants.GET_MYRDV,
          payload: res.data
        })
      })
      .catch(err => {
        dispatch({
          type: santeConstants.GET_MYRDV_FAILURE,
          payload: err.response.data
        })
      });
  }
  
    export const FindArchiverdv = () => {
    return async dispatch => {
      dispatch({ type: santeConstants.GET_ALL_ARCHIVERDV_REQUEST })
      try {
        const res = await axios.get('http://127.0.0.1:3030/api/archiverdv/get')
        if (res.status === 200) {
          dispatch({
            type: santeConstants.GET_ALL_ARCHIVERDV,
            payload: res.data,
          })     
     
        }
      } catch (error) {
        dispatch({
          type: santeConstants.ARCHIVERDV_ERRORS,
          payload: { error: error.response }
        })
  
      }
    }
  }
  export const archiverRdv = () => (dispatch) => {
    axios
      .delete(`http://127.0.0.1:3030/api/rdvsupp`)
      .then((res) => {
        dispatch({
          type: santeConstants.ARCHIVE_PAR_DATE_NEWS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: santeConstants.ARCHIVERDV_ERRORS,
          payload: err.response.data,
        });
      });
  };
  
  