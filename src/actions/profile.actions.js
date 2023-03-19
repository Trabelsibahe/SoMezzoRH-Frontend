import axios from 'axios'
import { profileConstants } from '../actions/constantes';

export const SetProfileAction = (form, setShow, setMessage, navigate)=>dispatch=>{
    axios.post("http://localhost:3030/api/profile/create", form)
      .then(res => {
        setShow(true)
        navigate("/profile");
        alert("profile created, you will be redirected to your profile now")
        setMessage("Profile created.")
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

export const GetProfileAction = ()=>dispatch=>{
    axios.get("http://localhost:3030/api/profile/get")
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
        dispatch({type : profileConstants.PROFILE_REQUEST})  
            try{
                const res = await axios.get('http://127.0.0.1:3030/api/profiles')
                if (res.status === 200){
                 dispatch({type : profileConstants.GET_ALL_PROFILES,
                 payload : res.data 
                })  
                }
            }catch(error){
                dispatch({type : profileConstants.PROFILE_ERRORS,
                payload : { error : error.response}})  

            }
    }
}
export const DeleteProfile = (id)=>dispatch=>{
   if(window.confirm("are you sure to delete this user?")){
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
 export const modifierContact = (id, contactData) => (dispatch) => {
    axios.post(`http://localhost:3030/api/profile/${id}`, contactData)
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