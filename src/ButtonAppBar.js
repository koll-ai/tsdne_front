import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/*<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">*/}
          {/*  <MenuIcon />*/}
          {/*</IconButton>*/}

            <Grid container spacing={3}>

                <Grid item xs={12} sm={3}>

                    <Button color="inherit">
                      <Typography variant="h5" className={classes.title}>
                          This SCP Does Not Exist !
                      </Typography>
                  </Button>
                </Grid>
                
                <Grid item sm={5}></Grid>
                
                <Grid item xs={12}  sm={1}>

                  <Button href={'/'} color="inherit">
                      {/*<Typography variant="h6" className={classes.title}>*/}
                      <strong>Poll</strong>
                      {/*</Typography>*/}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={1}>

                  <Button href={'/list'} color="inherit">
                      {/*<Typography variant="h6" className={classes.title}>*/}
                      <strong>Past SCPs</strong>
                      {/*</Typography>*/}
                  </Button>
                </Grid>
                <Grid item xs={12}  sm={1}>

                  <Button href={'/about'} color="inherit">
                      {/*<Typography variant="h6" className={classes.title}>*/}
                      <strong>About</strong>
                      {/*</Typography>*/}
                  </Button>
                </Grid>
            </Grid>

        </Toolbar>
      </AppBar>
    </div>
  );
}