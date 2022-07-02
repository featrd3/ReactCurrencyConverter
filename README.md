# Currency converter created using React
Simple currency converter written in React.js with additional use of Chart.js. Data used is fetched from Narodowy Bank Polski (National Bank of Poland) API.

# Motivation
Main purpose behind this project is to learn React.js along with some asynchrous requests, either send automatically by application or on request of user.

# Functionality
  Project uses api requests to fetch data with list of all available currencies to build two <select> elements with each option consisting of every available currency.
  
  Additionaly one more currency is added as option: PLN. Mentioned <select> elements are connected via Java Script, and if one of selectors is about to have the same <option> selected as the other, the JS will switch selected options for both selectors. Selecting currency will display curent exchange rate of given currency to PLN, and selecting both currencies will also generate exchange rate of selected currencies.
  
  When (and if) both selectors have selected currency, user can use "wykres" button to fetch two requests to NBP. Returned data will contain historic exchange rates from last 7 days, but data itself will only be filled with workdays. Upon receiving data, app will calculate exchange rates and save them in state variable.
  
  Upon calcluation of exchange rate from request, app will use chart.js to draw line chart containing exchange rate for received period of time. Also chart will contain three buttons marked as "1w", "1m", and "1y". Pressing any of these buttons will fetch new requests regarding the same currencies, but with time window of one week (this time window is also used by previously mentioned "wykres" button), one month or one year. In order to change displayed currencies, user should change currencies selected in two selectors and use "wykres" button again. Received data will again be with time window of one week.

# Lessons learned
  setState() functions are asynchronous, which can lead to some delays in displayed data. For example: at some point upon sending fetch request, browser would not display updated currency data and would require sending the same request again (state variables were delayed by one step). Learning about this first hand makes it easier  to remember for future projects 
  
  Planning structure of project, including variables and functions used
  
  First experience with Chart.js
  
  
