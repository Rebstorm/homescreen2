var HueApp = function(){
    
    var user;
    var SPECTRUM_IMG = "resources/system/spectrum.jpg";

    function init(){
        createConstantInterface();
        AppInit.startNewActivity();

        createHueConnection();
    }
   

    function createInterface(lights){
        
        // hide load
        document.getElementById("load-img").style.display = "none";

        if(document.getElementById("main-app-content") == undefined){
            var mainPopup = document.getElementById("main-popup");
            // remove nobridge
            removeNoBridgeInterface();

            var mainContainer = document.createElement("div");

            var hueAppContainer = document.createElement("div");

            var lightBars = document.createElement("div");

            mainContainer.id = "main-app-content";
            mainContainer.style.backgroundColor = "inherit";

            hueAppContainer.id = "hue-app-c";
            hueAppContainer.className = "full-app-c";

            lightBars.id = "hue-app-lightbars";
            lightBars.className = "hue-light-bar";

            for(light in lights){
                var x = createNewLightBar(lights[light], light);
                lightBars.appendChild(x);
            }

            var templates = document.createElement("div");
            templates.className = "hue-app-templates";
            
            var templateContainer = document.createElement("div");
            templateContainer.innerHTML = "<h3 class='headline-fat'>Templates </h3>";
            var temps = createTemplates();
            
            templateContainer.appendChild(temps);
            templates.appendChild(templateContainer);

            hueAppContainer.appendChild(lightBars);
            hueAppContainer.appendChild(templates);
            mainContainer.appendChild(hueAppContainer);

            mainPopup.appendChild(mainContainer);
        }
 
    }

    function createTemplates(){
        
        var container = document.createElement("div");
        container.className = "hue-template-bar";

        for(var i = 0; i < Object.keys(HueTemplates).length; i++){
           
            var templateContainer = document.createElement("div"); 
            templateContainer.id = "hue-template"+i;
            templateContainer.className = "hue-template-button";
            templateContainer.dataset.data = JSON.stringify(HueTemplates[Object.keys(HueTemplates)[i]]);
            
            templateContainer.addEventListener("click", function(e){
               var dr = JSON.parse(this.dataset.data);
               user.getLights(function(l){
                  var color = 0;

                  for(light in l){
                      var x = dr.values[color];
                      if(x == undefined){
                          color = 0; 
                          x = dr.values[color];
                      }
                      var c = hexToRgb(x);
                      c = rgbToXy(c.r, c.g, c.b);
                      if(c == undefined){
                        return;
                      } else {

                          user.setLightState(parseInt(light), { "xy" : [c.x , c.y ] }  , function(e){
                              if(e[0].success)
                                console.log("it worked");
                              else
                                console.log(e);
                              
                          });
                          color++;
                      }
                  }
               });
            })

            var templateContainerDesign = document.createElement("div");
            templateContainerDesign.className = "hue-template-button-design";
            templateContainerDesign.style.background = HueTemplates[Object.keys(HueTemplates)[i]].background;
    
            var templateContainerText = document.createElement("div");
            templateContainerText.className = "hue-template-button-text";
            templateContainerText.textContent = HueTemplates[Object.keys(HueTemplates)[i]].name;
            templateContainerText.style.color = (HueTemplates[Object.keys(HueTemplates)[i]].textColor == undefined) ? "#fff" : HueTemplates[Object.keys(HueTemplates)[i]].textColor;

            templateContainerDesign.appendChild(templateContainerText);
            templateContainer.appendChild(templateContainerDesign);

            
            container.appendChild(templateContainer);

        }
        
        return container;
    }

    function createConstantInterface(){
        
        if(document.getElementById("spectrum-canvas") == undefined){
            var hueColorPopup = document.getElementById("hue-color-popup");
            
            var spectrumCanvas = document.createElement("canvas");
            spectrumCanvas.className = "hue-spectrum-canvas";
            spectrumCanvas.id = "spectrum-canvas";

            hueColorPopup.appendChild(spectrumCanvas);

            var spectrumCanvas = document.getElementById("spectrum-canvas");
            var spectrumContext = spectrumCanvas.getContext("2d");

            var spectrumImg = new Image();
            spectrumImg.src = SPECTRUM_IMG;
            spectrumImg.onload = function(){
                spectrumCanvas.width = this.width;
                spectrumCanvas.height = this.height;
                spectrumContext.drawImage(spectrumImg, 0, 0, this.width, this.height,
                                           0, 0, spectrumCanvas.width, spectrumCanvas.height);
            }

            var brightnessContainer = document.createElement("div");
            brightnessContainer.className = "hue-brightness-container";
            
            var brightnessDescription = document.createElement("p");
            brightnessDescription.textContent = "Brightness";

            var brightnessSlider = document.createElement("input");
            brightnessSlider.id = "hue-brightness-slider";
            brightnessSlider.type = "range";
            brightnessSlider.min = 0; 
            brightnessSlider.max = 100;

            brightnessContainer.appendChild(brightnessDescription);
            brightnessContainer.appendChild(brightnessSlider);

            hueColorPopup.appendChild(brightnessContainer);
            
            var lastTrigger = 0;
            var lastX;
            var lastY;
            // constans that shouldnt be regenerated.
            spectrumCanvas.addEventListener("touchmove", function(e){
                if(e instanceof TouchEvent && (Date.now() - lastTrigger) > 50){
                    
                    var context = this.getContext("2d");    
                   
                    var pos = findPos(this);
                    var x = e.changedTouches[0].pageX - pos.x;
                    var y = e.changedTouches[0].pageY - pos.y;
                                       

                    var spectrumImg = new Image();
                    spectrumImg.src = SPECTRUM_IMG;
                    spectrumImg.onload = function(){
                        var spectrumCanvas = document.getElementById("spectrum-canvas");

                        spectrumCanvas.width = this.width;
                        spectrumCanvas.height = this.height;

                        context.drawImage(spectrumImg, 0, 0, this.width, this.height,
                                                   0, 0, spectrumCanvas.width, spectrumCanvas.height);

                        var p = context.getImageData(parseInt(x), parseInt(y), 1, 1).data;

                        context.strokeStyle = "#000";
                        context.lineWidth = 5;
                        context.fillStyle = "#fff";
                        context.beginPath();
                        // x , y , radius, start-angle, end
                        context.arc(x, y, 10, 0, 2*Math.PI);
                        context.stroke();
                        context.fill();
                        

                        // If the img is white, the thing shouldnt be changed. Because the light isnt on.
                        if(toggledLight.style.background == "rgb(255, 255, 255)" 
                            || toggledLight.style.background == "" )
                            return; 

                            
                        toggledLight.style.background = "rgb("+p[0]+"," + p[1] + "," + p[2] +  ")";
                        
                        var c = rgbToXy(p[0], p[1], p[2]);
                        if(c == undefined){
                            return;
                        } else {
                           user.setLightState(parseInt(toggledLight.dataset.nr), { "xy" : [c.x , c.y ] }  , function(e){
                              //console.log(e);
                              if(e[0].success)
                                console.log("light changed");
                              else
                                console.log(e);
                           });
                         }

                        lastTrigger = Date.now(); 
                    }

                  
                                   
                }
            });
            
            var lastTriggerBrightness = 0;
            brightnessSlider.addEventListener("touchmove", function(e){

                if(Date.now() - lastTriggerBrightness > 100){
                    var b = this.value * 2.55;
                    if(b > 255)
                        b = 254;

                    console.log(b);
                    user.setLightState(parseInt(toggledLight.dataset.nr), { "bri" : parseInt(b) } , function(e){
                       console.log(e); 
                    });
                    
                    lastTriggerBrightness = Date.now();
                }
               
            });

            function findPos(obj) {
                var curleft = 0, curtop = 0;
                if (obj.offsetParent) {
                    do {
                        curleft += obj.offsetLeft;
                        curtop += obj.offsetTop;
                    } while (obj = obj.offsetParent);
                    return { x: curleft, y: curtop };
                }
                return undefined;
            }

            function rgbToHex(r, g, b) {
                if (r > 255 || g > 255 || b > 255)
                    return "error";
                return ((r << 16) | (g << 8) | b).toString(16);
            }

            document.getElementById("hue-popup-exit").addEventListener("click", function(){
                closeColorWindow();
            });
            
        }

    }

    function createNoBridgeInterface(refreshed){
        var mainPopup = document.getElementById("main-popup");


        if(document.getElementById("main-popup-content") == undefined){
            var container = document.createElement("div");
            container.id = "main-popup-content";

            var failDiv = document.createElement("div");
            failDiv.className = "hue-fail-refresh-c";
            failDiv.id="hue-fail-refresh";

            var failDivButton = document.createElement("div");
            failDivButton.className = "hue-fail-refresh-button";

            failDivButton.addEventListener("click", function(e){
               createHueConnection(true); 
               document.getElementById("hue-refresh-buttton-text").className = "wi wi-refresh rotating";
            });
            
            var failDivButtonText = document.createElement("div");
            failDivButtonText.className = "hue-fail-refresh-button-text";
            failDivButtonText.innerHTML = "<i id='hue-refresh-buttton-text' class='wi wi-refresh'>";

            var failPText = document.createElement("p");
            failPText.className = "hue-fail-text";
            failPText.innerHTML = ":( <br>Can't find a bridge. <br> Retry?";
            
            failDivButton.appendChild(failDivButtonText);
            failDiv.appendChild(failDivButton);
            failDiv.appendChild(failPText);
            container.appendChild(failDiv);
            mainPopup.appendChild(container);
        }

        if(refreshed){
            document.getElementById("hue-refresh-buttton-text").className = "wi wi-refresh";  
        }
    }

    function removeNoBridgeInterface(){
        var mainPopup = document.getElementById("main-popup");

        if(document.getElementById("hue-fail-refresh"))
            mainPopup.removeChild(document.getElementById("hue-fail-refresh"));
    }

    function createHueConnection(refreshed){

        var hue = jsHue();
        FileUtil.checkAppSettings(Files.HueApp, function(fEntry){
            FileUtil.readFile(fEntry.fEntry, function(r){
                try{
                    r = JSON.parse(r);
                } catch(e){
                    if(r.length < 1)
                        console.log("nothing read from hue file");
                    else
                        console.log("file error: " + e.stack);
                }
                // discovery
                try{
                    hue.discover(
                        function(bridges) {
                            if(bridges.length === 0) {
                                console.log('No bridges found. :(');
                                createNoBridgeInterface(refreshed);
                                // This is for debugging without a bridge.
                                //createInterface(undefined);                             
                            }
                            else {
                                bridges.forEach(function(e) {
                                    if(r.username){ 
                                       var bridge = hue.bridge(e.internalipaddress);
                                       user = bridge.user(r.username);
                                       user.getLights(function(l){
                                          createInterface(l);
                                       });
                                       showtempLoadScreen();

                                   } else {
                                       pairBridgeFirstTime(e.internalipaddress);
                                   }
                                });
                            }
                        },
                        function(error) {
                            if(error.message == ""){
                                 createNoBridgeInterface();
                                 // debugging without a bridge
                                 //createInterface(undefined);
                            }
                                
                            else{
                                console.error(error.message);

                            }
                        }
                    );
                } catch(e){
                    console.log(e);
                }
            });
        });
    }

    function showtempLoadScreen(){
        document.getElementById("load-img").style.marginTop = "5em";
        document.getElementById("load-img").style.display = "block";
       
    }

    function showPairWindow(){
        var div = document.getElementById("main-popup");
        if(document.getElementById("main-app-content") == undefined){
            var bubble = document.createElement("div");
            bubble.id = "main-app-content";
            bubble.style.backgroundColor = "inherit";

            var contentWindow = document.createElement("div");
            contentWindow.innerHTML = "Please pair me so I can help you with your lights<br>";
            contentWindow.className = "pair-div-helper";
            
            var contentImg = document.createElement("img");
            contentImg.src = "resources/system/pushlink_image.png";
            contentImg.className = "pair-img";

            contentWindow.appendChild(contentImg);
            bubble.appendChild(contentWindow);
            
            div.appendChild(bubble);
        }

        if(div.style.display == "block"){
            return true;
        } else {
            return false;
        }
    }

    function removePairWindow(){
        document.getElementById("main-popup").removeChild(document.getElementById("main-app-content"));
    }

    function pairBridgeFirstTime(ip){
        var hue = jsHue();
        var bridge = hue.bridge(ip);

        bridge.createUser('homescreen2', function(data) {
            // extract bridge-generated username from returned data
            if(("error" in data[0]) && (data[0].error.description.indexOf("link") >= 0)){
                window.setTimeout(function(){
                    if(!showPairWindow()){
                        document.getElementById("main-popup").style.display = "none";
                        return;
                    }
                   
                    pairBridgeFirstTime(ip);
                }, 1000);
                return;
            } else if("success" in data[0]) {
                var username = data[0].success.username;
                var r = {"username": username};

                // instantiate user object with username
                user = bridge.user(username);
                
                FileUtil.checkAppSettings(Files.HueApp, function(fileEntry){
                    FileUtil.writeFile(fileEntry.fEntry, JSON.stringify(r));
                });
                user.getLights(function(l){
                  createInterface(l);
                });

                removePairWindow();
            }
        });
         
    }
    
    var nextId = 0;
    var toggledLight = ""; 
    function createNewLightBar(light, nr){

        var lightBarContainer = document.createElement("div");
        lightBarContainer.className = "hue-lightbar-container";
        lightBarContainer.id = "lightbar" + nextId;
        lightBarContainer.dataset.light = JSON.stringify(light);
        lightBarContainer.dataset.nr = nr;
        
        var lightBar = document.createElement("div");
        lightBar.id = "lightbarC"+nextId;
        lightBar.className = "hue-lightbar-c";
        
        // CREATE INDICATOR
        var lightIndicator = document.createElement("div");
        lightIndicator.id = "lightindicator" + nextId;
        lightIndicator.dataset.nr = nr;
        
        // SET COLOR OF INDICATOR
        var color = xyBriToRgb(light.state.xy[0], light.state.xy[1], light.state.bri);
        if(light.state.on && light.state.reachable){
            lightIndicator.style.background = "rgb("+parseInt(color.r)+","+parseInt(color.g)+","+parseInt(color.b)+")";
            lightIndicator.className = "hue-light-indicator";
        } else if(!light.state.on || !light.state.reachable) {
            lightIndicator.className = "hue-light-indicator";
            lightIndicator.style.background = "#fff";
            lightIndicator.style.border = "1px solid #000";
        }

        lightIndicator.addEventListener("click", function(e){
           toggleColorWindow(this); 
        });

        var textContainer = document.createElement("div");
        textContainer.className = "hue-light-text";
        var lightName = document.createElement("p");
        var lightOpacity = document.createElement("p");
        lightName.textContent = light.name;
        lightName.className ="hue-text";
        //lightOpacity.textContent = (parseInt(light.state.bri / 2.55)) + "%";
        lightOpacity.className = "hue-text";
        

        var toggleBar = document.createElement("div");
        toggleBar.className = "hue-toggle-bar";


        toggleBar.addEventListener("click", function(e){
           var obj = document.getElementById(this.dataset.button);
           var lightId = document.getElementById("lightbar" + this.dataset.nr).dataset.nr;
           var lightInd = document.getElementById("lightindicator"+this.dataset.nr);
           var id = this.dataset.nr;
           if(obj.className == "hue-toggle-bar-button-toggled"){
                obj.className = "hue-toggle-bar-button";
                user.setLightState(parseInt(lightId), {on: false}, function(d){
                    lightInd.style.background = "";
                    lightInd.style.border = "1px solid #000";
                    lightInd.className = "hue-light-indicator";
                });
           } else if(obj.className == "hue-toggle-bar-button"){
                obj.className = "hue-toggle-bar-button-toggled";
                user.setLightState(parseInt(lightId), {on: true}, function(d){
                    user.getLight(parseInt(lightId), function(e){
                        var color = xyBriToRgb(e.state.xy[0], e.state.xy[1], e.state.bri);
                        lightInd.style.border = "none";
                        lightInd.style.background = "rgb("+parseInt(color.r)+","+parseInt(color.g)+","+parseInt(color.b)+")";
                        lightInd.className = "hue-light-indicator fade-in";

                    });
                })
           } else if(obj.className == "hue-toggle-bar-button-disabled"){
               console.log("TODO: herp derp is disabled");
           }
        });

        var toggleBarButton = document.createElement("div");
        toggleBarButton.id = "hue-toggle-button"+nextId;
        if(light.state.on && light.state.reachable)
            toggleBarButton.className = "hue-toggle-bar-button-toggled";
        else if(!light.state.on && light.state.reachable)
            toggleBarButton.className = "hue-toggle-bar-button";
        else
            toggleBarButton.className = "hue-toggle-bar-button-disabled";
        toggleBar.dataset.button = toggleBarButton.id;
        toggleBar.dataset.nr = nextId;

        toggleBar.appendChild(toggleBarButton);

        textContainer.appendChild(lightName);
        textContainer.appendChild(lightOpacity);
        
        lightBar.appendChild(textContainer);
        lightBar.appendChild(toggleBar);
        
        lightBarContainer.appendChild(lightBar);
        lightBarContainer.appendChild(lightIndicator);

        nextId++;

        return lightBarContainer;

    }
    function toggleColorWindow(id){
        toggledLight = id;
        console.log(toggledLight);
        var x = document.getElementById("hue-color-popup");

        user.getLight(parseInt(id.dataset.nr), function(e){
            document.getElementById("hue-brightness-slider").value = (e.state.bri / 2.55);
        });
                
        // Rerender the img
        var spectrumImg = new Image();
        var spectrumCanvas = document.getElementById("spectrum-canvas");
        var spectrumContext = spectrumCanvas.getContext("2d");
        spectrumImg.src = SPECTRUM_IMG;
            spectrumImg.onload = function(){
                spectrumCanvas.width = this.width;
                spectrumCanvas.height = this.height;
                spectrumContext.drawImage(spectrumImg, 0, 0, this.width, this.height,
                                           0, 0, spectrumCanvas.width, spectrumCanvas.height);
            }

        if(x.style.display == "none"){
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }

    }

    function closeColorWindow(){
        document.getElementById("hue-color-popup").style.display = "none";
    }


   function xyBriToRgb(x, y, bri){
        z = 1.0 - x - y;
        Y = bri / 255.0; // Brightness of lamp
        X = (Y / y) * x;
        Z = (Y / y) * z;
        r = X * 1.612 - Y * 0.203 - Z * 0.302;
        g = -X * 0.509 + Y * 1.412 + Z * 0.066;
        b = X * 0.026 - Y * 0.072 + Z * 0.962;
        r = r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, (1.0 / 2.4)) - 0.055;
        g = g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, (1.0 / 2.4)) - 0.055;
        b = b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, (1.0 / 2.4)) - 0.055;
        maxValue = Math.max(r,g,b);
        r /= maxValue;
        g /= maxValue;
        b /= maxValue;
        r = r * 255;   if (r < 0) { r = 255 };
        g = g * 255;   if (g < 0) { g = 255 };
        b = b * 255;   if (b < 0) { b = 255 };
        return {
            r :r,
            g :g,
            b :b
        }
    }

   function rgbToXy(r,g,b){
        r /= 1000; g /= 1000; b /=1000;
            
        // parameter validation
        if (0 > r || r > 1
          || 0 > g || g > 1
          || 0 > b || b > 1)
          throw "invalid color range";

        // init
        var red = r;
        var green = g;
        var blue = b;

        // Apply gamma correction
        var r = (red   > 0.04045) ? Math.pow((red   + 0.055) / (1.0 + 0.055), 2.4) : (red   / 12.92);
        var g = (green > 0.04045) ? Math.pow((green + 0.055) / (1.0 + 0.055), 2.4) : (green / 12.92);
        var b = (blue  > 0.04045) ? Math.pow((blue  + 0.055) / (1.0 + 0.055), 2.4) : (blue  / 12.92);

        // Wide gamut conversion D65
        var X = r * 0.649926 + g * 0.103455 + b * 0.197109;
        var Y = r * 0.234327 + g * 0.743075 + b * 0.022598;
        var Z = r * 0.0000000 + g * 0.053077 + b * 1.035763;

        var cx = X / (X + Y + Z);
        var cy = Y / (X + Y + Z);

        if (isNaN(cx)) {
          cx = 0.0;
        }

        if (isNaN(cy)) {
          cy = 0.0;
        }

        return { x: cx, y: cy, bri: Y };
    }

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    
    
    return {
        init : init,
    }
}();


var HueTemplates = {

    sunset : {
        name: "Sunset",
        background: "linear-gradient(to right, #f0b7a1 0%,#8c3310 50%,#752201 51%,#bf6e4e 100%)",
        values : ["#f0b7a1", "#8c3310", "#752201", "#bf6e4e" ]
    },


    cold : {
        name: "Cold",
        background: "linear-gradient(to right, #1E5799 0%,#40A6F9 50%,#2C5BE8 51%,#0041F7 100%)",
        values : ["#1E5799", "#40A6F9", "#2C5BE8", "#0041F7"]
    },

    nature : {
        name: "Nature",
        background: "linear-gradient(to right, #b4ddb4 0%,#83c783 17%,#52b152 33%,#008a00 67%,#005700 83%,#002400 100%)",
        values : ["#b4ddb4", "#83c783", "#52b152", "#002400"]
    },

    focus : {
       name: "Focus",
        background: "linear-gradient(to right, rgba(249,252,247,1) 0%,rgba(245,249,240,1) 100%)",
        values : ["#F9FCF7", "F5F9F0"],
        textColor: "#000"
    }



}