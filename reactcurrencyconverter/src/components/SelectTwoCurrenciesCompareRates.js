import React from "react"
import SelectAllAvailableCurrencies from "./SelectAllAvailableCurrencies";

const SelectTwoCurrenciesCompareRates = ({currencyTable}) => {

    const state={selector1:1,selector2:1};

    function selectWithOptionsAndMid (selectId,displayMIDId){
        
        return (
            <div>
                <SelectAllAvailableCurrencies currencyTable={currencyTable} selectId={selectId}/>
                <div id={displayMIDId}>
                    MID
                </div>
            </div>
        )
    }

    function calculateExchangeRatesFromID (currencyTable, selectObjectID1,displayMIDId1, selectObjectID2,displayMIDId2, endTextObjectID){
        var sel1 = document.getElementById(selectObjectID1);
        var sel2 = document.getElementById(selectObjectID2);
        if (sel1 != null & sel2 != null){
            sel1.addEventListener('change', function() {
                updateOrSwitchDuplicatingSelections(sel1,displayMIDId1,sel2,displayMIDId2,endTextObjectID)

            })
            sel2.addEventListener('change', function() {
                updateOrSwitchDuplicatingSelections(sel1,displayMIDId1,sel2,displayMIDId2,endTextObjectID)

            })
        }
    }
        function updateOrSwitchDuplicatingSelections (sel1,displayMIDId1,sel2,displayMIDId2,endTextObjectID){
            if (sel1.selectedIndex === sel2.selectedIndex & sel1.selectedIndex !== 0){
                sel1.selectedIndex = state.selector2
                sel2.selectedIndex = state.selector1
                state.selector1 = sel1.selectedIndex
                state.selector2 = sel2.selectedIndex
            }else{
                state.selector1 = sel1.selectedIndex
                state.selector2 = sel2.selectedIndex
            }
            updateMID(sel1,displayMIDId1);
            updateMID(sel2,displayMIDId2);
            updateExchangeRate(sel1,sel2,endTextObjectID);
        }
       
        function updateMID (sel,displayMIDId){
            try{var textMID= currencyTable.rates[sel.selectedIndex-1].mid + ' PLN';}
            catch{var textMID= 'MID'}
            var paragraph = document.getElementById(displayMIDId);
            paragraph.textContent = textMID;
        }

        function updateExchangeRate (sel1,sel2,endTextObjectID){
            if (sel1.selectedIndex !== 0 && sel2.selectedIndex !== 0){
                let textRate= (currencyTable.rates[sel1.selectedIndex-1].mid/currencyTable.rates[sel2.selectedIndex-1].mid);
                let paragraph = document.getElementById(endTextObjectID);
                paragraph.textContent = textRate;
            }
        }
       
        return (
        <div>
            {selectWithOptionsAndMid("selectCurrency1","displayedMID1")}
            {selectWithOptionsAndMid("selectCurrency2","displayedMID2")}

        <div id="calculatedRates">N/A{calculateExchangeRatesFromID(currencyTable,"selectCurrency1","displayedMID1","selectCurrency2","displayedMID2","calculatedRates")}</div>
        </div>
        )
        
    }
  
  export default SelectTwoCurrenciesCompareRates