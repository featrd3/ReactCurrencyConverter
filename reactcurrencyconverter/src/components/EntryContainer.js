import TimeframePlot from "./TimeframePlot"
import {sendRequestUpdateAppState} from './APIrequests'

const EntryContainer = ({text, objectContent, keyTemp, removeEntryFunction, appState, setAppState}) => {

  return (
    <div  className="createdEntry">
        Id: {keyTemp}
        <button onClick = {() => removeEntryFunction(keyTemp, appState, setAppState) }>X</button>
        {handleContentIsObject(objectContent)}
    </div>
  )

  function handleContentIsObject (valueToMap){
    return (
      <div>
        {Object.entries(valueToMap).map(([key,value])=>{
          return (
          <div key={key}>
            {key}:  
            {Array.isArray(value) ? 
              handleValueIsArray(value) : 
              value.toString()}
          </div>
          )})}
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
      <button onClick = {() => updatePlotTimeWindow('2022-05-20') }>20.05</button><button onClick = {() => updatePlotTimeWindow('2022-05-25') }>25.05</button>
    <TimeframePlot inputLabels={labels} inputData={dataValues}/></>
    )
  }



  function updatePlotTimeWindow (newDate){
    sendRequestUpdateAppState(appState, setAppState, keyTemp, 'exchangerates/rates/a/'+objectContent.code+'/'+newDate+'/'+objectContent.rates[objectContent.rates.length-1].effectiveDate);

  }

}
export default EntryContainer