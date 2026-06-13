// ===== LOCAL STORAGE MODULE =====
class WeatherStorage {
  constructor() {
    this.storageKeys = {
      favorites: 'weather_favorites',
      recent: 'weather_recent_searches',
      preferences: 'weather_preferences',
      apiKey: 'weatherAPIKey'
    };
  }

  // Save favorites
  saveFavorite(city, lat, lon, temp) {
    const favorites = this.getFavorites();
    const exists = favorites.some(f => f.lat === lat && f.lon === lon);

    if (!exists) {
      favorites.push({ city, lat, lon, temp, addedAt: new Date().toISOString() });
      localStorage.setItem(this.storageKeys.favorites, JSON.stringify(favorites));
    }
  }

  // Get favorites
  getFavorites() {
    const data = localStorage.getItem(this.storageKeys.favorites);
    return data ? JSON.parse(data) : [];
  }

  // Remove favorite
  removeFavorite(lat, lon) {
    const favorites = this.getFavorites();
    const filtered = favorites.filter(f => !(f.lat === lat && f.lon === lon));
    localStorage.setItem(this.storageKeys.favorites, JSON.stringify(filtered));
  }

  // Save recent search
  saveRecentSearch(city, lat, lon) {
    const recent = this.getRecentSearches();
    const filtered = recent.filter(r => !(r.lat === lat && r.lon === lon));
    filtered.unshift({ city, lat, lon, searchedAt: new Date().toISOString() });
    localStorage.setItem(this.storageKeys.recent, JSON.stringify(filtered.slice(0, 10)));
  }

  // Get recent searches
  getRecentSearches() {
    const data = localStorage.getItem(this.storageKeys.recent);
    return data ? JSON.parse(data) : [];
  }

  // Save preferences
  savePreferences(preferences) {
    localStorage.setItem(this.storageKeys.preferences, JSON.stringify(preferences));
  }

  // Get preferences
  getPreferences() {
    const data = localStorage.getItem(this.storageKeys.preferences);
    return data ? JSON.parse(data) : {
      unit: 'metric',
      theme: 'light',
      notifications: true
    };
  }

  // Set API key
  setAPIKey(key) {
    localStorage.setItem(this.storageKeys.apiKey, key);
    if (weatherAPI) {
      weatherAPI.apiKey = key;
    }
  }

  // Get API key
  getAPIKey() {
    return localStorage.getItem(this.storageKeys.apiKey);
  }

  // Clear all data
  clearAll() {
    Object.values(this.storageKeys).forEach(key => {
      localStorage.removeItem(key);
    });
  }
}

// Initialize storage
const storage = new WeatherStorage();
