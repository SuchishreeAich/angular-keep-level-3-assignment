import { Injectable } from '@angular/core';
import { Note } from '../note';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NotesService {

  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;

  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) {
    this.notes = [];
    this.notesSubject = new BehaviorSubject(this.notes);
  }

  fetchNotesFromServer() {

    const token = this.authenticationService.getBearerToken();
    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    };

    const getNotesResponse = this.httpClient.get<Array<Note>>('http://localhost:3000/api/v1/notes',
    httpOptions);

    getNotesResponse.subscribe(
      (noteList) => {
        this.notes = noteList;
        this.notesSubject.next(this.notes);
      }
    );
  }

  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {

    const bearerToken = this.authenticationService.getBearerToken();
    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`)
    };

    const addNoteResponse = this.httpClient.post<Note>('http://localhost:3000/api/v1/notes', note,
    httpOptions);

    return addNoteResponse.do(addedNote => {
      this.notes.push(addedNote);
      this.notesSubject.next(this.notes);
    });
  }

  editNote(note: Note): Observable<Note> {
    const bearerToken = this.authenticationService.getBearerToken();
    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`)
    };

    const editNoteResponse = this.httpClient.put<Note>(`http://localhost:3000/api/v1/notes/${note.id}`,
    note, httpOptions);

    return editNoteResponse.do(addedNote => {
      this.notesSubject.next(this.notes);
    });
  }

  getNoteById(noteId): Note {
    return this.notes.find((current) => current.id === noteId);
  }
}
