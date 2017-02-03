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
        //createAppButton(AppsRepo.hueApp);
        //createAppButton(AppsRepo.testApp);
        if(document.getElementById("main-popup-container") == undefined){
            createConstantInterface();
        }

    }

    function createConstantInterface(){
        var mainPopup = document.getElementById("main-popup");

        var container = document.createElement("div");
        container.id = "main-popup-content";
        
        var firstInstallContainer = document.createElement("div");
        
        var welcomeContainer = document.createElement("p");
        welcomeContainer.className = "first-time-welcome-container";
        welcomeContainer.innerHTML = "Hello and welcome to Homescreen2 <3<br> Im glad you've chosen to try it out.<br>Before we start off, do you want to use:";

        var appContainer = document.createElement("div");
        appContainer.className = "first-time-app-container";

        for(var i = 0; i < Object.keys(AppsRepoLive).length; i++){
            var appRow = document.createElement("div");
            appRow.className = "first-time-app-row";
            appRow.dataset.id = i;
            appRow.id = "app-row"+i;

            appRow.addEventListener("click", function(e){
                var checkbox = document.getElementById("check-"+this.dataset.id);

                if(checkbox.checked)
                    checkbox.checked = false;
                else
                    checkbox.checked = true;
            })
            
            var appCheckbox = document.createElement("input");
            appCheckbox.className = "first-time-app-check";
            appCheckbox.type = "checkbox";
            appCheckbox.id = "check-"+i;
           
            var appLogo = document.createElement("img");
            appLogo.className = "first-time-logo-img";


            var appTxt = document.createElement("div");
            appTxt.className = "first-time-app-txt";
            
            appLogo.src = AppsRepoLive[Object.keys(AppsRepoLive)[i]].logo;
            appTxt.textContent = AppsRepoLive[Object.keys(AppsRepoLive)[i]].name;
            
            
            
            appRow.appendChild(appCheckbox);
            appRow.appendChild(appLogo);
            appRow.appendChild(appTxt);
            appContainer.appendChild(appRow);
        }

        

        container.appendChild(firstInstallContainer);
        container.appendChild(welcomeContainer);
        container.appendChild(appContainer);

        mainPopup.appendChild(container);

        AppInit.startNewActivity();
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

var AppsRepoLive = {
    hueApp : {
        name: "Philips Hue",    
        logo: "resources/logos/bulb.svg",
        onClick: function(){
            HueApp.init();
        },
    },
}
