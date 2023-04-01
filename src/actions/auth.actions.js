import axios from 'axios';
import { authConstants } from './constantes';
import jwt_decode from 'jwt-decode';
import { setAuth } from '../util/setAuth';

// register
export const RegisterAction = (form, navigate) => dispatch => {
    axios.post('http://127.0.0.1:3030/api/register', form)
    .then(res=> {
        navigate('/login');
        alert("User registered. You may now login.")
        dispatch({
            type:authConstants.ERRORS,
            payload: {}
        })
        })
    .catch(err=> {
        dispatch({
            type: authConstants.ERRORS,
            payload: err.response.data
        })
    })
}

// login
export const LoginAction = (form, navigate)=>dispatch=>{
    axios.post('http://127.0.0.1:3030/api/login', form) 

    .then(res=>{
        const {token} = res.data
         localStorage.setItem('jwt', token);
         const decode = jwt_decode(token);
         dispatch(setUser(decode));
         setAuth(token);
         alert("Bievenue " +decode.matricule);
         navigate("/bienvenue")
    })
    .catch(err=>{
        dispatch({
            type: authConstants.ERRORS,
            payload: err.response.data
        })
    })

}

// Change Password 
export const ChangePasswordAction = (form, navigate) => dispatch => {
    axios.post('http://127.0.0.1:3030/api/modifmotpass', form)

    .then(res => {
        alert("Mot de passe modifié, veuillez reconnecter")
        localStorage.clear()
        window.location.reload()
        dispatch({
            type: authConstants.SET_USER,
            payload: res.data
        })

    })
    .catch (err => {
        dispatch({
            type: authConstants.ERRORS,
            payload: err.response.data
        })
    })
}

// logout
export const Logout = (navigate)=>dispatch=>{
    localStorage.removeItem('jwt')
    navigate("/login")

    dispatch({
        type: authConstants.SET_USER,
        payload: {}
    })
}


export const setUser = (decode)=>({
    type: authConstants.SET_USER,
    payload: decode
})