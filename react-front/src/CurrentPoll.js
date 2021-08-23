import {useState} from "react";

function UserForm(){
    const {value, setValue} = useState(null);

    return  <input type="text" name="user_prompt" value={value} />;
}


function CurrentPoll() {
  return (
    <div className="CurrentPoll">

        <p>Current Winning prompt :</p>
        <p> SCP 127-GPT is a burger that can turn people vegan</p>
        <p> Got an idea ? Go to http://www.strawpoll.fr to propose it !</p>
        <UserForm />
    </div>
  );
}

export default CurrentPoll;
