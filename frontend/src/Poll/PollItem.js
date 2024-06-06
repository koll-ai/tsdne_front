import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Badge from 'react-bootstrap/Badge';
import {useState} from "react";
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import ls from 'localstorage-slim';

import * as urls from '../URLs.js';
import '../App.css';

const url_api = urls.URL_API;

function item_voted(idx) {
    var n = ls.get('current_scp_number');
    var votes = ls.get(n);

    //returns true is idx is in votes
    if (votes === null) {
        return false;
    } else {
        for (let i = 0; i < votes.length; i++) {
            if (parseInt(votes[i]) === parseInt(idx)) {
                return true;
            }
        }
        return false;
    }
}

function PoolItem(props) {
    const [raised, setRaised]   = useState(false);
    
    const [state, setState] = useState({
        n_votes: props.votes,
        hasClicked: item_voted(props.idx)
    });

    function handleClick(idx) {
        if (state.hasClicked === undefined || state.hasClicked === false) {
            fetch(url_api + 'vote/?n=' + idx.toString());
            setState(state => ({n_votes: state.n_votes + 1, hasClicked: true}));
            
            var scp_num = ls.get('current_scp_number');
            var vote_list = []
            var vote_cookie = ls.get(scp_num);
            if(vote_cookie != null) {
                vote_list = vote_cookie
            }

            if(vote_list.indexOf(idx) === -1) {
                vote_list.push(idx)
            }

            ls.set(scp_num, vote_list, {ttl: 3600});
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

                        <br/><br/>

                        <p>
                        {props.prompt}
                        </p>

                        <CardActions style={{display: "flex", justifyContent:"space-between"}}>
                        <Button  color="secondary" variant={state.hasClicked ? "contained" : "outlined"} className='upvote_button'  onClick={() => handleClick(props.idx)} >
                                <strong>Vote&nbsp;</strong>{state.n_votes}
                        </Button>

                        <div style={{color: "grey", fontStyle: "italic"}}>{props.author}</div>
                        </CardActions>
                    </CardContent>
                </Card>
            </Grid>
        );
    
}

export default PoolItem;