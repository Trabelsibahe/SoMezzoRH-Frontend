import * as React from "react";
import PropTypes from "prop-types";
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
import { Modal, Form } from "react-bootstrap";
import {
  GetProfiles,
  deleteAndArchiveProfile,
  EditProfileAction,
} from "../../actions/profile.actions";

function Row(accounts, index) {
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.profiles.profiles);
  useEffect(() => {
    dispatch(GetProfiles());
  }, [dispatch]);

  const { profile } = accounts;
  const [open, setOpen] = React.useState(false);
  const [id, setId] = useState("");
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
        setId(p._id);
        setNom(p.user.nom);
        setPrenom(p.user.prenom);
        setMatricule(p.user.matricule);
        setRole(p.user.role);
        setOperation(p.user.operation);
        setTitre(p.user.titre);
        setActive(p.user.active);
        setPays(p.pays);
        setGouvernorat(p.gouvernorat);
        setVille(p.ville);
        setCodepostal(p.codepostal);
        setAdresse(p.adresse);
        setTel(p.tel);
        setEmail(p.email);
        setDatenaiss(p.datenais);
      }
    });
    setEdit(true);
  };

  //fonction modifier + getlist
  const EditProfile = async () => {
    const data = {
      user: {
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

    await dispatch(EditProfileAction(id, data));
    await dispatch(GetProfiles());
    await dispatch(GetProfiles());
    handleCloseEdit();
    setId("");
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
        nom : profile.user.nom,
        prenom : profile.user.prenom,
        matricule : profile.user.matricule,
        role : profile.user.role,
        operation : profile.user.operation,
        titre : profile.user.titre,
        active : false,
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
      <Modal show={edit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier un Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="modifier le nom"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Prénom</Form.Label>
              <Form.Control
                type="text"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                placeholder="modifier le prenom"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>matricule</Form.Label>
              <Form.Control
                type="text"
                value={matricule}
                onChange={(e) => setMatricule(e.target.value)}
                placeholder="modifier le matricule"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="modifier le role"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Opération</Form.Label>
              <Form.Control
                type="text"
                value={operation}
                onChange={(e) => setOperation(e.target.value)}
                placeholder="modifier l'opération "
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Titre</Form.Label>
              <Form.Control
                type="text"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                placeholder="modifier le titre"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="modifier l'email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>tel</Form.Label>
              <Form.Control
                type="number"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
                placeholder="modifier le ville"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Ville</Form.Label>
              <Form.Control
                type="text"
                value={ville}
                onChange={(e) => setVille(e.target.value)}
                placeholder="modifier le ville"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Pays</Form.Label>
              <Form.Control
                type="text"
                value={pays}
                onChange={(e) => setPays(e.target.value)}
                placeholder="modifier le pays"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Code postal</Form.Label>
              <Form.Control
                type="text"
                value={codepostal}
                onChange={(e) => setCodepostal(e.target.value)}
                placeholder="modifier le code postal"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button variant="primary" onClick={EditProfile}>
            Modifier
          </Button>
        </Modal.Footer>
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

          <TableCell component="th" scope="row">
            {" "}
            {profile.user.nom}{" "}
          </TableCell>
          <TableCell> {profile.user.prenom}</TableCell>
          <TableCell>{profile.user.matricule}</TableCell>
          <TableCell>{profile.user.operation}</TableCell>
          <TableCell>
            {profile.user.titre ? profile.user.titre : "Aucun titre"}
          </TableCell>

          <TableCell className="expert_role">
            {profile.user.role === "EXPERT"
              ? "RESPONSABLE RH METIER / EXPERT RH"
              : profile.user.role === "EMP"
              ? "EMPLOYÉ"
              : profile.user.role === "RRH"
              ? "RESPONSABLE RH OPÉRATIONNEL"
              : null}
          </TableCell>

          <TableCell align="right">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleShowEdit(profile._id)}
            >
              {" "}
              Modifier{" "}
            </Button>
            <Button
              variant="primary"
              onClick={() => deleteContact(profile._id)}
            >
              {" "}
              Supprimer{" "}
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Coordonnées personnelles
                </Typography>
                <Table size="small" aria-label="coordonnées">
                  <TableHead>
                    <TableRow>
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
                    <TableRow>
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

      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>
                  <span className="table_tr"> Nom </span>{" "}
                </TableCell>
                <TableCell>
                  <span className="table_tr"> Prénom </span>{" "}
                </TableCell>
                <TableCell>
                  <span className="table_tr"> Matricule </span>{" "}
                </TableCell>
                <TableCell>
                  <span className="table_tr"> Opération </span>{" "}
                </TableCell>
                <TableCell>
                  <span className="table_tr"> Titre </span>{" "}
                </TableCell>
                <TableCell>
                  <span className="table_tr"> Role </span>{" "}
                </TableCell>
                <TableCell align="right">
                  <span className="table_tr"> Actions </span>
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
