const form = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const timeImg = document.querySelector('img.time-img');
const icon = document.querySelector('.icon img');


const updateUI = (data) => {
    console.log(data);
    // we need the details of the data sent to us from the api, and which we can find in our console
    const cityData = data.cityData;
    const weatherData = data.weatherData;

    // destructuring - const { cityData, weatherData } = data;

    // updating details
    details.innerHTML = `
        <h5 class="location">${cityData.EnglishName}</h5>
                    <div class="condition">${weatherData.WeatherText}</div>
                    <div class="temp">
                        <span>${weatherData.Temperature.Metric.Value}</span>
                        <span>&deg;C</span>
                    </div>
    `
    card.style.display = 'block';

    // updating images/icons
    const iconSrc = `icons/${weatherData.WeatherIcon}.svg`
    icon.setAttribute('src', iconSrc);

    let timeSrc = null;
    if (weatherData.IsDayTime){
        timeSrc = 'day.svg'
    } else {
        timeSrc = 'night.svg'
    }
        
    timeImg.setAttribute('src', timeSrc);
   

}

const updateCity = async (citySearch) => {

    // the data gotten from the getCity async is resolved (no waiting promises) and stored in the variable. getweather uses it
    // if i was using a function call outside of the async, i'll have to tack on then to resolve a final promise and get the data 
    const cityData = await getCity(citySearch);
    const weatherData = await getWeather(cityData.Key);
    
    return {
        cityData: cityData,
        weatherData: weatherData
    }; // or return {cityData, weatherData} //shortcut notation when the property key and valu have the same name

}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const citySearch = form.city.value.trim();
    
    // the updateCity call taking in the city search fires on submit. The function defined above it receives the search and executes  it
    updateCity(citySearch)
        .then(data => updateUI(data))// the updatecity is the call of a promise and the data passed in as parameter is the resolved value received 
        .catch(err => console.log(err));

    form.reset();
})

