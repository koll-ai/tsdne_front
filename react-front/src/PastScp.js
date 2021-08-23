import './App.css';
import {useEffect, useState} from "react";

function PastScp() {


    const [scps, setScps] = useState(null);

    useEffect(() => {
    getData();


    // we will use async/await to fetch this data
    function getData() {
      const response = fetch("http://localhost:5000/all_scp/")
          .then(response => {
              if (response.ok()) {
                  console.log("ok");
                  return response.json();
              }
          })
          .then(data => {
              setScps(data);
          })
    

    }
  }, []); // <- you may need to put the setBooks function in this array

    console.log(scps)

  return (
    <div className="PastScp">

        <h2> List of Past SCPs</h2>



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
