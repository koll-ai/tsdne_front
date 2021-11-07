import './App.css';
import CurrentPoll from './CurrentPoll.js'
import PastScp from './PastScp.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./customStyle.css"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./About";
import ButtonAppBar from "./ButtonAppBar/ButtonAppBar";

function App() {
  return (  
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
  )
}

export default App;
