
const EntryContainer = ({text, objectContent, keyTemp, removeEntryFunction, appState, setAppState}) => {
  
    return (
      <div  className="createdEntry">
          Id: {keyTemp}
          
          <br/>
          Cena: {objectContent.cena}
          <br/>
          Data: {objectContent.data}
          <br/>
          <button onClick = {() => removeEntryFunction(keyTemp, appState, setAppState) }>X</button>
      </div>
    )
}

export default EntryContainer