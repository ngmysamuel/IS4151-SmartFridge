import React from "react"
import clsx from "clsx"
import axios from "axios"

import HTTPconfig from "../../HTTPconfig"

import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"

import ContentBar from "../../components/ContentBar"
import DateRangePicker from "../../components/DateRangePicker"
import ItemsTable from "../../components/ItemsTable"

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
    oriSnapshotImg: "",
    predSnapshotImg: "",
    currItems: {},
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

  render() {
    console.log(this.state)
    const { classes } = this.props

    return (
      <>
        <Paper className={clsx(classes.paper, classes.fixedHeight)}>
          <ContentBar
            needToList={false}
            barTitle="Pick Time Range"
            mainBtnText="Refresh Snapshot"
            refreshAction={this.reloadListDS}
          />
          <DateRangePicker />
          <Button variant="contained" color="secondary">
            View Items
          </Button>
        </Paper>

        <Paper className={clsx(classes.paper, classes.fixedHeight)}>
          <ContentBar
            needToList={true}
            barTitle="Recent Items"
            mainBtnText="Refresh Snapshot"
            refreshAction={this.reloadListDS}
          />
          <Grid container spacing={3}>
            <ItemsTable />
          </Grid>
        </Paper>
      </>
    )
  }
}

export default withStyles(styles)(FridgeItems)
