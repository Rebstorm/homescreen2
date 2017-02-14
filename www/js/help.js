var HelpFunctions = function(){

    function changeCSSClass(typeAndClass, newRule, newValue){
        var thisCSS=document.styleSheets[0];
        var ruleSearch=thisCSS.cssRules? thisCSS.cssRules: thisCSS.rules
        for (i=0; i<ruleSearch.length; i++)
        {
            if(ruleSearch[i].selectorText==typeAndClass)
            {
                var target=ruleSearch[i];
                break;
            }
        }
        target.style[newRule] = newValue;
    }
    

    var t;
    function getTheme(){
        return t;
    }

    function setTheme(theme){

        t = theme;

        //get theming from file. 
                  
        // body
        document.body.style.backgroundColor = theme.shadeColor;
        document.body.style.color = theme.textColor;


        // GENERAL ITEMS
        // ok buttons
        HelpFunctions.changeCSSClass("div.main-notes-ok-button", "backgroundColor", theme.altColor);
        //cancel button
        HelpFunctions.changeCSSClass("div.main-notes-cancel-button", "backgroundColor", theme.altColor);
        // show-error
        HelpFunctions.changeCSSClass("div#error-box", "backgroundColor", theme.attributionColor);
        // note add buttons
        HelpFunctions.changeCSSClass("div.notes-control-button", "box-shadow", "inset 0 0 0 1pt rgba(0,0,0, .1)"); 
        HelpFunctions.changeCSSClass("div.notes-control-button", "backgroundColor", theme.shadeColor);

        // note buttons
        HelpFunctions.changeCSSClass("div.note-note-container", "backgroundColor", theme.attributionColor);

        /* MAIN WINDOW*/
        // titlescreen/weather-bar
        document.getElementById("title-screen").style.backgroundColor = theme.mainColor;
        //main-popup window
        document.getElementById("main-popup").style.backgroundColor = theme.shadeColor;
        // button style
        HelpFunctions.changeCSSClass("div.app-icon-button", "backgroundColor", theme.altColor);
        // hue fail button style 
        HelpFunctions.changeCSSClass("div.hue-fail-refresh-button", "backgroundColor", theme.altColor);
        

        /* HUE WINDOW */
        //hue detail window
        document.getElementById("hue-color-popup").style.backgroundColor = theme.shadeColor;


        /* UHOH WINDOW */
        HelpFunctions.changeCSSClass("div#uhoh", "backgroundColor", theme.shadeColor);
     
        
        /* NOTES WINDOW */
        //Input@Notes-title
        HelpFunctions.changeCSSClass("input#main-note-title-input", "backgroundColor", theme.attributionColor);
        //textarea@Notes-description
        HelpFunctions.changeCSSClass("textarea.main-notes-description-area", "backgroundColor", theme.attributionColor);
        
    }

    function emptySettings(){

        FileUtil.checkAppSettings(Files.Apps, function(r){
          
          var p = FileUtil.writeFile(r.fEntry, "", true);
          p.then(function(d){
             var p = document.getElementsByClassName("app-icon-c");
             for(var i = 0; i < p.length; i++){
                 p[i].parentNode.removeChild(p[i]);
             }
             Apps.getAllApps(false);
          })
         
        });

    }

   return {
        changeCSSClass: changeCSSClass,
        setTheme: setTheme,
        getTheme: getTheme,
        emptySettings : emptySettings,
   } 
}();