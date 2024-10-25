from flask import Flask, request, jsonify
import requests
from plyer import notification
app = Flask(__name__)
API_key = "8a691e21287b4229f68d9f12641eb5e3"

def Weather_data(latitude, longitude):
    url = f"http://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={API_key}&units=metric"
    response = requests.get(url)
    data = response.json()
    if data["cod"] != "404":
        return data
    else:
        return None

def Check_extreme_weather(data):
    weather_condition = data["weather"][0]["description"]
    temp = data["main"]["temp"]
    extreme_weather = False
    alert_message = """!!!Extreme Weather Alert!!!
    """
    if "thunderstorm" in weather_condition.lower() or "heavy rain" in weather_condition.lower():
        alert_message += f"SEVERE WEATHER: {weather_condition}."