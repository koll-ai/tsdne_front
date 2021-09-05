
import Footer from "./Footer";

function About() {
  return (
    <div className="App" style={{textAlign: 'left', backgroundColor:'white' }}>
      <center><h1>About</h1></center>
      
      <br></br>
      <br></br>

      <h3>What is this website ?</h3>

      <br></br>

      This website uses GPT-3 by OpenAI to generate SCP.
      Generative Pre-trained Transformer 3 (GPT-3) is an autoregressive language model
      that uses deep learning to produce human-like text.
      GPT-3's full version has a capacity of 175 billion machine learning parameters.
      
      <br></br>
      <br></br>

      <h3>Authors :</h3>

        <br></br>

        <ul>
            <li>Ruben Gres</li>
            <ul>
                <li>
                    <a href={"https://www.linkedin.com/in/ruben-gres-484930158/"}>LinkedIn</a>
                </li>
                <li>
                    <a href={"https://github.com/RubenGres"}>GitHub</a>
                </li>
                <li>
                    <a href={"https://ohmlet.itch.io/"}>Itch.io</a>
                </li>
            </ul>
            <br/>
            <li>Philippe Saadé</li>
            <ul>
                <li> Looking for a phd in Western Europe</li>
                <li>
                    <a href={"https://www.linkedin.com/in/philippe-saad%C3%A9-26972b149/"}>LinkedIn</a>
                </li>
                <li>
                    <a href={"https://github.com/PhilSad"}>GitHub</a>
                </li>
            </ul>
        </ul>
    </div>
  );
}

export default About;
