var Apps = function(){
    
    function getAllApps(){
        
        checkFirstTimeInstall();
        
        // because weather app is a constant and so is notes as well, perhaps. 
        WeatherApp.init();
        ClockApp.init();

       
    }

    function checkFirstTimeInstall(){
       FileUtil.checkAppSettings(Files.Apps, function(r){
           if(r.readValue == ReadValues.EMPTY){
               firstTimeInstall();
           } else {
               createUserInterface(r.readValue);
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
        if(document.getElementById("main-popup-content") == undefined){
            createConstantInterface();
        }

    }

    function createConstantInterface(){

        //hide exit button
        document.getElementById("main-popup-exit").style.display = "none";
        
        var mainPopup = document.getElementById("main-popup");

        var container = document.createElement("div");
        container.id = "main-popup-content";
        
        var firstInstallContainer = document.createElement("div");
        firstInstallContainer.style.marginLeft = "1em";
        firstInstallContainer.style.textAlign = "center";
        
        var welcomeContainer = document.createElement("p");
        welcomeContainer.className = "first-time-welcome-container";
        welcomeContainer.innerHTML = "Hello and welcome to Homescreen2 <3<br> Im glad you've chosen to try it out.<br><h3> App Integration </h3>Before we start off, do you want to use?";

        var appContainer = document.createElement("div");
        appContainer.className = "first-time-app-container";

        for(var i = 0; i < Object.keys(AppsRepo).length; i++){
            var appRow = document.createElement("div");
            appRow.className = "first-time-app-row";
            appRow.dataset.id = i;
            appRow.dataset.name = AppsRepo[Object.keys(AppsRepo)[i]].name; 
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
            appCheckbox.dataset.name = AppsRepo[Object.keys(AppsRepo)[i]].name; 
           
            var appLogo = document.createElement("img");
            appLogo.className = "first-time-logo-img";


            var appTxt = document.createElement("div");
            appTxt.className = "first-time-app-txt";
            
            appLogo.src = AppsRepo[Object.keys(AppsRepo)[i]].logo;
            appTxt.textContent = AppsRepo[Object.keys(AppsRepo)[i]].name;         
            
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
            appRow.className = "first-time-theme-row";
            appRow.dataset.id = i;
            appRow.dataset.theme = ThemeRepo[Object.keys(ThemeRepo)[i]].name;
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
            appCheckbox.dataset.name = ThemeRepo[Object.keys(ThemeRepo)[i]].name;
           
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


        var okButton = document.createElement("div");
        okButton.id = "first-time-ok-btn";
        okButton.className = "main-notes-ok-button";
        okButton.addEventListener("click", function(e){
           configureApp(e);
        });

              
        var okImg = document.createElement("img");
        okImg.className = "main-notes-ok-img";
        okImg.src = "resources/system/check.svg";
        okButton.appendChild(okImg);

        
        firstInstallContainer.appendChild(welcomeContainer);
        firstInstallContainer.appendChild(appContainer);
        firstInstallContainer.appendChild(themeSelectionCon);
        firstInstallContainer.appendChild(okButton);
        
        container.appendChild(firstInstallContainer);
        mainPopup.appendChild(container);

        AppInit.startNewActivity();
    }

    function configureApp(e){
        
        var appsUsed = document.getElementsByClassName("first-time-app-check");
        var apps = [];
        for(var i = 0; i < appsUsed.length; i++){
            if(appsUsed[i].checked)
                apps.push(appsUsed[i].dataset.name);
        }

        var themeUsed = document.getElementsByClassName("first-time-theme-check");
        var theme;
        for(var i = 0; i < themeUsed.length; i++){
            if(themeUsed[i].checked){
               theme = themeUsed[i].dataset.name;
               break;
            }
        }

        //console.log("theme used: " + theme + " \n apps used: " + apps);

        var o = {
            theme: theme,
            apps: apps
        };
        
        // save
        FileUtil.checkAppSettings(Files.Apps, function(fEntry){

           var p = FileUtil.writeFile(fEntry.fEntry, JSON.stringify(o));

           p.then(function(d){
              // let people exit and use it like normal
              document.getElementById("main-popup-exit").style.display = "block";
              AppInit.killActivity();
           });
          
        });

    }

    function createUserInterface(data){

        try{
            
            var o = JSON.parse(data);

            for(var i = 0; i < o.apps.length; i++){
                for(var x = 0; x < Object.keys(AppsRepo).length; x++){
                    if(o.apps[i] == AppsRepo[Object.keys(AppsRepo)[x]].name){
                        createAppButton(AppsRepo[Object.keys(AppsRepo)[x]]);
                    }
                }
            }

            for(var i = 0; i < Object.keys(ThemeRepo).length; i++){
                    if(o.theme == ThemeRepo[Object.keys(ThemeRepo)[i]].name){
                        HelpFunctions.setTheme(ThemeRepo[Object.keys(ThemeRepo)[i]]);
                        break;
                    }
            }
            


        } catch(e){
            console.log(e);
        }

    }

    return {
        getAllApps : getAllApps
    }
}();

var AppsRepoTest = {
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

var AppsRepo = {
    hueApp : {
        name: "Philips Hue",    
        logo: "resources/logos/bulb.svg",
        onClick: function(){
            HueApp.init();
        },
    },
}
