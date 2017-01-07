var AppInit = function(){
    
    function init(){
        getAvailableApps();
    }


    function getAvailableApps(){
        return Apps.getAllApps();
    }

    function setUniversalHandlers(){

        
        
    }


    return {
        init: init,
    }

}();

