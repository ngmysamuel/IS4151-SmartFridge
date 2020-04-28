import React from "react"

import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableContainer from '@material-ui/core/TableContainer'
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TablePagination from '@material-ui/core/TablePagination';

import Title from "./Title"

import * as moment from "moment"


const useStyles = makeStyles({
  container: {
    maxHeight: 440,
  },
});

export default function Orders({ rows, inOverview }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <React.Fragment>
      {inOverview &&
        <Title>Recent Items</Title>
      }
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>banana</TableCell>
              <TableCell>apple</TableCell>
              <TableCell>sandwich</TableCell>
              <TableCell>orange</TableCell>
              <TableCell>broccoli</TableCell>
              <TableCell>carrot</TableCell>
              <TableCell>hot_dog</TableCell>
              <TableCell>pizza</TableCell>
              <TableCell>donut</TableCell>
              <TableCell>cake</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow key={row.id}>
                  <TableCell>
                    {row.timestamp
                      ? moment(row.timestamp).format("dddd, MMMM Do YYYY, h:mm:ss a")
                      : "-"
                    }
                  </TableCell>
                  <TableCell>{row.banana}</TableCell>
                  <TableCell>{row.apple}</TableCell>
                  <TableCell>{row.sandwich}</TableCell>
                  <TableCell>{row.orange}</TableCell>
                  <TableCell>{row.broccoli}</TableCell>
                  <TableCell>{row.carrot}</TableCell>
                  <TableCell>{row.hot_dog}</TableCell>
                  <TableCell>{row.pizza}</TableCell>
                  <TableCell>{row.donut}</TableCell>
                  <TableCell>{row.cake}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </React.Fragment>
  )
}
