var HueApp = function(){
    
    function init(){
        createInterface();
        AppInit.startNewActivity();
    }

    function createInterface(){
        var mainPopup = document.getElementById("main-popup");
        var mainContainer = document.createElement("div");

        mainContainer.textContent = "Hello world!";
        mainContainer.id = "main-app-content";
        
        mainPopup.appendChild(mainContainer);


    }


    return {
        init : init,
    }
}();