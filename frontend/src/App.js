import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import {  Route, Switch } from "react-router-dom";
import ButtonAppBar from "./ButtonAppBar/ButtonAppBar";
import AlertTemplate from 'react-alert-template-basic'
import CurrentPoll from './Poll/CurrentPoll.js'
import SCPArchive from './Archives/SCPArchive.js'
import EntityCard from './Archives/EntityCard.js'
import ArchiveRedirect from './Archives/ArchiveRedirect.js'
import About from "./About/About.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Archive } from 'react-bootstrap-icons';


const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
}

function App() {

  return (
      // <MatomoProvider value={instance}>
        <AlertProvider template={AlertTemplate} {...options}>

          <div className="App">
          {/*<Router history={piwik.connectToHistory(history)}>*/}
            <Router>
              <ButtonAppBar />
            <div className="container">
              <br/>
              <Switch>
                <Route path="/" exact component={ CurrentPoll} />
                <Route path="/entity" exact component={ EntityCard } />
                <Route path="/archive" exact component={ SCPArchive } />
                <Route path="/list" exact component={ ArchiveRedirect } />
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
