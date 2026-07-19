console.log("Weather Dashboard JS chargé");



const form = document.getElementById("weatherForm");

const cityInput = document.getElementById("cityInput");

const errorMessage = document.getElementById("errorMessage");

const loading = document.getElementById("loading");

const result = document.getElementById("result");



const cityName = document.getElementById("cityName");

const country = document.getElementById("country");

const countryDisplay = document.getElementById("countryDisplay");

const temperature = document.getElementById("temperature");

const wind = document.getElementById("wind");

const condition = document.getElementById("condition");





form.addEventListener("submit", async function(event){


    event.preventDefault();



    const city = cityInput.value.trim();



    errorMessage.textContent = "";

    result.classList.add("hidden");



    if(city === ""){


        errorMessage.textContent =
        "Veuillez entrer une ville.";


        return;

    }



    loading.classList.remove("hidden");



    try{


        // Recherche de la ville

        const geoResponse = await fetch(

            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=fr&format=json`

        );



        const geoData = await geoResponse.json();



        if(!geoData.results){


            throw new Error("NOT_FOUND");


        }



        const place = geoData.results[0];




        // Recherche météo

        const weatherResponse = await fetch(

            `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current_weather=true`

        );



        const weatherData = await weatherResponse.json();



        const current = weatherData.current_weather;




        // Affichage



        cityName.textContent =

        "📍 " + place.name;



        country.textContent =

        place.country;



        countryDisplay.textContent =

        place.country;



        temperature.textContent =

        current.temperature + " °C";



        wind.textContent =

        current.windspeed + " km/h";



        condition.textContent =

        getWeatherDescription(current.weathercode);




        result.classList.remove("hidden");



    }



    catch(error){


        console.log(error);



        errorMessage.textContent =

        "Ville introuvable ou problème de connexion.";



    }



    finally{


        loading.classList.add("hidden");


    }



});







function getWeatherDescription(code){


    const descriptions = {


        0:"☀️ Ciel dégagé",

        1:"🌤️ Principalement clair",

        2:"⛅ Partiellement nuageux",

        3:"☁️ Nuageux",

        45:"🌫️ Brouillard",

        48:"🌫️ Brouillard givrant",

        51:"🌦️ Bruine légère",

        61:"🌧️ Pluie légère",

        63:"🌧️ Pluie modérée",

        65:"⛈️ Forte pluie",

        71:"❄️ Neige",

        80:"🌦️ Averses",

        95:"⚡ Orage"


    };



    return descriptions[code] || "🌍 Conditions inconnues";


}