import { useState } from "react"


const EntryContainer = ({text, objectContent, keyTemp }) => {
    return (
      <div  className="createdEntry">
          Id: {keyTemp}
          
          <br/>
          Cena: {objectContent.cena}
          <br/>
          Data: {objectContent.data}
      </div>
    )
}



export default EntryContainer