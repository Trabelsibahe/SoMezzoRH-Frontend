import { Form, Container, Stack } from "react-bootstrap";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import dayjs from "dayjs";

import { listerdemande, AddDemande } from "../actions/demande.action";

function AddDemandePage() {
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);

  const [form, setForm] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("type", form.type ? form.type : "");
    formData.append("commentaire", form.commentaire ? form.commentaire : "");
    await dispatch(AddDemande(formData));
    await dispatch(listerdemande());
  };
  const theme = createTheme({
    palette: {
      neutral: {
        main: "#24377b",
        contrastText: "#fff",
      },
    },
  });

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className="rrh_body">
    <ThemeProvider theme={theme}>
      <div className="addRepoPage">
        <h5 className="col-md-12 text-center p-4">Demande d'attestation et badge</h5>
        <Container className="bg-variant col-md-4 mx-auto p-4">
          <Stack>
            <Form onSubmit={onSubmit}>
              
                <FormControl size="small" className="ab_select" margin="normal">
                  <InputLabel id="demo-select-small">Type de demande</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    name="type"
                    label="Type de demande"
                    error={errors.type}
                    value={form.type}
                    onChange={(event) =>
                      setForm({ ...form, type: event.target.value })
                    }
                    className={Classnames("w-100", {"is-invalid": errors.type})}
                  >
                    <MenuItem value="Attestation">Attestation</MenuItem>
                    <MenuItem value="Badge">Badge</MenuItem>
                    <MenuItem value="Autre...">Autre...</MenuItem>
                  </Select>
                  {errors.type && (
                    <div className="invalid-feedback">{errors.type}</div>
                  )}
                </FormControl>

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
                    type="submit">
                    <CheckIcon /> Demander </Button>{" "}
                  <Button
                    variant="outlined"
                    color="neutral"
                    size="small"
                    onClick={reloadPage}>
                    Annuler
                  </Button>
                </div>
            </Form>
          </Stack>
        </Container>
      </div>
    </ThemeProvider>
    </div>

  );
}

export default AddDemandePage;
