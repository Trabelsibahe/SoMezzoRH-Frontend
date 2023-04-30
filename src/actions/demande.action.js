import axios from 'axios'
import { demandeConstants } from '../actions/constantes';



// ajouter une demande
export const AddDemande = (data) => {
  return async dispatch => {
    dispatch({ type: demandeConstants.ADD_DEMANDE_REQUEST })
    try {
      const res = await axios.post('http://127.0.0.1:3030/api/demande/add', data)
      if (res.status === 200) {
        dispatch({
          type: demandeConstants.ADD_DEMANDE_SUCCESS,
          payload: { createddemande: res.data }
        })
        window.location.reload()
        alert("demande envoyé.");

      }
    } catch (err) {
      console.log(err.response.data)
      dispatch({
        type: demandeConstants.ADD_DEMANDE_FAILURE,
        payload: err.response.data
      })
    }
  }
}
// lister les demande
export const listerdemande = () => {
    return async dispatch => {
        dispatch({type : demandeConstants.GET_ALL_DEMANDE_REQUEST})  
            try{
                const res = await axios.get('http://127.0.0.1:3030/api/demande/getone')
                console.log(res.data);

                if (res.status === 200){
                    
                 dispatch({type : demandeConstants.GET_ALL_DEMANDE,
                 payload : res.data 
                 
                })  
                }
            }catch(error){
                dispatch({type : demandeConstants.DEMANDE_ERRORS,
                payload : { error : error.response}})  

            }
    }
}
// lister les demande
export const listerdemandeExpert = () => {
  return async dispatch => {
      dispatch({type : demandeConstants.GET_ALL_DEMANDE_REQUEST})  
          try{
              const res = await axios.get('http://127.0.0.1:3030/api/demande/get')
              if (res.status === 200){
                  
               dispatch({type : demandeConstants.GET_ALL_DEMANDE,
               payload : res.data 
               
              })  
              }
          }catch(error){
              dispatch({type : demandeConstants.DEMANDE_ERRORS,
              payload : { error : error.response}})  

          }
  }
}
export const updateBadge = (id, data) => (dispatch) => {
    axios.post(`http://127.0.0.1:3030/api/demande/modif/${id}`, data)
      .then((res) => {
        dispatch({
          type:  demandeConstants.UPDATE_DEMANDE_SUCCESS,
          payload: res.data.message,
        });
        alert("Badge accepté.");
      })
      .catch((err) => {
        dispatch({
          type: demandeConstants.UPDATE_DEMANDE_FAILURE,
          payload: err.response.data.message,
        });
      });
  };

  export const updateAttestation = (id, data) => (dispatch) => {
    axios.post(`http://127.0.0.1:3030/api/demande/add/${id}`, data)
      .then((res) => {
        dispatch({
          type:  demandeConstants.UPDATE_IMAGE_SUCCESS,
          payload: res.data.message,
        });
      })
      .catch((err) => {
        dispatch({
          type: demandeConstants.UPDATE_IMAGE_FAILURE,
          payload: err.response.data.message,
        });
      });
  };