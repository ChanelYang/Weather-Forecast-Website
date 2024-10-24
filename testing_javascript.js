import { displayWeather } from "./WeatherForecast.js";

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