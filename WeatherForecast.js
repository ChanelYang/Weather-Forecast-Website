//References to HTML elements
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const weatherDescElement = document.getElementById('weatherDesc');
const warningElement = document.getElementById('warning');
const weatherDisplay = document.getElementById('weatherDisplay');
const loadingElement = document.getElementById('loadingWeather');

//function to fetch weather data from python backend
async function fetchWeatherFromBackend(lat, lon) {
    const url = ' ';//need to add weather information backend url here
    
    try {
        const response = await fetch(url); //fetch response from backend
        const data = await response.json(); //convert the HTTP file received to JSON file
    
        if (response.ok) { //if the response is received
            displayWeather(data.weather);

            if (data.alerts.length > 0) { //if severe weather alerts present
                displayWarning(data.alerts);
            }else {
                warningElement.innerText = 'No severe weather warnings.'; //display no warnings
            }
        } else {
            loadingElement.innerText = 'Fail to receive weather information.';
        }
    } catch (error) {

    }

}