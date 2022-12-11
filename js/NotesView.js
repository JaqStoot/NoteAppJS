export default class NotesView {
    constructor(root, { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete, onNoteInfo, onNoteSettings, onNoteShare, onDarkModeToggle } = {}) {
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;
        this.onNoteInfo = onNoteInfo;
        this.onNoteSettings = onNoteSettings;
        this.onNoteShare = onNoteShare;
        this.onDarkModeToggle = onDarkModeToggle;
        this.root.innerHTML = `
            <div class="notes__sidebar">
                <button class="notes__add" type="button">Add Note</button>
                <div class="notes__list"></div>
                <div class="notes__sidebar_footer">
                    <div class="btn-group">
                        <button class="notes__settings" data-modal-target="#modal2" style="width:33.3%" type="button">Settings</button>
                        <button class="notes__share" style="width:33.3%" type="button">Share</button>
                        <button class="notes__info" data-modal-target="#modal1" style="width:33.3%" type="button">Info</button>
                    </div>
                </div>
                <div class="infomodal" id="modal1">
                    <div class="infomodal-header">
                        <div class="title">Information</div>
                        <button data-close-button class="close-button">&times;</button>
                    </div>
                    <div class="infomodal-body">
                        <p>Thank you for using my app! My name is Jack Stout and I am a member of Group 8, also consisting of Cole Schemel, Hannah Battreal, and Landon Middleton, and this app was designed and created for our Software Engineering class at Southeast Missouri State University. It's still in progress, but I hope you like what's here!</p>
                        <break>
                        <p>Double-click a note to delete it!</p>
                    </div>
                </div>
                <div id="overlay"></div>
                </div>
                <div class="settingsmodal" id="modal2">
                    <div class="settingsmodal-header">
                        <div class="title">Settings</div>
                        <button data-close-button class="close-button">&times;</button>
                    </div>
                    <div class="settingsmodal-body">
                        <p>This is the settings modal menu!</p>
                        <break>
                        <button id="toggle-dark-mode-button" class="toggle-dark-mode-button">Dark Mode</button>
                    </div>
                    <div id="overlay"></div>
                </div>

            </div>
            <div class="notes__preview">
                <input class="notes__title" type="text" placeholder="New Note...">
                <textarea class="notes__body">New Text Here...</textarea>
                <div id="alrt" class="alrt"></div>
            </div>
            
        `;


        const btnAddNote = this.root.querySelector(".notes__add");
        const btnInfoNote = this.root.querySelector(".notes__info");
        const btnSettingsNote = this.root.querySelector(".notes__settings");
        const btnShareNote = this.root.querySelector(".notes__share");
        const btnDarkModeToggle = this.root.querySelector(".toggle-dark-mode-button")
        const inpTitle = this.root.querySelector(".notes__title");
        const inpBody = this.root.querySelector(".notes__body");

        btnAddNote.addEventListener("click", () => {
            this.onNoteAdd();
        });

        btnInfoNote.addEventListener("click", () => {
            this.onNoteInfo();
        });

        btnSettingsNote.addEventListener("click", () => {
            this.onNoteSettings();
        });

        btnDarkModeToggle.addEventListener("click", () => {
            this.onDarkModeToggle();
        });
        
        [inpTitle, inpBody].forEach(inputField => {
            inputField.addEventListener("blur", () => {
                const updatedTitle = inpTitle.value.trim();
                const updatedBody = inpBody.value.trim();

                this.onNoteEdit(updatedTitle, updatedBody);
            });
        });


        document.querySelector(".notes__share").onclick = function () {
            document.querySelector(".notes__body").select();
            document.execCommand('copy');
            //alert("Note has been copied!");

            document.getElementById('alrt').innerHTML = '<b>Note Copied!</b>';
            setTimeout(function () { document.getElementById('alrt').innerHTML = ''; }, 2000);
        }

        this.updateNotePreviewVisibility(false);


    }

    _createListItemHTML(id, title, body, updated) {
        const MAX_BODY_LENGTH = 60;

        return `
            <div class="notes__list-item" data-note-id="${id}">
                <div class="notes__small-title">${title}</div>
                <div class="notes__small-body">
                    ${body.substring(0, MAX_BODY_LENGTH)}
                    ${body.length > MAX_BODY_LENGTH ? "..." : ""}
                </div>
                <div class="notes__small-updated">
                    ${updated.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}
                </div>
            </div>
        `;
    }

    updateNoteList(notes) {
        const notesListContainer = this.root.querySelector(".notes__list");
        var noteID = 0;

        // Empty list
        notesListContainer.innerHTML = "";

        for (const note of notes) {
            const html = this._createListItemHTML(note.id, note.title, note.body, new Date(note.updated));

            notesListContainer.insertAdjacentHTML("beforeend", html);
        }

        // Add select/delete events for each list item
        notesListContainer.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.addEventListener("click", () => {
                this.onNoteSelect(noteListItem.dataset.noteId);
                noteID = noteListItem.dataset.noteId;
            });

            noteListItem.addEventListener("dblclick", () => {
                const doDelete = confirm("Are you sure you want to delete this note?");

                if (doDelete) {
                    this.onNoteDelete(noteListItem.dataset.noteId);
                }
            });
        });
    }


    updateActiveNote(note) {
        this.root.querySelector(".notes__title").value = note.title;
        this.root.querySelector(".notes__body").value = note.body;

        this.root.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.classList.remove("notes__list-item--selected");
        });

        this.root.querySelector(`.notes__list-item[data-note-id="${note.id}"]`).classList.add("notes__list-item--selected");
    }

    updateNotePreviewVisibility(visible) {
        this.root.querySelector(".notes__preview").style.visibility = visible ? "visible" : "hidden";
    }
}