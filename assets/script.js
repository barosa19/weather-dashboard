var submitBtn = document.getElementById('submitbtn')

function filterData(objj){
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
    var dataGrabbed= filterData(obj)
    // add to HTML main
    var cwCardEl = document.querySelector('#currentWeatherCard')
    var currentWeatherEl = document.querySelector('#currentWeatherH')
    var currentWeatherUlEl = document.querySelector('#currentWeatherUl')
    cwCardEl.classList.add('card')
    currentWeatherEl.innerHTML = `<h3>${name} (${dataGrabbed.date}) <img src=${dataGrabbed.icon}><h3>`
    currentWeatherUlEl.innerHTML = `<li>${dataGrabbed.temp}</li> 
                                    <li>${dataGrabbed.wind}</li>
                                    <li> ${dataGrabbed.humidity}</li>`

    // add to HTML aside
    //var prevCitiesEl = document.querySelector('#previouscities')
    //prevCitiesEl.innerHTML += `<a href="#" class="list-group-item list-group-item-action active" aria-current="true">${inputCityEl.toUpperCase()}</a>`
}

function printForecastdata(arr){
    for (let i=0; i<arr.length; i++){
        console.log(filterData(arr[i]))
    }
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
            var cityName = data.city.name
            var currentData = data.list[0]
            var forecastArray = [data.list[0], data.list[8], data.list[16], data.list[24], data.list[32]]
            console.log(forecastArray)

            printCurrentdata(cityName, currentData)

            printForecastdata(forecastArray)

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