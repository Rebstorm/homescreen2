var AppInit = function(){
    
    function init(){
        setUniversalHandlers();
        getAvailableApps();
        getAvailableNotes();
    }


    function getAvailableApps(){
        Apps.getAllApps();
    }

    function getAvailableNotes(){
        Notes.getAllNotes();
    }

    function setUniversalHandlers(){

        // Keeps apps awake, cant sleep.
        window.plugins.insomnia.keepAwake();

        // exit button on popup screen
        document.getElementById("main-popup-exit").addEventListener("click", function(){
           document.getElementById("main-popup").className = "main-popup-out";
           if(document.getElementById("main-app-content"))
           document.getElementById("main-popup").removeChild(document.getElementById("main-app-content"));
           document.getElementById("main-popup").style.display = "none";

        });


        window.addEventListener("resize", function(event){
           if(window.outerWidth < 375){
               document.getElementById("uhoh").style.display = "block";
               document.getElementById("app").style.display = "none";
               // hide main-popup
               //document.getElementById("main-popup").style.display = "none";
           } else {
               document.getElementById("uhoh").style.display = "none";
               document.getElementById("app").style.display = "block";
           }


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

