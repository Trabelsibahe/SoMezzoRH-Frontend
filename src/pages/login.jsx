import React, { useState } from "react";
import "../assets/styles/login.css";
import "../assets/styles/intro.css";
import print from "../assets/images/print.png";
import logoblanc from "../assets/images/logo_blanc.png";
import Classnames from "classnames";
import { LoginAction } from "../actions/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CircularProgress,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const style = {
  "label.Mui-focused": {
    color: "#2b2b2b",
  },
  ".MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#2b2b2b",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgba(36, 55, 123, 0.9)",
    },
  },
};

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errors = useSelector((state) => state.errors);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      await dispatch(LoginAction(form, navigate));
      setLoading(false);
    }, 500);
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <div className="login_page">
      <div className="login_container">
        <div id="stars"></div>
        <div id="stars2"></div>
        <img className="login_logo" src={logoblanc} alt="logo"></img>
        <div className="login_whitebox">
          <h5>Bienvenue sur SoMezzo RH</h5>
          <form className="login_form" onSubmit={onSubmit}>
            <FormControl
              variant="standard"
              className="login_FormControl"
              margin="normal"
            >
              <InputLabel htmlFor="Matricule">Matricule</InputLabel>
              <Input
                name="matricule"
                startAdornment={
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                }
                classnames={Classnames("form-control", {
                  "is-invalid": errors.matricule,
                })}
                onChange={onChangeHandler}
              />
              {errors.matricule && (
                <div className="login_error">{errors.matricule}</div>
              )}
            </FormControl>{" "}
            <FormControl
              variant="standard"
              className="login_FormControl"
              margin="normal"
            >
              <InputLabel className="login_label" htmlFor="Matricule">
                Mot de passe
              </InputLabel>
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                startAdornment={
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                classnames={Classnames("form-control", {
                  "is-invalid": errors.password,
                })}
                onChange={onChangeHandler}
              />
              {errors.password && (
                <div className="login_error">{errors.password}</div>
              )}
            </FormControl>
            <button type="submit" className="login_button" disabled={loading}>
              {loading ? (
                <CircularProgress size={24} style={{ color: "white" }} />
              ) : (
                "Connexion"
              )}
            </button>
            <div className="signup_link">
              Mot de passe oublié?
              <a href="/recupere/motdepasse"> Réinitialiser</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
