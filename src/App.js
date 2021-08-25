import './App.css';
import CurrentPoll from './CurrentPoll.js'
import PastScp from './PastScp.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./customStyle.css"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./Navigation";
import About from "./About";
import Footer from "./Footer";
import ButtonAppBar from "./ButtonAppBar";

function App() {
  return (
    // <div className="App">
    //
    //   <CurrentPoll />
    //     <PastScp/>
    //
    // </div>

      <div className="App">
      <Router>
        <ButtonAppBar />
        <br/>
        <Switch>
          <Route path="/" exact component={ CurrentPoll} />
          <Route path="/list" exact component={ PastScp } />
          <Route path="/about" exact component={ About } />
        </Switch>
        <Footer/>
      </Router>
    </div>
  )
}

export default App;
