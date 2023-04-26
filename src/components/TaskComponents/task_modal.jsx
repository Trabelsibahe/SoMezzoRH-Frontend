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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import formatDate from "../../components/formatdate";

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
  const [open, setOpen] = React.useState(false);
  const TaskHandleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [form, setForm] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(AddTask(form));
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
                    variant="outlined"
                    size="medium"
                    label="Nom de tache"
                    type="text"
                    fullWidth
                  />
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
                  >
                    <MenuItem value="Haut">Haut</MenuItem>
                    <MenuItem value="Moyen">Moyen</MenuItem>
                    <MenuItem value="Optionnel">Optionnel</MenuItem>
                  </Select>
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
                    value={form.dateCreation}
                    onChange={(dateCreation) => {
                      setForm({
                        ...form,
                        dateCreation: formatDate(dateCreation),
                      });
                    }}
                    variant="outlined"
                    size="small"
                    label="Date de début"
                    type="date"
                    name="dateDebut"
                    disablePast={true}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <DatePicker
                    value={form.dateSuppression}
                    onChange={(dateSuppression) => {
                      setForm({
                        ...form,
                        dateSuppression: formatDate(dateSuppression),
                      });
                    }}
                    variant="outlined"
                    size="small"
                    label="Date de fin"
                    type="date"
                    name="dateDebut"
                    disablePast={true}
                  />
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
