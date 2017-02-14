var ClockApp = function(){
   
   function init(){
       setupClock();
   } 

   function setupClock(){

       var clock = document.getElementById("clock-display");
       var hours = document.getElementById("hour-display");
       var minutes = document.getElementById("minute-display");
       var seconds = document.getElementById("second-display");
       
       var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        //clock.innerHTML = h + ":" + m + ":" + s;
        if(seconds.textContent == s){
           seconds.className = "clock"; 
        } else {
           seconds.className = "clock fade-in-fast";   
        }

        if(minutes.textContent == m){
           minutes.className = "clock"; 
        } else {
           minutes.className = "clock fade-in-fast";  
        }

        if(hours.textContent == h){
           hours.textContent = "clock";
        } else {
           hours.className = "clock fade-in-fast";
        }
        
        hours.textContent = h;  
        minutes.textContent = m;
        seconds.textContent = s;

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