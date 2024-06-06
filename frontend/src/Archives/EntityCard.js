import React, { Component } from 'react';
import * as urls from '../URLs.js';
import '../App.css';
import ls from 'localstorage-slim';
import { useLocation } from 'react-router-dom';

const url_db = urls.URL_DB;

function getSCP(file) {
    let cur_url = url_db + file
    return fetch(cur_url, {
            headers: new Headers({
                'Authorization': 'Basic '+btoa(localStorage.getItem('id') + ':' + localStorage.getItem('mdp')),
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        })
        .then((res) => {return res.text()})
        .then((data) => {return data});
}

class EntityCard extends Component {
    constructor(props) {
        super(props);

        const queryParams = new URLSearchParams(window.location.search);
        const SCP_number = queryParams.get('n');

        this.state = {
            un : "dzni" // list of upvoted ids
        };

        getSCP(SCP_number).then((data) => {
            console.log(data);

            this.setState({
                content : data
            })
        });

    }

    render() {
        const { content } = this.state;
        
        if (!content) {
          return <div>Loading article...</div>; // Render a loading message or spinner
        }

        return (
            <div className='appbody'>

                <div className='entitycard'>
                    <div className="greywrap lastscp-div"> 
                        <div className="scp-article" dangerouslySetInnerHTML={{ __html: content }} />
                    </div>
                </div>
         
            </div>
        )
    }
}

export default EntityCard;