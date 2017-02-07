var WeatherApp = function(){
    
    var container;
    var icon;
    var textContainer;
    var textLocation;
    var position;
    var tries = 0;
    
    function init(){
        getPermission();
        getElements();
        setEventHandlers();

    }

    function displayWeatherData(data){
        var currentDate = new Date();
        
        var recheckEveryH = 9;
        var recheck = 3600000 * recheckEveryH;

        for(var i = 0; i < data.length; i++){
            if(currentDate > data[i]){
                continue;
            } else {
                changeSymbol(data[i].symbol);
                var checkedDate = new Date(data[i].from);
                var min = checkedDate.getMinutes();
                if(min < 10)
                    min = "0" + min;
                    
                textContainer.innerHTML = "<b>" + data[i].temp + "</b> &deg;Celcius <br><b>" + data[i].humidity + "</b> Humidity<br><b>" + data[i].precipation + "</b> mm rain incoming<br>" +
                                          "Checked for " + checkedDate.getHours() + ":" + min + ".";
                
                // animate button
                document.getElementById("weather-refresh-button").className = "";

                var d = document.createElement("img");
                d.src = "resources/system/check.svg";
                d.width = "32";
                d.height = "32";
                document.getElementById("weather-refresh-button-sym").style.display = "none";
                if(document.getElementById("weather-refresh-button").hasChildNodes()){
                    document.getElementById("weather-refresh-button").appendChild(d);

                    window.setTimeout(function(){
                        document.getElementById("weather-refresh-button-sym").style.display = "block";
                        document.getElementById("weather-refresh-button").removeChild(d);
                    }, 2000);

                } else {
                    window.setTimeout(function(){
                            document.getElementById("weather-refresh-button-sym").style.display = "block";
                    }, 2000);

                }
                
                recheckWeather(position, recheck);

                tries = 0;

                return;
            }
        }
        if(tries < 3){
            makeWeatherCall(position);
        } else {
            AppInit.showErrorBox("Couldnt get weather data :( <br>Are we connected to the internet?")
            document.getElementById("weather-refresh-button").className = "";
            tries = 0;
        }
        tries++;
    }

    function recheckWeather(position, timeout){
        // recheck at this timepoint for new info
        window.setTimeout(function(){
            makeWeatherCall(position);
        }, timeout);

        console.log("Will check weather again in: " + (timeout/3600000) + "h.");

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
    var weatherFile;
    function getPermission(){
        navigator.geolocation.getCurrentPosition(
        function(pos){
            // get geo pos
            position = pos;
            FileUtil.checkAppSettings(Files.Weather, function(obj){
                weatherFile = obj.fEntry;

                if(obj.readValue == ReadValues.EMPTY){
                   makeWeatherCall(pos); 
                } else {
                   FileUtil.readFile(weatherFile, function(data){
                      try{ 
                          var dataParsed = JSON.parse(data);
                          displayWeatherData(dataParsed);
                      } catch(e){
                          makeWeatherCall(pos);
                      }
                   });
                }
            });
            
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
            case "PartlyCloud":
                sym = WeatherIcons.CloudyDay;
                break; 
            
            case "DrizzleSun":
                sym = WeatherIcons.SprinkleDay;
                break;

            case "Drizzle":
                sym = WeatherIcons.SprinkleDay;
                break;

           case "LightRain":
                sym = WeatherIcons.LightRainDay;
                break;

            case "LightCloud":
                sym = WeatherIcons.CloudyDay;
                break;

            case "SnowSun":
                sym = WeatherIcons.SnowyDay;
                break;

            case "SnowyNight":
                sym = WeatherIcons.SnowyNight;
                break;
            case "Sun":
                sym = WeatherIcons.SunnyDay;
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

                if(e.stack.indexOf("TypeError") >= 0){
                    console.log("Error parsing weather data, maybe api is screwed?");
                    document.getElementById("weather-refresh-button").className = "";
                }    
            }
        }
        try{
            xhr.open('GET', 'http://api.met.no/weatherapi/locationforecast/1.9/?lat='+ pos.coords.latitude +';lon=' + pos.coords.longitude, true);
            xhr.send(null);
        }catch(e){
            if(e.stack.indexOf("TypeError") >= 0){
                // position is not defined
                document.getElementById("weather-refresh-button").className = "";
                console.log(e);

            }
        }
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
                /*
                weather.from = new Date(forecastData[i].attributes["from"].nodeValue);
                weather.to = new Date(forecastData[i].attributes["to"].nodeValue);
                weather.temp = forecastData[i].children[0].children[0].attributes["value"].nodeValue;
                if(forecastData[i].children[0].children[3].attributes["value"].nodeValue != undefined)
                    weather.humidity = forecastData[i].children[0].children[3].attributes["value"].nodeValue + "%";
                weather.symbol = forecastData[i+1].children[0].children[1].attributes["id"].nodeValue;
                weather.precipation = forecastData[i+1].children[0].children[0].attributes["value"].nodeValue;
                
                weatherData.push(weather);
                */
                if(i+1 > forecastData.length){
                    break;
                }

                var loc = forecastData[i].getElementsByTagName("location")[0];
                var temp = forecastData[i].getElementsByTagName("temperature")[0];
                var hum = forecastData[i].getElementsByTagName("humidity")[0];

   
                var sym = forecastData[i+1].getElementsByTagName("symbol")[0];
                var pre = forecastData[i+1].getElementsByTagName("precipitation")[0];

                weather.from = new Date(forecastData[i].attributes["from"].nodeValue);
                weather.to = new Date(forecastData[i].attributes["to"].nodeValue);
                


                if(temp == undefined || sym == undefined){
                    continue;
                } else { 
                    weather.temp = temp.attributes["value"].nodeValue;
                    weather.humidity = hum.attributes["value"].nodeValue + "%";
                    weather.precipation = pre.attributes["value"].nodeValue;
                    weather.symbol = sym.attributes["id"].nodeValue;
                    weatherData.push(weather);
                }

            }
            
            displayWeatherData(weatherData);
            saveWeatherData(weatherData);
            
        }
    }

    function saveWeatherData(data){
            var jsonData = JSON.stringify(data);
            FileUtil.writeFile(weatherFile, jsonData);
    }

    function setEventHandlers(){

        document.getElementById("weather-refresh-button").addEventListener("click", function(){
           document.getElementById("weather-refresh-button").className = "rotating";
           try{
               makeWeatherCall(position);
           } catch(e){
               AppInit.showErrorBox("I cant seem to find my current location. Where did I park again..?")
           }
           
        });
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
    LightRainDay: "wi-day-rain-mix",
    RainyDay: "wi-day-rain",
    SprinkleDay: "wi-day-sprinkle",
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