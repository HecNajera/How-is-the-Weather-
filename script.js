const apiKey = "e2cb4e4f79fa6388be9a44744eef4b11";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

var searchBox = document.querySelector(".search input");
var searchBtn = document.querySelector(".search button");

const card = document.querySelector(".card");
const weatherIcon = document.querySelector(".weather-icon");
const weather = document.querySelector(".weather");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();
    var country = data.sys.country;

    if(response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector("#errorText").innerText = "Invalid city name";
        weather.style.display = "none";
    } else if(data.name == undefined) {
        document.querySelector(".error").style.display = "block";
        document.querySelector("#errorText").innerText = "Type a city name";
        weather.style.display = "none";
    } else {
        document.querySelector(".error").style.display = "none";
        weather.style.display = "block";
    }

    document.querySelector(".city").innerHTML = `${data.name}, ${country}`;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector("#weatherMain").innerHTML = data.weather[0].main;

    if(data.weather[0].main == "Clouds"){
        card.style.background = "linear-gradient(135deg, #00b0ff, #0f4753)";
        weatherIcon.src = "./images/clouds.png";
        card.style.transitionDuration = "1s";
    }

    if(data.weather[0].main == "Clear"){
        card.style.background = "linear-gradient(135deg, #00d6ff, #17a5ad)";
        weatherIcon.src = "./images/clear.png";
    }

    if(data.weather[0].main == "Rain"){
        card.style.background = "linear-gradient(135deg, #757DA4, #AFC0C4)";
        weatherIcon.src = "./images/rain.png";
    }

    if(data.weather[0].main == "Drizzle"){
        card.style.background = "linear-gradient(135deg, #8fb1ad, #348d93)";
        weatherIcon.src = "./images/drizzle.png";
    }

    if(data.weather[0].main == "Mist"){
        card.style.background = "linear-gradient(135deg, #A3CBCD, #507a76)";
        weatherIcon.src = "./images/mist.png";
    }

    if(data.weather[0].main == "Snow"){
        card.style.background = "linear-gradient(135deg, #8FA9C6, #CADAEA)";
        weatherIcon.src = "./images/snow.png";
        card.style.transitionDuration = "1s";
    }

    weather.style.display = "block"
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})

searchBox.addEventListener("keyup", function(event) {
    if (event.key === "Enter" || event.keyCode === 13) {
        searchBtn.click();
    }
});