
const EntryContainer = ({text, objectContent, keyTemp, removeEntryFunction, appState, setAppState}) => {


  return (
    <div  className="createdEntry">
        Id: {keyTemp}

        {handleContentIsObject(objectContent)}

        <button onClick = {() => removeEntryFunction(keyTemp, appState, setAppState) }>X</button>
    </div>
  )
}

function handleContentIsObject (valueToMap){
  return (
    <div>
      {Object.entries(valueToMap).map(([key,value])=>{
        return (<div key={key}>{key} : 
          {Array.isArray(value) ? 
            handleContentIsObject(value[0]) : 
            value.toString()}</div>)})}
    </div>
    )
}

export default EntryContainer

