import axios from 'axios';
import { authConstants } from './constantes';
import jwt_decode from 'jwt-decode';
import { setAuth } from '../util/setAuth';

// register
export const RegisterAction = (form, navigate) => dispatch => {
  axios.post('http://127.0.0.1:3030/api/register', form)
    .then(res => {
      navigate('/login');

      alert("création d'un nouvel utilisateur.")
      dispatch({
        type: authConstants.ERRORS,
        payload: {}
      })
    })
    .catch(err => {
      dispatch({
        type: authConstants.ERRORS,
        payload: err.response.data
      })
    })
}

// login
export const LoginAction = (form, navigate) => dispatch => {
  axios.post('http://127.0.0.1:3030/api/login', form)

    .then(res => {
      const { token } = res.data
      localStorage.setItem('jwt', token);
      const decode = jwt_decode(token);
      dispatch(setUser(decode));
      setAuth(token);
      alert("Bievenue " + decode.matricule);
      window.location.reload();
      navigate("/bienvenue")
    })
    .catch(err => {
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
    .catch(err => {
      dispatch({
        type: authConstants.ERRORS,
        payload: err.response.data
      })
    })
}

// logout
export const Logout = (navigate) => dispatch => {
  localStorage.removeItem('jwt')
  navigate("/login")

  dispatch({
    type: authConstants.SET_USER,
    payload: {}
  })
}


export const setUser = (decode) => ({
  type: authConstants.SET_USER,
  payload: decode
})

export const sendPasswordResetEmail = (email) => async (dispatch) => {
  try {
    const res = await axios.post('http://127.0.0.1:3030/api/mot-de-passe-oublie', { email });
    if (res.status === 200) {
    dispatch({
      type: authConstants.SEND_EMAIL_SUCCESS,
      payload: res.data,
    });
    window.location.reload()
    alert("email a été envoyé avec succès.\nVoir votre boite email");
  } }catch (error) {
    dispatch({
      type: authConstants.SEND_EMAIL_FAILURE,
      payload: error.response.data,
    });
  }
};

export const resetPassword = (resetToken, newPassword,confirmPassword) => async (dispatch) => {
  try {
    const res = await axios.post('http://127.0.0.1:3030/api/new-mot-de-passe', { resetToken, newPassword,confirmPassword});

    alert("Mot de passe modifié, veuillez vous reconnecter");
    localStorage.clear();
    window.location.reload();
    window.location.replace('/login');
    dispatch({
      type: authConstants.RESET_PASSWORD_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: authConstants.RESET_PASSWORD_FAILURE,
      payload: error.response.data,
    });
  }
};

export const Getuser = () => {
  return async dispatch => {
    dispatch({ type: authConstants.USER_REQUEST })
    try {
      const res = await axios.get('http://127.0.0.1:3030/api/alluser')
      if (res.status === 200) {
        dispatch({
          type: authConstants.GET_ALL_USER,
          payload: res.data
        })
      }
    } catch (error) {
      dispatch({
        type: authConstants.USER_ERRORS,
        payload: { error: error.response }
      })

    }
  }
}

