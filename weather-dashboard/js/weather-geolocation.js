// ===== GEOLOCATION MODULE =====
class GeoLocation {
  constructor() {
    this.supportedCountries = [
      'United States', 'Canada', 'United Kingdom', 'France', 'Germany',
      'Japan', 'Australia', 'India', 'Brazil', 'Mexico'
    ];
  }

  requestLocation(onSuccess, onError) {
    if (!navigator.geolocation) {
      onError('Geolocation is not supported by your browser');
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        onSuccess(latitude, longitude);
      },
      error => {
        let errorMessage = 'Unable to get your location';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied. Please enable in settings.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }
        onError(errorMessage);
      },
      options
    );
  }
}

const geoLocation = new GeoLocation();
