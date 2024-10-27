//2024.10.25
//References to HTML elements
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const weatherDescElement = document.getElementById('weatherDesc');
const warningElement = document.getElementById('warning');
const weatherDisplay = document.getElementById('weatherDisplay');
const loadingElement = document.getElementById('loadingWeather');

//function to fetch weather data from python backend
async function fetchWeatherFromBackend(lat, lon) {
    console.log("Calling fetch Weather from back end");
    const url = 'http://localhost:5000/location';//backend URL
    
    try {
        const response = await fetch(url, {
            method: 'POST',//the request uses the POST HTTP method
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({latitude: lat, longitude: lon})
        
        }); //initiate a fetch request to the URL
        console.log("request sent to backend")
        const data = await response.json(); //convert the HTTP file received to JSON file
        console.log("response received from backend", data);
        if (response.ok) { //if the response is received
            displayWeather(data);

            if (data.warning && data.warning.length > 0) { 
                console.log("got warning")//if severe weather alerts present
                displayWarning(data.warning);
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
function displayWeather(weatherData) {
    console.log("Calling displayWeather");
    console.log(weatherData);
    loadingElement.style.display = 'none'; //the loading message is hidden
    weatherDisplay.style.display = 'block'; //display the weather data

    //display weather details
    locationElement.innerText = `Location:  ${weatherData.name}, ${weatherData.sys.country}`;
    temperatureElement.innerText = `Temperature: ${weatherData.main.temp} °C`;
    weatherDescElement.innerText = `Conditions: ${weatherData.weather[0].description}`;
    
}

//function to display sever weather warnings
function displayWarning(warning) {
    console.log("calling get warning");
    warningElement.innerText = warning;
}

//main function. get location and fetch data
function getLocation() {
    console.log("Calling get location");

    if (navigator.geolocation) {//check if geolocation is supported
       
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;//get the latitude
            const lon = position.coords.longitude;//get the longitude
            console.log("accessed geolocation");
            fetchWeatherFromBackend(lat, lon);
        }, error => {  // Handle errors (e.g., access denied)
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    loadingElement.innerText = 'Location access denied. Please enable location services.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    loadingElement.innerText = 'Location information is unavailable.';
                    break;
                case error.TIMEOUT:
                    loadingElement.innerText = 'The request to get your location timed out.';
                    break;
                default:
                    loadingElement.innerText = 'An unknown error occurred while fetching location.';
            }
            weatherDisplay.style.display = 'none';  // Hide the weather display when there is an error
        }
        );
    } else {
        loadingElement.innerText = 'Geolocation is not supported by your browser.';
        weatherDisplay.style.display = 'none';  // Hide the weather display when geolocation is not supported
    }
}

//call getlocation function on page load
getLocation();