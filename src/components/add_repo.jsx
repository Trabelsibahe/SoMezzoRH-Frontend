import { Form, Container, Stack } from "react-bootstrap";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RegisterAction } from "../actions/auth.actions";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import TextField from "@mui/material/TextField";
import CheckIcon from "@mui/icons-material/Check";

import Classnames from "classnames";
import "../assets/styles/register.css";
import { Box } from "@mui/material";

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
      <div className="addRepoPage">
        <h5 className="col-md-12 text-center p-3">Demande d'absence</h5>
        <Container className="bg-variant col-md-4 mx-auto p-4">
          <Stack>
            <Form onSubmit={onSubmit}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>

                <FormControl size="small" className="ab_select" margin="normal">
                  <InputLabel id="demo-select-small">Type d'absence</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    label="Type d'absence"
                    className={Classnames("w-100", {   "is-invalid": errors.prenom, })}  error={errors.prenom}>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>

                <Form.Group className="mb-2">
                  <DatePicker
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    label="Date de debut de période d'absence"
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

                <Form.Group className="mb-1">
                  <DatePicker 
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    label="Date de fin de période d'absence"
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

                <Form.Group className="mb-4">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    size="large"
                    label="Commentaires"
                    margin="dense"
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
                  >
                    <CheckIcon /> Démander le repos
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
              </LocalizationProvider>
            </Form>
          </Stack>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default AddRepoPage;
