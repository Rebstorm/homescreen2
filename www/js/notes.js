var Notes = function(){
    
    function getAllNotes(){
        createNotes();
    }

    function init(){
       createConstantInterface();
    }

    function createConstantInterface(){
        if(document.getElementById("notes-container") == undefined){
            var appC = document.getElementById("app");
            var notesContainer = document.createElement("div");
            notesContainer.id = "notes-container";


            var addButton = document.createElement("div");
            addButton.className = "notes-control-button";
            addButton.id = "notes-control-button-add";
            
            addButton.addEventListener("click", function(e){
                createNewNote();
            })

            var addButtonText = document.createElement("p");
            addButtonText.className = "notes-control-button-text";
            addButtonText.textContent = "+";
            
            addButton.appendChild(addButtonText);
            notesContainer.appendChild(addButton);
            
            appC.appendChild(notesContainer);

        }
    }


    function createNewNote(){

        if(document.getElementById("main-popup-content") == undefined){
            createNotePopup();
        }

        AppInit.startNewActivity();

    }
    
    var setButton = "none";
    function createNotePopup(){
        var mainPopup = document.getElementById("main-popup");
        
        var container = document.createElement("div");
        container.id = "main-popup-content";
        

        var mainC = document.createElement("div");
        mainC.id = "main-note-c";
        mainC.className = "main-note-ct";
        
        var titleInputLabel = document.createElement("div");
        titleInputLabel.textContent = "Title";
        titleInputLabel.className ="main-note-title";

        var titleInput = document.createElement("input");
        titleInput.id="main-note-title-input";
        titleInput.type = "text";

        var importantLowButton = document.createElement("div");
        importantLowButton.className = "main-note-importance-button";
        
        var colorCodebarLow = document.createElement("div");
        colorCodebarLow.className = "main-note-colorbar-low";
        
        var importanceLowText = document.createElement("div");
        importanceLowText.textContent = "low";

        importantLowButton.appendChild(colorCodebarLow);
        importantLowButton.appendChild(importanceLowText);

        importantLowButton.addEventListener("click", function(e){
            setButton = "low";
            removeHighLight();
            this.style.boxShadow = "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)";
        });
        
        var importantMiddleButton = document.createElement("div");
        importantMiddleButton.className = "main-note-importance-button";

        var colorCodebarMiddle = document.createElement("div");
        colorCodebarMiddle.className = "main-note-colorbar-middle";
        
        var importanceMiddleText = document.createElement("div");
        importanceMiddleText.textContent = "middle";

        importantMiddleButton.appendChild(colorCodebarMiddle);
        importantMiddleButton.appendChild(importanceMiddleText);

        importantMiddleButton.addEventListener("click", function(e){
            setButton = "middle";
            removeHighLight();
            this.style.boxShadow = "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)";
        });

        var importantHighButton = document.createElement("div");
        importantHighButton.className = "main-note-importance-button";

        var colorCodebarHigh = document.createElement("div");
        colorCodebarHigh.className = "main-note-colorbar-high";
        
        var importanceHighText = document.createElement("div");
        importanceHighText.textContent = "high";

        importantHighButton.appendChild(colorCodebarHigh);
        importantHighButton.appendChild(importanceHighText);

        importantHighButton.addEventListener("click", function(e){
            setButton = "high";
            removeHighLight();
            this.style.boxShadow = "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)";
        });
        
        var descriptionAreaTitle = document.createElement("div");
        descriptionAreaTitle.className = "main-notes-description-title";
        descriptionAreaTitle.textContent = "Description";

        var descriptionArea = document.createElement("textarea");
        descriptionArea.id = "main-notes-description";
        descriptionArea.className = "main-notes-description-area";
        
        var cancelButton = document.createElement("div");
        cancelButton.id = "main-notes-cancel-btn";
        cancelButton.className = "main-notes-cancel-button";
        cancelButton.addEventListener("click", function(e){
           console.log("clear note"); 
        });

        var cancelImg = document.createElement("img");
        cancelImg.className = "main-notes-cancel-img";
        cancelImg.src = "resources/system/exit.svg";
        cancelButton.appendChild(cancelImg);
    
        var okButton = document.createElement("div");
        okButton.id = "main-notes-ok-btn";
        okButton.className = "main-notes-ok-button";
        okButton.addEventListener("click", function(e){
            var t = document.getElementById("main-note-title-input").value;
            if(t == ""){
                console.log("no title given"); 
                return;
            }
            var d = document.getElementById("main-notes-description").value;
            
            saveNote(t, setButton, d);
            AppInit.killActivity();
        });

              
        var okImg = document.createElement("img");
        okImg.className = "main-notes-ok-img";
        okImg.src = "resources/system/check.svg";
        okButton.appendChild(okImg);
        

        mainC.appendChild(titleInputLabel);
        mainC.appendChild(titleInput);
        mainC.appendChild(importantLowButton);
        mainC.appendChild(importantMiddleButton);
        mainC.appendChild(importantHighButton);
        mainC.appendChild(descriptionAreaTitle);
        mainC.appendChild(descriptionArea);
        mainC.appendChild(cancelButton);
        mainC.appendChild(okButton);

        container.appendChild(mainC);
        mainPopup.appendChild(container);

        function removeHighLight(){
            var t = document.getElementsByClassName("main-note-importance-button");
            for(var i = 0; i < t.length; i++){
                t[i].style.boxShadow = "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)";
            }
        }
    }


    function saveNote(title, importance, description, array, deleteMode){
               
        if(title == undefined)
            title = "asd";

        if(importance == undefined)
            importance = "low";

        if(description == undefined)
            description = ""; 

        var x = { 
            title: title,
            importance: importance,
            description: description
        };


        if(array)
            x = array;

        FileUtil.checkAppSettings(Files.Notes, function(fEntry){
            FileUtil.readFile(fEntry.fEntry, function(r){
                // file is empty
                try{
                    if(r == ""){
                       var a = [];
                       a.push(x);
                       FileUtil.writeFile(fEntry.fEntry, JSON.stringify(a));
                    } else if(!deleteMode) {
                        var o = JSON.parse(r);
                        o.push(x);
                                                    
                        FileUtil.writeFile(fEntry.fEntry, JSON.stringify(o));
                    } else if(deleteMode) {
                        var o = x;
                        FileUtil.writeFile(fEntry.fEntry, JSON.stringify(o), undefined, true);
                    }

                    createNotes();

                } catch(e){
                     console.log(e);
                     if(e.stack.indexOf("SyntaxError") >= 0){
                        FileUtil.writeFile(fEntry.fEntry, "", true);
                     }
                }
            });
        });
    }
    var currentNotes;
    function createNotes(){

        FileUtil.checkAppSettings(Files.Notes, function(fEntry){
            FileUtil.readFile(fEntry.fEntry, function(r){
                
                try{

                   if(document.getElementById("notes-all-container"))
                        document.getElementById("notes-container").removeChild(document.getElementById("notes-all-container"));

                   if(r == ""){
                        console.log("no notes are available");
                    return;
                   }
                   var x = JSON.parse(r);
                   currentNotes = x;

                   
                   for(var i = 0; i < x.length; i++){
                       createNote(x[i]);
                   }

                } catch(e){
                     console.log(e);
                     if(e.stack.indexOf("SyntaxError") >= 0){
                        FileUtil.writeFile(fEntry.fEntry, "", true);
                     }
                }
            });
        });
    }

    function createNote(obj){

        var c;
        if(document.getElementById("notes-all-container") == undefined){
            c = document.createElement("div");
            c.id="notes-all-container";

            var container = document.getElementById("notes-container");
            container.appendChild(c);

        } else {
            c = document.getElementById("notes-all-container");
        }

        var boxReminder = document.createElement("div");
        boxReminder.className = "note-note-box";
        boxReminder.dataset.note = JSON.stringify(obj);

        boxReminder.addEventListener("click", function(e){
           var dObject = JSON.parse(this.dataset.note);
           var objectsFound = findByMatchingProperties(currentNotes, dObject);
           
           currentNotes.splice(objectsFound, 1);

           saveNote(undefined, undefined, undefined, currentNotes, true);
        });

        var noteTitle = document.createElement("p");
        noteTitle.textContent = obj.title;

        var noteImportance = document.createElement("div");
        var imp;
        switch(obj.importance){
            case "low":
                imp = "main-note-colorbar-low";
                break;
            case "middle":
                imp = "main-note-colorbar-middle";
                break;
            case "high":
                imp = "main-note-colorbar-high";
                break;

            default:
                imp = "main-note-colorbar-low";
                break;

        }
        noteImportance.className = imp;

        var noteDescription = document.createElement("p");
        noteDescription.textContent = obj.description;
        
        boxReminder.appendChild(noteImportance);
        boxReminder.appendChild(noteTitle);
        boxReminder.appendChild(noteDescription);

        c.appendChild(boxReminder);
    }

    function findByMatchingProperties(set, properties) {
        for(var i = 0; i < set.length; i++){
            if(set[i].title == properties.title){
                if(set[i].importance == properties.importance){
                    if(set[i].description == properties.description){
                        return i;
                    }
                }
            }

        }
    }


    return {
        init: init,
        getAllNotes: getAllNotes,
    }

}();