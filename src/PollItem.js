import {Component, useEffect, useState} from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import "./CurrentPoll.css";
import Badge from 'react-bootstrap/Badge';
import ls from 'localstorage-slim';
// import './customStyle.css'




function PoolItem(props) {


    const [time, setTime]   = useState(Date.now() + 3600 * 1000);
    const [raised, setRaised]   = useState(false);
    const [state, setState] = useState({
        n_votes: props.votes,
        hasClicked: ls.get(props.idx) === null ? false : true
    });


    // get next time to know cookie ttl
    useEffect(() => {
        let cur_url = 'https://thisscpdoesnotexist.pythonanywhere.com/next_time/';
        fetch(cur_url)
            .then((res) => res.text())
            .then((data) => {
                setTime(parseInt(data) - Date.now());
            })}, []
);

        ls.set('current_poll_votes');



        function handleClick(n) {
            if (state.hasClicked === false) {
                fetch('https://thisscpdoesnotexist.pythonanywhere.com/vote/?n=' + n.toString() + '&ip=' + Math.floor(Math.random() * 10000).toString());
                setState(state => ({n_votes: state.n_votes + 1, hasClicked: true}));
                ls.set(n, true, {ttl: time});
            }
        }


        return(
              <Grid item xs={12} sm={6} md={3}>
                  <Card className="pollitemparent" onMouseOver={() => setRaised(true)}
                                                   onMouseLeave={() => setRaised(false)}
                                                   raised={raised}>
                      <CardContent className="pollitem">

                          <Badge bg={props.scpClass === "Keter" ? "danger" : props.scpClass === "Euclid" ? "warning" : props.scpClass === "Thaumiel" ? "primary" : "success" }>
                              {/*<Typography className={classes.title} color="textSecondary" gutterBottom>*/}
                                  {props.scpClass}
                              {/*</Typography>*/}
                          </Badge>
                          <br />
                          <br/>
                          <p className={"coucou"}>
                          {props.prompt}
                          </p>

                          <CardActions style={{display: "flex", justifyContent:"space-between"}}>
                            <Button  color="secondary" variant={state.hasClicked ? "contained" : "outlined"} className='upvote_button'  onClick={() => handleClick(props.idx)} >
                                  <strong>Vote &nbsp;</strong> {state.n_votes}
                            </Button>

                            <div style={{color: "grey", fontStyle: "italic"}}>{props.author}</div>
                          </CardActions>
                      </CardContent>
                  </Card>
              </Grid>
          );
    
}

export default PoolItem;