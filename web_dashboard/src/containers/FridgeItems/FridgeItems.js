import React from "react"
import clsx from "clsx"
import axios from "axios"

import HTTPconfig from "../../HTTPconfig"

import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"

import ContentBar from "../../components/ContentBar"

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

  get_snapshot_combo = async () => {
    try {
      const res = await axios.get(
        `${HTTPconfig.gateway}get-snapshot`
      )
      // res.data is the object sent back from the server
      console.log("axios res.data: ", res.data)
      console.log("axios full response schema: ", res)

      this.setState({
        oriSnapshotImg: res.data.ori_image,
      })
    } catch (err) {
      console.error(err, "error")
    }

    try {
      const res = await axios.get(
        `${HTTPconfig.gateway}get-predicted-snapshot`
      )
      // res.data is the object sent back from the server
      console.log("axios res.data: ", res.data)
      console.log("axios full response schema: ", res)

      this.setState({
        predSnapshotImg: res.data.image,
        currItems: res.data.items,
      })
    } catch (err) {
      console.error(err, "error")
    }
  }

  reloadListDS = () => {
    this.get_snapshot_combo()
  }

  async componentDidMount() {
    await this.get_snapshot_combo()
  }

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  render() {
    console.log(this.state)
    const { classes } = this.props

    return (
      <>
        <Grid item xs={12}>
          <Paper className={clsx(classes.paper, classes.fixedHeight)}>
            <ContentBar
              needToList={true}
              barTitle="Current Items"
              mainBtnText="Refresh Snapshot"
              refreshAction={this.reloadListDS}
            />
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper>
                  <Typography gutterBottom color="textSecondary" align="center">
                    Original Snapshot
                  </Typography>
                  <img
                    className={classes.explainImg}
                    src={`data:image/jpeg;base64,${this.state.oriSnapshotImg}`}
                    alt="oriSnapImg"
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper>
                <Typography gutterBottom color="textSecondary" align="center">
                    Snapshot with Predictions
                  </Typography>
                  <img
                    className={classes.explainImg}
                    src={`data:image/jpeg;base64,${this.state.predSnapshotImg}`}
                    alt="predSnapImg"
                  />
                </Paper>
              </Grid>
            </Grid>

            <div className={classes.contentWrapper}>
              <Typography gutterBottom>
                Predicted Item: Quantity
              </Typography>
              {Object.keys(this.state.currItems).map(k => (
                <Typography key={k} color="textSecondary" align="left">
                  {k}: {this.state.currItems[k]}
                </Typography>
              ))}
            </div>
          </Paper>
        </Grid>
      </>
    )
  }
}

export default withStyles(styles)(FridgeItems)
