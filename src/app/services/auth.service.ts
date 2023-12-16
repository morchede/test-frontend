import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environnements/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public username: string;
  public password: string;
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.get(environment.backendHost + 'auth/login',
      { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res) => {
        this.username = username;
        this.password = password;
        this.registerSuccessfulLogin(username, password);
      }));
  }

  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ":" + password);
  }

  registerSuccessfulLogin(username: string, password: string) {
    // save the username to session
  }
}
