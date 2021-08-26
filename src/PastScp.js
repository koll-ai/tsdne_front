import './App.css';
import {useEffect, useState} from "react";
// import  {pastScps} from './scpData';
import {Accordion} from 'react-bootstrap';



function ListScp(props){
    const listPastScp = props.data.map((scp, index) =>
        <Accordion.Item eventKey={index.toString()}>
            <Accordion.Header><strong>{scp.prompt}</strong></Accordion.Header>
            <Accordion.Body><div dangerouslySetInnerHTML={{__html: scp.text}} /></Accordion.Body>
        </Accordion.Item>
    )

    return listPastScp;
}


function PastScp() {

    // console.log(pastScps);

    const [pastScps, setPastScps] = useState([]);


    useEffect(() => {
    let cur_url = 'http://thisscpdoesnotexist.pythonanywhere.com/past_scps/';
    fetch( cur_url)
        .then((res) => res.json())
        .then((data) => {
            setPastScps(data.scps);
            console.log('in fetch');
            console.log(pastScps);
        })}, []
    );




    console.log("bbbbbbb");
    console.log(pastScps);

    // WARNING, use dangerouslySetInnerHTML, may be unsafe





  return (
    <div className="PastScp">

        <h2> List of Past SCPs</h2>

        <Accordion>
            <ListScp data={pastScps} />
        </Accordion>

    </div>
  )
}

export default PastScp;
