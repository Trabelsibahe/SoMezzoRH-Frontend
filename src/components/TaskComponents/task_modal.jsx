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
import { AddTask } from "../../actions/task.action";
import { useDispatch, useSelector } from "react-redux";
import formatDate from "../../components/formatdate";
import Classnames from "classnames";
import "../../assets/styles/register.css";
import { SendNotificationToOneUser } from "../../actions/notification.action";
import { GetOperaAction } from "../../actions/operation.action";
import { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #151582",
  boxShadow: 24,
  p: 4,
};

export default function Add_Task_Modal() {
  const dispatch = useDispatch();
  const opera = useSelector((state) => state.operation.operation);
  const errors = useSelector((state) => state.errors);
  const [open, setOpen] = React.useState(false);
  const TaskHandleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    (() => {
      dispatch(GetOperaAction());
    })();
  }, [dispatch]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const notification = {
      message: "Un nouveau Challenge est disponible découvrez-le.",
    };
    await dispatch(AddTask(form));
    opera.forEach((item) => {
      dispatch(SendNotificationToOneUser(item.user._id, notification));
    });
  };

  return (
    <div>
      <div className="task_add_card" onClick={TaskHandleOpen}>
        <AddIcon className="task_add_icon" />
        <p className="task_add_name">Ajouter une tâche</p>
        <p className="task_add_desc">
          Ajoutez une tâche pour votre équipe opérationnelle.
        </p>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={onSubmit}>
          <Box sx={style}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <h5
                style={{
                  padding: "0.2em",
                  textAlign: "center",
                  color: "#151582",
                }}
              >
                Ajouter une tache
              </h5>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  columnGap: "1em",
                }}
              >
                <Form.Group className="mb-2">
                  <TextField
                    name="titre"
                    value={form.titre}
                    onChange={(event) =>
                      setForm({ ...form, titre: event.target.value })
                    }
                    className={Classnames("w-100", {
                      "is-invalid": errors.titre,
                    })}
                    variant="outlined"
                    size="medium"
                    label="Nom de tache"
                    type="text"
                    fullWidth
                  />
                  {errors.titre && (
                    <div className="invalid-feedback">{errors.titre}</div>
                  )}
                </Form.Group>
                <FormControl size="medium" className="ab_select">
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
                    variant="outlined"
                    size="medium"
                    label="Description"
                    margin="dense"
                    type="text"
                    fullWidth
                  />
                </Form.Group>
              </div>
              <FormHelperText sx={{ padding: "0.5em" }}>
                Choisissez la période de la tâche, veuillez noter que la tâche
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
                    label="Date de debut de période d'absence"
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
                  />
                  {errors.dateCreation && (
                    <div className="invalid-feedback">
                      {errors.dateCreation}
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
                    <div className="invalid-feedback">
                      {errors.dateSuppression}
                    </div>
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
