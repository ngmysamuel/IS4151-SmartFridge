import React from "react"
import { Link } from "react-router-dom"

import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Title from "./Title"


const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
})

export default function UsageOverview({ doorDuration }) {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Title>Recent Usage</Title>
      <Typography component="p" variant="h4">
        {doorDuration} seconds
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        fridge door open in the past one hour
      </Typography>
      <div>
        <Button
          color="primary"
          component={Link}
          to={`/fridge-usage`}
        >
          Go to Usage Page
        </Button>
      </div>
    </React.Fragment>
  )
}
