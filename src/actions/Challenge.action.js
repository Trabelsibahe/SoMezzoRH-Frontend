import axios from 'axios'
import { ChallengeConstants } from './constantes';



// ajouter une tache
export const AddChallenge = (data) => {
  return async dispatch => {
    dispatch({ type: ChallengeConstants.ADD_Challenge_REQUEST })
    try {
      const res = await axios.post('http://127.0.0.1:3030/api/operation/Challenge/add', data)
      if (res.status === 200) {
        dispatch({
          type: ChallengeConstants.ADD_Challenge_SUCCESS,
          payload: { createdChallenge: res.data }
        })
        window.location.reload()
        alert("Challenge added.");

      }
    } catch (err) {
      dispatch({
        type: ChallengeConstants.ADD_Challenge_FAILURE,
        payload: err.response.data
      })
    }
  }
}

//Recuperer les Challenges pour l'RRH
export const GetAllChallenge = () => {
    return async dispatch => {
      dispatch({ type: ChallengeConstants.GET_ALL_Challenge_REQUEST })
      try {
        const res = await axios.get('http://127.0.0.1:3030/api/operation/myChallenge')
        if (res.status === 200) {
          dispatch({
            type: ChallengeConstants.GET_ALL_Challenge,
            payload: res.data,
          })     
     
        }
      } catch (error) {
        dispatch({
          type: ChallengeConstants.Challenge_ERRORS,
          payload: { error: error.response }
        })
  
      }
    }
  }
//Recuperer tous les Challenges pour l'EXPERT RH
export const GetAllChallengeExpert = () => {
    return async dispatch => {
      dispatch({ type: ChallengeConstants.GET_ALL_Challenge_REQUEST })
      try {
        const res = await axios.get('http://127.0.0.1:3030/api/allChallenges')
        if (res.status === 200) {
          dispatch({
            type: ChallengeConstants.GET_ALL_Challenge,
            payload: res.data,
          })     
     
        }
      } catch (error) {
        dispatch({
          type: ChallengeConstants.Challenge_ERRORS,
          payload: { error: error.response }
        })
  
      }
    }
  }
  export const supprimerChallenge = () => (dispatch) => {
    axios
      .delete(`http://127.0.0.1:3030/api/Challenge/supp`)
      .then((res) => {
        dispatch({
          type: ChallengeConstants.DELETE_DATE_Challenge,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: ChallengeConstants.Challenge_ERRORS,
          payload: err.response.data,
        });
      });
  };