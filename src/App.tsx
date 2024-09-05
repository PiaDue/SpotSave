import React from 'react';
import MapComponent from './MapComponent';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Google Maps in React TypeScript</h1>
      <MapComponent />
    </div>
  );
}

export default App;
