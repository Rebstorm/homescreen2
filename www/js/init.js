var AppInit = function(){
    
    function init(){
        getAvailableApps();
    }


    function getAvailableApps(){
        return Apps.getAllApps();
    }


    return {
        init: init,
    }

}();

