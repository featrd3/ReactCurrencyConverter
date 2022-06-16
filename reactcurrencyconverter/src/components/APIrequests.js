
export async function sendRequest (appState, setAppState, idRequest, requestURL) {
    const url = 'http://api.nbp.pl/api/'+ requestURL;
    var newAppState = [...appState]
    const receivedData = await fetch(url)
        .then(result => result.json())
        .then(data => Array.isArray(data) ? data[0] : data) //NBP tends to return either array with one object, or one object. This line makes sure that later we always use object.
        .then(data => newAppState[idRequest] = {data,id: idRequest})
        .then(_ => setAppState(newAppState ));   
    return (receivedData)
}

export async function getAllCurrenciesRequest (setCurrencyTable) {
    const url = 'http://api.nbp.pl/api/exchangerates/tables/a';
    const receivedData = fetch(url) 
        .then(result => result.json())
        .then(data => data[0])
        .then(data => setCurrencyTable({rates: data.rates,date: data.effectiveDate}));
    return (receivedData)
}

export async function sendRequestUpdateAppState (appState, setAppState, idRequest, requestURL) {
    const url = 'http://api.nbp.pl/api/'+ requestURL;
    let newAppState = [...appState]
    let newId = newAppState.findIndex(object => {return object.id === idRequest})
    const receivedData = fetch(url)
        .then(result => result.json())
        .then(data => Array.isArray(data)? data[0]:data)
        .then(data => (newAppState[newId] = {data,id: idRequest}))
        .then( _  => setAppState(newAppState));
    return (receivedData)
}

export const addObject = (appState, setAppState, idRequest, setIDRequest, requestURL) => {

    sendRequest(appState, setAppState, idRequest, requestURL);
    console.log(appState)
}

