
const getTwoCurrencies = ({text, objectContent, keyTemp, removeEntryFunction, appState, setAppState}) => {


    return (
      <div  className="createdEntry">
          Id: {keyTemp}
  
          {Object.entries(objectContent).map(([key,value])=>{
            return (<div key={key}>{key} : {value.toString()}</div>)})}
  
          <button onClick = {() => removeEntryFunction(keyTemp, appState, setAppState) }>X</button>
      </div>
    )
  }

  
  export default getTwoCurrencies