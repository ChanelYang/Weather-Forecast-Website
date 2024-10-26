from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/location": {"origins": ["http://127.0.0.1:5500"]}})


API_key = "8a691e21287b4229f68d9f12641eb5e3"

@app.route('/location', methods=['POST'])

def Weather_data():
    data = request.get_json()
    latitude = data.get("latitude")
    longitude = data.get("longitude") 
    url = f"http://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={API_key}&units=metric"
    
    response = requests.get(url)
    weather_data = response.json()
    
    if weather_data["cod"] != "404":
        # Check for extreme weather conditions
        warning_message = Check_extreme_weather(weather_data)
        weather_data["warning"] = warning_message  # Add warning message to the response
        return jsonify(weather_data)  # Return the weather data along with the warning
    else:
        return jsonify({"message": "Location not found"}), 404

def Check_extreme_weather(data):
    weather_condition = data["weather"][0]["description"]
    temp = data["main"]["temp"]
    extreme_weather = False
    alert_message =  ""

    # Check for extreme weather conditions
    if "thunderstorm" in weather_condition.lower() or "heavy rain" in weather_condition.lower():
        alert_message += f"Severe weather warning: {weather_condition}."
    elif temp > 40:
        alert_message += f"Heat warning: The temperature is very high at {temp}°C."
    elif temp < -10:
        alert_message += f"Cold warning: The temperature is very low at {temp}°C."

    return alert_message

if __name__ == "__main__":
    app.run(debug=True)
