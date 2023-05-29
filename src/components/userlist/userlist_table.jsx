import "../../assets/styles/rrh.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TablePagination from "@mui/material/TablePagination";
import { Button, InputBase, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import formatDate from "../../components/formatdate";
import Modal from "@mui/material/Modal";
import { Form } from "react-bootstrap";
import {
  GetProfiles,
  deleteAndArchiveProfile,
  EditProfileAction,
} from "../../actions/profile.actions";
import { SendNotificationToOneUser } from "../../actions/notification.action";

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




function Row(accounts, index) {
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.profiles.profiles);
  useEffect(() => {
    dispatch(GetProfiles());
  }, [dispatch]);

  const { profile } = accounts;
  const [open, setOpen] = React.useState(false);
  const [Profileid, setProfileId] = useState("");
  const [_id, setId] = useState("");

  const [ville, setVille] = useState("");
  const [pays, setPays] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [matricule, setMatricule] = useState("");
  const [role, setRole] = useState("");
  const [tel, setTel] = useState("");
  const [codepostal, setCodepostal] = useState("");
  const [adresse, setAdresse] = useState("");
  const [gouvernorat, setGouvernorat] = useState("");
  const [datenaiss, setDatenaiss] = useState("");
  const [email, setEmail] = useState("");
  const [operation, setOperation] = useState("");
  const [titre, setTitre] = useState("");
  const [active, setActive] = useState(false);
  const [edit, setEdit] = useState(false);
  const handleCloseEdit = () => setEdit(false);

  const handleShowEdit = (id) => {
    profiles.forEach((p) => {
      if (p._id === id) {
        setProfileId(p._id);
        setId(p.user._id);
        setNom(p.user.nom);
        setPrenom(p.user.prenom);
        setMatricule(p.user.matricule);
        setRole(p.user.role);
        setOperation(p.user.operation);
        setTitre(p.user.titre);
        setPays(p.pays);
        setGouvernorat(p.gouvernorat);
        setVille(p.ville);
        setCodepostal(p.codepostal);
        setAdresse(p.adresse);
        setTel(p.tel);
        setEmail(p.email);
        setDatenaiss(p.datenaiss);
      }
    });
    setEdit(true);
  };
  const [holder, setHolder] = useState("");
  const EditProfile = async () => {
    const data = {
      user: {
        _id,
        nom,
        prenom,
        matricule,
        role,
        operation,
        titre,
      },
      email,
      tel,
      datenaiss,
      pays,
      gouvernorat,
      ville,
      codepostal,
      adresse,
    };

    const notification = {
      message: "L'Expert RH a modifié votre profil.",
      journal: `Le compte sous le matricule "${data.user.matricule}" a été modifié.`,
    };

    await dispatch(EditProfileAction(Profileid, data));
    await dispatch(SendNotificationToOneUser(data.user._id, notification));
    await dispatch(GetProfiles());
    await dispatch(GetProfiles());

    handleCloseEdit();
    setProfileId("");
    setNom("");
    setPrenom("");
    setMatricule("");
    setRole("");
    setOperation("");
    setTitre("");
    setTel("");
    setDatenaiss("");
    setEmail("");
    setPays("");
    setGouvernorat("");
    setVille("");
    setCodepostal("");
    setAdresse("");
  };

  //fonction supp + getlist
  const deleteContact = async (id) => {
    const data = {
      user: {
        nom: profile.user.nom,
        prenom: profile.user.prenom,
        matricule: profile.user.matricule,
        role: profile.user.role,
        operation: profile.user.operation,
        titre: profile.user.titre,
        active: false,
      },
      email,
      tel,
      datenaiss,
      pays,
      gouvernorat,
      ville,
      codepostal,
      adresse,
    };
    await dispatch(EditProfileAction(id, data));
    await dispatch(deleteAndArchiveProfile(id));
    await dispatch(GetProfiles());
    await dispatch(GetProfiles());
  };

  return (
    <>
      {/** pop up edit */}

      <Modal open={edit}  onClose={handleCloseEdit} aria-labelledby="modal-modal-title"  aria-describedby="modal-modal-description">
        <form>
           <Box sx={style}>
           <p className="task_add_name">Modifier ce profil.</p>
            <div style={{ display: "flex", flexDirection: "row",  columnGap: "1em", }}>
            <Form.Group className="mb-2">
            <TextField label="Nom" type="text" value={nom} onChange={(e) => setNom(e.target.value)} margin="normal" size="small" required/>
            </Form.Group>
            <Form.Group className="mb-2">
              <TextField label="Prénom" type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} margin="normal" size="small"/>
            </Form.Group>
            </div>

            <div style={{ display: "flex", flexDirection: "row",  columnGap: "1em", }}>
            <Form.Group className="mb-2">
              <TextField  sx={{"& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "black"}}} label="Matricule" type="text" value={matricule} onChange={(e) => setMatricule(e.target.value)} margin="normal" size="small" disabled />
            </Form.Group>
            <Form.Group className="mb-2">
              <TextField label="Role" type="text" value={role} onChange={(e) => setRole(e.target.value)} margin="normal" size="small"/>
            </Form.Group>
            </div>

            <div style={{ display: "flex", flexDirection: "row",  columnGap: "1em", }}>
            <Form.Group className="mb-2">
              <TextField label="Opération" type="text" value={operation} onChange={(e) => setOperation(e.target.value)} margin="normal" size="small"/>
            </Form.Group>
            <Form.Group className="mb-2">
              <TextField label="Titre" type="text"  value={titre} onChange={(e) => setTitre(e.target.value)} margin="normal" size="small" />
            </Form.Group>
            </div>

            <div style={{ display: "flex", flexDirection: "row",  columnGap: "1em", }}>
            <Form.Group className="mb-2">
              <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" size="small"/>
            </Form.Group>
            <Form.Group className="mb-2">
              <TextField label="Numéro de télèphone" type="number" value={tel} onChange={(e) => setTel(e.target.value)} margin="normal" size="small"/>
            </Form.Group>
            </div>

            <div style={{ display: "flex", flexDirection: "row",  columnGap: "1em", }}>
            <Form.Group className="mb-2">
              <TextField label="Date de naissance" type="text" value={formatDate(datenaiss)} onChange={(e) => setDatenaiss(e.target.value)} margin="normal" size="small"/>
            </Form.Group>
            <Form.Group className="mb-2">
              <TextField label="Pays" type="text" value={pays}  onChange={(e) => setPays(e.target.value)} placeholder="modifier le pays" margin="normal" size="small"/>
            </Form.Group>
            </div>

            <div style={{ display: "flex", flexDirection: "row",  columnGap: "1em", }}>
            <Form.Group className="mb-2">
              <TextField label="Gouvernorat" type="text" value={gouvernorat} onChange={(e) => setGouvernorat(e.target.value)} margin="normal" size="small"/>
            </Form.Group>
            <Form.Group className="mb-2">
              <TextField label="Ville" type="text" value={ville} onChange={(e) => setVille(e.target.value)} margin="normal" size="small"/>
            </Form.Group>
            </div>

            <div style={{ display: "flex", flexDirection: "row",  columnGap: "1em", }}>
            <Form.Group className="mb-2">
              <TextField label="Adresse" type="text" value={adresse} onChange={(e) => setAdresse(e.target.value)} margin="normal" size="small"/>
            </Form.Group>
            <Form.Group className="mb-2">
              <TextField label="Code postale" type="text" value={codepostal} onChange={(e) => setCodepostal(e.target.value)} margin="normal" size="small"/>
            </Form.Group>
            </div>

          <Button variant="outlined" onClick={handleCloseEdit}>Annuler</Button>{" "}
          <Button variant="outlined" onClick={EditProfile}>Modifier</Button>
          </Box>
          </form>
      </Modal>
      <React.Fragment key={index}>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>

          <TableCell align="center">{profile.user.nom}</TableCell>
          <TableCell align="center"> {profile.user.prenom}</TableCell>
          <TableCell align="center">{profile.user.matricule}</TableCell>
          <TableCell align="center">{profile.user.operation}</TableCell>
          <TableCell align="center">
            {profile.user.titre ? profile.user.titre : "Aucun titre"}
          </TableCell>
          <TableCell align="center" className="expert_role">
            {profile.user.role === "EXPERT"
              ? "EXPERT RH"
              : profile.user.role === "EMP"
              ? "EMPLOYÉ"
              : profile.user.role === "RRH"
              ? "RESPONSABLE RH OPÉRATIONNEL"
              : null}
          </TableCell>

          <TableCell align="center">
            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={() => handleShowEdit(profile._id)}
            >
              Modifier{" "}
            </Button>{" "}
            <Button
              variant="outlined"
              size="small"
              color="error"
              onClick={() => deleteContact(profile._id)}
            >
              {" "}
              Supprimer{" "}
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 0 }}>
                <Typography variant="h6" gutterBottom component="div">
                  <p className="typo_title">Coordonnées personelles</p>
                </Typography>
                <Table size="medium" aria-label="coordonnées">
                  <TableHead>
                    <TableRow
                      sx={{
                        borderBottom: "2px solid white",
                        borderTop: "2px solid white",
                      }}
                    >
                      <TableCell align="center">Pays</TableCell>
                      <TableCell align="center">Gouvernorat</TableCell>
                      <TableCell align="center">Ville</TableCell>
                      <TableCell align="center">Code postal</TableCell>
                      <TableCell align="center">Adresse</TableCell>
                      <TableCell align="center">Numéro de téléphone</TableCell>
                      <TableCell align="center">E-mail</TableCell>
                      <TableCell align="center">Date de naissance</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <TableRow sx={{ borderBottom: "2px solid white" }}>
                      <TableCell align="center">{profile.pays}</TableCell>
                      <TableCell align="center">
                        {profile.gouvernorat}
                      </TableCell>
                      <TableCell align="center">{profile.ville}</TableCell>
                      <TableCell align="center">{profile.codepostal}</TableCell>
                      <TableCell align="center">{profile.adresse}</TableCell>
                      <TableCell align="center">{profile.tel}</TableCell>
                      <TableCell align="center">{profile.email}</TableCell>
                      <TableCell align="center">
                        {formatDate(profile.datenaiss)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    </>
  );
}
export default function UserList() {
  const dispatch = useDispatch();

  const profiles = useSelector((state) => state.profiles.profiles);

  useEffect(() => {
    dispatch(GetProfiles());
  }, [dispatch]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const rows = profiles;

  const currentRows = rows.filter((r, ind) => {
    return ind >= rowsPerPage * page && ind < rowsPerPage * (page + 1);
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // recherche et affichage
  const [search, setSearch] = useState("");
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredUserList = profiles.filter((profile, ind) => {
    if (search === "") {
      return (
        true && ind >= rowsPerPage * page && ind < rowsPerPage * (page + 1)
      );
    }
    if (profile.user.matricule.toLowerCase().includes(search.toLowerCase())) {
      return (
        true && ind >= rowsPerPage * page && ind < rowsPerPage * (page + 1)
      );
    }
    if (profile.user.role.toLowerCase().includes(search.toLowerCase())) {
      return (
        true && ind >= rowsPerPage * page && ind < rowsPerPage * (page + 1)
      );
    }
    if (profile.user.nom.toLowerCase().includes(search.toLowerCase())) {
      return (
        true && ind >= rowsPerPage * page && ind < rowsPerPage * (page + 1)
      );
    }
    if (profile.user.prenom.toLowerCase().includes(search.toLowerCase())) {
      return (
        true && ind >= rowsPerPage * page && ind < rowsPerPage * (page + 1)
      );
    }
    return false;
  });

  return (
    <>
      <InputBase
        className="searchbar"
        placeholder="Rechercher.."
        type="text"
        value={search}
        onChange={handleSearch}
        startAdornment={
          <InputAdornment position="start">
            {" "}
            <SearchIcon />{" "}
          </InputAdornment>
        }
        margin="normal"
        sx={{ width: 250 }}
      />

      <Paper
        className="opera_table"
        sx={{
          width: "100%",
          boxShadow: "none",
          border: "2px solid #e0e0e0",
          borderRadius: "0",
        }}
      >
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell
                  align="center"
                  sx={{ borderBottom: "2px solid #e0e0e0" }}
                >
                  <span className="opera_table_tr"> Nom </span>{" "}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderBottom: "2px solid #e0e0e0" }}
                >
                  <span className="opera_table_tr"> Prénom </span>{" "}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderBottom: "2px solid #e0e0e0" }}
                >
                  <span className="opera_table_tr"> Matricule </span>{" "}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderBottom: "2px solid #e0e0e0" }}
                >
                  <span className="opera_table_tr"> Opération </span>{" "}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderBottom: "2px solid #e0e0e0" }}
                >
                  <span className="opera_table_tr"> Titre </span>{" "}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderBottom: "2px solid #e0e0e0" }}
                >
                  <span className="opera_table_tr"> Role </span>{" "}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderBottom: "2px solid #e0e0e0" }}
                >
                  <span className="opera_table_tr"> Actions </span>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredUserList.map((profile, index) => (
                <Row key={index} profile={profile} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
