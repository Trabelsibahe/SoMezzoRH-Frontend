
import axios from 'axios'
import { santeConstants } from '../actions/constantes';


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
          alert("Demande visite médicale ajoutée.");
  
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
          alert("Date de visite médicale ajoutée.");
        }
      } catch (err) {
        dispatch({
          type: santeConstants.ADD_DATE_FAILURE,
          payload: err.response.data
        });
      }
    };
  };
  