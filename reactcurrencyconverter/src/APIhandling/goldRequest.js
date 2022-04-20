
export const goldRequest = () => {

    const [cenaState, setCenaState] = useState({cena: null});
    const [dataState, setDataState] = useState({data: null});
    sendRequestGold(setCenaState,setDataState);


    return(
    <div>
    <div>Cena: {cenaState}</div>
    <br/>
    <div>data: {dataState}</div>
    <br/>
    </div>)
    
      
}

async function sendRequestGold (setCenaState,setDataState) {
    var url = `http://api.nbp.pl/api/cenyzlota`;
    fetch(url).then(response => 
        response.json()).then((data) => {
            setCenaState ((data[0].cena))
            setDataState ((data[0].data))
        }
    )
}