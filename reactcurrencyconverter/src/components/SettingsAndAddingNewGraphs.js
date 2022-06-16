import React from "react"
import SelectAllAvailableCurrencies from "./SelectAllAvailableCurrencies"
import { addObject } from "./APIrequests"
import { useState, useEffect } from "react"
import { calculateNewStartDate }  from "./dateUsage"

const SettingsAndAddingNewGraphs = ({currencyTable,appState, setAppState,idRequest,setIDRequest,stateSelector,selectId}) => { 

    function displayButtonIfBothCurrenciesAreSelected(){
        var warningElement = document.getElementById("notEnoughCurrenciesSelectedWarning")
        console.log((stateSelector.selector1-1))
        console.log((stateSelector.selector2-1))
        if((stateSelector.selector1-1)>=0 && (stateSelector.selector2-1)>=0){
            addObject(appState, setAppState, idRequest, setIDRequest,'exchangerates/rates/a/'+currencyTable.rates[stateSelector.selector1-1].code+'/'+calculateNewStartDate(0,0,7)+'/'+currencyTable.date)
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