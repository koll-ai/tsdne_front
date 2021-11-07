import {Component} from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import "./CurrentPoll.css";
import Badge from 'react-bootstrap/Badge';

class PoolItem extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            n_votes: props.votes,
            hasClicked: false
        };
    }      

    handleClick(n) {
        fetch('https://thisscpdoesnotexist.pythonanywhere.com/vote/?n=' + n.toString()  + '&ip=' + Math.floor(Math.random() * 10000).toString());
        this.setState(state => ({ n_votes: state.n_votes + 1, hasClicked: true}));
    }

    render() {
        return(
              <Grid item xs={12} sm={6} md={3}>
                  <Card className="pollitemparent">
                      <CardContent className="pollitem"> 
      
                          <Badge bg={this.props.scpClass === "Keter" ? "danger" : this.props.scpClass === "Euclid" ? "warning" : this.props.scpClass === "Thaumiel" ? "dark" : "success" }>
                              {/*<Typography className={classes.title} color="textSecondary" gutterBottom>*/}
                                  {this.props.scpClass}
                              {/*</Typography>*/}
                          </Badge>
                          <br />
                          <br/>
                          {this.props.prompt}
      
                          <CardActions style={{display: "flex", justifyContent:"space-between"}}>
                            <Button size="small" onClick={() => this.handleClick(this.props.idx)} disabled={this.state.hasClicked}>
                                  <strong>Vote &nbsp;</strong> {this.state.n_votes}
                            </Button>

                            <div style={{color: "grey", fontStyle: "italic"}}>{this.props.author}</div>
                          </CardActions>
                      </CardContent>
                  </Card>
              </Grid>
          );
    }
}

export default PoolItem;