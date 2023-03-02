var submitBtn = document.getElementById('submitbtn')

function handleSubmittedCity(event) {
    event.preventDefault()

    var inputCityEl = document.querySelector('#inputCity').value.trim()

    if (!inputCityEl){
        alert('You need to enter a city!');
    return;
    }

    var weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${inputCityEl.toLowerCase()}&appid=9d4a069564580646340081bd6f2b3b20`
    console.log(weatherURL)

    var cityHeaderEl = document.querySelector('#cityheader')
    cityHeaderEl.textContent = inputCityEl.toUpperCase()

    var prevCitiesEl = document.querySelector('#previouscities')
    prevCitiesEl.innerHTML += `<a href="#" class="list-group-item list-group-item-action active" aria-current="true">${inputCityEl.toUpperCase()}</a>`

}

submitBtn.addEventListener('click', handleSubmittedCity)