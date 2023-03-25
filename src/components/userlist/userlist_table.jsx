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
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import { Modal, Form } from "react-bootstrap";

import {
  GetProfiles,
  deleteAndArchiveProfile,
  modifierContact,
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
  const [utilisateur, setUtilisateur] = useState("");
  const [matricule, setMatricule] = useState("");
  const [role, setRole] = useState("");
  const [tel, setTel] = useState("");
  const [codepostal, setCodepostal] = useState("");

  const [edit, setEdit] = useState(false);
  const handleCloseEdit = () => setEdit(false);

  const handleShowEdit = (id) => {
    profiles.forEach((p) => {
      if (p._id === id) {
        setId(p._id);
        setUtilisateur(p.user.utilisateur);
        setMatricule(p.user.matricule);
        setRole(p.user.role);
        setTel(p.tel);
        setVille(p.ville);
        setPays(p.pays);
        setCodepostal(p.codepostal);
      }
    });
    setEdit(true);
  };

  //fonction modifier + getlist
  const EditProfile = async () => {
    const data = {
      user: {
        utilisateur,
        matricule,
        role,
      },
      tel,
      ville,
      pays,
      codepostal,
    };
    await dispatch(modifierContact(id, data));
    await dispatch(GetProfiles());
    await dispatch(GetProfiles());
    handleCloseEdit();
    setId("");
    setUtilisateur("");
    setMatricule("");
    setRole("");
    setTel("");
    setVille("");
    setPays("");
    setCodepostal("");
  };

  //fonction supp + getlist
  const deleteContact = async (id) => {
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
              <Form.Label>Utilisateur</Form.Label>
              <Form.Control
                type="text"
                value={utilisateur}
                onChange={(e) => setUtilisateur(e.target.value)}
                placeholder="modifier le nom"
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
            {profile.user.utilisateur}
          </TableCell>
          <TableCell align="right">{profile.user.matricule}</TableCell>
          <TableCell align="right">{profile.user.role}</TableCell>
          <TableCell align="right">
            <Button
              variant="primary"
              onClick={() => handleShowEdit(profile._id)}
            >
              Modifier
            </Button>
            <Button onClick={() => deleteContact(profile._id)}>Archiver</Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Telephone</TableCell>
                      <TableCell>Ville</TableCell>
                      <TableCell align="right">Pays</TableCell>
                      <TableCell align="right">Code postale</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {profile.tel}
                      </TableCell>
                      <TableCell>{profile.ville}</TableCell>
                      <TableCell align="right">{profile.pays}</TableCell>
                      <TableCell align="right">{profile.codepostal}</TableCell>
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

  const filteredContacts = profiles.filter((profile, ind) => {
    if (search === "") {
      return (
        true && ind >= rowsPerPage * page && ind < rowsPerPage * (page + 1)
      );
    }
    if (
      profile.user.role.toLowerCase().includes(search.toLowerCase()) ||
      profile.user.matricule.toLowerCase().includes(search.toLowerCase())
    ) {
      return (
        true && ind >= rowsPerPage * page && ind < rowsPerPage * (page + 1)
      );
    }
    return false;
  });

  return (
    <>
    <div className="expert_searchbar">
      <InputBase className="searchbar"  placeholder="Rechercher.."   type="text"   value={search}   onChange={handleSearch} 
        startAdornment={ <InputAdornment position="start"> <SearchIcon />    </InputAdornment>  }  margin="normal"
        sx={{width:220}}/></div>

      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Nom d'utilisateur</TableCell>
                <TableCell align="right">Matricule</TableCell>
                <TableCell align="right">Role</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredContacts.map((profile, index) => (
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
