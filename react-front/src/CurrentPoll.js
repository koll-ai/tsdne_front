import {useState} from "react";

function UserForm(props){
    const [value, setValue] = useState(props.value);
    console.log("value : " + value);
    return  <input type="text" name="user_prompt" value={value}

        onChange={event => {
            if (event.target.value.startsWith(props.value)){
                setValue(event.target.value);
            }
        }}
        // onChange={event => console.log(event.target.value)}
    />;
}


function CurrentPoll() {
  return (
    <div className="CurrentPoll">

        <p>Current Winning prompt :</p>
        <p> SCP 127-GPT is a burger that can turn people vegan</p>
        <p> Got an idea ? Go to http://www.strawpoll.fr to propose it !</p>
        <UserForm value="SCP 102-GPT is a "
                  bloc = "dala"
                  />
    </div>
  );
}

export default CurrentPoll;
