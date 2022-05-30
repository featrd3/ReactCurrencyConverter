import {useState, useEffect} from 'react';
import EntryContainer from './components/EntryContainer';
import CurrencyContainers from './components/CurrencyContainers'
import {sendRequest, getAllCurrenciesRequest} from './components/APIrequests'

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

    const getAllCurrencies = (currencyTable, setCurrencyTable) => {
        getAllCurrenciesRequest(setCurrencyTable);
    }

    const removeEntry = (id, app, setApp) => {
        setApp([...app.filter(obj => {return obj.id !== id})])
    }
/*
    const calculateDate = (date,changePeriod) => {
        separated = date.split('-');
        toChange = changePeriod.split('-');
        separated[0] = separated[0] - 
        return()

    }*/

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
            <button onClick= {() =>console.log(appState)}>LOG</button>
        </div>
        <div>
            {currencyTable.date}
        </div>  
        <div>
            <input type = "date" name="from"/>
            <button onClick= {() =>addObject(appState, setAppState, idRequest, setIDRequest, 'exchangerates/rates/a/chf/2022-05-24/'+currencyTable.date)}>Chf z okresu</button>
            <br/>

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
 