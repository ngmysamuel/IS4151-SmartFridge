import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import { makeStyles } from "@material-ui/core/styles"
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

const useStyles = makeStyles(theme => ({
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
}))

export default function App() {
  const classes = useStyles()
  return (
    <BrowserRouter>
      <div className={classes.root}>
        <Header />
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
