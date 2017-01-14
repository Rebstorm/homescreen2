var HueApp = function(){
    
    function init(){
        createInterface();
        createConstantInterface();
        AppInit.startNewActivity();

        createHueConnection();
    }
    

    function createInterface(){
        var mainPopup = document.getElementById("main-popup");
        var mainContainer = document.createElement("div");
        
        var hueAppContainer = document.createElement("div");

        var lightBars = document.createElement("div");

        mainContainer.id = "main-app-content";
        
        hueAppContainer.id = "hue-app-c";
        hueAppContainer.className = "full-app-c";

        lightBars.id = "hue-app-lightbars";
        lightBars.className = "hue-light-bar";

        var lightBarContainer = createNewLightBar();
        var light2 = createNewLightBar();
        var light3 = createNewLightBar();
        var light4 = createNewLightBar();
        var light5 = createNewLightBar();

        lightBars.appendChild(lightBarContainer);
        lightBars.appendChild(light2);
        lightBars.appendChild(light3);
        lightBars.appendChild(light4);
        lightBars.appendChild(light5);

        hueAppContainer.appendChild(lightBars);
        mainContainer.appendChild(hueAppContainer);
        mainPopup.appendChild(mainContainer);

 
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
                spectrumContext.drawImage(spectrumImg, 0, 0 );
            }
            
            // constans that shouldnt be regenerated.
            spectrumCanvas.addEventListener("touchmove", function(e){
                if(e instanceof TouchEvent){
                    var pos = spectrumCanvas.getBoundingClientRect();

                    var x = e.changedTouches[0].clientX - pos.left;
                    var y = e.changedTouches[0].clientY - pos.top;

                    console.log("x: "+ x + "y: " + y);                
                }
            });

            document.getElementById("hue-popup-exit").addEventListener("click", function(){
                closeColorWindow();
            });
            
        }

    }

    function createHueConnection(){
        var hue = jsHue();

        hue.discover(
            function(bridges) {
                if(bridges.length === 0) {
                    console.log('No bridges found. :(');
                }
                else {
                    bridges.forEach(function(e) {
                        connectToBridge(e.internalipaddress);
                    });
                }
            },
            function(error) {
                console.error(error.message);
            }
        );
        
    }


    function connectToBridge(ip){
        var bridge = hue.bridge(ip);
         
    }
    
    var nextId = 0;
    function createNewLightBar(){

        var lightBarContainer = document.createElement("div");
        lightBarContainer.className = "hue-lightbar-container";
        lightBarContainer.id = "lightbar" + nextId;
        
        var lightBar = document.createElement("div");
        lightBar.id = "lightbarC"+nextId;
        lightBar.className = "hue-lightbar-c";

        var lightIndicator = document.createElement("div");
        lightIndicator.id = "lightindicator" + nextId;
        lightIndicator.className = "hue-light-indicator glowing";

        lightIndicator.style.background = "#f0f0f0";

        lightIndicator.addEventListener("click", function(e){
           toggleColorWindow(); 
        });

        var textContainer = document.createElement("div");
        textContainer.className = "hue-light-text";
        var lightName = document.createElement("p");
        var lightOpacity = document.createElement("p");
        lightName.textContent = "name";
        lightName.className ="hue-text";
        lightOpacity.textContent = "light (%)";
        lightOpacity.className = "hue-text";

        var toggleBar = document.createElement("div");
        toggleBar.className = "hue-toggle-bar";


        toggleBar.addEventListener("click", function(e){
           var id = document.getElementById(this.dataset.button);
           if(id.className == "hue-toggle-bar-button")
                id.className = "hue-toggle-bar-button-toggled";
            else
                id.className = "hue-toggle-bar-button";
        });

        var toggleBarButton = document.createElement("div");
        toggleBarButton.id = "hue-toggle-button"+nextId;
        toggleBarButton.className = "hue-toggle-bar-button";

        toggleBar.dataset.button = toggleBarButton.id;

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

    function toggleColorWindow(){
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


    return {
        init : init,
    }
}();