import React from "react"
import SelectAllAvailableCurrencies from "./SelectAllAvailableCurrencies"
import { addObject } from "./APIrequests"

const SettingsAndAddingNewGraphs = ({currencyTable,appState, setAppState,idRequest,setIDRequest,selectId}) => {

    var selectedCurrency = NaN
    var seletorCurrencyObject = document.getElementById(selectId);
    if (seletorCurrencyObject != null){
        seletorCurrencyObject.addEventListener('change', function() {
            selectedCurrency = seletorCurrencyObject.selectedIndex-1
        })
    }

    return(
    <>
        <input type = "date" name="from"/>
        <SelectAllAvailableCurrencies currencyTable={currencyTable} selectId={selectId}/>
        <button onClick= {() =>addObject(appState, setAppState, idRequest, setIDRequest, 'exchangerates/rates/a/'+currencyTable.rates[selectedCurrency].code+'/2022-05-24/'+currencyTable.date)}>Chf z okresu</button>
        <br/>
    </>
    )
        
    }
  
  export default SettingsAndAddingNewGraphs