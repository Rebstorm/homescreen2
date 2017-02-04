var HelpFunctions = function(){

    function changeCSSClass(typeAndClass, newRule, newValue){
        var thisCSS=document.styleSheets[0];
        var ruleSearch=thisCSS.cssRules? thisCSS.cssRules: thisCSS.rules
        for (i=0; i<ruleSearch.length; i++)
        {
            if(ruleSearch[i].selectorText==typeAndClass)
            {
                var target=ruleSearch[i]
                break;
            }
        }
        target.style[newRule] = newValue;
    }


    function setTheme(theme){
        //get theming from file. 
                    // This is the temp one for testing.
        // body
        document.body.style.backgroundColor = theme.shadeColor;
        document.body.style.color = theme.textColor;


        // GENERAL ITEMS
        // ok buttons
        HelpFunctions.changeCSSClass("div.main-notes-ok-button", "backgroundColor", theme.altColor);

        /* MAIN WINDOW*/
        // titlescreen/weather-bar
        document.getElementById("title-screen").style.backgroundColor = theme.mainColor;
        //main-popup window
        document.getElementById("main-popup").style.backgroundColor = theme.shadeColor;
        // button style
        HelpFunctions.changeCSSClass("div.app-icon-button", "backgroundColor", theme.altColor);
        

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

   return {
        changeCSSClass: changeCSSClass,
        setTheme: setTheme,
   } 
}();