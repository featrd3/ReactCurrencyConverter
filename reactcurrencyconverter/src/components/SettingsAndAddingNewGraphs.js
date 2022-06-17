import React from "react"
import SelectAllAvailableCurrencies from "./SelectAllAvailableCurrencies"
import { sendRequest } from "./APIrequests"
import { useState, useEffect } from "react"
import { calculateNewStartDate }  from "./dateUsage"

const SettingsAndAddingNewGraphs = ({currencyTable,setFirstCurrency, setSecondCurrency,stateSelector}) => { 

    function displayButtonIfBothCurrenciesAreSelected(){
        var warningElement = document.getElementById("notEnoughCurrenciesSelectedWarning")
        if((stateSelector.selector1-1)>=0 && (stateSelector.selector2-1)>=0){

            Promise.all([
                sendRequest(setFirstCurrency,
                    'exchangerates/rates/a/'+currencyTable.rates[stateSelector.selector1-1].code+'/'
                    +calculateNewStartDate(0,0,7)+'/'+currencyTable.date),                
                sendRequest(setSecondCurrency,
                    'exchangerates/rates/a/'+currencyTable.rates[stateSelector.selector2-1].code+'/'
                    +calculateNewStartDate(0,0,7)+'/'+currencyTable.date)
                ])

            warningElement.innerHTML = ''
        }else
        {
            warningElement.innerHTML = 'Please select two currencies'
        }

    }

    return(
    <>
        <button onClick= {() => displayButtonIfBothCurrenciesAreSelected()}>Wykres</button>
 
        <div id="notEnoughCurrenciesSelectedWarning"></div>
        <br/>
    </>
    )
        
    }

  export default SettingsAndAddingNewGraphs