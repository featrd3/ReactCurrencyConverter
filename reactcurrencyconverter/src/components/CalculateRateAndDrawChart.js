import { useState, useEffect } from "react"
import { sendRequestUpdateAppState } from './APIrequests'
import { calculateNewStartDate } from './dateUsage'

const CalculateRateAndDrawChart = ({currencyTable, selectedCurrencies, calculatedExchangeRate, setCalculatedExchangeRate}) => {


   
    const [selectedTimeWindow, setSelectedTimeWindow] = useState([0,0,7]);
    

    function checkIfBothCurrenciesAreSelected(){

        if(selectedCurrencies[0]>(-1) && selectedCurrencies[1]>(-1)){
        calculateNewExchangeRates(calculateNewStartDate(...selectedTimeWindow))}
        else{console.log('wybierz dwie waluty')}

    }

    async function calculateNewExchangeRates(newDate){
        sendRequestUpdateAppState(calculatedExchangeRate,setCalculatedExchangeRate, 0, 'exchangerates/rates/a/'+(currencyTable.rates[selectedCurrencies[0]]).code+'/'+newDate+'/'+currencyTable.date)
        sendRequestUpdateAppState(calculatedExchangeRate,setCalculatedExchangeRate, 1, 'exchangerates/rates/a/'+(currencyTable.rates[selectedCurrencies[1]]).code+'/'+newDate+'/'+currencyTable.date)
        return('test')
    }
/*
    async function promiseFetch (newDate) {

        return(Promise.all[
                ])
    }


    function calculateExchangeRates(){
        var newExchangeRate = {
            code: calculatedExchangeRate[0].code + ' - ' + calculatedExchangeRate[1].code,
            currency: calculatedExchangeRate[0].currency + ' - ' + calculatedExchangeRate[1].currency,
            rates: [],
            table: 'A'
        }
        setCalculatedExchangeRate[2] = newExchangeRate
        
        var tempRateCurrency0 = calculatedExchangeRate[0].rates;
        tempRateCurrency0.map((elementOfArray, index)=>{
            let newRatesObject= {
                effectiveDate: elementOfArray.effectiveDate,
                mid: (( calculatedExchangeRate[0].rates)[index]).mid/(( calculatedExchangeRate[1].rates)[index]).mid,
                no: elementOfArray.no
            }
            newExchangeRate.rates[index] = newRatesObject;
        })
        return(newExchangeRate)

    }*/
    
    return(
    <div>
        <button onClick={() => sendRequestUpdateAppState(calculatedExchangeRate,setCalculatedExchangeRate, 0, 'exchangerates/rates/a/'+(currencyTable.rates[selectedCurrencies[0]]).code+'/2022-06-05/'+currencyTable.date)}>dupa</button>
        <br/>
        test
        <br/>
        {calculatedExchangeRate[0].code}

    </div>
    )
        
    }

  export default CalculateRateAndDrawChart