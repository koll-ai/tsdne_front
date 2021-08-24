
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


function PollItem(props){
    return(
      <div className="pollItem">
          <p>{props.prompt} ({props.scpClass}) <button>Vote ({props.votes})</button></p>


      </div>
    );
}

function PollList(props){
    //props : pollingItems : [{prompt : .., votes : ..}, ...]
    // Should already be sorted by votes ascending
    const items = props.pollingItems.map(item => <PollItem prompt={item.prompt}
                                                           scpClass={item.scpClass}
                                                           votes={item.votes}

    />);
    return(
        <div className="poll-list">
            {items}
        </div>
    )
}


function CurrentPoll() {
    const pollingItems = [
        {
            prompt : "SCP 202-GPT is a pink pig being the best Minecraft player",
            scpClass : "Keter",
            votes  : 54
        },
        {
            prompt : "SCP 202-GPT is a black panther that fight for racial justice",
            scpClass : 'Euclid',
            votes  : 24
        },
        {
            prompt : "SCP 202-GPT is a pink burger that can turn people vegan",
            scpClass: 'Safe',
            votes  : 12
        }
    ]
  return (
    <div className="CurrentPoll">

        <p>Current Poll :</p>
        <PollList pollingItems={pollingItems}/>

        <UserForm starting_value="This SCP is a "/>

    </div>
  );
}

export default CurrentPoll;
