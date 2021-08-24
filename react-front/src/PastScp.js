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
            <Accordion.Header>{scp.prompt}</Accordion.Header>
            <Accordion.Body><div dangerouslySetInnerHTML={{__html: scp.text}} /></Accordion.Body>
        </Accordion.Item>
    )


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

        <h2> List of Past SCdddPs</h2>

        <Accordion>
            {listPastScp}
        </Accordion>



        {/*{scps.map((scp, index) => (*/}
        {/*    <div key={index}>*/}
        {/*        <div className={"prompt"}>*/}
        {/*            <h3>scp.prompt</h3>*/}
        {/*        </div>*/}
        {/*        <div className={"text"}>*/}
        {/*            <h3>scp.text</h3>*/}
        {/*        </div>*/}
        {/*    </div>*/}

        {/*))}*/}

    </div>
  )
}

export default PastScp;
