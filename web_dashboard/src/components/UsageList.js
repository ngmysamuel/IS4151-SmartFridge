import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TimelineIcon from "@material-ui/icons/Timeline"


const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(0, 2, 2),
  },
}));


export default function UsageList(props) {
  const classes = useStyles();

  const {
    doorDuration,
    doorTimes,
    totalHour,
  } = props

  console.log("UsageList props: ", props)

  const totalEnergy = parseFloat(doorDuration + 130 * totalHour).toFixed(2)

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className={classes.title}>
            Usage and Energy Statistics:
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <TimelineIcon />
              </ListItemIcon>
              <ListItemText
                primary="Number of Times Fridge Accessed:"
                secondary={`${doorTimes} times`}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <TimelineIcon />
              </ListItemIcon>
              <ListItemText
                primary="Duration of Fridge Left Open:"
                secondary={`${doorDuration} seconds`}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <TimelineIcon />
              </ListItemIcon>
              <ListItemText
                primary="Total Energy Consuption:"
                secondary={`
                ${parseFloat(totalHour).toFixed(2)} * Normal Wattage (130 Watts/hour)
                +
                ${doorDuration} * Open-state Wattage (1 Watt/second) = ${totalEnergy} Watts`}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </>
  );
}
