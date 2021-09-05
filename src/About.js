
import Footer from "./Footer";

function About() {
  return (
    <div className="App" style={{textAlign: 'left', backgroundColor:'white' }}>
      <h2>Authors</h2>

        <ul>
            <li>Ruben Grès</li>
            <ul>
                <li> Looking for a datascientist job in Germany</li>
                <li>
                    <a href={"https://www.linkedin.com/in/ruben-gres-484930158/"}>LinkedIn</a>
                </li>
            </ul>
            <br/>
            <li>Philippe Saadé</li>
            <ul>
                <li> Looking for a phd in Western Europe</li>
                <li>
                    <a href={"https://www.linkedin.com/in/philippe-saad%C3%A9-26972b149/"}>LinkedIn</a>
                </li>
            </ul>
        </ul>
    </div>
  );
}

export default About;
