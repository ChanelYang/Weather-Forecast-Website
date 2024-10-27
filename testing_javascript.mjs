
import { fetchWeatherFromBackend } from "./WeatherForecast.mjs";
import { displayWeather } from "./WeatherForecast.mjs";
import { displayWarning } from "./WeatherForecast.mjs";
//dummy data
const mockWeatherData = {
    name: "New York",
    sys: { country: "US" },
    main: { temp: 25 },
    weather: [{description: "clear sky"}],
    warning: "Typhoon warning" 
};


//displayWeather(mockWeatherData);
//displayWarning(mockWeatherData.warning);

fetchWeatherFromBackend(51.23,12.333)