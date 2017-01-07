var Apps = function(){
    
    function getAllApps(){

        var hueApp = {
            logo: "resources/logos/hue.png",
            onClick: function(){
                console.log("hello world");
            }
        };

        createAppButton(hueApp);
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
        //return appIconC;
    }

    return {
        getAllApps : getAllApps
    }
}();
