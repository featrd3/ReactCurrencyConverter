import { useState } from "react"


const objectDisplay = ({ onClick, turnOrder }) => {

    return (
      <div className = "turnTable" >
        {turnOrder}
        <button onClick={onClick}>Text</button>
      </div>
    )
}



export default objectDisplay