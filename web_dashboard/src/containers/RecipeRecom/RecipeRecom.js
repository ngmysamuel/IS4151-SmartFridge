import React from "react"
import clsx from "clsx"
import axios from "axios"

import HTTPconfig from "../../HTTPconfig"

import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"

// for recipe list
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';


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
    marginBottom: 30,
    width: 1200,
  },
  fixedHeight: {
    maxHeight: 550,
  },
  inline: {
    display: 'inline',
  },
})

class RecipeRecom extends React.Component {
  state = {
    currItems:{},
    strForAPI: "",
    recipeRes: "",
  }

  get_current_items = async () => {
    try {
      const res = await axios.get(`${HTTPconfig.objdet_gateway}get-current-items`)
      // res.data is the object sent back from the server
      console.log("Get curr items axios res.data: ", res.data)
      console.log("Get curr items axios full response schema: ", res)

      this.setState({
        currItems: res.data[0],
      })
    } catch (err) {
      console.error(err, "error")
    }
  }

  componentDidMount() {
    this.get_current_items()
  }

  async componentDidUpdate(prevProps, prevState) {
    // if form's states have changed
    if (
      this.state.currItems !== prevState.currItems
    ) {
      let qForAPI = ''
      if (Object.keys(this.state.currItems).length !== 0) {
        Object.keys(this.state.currItems).map(k => {
          if (k !== 'id' && k !== "timestamp") {
            if (this.state.currItems[k] > 0) {
              qForAPI += k + ','
            }
          }
          return null
        })
      }
      console.log("qForAPI is: ", qForAPI)
      this.setState({
        strForAPI: qForAPI.slice(0, -1)
      })
      // send to recipe API
      try {
        const res = await axios.get(`${HTTPconfig.edamam_host}search?q=${qForAPI.slice(0, -1)}${HTTPconfig.edamam_config}`)
        // res.data is the object sent back from the server
        console.log("recipe API axios res.data: ", res.data)
        console.log("recipe API axios full response schema: ", res)
  
        this.setState({
          recipeRes: res.data,
        })
      } catch (err) {
        console.error(err, "error")
      }
      // recipeRes hits
      // Object.keys(this.state.recipeRes).length !== 0 &&
      // this.state.recipeRes['hits'].map(hit => {
      //   console.log("hit: ", hit)
      //   console.log("hit['recipe']: ", hit["recipe"])
      // })
    }
  }

  componentWillUnmount() {}

  render() {
    const { classes } = this.props

    console.log("RecipeRecom State: ", this.state)

    return (
      <>
        <Typography variant="h4" gutterBottom>
          Recipe Recommendations
        </Typography>
        <Paper className={clsx(classes.paper, classes.fixedHeight)}>
          <ContentBar
            needToList={true}
            barTitle="Current Items in Fridge"
            mainBtnText="Refresh Current Items"
            refreshAction={this.get_current_items}
          />
          {Object.keys(this.state.currItems).length !== 0 &&
            Object.keys(this.state.currItems).map(k => (
              this.state.currItems[k] === 0
                ? ""
                : (
                  <Typography key={k} color="textSecondary" align="left">
                    {k}: {this.state.currItems[k]}
                  </Typography>
                )
            ))}
        </Paper>

        <Paper className={clsx(classes.paper)}>
          <ContentBar
            needToList={false}
            barTitle="Recommended Recipes"
          />
          <Grid container spacing={3} style={{ marginTop: 10, paddingBottom:50 }}>
            <List>
              {Object.keys(this.state.recipeRes).length !== 0 &&
                this.state.recipeRes['hits'].map(hit => (
                  <div key={hit['recipe'].uri} >
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt={hit['recipe'].label} src={hit['recipe'].image} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={hit['recipe'].label}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              className={classes.inline}
                              color="textPrimary"
                            >
                              Energy
                            </Typography>
                            {`  ${parseInt(hit['recipe'].calories)} kCal`}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </div>
                ))
              }
            </List>
          </Grid>
        </Paper>
      </>
    )
  }
}

export default withStyles(styles)(RecipeRecom)
