import TimeframePlot from "./TimeframePlot"
import {sendRequestUpdateAppState} from './APIrequests'
import {calculateNewStartDate} from './dateUsage'

const EntryContainer = ({text, objectContent, keyTemp, removeEntryFunction, appState, setAppState}) => {
  
  return (
    <div  className="createdEntry">
        <button onClick = {() => removeEntryFunction(keyTemp, appState, setAppState) }>X</button>
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
/*
  return (
    <div key={key}>
      {key}:  
      {Array.isArray(value) ? 
         : 
        value.toString()}
    </div>
    )*/

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
      <button onClick = {() => updatePlotTimeWindow(calculateNewStartDate(0,0,7))}>1w</button>
      <button onClick = {() => updatePlotTimeWindow(calculateNewStartDate(0,1,0)) }>1m</button>
      <button onClick = {() => updatePlotTimeWindow(calculateNewStartDate(1,0,0)) }>1y</button>
      <TimeframePlot inputLabels={labels} inputData={dataValues} labelCode={objectContent.code}/>
    </>
  
    )
  }

  function updatePlotTimeWindow (newDate){
    sendRequestUpdateAppState(appState, setAppState, keyTemp, 'exchangerates/rates/a/'+objectContent.code+'/'+newDate+'/'+objectContent.rates[objectContent.rates.length-1].effectiveDate);
  }

}
export default EntryContainer