var Apps = function(){
    
    function getAllApps(){
        
        checkFirstTimeInstall(Files.Apps);
        
        // because weather app is a constant notes as well, perhaps. 
        WeatherApp.init();
        //createAppButton(hueApp);
       
    }

    function checkFirstTimeInstall(files){
       FileUtil.checkAppSettings(files, function(r){
           if(r.readValue == ReadValues.EMPTY){
               firstTimeInstall();
           } else {
               // do shit
           }
       });
    }


    function createAppButton(app){
        var appIconC = document.createElement("div");
        var appIcon = document.createElement("div");
        var appIconLogo = document.createElement("img");

        appIconC.className = "app-icon-c";
        
        appIcon.className = "app-icon-button";
        appIcon.addEventListener("click", app.onClick);
        
        appIconLogo.className = "app-icon-logo";
        appIconLogo.src = app.logo;
        
        appIcon.appendChild(appIconLogo);
        appIconC.appendChild(appIcon);

        document.getElementById("apps-container").appendChild(appIconC);

    }


    function firstTimeInstall(){      
        createAppButton(AppsRepo.hueApp);
        //createAppButton(AppsRepo.testApp);
    }

    return {
        getAllApps : getAllApps
    }
}();

var AppsRepo = {
    hueApp : {
        name: "Philips Hue",    
        logo: "resources/logos/bulb.svg",
        onClick: function(){
            HueApp.init();
        },
    },
    testApp: {
        name: "Internal Testing",
        logo: "resources/logos/test.svg",
        onClick: function(){
            console.log("this be test app");
        },

    }
}
