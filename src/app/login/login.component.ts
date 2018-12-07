import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RouterService } from '../services/router.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = new FormControl();
  password = new FormControl();

  submitMessage: string;

  constructor(private routerService: RouterService,
    private authenticationService: AuthenticationService) { }

  loginSubmit() {
    const creds = {
      'username': this.username.value,
      'password': this.password.value,
    };

    if (!this.username.value || !this.password.value) {
      this.submitMessage = 'Username and Passwrod required';
    } else {
      const authenticationResult = this.authenticationService.authenticateUser(creds);

      authenticationResult.subscribe(
        resp => {
          if (resp) {
            this.authenticationService.setBearerToken(resp);
            this.routerService.routeToDashboard();

          } else {
            this.submitMessage = 'Unauthorized';
          }
        },
        err => {
          if (err.error) {
            this.submitMessage = err.error.message;
          } else {
            this.submitMessage = err.message;
          }
        }
      );
    }
  }
}
