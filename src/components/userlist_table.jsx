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
import { Button } from "@mui/material";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetProfiles,
  deleteAndArchiveProfile,
  modifierContact,
} from "../actions/profile.actions";



function Row(accounts, index) {
  const { profile } = accounts;
  const [open, setOpen] = React.useState(false);


  return (

    <React.Fragment key={index}>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
              <TableCell>
                <IconButton  aria-label="expand row"  size="small"    onClick={() => setOpen(!open)}    >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>

              <TableCell component="th" scope="row">
              {profile.user.utilisateur}
              </TableCell>
              <TableCell align="right">{profile.user.matricule}</TableCell>
              <TableCell align="right">{profile.user.role}</TableCell>
              <TableCell align="right">
                <Button variant="primary">Modifier</Button>
                <Button>Archiver</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                style={{ paddingBottom: 0, paddingTop: 0 }}
                colSpan={6}>
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
                      <TableCell align="right">
                        {profile.codepostal}
                      </TableCell>
                      </TableRow>
                      </TableBody>


                    </Table>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </React.Fragment>
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

  const [search, setSearch] = useState("");
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredContacts = profiles.filter((profile, ind) => {
    if (search === "") {
      return true && ind >= rowsPerPage * page && ind < rowsPerPage * (page + 1);
    }
    if (profile.user.matricule.toLowerCase().includes(search.toLowerCase())) {
      return true && ind >= rowsPerPage * page && ind < rowsPerPage * (page + 1);;
    }
       return false;

  });


  return (
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
          {
            filteredContacts.map( (profile, index)=> (
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
        onRowsPerPageChange={handleChangeRowsPerPage} />
  </Paper>
  );
}
