
import {useState} from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

function UserForm(props){
    // Champ de texte qui commencera toujours par la valeur de son prop starting_value
    const [value, setValue] = useState(props.starting_value);
    return  <input type="text" name="user_prompt" value={value}

        onChange={event => {
            if (event.target.value.startsWith(props.starting_value)){
                setValue(event.target.value);
            }
        }}
    />;
}

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



});


function PollItem(props){
    const classes = useStyles();

    return(
      // <div className="pollItem">
      //     <p>{props.prompt} ({props.scpClass}) <button>Vote ({props.votes})</button></p>
      // </div>

        <Grid item xs={3}>
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {props.scpClass}
                    </Typography>
                    {props.prompt}
                    <CardActions>
                        <Button size="small"><strong>Votes !</strong> ({props.votes})</Button>
                    </CardActions>
                </CardContent>
            </Card>
        </Grid>


    );
}

function PollList(props){
    //props : pollingItems : [{prompt : .., votes : ..}, ...]
    // Should already be sorted by votes ascending
    const items = props.pollingItems.map(item => <PollItem prompt={item.prompt}
                                                           scpClass={item.scpClass}
                                                           votes={item.votes}

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
    const pollingItems = [
        {
            prompt : "SCP 202-GPT is a pink pig being the best Minecraft player",
            scpClass : "Keter",
            votes  : 54
        },
        {
            prompt : "SCP 202-GPT is a black panther that fight for racial justice",
            scpClass : 'Euclid',
            votes  : 24
        },
        {
            prompt : "SCP 202-GPT is a pink burger that can turn people vegan",
            scpClass: 'Safe',
            votes  : 12
        }
    ];
  return (
    <div className="CurrentPoll">

        <strong>Current Poll :</strong>
        <PollList pollingItems={pollingItems}/>

        <UserForm starting_value="This SCP is a "/>

    </div>
  );
}

export default CurrentPoll;
