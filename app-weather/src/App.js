import './App.css';
import { useState, useEffect } from 'react';
import Clear from './img/clear.jpg';
import Cloudy from './img/cloudy.jpg';
import Rainy from './img/rainy.jpg';
import Snow from './img/snow.jpg';
import Overcast from './img/overcast.jpg';
import SearchIcon from '@mui/icons-material/Search';

function App() {
   const [place, setPlace] = useState("new york");
   const [placeInfo, setPlaceInfo] = useState({});

   useEffect(() => {
    handleFetch();
   }, []);

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

     setPlace("");
   };

    

   

  return (
    <div
     className="app"
      style={
        placeInfo.condition?.toLowerCase() === "clear" ||
        placeInfo.condition?.toLowerCase() === "sunny"
        ? {backgroundImage: `url(${Clear})`}
        : placeInfo.condition?.includes('cloudy')
        ? {backgroundImage: `url(${Cloudy})`}
        : placeInfo.condition?.toLowerCase().includes("rainy")
        ? {backgroundImage: `url(${Rainy})`}
        : placeInfo.condition?.toLowerCase().includes("snow")
        ? {backgroundImage: `url(${Snow})`}
        : {backgroundImage: `url(${Overcast})`}
      }
    >
      <div className="search-input">
        <input
         type="text"
         value={place}
         onChange={(e) => setPlace(e.target.value)} 
         />
         <SearchIcon onClick={handleFetch} fontSize="large" className="search-button"/>
        
      </div>
     <div className="weather-container">
        <div className="top-part">
          <h1>{placeInfo.farenheit?.current}° F</h1>
          <div className="condition-high-low">
             <h1>{placeInfo.condition}</h1>
             <h1>{placeInfo.farenheit?.high}° F</h1>
             <h1>{placeInfo.farenheit?.low}° F</h1>
          </div>
        </div>
        <h2> {placeInfo.name}, {placeInfo.country} </h2>
     </div>
    </div>
  );
}

export default App;
