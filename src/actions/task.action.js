import axios from 'axios'
import { taskConstants } from '../actions/constantes';


export const AddTask = (data) => {
  return async dispatch => {
    dispatch({ type: taskConstants.ADD_TASK_REQUEST })
    try {
      const res = await axios.post('http://127.0.0.1:3030/api/add/task', data)
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
//get task for rrh
export const GetAllTask = () => {
    return async dispatch => {
      dispatch({ type: taskConstants.GET_ALL_TASK_REQUEST })
      try {
        const res = await axios.get('http://127.0.0.1:3030/api/get/task')
        if (res.status === 200) {
          dispatch({
            type: taskConstants.GET_ALL_TASK,
            payload: res.data,
          })     
         console.log(res.data);
     
        }
      } catch (error) {
        dispatch({
          type: taskConstants.TASK_ERRORS,
          payload: { error: error.response }
        })
  
      }
    }
  }
  //get task for rrh
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
         console.log(res.data);
     
        }
      } catch (error) {
        dispatch({
          type: taskConstants.TASK_ERRORS,
          payload: { error: error.response }
        })
  
      }
    }
  }