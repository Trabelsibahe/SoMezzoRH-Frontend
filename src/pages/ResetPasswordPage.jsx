import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../actions/auth.actions";
import { useParams } from "react-router-dom";
import logoblanc from "../assets/images/logo_blanc.png";
import "../assets/styles/ResetPasswordPage.css";
import "../assets/styles/intro.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Classnames from "classnames";
import LockIcon from "@mui/icons-material/Lock";
import LockResetIcon from "@mui/icons-material/LockReset";
import {
  CircularProgress,
  FormControl,
  Input,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
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
const ResetPasswordPage = () => {
  const { resetToken } = useParams();
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const errors = useSelector((state) => state.errors);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      await dispatch(resetPassword(resetToken, newPassword, confirmPassword));
      setLoading(false);
    }, 500);
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  return (
    <div className="email_page">
      <div className="email_container">
        <div id="stars"></div>
        <div id="stars2"></div>
        <img className="pass_logo" src={logoblanc} alt="logo"></img>
        <div className="login_whitebox">
          <h5>Réinitialiser le mot de passe</h5>
          <form className="login_form" onSubmit={handleSubmit}>
            <FormControl
              variant="standard"
              className="login_FormControl"
              margin="normal"
            >
              <InputLabel htmlFor="Matricule">Nouveau mot de passe</InputLabel>
              <Input
                name="mot de passe"
                type={showPassword ? "text" : "password"}
                value={newPassword}
                classnames={Classnames("form-control", {
                  "is-invalid": errors.message,
                })}
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
                onChange={(event) => setNewPassword(event.target.value)}
              />
            </FormControl>
            <FormControl
              variant="standard"
              className="login_FormControl"
              margin="normal"
            >
              <InputLabel htmlFor="Matricule">
                Confirmer le mot de passe
              </InputLabel>
              <Input
                name="Confirmation le mot de passe"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                classnames={Classnames("form-control", {
                  "is-invalid": errors.message,
                })}
                startAdornment={
                  <InputAdornment position="start">
                    <LockResetIcon />
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
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              {errors.message && (
                <div className="login_error">{errors.message}</div>
              )}
            </FormControl>
            <button type="submit" className="login_button" disabled={loading}>
              {loading ? (
                <CircularProgress size={24} style={{ color: "white" }} />
              ) : (
                "Réinitialiser"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
