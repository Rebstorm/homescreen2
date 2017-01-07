var Apps = function(){
    
    function getAllApps(){

        var hueApp = {
            logo: "resources/logos/bulb.svg",
            onClick: function(){
                console.log("hello world");
            }
        };

        createAppButton(hueApp);
        createAppButton(hueApp);
        createAppButton(hueApp);
        createAppButton(hueApp);
    }

    function firstTimeInstall(){

        

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

    return {
        getAllApps : getAllApps
    }
}();
