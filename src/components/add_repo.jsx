import { Form, Container, Stack } from "react-bootstrap";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RegisterAction } from "../actions/auth.actions";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import CheckIcon from "@mui/icons-material/Check";
import Classnames from "classnames";
import formatDate from "../components/formatdate";
import "../assets/styles/register.css";
import dayjs from 'dayjs';


import { GetAbsence, AddAbsence } from "../actions/absence.action";

function AddRepoPage() {

  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);

  const [form, setForm] = useState({});
  const [Active, setActive] = useState(true);

  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(AddAbsence(form));
    await dispatch(GetAbsence());
    console.log(errors)
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
        <h5 className="col-md-12 text-center p-4">Demande d'absence</h5>
        <Container className="bg-variant col-md-4 mx-auto p-4">
          <Stack>
            <Form onSubmit={onSubmit}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                
                <FormControl size="small" className="ab_select" margin="normal">
                  <InputLabel id="demo-select-small">Type d'absence</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    name="type"
                    label="Type d'absence"
                    value={form.type}
                    onChange={(event) => setForm({ ...form, type: event.target.value }) }
                    className={Classnames("w-100", {
                      "is-invalid": errors.type,
                    })}
                  >
                    <MenuItem value="Maladie">Maladie</MenuItem>
                    <MenuItem value="Vacance">Vacance</MenuItem>
                    <MenuItem value="n7chi fih">Marriage</MenuItem>
                  </Select>
                  {errors.type && (
                  <div className="invalid-feedback">{errors.type}</div>
                )}
                </FormControl>
                <p>{" "} </p>
                <Form.Group className="mb-4">
                  <DatePicker
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    label="Date de debut de période d'absence"
                    type="date"
                    name="dateDebut"
                    disablePast={true}
                    value={form.dateDebut}  
                    className={Classnames("w-100", {
                      "is-invalid": errors.dateDebut,
                    })}
                    onChange={(dateDebut) => {
                      setForm({ ...form, dateDebut: formatDate(dateDebut) });  }} />
                  {errors.dateDebut && (
                    <div className="invalid-feedback">
                      {errors.dateDebut}
                    </div>
                  )}
                </Form.Group>

                <Form.Group className="mb-4">
                  <DatePicker
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    disablePast
                    label="Date de fin de période d'absence"
                    type="date"
                    name="dateFin"
                    
                    className={Classnames("w-100", {
                      "is-invalid": errors.dateFin,
                    })}
                    value={form.dateFin}
                    onChange={(dateFin) => setForm({ ...form, dateFin: formatDate(dateFin) })}
                    onError={errors.dateFin}
                  />
                  {errors.dateFin && (
                    <div className="invalid-feedback">{errors.dateFin}</div>
                  )}
                </Form.Group>

                <Form.Group className="mb-4">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    size="large"
                    label="Commentaires (optionnel)"
                    margin="dense"
                    type="text"
                    name="commentaire"
                    value={form.commentaire}
                    onChange={(event) =>
                      setForm({ ...form, commentaire: event.target.value })
                    }
                    className={Classnames("w-100", {
                      "is-invalid": errors.commentaire,
                    })}
                  />
       
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
