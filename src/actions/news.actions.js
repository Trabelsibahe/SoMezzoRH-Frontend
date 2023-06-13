import axios from 'axios'
import { newsConstants } from '../actions/constantes';
import Swal from 'sweetalert2';



// lister les newsletters
export const listernews = () => {
    return async dispatch => {
        dispatch({ type: newsConstants.GET_ALL_NEWS_REQUEST })
        try {
            const res = await axios.get('http://127.0.0.1:3030/api/get/news')
            if (res.status === 200) {

                dispatch({
                    type: newsConstants.GET_ALL_NEWS,
                    payload: res.data
                })
            }
        } catch (error) {
            dispatch({
                type: newsConstants.NEWS_ERRORS,
                payload: { error: error.response }
            })

        }
    }
}
export const addnews = (data) => {
    return async dispatch => {
        dispatch({ type: newsConstants.ADD_NEWS_REQUEST })
        try {
            const res = await axios.post('http://127.0.0.1:3030/api/add/news', data)
            if (res.status === 200) {
                dispatch({
                    type: newsConstants.ADD_NEWS_SUCCESS,
                    payload: { creatednews: res.data }
                })
            }
        } catch (error) {
            dispatch({
                type: newsConstants.ADD_NEWS_FAILURE,
                payload: error.response.data
            })
        }
    }
}

export const Deletenews = (id) => (dispatch) => {
    Swal.fire({
        title: 'Voulez vous vraiment supprimer ce newsletter?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: 'Annuler',
        cancelButtonText: 'Annuler',
        confirmButtonText: 'Supprimer'
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`http://127.0.0.1:3030/api/news/${id}`)
                .then((res) => {
                    dispatch({
                        type: newsConstants.DELETE_NEWS,
                        payload: id
                    });
                    Swal.fire(
                        'Supprimé!',
                        'Ce newsletter a éte supprimé.',
                        'success'
                    ).then((result) => {
                        if (result) {
                            window.location.reload()
                        }
                    }
                    );
                })
                .catch((err) => {
                    dispatch({
                        type: newsConstants.NEWS_ERRORS,
                        payload: err.response.data
                    });
                });
        }
    });
};

export const supprimerNews = () => (dispatch) => {
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
};