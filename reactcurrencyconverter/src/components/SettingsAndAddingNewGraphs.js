import React from "react"
import { sendTwoRequests } from "./APIrequests"
import { calculateNewStartDate }  from "./dateUsage"

const SettingsAndAddingNewGraphs = ({currencyTable, firstCurrency, setFirstCurrency, secondCurrency, setSecondCurrency, stateSelector}) => { 
    function displayButtonIfBothCurrenciesAreSelected(){
        var warningElement = document.getElementById("notEnoughCurrenciesSelectedWarning")
        if((stateSelector.selector1-1) >= 0 && (stateSelector.selector2-1)>=0){
            sendTwoRequests(currencyTable, stateSelector, calculateNewStartDate(0,0,7), setFirstCurrency, setSecondCurrency)  
            warningElement.innerHTML = ''
        }else
        {
            warningElement.innerHTML = 'Please select two currencies'
        }
    } 

    return(
    <>
        <button className = "createChartButton" onClick= {() => displayButtonIfBothCurrenciesAreSelected()}>Wykres</button>
        <div id = "notEnoughCurrenciesSelectedWarning"></div>
        <br/>
    </>
    )
}

export default SettingsAndAddingNewGraphs