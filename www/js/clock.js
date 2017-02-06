var ClockApp = function(){
   
   function init(){
       setupClock();
   } 

   function setupClock(){

       var clock = document.getElementById("clock-display");
       
       var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        clock.innerHTML =
        h + ":" + m + ":" + s;
        var t = setTimeout(setupClock, 500);
       

   }
   function checkTime(i) {
        if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
        return i;
    }


   return {
       init: init
   } 
}()