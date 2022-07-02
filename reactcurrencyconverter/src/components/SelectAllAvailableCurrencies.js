import React from "react"

const SelectAllAvailableCurrencies = ({currencyTable, selectId}) => {
    return(
        <select className = "selectorAllCurrencies" id = {selectId}>
            <option key = 'test' defaultValue hidden >Select currency</option>
            {currencyTable.rates.map((selectableOption) => 
                <option key = {selectableOption.code}>
                    {selectableOption.code + ' - ' + selectableOption.currency}
                </option>    
            )}
        </select>
    )
}  

export default SelectAllAvailableCurrencies