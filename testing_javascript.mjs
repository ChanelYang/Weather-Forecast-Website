import { displayWeather } from "./WeatherForecast.mjs";
import { displayWarning } from "./WeatherForecast.mjs";
//dummy data
const mockWeatherData = {
    name: "New York",
    sys: { country: "US" },
    main: { temp: 25 },
    weather: [{description: "clear sky"}]
};

const mockAlerts = [
    {description : "Typhoon warning"}
];

console.log("Calling displayWeather");
displayWeather(mockWeatherData);
console.log("Calling displayWarning");
displayWarning(mockAlerts);