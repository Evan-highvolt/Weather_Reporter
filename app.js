
/**
 * @constant {string} apiKey - Clé API nécessaire pour authentifier les requêtes à l'API OpenWeatherMap.
 */
const apiKey = "YOUR-API-CODE";

/**
 * @constant {string} apiURL - URL de base pour accéder à l'API OpenWeatherMap en utilisant des unités métriques.
 */
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");



/**
 * Fonction asynchrone permettant de vérifier la météo d'une ville donnée.
 * @async
 * @function checkWeather
 * @param {string} city - Le nom de la ville pour laquelle vérifier la météo.
 * @returns {Promise<void>} - Aucune valeur de retour explicite.
 */
async function checkWeather(city) {
    const response = await fetch(apiURL + city +`&appid=${apiKey}`);

// Vérification des codes d'erreur (404: non trouvé, 400: requête incorrecte)
    if(response.status === 404 || response.status === 400) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();

        // Affichage des données dans la console pour le débogage
        console.log(data);

        // Mise à jour des éléments HTML avec les données météorologiques
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp)+ "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

// Mise à jour de l'icône météo en fonction de la description principale de la météo
        if(data.weather[0].main === "Clouds") {
            weatherIcon.src = "./images/clouds.png"

        } else if(data.weather[0].main === "Clear") {
            weatherIcon.src = "images/clear.png"
        } else if(data.weather[0].main === "Rain") {
            weatherIcon.src = "images/rain.png"
        } else if(data.weather[0].main === "Dizzle") {
            weatherIcon.src = "images/drizzle.png"
        } else if(data.weather[0].main === "Mist") {
            weatherIcon.src = "images/mist.png"
        }
// Affiche les informations météo et cache l'erreur si présente
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

    }


    
    
}

/**
 * Ajoute un écouteur d'événement au bouton de recherche.
 * Lors du clic, la fonction checkWeather est appelée avec la valeur de l'input.
 */

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})
