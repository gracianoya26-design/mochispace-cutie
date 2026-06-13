# 🌤️ Weather Dashboard - Mochi Space

A beautiful, feature-rich weather dashboard built as part of the Mochi Space project. Get real-time weather data, forecasts, air quality information, and more.

## ✨ Features

### Current Weather Display
- 🌡️ Real-time temperature and "feels like" data
- 📍 Current location or search any city
- 🎨 Beautiful weather icons and descriptions
- 📊 Detailed weather metrics (humidity, wind speed, pressure, visibility)

### Forecasting
- 📅 5-day weather forecast
- ⏰ Hourly forecast for the next 24 hours
- 🌧️ Precipitation chance display
- 📈 Temperature trends

### Air Quality Monitoring
- 🌍 Air Quality Index (AQI) display
- 💨 Detailed pollutant measurements
  - CO (Carbon Monoxide)
  - NO₂ (Nitrogen Dioxide)
  - O₃ (Ozone)
  - PM2.5 (Fine Particulate Matter)
- 🎯 Color-coded AQI levels

### Location Features
- 🔍 Search weather by city name
- 📍 Auto-detect location using geolocation
- ❤️ Save favorite locations
- 💾 Recently searched cities

### User Experience
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎨 Mochi Space themed color palette
- ⚡ Fast and smooth animations
- 🌙 Dark/light theme support (extensible)
- 📧 Weather alerts for extreme conditions

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **API**: OpenWeatherMap API (free tier available)
- **Storage**: LocalStorage for favorites and preferences
- **Geolocation**: Browser Geolocation API

## 🚀 Getting Started

### Prerequisites

1. **OpenWeatherMap API Key**
   - Sign up at [https://openweathermap.org/api](https://openweathermap.org/api)
   - Get your free API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/gracianoya26-design/mochispace-cutie.git
cd mochispace-cutie/weather-dashboard
```

2. Add your API key:
   - Open `js/weather-api.js`
   - Replace `'YOUR_OPENWEATHERMAP_API_KEY'` with your actual API key

```javascript
const apiKey = 'YOUR_ACTUAL_API_KEY_HERE';
```

3. Open `index.html` in your browser or use a local server:
```bash
python -m http.server 8000
# Visit http://localhost:8000/weather-dashboard
```

## 📖 Usage

### Search for Weather
1. Type a city name in the search box
2. Select from suggestions or press Enter
3. View current weather and forecasts

### Use Your Location
1. Click the 📍 location button
2. Allow browser location access
3. Dashboard loads weather for your location

### Save Favorites
1. Click the 🤍 heart icon
2. Favorite is saved locally
3. Click heart icon again to unfavorite
4. Access favorites from the favorites section

## 📁 Project Structure

```
weather-dashboard/
├── index.html                      # Main HTML file
├── css/
│   └── weather-dashboard.css       # Complete styling
├── js/
│   ├── weather-api.js             # OpenWeatherMap API wrapper
│   ├── weather-ui.js              # UI rendering and interactions
│   ├── weather-geolocation.js     # Geolocation handling
│   └── weather-storage.js         # LocalStorage management
└── README.md                       # This file
```

## 🔑 API Key Management

### Why You Need an API Key
The OpenWeatherMap API requires authentication. Free tier includes:
- Current weather for unlimited cities
- 5-day forecast
- Air quality data
- 60 calls/minute rate limit

### Setting Your API Key

**Option 1: Direct in Code**
```javascript
// In js/weather-api.js
const apiKey = 'your_api_key_here';
```

**Option 2: LocalStorage (Recommended)**
```javascript
// In browser console
localStorage.setItem('weatherAPIKey', 'your_api_key_here');
```

## 🎨 Customization

### Change Color Scheme
Edit CSS variables in `css/weather-dashboard.css`:

```css
:root {
  --primary-color: #ff6b9d;      /* Primary pink */
  --secondary-color: #c44569;    /* Secondary rose */
  --accent-color: #ffa502;       /* Orange accent */
  /* ... more variables ... */
}
```

### Add Temperature Unit Toggle
Extend the UI to support Fahrenheit:

```javascript
const temperatureUnit = 'metric'; // 'metric' for Celsius, 'imperial' for Fahrenheit
```

## 📊 Data Structure

### Weather Object
```javascript
{
  name: "London",
  country: "GB",
  coord: { lat: 51.51, lon: -0.13 },
  weather: [{ main: "Clouds", description: "overcast clouds" }],
  main: {
    temp: 15.2,
    feels_like: 14.8,
    humidity: 72,
    pressure: 1013
  },
  wind: { speed: 4.5 },
  visibility: 10000,
  sys: { sunrise: 1234567890, sunset: 1234611234 },
  timezone: 3600
}
```

### Favorite Object
```javascript
{
  name: "Paris",
  lat: 48.8566,
  lon: 2.3522,
  temp: 18.5
}
```

## 🌐 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## ⚠️ Troubleshooting

### "API Key Invalid" Error
- Verify your API key is correct
- Check that your OpenWeatherMap account is active
- Ensure you're using the free tier key

### "Location Access Denied"
- Check browser location permissions
- Allow location access when prompted
- In browser settings, ensure location is allowed

### "City Not Found"
- Try alternate city names
- Check spelling
- Use city name with country code (e.g., "Paris, FR")

### No Data Displayed
- Check console for JavaScript errors
- Verify API key is set correctly
- Check internet connection
- Clear browser cache and reload

## 📝 API Documentation

For more information about OpenWeatherMap API:
- [Current Weather API](https://openweathermap.org/current)
- [5 Day Forecast](https://openweathermap.org/forecast5)
- [Air Quality API](https://openweathermap.org/api/air-pollution)
- [Geocoding API](https://openweathermap.org/api/geocoding-api)

## 🔒 Privacy

- Favorites are stored locally in your browser
- Location data is sent only to OpenWeatherMap
- No personal data is stored on servers
- You can clear all data anytime

## 🤝 Contributing

Feel free to fork and submit pull requests!

## 📄 License

MIT License - Feel free to use in your projects

## 🙏 Credits

- **Weather Data**: [OpenWeatherMap](https://openweathermap.org)
- **Design**: Mochi Space Project
- **Developer**: Graciana Echa Radiva

## 💬 Support

For issues or questions:
1. Check the troubleshooting section
2. Review API documentation
3. Open an issue on GitHub

---

**Made with 💕 by the Mochi Space Team**

🌤️ *Get real-time weather updates in your coziest dashboard.*
