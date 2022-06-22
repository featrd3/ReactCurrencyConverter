import React from "react"

const SelectAllAvailableCurrencies = ({currencyTable,selectId}) => {

    return(
    <select className = "selectorAllCurrencies" id={selectId}>
                    <option key='test' defaultValue hidden >Select currency</option>
                    {currencyTable.rates.map((selectableOption) => 
                        <option key={selectableOption.code}>
                            {selectableOption.code}
                        </option>    
                    )}
                </select>
    )

}  
  export default SelectAllAvailableCurrencies