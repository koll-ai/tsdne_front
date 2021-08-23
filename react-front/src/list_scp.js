import logo from './logo.svg';
import './App.css';

function App() {


    const [scps, setScps] = useState(null);

    useEffect(() => {
    getData();

    // we will use async/await to fetch this data
    async function getData() {
      const response = await fetch("http://localhost:5000/all_scp/");
      const data = await res.json();

      // store the data into our books variable
      setScps(data) ;
    }
  }, []); // <- you may need to put the setBooks function in this array


  return (
    <div className="App">

    </div>
  );
}

export default App;
