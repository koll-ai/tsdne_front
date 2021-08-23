import {useState} from "react";

function UserForm(props){
    // Champ de texte qui commencera toujours par la valeur de son prop starting_value
    const [value, setValue] = useState(props.starting_value);
    return  <input type="text" name="user_prompt" value={value}

        onChange={event => {
            if (event.target.value.startsWith(props.starting_value)){
                setValue(event.target.value);
            }
        }}
    />;
}


function CurrentPoll() {
  return (
    <div className="CurrentPoll">

        <p>Current Winning prompt :</p>
        <p> SCP 127-GPT is a burger that can turn people vegan</p>
        <p> Got an idea ? Go to http://www.strawpoll.fr to propose it !</p>
        <UserForm starting_value="SCP 102-GPT is a "
                  />
    </div>
  );
}

export default CurrentPoll;
