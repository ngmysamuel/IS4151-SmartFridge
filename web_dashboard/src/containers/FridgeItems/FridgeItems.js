import React from "react"
import clsx from "clsx"
import axios from "axios"

import HTTPconfig from "../../HTTPconfig"

import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"

import { format } from 'date-fns'

import ContentBar from "../../components/ContentBar"
import DateRangePicker from "../../components/DateRangePicker"
// import ItemsTable from "../../components/ItemsTable"
import ItemsChart from "../../components/ItemsChart"

const styles = theme => ({
  contentWrapper: {
    margin: "40px 16px",
    //position: "relative",
    //minHeight: 200,
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    marginBottom: 30,
    width: 1200,
  },
  fixedHeight: {
    maxHeight: 550,
  },
  explainImg: {
    margin: "0 auto",
    width: "90%",
  },
})

class FridgeItems extends React.Component {
  state = {
    // default fromDate is 00:00 AM of today
    fromDate: new Date().setHours(0,0,0,0),
    // toDate must not be later than current time
    toDate: new Date(), //format(new Date(), 'yyyy MMM dd HH:mm:ss'),
    // item table rows
    itemRows: []
  }

  get_snapshot_combo = async () => {}

  reloadListDS = () => {
    this.get_snapshot_combo()
  }

  async componentDidMount() {
    // await this.get_snapshot_combo()
  }

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  handleFromDateChange = date => {
    this.setState({
      fromDate: date
    })
  }

  handleToDateChange = date => {
    this.setState({
      toDate: date
    })
  }

  handleCommit = async e => {
    e.preventDefault();

    const { fromDate, toDate } = this.state

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

    console.log("FridgeItems State: ", this.state)

    return (
      <>
        <Typography variant="h4" gutterBottom>
          Fridge Items
        </Typography>
        <Paper className={clsx(classes.paper, classes.fixedHeight)}>
          <ContentBar
            needToList={false}
            barTitle="Pick Time Range"
            mainBtnText="Refresh Snapshot"
            refreshAction={this.reloadListDS}
          />
          <DateRangePicker
            fromDate={this.state.fromDate}
            toDate={this.state.toDate}
            handleFromDateChange={this.handleFromDateChange}
            handleToDateChange={this.handleToDateChange}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={this.handleCommit}
          >
            View Items
          </Button>
        </Paper>

        <Paper className={clsx(classes.paper)}>
          <ContentBar
            needToList={false}
            barTitle="Items Chart"
          />
          <Grid container spacing={3} style={{ marginTop: 50, paddingBottom:50 }}>
            <ItemsChart
              rows={this.state.itemRows}
            />
          </Grid>
        </Paper>
      </>
    )
  }
}

export default withStyles(styles)(FridgeItems)
