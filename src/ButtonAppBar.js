import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Countdown from "react-countdown";

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


    const [time, setTime] = useState(0);

    useEffect(() => {
        let cur_url = 'https://thisscpdoesnotexist.pythonanywhere.com/next_time/';
        fetch( cur_url)
            .then((res) => res.text())
            .then((data) => {
                setTime(parseInt(data));
            })}, []
    );


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
                          This SCP Does Not Exist
                      </Typography>
                  </Button>
                </Grid>
                
                <Grid item sm={5}>
                    <h1><Countdown date={new Date(time)} /></h1>
                </Grid>
                
                <Grid item xs={12}  sm={1}>
                    <Link to={'/'}>
                          <Button color="inherit">
                              {/*<Typography variant="h6" className={classes.title}>*/}
                              <strong>Poll</strong>
                              {/*</Typography>*/}
                          </Button>
                        </Link>
                </Grid>

                <Grid item xs={12} sm={1}>
                    <Link to={'/list'}>

                  <Button color="inherit">
                      {/*<Typography variant="h6" className={classes.title}>*/}
                      <strong>Archives</strong>
                      {/*</Typography>*/}
                  </Button>
                    </Link>
                </Grid>
                <Grid item xs={12}  sm={1}>
                <Link to={'/about'}>
                  <Button color="inherit">
                      {/*<Typography variant="h6" className={classes.title}>*/}
                      <strong>About</strong>
                      {/*</Typography>*/}
                  </Button>
                </Link>
                </Grid>
            </Grid>

        </Toolbar>
      </AppBar>
    </div>
  );
}