import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  authenticateUser(data) {

    return this.httpClient.post('http://localhost:3000/auth/v1/', data)
      .pipe(map(response => response['token']));
  }

  setBearerToken(token) {
    localStorage.setItem('bearerToken', token);
  }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  isUserAuthenticated(token): Promise<boolean> {

    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    };
    const authResponse = this.httpClient.post('http://localhost:3000/auth/v1/isAuthenticated', {},
    httpOptions).pipe(map(response => response['isAuthenticated']));

    return authResponse.toPromise();

  }
}
