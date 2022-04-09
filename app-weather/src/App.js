import './App.css';
import { useState } from 'react';

function App() {
   const [place, setPlace] = useState("new york");
   const [placeInfo, setPlaceInfo] = useState({})

   const handleFetch = () => {

     fetch(`http://api.weatherapi.com/v1/forecast.json?key=53bfddbca7c64039a42164127220904&q=${place}&days=1&aqi=no&alerts=no`)
     .then(response => response.json())
     .then(data => setPlaceInfo({
       name: data.location.name,
       country: data.location.country,
       farenheit: {
         current: data.current.temp_f,
         high: data.forecast.forecastday[0].day.maxtemp_f,
         low: data.forecast.forecastday[0].day.mintemp_f,
       },
       condition: data.current.condition.text
     })
     );
   };

    


  return (
    <div className="App">
      <div className="search-input">
        <input
         type="text"
         value={place}
         onChange={(e) => setPlace(e.target.value)} 
         />
        <button onClick={handleFetch}>Search</button>
      </div>
     <div className="weather-container">
        <div className="top-part">
          <h1>{placeInfo.farenheit.current}</h1>
          <div className="condition-high-low">
             <h1>{placeInfo.condition}</h1>
             <h1>{placeInfo.farenheit.hight}</h1>
             <h1>{placeInfo.farenheit.low}</h1>
          </div>
        </div>
        <h2>{placeInfo.name}, {placeInfo.country}</h2>
     </div>
    </div>
  );
}

export default App;
