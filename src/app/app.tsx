import { useEffect, useState } from 'react';
import { components } from './api';

type Weather = components['schemas']['weather'];

export function App() {
  const [date, setDate] = useState<string | undefined>(undefined);
  const [weather, setWeather] = useState<Weather | undefined>(undefined);

  useEffect(() => {
    (async () => {
      if (!date) {
        return;
      }

      const url = `http://localhost:3000/weather/${date}`;

      const response = await fetch(url);
      const weather = (await response.json()) as Weather;

      setWeather(weather);
    })();
  }, [date]);

  return (
    <div className="flex w-full justify-center p-4">
      <div className="flex items-center gap-4">
        <h2 className="text-lg">Please select a date:</h2>
        <input type="date" onChange={(e) => setDate(e.target.value)} />
      </div>
      {JSON.stringify(weather)}
    </div>
  );
}

export default App;
