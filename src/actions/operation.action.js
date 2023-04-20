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



