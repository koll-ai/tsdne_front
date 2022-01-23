import SubmitPromptDialog from './SubmitPromptDialog.js';
import {useEffect, useState} from "react";
import Grid from '@material-ui/core/Grid';
import PollItem from './PollItem.js';
import * as urls from '../URLs.js';
import ls from 'localstorage-slim';

import "../App.css";
import {Link} from "react-router-dom";

const url_api = urls.URL_API;

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
        <div className="poll-list/">
            <Grid container spacing={3}>
                {items}
            </Grid>
        </div>
    )
}

function LastSCP() {
    const [lastSCP, setLastSCP] = useState("");

    useEffect(() => {
        fetch(url_api + "last_scp_desc/", {
            headers: new Headers({
                'Authorization': 'Basic '+btoa(localStorage.getItem('id') + ':' + localStorage.getItem('mdp')),
                'Content-Type': 'application/x-www-form-urlencoded'

            })
        })
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
        let cur_url = url_api + 'get_poll/';
        fetch(cur_url)
            .then((res) => res.json())
            .then((data) => {
                setPollingItems(data.poll);
            })

        fetch(url_api + "current_scp_number/")
            .then((res) => res.json())
            .then((data) =>{
                setCurscp(data);
                ls.set('current_scp_number', data);
            })

    }, [needupdate]);

    return (
    <div>

        <div className="greywrap">
            <p className="justifytext">
                <h2> What is this website ? </h2>
                This website uses artifical intelligence to generate customs SCP from a simple prompt.
                Every hour the prompt with the most votes is chosen to create a new SCP. Previous SCPs can be found in the <a href="./list"> archives</a>.
                You can vote for your favorite SCP or submit your own description on the poll below. <b>We now have a community <a href="https://discord.gg/WeXkUP6f5H">discord server</a> !</b>

                <br/><br/>
                If you're still  lost please check out our <a href="./about">FAQ</a>.
            </p>
        </div>

        <br/>

        <div className="greywrap">
            <div className="justifytext">
                <h2>Current Poll :</h2>
            </div>
            <br/>
            <PollList pollingItems={pollingItems} />
            <br/>
            <SubmitPromptDialog className="openDialogBtn" curscp ={curscp} needupdate={setNeedUpdate} />
        </div>
        
        <br/>

        <div className="greywrap">
            <div className="justifytext">
                <h2>Last SCP :</h2>
            </div>

            <br/><br/>

            <LastSCP className="scpcont"/>
        </div>
    </div>
  );
}

export default CurrentPoll;
