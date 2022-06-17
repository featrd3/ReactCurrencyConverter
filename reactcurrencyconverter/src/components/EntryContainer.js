import TimeframePlot from "./TimeframePlot"
import {sendRequestUpdateAppState} from './APIrequests'
import {calculateNewStartDate} from './dateUsage'
import { sendTwoRequests } from "./APIrequests"

const EntryContainer = ({text, objectContent, keyTemp, currencyTable, setFirstCurrency, setSecondCurrency, stateSelector}) => {
  
  return (
    <div  className="createdEntry">

      {handleContentIsObject(objectContent)}

    </div>
  )

  function handleContentIsObject (valueToMap){
    return (
      <div>
        <p>Currency: {' '+valueToMap.currency}</p>
        {handleValueIsArray(valueToMap.rates)}
      </div>
      ) 
  }

  function handleValueIsArray (inputArray){
    const divStyle = { paddingLeft: '10px'}

    return (
      <div style={divStyle}>
        {(inputArray.length > 1)?
          ( prepareAndDrawPlotData(inputArray)
            )
        :( Object.entries(inputArray[0]).map(([key,value])=>{
          return (
          <div key={key}>
            {key}:{value.toString()}
          </div>
          )
        }))}
      </div>
      ) 
  }

  function prepareAndDrawPlotData (inputArrayData){
    var labels =[]
    var dataValues = []
    inputArrayData.map((inputArrayData)=>{
      labels = [...labels,inputArrayData.effectiveDate]
      dataValues = [...dataValues,inputArrayData.mid]
    })
    return(<>
      <button onClick = {() => sendTwoRequests(currencyTable,stateSelector,calculateNewStartDate(0,0,7),setFirstCurrency,setSecondCurrency) }>1w</button>
      <button onClick = {() => sendTwoRequests(currencyTable,stateSelector,calculateNewStartDate(0,1,0),setFirstCurrency,setSecondCurrency) }>1m</button>
      <button onClick = {() => sendTwoRequests(currencyTable,stateSelector,calculateNewStartDate(1,0,0),setFirstCurrency,setSecondCurrency) }>1y</button>
      <TimeframePlot inputLabels={labels} inputData={dataValues} labelCode={objectContent.code}/>
    </>
  
    )
  }

 
  


}
export default EntryContainer