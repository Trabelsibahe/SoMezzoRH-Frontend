import { Form, Container, Stack } from "react-bootstrap";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RegisterAction } from "../actions/auth.actions";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';

import Classnames from "classnames";
import "../assets/styles/register.css";

function AddRepoPage() {

  
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errors = useSelector((state) => state.errors);

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    form.active = "true";
    dispatch(RegisterAction(form, navigate));
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
    <ThemeProvider theme={theme}>
      <div className="Register">
        <h5 className="col-md-12 text-center p-3">Demande d'absence</h5>
        <Container className="bg-variant col-md-4 mx-auto p-2">
          <Stack>
            <Form onSubmit={onSubmit}>

              <Form.Group className="mb-1"> 
                <TextField id="outlined-basic" variant="outlined" size="small" label="Type d'absence" margin="normal"
                  type="text"
                  name="nom"
                  onChange={onChangeHandler}
                  className={Classnames("w-100", {
                    "is-invalid": errors.nom,
                  })}
                  error={errors.nom}
                />
                {errors.nom && (
                  <div className="invalid-feedback">{errors.nom}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-1">
                <TextField id="outlined-basic" variant="outlined" size="small" label="Date de debut de période d'absence" margin="normal"
                  type="date"
                  name="prenom"
                  onChange={onChangeHandler}
                  className={Classnames("w-100", {
                    "is-invalid": errors.prenom,
                  })}
                  error={errors.prenom}
                />
                {errors.prenom && (
                  <div className="invalid-feedback">{errors.prenom}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-1" controlId="formBasicEmail">
                <TextField  id="outlined-basic" variant="outlined" size="small" label="Date de fin de période d'absence" margin="normal"
                  type="date"
                  name="matricule" 
                  
                  className={Classnames("w-100", {
                    "is-invalid": errors.matricule,
                  })}
                  onChange={onChangeHandler}
                  error={errors.matricule} 
                />
                {errors.matricule && (
                  <div className="invalid-feedback">{errors.matricule}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-1">
                <TextField id="outlined-basic" variant="outlined" size="small" label="Commentaires" margin="normal"
                  type="text"
                  name="operation"
                  onChange={onChangeHandler}
                  className={Classnames("w-100", {
                    "is-invalid": errors.operation,
                  })}
                  error={errors.operation}
                />
                {errors.operation && (
                  <div className="invalid-feedback">{errors.operation}</div>
                )}
              </Form.Group>
       
        
              <div className="col-md-12 text-center mb-4 ">
                <Button
                  variant="contained"
                  color="neutral"
                  size="small"
                  type="submit"
                ><CheckIcon/>{" "}
                  Démander le repos
                </Button>{" "}
                <Button
                  variant="outlined"
                  color="neutral"
                  size="small"
                  href="/emp"
                >
                  Annuler
                </Button>
              </div>
            </Form>
          </Stack>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default AddRepoPage;
