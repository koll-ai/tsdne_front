import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import React, {useEffect, useState} from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import Countdown from "react-countdown";
import {Link} from "react-router-dom";
import * as urls from '../URLs.js';
import logo from './favicon.ico';

import "./ButtonAppBar.css"

const url_api = urls.URL_API;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    backgroundColor: "black"
  },
  title: {
    flexGrow: 1,
    fontFamily: "BauhausDemi"
  },
}));


function MyCoundown(props){
    return (
      <div>
        <h1><Countdown date={props.time} key={"MyTimer"} daysInHours={true}/></h1>
      </div>
    )
}

export default function ButtonAppBar() {
    const [time, setTime] = useState(Date.now() + 3600 * 1000);

    useEffect(() => {
        let cur_url = url_api + 'next_time/';
        fetch(cur_url)
            .then((res) => res.text())
            .then((data) => {
                setTime(parseInt(data));
            })}, []
    );

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className="appBar" position="fixe">
        <Toolbar>
            <Grid container spacing={1} style={{display: "flex", alignItems: "center"}}>

                <Grid item xs={12} sm={4} >
                    <img src={logo} alt="website logo"/>
                    <Button color="inherit">
                      <Typography variant="h6" className={classes.title}>
                          This SCP Does Not Exist
                      </Typography>
                  </Button>

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