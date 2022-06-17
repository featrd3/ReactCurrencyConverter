import {useState, useEffect} from 'react';
import EntryContainer from './components/EntryContainer';
import SelectTwoCurrenciesCompareRates from './components/SelectTwoCurrenciesCompareRates'
import SettingsAndAddingNewGraphs from './components/SettingsAndAddingNewGraphs';
import {addObject, getAllCurrenciesRequest} from './components/APIrequests'

function App() {

    var [stateSelector, setStateSelector] = useState({selector1:0,selector2:0});
    var [firstCurrency, setFirstCurrency] = useState([]);
    var [secondCurrency, setSecondCurrency] = useState([]);
    var [appState, setAppState] = useState([]);
    //var [idRequest, setIDRequest] = useState(0);
    var [currencyTable, setCurrencyTable] = useState({rates: 
    [{currency: '', code: '', mid: 0}],date: ''});

    useEffect(()=>{getAllCurrencies(currencyTable,setCurrencyTable)}, []); 

    useEffect(()=>{
        if ((typeof(firstCurrency.data) != "undefined") && (typeof(secondCurrency.data) != "undefined")){
            if(firstCurrency.data.rates.length === secondCurrency.data.rates.length){
                const newCalculatedExchangeRates = firstCurrency.data.rates.map((inputRatesData, index)=>{    
                    return {effectiveDate: inputRatesData.effectiveDate,
                        mid: inputRatesData.mid / secondCurrency.data.rates[index].mid,
                        no: inputRatesData.no}
                })
                
                const newCalculatedExchangeData = {
                    data: {
                        code: firstCurrency.data.code + ' - ' + secondCurrency.data.code,
                        currency: firstCurrency.data.code + ' to ' + secondCurrency.data.code,
                        rates: newCalculatedExchangeRates,
                        table: 'A'
                    }
                }
                setAppState([newCalculatedExchangeData])
            }
        }
    }, [firstCurrency,secondCurrency]);

    const getAllCurrencies = (currencyTable, setCurrencyTable) => {
        getAllCurrenciesRequest(setCurrencyTable);
    }

    const removeEntry = (id, app, setApp) => {
        setApp([...app.filter(obj => {return obj.id !== id})])
    }

    return (
        <div className="container">
            <div className="newEntry">
                <br/>
                <SelectTwoCurrenciesCompareRates currencyTable={currencyTable} stateSelector={stateSelector}/>
                <SettingsAndAddingNewGraphs 
                currencyTable={currencyTable} 
                setFirstCurrency={setFirstCurrency}
                setSecondCurrency={setSecondCurrency}
                //idRequest={idRequest} setIDRequest={setIDRequest} 
                stateSelector={stateSelector}
                />
                <br/>
                
            </div>
            <div>
                {appState.map((requestData)=>
                    <EntryContainer 
                        key = {requestData.data.code} 
                        text = 'text' 
                        objectContent = {requestData.data} 
                        keyTemp = {requestData.data.code}  
                        currencyTable={currencyTable} 
                        setFirstCurrency={setFirstCurrency}
                        setSecondCurrency={setSecondCurrency}
                        stateSelector={stateSelector}
                    />)
            }
            </div>
        </div>
    )
}


export default App;
 