
import {useEffect, useState} from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import "./CurrentPoll.css";
import Badge from 'react-bootstrap/Badge';

import SubmitPromptDialog from './SubmitPromptDialog';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
  },
  title: {
    fontSize: 14,
  },
    Card:{
      marginBottom: "-50%"
    },
    //
    // Keter:{
    //   backgroundColor: "#ffaaa7"
    // },
    // Euclid:{
    //   backgroundColor:"#ffd3b4"
    // },
    // Safe:{
    //   backgroundColor:"#d5ecc2"
    // }



});


function PollItem(props){
    const classes = useStyles();
    let gridclass = classes.root + ' ' + props.scpClass;

    function handleClick(n) {
        fetch('https://thisscpdoesnotexist.pythonanywhere.com/vote/?n=' + n.toString()  + '&ip=' +Math.floor(Math.random() * 100).toString())
    }

    return(
      // <div className="pollItem">
      //     <p>{props.prompt} ({props.scpClass}) <button>Vote ({props.votes})</button></p>
      // </div>

        <Grid item xs={12} sm={6} md={3}>
            <Card className={classes.root}>
                <CardContent>

                    <Badge bg={props.scpClass == "Keter" ? "danger" : props.scpClass == "Euclid" ? "warning" : "success" }>
                        {/*<Typography className={classes.title} color="textSecondary" gutterBottom>*/}
                            {props.scpClass}
                        {/*</Typography>*/}
                    </Badge>
                    <br />
                    <br/>
                    {props.prompt}

                    <CardActions>
                        <Button size="small" onClick={() => handleClick(props.idx)}><strong>Votes !</strong> ({props.votes})</Button>
                    </CardActions>
                </CardContent>
            </Card>
        </Grid>


    );
}

function PollList(props){
    //props : pollingItems : [{prompt : .., votes : ..}, ...]
    // sort by ascending
    
    const sorted = props.pollingItems.sort(((a, b) => b.votes - a.votes));
    
    const items = sorted.map((item, idx) => <PollItem prompt={item.prompt}
                                                           scpClass={item.scpClass}
                                                           votes={item.votes}
                                                           idx={idx}

    />);
    return(
        <div className="poll-list">
            <Grid container spacing={3}>
                {items}
            </Grid>
        </div>
    )
}





function CurrentPoll() {

    const [pollingItems, setPollingItems] = useState([])

    useEffect(() => {
        let cur_url = 'https://thisscpdoesnotexist.pythonanywhere.com/get_poll/';
        fetch( cur_url)
            .then((res) => res.json())
            .then((data) => {
                setPollingItems(data.poll);
            })}, []
    );




  return (
    <div className="CurrentPoll">

        <strong>Current Poll :</strong>
        <br/>
        <br/>

        <PollList pollingItems={pollingItems}/>
        <br/>
        <br/>
        <SubmitPromptDialog className="openDialogBtn" />

    </div>
  );
}

export default CurrentPoll;
