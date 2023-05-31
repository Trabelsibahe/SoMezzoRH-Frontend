import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendPasswordResetEmail, Getuser } from "../actions/auth.actions";
import "../assets/styles/EmailFormPage.css";
import "../assets/styles/intro.css";
import logoblanc from "../assets/images/logo_blanc.png";
import Classnames from "classnames";
import {
  CircularProgress,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
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
const EmailFormPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const errors = useSelector((state) => state.errors);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      await dispatch(sendPasswordResetEmail(email));
      setLoading(false);
    }, 500);
  };

  return (
    <div className="email_page">
      <div className="email_container">
        <div id="stars"></div>
        <div id="stars2"></div>
        <img className="email_logo" src={logoblanc} alt="logo"></img>
        <div className="login_whitebox">
          <h5>Réinitialiser le mot de passe</h5>
          <form className="login_form" onSubmit={handleSubmit}>
            <FormControl
              variant="standard"
              className="login_FormControl"
              margin="normal"
            >
              <InputLabel htmlFor="Matricule">Adresse e-mail</InputLabel>
              <Input
                name="email"
                type="email"
                value={email}
                classnames={Classnames("form-control", {
                  "is-invalid": errors.message,
                })}
                onChange={(event) => setEmail(event.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <MarkEmailReadIcon />
                  </InputAdornment>
                }
              />
              {errors.message && (
                <div className="login_error">{errors.message}</div>
              )}
            </FormControl>
            <button type="submit" className="login_button" disabled={loading}>
              {loading ? (
                <CircularProgress size={24} style={{ color: "white" }} />
              ) : (
                "Envoyer"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailFormPage;
