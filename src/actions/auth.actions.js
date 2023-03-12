import axios from 'axios';
import { authConstants } from './constantes';
import jwt_decode from 'jwt-decode';
import { setAuth } from '../util/setAuth';

// register
export const RegisterAction = (form, navigate) => dispatch => {
    axios.post('http://localhost:3030/api/register', form)
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
    axios.post('http://localhost:3030/api/login', form) 

    .then(res=>{
        const {token} = res.data
         localStorage.setItem('jwt', token);
         const decode = jwt_decode(token);
         dispatch(setUser(decode));
         setAuth(token);
         alert("Bievenue " +decode.matricule);
         navigate("/profile");
         
    })
    .catch(err=>{
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