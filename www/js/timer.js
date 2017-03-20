var Timer = function(){
    
    function init(){
        createConstantInterface();
    }

    function createConstantInterface(){

        if(document.getElementById("main-popup-content") == undefined){

            var c = document.getElementById("main-popup");
            
            var container = document.createElement("div");
            container.id = "main-popup-content";


            var containerTimer = document.createElement("div");
            containerTimer.className = "timer-fullview";
            //containerTimer.textContent = "I am ze timer";
            
            var uiScrollContainer = document.createElement("div");
            uiScrollContainer.className = "timer-ui-scroll";
            
            var uiScrollContainerMin = document.createElement("div");
            uiScrollContainerMin.className = "timer-ui-scroll-min";

            var uiScrollContainerMinButtons = document.createElement("div");
            uiScrollContainerMinButtons.className = "timer-ui-scroll-min-btns";

            var uiPlusButtonMin = document.createElement("div");
            uiPlusButtonMin.textContent = "+";
            uiPlusButtonMin.className = "timer-ui-scroll-min-btn";

            uiScrollContainerMinButtons.appendChild(uiPlusButtonMin);
            

            var txtScrollContainerMin = document.createElement("div");
            txtScrollContainerMin.id="time-txt-min";
            txtScrollContainerMin.className = "time-txt-scroll-min";
            txtScrollContainerMin.textContent = "00";
            var minValue = 00;
            var lastMinValue = 0;
            var lastMinTime = "";
            txtScrollContainerMin.addEventListener("touchmove", function(e){

                if(Date.now() - lastMinTime < 30)
                    return;

                if(lastMinValue > e.changedTouches[0].clientY){
                    minValue -= 1;
                } else {
                    minValue += 1;
                }

                if(minValue > 59){
                    minValue = 00;
                } else if(minValue == -1){
                    minValue = 59;
                }
                
                this.textContent = minValue;
                lastMinValue = e.changedTouches[0].clientY;
                lastMinTime = Date.now();
            });

            uiScrollContainerMin.appendChild(txtScrollContainerMin);


            var uiScrollContainerSec = document.createElement("div");
            uiScrollContainerSec.className = "timer-ui-scroll-sec";
            
            var uiScrollContainerSecButtons = document.createElement("div");
            uiScrollContainerSecButtons.className = "timer-ui-scroll-sec-btns";

            var txtScrollContainerSec = document.createElement("div");
            txtScrollContainerSec.id="time-txt-sec";
            txtScrollContainerSec.className = "time-txt-scroll-sec";
            txtScrollContainerSec.textContent = "00";
            var secValue = 00;
            var lastSecValue = 0;
            var lastSecTime = "";
            txtScrollContainerSec.addEventListener("touchmove", function(e){

                if(Date.now() - lastSecTime < 30)
                    return;

                if(lastSecValue > e.changedTouches[0].clientY){
                    secValue -= 1;
                } else {
                    secValue += 1;
                }

                if(secValue > 59){
                    secValue = 00;
                    document.getElementById("time-txt-min").textContent = parseInt(document.getElementById("time-txt-min").textContent) + 1;
                } else if(secValue == -1){
                    secValue = 59;
                }
                
                this.textContent = secValue;
                lastSecValue = e.changedTouches[0].clientY;
                lastSecTime = Date.now();
            });

            uiScrollContainerSec.appendChild(txtScrollContainerSec);
            
            uiScrollContainer.appendChild(uiScrollContainerMinButtons);
            uiScrollContainer.appendChild(uiScrollContainerMin);
            uiScrollContainer.appendChild(uiScrollContainerSec);
            uiScrollContainer.appendChild(uiScrollContainerSecButtons);

            var okButton =  document.createElement("div");
            okButton.className = "main-notes-ok-button";
            
            var okButtonImg = document.createElement("img");
            okButtonImg.className = "main-notes-ok-img";
            okButtonImg.src = "resources/system/check.svg";
                       
            okButton.appendChild(okButtonImg);


            okButton.addEventListener("click", function(e){
                var timeOut = (secValue*1000) + (minValue*1000*60);
                secValue = 0;
                minValue = 0;


                setTimer(timeOut);
            });
                       
            containerTimer.appendChild(uiScrollContainer);
            containerTimer.appendChild(okButton);

            container.appendChild(containerTimer);
            c.appendChild(container);


            AppInit.startNewActivity();

        }


        function setTimer(timeOut){
            document.getElementById("time-txt-sec").textContent = "00";
            document.getElementById("time-txt-min").textContent = "00";
            
            setTimeout(function(){
                QuickPopup.show("Timer", "The timer has run out!");
            }, timeOut);
        }
        
    }


    return {
        init: init,
    }

}();