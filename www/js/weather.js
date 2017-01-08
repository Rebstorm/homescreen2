var WeatherApp = function(){
    
    var container;
    var icon;
    var textContainer;
    var textLocation;

    
    function init(){
        getElements();
        getWeatherData();

    }

    function getElements(){
        try{
            container = document.getElementById("weather-container");
            icon = document.getElementById("weather-icon");
            textContainer = document.getElementById("weather-text-container");
            textLocation = document.getElementById("weather-text-location");
        } catch(e){
            console.log("error getting elements in weather apps");
        }
    }

    function getWeatherData(){
        icon.className = "wi " + WeatherIcons.SunnyDay;
        textLocation.textContent = "Bonn, I think";
    }
    


    return {
        init : init,
    }

}();

var WeatherIcons = {
    SunnyDay: "wi-day-sunny",
    CloudyDay: "wi-day-cloudy",
    FoggyDay: "wi-day-fog",
    HazyDay: "wi-day-haze",
    LightningDay: "wi-day-lightning",
    RainyDay: "wi-day-rain",
    SleetDay: "wi-day-sleet",
    SleetStormDay: "wi-day-sleet-storm",
    SnowyDay: "wi-day-snow",
    SnowThunderstormDay: "wi-day-snow-thunderstorm",

    ClearNight: "wi-night-clear",
    CloudyNight: "wi-night-alt-cloudy",
    RainyNight: "wi-night-alt-rain",
    HailNight: "wi-night-alt-hail",
    SleetNight: "wi-night-alt-sleet",
    SnowyNight: "wi-night-alt-snow",
    ThunderstormNight: "wi-night-alt-lightning",
    StaryNight: "wi-stars"

};

var MiscIcons = {
    Celcius: "wi-celsius",
    Thermometer: "wi-thermometer-exterior",
    Degree: "wi-degrees",
    NA: "wi-na",
    Refresh: "wi-refresh"

};