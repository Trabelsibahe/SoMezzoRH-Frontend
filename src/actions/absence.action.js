
import axios from 'axios'
import { absenceConstants } from '../actions/constantes';


export const AddAbsence = (data) => {
  return async dispatch => {
    dispatch({ type: absenceConstants.ADD_ABSENCE_REQUEST })
    try {
      const res = await axios.post('http://127.0.0.1:3030/api/absence/add', data)
      if (res.status === 200) {
        dispatch({
          type: absenceConstants.ADD_ABSENCE_SUCCESS,
          payload: { createdabsence: res.data }
        })
        window.location.reload()
        alert("Absence added.");

      }
    } catch (err) {
      dispatch({
        type: absenceConstants.ADD_ABSENCE_FAILURE,
        payload: err.response.data
      })
    }
  }
}


export const GetAbsence = () => dispatch => {
  axios.get("http://127.0.0.1:3030/api/absence/getone")
    .then(res => {
      dispatch({
        type: absenceConstants.GET_ABSENCE,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: absenceConstants.GET_ABSENCE_FAILURE,
        payload: err.response.data
      })
    });
}
export const GetAllAbsence = () => {
  return async dispatch => {
    dispatch({ type: absenceConstants.GET_ALL_ABSENCE_REQUEST })
    try {
      const res = await axios.get('http://127.0.0.1:3030/api/absence/getall')
      if (res.status === 200) {
        dispatch({
          type: absenceConstants.GET_ALL_ABSENCE,
          payload: res.data
        })      
      }
    } catch (error) {
      dispatch({
        type: absenceConstants.ABSENCE_ERRORS,
        payload: { error: error.response }
      })

    }
  }
}
