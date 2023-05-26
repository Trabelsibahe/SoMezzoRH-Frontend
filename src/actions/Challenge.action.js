import axios from 'axios'
import { ChallengeConstants } from './constantes';



// ajouter une tache
export const AddChallenge = (data) => {
  return async dispatch => {
    dispatch({ type: ChallengeConstants.ADD_Challenge_REQUEST })
    try {
      const res = await axios.post('http://127.0.0.1:3030/api/add/Challenge', data)
      if (res.status === 200) {
        dispatch({
          type: ChallengeConstants.ADD_Challenge_SUCCESS,
          payload: { createdChallenge: res.data }
        })
        window.location.reload()
        alert("Challenge ajouté.");

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
  export const participerChallenge = (id,data) => {
    return async dispatch => {
      dispatch({ type: ChallengeConstants.PARTICIPER_Challenge_REQUEST })
      try {
        const res = await axios.post(`http://127.0.0.1:3030/api/participer/${id}`, data)
        if (res.status === 200) {
          dispatch({
            type: ChallengeConstants.PARTICIPER_Challenge_SUCCESS,
            payload: { createdChallenge: res.data }
          })
          window.location.reload()
          alert("vous avez participé à ce challenge.");
        }
      } catch (err) {
        dispatch({
          type: ChallengeConstants.PARTICIPER_Challenge_FAILURE,
          payload: err.response.data
        })
      }
    }
  }
  //Recuperer tous les participant pour RRH
  export const ListerOperationparticiper = (id) => {
    return async (dispatch) => {
      dispatch({ type: ChallengeConstants.GET_ALL_PARTICIPANT_REQUEST });
      try {
        const res = await axios.get(`http://127.0.0.1:3030/api/operation/participants/${id}`);
        if (res.status === 200) {
          dispatch({
            type: ChallengeConstants.GET_ALL_PARTICIPANT_SUCCESS,
            payload: res.data,
          });
        }
      } catch (error) {
        dispatch({
          type: ChallengeConstants.GET_ALL_PARTICIPANT_FAILURE,
          payload: { error: error.response },
        });
      }
    };
  };


  // Modifier le challenge (Valide, Prime)
  export const updateChallenge = (id, data) => (dispatch) => {
    axios.post(`http://127.0.0.1:3030/api/challenge/update/${id}`, data)
      .then((res) => {
        dispatch({
          type:  ChallengeConstants.SET_CHALLENGE,
          payload: res.data.message,
        });
      })
      .catch((err) => {
        dispatch({
          type: ChallengeConstants.SET_CHALLENGE_ERROR,
          payload: err.response.data.message,
        });
      });
  };

  export const Countchallenge = () => {
    return async dispatch => {
      dispatch({ type: ChallengeConstants.CHALLENGE_REQUEST })
      try {
        const res = await axios.get('http://127.0.0.1:3030/api/nb/challenges')
        if (res.status === 200) {
          dispatch({
            type: ChallengeConstants.COUNT_CHALLENGE,
            payload: {
              count: res.data.count 
            }
          })
        }
      } catch (error) {
        dispatch({
          type: ChallengeConstants.COUNT_CHALLENGE_ERREUR,
          payload: { error: error.response }
        })
  
      }
    }
  }
  export const updateTotale = (id, data) => (dispatch) => {
    axios.post(`http://127.0.0.1:3030/api/challenge/total/${id}`, data)
      .then((res) => {
        dispatch({
          type:  ChallengeConstants.SET_TOTAL,
          payload: res.data.message,
        });
      })
      .catch((err) => {
        dispatch({
          type: ChallengeConstants.SET_TOTAL_ERROR,
          payload: err.response.data.message,
        });
      });
  };
