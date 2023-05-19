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
import formatDate from "../../components/formatdate";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { GetOperaAction } from "../../actions/operation.action";

function Row(accounts, index) {
  const dispatch = useDispatch();
  const opera = useSelector((state) => state.operation.operation);

  useEffect(() => {
    (() => {
      dispatch(GetOperaAction());
    })();
  }, [dispatch]);

  const { operaItem } = accounts;
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <React.Fragment key={index} >
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell align="center">{operaItem.user.nom}</TableCell>
          <TableCell align="center"> {operaItem.user.prenom}</TableCell>
          <TableCell align="center">{operaItem.user.matricule}</TableCell>
          <TableCell align="center">{operaItem.user.role}</TableCell>
          <TableCell align="right">
            <Button sx={{color: " #151582"}}
              aria-label="expand row"
              size="medium" 
              onClick={() => setOpen(!open)}> Voir plus {open ? <KeyboardArrowUpIcon/>: <KeyboardArrowDownIcon />} 
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1  }}>
                <Typography variant="h6" gutterBottom component="div">
                <p className="typo_title">Coordonnées personelles</p>
                </Typography>
                <Table size="medium" aria-label="coordonnées">
                  <TableHead>
                    <TableRow sx={{borderBottom:"2px solid white", borderTop:"2px solid white"}}>
                      <TableCell align="center">Pays</TableCell>
                      <TableCell align="center">Gouvernorat</TableCell>
                      <TableCell align="center" >Ville</TableCell>
                      <TableCell align="center">Code postal</TableCell>
                      <TableCell align="center">Adresse</TableCell>
                      <TableCell align="center">Numéro de téléphone</TableCell>
                      <TableCell align="center">E-mail</TableCell>
                      <TableCell align="center">Date de naissance</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <TableRow sx={{borderBottom:"2px solid white"}}>
                      <TableCell align="center">{operaItem.pays}</TableCell>
                      <TableCell align="center">{operaItem.gouvernorat}</TableCell>
                      <TableCell align="center">{operaItem.ville}</TableCell>
                      <TableCell align="center">{operaItem.codepostal}</TableCell>
                      <TableCell align="center">{operaItem.adresse}</TableCell>
                      <TableCell align="center">{operaItem.tel}</TableCell>
                      <TableCell align="center">{operaItem.email}</TableCell>
                      <TableCell align="center">{formatDate(operaItem.datenaiss)}</TableCell>
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
export default function OperaList() {
  const dispatch = useDispatch();

  const opera = useSelector((state) => state.operation.operation);

  useEffect(() => {
    dispatch(GetOperaAction());
  }, [dispatch]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const rows = opera;

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

  const filteredOperation = opera.filter((OperaItem, ind) => {
    if (search === "") {
      return (
        true && ind >= rowsPerPage * page && ind < rowsPerPage * (page + 1)
      );
    }
    if (
      OperaItem.user.role.toLowerCase().includes(search.toLowerCase()) ||
      OperaItem.user.matricule.toLowerCase().includes(search.toLowerCase()) ||
      OperaItem.user.nom.toLowerCase().includes(search.toLowerCase()) ||
      OperaItem.user.prenom.toLowerCase().includes(search.toLowerCase())
    ) {
      return (
        true && ind >= rowsPerPage * page && ind < rowsPerPage * (page + 1)
      );
    }
    return false;
  });
  return (
    <>
        <div className="rrh_info_div">
          <p className="rrh_info">Mon équipe</p>
        <InputBase
        className="rrh_searchbar"
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
      </div>
      <Paper className="opera_table" sx={{ width: "100%", boxShadow:"none", border:"2px solid #e0e0e0", borderRadius:"0" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell  align="center" sx={{borderBottom:"2px solid #e0e0e0"}}>
                  <span className="opera_table_tr"> Nom </span>
                </TableCell>
                <TableCell align="center" sx={{borderBottom:"2px solid #e0e0e0"}}>
                  <span className="opera_table_tr"> Prénom </span>
                </TableCell>
                <TableCell align="center" sx={{borderBottom:"2px solid #e0e0e0"}}>
                  <span className="opera_table_tr"> Matricule </span>
                </TableCell>
                <TableCell align="center" sx={{borderBottom:"2px solid #e0e0e0"}}>
                  <span className="opera_table_tr"> Role </span>
                </TableCell>
                <TableCell align="right" sx={{borderBottom:"2px solid #e0e0e0"}}>{" "}</TableCell>
              </TableRow>
            </TableHead>

            <TableBody >
              {filteredOperation.map((operaItem, index) => (
                <Row key={index} operaItem={operaItem} />
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
