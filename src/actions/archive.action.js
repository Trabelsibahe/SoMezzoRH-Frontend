import axios from 'axios'
import { archiveConstants } from '../actions/constantes';
//fonction getarchive
export const GetArchives = () => async (dispatch) => {
    try {
      const res = await axios.get('http://127.0.0.1:3030/api/archive/get');
      console.log(res.data); // Ajoutez cette ligne pour vérifier ce que renvoie la requête
      dispatch({ type: archiveConstants.GET_ALL_ARCHIVES, payload: res.data });
      return res.data
    } catch (error) {
      dispatch({ type: archiveConstants.ARCHIVES_ERRORS, payload: error.message });
    }
  };
  //fonction delete + envouyer a l'archive 

  export const deleteArchive = (id) => (dispatch) => {
    axios.delete(`http://127.0.0.1:3030/api/archive/supp/${id}`)
      .then((res) => {
        dispatch({
          type: archiveConstants.DELETE_ARCHIVE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: archiveConstants.DELETE_ARCHIVE_FAILURE,
          payload: err.response.data,
        });
      });
  };