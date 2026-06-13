// ===== WEATHER API MODULE =====
class WeatherAPI {
  constructor(apiKey = 'YOUR_OPENWEATHERMAP_API_KEY') {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.openweathermap.org';
    this.weatherData = null;
    this.airQualityData = null;
  }

  // Get current weather and forecast
  async getCurrentWeather(lat, lon) {
    try {
      const response = await fetch(
        `${this.baseURL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`
      );

      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }

      this.weatherData = await response.json();
      return this.weatherData;
    } catch (error) {
      console.error('Error fetching weather:', error);
      throw error;
    }
  }

  // Get 5-day forecast
  async getForecast(lat, lon) {
    try {
      const response = await fetch(
        `${this.baseURL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`
      );

      if (!response.ok) {
        throw new Error(`Forecast API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching forecast:', error);
      throw error;
    }
  }

  // Get air quality data
  async getAirQuality(lat, lon) {
    try {
      const response = await fetch(
        `${this.baseURL}/data/2.5/air_quality?lat=${lat}&lon=${lon}&appid=${this.apiKey}`
      );

      if (!response.ok) {
        throw new Error(`Air Quality API error: ${response.status}`);
      }

      this.airQualityData = await response.json();
      return this.airQualityData;
    } catch (error) {
      console.error('Error fetching air quality:', error);
      // Return null if air quality not available
      return null;
    }
  }

  // Search city by name
  async searchCity(cityName) {
    try {
      const response = await fetch(
        `${this.baseURL}/geo/1.0/direct?q=${cityName}&limit=5&appid=${this.apiKey}`
      );

      if (!response.ok) {
        throw new Error(`Geocoding API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error searching city:', error);
      throw error;
    }
  }

  // Reverse geocoding - get city name from coordinates
  async reverseGeocode(lat, lon) {
    try {
      const response = await fetch(
        `${this.baseURL}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${this.apiKey}`
      );

      if (!response.ok) {
        throw new Error(`Reverse geocoding error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      throw error;
    }
  }

  // Get weather alerts
  async getAlerts(lat, lon) {
    try {
      const response = await fetch(
        `${this.baseURL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`
      );

      if (!response.ok) {
        throw new Error(`Alerts API error: ${response.status}`);
      }

      const data = await response.json();
      return data.alerts || [];
    } catch (error) {
      console.error('Error fetching alerts:', error);
      return [];
    }
  }

  // Format Unix timestamp to readable time
  static formatTime(timestamp, timezone = 0) {
    const date = new Date((timestamp + timezone) * 1000);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  // Get weather icon based on condition
  static getWeatherIcon(description) {
    const desc = description.toLowerCase();

    if (desc.includes('clear') || desc.includes('sunny')) return '☀️';
    if (desc.includes('cloud')) return '☁️';
    if (desc.includes('rain')) return '🌧️';
    if (desc.includes('thunder') || desc.includes('storm')) return '⛈️';
    if (desc.includes('snow')) return '❄️';
    if (desc.includes('mist') || desc.includes('fog')) return '🌫️';
    if (desc.includes('wind')) return '💨';
    if (desc.includes('night') || desc.includes('moon')) return '🌙';

    return '🌤️';
  }

  // Get AQI description
  static getAQIDescription(aqi) {
    const descriptions = [
      'Good',
      'Fair',
      'Moderate',
      'Poor',
      'Very Poor'
    ];
    return descriptions[aqi - 1] || 'Unknown';
  }

  // Get AQI color
  static getAQIColor(aqi) {
    const colors = [
      '#51cf66', // Good - Green
      '#ffd43b', // Fair - Yellow
      '#ff922b', // Moderate - Orange
      '#ff6b6b', // Poor - Red
      '#c92a2a'  // Very Poor - Dark Red
    ];
    return colors[aqi - 1] || '#95a5a6';
  }
}

// ===== MAIN INITIALIZATION =====
let weatherAPI;
let currentLocation = null;
let currentWeatherData = null;
let currentForecastData = null;
let currentAirQualityData = null;

// Initialize API with your key
function initializeWeatherAPI() {
  // Note: Replace with your actual OpenWeatherMap API key
  // Sign up at https://openweathermap.org/api
  const apiKey = localStorage.getItem('weatherAPIKey') || 'YOUR_OPENWEATHERMAP_API_KEY';
  weatherAPI = new WeatherAPI(apiKey);
}

initializeWeatherAPI();
