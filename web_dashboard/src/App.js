import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import axios from "axios"

import HTTPconfig from "./HTTPconfig"

import * as moment from "moment"

import { withStyles } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"

// skeleton of the layout
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import Copyright from "./components/Copyright"

// routing components
import Overview from "./containers/Overview"
import FridgeItems from "./containers/FridgeItems"
import FridgeCondition from "./containers/FridgeCondition"
import FridgeUsage from "./containers/FridgeUsage"

const NoMatch = ({ location }) => (
  <h3>
    No page found for <code>{location.pathname}</code>
  </h3>
)

const styles = theme => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
})

class App extends React.Component {
  state = {
    itemRows: [],
    fridgeAlarm: false
  }

  getCurrDoor = async () => {
    // item table in today range
    try {
      const res = await axios.get(
        `${HTTPconfig.sensor_gateway}get-current-door-status`
      )
      // res.data is the object sent back from the server
      console.log(">>>App axios res.data: ", res.data)
      console.log(">>>App axios full response schema: ", res)

      this.setState({
        itemRows: res.data,
      })
    } catch (err) {
      console.error(err, "!!!!!!!!!!!!!error")
    }
  }

  componentDidMount() {
    this.getCurrDoor()

    // check the current door status every 30 seconds
    // debug using 10 secs
    this.interval = setInterval(this.getCurrDoor, 30000); // Time in milliseconds
  }

  componentWillUnmount() {
    // clear the interval when unmount
    clearInterval(this.interval);
  }

  componentDidUpdate(prevProps, prevState) {
    // if form's states have changed
    if (
      this.state.itemRows[0] !== prevState.itemRows[0]
    ) {
      const { door_open, timestamp } = this.state.itemRows[0]
      console.log("new door status arrived")
      if (door_open === 0) {
        console.log("fridge door is closed")
        this.setState(prevState => ({
          fridgeAlarm: false
        }))
      } else {
        console.log("fridge door is OPEN!!!")
        console.log("timestamp is: ", timestamp)
        console.log("time difference is: ", this.diffFromToTime(timestamp, new Date()))
        // if open for more than 2 mins, trigger alarm
        if (this.diffFromToTime(timestamp, new Date()) > 2) {
          this.setState(prevState => ({
            fridgeAlarm: true
          }))
        }
      }

    }
  }

  diffFromToTime = (fromDate, toDate) => {
    const f = moment(fromDate)
    const t = moment(toDate)
    const duration = moment.duration(t.diff(f));
    const durationInSec = duration.asMinutes()
    return durationInSec
  }

  render() {
    const { classes } = this.props
    return (
      <BrowserRouter>
        <div className={classes.root}>
          <Header showAlarm={this.state.fridgeAlarm} />
          <Sidebar />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              <Grid container spacing={3}>
                <Switch>
                  <Route exact path="/" component={Overview} />
                  <Route exact path="/fridge-items" component={FridgeItems} />
                  <Route
                    exact
                    path="/fridge-condition"
                    component={FridgeCondition}
                  />
                  <Route exact path="/fridge-usage" component={FridgeUsage} />
                  <Route component={NoMatch} />
                </Switch>
              </Grid>
              <Box pt={4}>
                <Copyright />
              </Box>
            </Container>
          </main>
        </div>
      </BrowserRouter>
    )
  }
}

export default withStyles(styles)(App)
