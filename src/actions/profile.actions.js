import axios from 'axios'
import { profileConstants } from '../actions/constantes';
import Swal from 'sweetalert2';



// creation du profile
export const SetProfileAction = (form, setShow, setMessage, navigate) => dispatch => {
  axios.post("http://127.0.0.1:3030/api/profile/create", form)
    .then(res => {
      setShow(true)
      navigate("/profil");
      Swal.fire("Votre profil a été créé avec succès !");
      setMessage("Profile crée.")
      dispatch({
        type: profileConstants.PROFILE_ERRORS,
        payload: {}
      })
      setTimeout(() => {
        setShow(false)
      }, 4000);
      navigate("/profil");
    })
    .catch(err => {
      dispatch({
        type: profileConstants.PROFILE_ERRORS,
        payload: err.response.data
      })
    });
}

export const GetProfileAction = () => dispatch => {
  axios.get("http://127.0.0.1:3030/api/profile/get")
    .then(res => {
      dispatch({
        type: profileConstants.SET_PROFILE,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: profileConstants.PROFILE_ERRORS,
        payload: err.response.data
      })
    });
}
//fonction getlist
/*export const GetProfiles = ()=>dispatch=>{
    axios
      .get("/api/profiles")
      .then(res => {
          dispatch({
              type: profileConstants.GET_ALL_PROFILES,
              payload: res.data
          })
      })
      .catch(err => {
          dispatch({
              type: profileConstants.PROFILE_ERRORS,
              payload: err.response.data
          })
      });
}*/
export const GetProfiles = () => {
  return async dispatch => {
    dispatch({ type: profileConstants.PROFILE_REQUEST })
    try {
      const res = await axios.get('http://127.0.0.1:3030/api/profiles')
      if (res.status === 200) {
        dispatch({
          type: profileConstants.GET_ALL_PROFILES,
          payload: res.data
        })
      }
    } catch (error) {
      dispatch({
        type: profileConstants.PROFILE_ERRORS,
        payload: { error: error.response }
      })

    }
  }
}
export const DeleteProfile = (id) => dispatch => {
  if (window.confirm("Êtes-vous sûr de vouloir supprimer cet employé ?")) {
    axios
      .delete(`/api/profiles/${id}`)
      .then(res => {
        dispatch({
          type: profileConstants.DELETE_PROFILE,
          payload: id
        })
      })
      .catch(err => {
        dispatch({
          type: profileConstants.PROFILE_ERRORS,
          payload: err.response.data
        })
      });
  }
}
//fonction modifier
export const EditProfileAction = (id, data) => (dispatch) => {
  axios.post(`http://127.0.0.1:3030/api/profile/${id}`, data)
    .then((res) => {
      dispatch({
        type: profileConstants.MODIFIER_CONTACT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: profileConstants.MODIFIER_CONTACT_FAILURE,
        payload: err.response.data,
      });
    });
};


//fonction recherche par matricule
export const searchByMatricule = (matricule) => (dispatch) => {
  axios.get(`http://localhost:3030/api/serchmatricule?matricule=${matricule}`)
    .then((res) => {
      dispatch({
        type: profileConstants.SEARCH_PROFILES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: profileConstants.SEARCH_PROFILES_FAILURE,
        payload: err.response.data,
      });
    });
};


//fonction delete + envouyer a l'archive 
export const deleteAndArchiveProfile = (id) => (dispatch) => {
  Swal.fire({
    title: 'vous êtes sûr?',
    text: "Vous ne pourrez pas revenir en arrière!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, supprimez-le!'
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`http://localhost:3030/api/profilesupp/${id}`)
        .then((res) => {
          dispatch({
            type: profileConstants.DELETE_PROFILE_SUCCESS,
            payload: res.data,
          });
          Swal.fire(
            'Supprimé!',
            'Ce profile a été supprimé.',
            'succès'
          );
          window.location.reload();
        })
        .catch((err) => {
          dispatch({
            type: profileConstants.DELETE_PROFILE_FAILURE,
            payload: err.response.data,
          });
        });
    }
  });
};


//modifier mon profile (connecté) 
export const EditMyProfileAction = (data) => (dispatch) => {
  axios.post(`http://127.0.0.1:3030/api/profile/modif`, data)
    .then((res) => {
      dispatch({
        type: profileConstants.MODIFIER_PROFILE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: profileConstants.MODIFIER_PROFILE_FAILURE,
        payload: err.response.data,
      });
    });
};
//counter profiles
export const CountProfiles = () => {
  return async dispatch => {
    dispatch({ type: profileConstants.PROFILE_REQUEST })
    try {
      const res = await axios.get('http://127.0.0.1:3030/api/nb/profiles')
      if (res.status === 200) {
        dispatch({
          type: profileConstants.COUNT_PROFILE,
          payload: {
            count: res.data.count // Ajoutez la valeur de count à la charge utile
          }
        })
      }
    } catch (error) {
      dispatch({
        type: profileConstants.COUNT_PROFILE_ERREUR,
        payload: { error: error.response }
      })

    }
  }
}
