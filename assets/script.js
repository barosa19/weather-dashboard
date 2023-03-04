var submitBtn = document.getElementById('submitbtn')

function grabCurrentdata(name, obj, txt) {
    var currentDate = obj.dt_txt.split('-')
    var dateReorg = `${currentDate[1]}/${currentDate[2].slice(0, 2)}/${currentDate[0]}`
    var icon = obj.weather[0].icon
    var iconSrc = `http://openweathermap.org/img/wn/${icon}.png`
    var currentTemp = `Temp: ${obj.main.temp}°F`
    var currentWind = `Wind: ${obj.wind.speed}MPH`
    var currentHumidity = `Humidity: ${obj.main.humidity}%`

    // add to HTML main
    var cwCardEl = document.querySelector('#currentWeatherCard')
    var currentWeatherEl = document.querySelector('#currentWeatherH')
    var currentWeatherUlEl = document.querySelector('#currentWeatherUl')
    cwCardEl.classList.add('card')
    currentWeatherEl.innerHTML = `<h3>${txt} (${dateReorg}) <img src=${iconSrc}><h3>`
    currentWeatherUlEl.innerHTML = `<li>${currentTemp}</li> 
                                    <li>${currentWind}</li>
                                    <li> ${currentHumidity}</li>`

    // add to HTML aside
    //var prevCitiesEl = document.querySelector('#previouscities')
    //prevCitiesEl.innerHTML += `<a href="#" class="list-group-item list-group-item-action active" aria-current="true">${inputCityEl.toUpperCase()}</a>`
}
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
            var forecastArray = [data.list[0], data.list[8], data.list[16], data.list[24], data.list[32]]
            console.log(forecastArray)

            grabCurrentdata(cityName, currentData, inputVal)

        })
}

function handleSubmittedCity(event) {
    event.preventDefault()

    var inputCityEl = document.querySelector('#inputCity').value.trim()
    // Alerts user if search bar is empty
    if (!inputCityEl) {
        alert('You need to enter a city!');
        return;
    }

    checkApi(inputCityEl)
}


submitBtn.addEventListener('click', handleSubmittedCity)