import axios from 'axios'
import { operaConstants } from '../actions/constantes';
export const GetOperaAction = () => dispatch => {
    
    axios.get("http://127.0.0.1:3030/api/operation")

      .then(res => {
        dispatch({
          type: operaConstants.GET_MY_OPERA,
          payload: res.data
        })
      })
      .catch(err => {
        dispatch({
          type: operaConstants.OPERA_ERRORS,
          payload: err.response.data
        })
      });
  }
  
  export const GetOperAbsenceAction = () => dispatch => {
    
    axios.get("http://127.0.0.1:3030/api/operation/absence")
      .then(res => {
        dispatch({
          type: operaConstants.GET_MY_OPERA_ABSENCE,
          payload: res.data
        })
      })
      .catch(err => {
        dispatch({
          type: operaConstants.OPERA_ABSENCE_ERRORS,
          payload: err.response.data
        })
      });
  }
//counter operation
export const CountOperation = () => {
  return async dispatch => {
    dispatch({ type: operaConstants.OPERATION_REQUEST })
    try {
      const res = await axios.get('http://127.0.0.1:3030/api/nb/operation')
      if (res.status === 200) {
        dispatch({
          type: operaConstants.COUNT_OPERATION,
          payload: {
            count: res.data.count 
          }
        })
      }
    } catch (error) {
      dispatch({
        type: operaConstants.COUNT_OPERATION_ERREUR,
        payload: { error: error.response }
      })

    }
  }
}
//counter operation
export const Countchallenge = () => {
  return async dispatch => {
    dispatch({ type: operaConstants.CHALLENGE_REQUEST })
    try {
      const res = await axios.get('http://127.0.0.1:3030/api/nb/challenge')
      if (res.status === 200) {
        dispatch({
          type: operaConstants.COUNT_CHALLENGE,
          payload: {
            operationChallengesCount: res.data.operationChallengesCount 
          }
        })
      }
    } catch (error) {
      dispatch({
        type: operaConstants.COUNT_CHALLENGE_ERREUR,
        payload: { error: error.response }
      })

    }
  }
}


