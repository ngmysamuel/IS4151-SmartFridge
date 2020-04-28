import React from "react"
import clsx from "clsx"
import axios from "axios"

import HTTPconfig from "../../HTTPconfig"

import { format } from 'date-fns'

import { Link } from "react-router-dom"

import { withStyles } from "@material-ui/core/styles"

import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"

import FridgeSnapshot from "../../containers/FridgeItems/FridgeSnapshot"
import Chart from "../../components/Chart"
import UsageOverview from "../../components/UsageOverview"
import ItemsTable from "../../components/ItemsTable"

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
})

class Overview extends React.Component {
  state = {
    // item table rows
    itemRows: []
  }

  async componentDidMount() {
    // get the past 1 hour item data
    // for testing with mock db use 0425 date
    // new Date('2020-04-25 07:15:00')
    let fromDate = new Date()
    fromDate.setHours(fromDate.getHours() - 1)
    const toDate = new Date()
    const strFromDate = format(fromDate, 'yyyy-MM-dd HH:mm:ss')
    const strToDate = format(toDate, 'yyyy-MM-dd HH:mm:ss')

    try {
      const res = await axios.get(
        `${HTTPconfig.objdet_gateway}get-items-range?from_date=${strFromDate}&to_date=${strToDate}`
      )
      // res.data is the object sent back from the server
      console.log("axios res.data: ", res.data)
      console.log("axios full response schema: ", res)

      this.setState({
        itemRows: res.data,
      })
    } catch (err) {
      console.error(err, "error")
    }
  }

  render() {
    const { classes } = this.props

    return (
      <>
        <FridgeSnapshot />
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={clsx(classes.paper, classes.fixedHeight)}>
            <Chart />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={clsx(classes.paper, classes.fixedHeight)}>
            <UsageOverview />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper className={clsx(classes.paper)}>
            <ItemsTable
              rows={this.state.itemRows}
              inOverview={true}
            />
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={`/fridge-items`}
            >
              Go to Items Page
            </Button>
          </Paper>
        </Grid>
      </>
    )
  }
}

export default withStyles(styles)(Overview)
