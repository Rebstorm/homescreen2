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
        container.textContent = "new note";

        mainPopup.appendChild(container);




    }

    return {
        getAllNotes: getAllNotes,
    }

}();