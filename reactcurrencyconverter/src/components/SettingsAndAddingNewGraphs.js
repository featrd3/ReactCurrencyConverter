import React from "react"
import SelectAllAvailableCurrencies from "./SelectAllAvailableCurrencies"
import { addObject } from "./APIrequests"
import { useState } from "react"
import { calculateNewStartDate }  from "./dateUsage"

const SettingsAndAddingNewGraphs = ({currencyTable,appState, setAppState,idRequest,setIDRequest,selectId}) => {
    
    const [selectedCurrency, setSelectedCurrency] = useState(NaN);

    var seletorCurrencyObject = document.getElementById(selectId);
    if (seletorCurrencyObject != null){
        seletorCurrencyObject.addEventListener('change', function() {
            setSelectedCurrency(seletorCurrencyObject.selectedIndex-1)
        })
    }

    return(
    <>
        <input type = "date" name = "from"/>
        <SelectAllAvailableCurrencies currencyTable={currencyTable} selectId={selectId}/>
        <button onClick= {() =>addObject(appState, setAppState, idRequest, setIDRequest, 'exchangerates/rates/a/'+currencyTable.rates[selectedCurrency].code+'/'+calculateNewStartDate(0,0,7)+'/'+currencyTable.date)}>Wykres</button>
        <br/>
    </>
    )
        
    }

  export default SettingsAndAddingNewGraphs