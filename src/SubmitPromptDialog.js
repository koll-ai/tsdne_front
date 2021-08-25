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
    return  <textarea type="text" name="user_prompt" value={value} fullWidth

        onChange={event => {
            if (event.target.value.startsWith(props.starting_value)){
                setValue(event.target.value);
            }
        }}
    />;
}


function ClassSelect() {
    const [scpClass, setScpClass] = React.useState(0);

    const handleChange = (event) => {
        setScpClass(event.target.value);
    };

    return (
        <div>
            <InputLabel id="demo-simple-select-label">Classe</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
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


export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen} fullWidth>
        Submit a prompt !
      </Button>
      <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Submit your SCP idea !</DialogTitle>
        <DialogContent>

          <DialogContentText>
            Describe your SCP :
          </DialogContentText>
            <UserForm starting_value="SCP 104 is " />

            <br/>
            <br/>

            <ClassSelect />




        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}