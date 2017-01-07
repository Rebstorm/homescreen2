var AppInit = function(){
    
    function init(){
        setUniversalHandlers();
        getAvailableApps();
    }


    function getAvailableApps(){
        return Apps.getAllApps();
    }

    function setUniversalHandlers(){

        // Keeps apps awake, cant sleep.
        window.plugins.insomnia.keepAwake();

        // exit button on popup screen
        document.getElementById("main-popup-exit").addEventListener("click", function(){
           document.getElementById("main-popup").className = "main-popup-out";
           setTimeout(function() {
              document.getElementById("main-popup").style.display = "none";
           }, 300);
           //document.getElementById("main-popup-exit-div").css.display = "none"; 
        });
        
    }

    function startNewActivity(){
        document.getElementById("main-popup").style.display = "block";
        document.getElementById("main-popup").className = "main-popup-in";
    }


    return {
        init: init,
        startNewActivity : startNewActivity,
    }

}();

