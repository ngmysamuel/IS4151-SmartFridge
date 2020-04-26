import React from "react"
import Link from "@material-ui/core/Link"
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Title from "./Title"

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount }
}

const rows = [
  createData(0, "16 Mar, 2020", "Apple", "+2", "Yes", 3),
  createData(1, "16 Mar, 2020", "Banana", "+2", "Yes", 3),
  createData(2, "16 Mar, 2020", "Pizza", "+2", "No", 3),
  createData(3, "16 Mar, 2020", "Orange", "+2", "Yes", 3),
  createData(4, "16 Mar, 2020", "Hot Dog", "+2", "No", 3),
]

function preventDefault(event) {
  event.preventDefault()
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}))

export default function Orders() {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Title>Recent Items</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Transaction</TableCell>
            <TableCell>Good for Health</TableCell>
            <TableCell align="right">Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See fridge items
        </Link>
      </div>
    </React.Fragment>
  )
}
