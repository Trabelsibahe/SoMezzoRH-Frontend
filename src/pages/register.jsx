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

import Classnames from "classnames";
import "../assets/styles/register.css";

function RegisterPage() {
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
    dispatch(RegisterAction(form, navigate));
    console.log(form);
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
        <h5 className="col-md-12 text-center">Register</h5>
        <Container className="bg-variant col-md-4 mx-auto p-1">
          <Stack>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-1" controlId="formBasicName">
                <Form.Label>Nom d'utilisateur</Form.Label>
                <Form.Control
                  type="text"
                  name="utilisateur"
                  placeholder="Name"
                  onChange={onChangeHandler}
                  className={Classnames("form-control", {
                    "is-invalid": errors.utilisateur,
                  })}
                />
                {errors.utilisateur && (
                  <div className="invalid-feedback">{errors.utilisateur}</div>
                )}
              </Form.Group>
              <Form.Group className="mb-1" controlId="formBasicEmail">
                <Form.Label>Matricule</Form.Label>
                <Form.Control
                  type="text"
                  name="matricule"
                  placeholder="Enter Matricule"
                  className={Classnames("form-control", {
                    "is-invalid": errors.matricule,
                  })}
                  onChange={onChangeHandler}
                  errors={errors.matricule}
                />
                {errors.matricule && (
                  <div className="invalid-feedback">{errors.matricule}</div>
                )}
                <Form.Text className="text-muted">
                  Le matricule doit etre unique.
                </Form.Text>
              </Form.Group>

              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Role</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="EMP"
                  name="role"
                  onChange={onChangeHandler}
                >
                  <FormControlLabel
                    value="EMP"
                    control={<Radio />}
                    label="Employé"
                  />
                  <FormControlLabel
                    value="RRH"
                    control={<Radio />}
                    label="Responsable RH Operationnel"
                  />
                  <FormControlLabel
                    value="EXPERT"
                    control={<Radio />}
                    label="Responsable RH Metier/Expert RH"
                  />
                </RadioGroup>
              </FormControl>

              <Form.Group className="mb-1" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={Classnames("form-control", {
                    "is-invalid": errors.password,
                  })}
                  onChange={onChangeHandler}
                  errors={errors.password}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirm"
                  placeholder="Confirm Password"
                  className={Classnames("form-control", {
                    "is-invalid": errors.confirm,
                  })}
                  onChange={onChangeHandler}
                  errors={errors.confirm}
                />
                {errors.confirm && (
                  <div className="invalid-feedback">{errors.confirm}</div>
                )}
              </Form.Group>
              <div className="col-md-12 text-center mb-1">
                <Button
                  variant="contained"
                  color="neutral"
                  size="small"
                  type="submit"
                >
                  Enregistrer
                </Button>{" "}
                <Button
                  variant="outlined"
                  color="neutral"
                  size="small"
                  href="/expertrh"
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

export default RegisterPage;
