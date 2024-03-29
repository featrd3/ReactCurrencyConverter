import React from "react"
import SelectAllAvailableCurrencies from "./SelectAllAvailableCurrencies";

const SelectTwoCurrenciesCompareRates = ({currencyTable, stateSelector}) => {
    function calculateExchangeRatesFromID (currencyTable, selectObjectID1, displayMIDId1, selectObjectID2, displayMIDId2, endTextObjectID){
        var sel1 = document.getElementById(selectObjectID1);
        var sel2 = document.getElementById(selectObjectID2);
        if (sel1 != null & sel2 != null){
            sel1.addEventListener('change', function() {
                updateOrSwitchDuplicatingSelections(sel1, displayMIDId1, sel2, displayMIDId2, endTextObjectID)
            })
            sel2.addEventListener('change', function() {
                updateOrSwitchDuplicatingSelections(sel1, displayMIDId1, sel2, displayMIDId2, endTextObjectID)
            })
        }
    }
    function updateOrSwitchDuplicatingSelections (sel1, displayMIDId1, sel2, displayMIDId2, endTextObjectID){
        if (sel1.selectedIndex === sel2.selectedIndex){
            sel1.selectedIndex = stateSelector.selector2
            sel2.selectedIndex = stateSelector.selector1
            stateSelector.selector1 = sel1.selectedIndex
            stateSelector.selector2 = sel2.selectedIndex
        }else{
            stateSelector.selector1 = sel1.selectedIndex
            stateSelector.selector2 = sel2.selectedIndex
        }

        updateExchangeRate(sel1, sel2, endTextObjectID);
    }

    function updateExchangeRate (sel1, sel2, endTextObjectID){
        if (sel1.selectedIndex !== 0 && sel2.selectedIndex !== 0){
            let textRate = (currencyTable.rates[sel1.selectedIndex-1].mid / currencyTable.rates[sel2.selectedIndex-1].mid);
            let paragraph = document.getElementById(endTextObjectID);
            paragraph.textContent = parseFloat(textRate).toFixed(3);
        }
    }
    function selectWithOptionsAndMid (selectId,displayMIDId){
        return (
            <div className="selectWithOptionsAndMidStyle">
                <SelectAllAvailableCurrencies currencyTable = {currencyTable} selectId = {selectId}/>
            </div>
        )
    }
    return (

    <div className = "selectTwoCurrencies">
        {selectWithOptionsAndMid("selectCurrency1", "displayedMID1")}
        {selectWithOptionsAndMid("selectCurrency2", "displayedMID2")}
    
        <div id = "calculatedRates">{calculateExchangeRatesFromID
            (currencyTable, "selectCurrency1", "displayedMID1", "selectCurrency2", "displayedMID2", "calculatedRates")}</div>
    </div>
    )
}

export default SelectTwoCurrenciesCompareRates