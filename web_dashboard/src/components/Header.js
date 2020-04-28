import React from "react"

import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Badge from "@material-ui/core/Badge"
import NotificationsIcon from "@material-ui/icons/Notifications"

import AlarmDialog from "../components/AlarmDialog"


const drawerWidth = 240

const styles = theme => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    zIndex: 1101,
  },
  title: {
    flexGrow: 1,
  },
})


class Header extends React.Component {
  state = {
    showDialog: false
  }

  handleBadgeClick = () => {
    this.setState({
      showDialog: true
    })
  }

  handleDialogClose = () => {
    this.setState({
      showDialog: false
    })
  }

  render() {
    const { showAlarm, classes } = this.props

    return (
      <AppBar position="absolute" className={classes.appBarShift}>
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Smart Fridge
          </Typography>
          <IconButton color="inherit">
            <Badge
              badgeContent={
                showAlarm ? 1 : 0
              }
              color="secondary"
              onClick={this.handleBadgeClick}
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
        <AlarmDialog
          open={this.state.showDialog}
          handleDialogClose={this.handleDialogClose}
          message={
            showAlarm
              ? "Your fridge door was left open for more than 2 minutes!"
              : "Everything good, no alarm."
          }
        />
      </AppBar>
    )
  }
}

export default withStyles(styles)(Header)
