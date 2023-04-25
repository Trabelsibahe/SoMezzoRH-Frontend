import axios from 'axios'
import { taskConstants } from '../actions/constantes';



// ajouter une tache
export const AddTask = (data) => {
  return async dispatch => {
    dispatch({ type: taskConstants.ADD_TASK_REQUEST })
    try {
      const res = await axios.post('http://127.0.0.1:3030/api/operation/task/add', data)
      if (res.status === 200) {
        dispatch({
          type: taskConstants.ADD_TASK_SUCCESS,
          payload: { createdtask: res.data }
        })
        window.location.reload()
        alert("task added.");

      }
    } catch (err) {
      dispatch({
        type: taskConstants.ADD_TASK_FAILURE,
        payload: err.response.data
      })
    }
  }
}

//Recuperer tous les taches pour l'RRH
export const GetAllTask = () => {
    return async dispatch => {
      dispatch({ type: taskConstants.GET_ALL_TASK_REQUEST })
      try {
        const res = await axios.get('http://127.0.0.1:3030/api/operation/task')
        if (res.status === 200) {
          dispatch({
            type: taskConstants.GET_ALL_TASK,
            payload: res.data,
          })     
     
        }
      } catch (error) {
        dispatch({
          type: taskConstants.TASK_ERRORS,
          payload: { error: error.response }
        })
  
      }
    }
  }
//Recuperer tous les taches pour l'EXPERT RH
export const GetAllTaskExpert = () => {
    return async dispatch => {
      dispatch({ type: taskConstants.GET_ALL_TASK_REQUEST })
      try {
        const res = await axios.get('http://127.0.0.1:3030/api/getall/task')
        if (res.status === 200) {
          dispatch({
            type: taskConstants.GET_ALL_TASK,
            payload: res.data,
          })     
     
        }
      } catch (error) {
        dispatch({
          type: taskConstants.TASK_ERRORS,
          payload: { error: error.response }
        })
  
      }
    }
  }
  export const supprimerTask = () => (dispatch) => {
    axios
      .delete(`http://127.0.0.1:3030/api/task/supp`)
      .then((res) => {
        dispatch({
          type: taskConstants.DELETE_DATE_TASK,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: taskConstants.TASK_ERRORS,
          payload: err.response.data,
        });
      });
  };