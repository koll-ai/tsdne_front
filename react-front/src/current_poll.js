import {useState} from "react";

function userForm(){
    const {value, setValue} = useState(null);

    return  <input type="text" name="user_prompt" value={value} />;
}

function current_poll() {
  return (
    <div className="current_poll">

        <p>Current Winning prompt :</p>
        <p> SCP 127-GPT is a aaaaaburger that can turn people vegan</p>
        <p> Got an idea ? Go to http://www.strawpoll.fr to propose it !</p>
        <textarea />
        <userForm />
    </div>
  );
}

export default current_poll;
