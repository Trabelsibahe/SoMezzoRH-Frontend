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

export const GetProfiles = ()=>dispatch=>{
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