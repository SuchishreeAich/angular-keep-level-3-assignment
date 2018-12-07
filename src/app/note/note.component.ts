import { Component, Input } from '@angular/core';
import { RouterService } from '../services/router.service';
import { Note } from '../note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {

  @Input() note: Note;

  constructor(private routerService: RouterService) { }

  openNoteEditView() {
    const noteId = this.note.id;
    this.routerService.routeToEditNoteView(noteId);
  }
}
