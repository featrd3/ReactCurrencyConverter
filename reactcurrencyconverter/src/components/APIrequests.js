
export async function sendRequest (setAppState, requestURL, retries) {
    const url = 'http://api.nbp.pl/api/'+ requestURL;
    const receivedData = await fetch(url)
        .then(result => {
            if(result.ok){result.json()
            .then(data => Array.isArray(data) ? data[0] : data) //NBP tends to return either array with one object, or one object. This line makes sure that later we always use object.
            .then(data => setAppState({data}))}
            else if (retries>0){
                sendRequest (setAppState, requestURL, retries-1)
            }
        });   
    return (receivedData)
}

export async function sendTwoRequests (currencyTable,stateSelector,newDate,setFirstCurrency,setSecondCurrency){
    
    if (stateSelector.selector1 === 1){
        
        return (Promise.all([
            sendRequest(setSecondCurrency,
              'exchangerates/rates/a/'+currencyTable.rates[stateSelector.selector2-1].code+'/'
              +(newDate)+'/'+currencyTable.date,3)
        ]))
    } 
    if (stateSelector.selector2 === 1){
        return (Promise.all([
            sendRequest(setFirstCurrency,
              'exchangerates/rates/a/'+currencyTable.rates[stateSelector.selector1-1].code+'/'
              +(newDate)+'/'+currencyTable.date,3)
        ]))
    } 

    Promise.all([
        sendRequest(setFirstCurrency,
          'exchangerates/rates/a/'+currencyTable.rates[stateSelector.selector1-1].code+'/'
          +(newDate)+'/'+currencyTable.date,3),
          sendRequest(setSecondCurrency,
            'exchangerates/rates/a/'+currencyTable.rates[stateSelector.selector2-1].code+'/'
            +(newDate)+'/'+currencyTable.date,3)
    ])
}

export async function getAllCurrenciesRequest (setCurrencyTable) {
    const url = 'http://api.nbp.pl/api/exchangerates/tables/a';
    const receivedData = fetch(url) 
        .then(result => result.json())
        .then(data => data[0])
        .then(data => setCurrencyTable({rates: [addPLNCurrency(),...data.rates],date: data.effectiveDate}));
    return (receivedData)
}

function addPLNCurrency (){
    let additionalCurrencyPLN = {
        code: "PLN",
        currency: "polski złoty",
        mid: 1
    }
    return(additionalCurrencyPLN)
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



