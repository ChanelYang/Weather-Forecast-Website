from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
API_key = "8a691e21287b4229f68d9f12641eb5e3"

# Flask route to handle weather requests and return general weather information
@app.route('/weather', methods=['POST'])
def weather():
    data = request.get_json()
    latitude = data.get("latitude")
    longitude = data.get("longitude")
    
    # Fetch weather data using coordinates
    weather_data = get_weather_data(latitude, longitude)

    if weather_data:
        return jsonify(weather_data)  # Return all weather data as JSON
    else:
        return jsonify({"message": "Weather data not found"}), 404

# Function to get weather data using latitude and longitude
def get_weather_data(latitude, longitude):
    url = f"http://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={API_key}&units=metric"
    response = requests.get(url)
    data = response.json()

    if response.status_code == 200:
        return data
    else:
        return None

if __name__ == "__main__":
    app.run(debug=True)