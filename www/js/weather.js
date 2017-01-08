var WeatherApp = function(){
    
    var container;
    var icon;
    var textContainer;
    var textLocation;

    
    function init(){
        getPermission();
        getElements();

    }

    function displayWeatherData(data){
        var currentDate = new Date();

        for(var i = 0; i < data.length; i++){
            if(currentDate > data[i]){
                continue;
            } else {
                changeSymbol(data[i].symbol);
                textContainer.innerHTML = "<b>" + data[i].temp + "</b> °Celcius <br><b>" + data[i].humidity + "</b> Humidity<br><b>" + data[i].precipation + "</b> mm rain incoming";
                return;
            }
        }
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
    
    function getPermission(){
        navigator.geolocation.getCurrentPosition(
        function(pos){
            // get geo pos
            makeWeatherCall(pos);
        }, function(e){
            // get geo pos failed
            console.log(e);
        });

    }

    function changeSymbol(symbol){
        var sym = "";
        switch(symbol){
            
            case "Cloud":
                sym = WeatherIcons.CloudyDay;
                break;

            default:
                sym = MiscIcons.NA;
                break;
        }

        icon.className = "wi " + sym;


    }
    
    function makeWeatherCall(pos){

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            try{
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    handleWeatherData(xhr.responseText);
                }
            } catch(e){

                if(e.stack.indexOf("TypeError") >= 0)
                    console.log("Error parsing weather data, maybe api is screwed?");
            }
        }
        xhr.open('GET', 'http://api.met.no/weatherapi/locationforecast/1.9/?lat='+ pos.coords.latitude +';lon=' + pos.coords.longitude, true);
        xhr.send(null);

    }

    function handleWeatherData(data){
        if(window.DOMParser){
            var parser = new DOMParser();
            var xmlData = parser.parseFromString(data, "text/xml");
            var forecastData = xmlData.getElementsByTagName("time");
            //console.log(forecastData);
            var length = forecastData.length;
            if(length > 30)
                length = 30;
            var weatherData = [];
            for(var i = 0; i < length; i++){
                var weather = {}
                weather.from = new Date(forecastData[i].attributes["from"].nodeValue);
                weather.to = new Date(forecastData[i].attributes["to"].nodeValue);
                weather.temp = forecastData[i].children[0].children[0].attributes["value"].nodeValue;
                weather.humidity = forecastData[i].children[0].children[3].attributes["value"].nodeValue + "%";
                weather.symbol = forecastData[i+1].children[0].children[1].attributes["id"].nodeValue;
                weather.precipation = forecastData[i+1].children[0].children[0].attributes["value"].nodeValue;
                
                weatherData.push(weather);
                i = i + 2;
            }
            
            displayWeatherData(weatherData);
            
        }
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