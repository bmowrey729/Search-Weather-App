$(document).ready(function () {
  var searchHistoryContainer = $('#past-searches');
  var searchForm = $('#search-form');
  var currentWeatherContainer = $('#current-weather');
  var fiveDayForcastContainer = $('#five-day-forcast');
  var searchValueInp = $('#search-value');
  var apiKey = ''
  var baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
  var baseUrl2 = 'https://api.openweathermap.org/data/2.5/forecast?'
  var iconBaseUrl = 'http://openweathermap.org/img/w/'
  var searchHistory = [];
  searchForm.submit(function (event) {
    event.preventDefault();
    console.log(event);
    var formValues = $(this).serializeArray();
    var city = formValues[0].value;
    var searchTermDiv = $('<button type ="button"class ="btn past-search-term">');
    searchTermDiv.click(function(event){
      event.preventDefault();
      var value = $(this).text();
      searchForCurrentCityWeather(value);
      searchForFiveDayForcastWeather(value);
    });
    searchHistory.push(city);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

    
    searchTermDiv.text(city);
    searchHistoryContainer.append(searchTermDiv);
    console.log(formValues, city);
    searchForCurrentCityWeather(city);
    searchForFiveDayForcastWeather(city);
    searchValueInp.val('');
  });
  function searchForCurrentCityWeather(city) {
    currentWeatherContainer.html('');
    var fullUrl = baseUrl + "q=" + city + "&appid=" + apiKey;
    console.log(fullUrl);
    fetch(fullUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        var cityName = data.name;
        var temp = data.main.temp;
        var humidity = data.main.humidity;
        var weather = data.weather;
        var iconUrl = iconBaseUrl + weather[0].icon + '.png';
        var wind = data.wind
        var cityNameDiv = $("<div class='city-name'>")
        var tempDiv = $("<div class='temp-name'>")
        var humidityDiv = $("<div class='humidity-name'>")
        var weatherImg = $("<img class='icon-name'/>")
        var windDiv = $("<div class='wind-name'>")
        cityNameDiv.text(cityName);
        weatherImg.attr('src', iconUrl);
        tempDiv.text('Temperature:  ' + temp);
        humidityDiv.text('Humidity:  ' + humidity + '%');
        windDiv.text('Wend Speed: ' + wind.speed + ' MPH')

        currentWeatherContainer.append(cityNameDiv);
        currentWeatherContainer.append(weatherImg);
        currentWeatherContainer.append(tempDiv);
        currentWeatherContainer.append(humidityDiv);

        currentWeatherContainer.append(windDiv);
      });
  }
  
      
      retreiveSearchHistory();
  function searchForFiveDayForcastWeather(city) {
    fiveDayForcastContainer.html('');
    var forecastUrl = baseUrl2 + "q=" + city + "&appid=" + apiKey;
    fetch(forecastUrl)
      .then(function (response) {
        return response.json()
      }).then(function (data) {
        console.log('Five day forcast', data);

        for (var i = 0; i < data.list.length; i++) {

          var isThreeOclock = data.list[i].dt_txt.search('15:00:00');
          //var cityName = data.city.name;
          if (isThreeOclock > -1) {
            var forcast = data.list[i];
            var temp = forcast.main.temp;
            var humidity = forcast.main.humidity;
            var weather = forcast.weather;
            var iconUrl = iconBaseUrl + weather[0].icon + '.png';
            var wind = forcast.wind;
            var day = moment(forcast.dt_txt).format('dddd, MMMM, Do');
            console.log(forcast, temp, humidity, weather, wind, day);
            var rowDiv = $("<div class='col-2'>");
            var dayDiv = $("<div class='day-name'>")
            var tempDiv = $("<div class='temp-name'>")
            var humidityDiv = $("<div class='humidity-name'>")
            var weatherImg = $("<img class='icon-name'/>")
            var windDiv = $("<div class='wind-name'>")
            weatherImg.attr('src', iconUrl);
            dayDiv.text(day);
            tempDiv.text('Temp: ' + temp);
            humidityDiv.text('Humidity:  ' + humidity + '%');
            windDiv.text('Wind Spd: ' + wind.speed + ' MPH')
            rowDiv.append(dayDiv);
            rowDiv.append(weatherImg);
            rowDiv.append(tempDiv);
            rowDiv.append(humidityDiv);
            rowDiv.append(windDiv);
            fiveDayForcastContainer.append(rowDiv);
          }

        }    
    
  });
}
function retreiveSearchHistory() {
  if (localStorage.getItem('searchHistory')) {
    searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
    for (var i = 0; i < searchHistory.length; i++) {
      var searchTermDiv = $('<button type ="button"class ="btn past-search-term">');
      searchTermDiv.click(function(event){
        event.preventDefault();
        var value = $(this).text();
        searchForCurrentCityWeather(value);
      searchForFiveDayForcastWeather(value);
      });
      searchTermDiv.text(searchHistory[i]);
      searchHistoryContainer.append(searchTermDiv);
    
    }
  }
} 
retreiveSearchHistory();
});



