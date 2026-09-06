export type WeatherMood = 'sunny' | 'rainy' | 'cloudy' | 'storm' | 'night';

export interface WeatherData {
  temperatureC: number;
  temperatureF: number;
  apparentTemperatureC: number;
  apparentTemperatureF: number;
  humidity: number;
  isDay: boolean;
  weatherCode: number;
  condition: string;
  mood: WeatherMood;
  iconName: 'Sun' | 'Moon' | 'CloudSun' | 'CloudMoon' | 'Cloud' | 'CloudRain' | 'CloudDrizzle' | 'CloudLightning' | 'CloudFog' | 'CloudSnow';
  fetchedAt: number;
}

export const WEATHER_CACHE_KEY = 'portfolio_patpat_malaybalay_weather_cache_v2';
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes fresh polling

// Patpat, Malaybalay City, Bukidnon coordinates
const LATITUDE = 8.1972;
const LONGITUDE = 125.0619;

export function mapWmoCode(
  code: number,
  isDay: boolean
): { condition: string; iconName: WeatherData['iconName'] } {
  switch (code) {
    case 0:
      return {
        condition: isDay ? 'Clear Sky' : 'Clear Night',
        iconName: isDay ? 'Sun' : 'Moon',
      };
    case 1:
      return {
        condition: isDay ? 'Mainly Clear' : 'Mainly Clear Night',
        iconName: isDay ? 'Sun' : 'Moon',
      };
    case 2:
      return {
        condition: 'Partly Cloudy',
        iconName: isDay ? 'CloudSun' : 'CloudMoon',
      };
    case 3:
      return {
        condition: 'Overcast',
        iconName: 'Cloud',
      };
    case 45:
    case 48:
      return {
        condition: 'Foggy',
        iconName: 'CloudFog',
      };
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return {
        condition: 'Drizzle',
        iconName: 'CloudDrizzle',
      };
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
      return {
        condition: 'Rainy',
        iconName: 'CloudRain',
      };
    case 71:
    case 73:
    case 75:
    case 77:
      return {
        condition: 'Snow',
        iconName: 'CloudSnow',
      };
    case 80:
    case 81:
    case 82:
      return {
        condition: 'Rain Showers',
        iconName: 'CloudRain',
      };
    case 85:
    case 86:
      return {
        condition: 'Snow Showers',
        iconName: 'CloudSnow',
      };
    case 95:
    case 96:
    case 99:
      return {
        condition: 'Thunderstorm',
        iconName: 'CloudLightning',
      };
    default:
      return {
        condition: 'Partly Cloudy',
        iconName: isDay ? 'CloudSun' : 'CloudMoon',
      };
  }
}

export function resolveWeatherMood(code: number, isDay: boolean): WeatherMood {
  if (code >= 95) return 'storm';
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return 'rainy';
  if (!isDay && (code === 0 || code === 1)) return 'night';
  if (code === 0 || code === 1) return 'sunny';
  return 'cloudy'; // 2 (partly cloudy), 3 (overcast), 45, 48 (fog)
}

export async function fetchBukidnonWeather(): Promise<WeatherData> {
  // Check local cache
  try {
    const cachedStr = sessionStorage.getItem(WEATHER_CACHE_KEY);
    if (cachedStr) {
      const cached = JSON.parse(cachedStr) as WeatherData;
      if (Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
        return cached;
      }
    }
  } catch {
    // SessionStorage unavailable or parse error; proceed to fetch
  }

  const endpoint = `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code&timezone=Asia%2FManila`;

  const response = await fetch(endpoint, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Weather fetch failed: ${response.status}`);
  }

  const data = await response.json();
  const current = data.current;

  const tempC = Math.round(current.temperature_2m * 10) / 10;
  const tempF = Math.round((tempC * (9 / 5) + 32) * 10) / 10;
  const apparentC = Math.round(current.apparent_temperature * 10) / 10;
  const apparentF = Math.round((apparentC * (9 / 5) + 32) * 10) / 10;
  const isDay = current.is_day === 1;
  const weatherCode = current.weather_code;
  const { condition, iconName } = mapWmoCode(weatherCode, isDay);
  const mood = resolveWeatherMood(weatherCode, isDay);

  const weatherData: WeatherData = {
    temperatureC: tempC,
    temperatureF: tempF,
    apparentTemperatureC: apparentC,
    apparentTemperatureF: apparentF,
    humidity: current.relative_humidity_2m,
    isDay,
    weatherCode,
    condition,
    mood,
    iconName,
    fetchedAt: Date.now(),
  };

  try {
    sessionStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(weatherData));
  } catch {
    // Ignore storage quota errors
  }

  return weatherData;
}
