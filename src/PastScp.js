import './App.css';
import React, { Component } from 'react';
import AccordionDyn from './AccordionDyn';
import {Accordion} from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import { readString } from 'react-papaparse'

const scp_url = "https://raw.githubusercontent.com/thisscpdoesnotexist/SCP-GPT_db/master/"

function getScp(file) {
    let cur_url = scp_url + file
    return fetch(cur_url)
        .then((res) => {return res.text()})
        .then((data) => {return data});
}

export default class PastScp extends Component {
    state = {
        activeSections: [],
        collapsed: true,
        multipleSelect: false,
        content: []
    };

    constructor(props) {
        super(props);

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
                this.setState({content});
            })
        }
    }
    
    renderHeader = (section, _, isActive) => {
        return (
            <Accordion.Header>
                <strong>{section.prompt} &nbsp;</strong>
                <Badge bg={section.class === "Keter" ? "danger" : section.class === "Euclid" ? "warning" : "success" }>
                    {section.class}
                </Badge>
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
            scp.push(
                {
                    prompt: list_scp.data[i][0],
                    class: list_scp.data[i][1],
                    url: list_scp.data[i][2],
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