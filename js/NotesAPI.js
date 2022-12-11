export default class NotesAPI {
    static getAllNotes() {
        const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");

        return notes.sort((a, b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
    }

    static saveNote(noteToSave) {
        const notes = NotesAPI.getAllNotes();
        const existing = notes.find(note => note.id == noteToSave.id);

        // Edit/Update
        if (existing) {
            existing.title = noteToSave.title;
            existing.body = noteToSave.body;
            existing.updated = new Date().toISOString();
        } else {
            noteToSave.id = Math.floor(Math.random() * 1000000);
            noteToSave.updated = new Date().toISOString();
            notes.push(noteToSave);
        }

        localStorage.setItem("notesapp-notes", JSON.stringify(notes));
    }

    static deleteNote(id) {
        const notes = NotesAPI.getAllNotes();
        const newNotes = notes.filter(note => note.id != id);

        localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
    }

    static shareNote(noteToShare) {
        const notes = NotesAPI.getAllNotes();
        const copyBody = notes.find(note => note.id == noteToShare.id);

        if (copyBody) {
            copyBody.body = noteToShare.body;
        }
    }

    static settingsNote() {
      const openModalButtons = document.querySelectorAll('[data-modal-target]')
        const closeModalButtons = document.querySelectorAll('[data-close-button]')
        const overlay = document.getElementById('overlay')

        openModalButtons.forEach(button => {
            button.addEventListener('click', () => {
              const modal = document.querySelector(button.dataset.modalTarget)
              openModal(modal)
            })
          })
          
          overlay.addEventListener('click', () => {
            const modals = document.querySelectorAll('.settingsmodal.active')
            modals.forEach(modal => {
              closeModal(modal)
            })
          })
          
          closeModalButtons.forEach(button => {
            button.addEventListener('click', () => {
              const modal = button.closest('.settingsmodal')
              closeModal(modal)
            })
          })
          
          function openModal(modal) {
            if (modal == null) return
            modal.classList.add('active')
            overlay.classList.add('active')
          }
          
          function closeModal(modal) {
            if (modal == null) return
            modal.classList.remove('active')
            overlay.classList.remove('active')
          }
       
      }

      static darkModeToggle(){
        var body = document.body;

        if (body.classList.contains("dark-mode")) {
          // If the body element has the "dark-mode" class, remove it
          body.classList.remove("dark-mode");
        } else {
          // If the body element does not have the "dark-mode" class, add it
          body.classList.add("dark-mode");
        }
      }
    
    
    static infoNote() {
        const openModalButtons = document.querySelectorAll('[data-modal-target]')
        const closeModalButtons = document.querySelectorAll('[data-close-button]')
        const overlay = document.getElementById('overlay')

        openModalButtons.forEach(button => {
            button.addEventListener('click', () => {
              const modal = document.querySelector(button.dataset.modalTarget)
              openModal(modal)
            })
          })
          
          overlay.addEventListener('click', () => {
            const modals = document.querySelectorAll('.infomodal.active')
            modals.forEach(modal => {
              closeModal(modal)
            })
          })
          
          closeModalButtons.forEach(button => {
            button.addEventListener('click', () => {
              const modal = button.closest('.infomodal')
              closeModal(modal)
            })
          })
          
          function openModal(modal) {
            if (modal == null) return
            modal.classList.add('active')
            overlay.classList.add('active')
          }
          
          function closeModal(modal) {
            if (modal == null) return
            modal.classList.remove('active')
            overlay.classList.remove('active')
          }
    }
}