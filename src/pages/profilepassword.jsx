import "../assets/styles/profilepassword.css";
import React from "react";
import Navigation from "../components/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Form, Container, Stack } from "react-bootstrap";
import Classnames from "classnames";
import { ChangePasswordAction } from "../actions/auth.actions";
import { useNavigate } from 'react-router-dom'



function ProfilPassword() {
  const auth = useSelector((state) => state.auth);
  const errors = useSelector((state) => state.errors);
  const dispatch = useDispatch();

  const Currentexpert = {
    isConnected: auth.isConnected,
    nom: auth.user.nom,
    prenom: auth.user.prenom,
    matricule: auth.user.matricule,
    role: auth.user.role,
  };

const [form, setForm] = useState("");
const navigate = useNavigate();

  const onChangeHandler = (e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

const ChangePassword = (e) => {
  e.preventDefault();
  dispatch(ChangePasswordAction(form, navigate))
}



  const theme = createTheme({
    palette: {
      neutral: {
        main: "#24377b",
        contrastText: "#fff",
      },
    },
  });

  return (
    <div className="expert_page">
      <Navigation user={Currentexpert} />
      <div className="expert_container">
        <div className="page_name">
          Pages / Profil / Securité{" "}
          <p style={{ fontWeight: "bold", fontSize: "14px" }}>Securité</p>
        </div>

        <ThemeProvider theme={theme}>
          <div className="profile_security">{" "}
            <h5 className="col-md-12 text-center p-4">Changer votre mot de passe</h5>
            <Container className="bg-variant col-md-4 mx-auto p-4">
              <Stack>
                <Form onSubmit={ChangePassword}>
                  <Form.Group className="mb-2" controlId="OldPassword">

                    <TextField
                    name="oldPassword"
                    onChange={onChangeHandler}
                    className={Classnames("w-100", { "is-invalid": errors.oldPassword})}  
                      variant="outlined"
                      size="small"
                      margin="normal"
                      label="Mot de passe actuel"
                      type="password"
                       error={errors.oldPassword} />
                        { errors.oldPassword && (<div  className="invalid-feedback">{errors.oldPassword}</div>)}
                        </Form.Group>

                  <Form.Group className="mb-2" controlId="NewPassword">
                    <TextField
                    name="newPassword"
                    onChange={onChangeHandler}
                    className={Classnames("w-100", { "is-invalid": errors.newPassword})}  
                    variant="outlined"
                      size="small"
                      label="Nouveau mot de passe"
                      margin="dense"
                      type="password" error={errors.newPassword} />
                      { errors.newPassword && (<div  className="invalid-feedback">{errors.newPassword}</div>)}
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="ConfirmPassword">
                    <TextField
                    name="pConfirm"
                    onChange={onChangeHandler}
                    className={Classnames("w-100", { "is-invalid": errors.pConfirm})}  
                    variant="outlined"
                      size="small"
                      label="Confirmer le nouveau mot de passe"
                      margin="dense"
                      type="password" error={errors.pConfirm} />
                      { errors.pConfirm && (<div  className="invalid-feedback">{errors.pConfirm}</div>)}
                    <Form.Text className="text-muted"><a href="#" style={{color:"#24377b"}}>Mot de passe oublié?</a></Form.Text>
                  </Form.Group>
                  

                  <div className="col-md-12 text-center mb-2">
                    <Button
                      variant="contained"
                      color="neutral"
                      size="small"
                      type="submit"   >    Confirmer  </Button>{" "}
                    <Button
                      variant="outlined"
                      color="neutral"
                      size="small"
                      href="/profil">  Annuler    </Button>
                  </div>

                </Form>
              </Stack>
            </Container>
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default ProfilPassword;
