import axios from 'axios'
import { notificationConstants } from '../actions/constantes';





// all notifications
export const GetNotificationAction = () => dispatch => {
  

    axios.get("http://127.0.0.1:3030/api/notifications")

      .then(res => {
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

 /// my notifications
  export const GetMyNotificationAction = () => dispatch => {
    
    axios.get("http://127.0.0.1:3030/api/mynotification")

      .then(res => {
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
 // Envoyer la notification à tous
  export const SendNotificationToAll = (data) => {
    return async dispatch => {
      dispatch({ type: notificationConstants.CREATE_NOTIFICATION })
      try {
        const res = await axios.post('http://127.0.0.1:3030/api/notification/create', data)
        if (res.status === 200) {
          dispatch({
            type: notificationConstants.CREATE_NOTIFICATION,
            payload: { createdNotification: res.data }
          })

        }
      } catch (err) {
        dispatch({
          type: notificationConstants.NOTIFICATION_ERRORS,
          payload: err.response.data
        })
      }
    }
  }
 // Envoyer la notification à une utilisateur specifique

  export const SendNotificationToOneUser = (userId, data) => {
    return async dispatch => {
      dispatch({ type: notificationConstants.CREATE_NOTIFICATION })
      try {
        const res = await axios.post(`http://127.0.0.1:3030/api/notification/create/${userId}`, data)
        if (res.status === 200) {
          dispatch({
            type: notificationConstants.CREATE_NOTIFICATION,
            payload: { createdNotification: res.data }
          })

        }
      } catch (err) {
        dispatch({
          type: notificationConstants.NOTIFICATION_ERRORS,
          payload: err.response.data
        })
      }
    }
  }