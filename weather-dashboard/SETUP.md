# ===== SETUP INSTRUCTIONS FOR GITHUB PAGES =====

# Weather Dashboard - Setup Guide

## Quick Start

### 1. Get Your API Key (2 minutes)
- Go to: https://openweathermap.org/api
- Click "Sign Up"
- Verify your email
- Copy your API Key from dashboard

### 2. Configure API Key

**Open the live dashboard and set API key in console:**

```javascript
// Paste this in browser console (F12):
localStorage.setItem('weatherAPIKey', 'your_api_key_here');
location.reload();
```

Replace `your_api_key_here` with your actual API key.

### 3. Start Using!

- Search for any city
- Use geolocation button for your location
- Save favorite cities
- View 5-day forecast & air quality

## Configuration Files

- `.env.example` - Example environment variables
- `js/weather-api.js` - API configuration
- `js/weather-ui.js` - UI & interactions

## Deployment Notes

✅ Static files only (no server needed)
✅ Works on GitHub Pages
✅ Works on any web host
✅ API key stored in browser LocalStorage

---

For more details, see: SETUP.md
