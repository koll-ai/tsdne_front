import './App.css';
import CurrentPoll from './CurrentPoll.js'
import PastScp from './PastScp.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./customStyle.css"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./About";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import ButtonAppBar from "./ButtonAppBar/ButtonAppBar";

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
          <Router>
            <ButtonAppBar />
            <div className="appbody">
              <br/>
              <Switch>
                <Route path="/" exact component={ CurrentPoll} />
                <Route path="/list" exact component={ PastScp } />
                <Route path="/about" exact component={ About } />
                {/* Fix for 404 on refresh */}
                <Route path="/*" exact component={ CurrentPoll } />
              </Switch>
            </div>
          </Router>
        </div>
        </AlertProvider>
  )
}

export default App;
