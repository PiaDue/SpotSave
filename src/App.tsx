import { useState, useEffect } from "react";
import MapContainer from './MapContainer';
import './App.css';

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [mapID, setMapID] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMapConfig();
  }, []);

  const fetchMapConfig = async () => {
    try {
      const response = await fetch('http://localhost:5001/mapConfig');
      const data = await response.json();
      setApiKey(data.googleMapsApiKey);
      setMapID(data.mapID);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch MapConfig Data.');
      setLoading(false);
    }
  };

  if (loading) return <div>Waiting for Map Config</div>;
  if (error) return <div>{error}</div>;
  if (!apiKey || !mapID) return <div>Missing API Key or Map ID</div>;

  return (
    <div className="App">
      <MapContainer apiKey={apiKey} mapID={mapID} />
    </div>
  );
}

export default App;
