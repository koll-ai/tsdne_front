
import {useEffect, useState} from "react";
import Grid from '@material-ui/core/Grid';
import "./CurrentPoll.css";
import PollItem from './PollItem.js';
import {Accordion} from 'react-bootstrap';

import SubmitPromptDialog from './SubmitPromptDialog';

function PollList(props){
    const sorted = props.pollingItems.sort(((a, b) => b.votes - a.votes));    
    
    const items = sorted.map((item) => <PollItem
                                    prompt={item.prompt}
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
    <div>

        <div className="presentation">
            <h2> What is this website ? </h2>
            <p>
                This website uses artifical intelligence to generate customs SCP from a simple prompt.
                Every hour the prompt with the most votes is chosen to create a new SCP. Previous SCPs can be found in the <a href="./list"> archives</a>.
                You can vote for your favorite SCP or submit your own description on the poll <a href="./poll"> here</a>.

                <br/>
                If you're still  lost please check out our <a href="./about">FAQ</a>.
            </p>
        </div>

        <br></br>

        <h3><b>Current Poll :</b></h3>
        <div className="pollwrapper">
            <br/>
            <PollList pollingItems={pollingItems} />
            <br/>
            <SubmitPromptDialog className="openDialogBtn" curscp ={curscp} needupdate={setNeedUpdate}/>
        </div>
        <br/><br/>

        <h3><b>Last SCP :</b></h3>
            <Accordion.Item className="scpcont">
                <Accordion.Body>
                    <LastSCP/>
                </Accordion.Body>
            </Accordion.Item>
    </div>
  );
}

export default CurrentPoll;
