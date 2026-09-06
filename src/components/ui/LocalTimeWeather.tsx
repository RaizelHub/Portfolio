import React, { useEffect, useState } from 'react';
import {
  Sun,
  Moon,
  CloudSun,
  CloudMoon,
  Cloud,
  CloudRain,
  CloudDrizzle,
  CloudLightning,
  CloudFog,
  CloudSnow,
} from 'lucide-react';
import { fetchBukidnonWeather, type WeatherData, WEATHER_CACHE_KEY } from '../../lib/weather';
import { useTheme } from '../../context/ThemeContext';

interface LocalTimeWeatherProps {
  className?: string;
  variant?: string;
}

const WeatherIconMap: Record<WeatherData['iconName'], React.ComponentType<{ className?: string }>> = {
  Sun,
  Moon,
  CloudSun,
  CloudMoon,
  Cloud,
  CloudRain,
  CloudDrizzle,
  CloudLightning,
  CloudFog,
  CloudSnow,
};

/**
 * Pure visual weather emblem: dynamically reflects Patpat's live weather
 * with zero text, zero clock numbers, and zero status dots.
 */
export const LocalTimeWeather: React.FC<LocalTimeWeatherProps> = ({ className = '' }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const { activeWeatherMood } = useTheme();

  const loadWeather = async () => {
    try {
      const data = await fetchBukidnonWeather();
      setWeather(data);
    } catch {
      // Graceful fallback
    }
  };

  useEffect(() => {
    loadWeather();

    const timer = setInterval(() => {
      sessionStorage.removeItem(WEATHER_CACHE_KEY);
      loadWeather();
    }, 5 * 60 * 1000);

    const handleFocus = () => {
      if (document.visibilityState === 'visible') {
        loadWeather();
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleFocus);

    return () => {
      clearInterval(timer);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleFocus);
    };
  }, []);

  const IconComponent = weather ? WeatherIconMap[weather.iconName] || CloudSun : CloudSun;

  return (
    <div
      className={`flex items-center justify-center border-2 border-black dark:border-white bg-[var(--surface)] p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 select-none ${className}`}
      title={weather ? `Weather in Patpat: ${weather.condition} (${activeWeatherMood})` : 'Live Weather'}
      aria-label={weather ? `Weather: ${weather.condition}` : 'Live Weather'}
    >
      <IconComponent className="h-4 w-4 text-[var(--accent)] shrink-0" strokeWidth={2.2} />
    </div>
  );
};

export default LocalTimeWeather;
