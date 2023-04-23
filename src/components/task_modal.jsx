import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
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
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Ajouter une tache
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Formulaire a remplir.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
