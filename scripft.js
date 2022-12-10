const apiKey = "a5e8aa376fc60bbac7416a608d39cd50";

const cityInput = document.querySelector(".form-control");
const searchBtn = document.querySelector(".btn");

const cityElement = document.querySelector(".city h3");
const tempElement = document.querySelector(".temperature div");
const tempSpan = document.querySelector(".temperature span")
const descElement = document.querySelector(".weather");
const date = document.querySelector('.date');
const weatherIconElement = document.querySelector(".temperature-img");
const weatherContainer = document.querySelector("#weather-data");
const low = document.querySelector('#temp-min');
const high = document.querySelector('#temp-max');


const getWeatherData = async (city) => {

  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const res = await fetch(apiWeatherURL);
  const data = await res.json();

  console.log(data);

  return data;
};

const showWeatherData = async (city) => {
  
    const data = await getWeatherData(city);
  
    if (data.cod === "404") {

      const clearIconElement = document.querySelector(".temperature-img");
      clearIconElement.setAttribute(
        "src",
        `./icons/erro.png`
    
      );

      const clearCity = document.querySelector('.city h3');
      clearCity.innerHTML = "";

      const clearTemp = document.querySelector('.temperature div');
      clearTemp.innerHTML = "?";

      const clearWeather = document.querySelector('.weather');
      clearWeather.innerHTML = "Informe uma cidade existente!";

      const clearLow = document.querySelector('#temp-min');
      clearLow.innerHTML = "";

      const clearHigh = document.querySelector('#temp-max');
      clearHigh.innerHTML = "";


      var textErro = document.createTextNode("Cidade não encontrada!");
      cityElement.appendChild(textErro);
      return;
    }
  
    let now = new Date();
    date.innerText = constructionDate(now);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    low.innerText = data.main.temp_min;
    high.innerText = data.main.temp_max;
    weatherIconElement.setAttribute(
    "src",
    `./icons/${data.weather[0].icon}.png`

  );
    weatherContainer.classList.remove("hide");
};

function constructionDate(d) {
  let days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julio", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  let day = days[d.getDay()]; //getDay: 0-6
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}

searchBtn.addEventListener("click", async (e) => 
  {
    e.preventDefault();
  
    const city = cityInput.value;
  
    showWeatherData(city);
  });
  
cityInput.addEventListener("keyup", (e) => 
  {
    if (e.code === "Enter") {
      const city = e.target.value;
  
      showWeatherData(city);
    }
  });
