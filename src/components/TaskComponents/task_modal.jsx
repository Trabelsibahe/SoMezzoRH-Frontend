import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import { FormHelperText, TextField } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Form, Container, Stack } from "react-bootstrap";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AddChallenge } from "../../actions/Challenge.action";
import { useDispatch, useSelector } from "react-redux";
import formatDate from "../../components/formatdate";
import Classnames from "classnames";
import "../../assets/styles/register.css";
import "../../assets/styles/register.css";

import {
  SendNotificationToOneUser,
  sendNotificationToExperts,
} from "../../actions/notification.action";
import { GetOperaAction } from "../../actions/operation.action";
import { useEffect, useState } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #151582",
  boxShadow: 24,
  p: 4,
    width: "100%",
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
};

export default function Add_Task_Modal() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const opera = useSelector((state) => state.operation.operation);
  const errors = useSelector((state) => state.errors);

  const CurrentUser = {
    isConnected: auth.isConnected,
    nom: auth.user.nom,
    prenom: auth.user.prenom,
    matricule: auth.user.matricule,
    role: auth.user.role,
    operation: auth.user.operation,
    active: auth.user.active,
  };
  const [open, setOpen] = React.useState(false);
  const TaskHandleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    (() => {
      dispatch(GetOperaAction());
    })();
  }, [dispatch]);

  const NotifyExpert = () => {
    const journalisation = {
      journal: `Le responsable RH Opérationnel "${CurrentUser.operation}" a ajouté un nouveau challenge.`,
    };
    dispatch(sendNotificationToExperts(journalisation));

  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const notification = {
      message: "Un nouveau Challenge est disponible, découvrez-le.",
    };
    dispatch(AddChallenge(form));
    if (Object.keys(form).length === 6){
    NotifyExpert();
    opera.forEach((item) => {
      dispatch(SendNotificationToOneUser(item.user._id, notification));
    });
  }
  };
    return (
    <div className="modal_addtask">
      <div className="task_add_card" onClick={TaskHandleOpen}>
        <AddIcon className="task_add_icon" />
        <p className="task_add_name">Ajouter un challenge</p>
        <p className="task_add_desc">Ajoutez une tâche pour votre équipe opérationnelle.</p>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description" >
        <form onSubmit={onSubmit}>
          <Box sx={style}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <h5 style={{ padding: "0.2em", textAlign: "center", color: "#151582", }}> Ajouter un challenge </h5>
              <div style={{ display: "flex", flexDirection: "row",  columnGap: "1em",}} >
                <Form.Group className="mb-2  w-100">
                  <TextField
                    name="titre"
                    value={form.titre}
                    onChange={(event) => setForm({ ...form, titre: event.target.value })
                    }
                    className={Classnames("w-100", {
                      "is-invalid": errors.titre,
                    })}
                    variant="outlined"
                    size="medium"
                    label="Nom de challenge"
                    type="text"
                    fullWidth
                  />
                 {errors.titre && (
                    <div className="invalid-feedback">{errors.titre}</div>
                  )}
                </Form.Group>
                <Form.Group className="mb-3 w-100">
                  <TextField
                    name="prime"
                    value={form.prime}
                    onChange={(event) => setForm({ ...form, prime: event.target.value })
                    }
                    className={Classnames("w-100", {
                      "is-invalid": errors.prime,
                    })}
                    variant="outlined"
                    size="medium"
                    label="Prime en DT"
                    type="number"
                    inputProps={{ min: 1, max: 100 }}
                  />
                 {errors.prime && (
                    <div className="invalid-feedback">{errors.prime}</div>
                  )}
                </Form.Group>
                <FormControl size="medium" className=" w-100">
                  <InputLabel>Priorité</InputLabel>
                  <Select
                    name="priorite"
                    label="Priorité"
                    value={form.priorite}
                    onChange={(event) =>
                      setForm({ ...form, priorite: event.target.value })
                    }
                    className={Classnames("w-100", {
                      "is-invalid": errors.priorite,
                    })}
                  >
                    <MenuItem value="Haut">Haut</MenuItem>
                    <MenuItem value="Moyen">Moyen</MenuItem>
                    <MenuItem value="Optionnel">Optionnel</MenuItem>
                  </Select>
                  {errors.priorite && (
                    <div className="invalid-feedback">{errors.priorite}</div>
                  )}
                </FormControl>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", row: "1em" }}
              >
                <Form.Group className="mb-2">
                  <TextField
                    name=""
                    value={form.description}
                    onChange={(event) =>
                      setForm({ ...form, description: event.target.value })
                    }
                    className={Classnames("w-100", {
                      "is-invalid": errors.description,
                    })}
                    variant="outlined"
                    size="medium"
                    label="Description"
                    margin="dense"
                    type="text"
                    fullWidth
                  />
                    {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </Form.Group>
              </div>
              <FormHelperText sx={{ padding: "0.5em" }}>
                Choisissez la période de la challenge, veuillez noter que la challenge
                sera supprimée automatiquement.
              </FormHelperText>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  columnGap: "1em",
                }}
              >
                <Form.Group className="mb-4">
                  <DatePicker
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    label="Date de debut de challange"
                    type="date"
                    name="dateCreation"
                    disablePast={true}
                    value={form.dateCreation}
                    className={Classnames("w-100", {
                      "is-invalid": errors.dateCreation,
                    })}
                    onChange={(dateCreation) => {
                      setForm({
                        ...form,
                        dateCreation: formatDate(dateCreation),
                      });
                    }}
                    onError={errors.dateCreation}

                  />
                  {errors.dateCreation && (
                    <div className="invalid-feedback">{errors.dateCreation}</div>
                  )}
                </Form.Group>
                <Form.Group className="mb-4">
                  <DatePicker
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    disablePast
                    label="Date de fin de challenge"
                    type="date"
                    name="dateSuppression"
                    className={Classnames("w-100", {
                      "is-invalid": errors.dateSuppression,
                    })}
                    value={form.dateSuppression}
                    onChange={(dateSuppression) =>
                      setForm({
                        ...form,
                        dateSuppression: formatDate(dateSuppression),
                      })
                    }
                    onError={errors.dateSuppression}
                  />
                   {errors.dateSuppression && (
                    <div className="invalid-feedback">{errors.dateSuppression}</div>
                  )}
                </Form.Group>
              </div>
              <div style={{ display: "flex", columnGap: "15em" }}>
                <Button
                  variant="outlined"
                  style={{ color: "#464e56" }}
                  onClick={handleClose}
                >
                  Annuler
                </Button>
                <Button
                  variant="outlined"
                  type="submit"
                  style={{ color: "#151582" }}
                >
                  Ajouter
                </Button>
              </div>
            </LocalizationProvider>
          </Box>
        </form>
      </Modal>
    </div>
  );
}
