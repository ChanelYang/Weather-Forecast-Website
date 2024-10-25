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
        loadingElement.innerText = 'Error fetching weather data. Please report to the developers.';
    }
}

//function to display the weather data on frontend client side
export function displayWeather(weatherData) {
    loadingElement.style.display = 'none'; //the loading message is hidden
    weatherDisplay.style.display = 'block'; //display the weather data

    //display weather details
    locationElement.innerText = `Location:  ${weatherData.name}, ${weatherData.sys.country}`;
    temperatureElement.innerText = `Temperature: ${weatherData.main.temp} °C`;
    weatherDescElement.innerText = `Conditions: ${weatherData.weather[0].description}`;
}

//function to display sever weather warnings
export function displayWarning(alerts) {
    const warningMessage = alerts[0].description
    warningElement.innerText = `Severe weather warning: ${warningMessage}`;
}

//main function. get location and fetch data
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            fetchWeatherFromBackend(lat, lon);
        }, () => {
            loadingElement,innerText = 'Unable to access your location.';
        });
    } else {
        loadingElement.innerText = 'Geolocation is not supported.';
    }
}

getLocation();