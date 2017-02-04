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

   return {
        changeCSSClass: changeCSSClass,
   } 
}();