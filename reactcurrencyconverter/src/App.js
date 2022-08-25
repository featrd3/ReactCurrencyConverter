import {useState, useEffect} from 'react';
import EntryContainer from './components/EntryContainer';
import SelectTwoCurrenciesCompareRates from './components/SelectTwoCurrenciesCompareRates'
import SettingsAndAddingNewGraphs from './components/SettingsAndAddingNewGraphs';
import { getAllCurrenciesRequest} from './components/APIrequests'

function App() {

    document.title = "Currency converter"

    var [stateSelector, setStateSelector] = useState({selector1:0, selector2:0});
    var [firstCurrency, setFirstCurrency] = useState([]);
    var [secondCurrency, setSecondCurrency] = useState([]);
    var [appState, setAppState] = useState([]);
    var [currencyTable, setCurrencyTable] = useState({rates: 
    [{currency: '', code: '', mid: 0}], date: ''});
    useEffect(()=>{getAllCurrencies(currencyTable, setCurrencyTable)}, []);

    useEffect(()=>{
        if ((typeof(firstCurrency.data) !== "undefined" || stateSelector.selector1 === 1) 
        && (typeof(secondCurrency.data) !== "undefined"|| stateSelector.selector2 === 1)){   
            if (stateSelector.selector1 === 1){
                setAppState([exchangeFromPLN()])
            }
            if (stateSelector.selector2 === 1){
                setAppState([exchangeToPLN()])
            }
            if((stateSelector.selector1 !== 1 && stateSelector.selector2 !== 1)
            && firstCurrency.data.rates.length === secondCurrency.data.rates.length){
                setAppState([exchangeFromTwoDifferentCurrencies()])
            }
        }
    }, [firstCurrency,secondCurrency]);

    function exchangeToPLN (){
        const newCalculatedExchangeRates = firstCurrency.data.rates.map((inputRatesData)=>{    
            return {effectiveDate: inputRatesData.effectiveDate,
                mid: inputRatesData.mid,
                no: inputRatesData.no}
        })
        const newCalculatedExchangeData = {
            data: {
                code: firstCurrency.data.code + ' - PLN' ,
                currency: firstCurrency.data.currency + ' - polski złoty',
                rates: newCalculatedExchangeRates,
                table: 'A'
            }
        }
        return (newCalculatedExchangeData)
    }

    function exchangeFromPLN (){
        const newCalculatedExchangeRates = secondCurrency.data.rates.map((inputRatesData)=>{    
            return {effectiveDate: inputRatesData.effectiveDate,
                mid: 1 / inputRatesData.mid,
                no: inputRatesData.no}
        })
        const newCalculatedExchangeData = {
            data: {
                code: 'PLN - ' + secondCurrency.data.code,
                currency: 'polski złoty - ' + secondCurrency.data.currency,
                rates: newCalculatedExchangeRates,
                table: 'A'
            }
        }
        return (newCalculatedExchangeData)
    }

    function exchangeFromTwoDifferentCurrencies (){
        const newCalculatedExchangeRates = firstCurrency.data.rates.map((inputRatesData, index)=>{    
            return {effectiveDate: inputRatesData.effectiveDate,
                mid: inputRatesData.mid / secondCurrency.data.rates[index].mid,
                no: inputRatesData.no}
        })
        const newCalculatedExchangeData = {
            data: {
                code: firstCurrency.data.code + ' - ' + secondCurrency.data.code,
                currency: firstCurrency.data.currency + ' - ' + secondCurrency.data.currency,
                rates: newCalculatedExchangeRates,
                table: 'A'
            }
        }
        return(newCalculatedExchangeData)
    }

    const getAllCurrencies = (currencyTable, setCurrencyTable) => {
        getAllCurrenciesRequest(setCurrencyTable);
    }

    return (
        <div className="mainContainer">
            <div className="insideMainContainer">
                <br/>
                <SelectTwoCurrenciesCompareRates currencyTable = {currencyTable} stateSelector = {stateSelector}/>
                <div className="center">
                <SettingsAndAddingNewGraphs 
                currencyTable = {currencyTable} 
                firstCurrency = {firstCurrency}
                setFirstCurrency = {setFirstCurrency}
                secondCurrency = {secondCurrency}
                setSecondCurrency = {setSecondCurrency}
                stateSelector = {stateSelector}
                />
                </div>
                <br/>
                {appState.map((requestData)=>
                    <EntryContainer 
                        key = {requestData.data.code} 
                        objectContent = {requestData.data}
                        currencyTable={currencyTable} 
                        setFirstCurrency={setFirstCurrency}
                        setSecondCurrency={setSecondCurrency}
                        stateSelector={stateSelector}
                    />
                )}
            </div>
        </div>
    )
}

export default App;