import { displayData } from "../components/objectDisplayGold";
import { goldRequest } from "./goldRequest";  


const APIhandler = (param, setAppState, appState) => {

    return (
        <div>test
            <br/>
            <br/>
            <button onClick = {() => new goldRequest () } >Zloto</button>
            <br/>
            <br/>
            <button onClick = {() => sendRequestCurrency(setAppState) } >Waluta </button>
            <br/>
            <br/>

        </div>
        
    )

}


async function sendRequestCurrency (setAppState) {
    var url = `http://api.nbp.pl/api/exchangerates/tables/a/today/`;
    fetch(url).then(response => 
            response.json()).then((data) => setAppState ({displayedData: (data[0])})

            )


    };
    

export default APIhandler