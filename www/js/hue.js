var HueApp = function(){
    
    var user;

    function init(){
        createConstantInterface();
        AppInit.startNewActivity();

        createHueConnection();
    }
   

    function createInterface(lights){
        if(document.getElementById("main-app-content") == undefined){
            var mainPopup = document.getElementById("main-popup");
            // hide load
            document.getElementById("load-img").style.display = "none";
            // remove nobridge
            removeNoBridgeInterface();

            var mainContainer = document.createElement("div");

            var hueAppContainer = document.createElement("div");

            var lightBars = document.createElement("div");

            mainContainer.id = "main-app-content";

            hueAppContainer.id = "hue-app-c";
            hueAppContainer.className = "full-app-c";

            lightBars.id = "hue-app-lightbars";
            lightBars.className = "hue-light-bar";

            for(light in lights){
                var x = createNewLightBar(lights[light], light);
                lightBars.appendChild(x);
            }

            hueAppContainer.appendChild(lightBars);
            mainContainer.appendChild(hueAppContainer);
            mainPopup.appendChild(mainContainer);
        }
 
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
            spectrumImg.src = "resources/system/spectrum.jpg";
            spectrumImg.onload = function(){
                spectrumCanvas.width = this.width;
                spectrumCanvas.height = this.height;
                spectrumContext.drawImage(spectrumImg, 0, 0, this.width, this.height,
                                           0, 0, spectrumCanvas.width, spectrumCanvas.height);
            }
            
            var lastTrigger = 0;
            // constans that shouldnt be regenerated.
            spectrumCanvas.addEventListener("touchmove", function(e){
                if(e instanceof TouchEvent && (Date.now() - lastTrigger) > 200){
                    
                    var context = this.getContext("2d");    
                   
                    var pos = findPos(this)
                    var x = e.changedTouches[0].pageX - pos.x;
                    var y = e.changedTouches[0].pageY - pos.y;
                    
                    var p = context.getImageData(parseInt(x), parseInt(y), 1, 1).data;
                    
                    //var newC = "rgb(" + p[0] + "," +  p[1] + "," + p[2] + ")";
                    //var c = rgbToHsl(p[0], p[1], p[2]);
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

    function createNoBridgeInterface(){
        var mainPopup = document.getElementById("main-popup");


        if(document.getElementById("hue-fail-refresh") == undefined){
            var failDiv = document.createElement("div");
            failDiv.className = "hue-fail-refresh-c";
            failDiv.id="hue-fail-refresh";

            var failDivButton = document.createElement("div");
            failDivButton.className = "hue-fail-refresh-button";

            failDivButton.addEventListener("click", function(e){
               createHueConnection(); 
            });
            
            var failDivButtonText = document.createElement("div");
            failDivButtonText.className = "hue-fail-refresh-button-text";
            failDivButtonText.innerHTML = "<i class='wi wi-refresh'>";
            
            failDivButton.appendChild(failDivButtonText);
            failDiv.appendChild(failDivButton);
            mainPopup.appendChild(failDiv);
        }
    }

    function removeNoBridgeInterface(){
        var mainPopup = document.getElementById("main-popup");

        if(document.getElementById("hue-fail-refresh"))
            mainPopup.removeChild(document.getElementById("hue-fail-refresh"));
    }

    function createHueConnection(){

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
                hue.discover(
                    function(bridges) {
                        if(bridges.length === 0) {
                            console.log('No bridges found. :(');
                            createNoBridgeInterface();
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
                        if(error.message == "")
                            createNoBridgeInterface();
                        else
                            console.error(error.message);
                    }
                );
            });
        });
    }

    function showtempLoadScreen(){
        document.getElementById("load-img").style.display = "block";
    }

    function showPairWindow(){
        var div = document.getElementById("main-popup");
        if(document.getElementById("main-app-content") == undefined){
            var bubble = document.createElement("div");
            bubble.id = "main-app-content";
            bubble.textContent  = "Please pair me :(";
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

        var lightIndicator = document.createElement("div");
        lightIndicator.id = "lightindicator" + nextId;
        lightIndicator.dataset.nr = nr;
        lightIndicator.className = "hue-light-indicator glowing";
        var color = xyBriToRgb(light.state.xy[0], light.state.xy[1], light.state.bri);
        if(light.state.on)
            lightIndicator.style.background = "rgb("+parseInt(color.r)+","+parseInt(color.g)+","+parseInt(color.b)+")";

        lightIndicator.addEventListener("click", function(e){
           toggleColorWindow(this); 
        });

        var textContainer = document.createElement("div");
        textContainer.className = "hue-light-text";
        var lightName = document.createElement("p");
        var lightOpacity = document.createElement("p");
        lightName.textContent = light.name;
        lightName.className ="hue-text";
        lightOpacity.textContent = light.state.bri ;
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
                    lightInd.style.background = "#000";
                    lightInd.className = "hue-light-indicator";
                });
           } else if(obj.className == "hue-toggle-bar-button"){
                obj.className = "hue-toggle-bar-button-toggled";
                user.setLightState(parseInt(lightId), {on: true}, function(d){
                    user.getLight(parseInt(lightId), function(e){
                        var color = xyBriToRgb(e.state.xy[0], e.state.xy[1], e.state.bri);
                        lightInd.style.background = "rgb("+parseInt(color.r)+","+parseInt(color.g)+","+parseInt(color.b)+")";
                        lightInd.className = "hue-light-indicator glowing";
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
    
    
    return {
        init : init,
    }
}();