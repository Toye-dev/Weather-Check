/*

forecast is for interacting with the api

So here I'll be learning async
I'll need a free weather api called Accu weather. Through this we can work with api endpoints to get weather information 
So i'll have two javascript files, for separation of concerns
I'll need "https://via.placeholder.com/400x300" for a placeholder image where the changing card will be
When we create an app at accuweather, I'll be asked to create an app which generates an api key. Most api's will go through this process and its basically for identification purposes
Two things - i. We make a request to an api end point for city info (city code)
            ii. We use that city code to make a second request to a weather conditions api endpoint

    So the site provides a base url, but we need to join it with two query parameters: the apikey and city. The combination makes the endpoint/resource. we concatenate

    note - The first endpoint is a search using its city parameter in the query, and the second endpoint identifies a specific resource (city weather) by ID in its url not query anymore. 
    The API key is used as queries in both to authenticate and authorize the app, but the way the city is identified is different (search by name in the first, by ID in the second).

*/


const apiKey = 'Bf7UyIUpZNqofMDQLv4xAJ6sODOUGYXQ';

//get city information using the api key. here its a query
const getCity = async (city) => {
    const base = 'https://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${apiKey}&q=${city}`; //you forget the amplesand and the url wont work. The query is for the api key and search text
    
    const response = await fetch(base + query);
    const data = await response.json();
    return data[0]; //this is the location information

} 

//getCity('lagos')
  //  .then(data => console.log(data))
    //.catch(err => console.log(err));

/*
getCity('lagos')   //even though await has helped us avoid series of thens, what it still gives us on the outside is still a promise which use a then to get the data out
    .then((data) => {
        return getWeather(data.Key);
    }).then((data) => {
        console.log(data);
    }).catch(err => console.log(err))
*/

// Now we'll get the weather condition using the city data's key(an id).here its a parameter

const getWeather = async (cityId) => {
    const base = 'https://dataservice.accuweather.com/currentconditions/v1/' + cityId;
    const query = `?apikey=${apiKey}`; // the query is for the initial same api key

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0]; //this is the weather result
}

//getWeather('4607');//what i did here is open the getCity's object, pull out the data -(the cityId, data.key) and pass it in to getWeather() directly. but instead i need to chain getWeather() into getCity then access that key
