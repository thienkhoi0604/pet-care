import classes from "./GroupInfo.module.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Row(props) {
  const { idGroup } = props;

  const { data } = useQuery({
    queryKey: [`repoListMembersDetail`],
    queryFn: async () => {
      const url = "http://localhost:3001/members";
      const { data } = await axios.get(url, {
        params: { id_group: idGroup },
      });
      return data;
    },
  });

  const onDeleteMemberHandler = async (email) => {
    const url = "http://localhost:3001/delete";
    try {
      await axios
        .post(url, {
          id_group: idGroup,
          member: email,
        })
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            console.log("response: ", res);
          }
        });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <React.Fragment>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Box sx={{ margin: 1 }}>
            <Typography variant="h6" gutterBottom component="div">
              Members
            </Typography>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>Fullname</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell align="right">Telephone</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data.map((mem, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {mem.email}
                      </TableCell>
                      <TableCell>{mem.fullname}</TableCell>
                      <TableCell>{mem.role}</TableCell>
                      <TableCell align="right">{mem.telephone}</TableCell>
                      <TableCell align="right">
                        <Link to={`/${idGroup}`}>
                          <ClearOutlinedIcon
                            onClick={(e) => onDeleteMemberHandler(mem.email)}
                          />
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const params = useParams();
  return (
    <TableContainer component={Paper} className={classes["table-container"]}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="left">Name Group</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <Row idGroup={params.idGroup} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
