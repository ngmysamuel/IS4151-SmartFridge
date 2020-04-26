import React from "react"

import AppBar from "@material-ui/core/AppBar"
import { withStyles } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import Tooltip from "@material-ui/core/Tooltip"

const styles = theme => ({
  ContentBar: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  block: {
    display: "block",
  },
  mainBtn: {
    marginRight: theme.spacing(1),
  },
})

class ContentBar extends React.Component {
  render() {
    const {
      classes,
      needToList,
      barTitle,
      mainBtnText,
      refreshAction,
    } = this.props

    return (
      <AppBar
        className={classes.ContentBar}
        position="static"
        color="default"
        elevation={0}
      >
        <Toolbar>
          <Grid
            container
            spacing={2}
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h5" gutterBottom>
                {barTitle}
              </Typography>
            </Grid>
            {needToList && (
              <Grid item>
                <Tooltip title="Reload">
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.mainBtn}
                    onClick={refreshAction}
                  >
                    {mainBtnText}
                  </Button>
                </Tooltip>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(ContentBar)
