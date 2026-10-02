const WEATHER_API_KEY = 'c8c26a9e9a70d035d10313f3f21eb2c0'; 

async function getAldrichParkWeather() {
  const lat = 33.6461;
  const lon = -117.8427;
  
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`;

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`OpenWeather API returned status: ${response.status}`);
    }

    const data = await response.json();
    const currentTemp = Math.round(data.main.temp); 
    
    // FIX: Safely parse array index [0] from the payload stream
    const conditions = data.weather[0].description;   
    document.getElementById("weather").innerText=currentTemp; 
    
    console.log(`Live Stream Compiler Success: ${currentTemp}°F, ${conditions}`);
    return { temp: currentTemp, desc: conditions };

  } catch (error) {
    console.error("Failed to parse down open weather sequence:", error);
  }
}

getAldrichParkWeather();
