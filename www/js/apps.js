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
        if(document.getElementById("main-popup-container") == undefined){
            createConstantInterface();
        }

    }

    function createConstantInterface(){
        var mainPopup = document.getElementById("main-popup");

        var container = document.createElement("div");
        container.id = "main-popup-content";
        
        var firstInstallContainer = document.createElement("div");
        firstInstallContainer.style.marginLeft = "1em";
        
        var welcomeContainer = document.createElement("p");
        welcomeContainer.className = "first-time-welcome-container";
        welcomeContainer.innerHTML = "Hello and welcome to Homescreen2 <3<br> Im glad you've chosen to try it out.<br><h3> App Integration </h3>Before we start off, do you want to use?";

        var appContainer = document.createElement("div");
        appContainer.className = "first-time-app-container";

        for(var i = 0; i < Object.keys(AppsRepoLive).length; i++){
            var appRow = document.createElement("div");
            appRow.className = "first-time-app-row";
            appRow.dataset.id = i;
            appRow.id = "app-row"+i;

            appRow.addEventListener("click", function(e){
                var checkbox = document.getElementById("check-"+this.dataset.id);
                
                if(e.target == checkbox)
                    return;

                if(checkbox.checked)
                    checkbox.checked = false;
                else
                    checkbox.checked = true;
            });
            
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


        var themeSelectionCon = document.createElement("div");
        var themeTxt = document.createElement("p");
        themeTxt.innerHTML = "<h3>Theming</h3>What theme would you like to use?";
        themeSelectionCon.appendChild(themeTxt);

        var themeSelectionRows = document.createElement("div");


        for(var i = 0; i < Object.keys(ThemeRepo).length; i++){
            var appRow = document.createElement("div");
            appRow.className = "first-time-app-row";
            appRow.dataset.id = i;
            appRow.id = "theme-row"+i;

            appRow.addEventListener("click", function(e){
                var checkbox = document.getElementById("theme-check-"+this.dataset.id);
                
                var checkedItems = document.getElementsByClassName("first-time-theme-check");

                for(var i = 0; i < checkedItems.length; i++){
                    if(e.target == checkedItems[i])
                        checkedItems[i].checked = true;
                    else
                        checkedItems[i].checked = false;
                }
                
                if(e.target == checkbox)
                    return;

                if(checkbox.checked)
                    checkbox.checked = false;
                else
                    checkbox.checked = true;
            });
            
            var appCheckbox = document.createElement("input");
            appCheckbox.className = "first-time-theme-check";
            appCheckbox.type = "checkbox";
            appCheckbox.id = "theme-check-"+i;
           
            var appLogo = document.createElement("div");
            appLogo.className = "first-time-logo-div";
            appLogo.style.backgroundColor = ThemeRepo[Object.keys(ThemeRepo)[i]].representColor;


            var appTxt = document.createElement("div");
            appTxt.className = "first-time-theme-txt";
            
            appTxt.textContent = ThemeRepo[Object.keys(ThemeRepo)[i]].name;         
            
            appRow.appendChild(appCheckbox);
            appRow.appendChild(appLogo);
            appRow.appendChild(appTxt);
            themeSelectionRows.appendChild(appRow);
            themeSelectionCon.appendChild(themeSelectionRows);
        }

        
        firstInstallContainer.appendChild(welcomeContainer);
        firstInstallContainer.appendChild(appContainer);
        firstInstallContainer.appendChild(themeSelectionCon);
        
        container.appendChild(firstInstallContainer);



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


var ThemeRepo = {
    light: {
        name: "light",
        representColor: "#fff",
        mainColor: "#fff",
        shadeColor: "#fff",
        attributionColor: "#fff",
        textColor: "#000",
        altColor: "#fff",
    },

    dark: {
        name: "dark",
        representColor: "#3F3E40",
        mainColor: "#3F3E40",
        shadeColor: "#7F7D7F",
        attributionColor: "#BEBBBF",
        textColor: "#FEF9FF",
        altColor: "#E4E0E5",


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
