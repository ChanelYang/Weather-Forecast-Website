from flask import Flask, request, jsonify
import requests
from plyer import notification
app = Flask(__name__)
API_key = "8a691e21287b4229f68d9f12641eb5e3"

def get_weather_data(latitude, longitude):
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
    alert_message = "!!!Extreme Weather Alert!!!"
    alert_message_width = len(alert_message)
    if "thunderstorm" in weather_condition.lower() or "heavy rain" in weather_condition.lower():
        alert_message_weather = f"SEVERE WEATHER: {weather_condition}."
        final_alert_message = f"{alert_message}\n{alert_message_weather.center(alert_message_width)}"
        extreme_weather = True
    if temp > 37 or temp < -5:
        alert_message_temp = f"EXTREME TEMPERATURE: {temp}°C"
        final_alert_message = f"{alert_message}\n{alert_message_temp.center(alert_message_width)}"
        extreme_weather = True
    if extreme_weather:
        return final_alert_message
    else:
        return "No extreme weather detected."
    
def Location():
    data = request.get_json()
    latitude = data.get("latitude")
    longitude = data.get("longitude")
    weather_data = get_weather_data(latitude, longitude)
    if weather_data:
        alert_message = Check_extreme_weather(weather_data)
        return jsonify({"message": alert_message})
    else:
        return jsonify({"message": "Weather data not found:(."}), 404
    
if __name__ == "__main__":
    app.run(debug=True)