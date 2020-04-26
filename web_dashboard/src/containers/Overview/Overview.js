import React from "react"
import clsx from "clsx"

import { makeStyles } from "@material-ui/core/styles"

import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"

import FridgeSnapshot from "../../containers/FridgeItems/FridgeSnapshot"
import Chart from "../../components/Chart"
import UsageOverview from "../../components/UsageOverview"
import ItemsTable from "../../components/ItemsTable"

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}))

export default function Overview() {
  const classes = useStyles()

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
        <Paper className={clsx(classes.paper, classes.fixedHeight)}>
          <ItemsTable />
        </Paper>
      </Grid>
    </>
  )
}
