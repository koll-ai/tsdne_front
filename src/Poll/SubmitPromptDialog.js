import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import {Switch} from "@material-ui/core";
import { useAlert } from 'react-alert';
import React, {useState} from 'react';
import * as urls from '../URLs.js';

const url_api = urls.URL_API;

function UserForm(props){
    // Champ de texte qui commencera toujours par la valeur de son prop starting_value
    const [value, setValue] = useState(props.starting_value);
    return  <textarea type="text" name="user_prompt" value={value} fullWidth maxlength={300}

        onChange={event => {
            if (event.target.value.startsWith(props.starting_value)){
                setValue(event.target.value);
                props.onValueChange(event);
            }
        }}
    />;
}


function ClassSelect(props) {
    const [scpClass, setScpClass] = React.useState(props.value);

    const handleChange = (event) => {
        setScpClass(event.target.value);
        props.onClassChange(event);
    };

    return (
        <div>
            <InputLabel id="scpClassLabel">Class :</InputLabel>
                <Select
                  labelId="SCP-Class"
                  id="scpClassSelect"
                  value={scpClass}
                  onChange={handleChange}
                >
                  <MenuItem value={0}>Safe</MenuItem>
                  <MenuItem value={1}>Euclid</MenuItem>
                  <MenuItem value={2}>Keter</MenuItem>
                  <MenuItem value={3}>Thomiel</MenuItem>
            </Select>
        </div>
    )

}


export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const [prompt, setPrompt] = React.useState("");
  const [scpClass, setScpClass] = React.useState(0);
  const [author, setAuthor] = React.useState("Dr. [REDACTED]");
  const [nsfw, setNsfw] = React.useState(false);

  const alert = useAlert()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () =>{
      // if (prompt.length < 15) {
      //     handleClose();
      //     alert.show('Prompt length is too short !')
      //
      //     return;
      // }
      let url = url_api + "add_prompt/"
      + "?prompt=" + prompt
      + "&class=" + scpClass.toString()
      + "&author=" + author
      + "&nsfw=" + nsfw;

      fetch(url, {
            headers: new Headers({
                'Authorization': 'Basic '+btoa(localStorage.getItem('id') + ':' + localStorage.getItem('mdp')),
                'Content-Type': 'application/x-www-form-urlencoded'

            })
        })
          // .then(value => window.location.href = '/');
          .then(value=> value.text())
          .then(text => alert.show(text))

      handleClose();

  };

  return (
    <div>
      <div className="buttonsubmit" onClick={handleClickOpen}>
        <h5>Submit a prompt</h5>
      </div>
      <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Submit your SCP idea !</DialogTitle>
        <DialogContent>

          <DialogContentText>
            SCP-{props.curscp} is ...
          </DialogContentText>
            <UserForm starting_value={""} onValueChange={(event) =>{
                setPrompt(event.target.value);
            }} />

            <br/>
            <br/>

            <div style={{display: "flex", justifyContent:"space-between"}}>
            
              <ClassSelect onClassChange={(event) => {
                setScpClass( event.target.value);
                }} value={scpClass}
              />
                <InputLabel id="scpNSFW">
                  NSFW:
                  <Switch  onChange={(event => {
                      console.log(event.target.checked);
                      setNsfw(event.target.checked);
                  })}/>
                </InputLabel>
                
              <div>
                <InputLabel id="scpClassLabel">Author :</InputLabel>
                <input name="Author" placeholder="Dr. [REDACTED]" onChange={(event) =>{
                          setAuthor(event.target.value);
                      }}></input>
              </div>

            </div>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" >
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}