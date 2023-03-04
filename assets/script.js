var submitBtn = document.getElementById('submitbtn')

function handleSubmittedCity(event) {
    event.preventDefault()

    var inputCityEl = document.querySelector('#inputCity').value.trim()

    if (!inputCityEl) {
        alert('You need to enter a city!');
        return;
    }
    // API URL
    var weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${inputCityEl.toLowerCase()}&appid=9d4a069564580646340081bd6f2b3b20&units=imperial`
    
    fetch(weatherURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            var cityName = data.city.name
            var currentData = data.list[0]
            var currentDate = currentData.dt_txt.split('-')
            var dateReorg = `${currentDate[1]}/${currentDate[2].slice(0,2)}/${currentDate[0]}`
            var currentTemp = `Temp: ${currentData.main.temp}°F`
            var currentWind = `Wind: ${currentData.wind.speed}MPH`
            var currentHumidity = `Humidity: ${currentData.main.humidity}%`
            var forecastArray = [data.list[0], data.list[8],data.list[16],data.list[24],data.list[32]]
            console.log(data)
            console.log(cityName)
            console.log(dateReorg)
            console.log(currentTemp)
            console.log(currentWind)
            console.log(currentHumidity)
            console.log(forecastArray)
        })


    // add to HTML main
    var cityHeaderEl = document.querySelector('#cityheader')
    cityHeaderEl.textContent = inputCityEl.toUpperCase()
    // add to HTML aside
    var prevCitiesEl = document.querySelector('#previouscities')
    prevCitiesEl.innerHTML += `<a href="#" class="list-group-item list-group-item-action active" aria-current="true">${inputCityEl.toUpperCase()}</a>`

}

submitBtn.addEventListener('click', handleSubmittedCity)