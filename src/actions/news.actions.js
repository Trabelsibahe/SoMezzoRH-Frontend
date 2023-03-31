import axios from 'axios'
import { newsConstants } from '../actions/constantes';
export const listernews = () => {
    return async dispatch => {
        dispatch({type : newsConstants.GET_ALL_NEWS_REQUEST})  
            try{
                const res = await axios.get('http://127.0.0.1:3030/api/get/news')
                if (res.status === 200){
                    
                 dispatch({type : newsConstants.GET_ALL_NEWS,
                 payload : res.data 
                })  
                }
            }catch(error){
                dispatch({type : newsConstants.NEWS_ERRORS,
                payload : { error : error.response}})  

            }
    }
}
