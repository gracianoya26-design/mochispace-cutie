// ===== UI MODULE =====
class WeatherUI {
  constructor() {
    this.elements = {
      searchInput: document.getElementById('searchInput'),
      searchBtn: document.getElementById('searchBtn'),
      locationBtn: document.getElementById('locationBtn'),
      searchSuggestions: document.getElementById('searchSuggestions'),
      errorMessage: document.getElementById('errorMessage'),
      loadingSpinner: document.getElementById('loadingSpinner'),
      dashboardContent: document.getElementById('dashboardContent'),
      cityName: document.getElementById('cityName'),
      lastUpdate: document.getElementById('lastUpdate'),
      temperature: document.getElementById('temperature'),
      weatherIcon: document.getElementById('weatherIcon'),
      weatherDescription: document.getElementById('weatherDescription'),
      feelsLike: document.getElementById('feelsLike'),
      humidity: document.getElementById('humidity'),
      windSpeed: document.getElementById('windSpeed'),
      pressure: document.getElementById('pressure'),
      visibility: document.getElementById('visibility'),
      uvIndex: document.getElementById('uvIndex'),
      sunrise: document.getElementById('sunrise'),
      hourlyContainer: document.getElementById('hourlyContainer'),
      forecastGrid: document.getElementById('forecastGrid'),
      aqiCircle: document.getElementById('aqiCircle'),
      aqiValue: document.getElementById('aqiValue'),
      aqiDescription: document.getElementById('aqiDescription'),
      pollutantsGrid: document.getElementById('pollutantsGrid'),
      favoriteBtn: document.getElementById('favoriteBtn'),
      favoritesSection: document.getElementById('favoritesSection'),
      favoritesGrid: document.getElementById('favoritesGrid'),
      alertModal: document.getElementById('alertModal'),
      alertTitle: document.getElementById('alertTitle'),
      alertMessage: document.getElementById('alertMessage'),
      closeAlert: document.getElementById('closeAlert')
    };

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.elements.searchBtn.addEventListener('click', () => this.handleSearch());
    this.elements.searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleSearch();
    });
    this.elements.searchInput.addEventListener('input', (e) => this.handleSearchInput(e));
    this.elements.locationBtn.addEventListener('click', () => this.handleLocationClick());
    this.elements.favoriteBtn.addEventListener('click', () => this.handleFavoriteClick());
    this.elements.closeAlert.addEventListener('click', () => this.closeAlert());
  }

  handleSearch() {
    const city = this.elements.searchInput.value.trim();
    if (city) {
      this.searchCity(city);
      this.elements.searchSuggestions.classList.remove('active');
    }
  }

  async handleSearchInput(event) {
    const input = event.target.value.trim();
    if (input.length < 2) {
      this.elements.searchSuggestions.classList.remove('active');
      return;
    }

    try {
      const results = await weatherAPI.searchCity(input);
      this.displaySearchSuggestions(results);
    } catch (error) {
      console.error('Search error:', error);
    }
  }

  displaySearchSuggestions(results) {
    this.elements.searchSuggestions.innerHTML = '';
    results.forEach(result => {
      const item = document.createElement('div');
      item.className = 'suggestion-item';
      item.textContent = `${result.name}, ${result.country}`;
      item.addEventListener('click', () => {
        this.searchCity(result.name, result.lat, result.lon);
        this.elements.searchInput.value = `${result.name}, ${result.country}`;
        this.elements.searchSuggestions.classList.remove('active');
      });
      this.elements.searchSuggestions.appendChild(item);
    });
    this.elements.searchSuggestions.classList.add('active');
  }

  handleLocationClick() {
    if (navigator.geolocation) {
      this.showLoading();
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.getWeatherByCoordinates(latitude, longitude);
        },
        (error) => {
          this.showError('Location access denied. Please enable location services.');
          this.hideLoading();
        }
      );
    } else {
      this.showError('Geolocation is not supported by your browser.');
    }
  }

  handleFavoriteClick() {
    if (!currentLocation) return;

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorited = favorites.some(
      f => f.lat === currentLocation.lat && f.lon === currentLocation.lon
    );

    if (isFavorited) {
      localStorage.setItem(
        'favorites',
        JSON.stringify(favorites.filter(
          f => !(f.lat === currentLocation.lat && f.lon === currentLocation.lon)
        ))
      );
      this.elements.favoriteBtn.classList.remove('favorited');
      this.elements.favoriteBtn.textContent = '🤍';
    } else {
      favorites.push({
        name: currentLocation.name,
        lat: currentLocation.lat,
        lon: currentLocation.lon,
        temp: currentWeatherData?.main?.temp
      });
      localStorage.setItem('favorites', JSON.stringify(favorites));
      this.elements.favoriteBtn.classList.add('favorited');
      this.elements.favoriteBtn.textContent = '❤️';
    }

    this.displayFavorites();
  }

  async searchCity(cityName, lat, lon) {
    if (lat && lon) {
      this.getWeatherByCoordinates(lat, lon);
      return;
    }

    this.showLoading();
    try {
      const results = await weatherAPI.searchCity(cityName);
      if (results.length > 0) {
        const { lat, lon, name } = results[0];
        currentLocation = { name, lat, lon };
        await this.getWeatherByCoordinates(lat, lon);
      } else {
        this.showError('City not found. Please try another search.');
        this.hideLoading();
      }
    } catch (error) {
      this.showError('Error searching for city.');
      this.hideLoading();
    }
  }

  async getWeatherByCoordinates(lat, lon) {
    this.showLoading();
    try {
      const weather = await weatherAPI.getCurrentWeather(lat, lon);
      const forecast = await weatherAPI.getForecast(lat, lon);
      const airQuality = await weatherAPI.getAirQuality(lat, lon);

      currentWeatherData = weather;
      currentForecastData = forecast;
      currentAirQualityData = airQuality;

      currentLocation = currentLocation || {
        name: weather.name,
        country: weather.sys.country,
        lat: weather.coord.lat,
        lon: weather.coord.lon
      };

      this.displayWeather(weather);
      this.displayHourlyForecast(forecast);
      this.displayForecast(forecast);
      if (airQuality) {
        this.displayAirQuality(airQuality);
      }

      this.updateFavoriteButton();
      this.hideLoading();
    } catch (error) {
      this.showError('Error fetching weather data. Please check your API key.');
      this.hideLoading();
    }
  }

  displayWeather(data) {
    const timezone = data.timezone;
    const now = new Date();
    const timestamp = Math.floor(now.getTime() / 1000);
    const localTime = new Date((timestamp + timezone) * 1000);

    this.elements.cityName.textContent = `${data.name}, ${data.sys.country}`;
    this.elements.lastUpdate.textContent = `Last updated: ${localTime.toLocaleTimeString()}`;
    this.elements.temperature.textContent = Math.round(data.main.temp);
    this.elements.weatherIcon.textContent = WeatherAPI.getWeatherIcon(data.weather[0].description);
    this.elements.weatherDescription.textContent = data.weather[0].description;
    this.elements.feelsLike.textContent = `Feels like ${Math.round(data.main.feels_like)}°C`;

    this.elements.humidity.textContent = `${data.main.humidity}%`;
    this.elements.windSpeed.textContent = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;
    this.elements.pressure.textContent = `${data.main.pressure} hPa`;
    this.elements.visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
    this.elements.uvIndex.textContent = 'N/A'; // Would need UV API
    this.elements.sunrise.textContent = WeatherAPI.formatTime(data.sys.sunrise, timezone);

    this.elements.dashboardContent.style.display = 'block';
    this.hideError();
  }

  displayHourlyForecast(data) {
    this.elements.hourlyContainer.innerHTML = '';
    const hourlyData = data.list.slice(0, 8); // Next 24 hours

    hourlyData.forEach(hour => {
      const temp = Math.round(hour.main.temp);
      const icon = WeatherAPI.getWeatherIcon(hour.weather[0].description);
      const time = new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const rainChance = hour.pop ? `${Math.round(hour.pop * 100)}%` : 'N/A';

      const hourlyItem = document.createElement('div');
      hourlyItem.className = 'hourly-item';
      hourlyItem.innerHTML = `
        <div class="hourly-time">${time}</div>
        <div class="hourly-icon">${icon}</div>
        <div class="hourly-temp">${temp}°</div>
        <div class="hourly-rain">💧 ${rainChance}</div>
      `;
      this.elements.hourlyContainer.appendChild(hourlyItem);
    });
  }

  displayForecast(data) {
    this.elements.forecastGrid.innerHTML = '';
    const dailyForecasts = {};

    // Group by day
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = [];
      }
      dailyForecasts[date].push(item);
    });

    // Display 5 days
    Object.entries(dailyForecasts).slice(0, 5).forEach(([date, items]) => {
      const temps = items.map(i => i.main.temp);
      const maxTemp = Math.round(Math.max(...temps));
      const minTemp = Math.round(Math.min(...temps));
      const icon = WeatherAPI.getWeatherIcon(items[0].weather[0].description);
      const description = items[0].weather[0].main;
      const rainChance = items[0].pop ? `${Math.round(items[0].pop * 100)}%` : '0%';
      const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });

      const forecastCard = document.createElement('div');
      forecastCard.className = 'forecast-card';
      forecastCard.innerHTML = `
        <div class="forecast-day">${dayName}</div>
        <div class="forecast-icon">${icon}</div>
        <div class="forecast-temps">
          <span class="forecast-temp-max">${maxTemp}°</span>
          <span class="forecast-temp-min">${minTemp}°</span>
        </div>
        <div class="forecast-description">${description}</div>
        <div class="forecast-rain">💧 ${rainChance}</div>
      `;
      this.elements.forecastGrid.appendChild(forecastCard);
    });
  }

  displayAirQuality(data) {
    const aqi = data.list[0].main.aqi;
    const components = data.list[0].components;

    const aqiColor = WeatherAPI.getAQIColor(aqi);
    const aqiDesc = WeatherAPI.getAQIDescription(aqi);

    this.elements.aqiCircle.style.background = aqiColor;
    this.elements.aqiValue.textContent = aqi;
    this.elements.aqiDescription.textContent = aqiDesc;

    // Display major pollutants
    this.elements.pollutantsGrid.innerHTML = '';
    const pollutants = [
      { name: 'CO', value: components.co, unit: 'μg/m³' },
      { name: 'NO₂', value: components.no2, unit: 'μg/m³' },
      { name: 'O₃', value: components.o3, unit: 'μg/m³' },
      { name: 'PM2.5', value: components.pm2_5, unit: 'μg/m³' }
    ];

    pollutants.forEach(p => {
      const card = document.createElement('div');
      card.className = 'pollutant-card';
      card.innerHTML = `
        <div class="pollutant-name">${p.name}</div>
        <div class="pollutant-value">${p.value.toFixed(2)}</div>
        <div class="pollutant-unit">${p.unit}</div>
      `;
      this.elements.pollutantsGrid.appendChild(card);
    });
  }

  displayFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.length === 0) {
      this.elements.favoritesSection.style.display = 'none';
      return;
    }

    this.elements.favoritesSection.style.display = 'block';
    this.elements.favoritesGrid.innerHTML = '';

    favorites.forEach(fav => {
      const card = document.createElement('div');
      card.className = 'favorite-card';
      card.innerHTML = `
        <div class="favorite-city">${fav.name}</div>
        <div class="favorite-temp">${Math.round(fav.temp)}°C</div>
        <button class="favorite-remove" data-lat="${fav.lat}" data-lon="${fav.lon}">Remove</button>
      `;

      card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('favorite-remove')) {
          currentLocation = { name: fav.name, lat: fav.lat, lon: fav.lon };
          this.getWeatherByCoordinates(fav.lat, fav.lon);
        }
      });

      card.querySelector('.favorite-remove').addEventListener('click', (e) => {
        e.stopPropagation();
        localStorage.setItem(
          'favorites',
          JSON.stringify(favorites.filter(f => !(f.lat === fav.lat && f.lon === fav.lon)))
        );
        this.displayFavorites();
      });

      this.elements.favoritesGrid.appendChild(card);
    });
  }

  updateFavoriteButton() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorited = favorites.some(
      f => f.lat === currentLocation.lat && f.lon === currentLocation.lon
    );

    if (isFavorited) {
      this.elements.favoriteBtn.classList.add('favorited');
      this.elements.favoriteBtn.textContent = '❤️';
    } else {
      this.elements.favoriteBtn.classList.remove('favorited');
      this.elements.favoriteBtn.textContent = '🤍';
    }
  }

  showLoading() {
    this.elements.loadingSpinner.classList.add('active');
    this.elements.dashboardContent.style.display = 'none';
    this.hideError();
  }

  hideLoading() {
    this.elements.loadingSpinner.classList.remove('active');
  }

  showError(message) {
    this.elements.errorMessage.textContent = message;
    this.elements.errorMessage.classList.add('active');
  }

  hideError() {
    this.elements.errorMessage.classList.remove('active');
  }

  showAlert(title, message) {
    this.elements.alertTitle.textContent = title;
    this.elements.alertMessage.textContent = message;
    this.elements.alertModal.classList.add('active');
  }

  closeAlert() {
    this.elements.alertModal.classList.remove('active');
  }
}

// Initialize UI
const ui = new WeatherUI();

// Load favorites on page load
window.addEventListener('load', () => {
  ui.displayFavorites();
});
