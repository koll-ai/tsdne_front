import './App.css';
import {useEffect, useState} from "react";
// import  {pastScps} from './scpData';
import {Accordion} from 'react-bootstrap';
import { readString } from 'react-papaparse';
import Badge from 'react-bootstrap/Badge';

let scp_url = "https://raw.githubusercontent.com/thisscpdoesnotexist/thisscpdoesnotexist.github.io/main/raw_scp/"

function getScp(file) {
    let cur_url = scp_url + file
    return fetch(cur_url)
        .then((res) => {return res.text()})
        .then((data) => {return data});
}

function ListScp2(scpList){
    if(scpList.data === undefined){
        return "Loading...";
    }

    console.log(scpList.data);

    const listPastScp = scpList.data.map((scp, index) =>
        <Accordion.Item eventKey={index.toString()}>
            <Accordion.Header>
                <strong>{scp.prompt} &nbsp;</strong>
                <Badge bg={scp.class === "Keter" ? "danger" : scp.class === "Euclid" ? "warning" : "success" }>
                    {scp.class}
                </Badge>
                </Accordion.Header>
            <Accordion.Body>
                {scp.desc}
            </Accordion.Body>
        </Accordion.Item>
    )

    return listPastScp;
}

function ReadRawGithub() {
    const [scp_list, setScpList] = useState([]);

    useEffect(async function fun() {
        let str = await getScp("scp_list.csv");
        let list_scp = readString(str);

        if(list_scp.data[list_scp.data.length - 1].length != 3){
            list_scp.data.pop();
        }

        let scp = [];
        for(var i = 0; i < list_scp.data.length; i++) {
            scp.push(
                {
                    prompt: list_scp.data[i][0],
                    class: list_scp.data[i][1],
                    desc: await(getScp(list_scp.data[i][2]))
                }
            );
        }

        console.log("there it is");
        console.log(scp);

        setScpList(scp);
    }, []);

    return (
        <div className="ReadRawGithub">

            <h2> List of Past SCPs</h2>

            <Accordion>
                <ListScp2 data={scp_list} />
            </Accordion>

        </div>
    )
}

export default ReadRawGithub;
