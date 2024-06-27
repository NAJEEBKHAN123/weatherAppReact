import { useState } from "react";
import axios from "axios";

function App() {
  const [city, setcity] = useState('');
  const [Weather, setWeather] = useState(null)
  const [error, setError] = useState(null);

  const apnaKey = 'f8ab698e9d5080de03c48e2b76897510';

  const getWeather = async(city) =>{
   
    try{
   const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apnaKey}`)
   setWeather(response.data)
   console.log(response.data);
    }
    catch (error) {
      setError("City Not found!")
      setWeather(null)
    }
  } 
  const handleSubmit =(e) =>{
    e.preventDefault()
    getWeather(city)
  }

  
  return (
    <div style={styles.container}> 
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" value={city} placeholder="Enter City Name" 
        onChange={(e)=> setcity(e.target.value)} style={styles.input} /><br></br><br></br>
        <button type="submit" style={styles.button}>Get Weather</button>
      </form>
      {error && <p>{error}</p>}
       {Weather && <div>
         <h2>{Weather.name}</h2>
         <p>{Weather.weather[0].description}</p>
         <p>{Math.round((Weather.main.temp)-273.15 )} °C</p>
         <img src={`https:/openweathermap.org/img/wn/${Weather.weather[0].icon}.png`} alt="Weather icon" />
      </div>}
    </div>
  )
}
const styles  = {
  container:{
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItem: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
    border:'1px solid black',
    width: '350px',
  },
  form:{
    marginButton:'10px',
    fontSize:'16px',
    // display: 'flex',
    // flexDirection: 'column',
    // alignItem: 'center'
  },
  input:{
  padding: '10px',
  fontSize: '20px',
  borderRadius: '5px',
  },
  button:{
    padding: '12px 20px',
    cursor: 'pointer',
    backgroundColor:'blue',
    color:'white',
    border:'none',
    borderRadius:'5px'
  },
  

}


export default App

