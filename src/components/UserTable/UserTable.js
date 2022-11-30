import classes from "./UserTable.module.css";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useParams } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables({ data }) {
  const params = useParams();

  const sendInvitation = async (email) => {
    const url = "http://localhost:3001/send";
    try {
      await axios
        .post(url, {
          id_group: params.idGroup,
          email: email,
        })
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            alert("Your invitation sent!");
          }
        });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <TableContainer component={Paper} className={classes["table-container"]}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell align="right">Full Name</StyledTableCell>
            <StyledTableCell align="right">Telephone&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row.email}
              </StyledTableCell>
              <StyledTableCell align="right">{row.fullname}</StyledTableCell>
              <StyledTableCell align="right">{row.telephone}</StyledTableCell>
              <StyledTableCell align="right">
                <AddIcon
                  className={classes["icon-add"]}
                  onClick={(e) => sendInvitation(row.email)}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
