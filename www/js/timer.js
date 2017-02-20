var Timer = function(){
    
    function init(){
        createConstantInterface();
    }

    function createConstantInterface(){

        if(document.getElementById("main-popup-content") == undefined){
            console.log("create new interface!");

            var c = document.getElementById("main-popup");
            
            var container = document.createElement("div");
            container.id = "main-popup-content";


            var containerTimer = document.createElement("div");
            containerTimer.textContent = "I am ze timer";

            

            container.appendChild(containerTimer);
            c.appendChild(container);


            AppInit.startNewActivity();

        }
        
    }


    return {
        init: init,
    }

}();