var QuickPopup = function(){
    

    function show(title, content){
        document.getElementById("quickpopup").style.display = "block";

        document.getElementById("quickpopup-title").textContent = title;
        document.getElementById("quickpopup-content").innerHTML = content;
    }

    function hide(){
        document.getElementById("quickpopup").style.display = "none";
    }


    return {
        show: show,
        hide: hide,
    }

}();