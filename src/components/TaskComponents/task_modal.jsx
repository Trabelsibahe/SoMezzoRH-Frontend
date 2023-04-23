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
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Add_Task_Modal() {
  const [open, setOpen] = React.useState(false);
  const TaskHandleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        aria-describedby="modal-modal-description">
        <Box sx={style}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div style={{display:"flex", flexDirection:"row",columnGap:"1em"}}>
          <Form.Group className="mb-2">
            <TextField  variant="outlined" size="medium"  label="Nom de tache" type="text"fullWidth />
          </Form.Group>
          <FormControl size="medium" className="ab_select" >
                  <InputLabel>Priorité</InputLabel>
                  <Select name="type" label="Priorité" >
                    <MenuItem value="Haut">Haut</MenuItem>
                    <MenuItem value="Moyen">Moyen</MenuItem>
                    <MenuItem value="Optionnel">Optionnel</MenuItem>
                  </Select>
          </FormControl>
          </div>
          <div style={{display:"flex", flexDirection:"column",rowGap:"1em"}}>
          <Form.Group className="mb-2">
            <TextField  variant="outlined" size="medium"  label="Description" margin="dense"  type="text" fullWidth/>
          </Form.Group>
          </div>
          <FormHelperText sx={{padding:"0.5em"}}>Choisissez la période de la tâche, veuillez noter que la tâche sera supprimée automatiquement.</FormHelperText>
          <div style={{display:"flex", flexDirection:"row",columnGap:"1em"}}>
          <Form.Group className="mb-4">
           <DatePicker variant="outlined" size="small" label="Date de début" type="date"  name="dateDebut" disablePast={true}/>
          </Form.Group>

          <Form.Group className="mb-4">
           <DatePicker variant="outlined" size="small" label="Date de fin" type="date"  name="dateDebut" disablePast={true}/>
          </Form.Group>
          </div>
          <div style={{display:"flex", columnGap:"15em",}}>
          <Button variant="outlined" style={{color:"#464e56"}} onClick={handleClose}>Annuler</Button>
          <Button variant="outlined" style={{color:"#151582"}}>Ajouter</Button>
          </div>

          </LocalizationProvider>
        </Box>
      </Modal>
    </div>
  );
}
