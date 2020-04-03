import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// overview icon
import DashboardIcon from '@material-ui/icons/Dashboard';
// fridge items icon
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// fridge condition icon
import AcUnitIcon from '@material-ui/icons/AcUnit';
// fridge usage icon
import TimelineIcon from '@material-ui/icons/Timeline';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
}));

const mainListItems = (
  <List>
    <ListItem
      button
      component={Link}
      to="/"
    >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Overview" />
    </ListItem>

    <ListItem
      button
      component={Link}
      to="/fridge-items"
    >
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Fridge Items" />
    </ListItem>

    <ListItem
      button
      component={Link}
      to="/fridge-condition"
    >
      <ListItemIcon>
        <AcUnitIcon />
      </ListItemIcon>
      <ListItemText primary="Fridge Condition" />
    </ListItem>

    <ListItem
      button
      component={Link}
      to="/fridge-usage"
    >
      <ListItemIcon>
        <TimelineIcon />
      </ListItemIcon>
      <ListItemText primary="Fridge Usage" />
    </ListItem>
  </List>
)

export default function Header() {
  const classes = useStyles();
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbarIcon}>
        IS4151
      </div>
      <Divider />
      {mainListItems}
    </Drawer>
  );
}
