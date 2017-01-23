var Notes = function(){
    
    function getAllNotes(){
        init();
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
        
        var importantMiddleButton = document.createElement("div");
        importantMiddleButton.className = "main-note-importance-button";

        var colorCodebarMiddle = document.createElement("div");
        colorCodebarMiddle.className = "main-note-colorbar-middle";
        
        var importanceMiddleText = document.createElement("div");
        importanceMiddleText.textContent = "low";

        importantMiddleButton.appendChild(colorCodebarMiddle);
        importantMiddleButton.appendChild(importanceMiddleText);

        var importantHighButton = document.createElement("div");
        importantHighButton.className = "main-note-importance-button";

        var colorCodebarHigh = document.createElement("div");
        colorCodebarHigh.className = "main-note-colorbar-high";
        
        var importanceHighText = document.createElement("div");
        importanceHighText.textContent = "high";

        importantHighButton.appendChild(colorCodebarHigh);
        importantHighButton.appendChild(importanceHighText);
        
        var descriptionAreaTitle = document.createElement("div");
        descriptionAreaTitle.className = "main-notes-description-title";
        descriptionAreaTitle.textContent = "Description";

        var descriptionArea = document.createElement("textarea");
        descriptionAreaTitle.id = "main-notes-description";
        descriptionArea.className = "main-notes-description-area";
        
        var cancelButton = document.createElement("div");
        cancelButton.id = "main-notes-cancel-btn";
        cancelButton.className = "main-notes-cancel-button";

        var cancelImg = document.createElement("img");
        cancelImg.className = "main-notes-cancel-img";
        cancelImg.src = "resources/system/exit.svg";
        cancelButton.appendChild(cancelImg);
    
        var okButton = document.createElement("div");
        okButton.id = "main-notes-ok-btn";
        okButton.className = "main-notes-ok-button";

              
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




    }

    return {
        getAllNotes: getAllNotes,
    }

}();