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

            var addButtonText = document.createElement("p");
            addButtonText.className = "notes-control-button-text";
            addButtonText.textContent = "+";
            
            addButton.appendChild(addButtonText);
            notesContainer.appendChild(addButton);
            
            appC.appendChild(notesContainer);

        }
    }


    return {
        getAllNotes: getAllNotes,
    }

}();