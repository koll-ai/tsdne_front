
import React, {Component, useEffect, useState} from 'react';

import * as urls from '../URLs.js';

import '../App.css';
import {
  useParams
} from "react-router-dom";

const url_db = urls.URL_DB;
const url_api = urls.URL_API;


function IndependantScp(props){
    const [SCPdata, setSCPdata] = useState("");
    const {id} = useParams();
    let cur_url = url_db + id;

    useEffect(() => {
        fetch(cur_url, {
            headers: new Headers({
                'Authorization': 'Basic '+btoa(localStorage.getItem('id') + ':' + localStorage.getItem('mdp')),
                'Content-Type': 'application/x-www-form-urlencoded'

            })
        })
            .then((res) => res.text())
            .then((data) =>{
                setSCPdata(data);
            })
    }, []);

    return (
        <div dangerouslySetInnerHTML={{__html: SCPdata}} className="scpcont"/>
    );


}

export default IndependantScp