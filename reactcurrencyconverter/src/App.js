import {useState} from 'react'
import EntryContainer from './components/EntryContainer';


function App() {

    var [appState, setAppState] = useState([]);
    var [idRequest, setIDRequest] = useState(0);
    var requestURL = 'exchangerates/rates/a/chf/';
    return (
    <div className="container">

        <div className="newEntry">
            Add new entry
            <br/>
            <button onClick= {() =>addObject(appState, setAppState, idRequest, setIDRequest,'cenyzlota')}>add</button>
            <br/>
            <button onClick= {() =>addObject(appState, setAppState, idRequest, setIDRequest, 'exchangerates/rates/a/chf/')}>Chf</button>
            <br/>
            <button onClick= {() =>addObject(appState, setAppState, idRequest, setIDRequest, 'cenyzlota')}>Gold</button>
            <br/>
            <button onClick= {() =>console.log(sendRequest(appState, setAppState, idRequest, setIDRequest, 'exchangerates/rates/a/chf/'))}>LOG</button>
        </div>

        {appState.map((requestData) => <EntryContainer 
        key = {requestData.id} 
        text = 'text' 
        objectContent = {requestData.data} 
        keyTemp = {requestData.id} 
        removeEntryFunction = {removeEntry}
        appState = {appState}
        setAppState = {setAppState}
        />)}

        <br/>
    </div>
    )
}

const addObject = (appState, setAppState, idRequest, setIDRequest, requestURL) => {

    setIDRequest(idRequest+1);
    const data =  sendRequest(appState, setAppState, idRequest, requestURL);
}

async function sendRequest (appState, setAppState, idRequest, requestURL) {
    const url = 'http://api.nbp.pl/api/'+ requestURL;
    const receivedData = fetch(url)
      .then(result => result.json()).then(data => Array.isArray(data)? data[0]:data)
      .then(data => setAppState([...appState,{data,id: idRequest}]));    return (receivedData)
}
/*
async function sendRequestChf (appState, setAppState, idRequest) {

    const receivedData = fetch('http://api.nbp.pl/api/exchangerates/rates/a/chf/')
      .then(result => result.json()).then(data => data[0])
      .then(data => setAppState([...appState,{data,id: idRequest}]));    return (receivedData)
}
*/

const removeEntry = (id, app, setApp) => {
    
    setApp([...app.filter(obj => {return obj.id !== id})])
}


export default App;
 