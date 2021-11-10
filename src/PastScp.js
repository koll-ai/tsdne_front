import './App.css';
import React, { Component } from 'react';
import AccordionDyn from './AccordionDyn';
import {Accordion} from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import { readString } from 'react-papaparse'
import Button from '@material-ui/core/Button';
import { SuitHeart, SuitHeartFill } from 'react-bootstrap-icons';

const scp_url = "https://raw.githubusercontent.com/thisscpdoesnotexist/SCP-GPT_db/master/"

function getScp(file) {
    let cur_url = scp_url + file
    return fetch(cur_url)
        .then((res) => {return res.text()})
        .then((data) => {return data});
}

class PastScp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeSections: [],
            collapsed: true,
            multipleSelect: false,
            content: [],
            upvoted : []
        };

        this.getAccodionHeader().then((data) => {
            this.setState({
                content : data
            })
        });
    }

    setSections = (sections) => {
        const {content} = this.state
        this.loadContent(content, sections)
        this.setState({
          activeSections: sections.includes(undefined) ? [] : sections,
        });
    };

    loadContent = (content, sections) => {
        for(var i = 0; i < sections.length; i++) {
            var j = sections[i];
            getScp(content[j].url).then((data) => {
                content[j].desc = data;
                this.setState({
                    content : content
                });
            })
        }
    }
    
    handleClick = (e, id) => {
        e.stopPropagation();

        if(this.state.upvoted.includes(id)) {
            this.setState(state => ({ upvoted: state.upvoted.filter(function(e) { return e !== id })}));
        } else {
            fetch('https://thisscpdoesnotexist.pythonanywhere.com/vote/?id=' + id  + '&ip=' + Math.floor(Math.random() * 10000).toString());
            this.setState(state => ({ upvoted: state.upvoted.concat(id)}));
        }
    }

    renderHeader = (section, _, isActive) => {
        return (
            <Accordion.Header>
                <table style={{width : '100%'}}>
                    <tr>
                        <td style={{width:70, textAlign:'center'}}>
                            <Badge bg={section.class === "Keter" ? "danger" : section.class === "Euclid" ? "warning" : "success" }>
                                {section.class}
                            </Badge>
                        </td>

                        <td style={{paddingLeft : 5, paddingRight : 5}}>
                            <strong>{section.prompt}</strong>
                            &nbsp;
                            <span  style={{color : 'red'}}>
                                {section.nsfw == "true" ? "NSFW" : ""}
                            </span>
                        </td>

                        <td style={{textAlign : 'right'}}>
                            <Button size="small" style={{backgroundColor:'lightgrey'}} onClick={(e) => this.handleClick(e, section.id)}>
                                {this.state.upvoted.includes(section.id) ? <SuitHeartFill color="#fc4257"/> : <SuitHeart/>}                    
                                &nbsp; {section.n_upvotes}
                            </Button>

                        </td>
                    </tr>
                </table>
            </Accordion.Header>
        );
    };

    renderContent(section, _, isActive) {
        return (
            <Accordion.Item>
                <div style={{padding: '1.5em'}} dangerouslySetInnerHTML={{__html: section.desc}}/>
            </Accordion.Item>
        );
    }

    async getAccodionHeader() {
        let str = await getScp("scp_list.csv");
        let list_scp = readString(str);

        if(list_scp.data[list_scp.data.length - 1].length !== 3){
            list_scp.data.pop();
        }

        let scp = [];
        for(var i = 0; i < list_scp.data.length; i++) {
            let scpid = list_scp.data[i][0]
            scp.push(
                {
                    id: scpid,
                    prompt: "SCP-" + scpid + " is " + list_scp.data[i][1],
                    class: list_scp.data[i][2],
                    url: list_scp.data[i][3],
                    nsfw: list_scp.data[i][4],
                    n_upvotes: 0,
                    desc: 'Loading SCP...'
                }
            );
        }

        return scp;
    }

    render() {
        return (
            <div className="ListOfSCPs">
                <h2> List of Past SCPs</h2>

                <br></br>

                <AccordionDyn
                    activeSections={this.state.activeSections}
                    sections={this.state.content}
                    expandMultiple={this.multipleSelect}
                    renderHeader={this.renderHeader}
                    renderContent={this.renderContent}
                    onChange={this.setSections.bind(this)}
                    renderAsFlatList={false}
                />
            </div>
        );
    }
}

export default PastScp;