var HueApp = function(){
    
    function init(){
        createInterface();
        AppInit.startNewActivity();
    }

    function createInterface(){
        var mainPopup = document.getElementById("main-popup");
        var mainContainer = document.createElement("div");
        
        var hueAppContainer = document.createElement("div");

        var lightBars = document.createElement("div");

        mainContainer.id = "main-app-content";
        
        hueAppContainer.id = "hue-app-c";
        hueAppContainer.className = "full-app-c";
        hueAppContainer.textContent = "Hue App";

        lightBars.id = "hue-app-lightbars";
        lightBars.style.width = "100%";
        lightBars.className = "hue-light-bar";

        var lightBarContainer = createNewLightBar();
        var light2 = createNewLightBar();

        lightBars.appendChild(lightBarContainer);
        lightBars.appendChild(light2);

        hueAppContainer.appendChild(lightBars);
        mainContainer.appendChild(hueAppContainer);
        mainPopup.appendChild(mainContainer);


    }
    
    var nextId = 0;
    function createNewLightBar(){

        var lightBarContainer = document.createElement("div");
        lightBarContainer.className = "hue-lightbar-container";
        lightBarContainer.id = "lightbar" + nextId;
        
        var lightBar = document.createElement("div");

        var lightIndicator = document.createElement("div");
        lightIndicator.id = "lightindicator" + nextId;
        lightIndicator.className = "hue-light-indicator";

        lightIndicator.style.background = "#f0f0f0";

        var textContainer = document.createElement("div");
        textContainer.className = "hue-light-text";
        var lightName = document.createElement("p");
        var lightOpacity = document.createElement("p");
        lightName.textContent = "name";
        lightOpacity.textContent = "light (%)";

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
        
        lightBar.appendChild(lightIndicator);
        lightBar.appendChild(textContainer);
        lightBar.appendChild(toggleBar);
        
        lightBarContainer.appendChild(lightBar);

        nextId++;

        return lightBarContainer;

    }


    return {
        init : init,
    }
}();