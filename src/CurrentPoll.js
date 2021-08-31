
import {useEffect, useState} from "react";
import Grid from '@material-ui/core/Grid';
import "./CurrentPoll.css";
import PollItem from './PollItem.js'

import SubmitPromptDialog from './SubmitPromptDialog';

function PollList(props){
    const sorted = props.pollingItems.sort(((a, b) => b.votes - a.votes));    
    
    const items = sorted.map((item) => <PollItem prompt={item.prompt}
                                                           scpClass={item.scpClass}
                                                           votes={item.votes}
                                                           idx={item.index}

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
