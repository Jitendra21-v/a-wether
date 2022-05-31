
const apikey = "e1f2be0e794f9d6714e9e47e6790bec6";

//var text= documet.getElementById("display");
const main = document.getElementById("main");
const form= document.getElementById("form");
const search = document.getElementById("search");

const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeather(city) {
    const resp = await fetch(url(city), { origin: "cors" });
    const respData = await resp.json();

   
    addWeatherToPage(respData);

    document.body.style.backgroundImage =
    "url('https://source.unsplash.com/1600x900/?" + city+ "')";
}
//getWeather('dehradun');
function addWeatherToPage(data){
    const forecast=data.weather[0].main;

    const temp= KtoC(data.main.temp);
    const weather=document.createElement("div");
    weather.classList.add('weather');
    weather.innerHTML=`
    
    <h2>${temp}&#176C 
    <small>${forecast}</small></h2>
    <small>
     <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
     <small>
     <p>in ${search.value}</p>
    `;

    //cleanup
    main.innerHTML="";
    main.appendChild(weather);
}
function KtoC(K){
    return (K-273).toFixed(2);
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const city=search.value;
    if(city){
        getWeather(city)
    }
})