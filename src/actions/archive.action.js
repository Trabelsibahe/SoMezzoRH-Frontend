import axios from 'axios'
import { archiveConstants } from '../actions/constantes';
import Swal from 'sweetalert2';




//fonction getarchive
export const GetArchives = () => async (dispatch) => {
  try {
    const res = await axios.get('http://127.0.0.1:3030/api/archive/get');
    dispatch({ type: archiveConstants.GET_ALL_ARCHIVES, payload: res.data });
    return res.data
  } catch (error) {
    dispatch({ type: archiveConstants.ARCHIVES_ERRORS, payload: error.message });
  }
};
//fonction delete + envouyer a l'archive 
export const deleteArchive = (id) => (dispatch) => {
  Swal.fire({
    title: 'Voulez vous vraiment restaurer ce compte?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Annuler',
    confirmButtonText: 'Restaurer'
  }).then((result) => {
    if (result.isConfirmed) {
      axios.delete(`http://127.0.0.1:3030/api/archive/supp/${id}`)
        .then((res) => {
          dispatch({
            type: archiveConstants.DELETE_ARCHIVE_SUCCESS,
            payload: res.data,
          });
          Swal.fire('Ce compte a été restauré.')
          .then((result) => {
          if (result) {
            window.location.reload()
          }
        }
          );
        })
        .catch((err) => {
          dispatch({
            type: archiveConstants.DELETE_ARCHIVE_FAILURE,
            payload: err.response.data,
          });
        });
    }
  });
};

//counter Archives
export const CountArchives = () => {
  return async dispatch => {
    dispatch({ type: archiveConstants.ARCHIVE_REQUEST })
    try {
      const res = await axios.get('http://127.0.0.1:3030/api/archives/nb')
      if (res.status === 200) {
        dispatch({
          type: archiveConstants.COUNT_ARCHIVE,
          payload: {
            count: res.data.count // Ajoutez la valeur de count à la charge utile
          }
        })
      }
    } catch (error) {
      dispatch({
        type: archiveConstants.COUNT_ARCHIVE_ERREUR,
        payload: { error: error.response }
      })

    }
  }
}
//fonction modifier archive
export const EditArchiveAction = (id, data) => (dispatch) => {
  axios.post(`http://127.0.0.1:3030/api/archive/modif/${id}`, data)
    .then((res) => {
      dispatch({
        type: archiveConstants.MODIFIER_ARCHIVE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: archiveConstants.MODIFIER_ARCHIVE_FAILURE,
        payload: err.response.data,
      });
    });
};