
import axios from 'axios'
import { absenceConstants } from '../actions/constantes';


export const AddAbsence = (data) => {
    return async dispatch => {
        dispatch({type : absenceConstants.ADD_ABSENCE_REQUEST})
        try{
            const res = await axios.post('http://127.0.0.1:3030/api/absence/add', data)
                    if (res.status === 200){
                     dispatch({type : absenceConstants.ADD_ABSENCE_SUCCESS,
                        payload : { createdabsence : res.data }
                    })  
                    }    
        }catch(error){
            dispatch({type : absenceConstants.ADD_ABSENCE_FAILURE,
                payload : { error : error.response}})  
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