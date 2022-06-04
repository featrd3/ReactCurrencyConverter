import React from "react"
import SelectAllAvailableCurrencies from "./SelectAllAvailableCurrencies"
import { addObject } from "./APIrequests"
import { useState } from "react"

const SettingsAndAddingNewGraphs = ({currencyTable,appState, setAppState,idRequest,setIDRequest,selectId}) => {
    
    const [selectedCurrency, setSelectedCurrency] = useState(0);

    var seletorCurrencyObject = document.getElementById(selectId);
    if (seletorCurrencyObject != null){
        seletorCurrencyObject.addEventListener('change', function() {
            {console.log('before event: '+selectedCurrency)}
            setSelectedCurrency(seletorCurrencyObject.selectedIndex-1)
            {console.log('after event: '+selectedCurrency)}
        })
    }

    return(
    <>
        <input type = "date" name = "from"/>
        <SelectAllAvailableCurrencies currencyTable={currencyTable} selectId={selectId}/>
        {console.log('before: '+selectedCurrency)}
        <button onClick= {() =>addObject(appState, setAppState, idRequest, setIDRequest, 'exchangerates/rates/a/'+currencyTable.rates[selectedCurrency].code+'/2022-05-24/'+currencyTable.date)}>Wykres</button>
        {console.log('after: '+selectedCurrency)}
        <br/>
    </>
    )
        
    }

  export default SettingsAndAddingNewGraphs