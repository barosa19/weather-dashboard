var submitBtn = document.getElementById('submitbtn')
var prevCitiesEl = document.querySelector('#previouscities')

//goes through the data from API and creates an object with the data needed
function filterData(objj) {
    var dateGrabbed = objj.dt_txt.split('-')
    var dateReorg = `${dateGrabbed[1]}/${dateGrabbed[2].slice(0, 2)}/${dateGrabbed[0]}`
    var APIicon = objj.weather[0].icon
    var iconSrc = `http://openweathermap.org/img/wn/${APIicon}.png`
    var tempGrabbed = `Temp: ${objj.main.temp}°F`
    var windGrabbed = `Wind: ${objj.wind.speed}MPH`
    var humidityGrabbed = `Humidity: ${objj.main.humidity}%`
    let neededData = {
        date: dateReorg,
        icon: iconSrc,
        temp: tempGrabbed,
        wind: windGrabbed,
        humidity: humidityGrabbed
    }
    return neededData
}

function printCurrentdata(name, obj) {
    // grabs data for current weather and corresponding HTL elements
    var dataGrabbed = filterData(obj)
    var cwCardEl = document.querySelector('#currentWeatherCard')
    var currentWeatherEl = document.querySelector('#currentWeatherH')
    var currentWeatherUlEl = document.querySelector('#currentWeatherUl')
    cwCardEl.classList.add('card')
    // adds current weather data to HTML
    currentWeatherEl.innerHTML = `<h3>${name} (${dataGrabbed.date}) <img src=${dataGrabbed.icon}><h3>`
    currentWeatherUlEl.innerHTML = `<li>${dataGrabbed.temp}</li> 
                                    <li>${dataGrabbed.wind}</li>
                                    <li> ${dataGrabbed.humidity}</li>`
}

function printForecastdata(arr) {
    var forecastEl = document.getElementById("forecast")
    forecastEl.innerHTML = ""
    var titleEl = document.createElement('h3')
    titleEl.textContent = '5-Day Forecast:'
    forecastEl.appendChild(titleEl)
    // runs through array of objects for next 5 days andd adds it to HTML    
    for (let i = 0; i < arr.length; i++) {
        var forecastData = filterData(arr[i])
        var cardDiv = document.createElement("div")
        cardDiv.classList.add('card', 'col-2')
        var cardBodyDiv = document.createElement("div")
        cardBodyDiv.classList.add('card-body')
        var headerEl = document.createElement('h6')
        headerEl.textContent = forecastData.date
        var listEl = document.createElement('ul')
        listEl.setAttribute('class', 'list-group list-group-flush')
        listEl.setAttribute('style', 'list-style-type: none')
        listEl.innerHTML = `<li><img src =${forecastData.icon}></li>
                            <li>${forecastData.temp}</li>
                            <li>${forecastData.wind}</li>
                            <li> ${forecastData.humidity}</li>`
        cardBodyDiv.appendChild(headerEl)
        cardBodyDiv.appendChild(listEl)
        forecastEl.appendChild(cardDiv).appendChild(cardBodyDiv)
    }
}

// adds user input to URL and checks to see if there is a healthy response to print data on the page
function checkApi(inputVal) {

    var weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${inputVal.toLowerCase()}&appid=9d4a069564580646340081bd6f2b3b20&units=imperial`

    fetch(weatherURL)
        .then(function (response) {
            if (!response.ok) {
                throw alert('You need to enter a valid city!')
            }
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            var cityName = data.city.name
            var currentData = data.list[0]
            var forecastArray = [data.list[7], data.list[15], data.list[23], data.list[31], data.list[38]]

            printCurrentdata(cityName, currentData)

            printForecastdata(forecastArray)

            // adds searched city to HTML aside 
            prevCitiesEl.innerHTML += `<li class="list-group-item list-group-item-action active pb-2 prevCity" aria-current="true" data-city=${inputVal}>${inputVal}</li>`

        })
}

// checks to see if the user inputted something and then runs it through the server API to see if it's there
function handleSubmittedCity(event) {
    event.preventDefault()
    var inputCityEl = document.querySelector('#inputCity').value.trim()
    // Alerts user if search is empty
    if (!inputCityEl) {
        alert('You need to enter a city!');
        return;
    }

    checkApi(inputCityEl)
}


submitBtn.addEventListener('click', handleSubmittedCity)

prevCitiesEl.addEventListener('click', function(event){
    if (event.target && event.target.nodeName === 'LI') {
        const text = event.target.textContent;
        checkApi(text);
      }
    })
