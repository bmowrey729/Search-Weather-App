$(document).ready(function(){
  var searchHistoryContainer =$('#past-searches');
  var searchForm = $('#search-form');
  var apiKey = 'cd0b3fe1a800e29bb189f5148cda1151'
  var baseUrl = '';
  searchForm.submit(function(event){    
    event.preventDefault();
    console.log(event);
    var formValues = $(this).serializeArray();
    var city = formValues[0].value;
    var searchTermDiv = $('<div class ="past-search-term">');
    searchTermDiv.text(city);
    searchHistoryContainer.append(searchTermDiv);
    console.log(formValues, city);
    searchForCityWeather(city);
  });
  function searchForCityWeather(city){
    console.log(city);
  }
});



//fetch('https://api.openweathermap.org/data/2.5/weather?q=Dallas&appid=cd0b3fe1a800e29bb189f5148cda1151', {
  

  //.then(function (response) {
    //return response.json();
  //})
  //.then(function (data) {
   // console.log(data);
  //});