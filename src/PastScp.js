import './App.css';
import {useEffect, useState} from "react";
import  {pastScps} from './scpData';
import {Accordion} from 'react-bootstrap';

function PastScp() {

    console.log(pastScps);

    const [scps, setScps] = useState(null);


    // WARNING, use dangerouslySetInnerHTML, may be unsafe

    const listPastScp = pastScps.map((scp, index) =>
            <Accordion.Item eventKey={index.toString()}>
                <Accordion.Header><strong>{scp.prompt}</strong></Accordion.Header>
                <Accordion.Body><div dangerouslySetInnerHTML={{__html: scp.text}} /></Accordion.Body>
            </Accordion.Item>
    );
console.log('aaaaaaaaaaa');
console.log(listPastScp);



    // useEffect(() => {
    // getData();
    // we will use async/await to fetch this data
  //   function getData() {
  //     const response = fetch("http://localhost:5000/all_scp/")
  //         .then(response => {
  //             if (response.ok()) {
  //                 console.log("ok");
  //                 return response.json();
  //             }
  //         })
  //         .then(data => {
  //             setScps(data);
  //         })
  //
  //
  //   }
  // }, []); // <- you may need to put the setBooks function in this array
    // console.log(scps)

  return (
    <div className="PastScp">

        <h2> List of Past SCPs</h2>

        <Accordion>
            {listPastScp}
        </Accordion>

    </div>
  )
}

export default PastScp;
