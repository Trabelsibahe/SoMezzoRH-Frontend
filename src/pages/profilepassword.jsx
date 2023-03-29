import "../assets/styles/profilepassword.css";
import React from "react";
import Navigation from "../components/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Form, Container, Stack } from "react-bootstrap";
import Classnames from "classnames";

function ProfilPassword() {
  const auth = useSelector((state) => state.auth);

  const errors = useSelector((state) => state.errors);

  const Currentexpert = {
    isConnected: auth.isConnected,
    name: auth.user.utilisateur,
    matricule: auth.user.matricule,
    role: auth.user.role,
  };

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
                <Form >
                  <Form.Group className="mb-2" controlId="OldPassword">
                    <TextField
                    className={Classnames("w-100", { "is-invalid": errors.utilisateur})}  
                      variant="outlined"
                      size="small"
                      margin="normal"
                      label="Mot de passe actuel"
                      type="password"  />
                  </Form.Group>

                  <Form.Group className="mb-2" controlId="NewPassword">
                    <TextField
                    className={Classnames("w-100", { "is-invalid": errors.utilisateur})}  
                    variant="outlined"
                      size="small"
                      label="Nouveau mot de passe"
                      margin="dense"
                      type="password"    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="ConfirmPassword">
                    <TextField
                    className={Classnames("w-100", { "is-invalid": errors.utilisateur})}  
                    variant="outlined"
                      size="small"
                      label="Confirmer le nouveau mot de passe"
                      margin="dense"
                      type="password"    />
                    <Form.Text className="text-muted"><a href="#" style={{color:"#24377b"}}>Mot de passe oublié?</a></Form.Text>
                  </Form.Group>
                  

                  <div className="col-md-12 text-center mb-2">
                    <Button
                      variant="contained"
                      color="neutral"
                      size="small"
                      type="submit"    >    Confirmer  </Button>{" "}
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
