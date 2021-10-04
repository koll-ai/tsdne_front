
import {useEffect, useState} from "react";
import Grid from '@material-ui/core/Grid';
import "./CurrentPoll.css";
import PollItem from './PollItem.js'
import {Accordion} from 'react-bootstrap';

import SubmitPromptDialog from './SubmitPromptDialog';

function PollList(props){
    const sorted = props.pollingItems.sort(((a, b) => b.votes - a.votes));    
    
    const items = sorted.map((item) => <PollItem prompt={item.prompt}
                                    scpClass={item.scpClass}
                                    votes={item.votes}
                                    idx={item.index}
                                    author={(item.author !== undefined) ? item.author : 'Dr. [REDACTED]'}
    />);

    return(
        <div className="poll-list">
            <Grid container spacing={3}>
                {items}
            </Grid>
        </div>
    )
}

function LastSCP() {
    const [lastSCP, setLastSCP] = useState("");

    useEffect(() => {
        fetch("https://thisscpdoesnotexist.pythonanywhere.com/last_scp_desc/")
            .then((res) => res.text())
            .then((data) =>{
                setLastSCP(data);
            })
    }, []);

    return (
        <div dangerouslySetInnerHTML={{__html: lastSCP}}/>
    );
}

function CurrentPoll() {

    const [pollingItems, setPollingItems] = useState([]);
    const [curscp, setCurscp] = useState("");

    const [needupdate, setNeedUpdate] = useState(0);

    useEffect(() => {
        let cur_url = 'https://thisscpdoesnotexist.pythonanywhere.com/get_poll/';
        fetch(cur_url)
            .then((res) => res.json())
            .then((data) => {
                setPollingItems(data.poll);
            })

        fetch("https://thisscpdoesnotexist.pythonanywhere.com/current_scp_number/")
            .then((res) => res.json())
            .then((data) =>{
                setCurscp(data);
            })

    }, [needupdate]);

    return (
    <div className="CurrentPoll">
        <strong>Current Poll :</strong>
        <br/>
        <br/>

        <PollList pollingItems={pollingItems}/>
        <br/>
        <br/>
        <SubmitPromptDialog className="openDialogBtn" curscp ={curscp} needupdate={setNeedUpdate}/>
        <br/>
        <br/>

        <strong>Last SCP :</strong>
        <br/>
        <br/>
        <Accordion.Item>
            <Accordion.Body>
                <LastSCP/>
            </Accordion.Body>
        </Accordion.Item>
    </div>
  );
}

export default CurrentPoll;
