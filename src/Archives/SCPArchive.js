import React, { Component } from 'react';
import { SuitHeart, SuitHeartFill } from 'react-bootstrap-icons';
import { readString } from 'react-papaparse'
import Button from '@material-ui/core/Button';
import Badge from 'react-bootstrap/Badge';
import * as urls from '../URLs.js';
import '../App.css';
import ls from 'localstorage-slim';

const url_db = urls.URL_DB;
const url_api = urls.URL_API;
const upvotes_url = urls.URL_API + "get_upvotes/"


function getScpList(){
    let cur_url = url_api + 'get_past_list/'
    return fetch(cur_url, {
            headers: new Headers({
                'Authorization': 'Basic '+btoa(localStorage.getItem('id') + ':' + localStorage.getItem('mdp')),
                'Content-Type': 'application/x-www-form-urlencoded'

            })
        })
        .then((res) => {return res.text()})
        .then((data) => {return data});
}


function get_or_set_upvoted_cookie(){
    let upvoted = ls.get('archive_upvoted');
    console.log(upvoted);
    if (upvoted === null){
        upvoted = [];
        ls.set('archive_upvoted', upvoted);
    }
    return upvoted;
}


class SCPArchive extends Component {
    constructor(props) {
        super(props);

        this.state = {
            upvoted : get_or_set_upvoted_cookie() // list of upvoted ids
        };

        this.getSCPinfo().then((data) => {
            this.setState({
                content : data
            })
        });
    }
    
    handleClick = (e, id) => {
        e.stopPropagation();

        if(this.state.upvoted.includes(id)) {
            this.setState(state => ({ upvoted: state.upvoted.filter(function(e) { return e !== id })}));
        } else {
            fetch(url_api + 'upvote/?id=' + id  )
                .then(() => {
                    this.setState(state => ({upvoted: state.upvoted.concat(id)}));
                    ls.set('archive_upvoted', this.state.upvoted);
                });
        }

    }

    async getSCPinfo() {
        let str = await getScpList();
        let list_scp = readString(str);

        let upvotes_count = await fetch(upvotes_url).then((res) => {return res.json()});

        if(list_scp.data[list_scp.data.length - 1].length !== 3){
            list_scp.data.pop();
        }

        let scp = [];
        for(var i = list_scp.data.length - 1; i >= 0; i--) {
            scp.push(
                {
                    id: list_scp.data[i][0],
                    prompt: list_scp.data[i][1],
                    class: list_scp.data[i][2],
                    url: list_scp.data[i][3],
                    nsfw: list_scp.data[i][4],
                    n_upvotes: (list_scp.data[i][0] in upvotes_count) ? upvotes_count[list_scp.data[i][0]]['n_upvotes'] : 0,
                }
            );
        }

        return scp;
    }

    render() {
        const { content } = this.state;
        
        if (!content) {
          return <center className='white'><h1>Loading...</h1></center>; // Render a loading message or spinner
        }

        return (
          <div className='scparchives'>
            {
              content.map((item, index) => (
                  
                  <div className='archive-item'>
                    <div className='info'>
                        <Badge bg={item.class === "Keter" ? "danger" : item.class === "Euclid" ? "warning" : "success" }>
                            {item.class}
                        </Badge>
                        
                        <Button size="small" onClick={(e) => this.handleClick(e, item.id)}>
                            {this.state.upvoted.includes(item.id) ? <SuitHeartFill color="#fc4257"/> : <SuitHeart/>}                    
                            &nbsp; {item.n_upvotes}
                        </Button>
                    </div>
                        <a href={`entity?n=${item.id}`}>
                        <p>
                            <strong> SCP-{item.id} is {item.prompt}</strong>
                            <div style={{color: 'red'}}>
                                {item.nsfw === "true" ? <span>NSFW</span> : null}
                            </div>
                        </p>
                    </a>
                </div>
              ))
            }
          </div>
        );
      }
}

export default SCPArchive;
