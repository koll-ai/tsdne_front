import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Countdown from "react-countdown";
import logo from './favicon.ico'

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


function MyCoundown(props){
    return (
      <h2>
        <h1 ><Countdown date={props.time  } key={"MyTimer"} daysInHours={true}/></h1>
      </h2>
    )
}

export default function ButtonAppBar() {
    const [time, setTime] = useState(Date.now() + 3600 * 1000);

    useEffect(() => {
        let cur_url = 'https://thisscpdoesnotexist.pythonanywhere.com/next_time/';
        fetch(cur_url)
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
            <Grid container spacing={1} style={{display: "flex", alignItems: "center"}}>

                <Grid item xs={12} sm={4} >
                  <a href="/">
                    <img src={logo}/>
                    <Button color="inherit">
                      <Typography variant="h6" className={classes.title}>
                          This SCP Does Not Exist
                      </Typography>
                    </Button>
                  </a>
                </Grid>
                
                <Grid item xs={12} sm={4} >
                    {/*<h1><CountDown epoch={parseInt(time)}/> </h1>*/}
                    <MyCoundown time ={time}/>
                </Grid>
                <Grid item xs={0}  sm={1} > </Grid>
                <Grid item xs={12}  sm={1} >
                    <Link to={'/'}>
                          <Button color="inherit">
                              {/*<Typography variant="h6" className={classes.title}>*/}
                              <strong >Poll</strong>
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