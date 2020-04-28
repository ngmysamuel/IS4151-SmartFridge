import React from "react"

import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableContainer from '@material-ui/core/TableContainer'
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TablePagination from '@material-ui/core/TablePagination';

import Typography from '@material-ui/core/Typography';

import * as moment from "moment"


const useStyles = makeStyles((theme) => ({
  container: {
    maxHeight: 440,
  },
  title: {
    margin: theme.spacing(0, 2, 2),
  },
}));

export default function UsageTable({ rows }) {
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

  // const transformDoorStatus = status => {
  //   let res = String(status)
  //   if (status === 1) {
  //     res.replace("1", "Open")
  //   } else if (status === 0) {
  //     res.replace("0", "Close")
  //   }
  //   return res
  // }

  return (
    <React.Fragment>
      <Typography variant="h6" className={classes.title}>
        Door Status Table
      </Typography>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>Door Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow key={row.timestamp}>
                  <TableCell>
                    {row.timestamp
                      ? moment(row.timestamp).format("dddd, MMMM Do YYYY, h:mm:ss a")
                      : "-"
                    }
                  </TableCell>
                  <TableCell>
                    {row.door_open
                      ? "Open"
                      : "Close"
                    }
                  </TableCell>
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
