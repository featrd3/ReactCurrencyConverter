import {useState, useEffect} from 'react';
import EntryContainer from './components/EntryContainer';
import CurrencyContainers from './components/CurrencyContainers'

function App() {
    
    var [appState, setAppState] = useState([]);
    var [idRequest, setIDRequest] = useState(0);
    var [currencyTable, setCurrencyTable] = useState({rates: 
    [{currency: '', code: '', mid: 0}],date: ''});
    useEffect(()=>{getAllCurrencies(currencyTable,setCurrencyTable)}, []); 
        
    const addObject = (appState, setAppState, idRequest, setIDRequest, requestURL) => {
        setIDRequest(idRequest+1);
        sendRequest(appState, setAppState, idRequest, requestURL);
    }

    async function sendRequest (appState, setAppState, idRequest, requestURL) {
        const url = 'http://api.nbp.pl/api/'+ requestURL;
        const receivedData = fetch(url)
        .then(result => result.json()).then(data => Array.isArray(data)? data[0]:data)
        .then(data => setAppState([...appState,{data,id: idRequest}]));    return (receivedData)
    }

    const getAllCurrencies = (currencyTable, setCurrencyTable) => {
        getAllCurrenciesRequest(setCurrencyTable);
    }

    async function getAllCurrenciesRequest (setCurrencyTable) {
        const url = 'http://api.nbp.pl/api/exchangerates/tables/a';
        const receivedData = fetch(url) 
        .then(result => result.json()).then(data => data[0])
        .then(data => setCurrencyTable({rates: data.rates,date: data.effectiveDate}));
        return (receivedData)
    }

    const removeEntry = (id, app, setApp) => {
        setApp([...app.filter(obj => {return obj.id !== id})])
    }

    return (
    <div className="container">
        <div className="newEntry">
            Add new entry
            <br/>
            <CurrencyContainers currencyTable={currencyTable}/>
            <button onClick= {() =>getAllCurrencies(currencyTable,setCurrencyTable)}>Currencies to Log</button>
            <br/>
            <button onClick= {() =>addObject(appState, setAppState, idRequest, setIDRequest, 'exchangerates/rates/a/chf/')}>Chf</button>
            <br/>
            <button onClick= {() =>addObject(appState, setAppState, idRequest, setIDRequest, 'cenyzlota')}>Gold</button>
            <br/>
            <button onClick= {() =>console.log(sendRequest(appState, setAppState, idRequest, setIDRequest, 'exchangerates/rates/a/chf/'))}>LOG</button>
        </div>
        <div>
            {currencyTable.date}
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


export default App;
 