import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent implements OnInit {

  title: string;
  errMessage: string;
  note: Note;
  notes: Array<Note>;

  constructor(private notesService: NotesService) {
    this.title = 'Take a note';
    this.note = new Note();
    this.notes = [];
  }

  ngOnInit() {
    const getNotesResponse = this.notesService.getNotes();

    getNotesResponse.subscribe(
      (response) => {
        this.notes = response;
      },
      (error) => {
        this.errMessage = error.message;
      }
    );

  }

  addNotes() {

    if (!this.note.title || !this.note.text) {
      this.errMessage = 'Title and Text both are required fields';
    } else {
      const addNoteResponse = this.notesService.addNote(this.note);

      addNoteResponse.subscribe(
        (response) => { },
        (err) => {
          if (err.error) {
            this.errMessage = err.error.message;
          } else {
            this.errMessage = err.message;
          }
        }
      );
    }
  }


}
