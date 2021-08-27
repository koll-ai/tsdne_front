import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

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
            <InputLabel id="demo-simple-select-label">Classe</InputLabel>
                <Select
                  labelId="SCP-Class"
                  id="scpClassSelect"
                  value={scpClass}
                  onChange={handleChange}
                >
                  <MenuItem value={0}>Safe</MenuItem>
                  <MenuItem value={1}>Euclide</MenuItem>
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () =>{
      let url = "https://thisscpdoesnotexist.pythonanywhere.com/add_prompt/?prompt=" + prompt.substring(11) + "&class=" + scpClass.toString() + "&ip=" + Math.floor(Math.random() * 100).toString()
        fetch(url);
      console.log("fetched");

      handleClose();

  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen} fullWidth>
        <h3>Submit a prompt !</h3>
      </Button>
      <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Submit your SCP idea !</DialogTitle>
        <DialogContent>

          <DialogContentText>
            Describe your SCP :
          </DialogContentText>
            <UserForm starting_value={"SCP " + props.curscp + " is "} onValueChange={(event) =>{
                setPrompt(event.target.value);
            }} />

            <br/>
            <br/>

            <ClassSelect onClassChange={(event) => {
                console.log(event.target.value);
                setScpClass( event.target.value);
            }}
                         value={scpClass}
            />




        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
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