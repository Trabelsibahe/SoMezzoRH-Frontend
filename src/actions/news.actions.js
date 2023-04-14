import axios from 'axios'
import { newsConstants } from '../actions/constantes';



// lister les newsletters
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
export const addnews = (data) => {
    return async dispatch => {
        dispatch({type : newsConstants.ADD_NEWS_REQUEST})
        try{
            const res = await axios.post('http://127.0.0.1:3030/api/add/news', data)
                    if (res.status === 200){
                     dispatch({type : newsConstants.ADD_NEWS_SUCCESS,
                        payload : { creatednews : res.data }
                    })  
                    }    
        }catch(error){
            dispatch({type : newsConstants.ADD_NEWS_FAILURE,
                payload : { error : error.response}})  
        }
    }
    }
    export const Deletenews = (id)=>dispatch=>{
        if(window.confirm("are you sure to delete this news?")){
         axios
         .delete(`http://127.0.0.1:3030/api/news/${id}`)
         .then(res => {
             dispatch({
                 type: newsConstants.DELETE_NEWS,
                 payload: id
             })
         })
         .catch(err => {
             dispatch({
                 type: newsConstants.NEWS_ERRORS,
                 payload: err.response.data
             })
         });
        }
     }
     export const supprimerNews = () => (dispatch) => {
        if(window.confirm("Êtes-vous sûr de vouloir supprimer les newsletters ?")){
        axios
          .delete(`http://127.0.0.1:3030/api/news/supp`)
          .then((res) => {
            dispatch({
              type: newsConstants.DELETE_DATE_NEWS,
              payload: res.data,
            });
          })
          .catch((err) => {
            dispatch({
              type: newsConstants.NEWS_ERRORS,
              payload: err.response.data,
            });
          });
      }};