import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import {  Route, Switch } from "react-router-dom";
import ButtonAppBar from "./ButtonAppBar/ButtonAppBar";
import AlertTemplate from 'react-alert-template-basic'
import CurrentPoll from './Poll/CurrentPoll.js'
import PastScp from './Archives/PastScp.js'
import About from "./About/About.js";
import IndependantScp from "./Archives/IndependantScp";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// import { Router } from "react-router-dom";
import history from "./history";

import ReactPiwik from 'react-piwik';

// const PiwikReactRouter = require('piwik-react-router');
//
// const piwik = PiwikReactRouter({
//     url: 'api.thisscpdoesnotexist.ml',
//     siteId: 1
// });


const piwik = new ReactPiwik({
  url: 'api.thisscpdoesnotexist.ml',
  siteId: 1,
});

const trackAtConnect = false;



const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

function App() {
  return (
        <AlertProvider template={AlertTemplate} {...options}>

          <div className="App">
          <Router history={piwik.connectToHistory(history)}>
            <ButtonAppBar />
            <div className="appbody">
              <br/>
              <Switch>
                <Route path="/" exact component={ CurrentPoll} />
                <Route path="/list" exact component={ PastScp } />
                <Route path="/list/:id" exact component={ IndependantScp } />
                <Route path="/about" exact component={ About } />
                {/* Fix for 404 on refresh */}
                {/*<Route path="/*" exact component={ CurrentPoll } />*/}
              </Switch>
            </div>
          </Router>
        </div>
        </AlertProvider>
  )
}

export default App;
