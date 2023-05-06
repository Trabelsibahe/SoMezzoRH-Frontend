import axios from 'axios'
import { notificationConstants } from '../actions/constantes';
export const GetNotificationAction = () => dispatch => {
    
    axios.get("http://127.0.0.1:3030/api/notifications")

      .then(res => {
        console.log(res.data)
        dispatch({
          type: notificationConstants.GET_MY_NOTIFICATION,
          payload: res.data
        })
      })
      .catch(err => {
        dispatch({
          type: notificationConstants.NOTIFICATION_ERRORS,
          payload: err.response.data
        })
      });
  }
  export const GetMyNotificationAction = () => dispatch => {
    
    axios.get("http://127.0.0.1:3030/api/mynotification")

      .then(res => {
        console.log(res.data)
        dispatch({
          type: notificationConstants.GET_ONE_NOTIFICATION,
          payload: res.data
        })
      })
      .catch(err => {
        dispatch({
          type: notificationConstants.NOTIFICATION_ERRORS,
          payload: err.response.data
        })
      });
  }