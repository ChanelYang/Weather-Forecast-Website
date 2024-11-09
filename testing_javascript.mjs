
import { fetchWeatherFromBackend } from "./WeatherForecast.mjs";

const mockWeatherData = {
    name: "New York",
    sys: { country: "US" },
    main: { temp: 25 },
    weather: [{description: "clear sky"}],
    warning: "Typhoon warning" 
};


//displayWeather(mockWeatherData);
//displayWarning(mockWeatherData.warning);

fetchWeatherFromBackend(22.545702, 114.008351)