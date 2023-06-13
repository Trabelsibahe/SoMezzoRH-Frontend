import axios from 'axios';
import { authConstants } from './constantes';
import jwt_decode from 'jwt-decode';
import { setAuth } from '../util/setAuth';
import Swal from 'sweetalert2';
import { Timer } from '@mui/icons-material';



// register
export const RegisterAction = (form) => dispatch => {
  axios.post('http://127.0.0.1:3030/api/register', form)
    .then(res => {
      dispatch({
        type: authConstants.ERRORS,
        payload: {}
      }).then(
        Swal.fire({
          title: "Le compte a été créé.",
          }).then((result) => {
            if (result) {
              window.location.reload()
            }})
      )
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
      const { token } = res.data;
      localStorage.setItem('jwt', token);
      const decode = jwt_decode(token);
      dispatch(setUser(decode));
      setAuth(token);
      if (decode.active === true) {
        navigate("/bienvenue");
      }
      window.location.reload();
    })
    .catch(err => {
      dispatch({
        type: authConstants.ERRORS,
        payload: err.response.data
      });
    });
}




// Change Password 
export const ChangePasswordAction = (form, navigate) => dispatch => {
  axios.post('http://127.0.0.1:3030/api/modifmotpass', form)

    .then(res => {     
      localStorage.clear();
      Swal.fire({
        html:'Votre mot de passe a été modifié. Veuillez vous reconnecter.',
        timer: 1500,
        didOpen : () => {
          Swal.showLoading();
        },
        willClose : () => {
          window.location.reload();
        }
      });
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
  Swal.fire({
    title: 'Déconnexion..',
    html: 'Déconnexion..',
    timer: 1500,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      navigate("/login");
    },
    willClose: () => {
      localStorage.removeItem('jwt');
      dispatch({
        type: authConstants.SET_USER,
        payload: {},

      });
    }
  });
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
      Swal.fire("Email envoyé..\nVeuillez vérifier votre boîte de réception.")
    }
  } catch (error) {
    dispatch({
      type: authConstants.SEND_EMAIL_FAILURE,
      payload: error.response.data,
    });
  }
};

export const resetPassword = (resetToken, newPassword, confirmPassword) => async (dispatch) => {
  try {
    const res = await axios.post('http://127.0.0.1:3030/api/new-mot-de-passe', { resetToken, newPassword, confirmPassword });

    Swal.fire("Mot de passe modifié, veuillez vous reconnecter.")
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

