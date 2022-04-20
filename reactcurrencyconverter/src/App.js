import {useState} from 'react'
import EntryContainer from './components/EntryContainer';


function App() {

    const [appState, setAppState] = useState([]);
    const [idRequest, setIDRequest] = useState(0);

    return (
    <div className="container">
        <div className="newEntry">
            Add new entry
            <button onClick= {() =>addObject(appState, setAppState, idRequest, setIDRequest)}>add</button>
            <button onClick= {() =>console.log(appState)}>LOG</button>
        </div>
        {appState.map((requestData) => <EntryContainer key = {requestData.id} text = 'text' objectContent = {requestData.data[0]} keyTemp = {requestData.id} />)}

        <br/>
    </div>
)

}

const addObject = (appState, setAppState, idRequest, setIDRequest) => {

    setIDRequest(idRequest+1);
    const data =  sendRequestGold(appState, setAppState, idRequest);
}

async function sendRequestGold (appState, setAppState, idRequest) {

    const receivedData = fetch('http://api.nbp.pl/api/cenyzlota')
      .then(result => result.json())
      .then(data => setAppState([...appState,{data,id: idRequest}]));    return (receivedData)

}

export default App;
 