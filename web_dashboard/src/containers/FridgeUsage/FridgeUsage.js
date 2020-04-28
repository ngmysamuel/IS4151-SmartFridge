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
import * as moment from "moment"

import ContentBar from "../../components/ContentBar"
import DateRangePicker from "../../components/DateRangePicker"
import UsageTable from "../../components/UsageTable"
import UsageList from "../../components/UsageList"

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

class FridgeUsage extends React.Component {
  state = {
    // default fromDate is 00:00 AM of today
    fromDate: new Date().setHours(0,0,0,0),
    // toDate must not be later than current time
    toDate: new Date(), //format(new Date(), 'yyyy MMM dd HH:mm:ss'),
    // item table rows
    itemRows: [],
    // duration of door in seconds
    doorDuration: 0,
    // times of door
    doorTimes: 0,
    // totalTime in hours
    totalHour: 0
  }

  get_snapshot_combo = async () => {}

  diffFromToTime = (fromDate, toDate) => {
    const f = moment(fromDate)
    const t = moment(toDate)
    const duration = moment.duration(t.diff(f));
    const durationInSec = duration.asHours()
    return durationInSec
  }

  getDurationHour = (t) => {
    return moment.duration(t).asHours()
  }

  componentDidMount() {
    this.setState(prevState => ({
      totalHour: this.diffFromToTime(prevState.fromDate, prevState.toDate)
    }))
  }

  componentDidUpdate(prevProps, prevState) {
    // if form's states have changed
    if (
      this.state.fromDate !== prevState.fromDate ||
      this.state.toDate !== prevState.toDate
    ) {
      this.setState(prevState => ({
        totalHour: this.diffFromToTime(this.state.fromDate, this.state.toDate)
      }))
    }
  }

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

    // get door table
    try {
      const res = await axios.get(
        `${HTTPconfig.sensor_gateway}get-door-status-range?from_date=${strFromDate}&to_date=${strToDate}`
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

    // get door duration
    try {
      const res = await axios.get(
        `${HTTPconfig.sensor_gateway}get-duration-door-open?from_date=${strFromDate}&to_date=${strToDate}`
      )
      // res.data is the object sent back from the server
      console.log("axios res.data: ", res.data)
      console.log("axios full response schema: ", res)

      this.setState({
        doorDuration: res.data,
      })
    } catch (err) {
      console.error(err, "error")
    }

    // get door times
    try {
      const res = await axios.get(
        `${HTTPconfig.sensor_gateway}get-times-door-open?from_date=${strFromDate}&to_date=${strToDate}`
      )
      // res.data is the object sent back from the server
      console.log("axios res.data: ", res.data)
      console.log("axios full response schema: ", res)

      this.setState({
        doorTimes: res.data,
      })
    } catch (err) {
      console.error(err, "error")
    }
  }

  render() {
    const { classes } = this.props

    console.log("FridgeUsage State: ", this.state)

    return (
      <>
        <Typography variant="h4" gutterBottom>
          Fridge Usage
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
            View Usage
          </Button>
        </Paper>

        <Paper className={clsx(classes.paper)}>
          <ContentBar
            needToList={false}
            barTitle="Usage and Energy Consumption"
          />
          <Grid container spacing={3} style={{ marginTop: 50, paddingBottom:50 }}>
            <UsageTable
              rows={this.state.itemRows}
            />
            <div style={{ margin: 50 }} />
            <UsageList
              doorDuration={this.state.doorDuration}
              doorTimes={this.state.doorTimes}
              totalHour={this.state.totalHour}
            />
          </Grid>
        </Paper>
      </>
    )
  }
}

export default withStyles(styles)(FridgeUsage)
